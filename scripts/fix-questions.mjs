/**
 * Script to fix truncated EMS NCII questions using LLM
 * Processes questions in batches and completes truncated text
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_FILE = path.join(__dirname, '../src/data/questions.ts');
const OUTPUT_FILE = path.join(__dirname, '../src/data/questions.ts');
const BACKUP_FILE = path.join(__dirname, '../src/data/questions.ts.bak');

// Read and parse the questions from the TS file
function readQuestions() {
  const content = fs.readFileSync(INPUT_FILE, 'utf8');
  // Extract the array portion
  const arrayMatch = content.match(/export const questions: Question\[\] = \[([\s\S]*)\]/);
  if (!arrayMatch) {
    throw new Error('Could not parse questions array');
  }
  
  // Use eval to parse (safe for our own data)
  const arrayStr = '[' + arrayMatch[1] + ']';
  // Parse using Function constructor to handle the data
  const questions = new Function('return ' + arrayStr)();
  return questions;
}

// Check if text appears truncated
function isTruncated(text) {
  if (!text) return true;
  // Questions should end with ?
  if (text.length > 10 && !text.endsWith('?') && !text.endsWith('.') && !text.endsWith(')') && !text.endsWith('"') && !text.endsWith('%')) {
    return true;
  }
  // Very short text for explanations
  if (text.length < 20) return true;
  return false;
}

// Process a batch of questions with the LLM
async function fixQuestionBatch(zai, batch, batchNum) {
  const prompt = `You are an EMS NCII TESDA expert. The following questions have TRUNCATED/INCOMPLETE text in their question, options, or explanation fields. 

For each question, complete the truncated text to make full, grammatically correct sentences. Follow these rules:
1. Questions must end with "?"
2. Options must be complete phrases/sentences - NOT cut off mid-word
3. Explanations must be complete sentences (1-3 sentences) explaining WHY the correct answer is right
4. Keep the same correctAnswer index - the correct answer index is already right
5. Keep the same category
6. Keep medically accurate per AHA 2020 guidelines and TESDA EMS NCII curriculum
7. Return ONLY a valid JSON array, no markdown code blocks

Here are the questions to fix:

${JSON.stringify(batch, null, 2)}

Return the fixed questions as a JSON array with the same structure. Only output the JSON array, nothing else.`;

  console.log(`Processing batch ${batchNum} (${batch.length} questions)...`);
  
  const response = await zai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an EMS medical education expert. You fix truncated quiz questions by completing them with accurate, full-sentence text. You only output valid JSON arrays, no markdown.' },
      { role: 'user', content: prompt }
    ],
    thinking: { type: 'disabled' }
  });

  const content = response.choices[0]?.message?.content || '';
  
  // Try to parse the JSON from the response
  let cleaned = content.trim();
  // Remove markdown code blocks if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  
  try {
    const fixed = JSON.parse(cleaned);
    console.log(`  Batch ${batchNum}: Successfully fixed ${fixed.length} questions`);
    return fixed;
  } catch (e) {
    console.error(`  Batch ${batchNum}: Failed to parse LLM response, error: ${e.message}`);
    console.error(`  Response preview: ${cleaned.slice(0, 200)}...`);
    return batch; // Return original if parsing fails
  }
}

// Generate the TypeScript file content
function generateTS(questions) {
  let output = `export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category:
    | "OSH"
    | "First Aid"
    | "BLS/CPR"
    | "Patient Assessment"
    | "Trauma"
    | "Medical Emergencies"
    | "AMATS"
    | "Legal/Ethical"
    | "Drugs"
    | "TESDA Standards";
}

export const questions: Question[] = [
`;

  questions.forEach((q, i) => {
    output += `  {
    id: ${q.id},
    question: ${JSON.stringify(q.question)},
    options: ${JSON.stringify(q.options, null, 6).split('\n').join('\n    ')},
    correctAnswer: ${q.correctAnswer},
    explanation: ${JSON.stringify(q.explanation)},
    category: ${JSON.stringify(q.category)},
  }`;
    if (i < questions.length - 1) output += ',';
    output += '\n';
  });

  output += ']\n';
  return output;
}

async function main() {
  console.log('Reading questions file...');
  const questions = readQuestions();
  console.log(`Found ${questions.length} questions`);

  // Find truncated questions
  const truncated = questions.filter(q => {
    const qTrunc = isTruncated(q.question);
    const oTrunc = q.options.some(o => isTruncated(o) || o.length < 5);
    const eTrunc = isTruncated(q.explanation) || q.explanation.length < 30;
    return qTrunc || oTrunc || eTrunc;
  });
  
  console.log(`Found ${truncated.length} truncated questions out of ${questions.length} total`);
  
  if (truncated.length === 0) {
    console.log('No truncated questions found! All questions appear complete.');
    return;
  }

  // Backup original file
  fs.copyFileSync(INPUT_FILE, BACKUP_FILE);
  console.log(`Backed up original to ${BACKUP_FILE}`);

  // Initialize LLM
  console.log('Initializing Z-AI SDK...');
  const zai = await ZAI.create();

  // Process in batches of 15
  const BATCH_SIZE = 15;
  const allFixed = new Map();
  
  for (let i = 0; i < truncated.length; i += BATCH_SIZE) {
    const batch = truncated.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    
    try {
      const fixed = await fixQuestionBatch(zai, batch, batchNum);
      fixed.forEach(q => allFixed.set(q.id, q));
    } catch (e) {
      console.error(`  Batch ${batchNum} failed: ${e.message}`);
      // Keep originals for failed batches
      batch.forEach(q => allFixed.set(q.id, q));
    }
    
    // Small delay between batches
    if (i + BATCH_SIZE < truncated.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Merge fixed questions back into the full list
  const finalQuestions = questions.map(q => {
    const fixed = allFixed.get(q.id);
    return fixed || q;
  });

  // Generate and write the new file
  const tsContent = generateTS(finalQuestions);
  fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');
  console.log(`\nWritten ${finalQuestions.length} questions to ${OUTPUT_FILE}`);
  
  // Verify
  const verifyQuestions = readQuestions();
  const stillTruncated = verifyQuestions.filter(q => {
    const qTrunc = isTruncated(q.question);
    const oTrunc = q.options.some(o => isTruncated(o) || o.length < 5);
    const eTrunc = isTruncated(q.explanation) || q.explanation.length < 30;
    return qTrunc || oTrunc || eTrunc;
  });
  console.log(`\nVerification: ${stillTruncated.length} questions still appear truncated`);
  if (stillTruncated.length > 0) {
    console.log('Sample still-truncated question IDs:', stillTruncated.slice(0, 10).map(q => q.id));
  }
}

main().catch(e => {
  console.error('Script failed:', e);
  process.exit(1);
});
