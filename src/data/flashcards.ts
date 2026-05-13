export interface FlashcardData {
  id: string
  front: string
  back: string
  category: 'acronyms' | 'drugs' | 'assessment' | 'clinical' | 'general'
  difficulty: 'easy' | 'medium' | 'hard'
}

export const vitalSignsCards: FlashcardData[] = [
  {
    id: 'vs-1',
    front: 'Normal Heart Rate Range',
    back: '• Adult: 60–100 bpm\n• Newborn: 120–160 bpm\n• Infant: 100–140 bpm\n• Toddler: 90–130 bpm\n• School-age: 70–110 bpm',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-2',
    front: 'Normal Respiratory Rate Range',
    back: '• Adult: 12–20 breaths/min\n• Newborn: 30–60 breaths/min\n• Infant: 25–40 breaths/min\n• Toddler: 20–30 breaths/min\n• School-age: 18–25 breaths/min',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-3',
    front: 'Normal Blood Pressure Range',
    back: '• Adult: 90/60 to 140/90 mmHg\n• Children: varies by age\n• Hypotension: <90/60 mmHg\n• Hypertension: >140/90 mmHg (or >130/80 per new guidelines)',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-4',
    front: 'Normal SpO₂ Range',
    back: '• Normal: 95–100%\n• Mild hypoxemia: 91–94%\n• Moderate: 86–90%\n• Severe: <85%\n• Critical: <80%',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'vs-5',
    front: 'Normal Body Temperature',
    back: '• Oral: 36.5–37.5°C (97.7–99.5°F)\n• Hypothermia: <35°C (95°F)\n• Fever: >38°C (100.4°F)\n• Hyperthermia emergency: >40°C (104°F)',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'vs-6',
    front: 'Glasgow Coma Scale (GCS) Scoring',
    back: '• Eye Opening: 1–4\n• Verbal Response: 1–5\n• Motor Response: 1–6\n• Total: 3–15\n• Mild TBI: 13–15 | Moderate: 9–12 | Severe: 3–8',
    category: 'assessment',
    difficulty: 'hard',
  },
  {
    id: 'vs-7',
    front: 'AVPU Consciousness Scale',
    back: '• A — Alert: patient is awake and responsive\n• V — Verbal: responds to voice only\n• P — Pain: responds only to painful stimuli\n• U — Unresponsive: no response at all',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'vs-8',
    front: 'Pediatric Assessment Triangle (PAT)',
    back: '• Appearance: tone, interactiveness, consolability, look/gaze, speech/cry\n• Work of Breathing: abnormal positioning, retractions, nasal flaring, sounds\n• Circulation to Skin: skin color, mottling, diaphoresis',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-9',
    front: 'Normal Capillary Refill Time',
    back: '• Normal: <2 seconds\n• Prolonged: >2 seconds (indicates poor perfusion)\n• Assess: fingertip or sternum in infants\n• Cold environment may slow refill',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'vs-10',
    front: 'Blood Glucose Levels',
    back: '• Normal fasting: 70–100 mg/dL\n• Hypoglycemia: <60 mg/dL\n• Severe hypoglycemia: <40 mg/dL\n• Hyperglycemia: >140 mg/dL fasting',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-11',
    front: 'Pupil Assessment (PEARL)',
    back: '• PEARL: Pupils Equal and Reactive to Light\n• Normal size: 3–5 mm\n• Constrict with light (direct & consensual)\n• Dilate in dark/sympathetic response\n• Fixed/dilated: may indicate increased ICP',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'vs-12',
    front: 'Pulse Quality Assessment',
    back: '• Rate: beats per minute\n• Rhythm: regular vs irregular\n• Strength: strong (bounding), weak (thready), absent\n• Peripheral vs Central pulses\n• Assess: radial, carotid, brachial, femoral, pedal',
    category: 'assessment',
    difficulty: 'easy',
  },
]

