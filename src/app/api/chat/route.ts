import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_SYSTEM_PROMPT = `You are MANNY COLLINS, an expert study assistant for the PIO DURAN EMS NCII (Emergency Medical Service National Certificate II) TESDA certification program in the Philippines.

Your role:
- Help students prepare for the TESDA EMS NCII competency assessment
- Explain EMS concepts, procedures, and protocols clearly and accurately
- Provide study tips, mnemonics, and memory aids for EMS topics
- Answer questions about patient assessment, BLS/CPR, airway management, trauma care, medical emergencies, ambulance operations, and Philippine EMS regulations
- Guide students through the Chain of Survival (AHA 2025 guidelines)
- Explain TESDA competency standards and assessment requirements
- Support bilingual conversation in English and Filipino/Tagalog when the user speaks in Filipino

Key topics you are knowledgeable about:
1. Occupational Safety & Health (OSH) in EMS
2. Life on the Line - EMS roles and responsibilities
3. First Aid principles and procedures
4. Rules, regulations, and legal aspects of EMS in the Philippines (RA 8344, etc.)
5. Action Plan / Emergency Response Planning
6. AMATS (Ambulance Management and Transport System)
7. Patient Assessment Procedures (Primary & Secondary Survey)
8. Chain of Survival (AHA 2025) - Recognition, High-Quality CPR, Defibrillation, Advanced Resuscitation, Post-Cardiac Arrest Care, Recovery
9. Airway Management (OPA, NPA, BVM, suctioning)
10. Trauma assessment and management (bleeding control, splinting, spinal immobilization)
11. Medical emergencies (cardiac, respiratory, diabetic, neurological)
12. Ambulance equipment and their uses
13. Pharmacology basics for EMS
14. TESDA assessment competencies and criteria

Guidelines:
- Be encouraging, supportive, and educational
- Use simple, clear language appropriate for students
- When explaining procedures, use step-by-step format
- Include practical tips and common mistakes to avoid
- Reference Philippine EMS context when relevant
- If you're unsure about something, say so honestly
- Keep responses concise but comprehensive
- Use emojis sparingly for visual emphasis (🫀🩺💊⚡🚑)
- Format important terms in **bold**
- When giving study advice, suggest specific sections of the EMS NCII curriculum to review`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AIConfig {
  provider: 'zai' | 'openai' | 'anthropic' | 'google' | 'custom'
  apiKey: string
  model: string
  customEndpoint: string
  systemPrompt: string
  temperature: number
  maxTokens: number
}

// ==================== Provider-specific call functions ====================

async function callZAI(messages: { role: string; content: string }[]): Promise<string> {
  const ZAI = (await import('z-ai-web-dev-sdk')).default
  const zai = await ZAI.create()

  const completion = await zai.chat.completions.create({
    messages: messages as { role: 'user' | 'assistant'; content: string }[],
    thinking: { type: 'disabled' },
  })

  const response = completion.choices[0]?.message?.content
  if (!response || response.trim().length === 0) {
    throw new Error('AI returned an empty response')
  }
  return response
}

async function callOpenAI(
  messages: { role: string; content: string }[],
  config: AIConfig
): Promise<string> {
  const model = config.model || 'gpt-4o-mini'
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens || 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${err}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('No response from OpenAI')
  return content
}

async function callAnthropic(
  messages: { role: string; content: string }[],
  config: AIConfig
): Promise<string> {
  const model = config.model || 'claude-sonnet-4-20250514'

  // Anthropic expects system as a separate top-level param
  const systemMsg = messages.find(m => m.role === 'system' || m.role === 'assistant')?.content || ''
  const chatMsgs = messages.filter(m => m.role !== 'system' && m.role !== 'assistant' || messages.indexOf(m) > 0)

  // Convert to Anthropic format (only user/assistant)
  const anthropicMsgs = chatMsgs.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content,
  }))

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: config.maxTokens || 1024,
      system: systemMsg,
      messages: anthropicMsgs,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Anthropic API error (${response.status}): ${err}`)
  }

  const data = await response.json()
  const content = data.content?.[0]?.text
  if (!content) throw new Error('No response from Anthropic')
  return content
}

async function callGoogle(
  messages: { role: string; content: string }[],
  config: AIConfig
): Promise<string> {
  const model = config.model || 'gemini-2.0-flash'

  // Convert to Gemini format
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

  const systemInstruction = messages.find(m => m.role === 'system' || m.role === 'assistant')?.content

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
        generationConfig: {
          temperature: config.temperature ?? 0.7,
          maxOutputTokens: config.maxTokens || 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Google AI API error (${response.status}): ${err}`)
  }

  const data = await response.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) throw new Error('No response from Google AI')
  return content
}

