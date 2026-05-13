# Task ID: 2 — EMS NCII TESDA Data Files

## Agent: Data Developer
## Date: 2026-05-11

## Summary
Created all 7 data TypeScript files for the EMS NCII TESDA learning platform in `/home/z/my-project/src/data/`.

## Files Created

### 1. `roadmap.ts` (246 lines)
- 8 RoadmapTopic entries covering all specified topics
- Each topic has detailed content (3-5 paragraphs) and 5-8 key points
- Chain of Survival includes full 6-link chain with AHA 2025 vs 2020 comparison details
- Topics: OSH & Health, Life on the Line, First Aider, Rules & Law, Action Plan, AMATS, Assessment & Procedure, Chain of Survival

### 2. `acronyms.ts` (543 lines)
- 65 acronyms across 5 categories
- Philippines-specific (15): BFP, PNP, DOH, TESDA, NDRRMC, AMATS, LGU, PhilHealth, DILG, OCD, PRC, DOLE, RA 10971, RA 10871, OSHC
- Clinical (16): BLS, ALS, CPR, AED, EMS, EMT, AHA, ACLS, PALS, BVM, OPA, NPA, ROSC, VF, VT, PEA
- Assessment (13): SAMPLE, DCAP-BTLS, LOC, GCS, AVPU, OPQRST, MOI, NOI, AOx4, DNR, ABCDE, FAST, PAT
- Drugs/Equipment (13): IV, BP, HR, RR, SpO2, ECG, EKG, PPE, TTM, IM, SL, PO, NEB
- General (18): MCI, ICS, NIMS, SOP, PCR, CO, HAZMAT, TB, BSI, CISM, SBAR, SMR, START, PAD, EOC, OHCA, EMD, NCII

### 3. `definitions.ts` (352 lines)
- 42 terms across 5 categories
- Legal (15): Triage, Scope of Practice, Standard of Care, Negligence, Abandonment, Consent (Expressed), Consent (Implied), Duty to Act, Good Samaritan Law, Res ipsa loquitur, Protocols, Standing Orders, Medical Direction, Online/Offline Medical Control
- Operations (7): MCI, Golden Hour, Platinum 10 Minutes, Definitive Care, ICS, Scene Size-Up, Loading Dose
- Clinical (13): BSI, Pathogen, Communicable Disease, Standard Precautions, Respiration, Perfusion, Hypoxia, Shock, Atherosclerosis, MI, Angina Pectoris, Cardiac Arrest, Agonal Breathing
- Assessment (7): SAMPLE, OPQRST, DCAP-BTLS, AVPU, GCS, Primary Survey, Secondary Survey

### 4. `drugs.ts` (465 lines)
- 14 drugs with complete pharmacological profiles
- Drugs: Oxygen, Oral Glucose, Aspirin, Activated Charcoal, Epinephrine (auto-injector), Nitroglycerin, Naloxone, Albuterol, Diphenhydramine, Glucagon, Nitrous Oxide, Ibuprofen, Acetaminophen, Oral Rehydration Salts
- Each includes: generic name, brand names, drug class, indications, contraindications, adult/pediatric doses, route, side effects, special notes, scope (BLS/ALS/Both)
- Philippine-specific context (e.g., Biogesic for acetaminophen, Oresol for ORS)

### 5. `questions.ts` (1690 lines)
- 112 exam questions across 10 categories (at least 10 per category)
- OSH (10), First Aid (12), BLS/CPR (12), Patient Assessment (12), Trauma (10), Medical Emergencies (12), AMATS (10), Legal/Ethical (12), Drugs (12), TESDA Standards (10)
- Each question has 4 options, correct answer index, and detailed explanation
- Realistic TESDA NCII exam-level difficulty

### 6. `scenarios.ts` (1200 lines)
- 8 complete branching scenarios with 5-8 steps each
- Scenarios: Cardiac Arrest Adult, Choking Adult, Severe Bleeding, Anaphylaxis, Stroke FAST, Spinal Injury, Diabetic Emergency, Choking Infant
- Each has correct/incorrect paths with detailed feedback
- Step IDs link choices to next steps creating branching narrative

### 7. `assessment-scenes.ts` (697 lines)
- 9 assessment scenes with detailed steps
- Scenes: BLS CPR & AED (10 steps), Patient Assessment Medical (9 steps), Patient Assessment Trauma (9 steps), Airway Management (8 steps), Bleeding Control (7 steps), Splinting & Fracture (8 steps), Triage START (8 steps), AMATS Activation (8 steps), Documentation PCR (7 steps)
- Critical steps (isCritical: true) marked with notes explaining automatic failure implications
- Total: 74 assessment steps across all scenes

## Total
- 5,193 lines of TypeScript code
- All files lint cleanly
- All content is medically accurate and appropriate for Philippine EMS NCII TESDA standards