export const emergencyProcedureCards: FlashcardData[] = [
  {
    id: 'ep-1',
    front: 'Primary Survey Steps (ABCDE)',
    back: '• A — Airway (open & maintain, cervical spine protection)\n• B — Breathing (rate, quality, SpO₂)\n• C — Circulation (pulse, bleeding, skin color)\n• D — Disability (LOC, GCS, pupils)\n• E — Exposure (full body exam, prevent hypothermia)',
    category: 'clinical',
    difficulty: 'medium',
  },
  {
    id: 'ep-2',
    front: 'CPR Compression Rate & Depth',
    back: '• Rate: 100–120 compressions/min\n• Depth: 2–2.4 inches (5–6 cm) adults\n• Full chest recoil after each compression\n• Minimize interruptions (<10 sec)\n• Ratio: 30:2 (single rescuer)\n• Hands placed on lower half of sternum',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-3',
    front: 'Bleeding Control Steps',
    back: '1. Apply direct pressure with sterile dressing\n2. If soaking through, add more dressing (do NOT remove)\n3. Apply pressure bandage\n4. If direct pressure fails: apply tourniquet for extremity\n5. Note time of tourniquet application\n6. For wounds not suitable for tourniquet: pack wound',
    category: 'clinical',
    difficulty: 'medium',
  },
  {
    id: 'ep-4',
    front: 'AED Operation Steps',
    back: '1. Power on the AED\n2. Expose chest, dry if wet, remove medication patches\n3. Attach electrode pads (correct placement)\n4. "Clear" patient — analyze rhythm\n5. If shock advised: "CLEAR" again — deliver shock\n6. Resume CPR immediately after shock\n7. Check rhythm every 2 minutes',
    category: 'clinical',
    difficulty: 'medium',
  },
  {
    id: 'ep-5',
    front: 'Choking / Foreign Body Airway Obstruction',
    back: 'CONSCIOUS:\n• Encourage coughing first\n• 5 back blows (between shoulder blades)\n• 5 abdominal thrusts (Heimlich)\n• Alternate until object clears or patient becomes unconscious\n\nUNCONSCIOUS:\n• Begin CPR (look in mouth before giving breaths)\n• Each time airway opened: look for object',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-6',
    front: 'Spinal Motion Restriction (SMR)',
    back: '• Indications: mechanism of injury, complaints of pain/tingling, altered mental status\n• Manual in-line stabilization of head/neck\n• Apply cervical collar (CSM) appropriately sized\n• Secure to long backboard or vacuum mattress\n• Pad voids to prevent movement\n• Remove ONLY if airway compromise or prolonged extrication',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-7',
    front: 'START Triage System',
    back: '1. Assess: Can patient walk? → MINOR (Green)\n2. Breathing? No → OPEN AIRWAY, still no? → EXPECTANT (Black)\n3. Breathing >30/min? → IMMEDIATE (Red)\n4. Capillary refill >2 sec or no radial pulse? → IMMEDIATE (Red)\n5. Otherwise → DELAYED (Yellow)',
    category: 'general',
    difficulty: 'hard',
  },
  {
    id: 'ep-8',
    front: 'Stroke Assessment: FAST / BE-FAST',
    back: 'F — Face drooping (one side)\nA — Arm weakness (unable to raise equally)\nS — Speech difficulty (slurred, confused)\nT — Time to call emergency services\n\nB — Balance problems\nE — Eye vision changes\n\nNote time of symptom onset — critical for treatment',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'ep-9',
    front: 'Burn Classification & Initial Care',
    back: '• Superficial (1st degree): red, painful — cool water\n• Partial thickness (2nd degree): blisters, very painful\n• Full thickness (3rd degree): white/charred, painless\n• Rule of Nines for BSA estimation\n• Initial care: STOP burning, cool 10–20 min with water, cover with dry sterile dressing, NO ice/ointments/butter',
    category: 'clinical',
    difficulty: 'medium',
  },
  {
    id: 'ep-10',
    front: 'Anaphylaxis Management',
    back: '1. Remove allergen if possible\n2. Epinephrine 0.3 mg IM (anterolateral thigh)\n3. May repeat every 5–15 min\n4. Position: supine with legs elevated (if breathing OK)\n5. High-flow O₂ via NRB 15 L/min\n6. Assist with bronchodilator if wheezing\n7. Monitor: BP, HR, SpO₂\n8. Transport — may re-sedate (epinephrine wears off)',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-11',
    front: 'Emergency Childbirth Steps (APGAR)',
    back: '1. Provide privacy, calm reassurance\n2. DO NOT delay transport\n3. As head delivers, support and check for cord around neck\n4. Guide head down for body delivery\n5. Dry and warm baby, stimulate to breathe\n6. APGAR at 1 & 5 min:\n   A — Appearance (skin color)\n   P — Pulse (heart rate)\n   G — Grimace (reflex irritability)\n   A — Activity (muscle tone)\n   R — Respiration (breathing effort)',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-12',
    front: 'SAMPLE History Mnemonic',
    back: 'S — Signs & Symptoms\nA — Allergies\nM — Medications (current)\nP — Past medical history\nL — Last oral intake\nE — Events leading to illness/injury',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'ep-13',
    front: 'OPQRST Pain Assessment',
    back: 'O — Onset: When did it start? Sudden or gradual?\nP — Provocation/Palliation: What makes it worse/better?\nQ — Quality: Sharp, dull, burning, crushing?\nR — Radiation: Does it travel anywhere?\nS — Severity: 1–10 pain scale\nT — Time: Constant or intermittent?',
    category: 'assessment',
    difficulty: 'easy',
  },
  {
    id: 'ep-14',
    front: 'Secondary Survey (DCAP-BTLS)',
    back: 'Head-to-toe assessment for injuries:\nD — Deformities\nC — Contusions\nA — Abrasions\nP — Punctures/Penetrations\nB — Burns\nT — Tenderness\nL — Lacerations\nS — Swelling',
    category: 'assessment',
    difficulty: 'medium',
  },
  {
    id: 'ep-15',
    front: 'Shock Recognition & Management',
    back: 'Signs: pale/cool/clammy skin, weak rapid pulse, rapid breathing, anxiety, altered mental status\n\nTypes:\n• Hypovolemic (blood/fluid loss)\n• Cardiogenic (heart failure)\n• Distributive (sepsis, anaphylaxis)\n• Obstructive (tension pneumothorax, cardiac tamponade)\n\nManagement: Control bleeding, high-flow O₂, position supine with legs elevated, keep warm, rapid transport',
    category: 'clinical',
    difficulty: 'hard',
  },
  {
    id: 'ep-16',
    front: 'Chain of Survival (AHA 2025)',
    back: '1. Recognition & Activation — call for help\n2. Immediate CPR — high quality compressions\n3. Rapid Defibrillation — use AED within 3–5 min\n4. Advanced Life Support — ACLS by professionals\n5. Post-Cardiac Arrest Care — TTM 32–37.5°C\n6. Recovery — rehabilitation & follow-up (NEW in 2025)',
    category: 'general',
    difficulty: 'medium',
  },
  {
    id: 'ep-17',
    front: 'Oxygen Delivery Devices',
    back: '• Nasal Cannula: 1–6 L/min (24–44% O₂)\n• Simple Face Mask: 6–10 L/min (40–60% O₂)\n• Non-Rebreather Mask: 10–15 L/min (80–95% O₂)\n• BVM: 15 L/min w/ supplemental (nearly 100%)\n• CPAP: for pulmonary edema/COPD exacerbation\nTarget: SpO₂ 94–99% (88–92% for COPD)',
    category: 'clinical',
    difficulty: 'medium',
  },
  {
    id: 'ep-18',
    front: 'SBAR Communication Framework',
    back: 'S — Situation: What is happening right now?\nB — Background: What led to this?\nA — Assessment: What do I think is going on?\nR — Recommendation: What do I think we should do?\n\nUsed for handoff reports, radio calls, and hospital notifications',
    category: 'general',
    difficulty: 'easy',
  },
]

/** Combine all flashcard arrays */
export const allFlashcards: FlashcardData[] = [
  ...vitalSignsCards,
  ...emergencyProcedureCards,
]