async function callCustom(
  messages: { role: string; content: string }[],
  config: AIConfig
): Promise<string> {
  if (!config.customEndpoint) {
    throw new Error('Custom endpoint URL is required')
  }

  // Try OpenAI-compatible format (most providers support this)
  const response = await fetch(config.customEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {}),
    },
    body: JSON.stringify({
      model: config.model || 'default',
      messages,
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens || 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Custom API error (${response.status}): ${err}`)
  }

  const data = await response.json()

  // Try OpenAI response format first
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content
  }

  // Try Anthropic response format
  if (data.content?.[0]?.text) {
    return data.content[0].text
  }

  // Try Google response format
  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text
  }

  // Fallback: try to extract text from unknown format
  const text = typeof data === 'string' ? data : JSON.stringify(data)
  throw new Error(`Unexpected response format from custom endpoint: ${text.slice(0, 200)}`)
}

// ==================== Main handler ====================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, sessionId, aiConfig } = body as {
      messages: ChatMessage[]
      sessionId?: string
      aiConfig?: AIConfig
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      )
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return NextResponse.json(
          { error: 'Each message must have role and content fields' },
          { status: 400 }
        )
      }
      if (msg.content.length > 4000) {
        return NextResponse.json(
          { error: 'Message content must be under 4000 characters' },
          { status: 400 }
        )
      }
    }

    // Limit conversation history to last 20 messages
    const trimmedMessages = messages.slice(-20)

    // Determine provider and settings
    const provider = aiConfig?.provider || 'zai'
    const systemPrompt = aiConfig?.systemPrompt || DEFAULT_SYSTEM_PROMPT

    // Build the messages array for the LLM
    const llmMessages = [
      { role: provider === 'anthropic' ? 'system' : 'system', content: systemPrompt },
      ...trimmedMessages.map((msg: ChatMessage) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ]

    let aiResponse: string

    switch (provider) {
      case 'openai':
        if (!aiConfig?.apiKey) {
          return NextResponse.json(
            { error: 'OpenAI API key is required. Configure it in AI Settings.' },
            { status: 400 }
          )
        }
        aiResponse = await callOpenAI(llmMessages, aiConfig)
        break

      case 'anthropic':
        if (!aiConfig?.apiKey) {
          return NextResponse.json(
            { error: 'Anthropic API key is required. Configure it in AI Settings.' },
            { status: 400 }
          )
        }
        aiResponse = await callAnthropic(llmMessages, aiConfig)
        break

      case 'google':
        if (!aiConfig?.apiKey) {
          return NextResponse.json(
            { error: 'Google AI API key is required. Configure it in AI Settings.' },
            { status: 400 }
          )
        }
        aiResponse = await callGoogle(llmMessages, aiConfig)
        break

      case 'custom':
        if (!aiConfig?.customEndpoint) {
          return NextResponse.json(
            { error: 'Custom endpoint URL is required. Configure it in AI Settings.' },
            { status: 400 }
          )
        }
        aiResponse = await callCustom(llmMessages, aiConfig)
        break

      case 'zai':
      default:
        // Use z-ai-web-dev-sdk (default, no API key needed)
        // For ZAI, we pass the system prompt as the first assistant message
        const zaiMessages = [
          { role: 'assistant' as const, content: systemPrompt },
          ...trimmedMessages.map((msg: ChatMessage) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          })),
        ]
        aiResponse = await callZAI(zaiMessages)
        break
    }

    if (!aiResponse || aiResponse.trim().length === 0) {
      return NextResponse.json(
        { error: 'AI returned an empty response. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: sessionId || Date.now().toString(),
      provider,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: `Failed to get AI response: ${message}` },
      { status: 500 }
    )
  }
}
