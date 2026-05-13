export interface CompetencyModule {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: string // emoji
  color: string // hex
  category: string
  reviewerNotes: string
  procedures: { title: string; steps: string[] }[]
  visualIllustrations: { title: string; description: string }[]
  keyPoints: string[]
  assessorQuestions: string[]
  memorizationTips: string[]
  flashcards: { front: string; back: string }[]
  miniQuiz: { question: string; options: string[]; correctAnswer: number; explanation: string }[]
}

export const competencyModules: CompetencyModule[] = [
  // ──────────────────────────────────────────────
  // 1. BASIC LIFE SUPPORT (BLS) — Foundation
  // ──────────────────────────────────────────────
  {
    id: 'bls',
    title: 'Basic Life Support (BLS)',
    shortTitle: 'BLS',
    description: 'Fundamental life support techniques including the Chain of Survival, high-quality CPR for all age groups, and recognition of cardiac arrest. This is the core competency every EMS provider must master.',
    icon: '❤️',
    color: '#DC2626',
    category: 'Foundation',
    reviewerNotes: 'BLS is the cornerstone of all EMS practice and the most heavily assessed competency in the TESDA NCII examination. Focus on mastering the Chain of Survival, high-quality CPR metrics (depth, rate, recoil, fraction), and the C-A-B sequence adopted by the 2020 AHA guidelines. In the Philippine setting, responders often work with limited resources, so emphasis on effective bystander CPR and rapid AED deployment is critical. The assessor will evaluate both knowledge and hands-on performance, including compression quality on a manikin. Remember that survival decreases by 7-10% for every minute without defibrillation in VF cardiac arrest.',
    procedures: [
      {
        title: 'Adult High-Quality CPR',
        steps: [
          'Verify scene safety and don appropriate PPE',
          'Check responsiveness (tap shoulders and shout "Are you okay?")',
          'Activate emergency response and retrieve AED if available',
          'Check for normal breathing and pulse simultaneously (5-10 seconds)',
          'If no pulse or abnormal breathing, begin chest compressions immediately',
          'Place heel of one hand on lower half of sternum, other hand on top, fingers interlaced',
          'Compress 2-2.4 inches (5-6 cm) at a rate of 100-120/min with full chest recoil',
          'After 30 compressions, open airway (head tilt-chin lift or jaw thrust for trauma)',
          'Give 2 breaths (1 second each, visible chest rise)',
          'Continue 30:2 cycle; minimize interruptions to less than 10 seconds'
        ]
      },
      {
        title: 'Relief of Foreign Body Airway Obstruction (FBAO)',
        steps: [
          'Recognize signs: clutching throat, inability to speak/cough, cyanosis',
          'Ask "Are you choking?" — if patient can cough, encourage coughing',
          'If severe obstruction (cannot speak/cough): stand behind patient',
          'Position fist just above the umbilicus (navel), grasp with other hand',
          'Deliver abdominal thrusts (Heimlich maneuver) inward and upward',
          'Continue thrusts until object is expelled or patient becomes unresponsive',
          'If patient becomes unresponsive: begin CPR, check mouth before each breath',
          'For obese or pregnant patients: use chest thrusts instead of abdominal thrusts'
        ]
      },
      {
        title: 'Recovery Position',
        steps: [
          'Confirm patient is breathing normally and has a pulse',
          'Kneel beside the patient and extend the arm closest to you outward',
          'Place the far arm across the chest toward the near shoulder',
          'Bend the far knee and roll the patient toward you',
          'Position the head to maintain open airway and allow drainage',
          'Monitor breathing and circulation continuously until help arrives'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Chain of Survival', description: 'Six interlocking chain links: (1) Recognition of cardiac arrest, (2) Activation of emergency response, (3) Immediate high-quality CPR, (4) Rapid defibrillation, (5) Advanced life support, (6) Post-cardiac arrest care. Each link is color-coded from green to red showing the progression of care.' },
      { title: 'Hand Placement for Compressions', description: 'Anterior chest view showing correct hand placement: heel of one hand on the lower half of the sternum between the nipple line, other hand on top with fingers interlaced and lifted off the chest. Shoulders positioned directly over the patient with arms locked straight for vertical compression.' },
      { title: 'Heimlich Maneuver Position', description: 'Side view showing rescuer standing behind a choking adult: fist placed just above the umbilicus, other hand covering the fist. Arrows indicate the inward and upward direction of abdominal thrusts. Inset shows chest thrust alternative for pregnant/obese patients.' }
    ],
    keyPoints: [
      'C-A-B sequence: Compressions first, then Airway, then Breathing',
      'Adult compression depth: 2-2.4 inches (5-6 cm); rate: 100-120/min',
      'Compression fraction must be at least 60% — minimize interruptions',
      'Switch compressors every 2 minutes (5 cycles) to prevent fatigue',
      'Survival decreases 7-10% per minute without defibrillation in VF',
      'Full chest recoil is essential — leaning reduces cardiac output',
      'For FBAO: abdominal thrusts for adults; back blows and chest thrusts for infants'
    ],
    assessorQuestions: [
      'Explain the Chain of Survival and the importance of each link.',
      'What are the five critical components of high-quality CPR?',
      'How does the management of FBAO differ between conscious and unresponsive patients?',
      'What is the correct compression-to-ventilation ratio for single-rescuer adult CPR?',
      'Why is full chest recoil important during compressions?'
    ],
    memorizationTips: [
      'CAB = "Compressions Are Best" — always start with compressions',
      'Compression rate 100-120 = tempo of "Stayin\' Alive" by the Bee Gees or "Leron Leron Sinta"',
      'Depth "2 to 2.4" = think of two-peso coin thickness stacked',
      'Chain of Survival: "R-A-C-D-A-P" = Recognize, Activate, CPR, Defibrillate, ALS, Post-care'
    ],
    flashcards: [
      { front: 'What does C-A-B stand for?', back: 'Compressions, Airway, Breathing' },
      { front: 'What is the adult compression depth?', back: '2-2.4 inches (5-6 cm)' },
      { front: 'What is the minimum acceptable compression fraction?', back: '60%' },
      { front: 'How often should you switch compressors?', back: 'Every 2 minutes (approximately 5 cycles of 30:2)' },
      { front: 'What is the compression-to-ventilation ratio for single-rescuer adult CPR?', back: '30:2 (30 compressions to 2 breaths)' }
    ],
    miniQuiz: [
      { question: 'What is the correct compression rate for adult CPR?', options: ['80-100/min', '100-120/min', '120-140/min', '60-80/min'], correctAnswer: 1, explanation: 'The 2020 AHA guidelines specify a compression rate of 100-120 per minute for high-quality CPR.' },
      { question: 'In the C-A-B sequence, what comes first?', options: ['Airway', 'Breathing', 'Compressions', 'Defibrillation'], correctAnswer: 2, explanation: 'C-A-B stands for Compressions-Airway-Breathing. Compressions are started first to maintain circulation.' },
      { question: 'What is the correct technique for relieving severe FBAO in a conscious adult?', options: ['Back blows only', 'Abdominal thrusts (Heimlich maneuver)', 'Chest compressions', 'Finger sweep'], correctAnswer: 1, explanation: 'For a conscious adult with severe FBAO, abdominal thrusts (Heimlich maneuver) are the recommended technique.' },
      { question: 'How much does survival decrease per minute without defibrillation in VF?', options: ['2-3%', '5-6%', '7-10%', '15-20%'], correctAnswer: 2, explanation: 'Survival from VF cardiac arrest decreases by approximately 7-10% for every minute without defibrillation.' },
      { question: 'When should you switch compressors during CPR?', options: ['Every minute', 'Every 2 minutes', 'Every 5 minutes', 'When tired'], correctAnswer: 1, explanation: 'Switch compressors every 2 minutes (approximately 5 cycles) to prevent fatigue-related decline in compression quality.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 2. CPR AND AED — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'cpr-aed',
    title: 'CPR and AED',
    shortTitle: 'CPR/AED',
    description: 'Cardiopulmonary resuscitation techniques and automated external defibrillator operation for adult, child, and infant patients, including special situations and team dynamics.',
    icon: '⚡',
    color: '#EF4444',
    category: 'Clinical',
    reviewerNotes: 'This module focuses on the practical integration of CPR and AED use as a combined resuscitation skill set. The TESDA NCII assessor will expect you to demonstrate seamless transition between compressions and AED operation while minimizing chest compression interruptions. Pay close attention to pediatric differences: child CPR uses one or two hands with 2-inch depth, infant CPR uses two-finger technique with 1.5-inch depth, and pediatric AED pads should be used when available. In the Philippine setting, AED availability is increasing in malls and airports, so familiarity with various AED models is important.',
    procedures: [
      {
        title: 'AED Operation Procedure',
        steps: [
          'Power on the AED immediately when it arrives',
          'Expose the chest and apply electrode pads (one upper right, one lower left)',
          'Stop CPR while AED analyzes the rhythm — "Everyone clear!"',
          'If shock advised: ensure no one touches patient, deliver shock',
          'Resume CPR immediately after shock (do NOT check pulse first)',
          'Continue CPR for 2 minutes until AED re-analyzes',
          'If no shock advised: resume CPR immediately for 2 minutes',
          'Continue cycles until ALS arrives, patient shows signs of life, or scene becomes unsafe'
        ]
      },
      {
        title: 'Child and Infant CPR',
        steps: [
          'For children (1 year to puberty): use one or two hands, compress 2 inches (5 cm)',
          'For infants (under 1 year): use two fingers on lower sternum, compress 1.5 inches (4 cm)',
          'Compression rate: 100-120/min for both children and infants',
          'Compression-to-ventilation ratio: 30:2 for single rescuer, 15:2 for two rescuers',
          'For infant AED: use pediatric pads if available, place one on front and one on back',
          'For child AED: use pediatric pads/key if available, adult pads if not (do not let pads touch)',
          'Each breath: 1 second, visible chest rise, avoid excessive ventilation'
        ]
      },
      {
        title: 'CPR with Team Dynamics',
        steps: [
          'Team leader assigns roles: compressor, airway, AED/defibrillator, recorder',
          'Communicate clearly using closed-loop communication',
          'Compressor counts compressions aloud for coordination',
          'Switch compressors every 2 minutes during AED analysis rhythm check',
          'Airway manager ensures proper ventilation and monitors for gastric distension',
          'Recorder documents all interventions, medications, and rhythm checks',
          'Team leader continuously evaluates performance and makes treatment decisions'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'AED Pad Placement', description: 'Anterior-lateral view of the chest showing AED pad placement: one pad on the upper right chest below the right clavicle, one pad on the lower left chest lateral to the left nipple. Avoid placing over medication patches or implanted devices. Inset shows pediatric anterior-posterior placement for infants.' },
      { title: 'Child vs Infant CPR Technique', description: 'Side-by-side comparison: Left panel shows child CPR with one or two hands on the lower sternum (2-inch depth). Right panel shows infant CPR with two fingers on the lower sternum just below the nipple line (1.5-inch depth). Compression rates are the same (100-120/min).' },
      { title: 'CPR Team Dynamics Diagram', description: 'Circular arrangement around the patient showing team positions: Team Leader at head, Compressor at left side, Airway Manager at right side, AED Operator at right chest, Recorder/Medic at foot. Arrows show communication flow and the 2-minute rotation cycle.' }
    ],
    keyPoints: [
      'AED should be applied as soon as available without interrupting compressions until analysis',
      'Minimize compression pauses — pre-charge AED concept: resume CPR while AED charges',
      'Pediatric pads: anterior-posterior placement for infants; anterior-lateral for children',
      'Two-rescuer CPR ratio: 15:2 for children and infants, 30:2 for adults',
      'If pediatric pads unavailable, use adult pads (ensure they do not touch each other)',
      'Do not check pulse or rhythm after shock — resume CPR immediately',
      'For drowning victims: give 5 initial rescue breaths before starting compressions'
    ],
    assessorQuestions: [
      'Describe the step-by-step procedure for operating an AED during a resuscitation.',
      'How does child CPR differ from adult CPR in terms of technique and ratios?',
      'What is the correct AED pad placement for an infant?',
      'Explain closed-loop communication in CPR team dynamics.',
      'What special considerations apply for drowning-related cardiac arrest?'
    ],
    memorizationTips: [
      'AED sequence: "P-A-S-S" = Power on, Apply pads, Stand clear, Shock if advised',
      'Pediatric differences: "Small patient, small hands, small depth, smaller ratio (15:2)"',
      'Infant AED: "Front and Back" (anterior-posterior pad placement)',
      'Team switch: "Switch when AED analyzes" — natural 2-minute checkpoint'
    ],
    flashcards: [
      { front: 'What is the compression-to-ventilation ratio for two-rescuer child CPR?', back: '15:2' },
      { front: 'Where should AED pads be placed on an infant?', back: 'Anterior-posterior (one on front of chest, one on back)' },
      { front: 'What should you do immediately after delivering an AED shock?', back: 'Resume CPR immediately without checking pulse' },
      { front: 'What is the infant compression depth?', back: '1.5 inches (4 cm)' },
      { front: 'How many initial breaths should be given for drowning victims before compressions?', back: '5 rescue breaths' }
    ],
    miniQuiz: [
      { question: 'When using an AED, when should you stop CPR?', options: ['When the AED arrives', 'Only when the AED is analyzing rhythm or delivering a shock', 'After each cycle of CPR', 'When the patient shows signs of life'], correctAnswer: 1, explanation: 'CPR should only be paused when the AED is analyzing the rhythm or delivering a shock. Resume CPR immediately after.' },
      { question: 'For two-rescuer infant CPR, what is the compression-to-ventilation ratio?', options: ['30:2', '15:2', '30:1', '15:1'], correctAnswer: 1, explanation: 'For two-rescuer CPR on children and infants, the ratio is 15:2 (15 compressions to 2 breaths).' },
      { question: 'If pediatric AED pads are unavailable, what should you do for a child?', options: ['Do not use the AED', 'Use adult pads ensuring they do not touch each other', 'Place both pads on the back', 'Wait for ALS to arrive'], correctAnswer: 1, explanation: 'If pediatric pads are unavailable, use adult pads on the child, ensuring the pads do not touch each other on the small chest.' },
      { question: 'What is the correct action after an AED delivers a shock?', options: ['Check the pulse', 'Check breathing', 'Resume CPR immediately', 'Wait for the AED to re-analyze'], correctAnswer: 2, explanation: 'After shock delivery, resume CPR immediately without checking pulse or breathing. Continue for 2 minutes before the next analysis.' },
      { question: 'For drowning-related cardiac arrest, what should be done before compressions?', options: ['Nothing different', 'Give 5 initial rescue breaths', 'Apply AED first', 'Perform abdominal thrusts'], correctAnswer: 1, explanation: 'For drowning victims, give 5 initial rescue breaths before starting chest compressions because the primary cause is usually hypoxia.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 3. PATIENT ASSESSMENT — Foundation
  // ──────────────────────────────────────────────
  {
    id: 'patient-assessment',
    title: 'Patient Assessment',
    shortTitle: 'Assessment',
    description: 'Systematic approach to patient assessment including scene size-up, primary survey, focused history, and detailed physical examination with proper documentation techniques.',
    icon: '🔍',
    color: '#7C3AED',
    category: 'Foundation',
    reviewerNotes: 'Patient assessment is the systematic foundation upon which all EMS care is built. This module covers three phases: initial assessment (scene size-up and primary survey using ABCDE), focused assessment (SAMPLE history and OPQRST pain assessment), and detailed head-to-toe examination. The TESDA NCII assessor will evaluate your ability to conduct a methodical, organized assessment without skipping critical steps. In the Philippine EMS setting, patients often present late and with multiple complaints, so thoroughness is essential. Documentation using SOAP format is also assessed. Critical thinking in prioritizing life threats is heavily evaluated.',
    procedures: [
      {
        title: 'Primary Survey (ABCDE)',
        steps: [
          'Perform scene size-up: ensure scene safety, BSI, mechanism of injury/nature of illness',
          'Determine number of patients and request additional resources if needed',
          'Assess general impression: age, position, apparent distress, obvious injuries',
          'A — Airway: Is it open and clear? (head tilt-chin lift or jaw thrust for trauma)',
          'B — Breathing: Present? Adequate? (look, listen, feel — 5-10 seconds)',
          'C — Circulation: Pulse present? Bleeding? Skin color/temperature/capillary refill',
          'D — Disability: AVPU scale, pupils, lateralizing signs',
          'E — Exposure: Examine thoroughly, prevent heat loss',
          'Identify and manage life threats immediately',
          'Make transport decision: critical = immediate transport with interventions en route'
        ]
      },
      {
        title: 'Focused History and Physical Exam',
        steps: [
          'Obtain chief complaint in the patient\'s own words',
          'Gather SAMPLE history: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events',
          'Assess OPQRST for pain: Onset, Provocation, Quality, Radiation, Severity, Time',
          'Perform focused physical exam based on chief complaint',
          'Obtain baseline vital signs: BP, HR, RR, SpO2, temperature, blood glucose if indicated',
          'Reassess frequently: every 5 minutes for critical, every 15 minutes for stable patients',
          'Document all findings using SOAP format'
        ]
      },
      {
        title: 'Detailed Head-to-Toe Examination',
        steps: [
          'Start at the head: inspect and palpate scalp, face, eyes (PERRL), ears, nose, mouth',
          'Examine neck: JVD, tracheal position, subcutaneous emphysema, cervical spine tenderness',
          'Assess chest: bilateral breath sounds, chest wall integrity, heart sounds',
          'Palpate abdomen: distension, tenderness, rigidity, guarding',
          'Examine pelvis: gentle compression for stability (do NOT repeatedly test)',
          'Assess extremities: deformity, crepitus, pulses, sensation, motor function (CSM)',
          'Log roll and examine posterior: spine tenderness, wounds, flanks',
          'Document all positive and pertinent negative findings'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'ABCDE Assessment Flowchart', description: 'A sequential flowchart: A (Airway) → B (Breathing) → C (Circulation) → D (Disability) → E (Exposure). Each box contains key assessment parameters, red flags requiring immediate intervention, and common treatments. Arrows show both the forward progression and feedback loops for reassessment.' },
      { title: 'SAMPLE History Mnemonic', description: 'A visual mnemonic card with each letter of SAMPLE: S=Signs/Symptoms, A=Allergies, M=Medications, P=Past medical history, L=Last oral intake, E=Events leading up to. Each letter is accompanied by sample questions a provider would ask the patient.' },
      { title: 'Head-to-Toe Examination Sequence', description: 'A body diagram with numbered circles showing the examination sequence from head (1) to toes (7), with posterior exam after log roll (8). Each circle expands to show what to assess at each body region.' }
    ],
    keyPoints: [
      'Always perform scene size-up BEFORE approaching the patient',
      'Primary survey (ABCDE) identifies and treats life threats first',
      'SAMPLE = Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events',
      'OPQRST = Onset, Provocation, Quality, Radiation, Severity, Time',
      'AVPU scale: Alert → Verbal → Pain → Unresponsive',
      'Reassess vital signs: every 5 min (critical) or 15 min (stable)',
      'Document using SOAP: Subjective, Objective, Assessment, Plan'
    ],
    assessorQuestions: [
      'Describe the components of the primary survey and their correct sequence.',
      'What does SAMPLE stand for and how is it used in patient assessment?',
      'How do you perform a scene size-up before approaching a patient?',
      'Explain the AVPU scale and its clinical significance in assessment.',
      'What is the SOAP documentation format and why is it important?'
    ],
    memorizationTips: [
      'ABCDE = "Always Be Checking Dead Elevators" — Airway, Breathing, Circulation, Disability, Exposure',
      'SAMPLE = "Some Answers Make Patients Lie" — remember to get ALL categories',
      'OPQRST = "On Pure Quest, Radiate Some Time" — pain assessment mnemonic',
      'AVPU = declining consciousness scale from Alert down to Unresponsive'
    ],
    flashcards: [
      { front: 'What does ABCDE stand for in the primary survey?', back: 'Airway, Breathing, Circulation, Disability, Exposure' },
      { front: 'What does SAMPLE stand for?', back: 'Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events' },
      { front: 'What does OPQRST assess?', back: 'Pain characteristics: Onset, Provocation, Quality, Radiation, Severity, Time' },
      { front: 'How often should you reassess a critical patient?', back: 'Every 5 minutes' },
      { front: 'What does SOAP stand for in documentation?', back: 'Subjective, Objective, Assessment, Plan' }
    ],
    miniQuiz: [
      { question: 'What is the correct sequence of the primary survey?', options: ['ABCDE', 'CABDE', 'ABDCE', 'EABCD'], correctAnswer: 0, explanation: 'The primary survey follows the ABCDE sequence: Airway, Breathing, Circulation, Disability, Exposure.' },
      { question: 'What does the "L" in SAMPLE stand for?', options: ['Location', 'Last oral intake', 'Level of consciousness', 'Laboratory results'], correctAnswer: 1, explanation: 'In SAMPLE, L stands for Last oral intake, important for anesthesia considerations and poisoning assessment.' },
      { question: 'How often should you reassess a stable patient?', options: ['Every 2 minutes', 'Every 5 minutes', 'Every 15 minutes', 'Every 30 minutes'], correctAnswer: 2, explanation: 'Stable patients should be reassessed every 15 minutes, while critical patients every 5 minutes.' },
      { question: 'What should you do FIRST when arriving at a scene?', options: ['Approach the patient', 'Check airway', 'Scene size-up', 'Call for backup'], correctAnswer: 2, explanation: 'Scene size-up must always be performed FIRST to ensure safety before approaching the patient.' },
      { question: 'What does the "Q" in OPQRST stand for?', options: ['Quick', 'Quality', 'Quantity', 'Question'], correctAnswer: 1, explanation: 'Q stands for Quality of pain (sharp, dull, burning, crushing), which helps differentiate types of conditions.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 4. TRAUMA MANAGEMENT — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'trauma-management',
    title: 'Trauma Management',
    shortTitle: 'Trauma',
    description: 'Assessment and management of traumatic injuries including mechanism of injury assessment, multi-system trauma care, spinal motion restriction, and specific injury patterns.',
    icon: '🚑',
    color: '#EA580C',
    category: 'Clinical',
    reviewerNotes: 'Trauma management is a high-stakes competency that requires rapid assessment and intervention. The TESDA NCII assessor will evaluate your ability to recognize mechanism of injury patterns, perform a rapid trauma assessment, prioritize interventions, and make appropriate transport decisions. In the Philippines, common trauma mechanisms include vehicular crashes (especially motorcycles), falls, and violence-related injuries. Key emphasis is on the Golden Hour concept, damage control principles, and spinal motion restriction. You must demonstrate knowledge of specific injury patterns such as flail chest, tension pneumothorax, and neurogenic shock.',
    procedures: [
      {
        title: 'Rapid Trauma Assessment',
        steps: [
          'Perform scene size-up and determine mechanism of injury',
          'Conduct primary survey (ABCDE) and address life threats immediately',
          'Apply cervical spine motion restriction for blunt trauma above the clavicles',
          'Perform rapid head-to-toe examination (2-3 minutes maximum)',
          'Identify and prioritize injuries: airway threats, massive hemorrhage, tension pneumothorax',
          'Splint obvious fractures, control bleeding, dress wounds',
          'Package patient for transport with spinal precautions if indicated',
          'Transport critical trauma patients to the nearest appropriate facility without delay'
        ]
      },
      {
        title: 'Spinal Motion Restriction (SMR)',
        steps: [
          'Assess mechanism of injury: fall >3 feet, MVC, diving injury, axial load',
          'Manually stabilize the head and neck in neutral position',
          'Assess for spinal injury indicators: midline tenderness, neurologic deficit, altered LOC',
          'Apply cervical collar of appropriate size',
          'Log roll patient with synchronized team movement (minimum 3 rescuers)',
          'Place patient on a long backboard or scoop stretcher',
          'Secure patient with straps: torso, pelvis, legs, and finally head',
          'Reassess distal CSM after immobilization'
        ]
      },
      {
        title: 'Chest Trauma Management',
        steps: [
          'Assess for life-threatening chest injuries during primary survey',
          'Open pneumothorax: apply three-sided occlusive dressing (vented chest seal preferred)',
          'Tension pneumothorax: recognize (absent breath sounds, JVD, tracheal deviation, hypotension)',
          'Flail chest: stabilize with manual pressure or pillow, monitor for underlying pulmonary contusion',
          'Massive hemothorax: anticipate need for fluid resuscitation, rapid transport',
          'Cardiac tamponade: recognize Beck\'s triad (muffled heart sounds, JVD, hypotension)',
          'Transport all significant chest trauma patients rapidly — time is critical'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Mechanism of Injury Patterns', description: 'Diagrams showing common MOI and expected injury patterns: frontal MVC (dashboard injury — femur/pelvis), lateral MVC (chest/abdominal compression), fall from height (calcaneus/lumbar spine), motorcycle crash (lower extremity/deglowing). Each diagram highlights the energy transfer vectors.' },
      { title: 'Spinal Motion Restriction Technique', description: 'Step-by-step sequence: (1) Manual in-line stabilization, (2) C-collar sizing and application, (3) Log roll with 3-person team, (4) Patient on backboard with head immobilized. Each step shows proper hand placement and body mechanics.' },
      { title: 'Lethal Chest Injuries', description: 'Chest cross-section showing six immediately life-threatening chest injuries: (1) Open pneumothorax, (2) Tension pneumothorax, (3) Massive hemothorax, (4) Flail chest, (5) Cardiac tamponade, (6) Tracheal/esophageal rupture. Each is labeled with key signs.' }
    ],
    keyPoints: [
      'Golden Hour: trauma patients have the best outcomes when definitive care is reached within 1 hour',
      'Mechanism of injury predicts injury patterns — always assess the scene for MOI clues',
      'Spinal motion restriction is indicated for blunt trauma above the clavicles with concerning MOI',
      'Tension pneumothorax: absent breath sounds + JVD + tracheal deviation + hypotension',
      'Open pneumothorax: apply three-sided occlusive dressing or vented chest seal',
      'Flail chest: paradoxical chest wall movement — underlying pulmonary contusion is the real danger',
      'Damage control: limit scene time for critical trauma, interventions en route'
    ],
    assessorQuestions: [
      'What is the Golden Hour and why is it significant in trauma management?',
      'Describe the indications and procedure for spinal motion restriction.',
      'What are the six immediately life-threatening chest injuries?',
      'How does mechanism of injury guide your assessment priorities?',
      'What is Beck\'s triad and what condition does it indicate?'
    ],
    memorizationTips: [
      'Lethal 6 of chest trauma: "ATOM-FC" = Airway obstruction, Tension pneumothorax, Open pneumothorax, Massive hemothorax, Flail chest, Cardiac tamponade',
      'Beck\'s triad: "3 D\'s" = Distant (muffled) heart sounds, Distended neck veins, Decreased BP',
      'SMR indications: "Any fall >3 feet, MVC, Diving, Axial load" = "FDA x3"',
      'Golden Hour = "60 minutes to definitive care" — think "60 for survival"'
    ],
    flashcards: [
      { front: 'What is the Golden Hour in trauma?', back: 'The concept that trauma patients have the best outcomes when definitive surgical care is reached within 1 hour of injury' },
      { front: 'What are the signs of tension pneumothorax?', back: 'Absent breath sounds on affected side, JVD, tracheal deviation (late sign), hypotension' },
      { front: 'What is Beck\'s triad?', back: 'Muffled heart sounds, JVD, hypotension — indicates cardiac tamponade' },
      { front: 'How is an open pneumothorax managed?', back: 'Apply a three-sided occlusive dressing or vented chest seal to prevent air entry' },
      { front: 'What is the real danger with flail chest?', back: 'The underlying pulmonary contusion causing hypoxia, not the chest wall instability itself' }
    ],
    miniQuiz: [
      { question: 'What is the most significant indicator for spinal motion restriction?', options: ['Patient age', 'Mechanism of injury above the clavicles', 'Presence of pain', 'Patient request'], correctAnswer: 1, explanation: 'Mechanism of injury involving blunt trauma above the clavicles is a primary indicator for spinal motion restriction.' },
      { question: 'Beck\'s triad is associated with which condition?', options: ['Tension pneumothorax', 'Massive hemothorax', 'Cardiac tamponade', 'Flail chest'], correctAnswer: 2, explanation: 'Beck\'s triad (muffled heart sounds, JVD, hypotension) is the classic presentation of cardiac tamponade.' },
      { question: 'For an open pneumothorax, the initial management is:', options: ['Chest tube insertion', 'Three-sided occlusive dressing', 'Needle decompression', 'Intubation'], correctAnswer: 1, explanation: 'Apply a three-sided occlusive dressing (or vented chest seal) to allow air to escape but prevent air from entering the pleural space.' },
      { question: 'What is the primary concern with flail chest?', options: ['Chest wall deformity', 'Rib fractures', 'Underlying pulmonary contusion', 'Subcutaneous emphysema'], correctAnswer: 2, explanation: 'While the chest wall instability is visible, the underlying pulmonary contusion causing hypoxia is the primary life threat.' },
      { question: 'The Golden Hour refers to:', options: ['Time to reach the scene', 'Time from injury to definitive surgical care', 'Time for CPR', 'Time for spinal assessment'], correctAnswer: 1, explanation: 'The Golden Hour concept emphasizes that trauma patients have better outcomes when they reach definitive surgical care within 1 hour of injury.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 5. MEDICAL EMERGENCIES — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'medical-emergencies',
    title: 'Medical Emergencies',
    shortTitle: 'Medical',
    description: 'Recognition and management of acute medical conditions including cardiac emergencies, stroke, diabetic emergencies, respiratory distress, allergic reactions, and seizures.',
    icon: '🫀',
    color: '#9333EA',
    category: 'Clinical',
    reviewerNotes: 'Medical emergencies encompass a wide range of acute conditions that EMS providers encounter daily. The TESDA NCII assessor will test your ability to differentiate between various medical conditions based on presentation, provide appropriate prehospital interventions, and determine transport priority. In the Philippine context, common presentations include hypertensive emergencies, diabetic crises (both hypo and hyperglycemia), asthma exacerbations, and cerebrovascular accidents. Key emphasis is on rapid assessment using the OPQRST and SAMPLE mnemonics, recognition of stroke using the FAST mnemonic, and appropriate use of the glucose meter. Understanding the difference between angina and MI, hypo and hyperglycemia, and various respiratory conditions is essential.',
    procedures: [
      {
        title: 'Cardiac Emergency Assessment and Management',
        steps: [
          'Perform primary survey and obtain baseline vital signs',
          'Obtain SAMPLE history focusing on cardiac risk factors',
          'Assess chest pain using OPQRST — typical MI: crushing, radiating to left arm/jaw',
          'Administer aspirin 162-325 mg chewed if no contraindications (allergy, bleeding)',
          'Assist with prescribed nitroglycerin (1 spray/sublingual every 5 min, max 3 doses) if SBP >100',
          'Monitor for signs of cardiogenic shock: hypotension, altered LOC, cool/diaphoretic skin',
          'Obtain 12-lead ECG if available and transmit to receiving facility',
          'Transport rapidly — time is myocardium'
        ]
      },
      {
        title: 'Stroke Assessment (FAST)',
        steps: [
          'Recognize sudden onset of neurologic deficits',
          'F — Face: ask patient to smile, look for facial droop',
          'A — Arms: ask patient to hold both arms out, look for drift',
          'S — Speech: ask patient to repeat a phrase, listen for slurring',
          'T — Time: note the exact time of symptom onset (last known normal)',
          'Perform Cincinnati Prehospital Stroke Scale if trained',
          'Transport to stroke center immediately — time is brain (tPA window: 3-4.5 hours)',
          'Keep patient NPO, elevate head of stretcher 30 degrees, monitor airway'
        ]
      },
      {
        title: 'Diabetic Emergency Management',
        steps: [
          'Assess level of consciousness and vital signs',
          'Obtain blood glucose level using glucometer',
          'Hypoglycemia (<60 mg/dL) conscious: administer oral glucose 15-30 grams',
          'Hypoglycemia unconscious: do NOT give anything by mouth, establish IV access if trained',
          'Hyperglycemia (>300 mg/dL): monitor airway, transport for medical evaluation',
          'Recheck blood glucose 15 minutes after treatment for hypoglycemia',
          'Document glucose readings, interventions, and patient response',
          'Transport all patients with altered mental status and abnormal glucose'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'FAST Stroke Assessment', description: 'Four panels showing the FAST assessment: (F) Face droop on one side when smiling, (A) Arm drift when holding both arms out, (S) Slurred speech when repeating a phrase, (T) Time to call for help — clock showing the importance of noting symptom onset time.' },
      { title: 'Hypoglycemia vs Hyperglycemia Comparison', description: 'Side-by-side comparison chart: Hypoglycemia (low glucose <60) signs include sweating, tremor, confusion, tachycardia, hunger. Hyperglycemia (high glucose >300) signs include polyuria, polydipsia, Kussmaul breathing, fruity breath odor, dehydration. Treatment differences clearly marked.' },
      { title: 'Cardiac Chest Pain Radiation Pattern', description: 'Body diagram showing typical cardiac chest pain: central chest pressure/crushing with radiation to left arm, jaw, neck, and sometimes back. Labels distinguish typical vs atypical presentations, with note that women and diabetics may present atypically.' }
    ],
    keyPoints: [
      'FAST = Face droop, Arm drift, Speech difficulty, Time to call for help',
      'Stroke tPA window: 3-4.5 hours from last known normal — time is brain',
      'Hypoglycemia (<60 mg/dL): conscious = oral glucose; unconscious = IV dextrose or glucagon',
      'Never give anything by mouth to an unconscious or altered patient',
      'Aspirin for suspected MI: 162-325 mg chewed (unless allergic or bleeding)',
      'Nitroglycerin contraindicated if SBP <100 mmHg or if patient took PDE5 inhibitors',
      'Anaphylaxis: epinephrine IM (0.3-0.5 mg of 1:1000) is first-line treatment'
    ],
    assessorQuestions: [
      'Describe the FAST assessment for stroke recognition.',
      'How do you differentiate between hypoglycemia and hyperglycemia?',
      'What is the appropriate management for a suspected acute myocardial infarction?',
      'What are the indications and contraindications for nitroglycerin?',
      'What is the first-line treatment for anaphylaxis?'
    ],
    memorizationTips: [
      'FAST = "Face, Arms, Speech, Time" — act FAST when you see stroke signs',
      'Hypoglycemia: "TSCC" = Tremor, Sweating, Confusion, Consciousness changes (think "Too Sweet, Can\'t Concentrate")',
      'Hyperglycemia: "3 Polys" = Polyuria, Polydipsia, Polyphagia',
      'Cardiac pain: "CRUSH" = Central, Radiating, Uncomfortable, Sweating, Heavy'
    ],
    flashcards: [
      { front: 'What does FAST stand for in stroke assessment?', back: 'Face droop, Arm drift, Speech difficulty, Time (note onset time)' },
      { front: 'What is the tPA window for stroke?', back: '3-4.5 hours from last known normal' },
      { front: 'What is the blood glucose threshold for hypoglycemia?', back: 'Below 60 mg/dL' },
      { front: 'What is the first-line treatment for anaphylaxis?', back: 'Epinephrine 0.3-0.5 mg IM (1:1000 concentration)' },
      { front: 'What is the aspirin dose for suspected MI?', back: '162-325 mg chewed' }
    ],
    miniQuiz: [
      { question: 'What does the "T" in FAST stand for?', options: ['Treatment', 'Temperature', 'Time', 'Tremor'], correctAnswer: 2, explanation: 'T stands for Time — it is critical to note the exact time of symptom onset or last known normal to determine tPA eligibility.' },
      { question: 'An unconscious patient with a blood glucose of 35 mg/dL should receive:', options: ['Oral glucose', 'Nothing by mouth, establish IV access for dextrose', 'Insulin', 'Glucagon orally'], correctAnswer: 1, explanation: 'Never give anything by mouth to an unconscious patient. Establish IV access and administer dextrose, or give IM glucagon if IV cannot be established.' },
      { question: 'Nitroglycerin is contraindicated when:', options: ['Heart rate is above 100', 'Systolic BP is below 100 mmHg', 'Patient has chest pain', 'Patient is diabetic'], correctAnswer: 1, explanation: 'Nitroglycerin causes vasodilation and can worsen hypotension. It is contraindicated if systolic BP is below 100 mmHg.' },
      { question: 'The epinephrine dose for anaphylaxis is:', options: ['0.3-0.5 mg IV', '0.3-0.5 mg IM of 1:1000', '1 mg IV push', '0.1 mg IM of 1:10,000'], correctAnswer: 1, explanation: 'Anaphylaxis is treated with epinephrine 0.3-0.5 mg IM using the 1:1000 concentration.' },
      { question: 'Typical MI chest pain is described as:', options: ['Sharp, stabbing, worse with breathing', 'Crushing, radiating to left arm/jaw', 'Burning after meals', 'Sharp, worse with movement'], correctAnswer: 1, explanation: 'Typical MI pain is described as a crushing pressure that may radiate to the left arm, jaw, or neck, unlike pleuritic or musculoskeletal pain.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 6. OXYGEN THERAPY — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'oxygen-therapy',
    title: 'Oxygen Therapy',
    shortTitle: 'O₂ Therapy',
    description: 'Principles and applications of oxygen therapy including device selection, flow rates, indications, contraindications, and safe handling of oxygen equipment in the prehospital setting.',
    icon: '🫁',
    color: '#06B6D4',
    category: 'Clinical',
    reviewerNotes: 'Oxygen therapy is a fundamental skill for EMS providers and is frequently assessed in the TESDA NCII examination. Understanding the oxygen delivery devices, their flow rates, and the FiO₂ they deliver is critical. The assessor will test your ability to select the appropriate device based on the patient condition, set up oxygen equipment, and troubleshoot common issues. In the Philippine setting, oxygen resources may be limited in rural areas, making efficient use important. Remember that nasal cannula delivers 24-44% O₂, simple mask 40-60%, non-rebreather 90-95%, and bag-valve-mask nearly 100%. Be aware of the risks of oxygen toxicity and the caution needed with COPD patients who may be CO₂ retainers.',
    procedures: [
      {
        title: 'Oxygen Administration Setup',
        steps: [
          'Check the cylinder label and confirm it contains medical-grade oxygen',
          'Open the cylinder valve slightly (crack) to clear debris, then attach the regulator',
          'Open the cylinder valve fully, then back one-quarter turn',
          'Check the pressure gauge to verify adequate oxygen supply (full: ~2000 psi)',
          'Select the appropriate delivery device based on patient condition',
          'Connect the oxygen tubing to the flowmeter and set the prescribed flow rate',
          'Apply the device to the patient and ensure proper fit and comfort',
          'Monitor the patient\'s response and SpO₂ readings continuously'
        ]
      },
      {
        title: 'Selecting Oxygen Delivery Devices',
        steps: [
          'Nasal cannula: 1-6 L/min, FiO₂ 24-44% — for mild hypoxemia, stable patients',
          'Simple face mask: 6-10 L/min, FiO₂ 40-60% — for moderate hypoxemia',
          'Non-rebreather mask: 10-15 L/min, FiO₂ 90-95% — for severe hypoxemia, trauma',
          'Venturi mask: specific FiO₂ settings (24-50%) — for precise O₂ delivery, COPD patients',
          'Bag-valve-mask: 15 L/min, FiO₂ near 100% — for respiratory failure, CPR',
          'Always ensure the reservoir bag on NRB remains at least 2/3 inflated during inspiration',
          'For COPD patients: start with low-flow O₂ (2 L/min NC) and monitor carefully'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Oxygen Delivery Devices Comparison', description: 'Side-by-side illustrations of four devices: Nasal cannula (prongs in nostrils), Simple face mask (covering nose and mouth), Non-rebreather mask (with reservoir bag), and Bag-valve-mask (self-inflating bag with mask). Each shows the flow rate range and FiO₂ delivered as a label.' },
      { title: 'Oxygen Cylinder and Regulator', description: 'Labeled diagram of an oxygen cylinder: cylinder body, valve, regulator with pressure gauge and flowmeter, humidifier bottle (optional), and tubing. Key safety features are marked: cylinder stand, valve handle, and pressure relief device.' },
      { title: 'Pulse Oximetry Reading Guide', description: 'A color-coded scale showing SpO₂ readings: 95-100% (green, normal), 91-94% (yellow, mild hypoxemia), 86-90% (orange, moderate hypoxemia), below 86% (red, severe hypoxemia requiring immediate intervention). Probe placement shown on finger.' }
    ],
    keyPoints: [
      'Nasal cannula: 1-6 L/min, delivers 24-44% FiO₂',
      'Non-rebreather mask: 10-15 L/min, delivers up to 90-95% FiO₂',
      'Bag-valve-mask with reservoir: 15 L/min, delivers near 100% FiO₂',
      'Oxygen supports combustion — no smoking, no open flames near O₂ equipment',
      'Target SpO₂ for most patients: 94-98%; COPD patients: 88-92%',
      'COPD patients may be CO₂ retainers — high-flow O₂ can suppress their hypoxic drive',
      'Always check cylinder pressure before transport — replace if below 500 psi'
    ],
    assessorQuestions: [
      'What are the different oxygen delivery devices and their respective flow rates and FiO₂?',
      'Why should caution be exercised when administering oxygen to COPD patients?',
      'How do you set up and operate an oxygen cylinder with regulator?',
      'What is the target SpO₂ for a normal patient versus a COPD patient?',
      'What safety precautions must be observed when handling oxygen equipment?'
    ],
    memorizationTips: [
      'Device flow rates: "1-6 NC, 6-10 Simple, 10-15 NRB, 15 BVM" — increasing order of acuity',
      'FiO₂: "NC=¼ to ½, Simple=½, NRB=nearly ALL, BVM=ALL" — think in fractions',
      'COPD target: "88-92%" — think "8-2" (ate too) because high O₂ is dangerous for them',
      'Safety: "NO FLAMES near O₂" — Oxygen makes fire burn hotter and faster'
    ],
    flashcards: [
      { front: 'What FiO₂ does a nasal cannula at 2 L/min deliver?', back: 'Approximately 28% FiO₂' },
      { front: 'What is the maximum FiO₂ delivered by a non-rebreather mask?', back: '90-95% FiO₂ at 10-15 L/min' },
      { front: 'What is the target SpO₂ for a COPD patient?', back: '88-92%' },
      { front: 'At what cylinder pressure should you replace the oxygen cylinder?', back: 'Below 500 psi' },
      { front: 'What should the reservoir bag on an NRB do during inspiration?', back: 'Remain at least 2/3 inflated (if it collapses fully, increase flow rate)' }
    ],
    miniQuiz: [
      { question: 'What flow rate is appropriate for a nasal cannula?', options: ['0.5-2 L/min', '1-6 L/min', '6-10 L/min', '10-15 L/min'], correctAnswer: 1, explanation: 'Nasal cannula flow rates range from 1-6 L/min, delivering approximately 24-44% FiO₂ depending on the flow rate.' },
      { question: 'Which device delivers the highest FiO₂?', options: ['Nasal cannula', 'Simple face mask', 'Non-rebreather mask', 'Bag-valve-mask with reservoir'], correctAnswer: 3, explanation: 'A BVM with reservoir at 15 L/min delivers nearly 100% FiO₂, higher than any other device.' },
      { question: 'Why is high-flow oxygen potentially dangerous for COPD patients?', options: ['It causes nasal dryness', 'It may suppress their hypoxic respiratory drive', 'It causes oxygen toxicity immediately', 'It increases blood pressure'], correctAnswer: 1, explanation: 'COPD patients may be CO₂ retainers who rely on their hypoxic drive to breathe. High-flow O₂ can remove this stimulus, causing respiratory depression.' },
      { question: 'A full oxygen cylinder reads approximately:', options: ['500 psi', '1000 psi', '1500 psi', '2000 psi'], correctAnswer: 3, explanation: 'A full D-size oxygen cylinder typically reads approximately 2000 psi when full.' },
      { question: 'The target SpO₂ for most patients is:', options: ['85-90%', '88-92%', '94-98%', '100%'], correctAnswer: 2, explanation: 'For most patients, the target SpO₂ is 94-98%. The 88-92% target is for COPD patients who are CO₂ retainers.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 7. AIRWAY MANAGEMENT — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'airway-management',
    title: 'Airway Management',
    shortTitle: 'Airway',
    description: 'Techniques for establishing and maintaining a patent airway including basic airway maneuvers, adjuncts, suctioning, and advanced airway devices at the BLS level.',
    icon: '🌬️',
    color: '#0891B2',
    category: 'Clinical',
    reviewerNotes: 'Airway management is the highest priority in the ABCDE approach and a critical skill assessed in TESDA NCII. The assessor will evaluate your ability to open the airway using manual maneuvers, select and insert appropriate airway adjuncts (OPA and NPA), perform suctioning, and use the bag-valve-mask effectively. In the Philippine prehospital setting, advanced airway devices may not always be available, so mastery of basic airway skills is paramount. Key concepts include the differences between OPA (requires unconscious patient with no gag reflex) and NPA (can be used in semi-conscious patients), proper BVM technique (EC-clamp), and recognition of airway obstruction. Remember: if the patient cannot breathe, nothing else matters.',
    procedures: [
      {
        title: 'Basic Airway Opening Maneuvers',
        steps: [
          'Assess airway patency: look, listen, and feel for air movement',
          'For medical patients without suspected spinal injury: head tilt-chin lift',
          'Place one hand on forehead tilting head back, fingers of other hand under chin lifting forward',
          'For trauma patients with suspected spinal injury: jaw thrust maneuver',
          'Place fingers behind the angle of the jaw and lift forward without extending the neck',
          'If foreign body visible: perform finger sweep (unconscious adults only)',
          'If airway remains obstructed: consider repositioning or advancing to airway adjuncts'
        ]
      },
      {
        title: 'Airway Adjunct Insertion',
        steps: [
          'OPA insertion: measure from corner of mouth to earlobe or angle of jaw',
          'Insert OPA with tip pointing toward roof of mouth, then rotate 180° as it passes the soft palate',
          'Alternatively, use a tongue depressor to guide the OPA directly over the tongue',
          'Ensure OPA does not push the tongue back — if patient gags, remove immediately',
          'NPA insertion: measure from tip of nose to earlobe, lubricate with water-soluble gel',
          'Insert NPA with bevel toward the nasal septum, advancing gently along the floor of the nasopharynx',
          'If resistance is met, try the other nostril — never force the NPA',
          'NPA can be used in semi-conscious patients with intact gag reflex (unlike OPA)'
        ]
      },
      {
        title: 'Bag-Valve-Mask (BVM) Ventilation',
        steps: [
          'Select the appropriate mask size (adult, child, infant)',
          'Connect BVM to oxygen source at 15 L/min with reservoir attached',
          'Position yourself at the patient\'s head',
          'Apply the mask using the EC-clamp technique: thumb and index finger form "C" on mask, remaining fingers lift jaw ("E")',
          'Ensure a tight seal between mask and face — no air leaks',
          'Squeeze the bag to deliver a 1-second breath with visible chest rise',
          'Avoid excessive ventilation — deliver only enough volume for visible chest rise',
          'For single rescuer: difficult to maintain seal and squeeze bag — consider pocket mask instead'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Head Tilt-Chin Lift vs Jaw Thrust', description: 'Side-by-side comparison: Left shows head tilt-chin lift (one hand on forehead tilting back, fingers under chin lifting forward) for medical patients. Right shows jaw thrust (fingers behind jaw angles lifting forward, no neck extension) for trauma patients. Arrows show the direction of force for each maneuver.' },
      { title: 'OPA Sizing and Insertion', description: 'Three panels: (1) OPA measurement from corner of mouth to earlobe, (2) OPA insertion with tip toward roof of mouth, (3) 180° rotation as it passes the soft palate to rest over the tongue. Cross-section showing the OPA holding the tongue away from the posterior pharynx.' },
      { title: 'EC-Clamp BVM Technique', description: 'Close-up of the EC-clamp hand position: thumb and index finger form a "C" pressing the mask to the face, while the middle, ring, and pinky fingers form an "E" lifting the jaw. The other hand squeezes the bag. Proper seal is demonstrated with no visible gaps.' }
    ],
    keyPoints: [
      'Airway is the FIRST priority — "A" comes before everything in ABCDE',
      'Head tilt-chin lift: for medical patients; Jaw thrust: for trauma patients',
      'OPA: only for unconscious patients with NO gag reflex — remove if patient gags',
      'NPA: can be used in semi-conscious patients with intact gag reflex; lubricate before insertion',
      'BVM with EC-clamp technique: maintain mask seal while lifting jaw',
      'Avoid excessive ventilation — just enough for visible chest rise (1 second per breath)',
      'NPA is contraindicated in suspected basilar skull fracture (CSF leak from nose/ears)'
    ],
    assessorQuestions: [
      'What is the difference between head tilt-chin lift and jaw thrust, and when is each used?',
      'How do you properly size and insert an Oropharyngeal Airway?',
      'What are the advantages of an NPA over an OPA?',
      'Describe the EC-clamp technique for BVM ventilation.',
      'When is an NPA contraindicated?'
    ],
    memorizationTips: [
      'Airway maneuvers: "Medical = Tilt, Trauma = Thrust" — simple rule for choosing the technique',
      'OPA measurement: "Mouth to Ear" — quick bedside sizing method',
      'OPA insertion: "Roof-Rotate" = point to roof of mouth, rotate 180°',
      'EC-clamp: "C on mask, E on jaw" — C seals, E lifts'
    ],
    flashcards: [
      { front: 'Which airway maneuver is used for trauma patients?', back: 'Jaw thrust (without head tilt, to maintain spinal alignment)' },
      { front: 'How is an OPA properly sized?', back: 'Measure from the corner of the mouth to the earlobe or angle of the jaw' },
      { front: 'When should an OPA be removed?', back: 'Immediately if the patient gags or has an intact gag reflex' },
      { front: 'What advantage does the NPA have over the OPA?', back: 'The NPA can be used in semi-conscious patients with intact gag reflex' },
      { front: 'What is the EC-clamp technique?', back: 'Thumb and index finger form a "C" on the mask, remaining fingers form an "E" lifting the jaw to maintain airway and seal' }
    ],
    miniQuiz: [
      { question: 'The jaw thrust maneuver is indicated for:', options: ['All patients', 'Medical patients only', 'Patients with suspected spinal injury', 'Conscious patients'], correctAnswer: 2, explanation: 'The jaw thrust is used for patients with suspected spinal injury because it opens the airway without extending the neck.' },
      { question: 'An OPA should be removed if:', options: ['The patient is unconscious', 'The patient gags', 'It is the wrong size', 'An NPA is available'], correctAnswer: 1, explanation: 'An OPA should only be used in unconscious patients without a gag reflex. If the patient gags, remove it immediately to prevent vomiting and aspiration.' },
      { question: 'An NPA is contraindicated in:', options: ['Conscious patients', 'Patients with gag reflex', 'Suspected basilar skull fracture', 'Pediatric patients'], correctAnswer: 2, explanation: 'NPA is contraindicated in suspected basilar skull fracture because it could pass through the fractured cribriform plate into the cranial vault.' },
      { question: 'How long should each breath be delivered with a BVM?', options: ['0.5 seconds', '1 second', '2 seconds', '3 seconds'], correctAnswer: 1, explanation: 'Each breath should be delivered over 1 second with just enough volume to produce visible chest rise.' },
      { question: 'Which adjunct can be used in a semi-conscious patient?', options: ['OPA only', 'NPA only', 'Both OPA and NPA', 'Neither — wait for unconsciousness'], correctAnswer: 1, explanation: 'The NPA can be used in semi-conscious patients with an intact gag reflex, unlike the OPA which requires an unconscious patient.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 8. BLEEDING CONTROL — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'bleeding-control',
    title: 'Bleeding Control',
    shortTitle: 'Bleeding',
    description: 'Assessment and management of external and internal hemorrhage including direct pressure, pressure dressings, tourniquet application, and recognition of hemorrhagic shock.',
    icon: '🩸',
    color: '#B91C1C',
    category: 'Clinical',
    reviewerNotes: 'Bleeding control is a life-saving skill that every EMS provider must master. The TESDA NCII assessor will evaluate your ability to classify hemorrhage severity, apply the correct intervention in the proper sequence, and recognize early signs of hemorrhagic shock. In the Philippine setting, vehicular crashes and violence-related injuries often produce significant hemorrhage. The key principle is the stepwise approach: direct pressure first, then elevation, then pressure points, and tourniquet as a LAST resort. You must also understand the classes of hemorrhagic shock and their clinical presentations. The tourniquet has been rehabilitated in recent guidelines — it is now considered appropriate for life-threatening extremity hemorrhage not controlled by direct pressure.',
    procedures: [
      {
        title: 'External Hemorrhage Control',
        steps: [
          'Don appropriate PPE (gloves minimum, eye protection for arterial bleeding)',
          'Apply firm direct pressure to the wound using a sterile dressing',
          'If bleeding continues, add more dressings on top (do NOT remove initial dressing)',
          'Elevate the injured extremity above the level of the heart if no fracture suspected',
          'If still bleeding, apply pressure to the appropriate pressure point proximal to the wound',
          'For life-threatening extremity hemorrhage uncontrolled by direct pressure: apply tourniquet',
          'Place tourniquet 2-3 inches above the wound, tighten until bleeding stops',
          'Note the TIME of tourniquet application on the patient\'s forehead or triage tag',
          'NEVER remove a field-applied tourniquet — document and inform receiving facility'
        ]
      },
      {
        title: 'Hemorrhagic Shock Recognition and Management',
        steps: [
          'Class I hemorrhage (up to 15% blood volume): minimal tachycardia, normal BP and RR',
          'Class II (15-30%): tachycardia >100, narrowed pulse pressure, mild anxiety, RR 20-30',
          'Class III (30-40%): significant tachycardia, hypotension, confused, RR 30-40, diaphoretic',
          'Class IV (>40%): severe tachycardia, profound hypotension, lethargic, RR >35',
          'Control all external hemorrhage immediately',
          'Keep patient warm (prevent hypothermia — the lethal triad of trauma)',
          'Elevate legs if no spinal injury suspected (modified Trendelenburg)',
          'Rapid transport to definitive surgical care — time is critical'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Stepwise Bleeding Control Flowchart', description: 'A flowchart showing the stepwise approach: Direct Pressure → Still bleeding? → Add dressings + Elevation → Still bleeding? → Pressure Points → Still bleeding? → Tourniquet (LAST resort). Each step is in a green box; the tourniquet box is red with a warning icon.' },
      { title: 'Classes of Hemorrhagic Shock', description: 'A table with four columns (Class I-IV) showing: estimated blood loss, heart rate, blood pressure, respiratory rate, mental status, and skin signs. Color gradient from green (Class I) to red (Class IV) showing progressive severity.' },
      { title: 'Tourniquet Application Technique', description: 'Step-by-step illustration: (1) Position tourniquet 2-3 inches above wound, (2) Tighten until bleeding stops, (3) Secure the tourniquet, (4) Write the time of application. Inset shows proper placement avoiding joints.' }
    ],
    keyPoints: [
      'Direct pressure is the FIRST and most effective method to control external bleeding',
      'Tourniquets are for life-threatening extremity hemorrhage not controlled by direct pressure',
      'Always note the TIME of tourniquet application — mark on patient',
      'Never remove a field-applied tourniquet — let hospital staff manage it',
      'Do NOT remove initial dressings — add more on top if bleeding continues',
      'Class III/IV hemorrhagic shock: hypotension is a LATE sign — do not wait for it',
      'The lethal triad of trauma: hypothermia, acidosis, coagulopathy — prevent all three'
    ],
    assessorQuestions: [
      'What is the stepwise approach to controlling external hemorrhage?',
      'What are the four classes of hemorrhagic shock and their key signs?',
      'When and how should a tourniquet be applied?',
      'Why should you never remove the initial dressing when bleeding continues?',
      'What is the lethal triad of trauma?'
    ],
    memorizationTips: [
      'Hemorrhage control sequence: "DEPT" = Direct pressure, Elevation, Pressure points, Tourniquet',
      'Shock classes: "I-15, II-30, III-40, IV-40+" (percentage of blood volume lost)',
      'Tourniquet: "LAST" = Last Alternative for Severe Trauma',
      'Lethal triad: "HAC" = Hypothermia, Acidosis, Coagulopathy'
    ],
    flashcards: [
      { front: 'What is the first method to control external bleeding?', back: 'Direct pressure with a sterile dressing' },
      { front: 'At what class of hemorrhagic shock does hypotension appear?', back: 'Class III (30-40% blood volume loss) — hypotension is a LATE sign' },
      { front: 'Where should a tourniquet be placed?', back: '2-3 inches above the wound, avoiding joints' },
      { front: 'What must you always document when applying a tourniquet?', back: 'The TIME of application' },
      { front: 'What is the lethal triad of trauma?', back: 'Hypothermia, Acidosis, Coagulopathy' }
    ],
    miniQuiz: [
      { question: 'What is the FIRST step in controlling external hemorrhage?', options: ['Apply a tourniquet', 'Apply direct pressure', 'Elevate the extremity', 'Apply a pressure point'], correctAnswer: 1, explanation: 'Direct pressure is always the first and most effective method for controlling external bleeding.' },
      { question: 'At what blood loss percentage does hypotension typically appear?', options: ['10-15%', '15-30%', '30-40%', 'Over 50%'], correctAnswer: 2, explanation: 'Hypotension typically appears at Class III hemorrhage (30-40% blood volume loss), making it a late and ominous sign.' },
      { question: 'If the first dressing becomes soaked with blood, you should:', options: ['Remove it and apply a new one', 'Add more dressings on top', 'Apply a tourniquet immediately', 'Apply ice'], correctAnswer: 1, explanation: 'Never remove the initial dressing as it may disrupt clot formation. Add more dressings on top and continue direct pressure.' },
      { question: 'A tourniquet should be placed:', options: ['Directly over the wound', '2-3 inches above the wound', 'Above the closest joint', 'As high as possible on the limb'], correctAnswer: 1, explanation: 'A tourniquet should be placed 2-3 inches above the wound, avoiding joints.' },
      { question: 'The lethal triad of trauma includes:', options: ['Hypertension, alkalosis, coagulopathy', 'Hypothermia, acidosis, coagulopathy', 'Hyperthermia, acidosis, hemolysis', 'Hypothermia, alkalosis, thrombosis'], correctAnswer: 1, explanation: 'The lethal triad of trauma consists of hypothermia, acidosis, and coagulopathy — each worsens the others in a vicious cycle.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 9. SPLINTING AND IMMOBILIZATION — Clinical
  // ──────────────────────────────────────────────
  {
    id: 'splinting-immobilization',
    title: 'Splinting and Immobilization',
    shortTitle: 'Splinting',
    description: 'Recognition and management of musculoskeletal injuries including fracture identification, proper splinting techniques, joint immobilization, and spinal motion restriction principles.',
    icon: '🦴',
    color: '#92400E',
    category: 'Clinical',
    reviewerNotes: 'Splinting and immobilization is a critical hands-on skill in the TESDA NCII assessment. The assessor will evaluate your ability to identify fracture signs, select the appropriate splint type, and apply it correctly. Key principles must be demonstrated: splint in the position found (unless no distal pulse), immobilize the joint above and below, pad all splints, and check CSM before and after application. Open fractures require special attention with sterile dressing and bleeding control — never push bone ends back in. In the Philippine EMS context, improvised splints using available materials (boards, magazines, umbrellas) are common and the assessor may ask you to improvise. Femur fractures are particularly dangerous due to potential 1-2 liter internal blood loss and require traction splinting.',
    procedures: [
      {
        title: 'General Splinting Procedure',
        steps: [
          'Assess and document distal CSM (Circulation, Sensation, Motor) BEFORE splinting',
          'Remove jewelry and constricting items from the injured extremity',
          'Control any bleeding (especially with open fractures) and cover with sterile dressing',
          'Select appropriate splint type: rigid, formable (SAM), soft, or traction',
          'Pad the splint generously, especially over bony prominences',
          'Immobilize the joint ABOVE and BELOW the fracture site',
          'Secure the splint with bandages or cravats — snug but not too tight',
          'Reassess distal CSM AFTER splinting — if worse, loosen and reapply'
        ]
      },
      {
        title: 'Traction Splint Application (Femur Fracture)',
        steps: [
          'Assess distal CSM and document before application',
          'Manually stabilize the injured leg in the position found',
          'Apply the ankle hitch around the foot and ankle',
          'Extend the splint along the lateral aspect of the leg past the hip',
          'Apply mechanical traction gradually until pain decreases or leg length matches',
          'Secure the splint with support straps at the thigh, knee, and lower leg',
          'Apply the groin strap (ischemia strap) against the ischial tuberosity',
          'Reassess distal CSM — if absent, reduce traction and recheck',
          'Pad all contact points and elevate the leg if possible'
        ]
      },
      {
        title: 'Improvised Splinting',
        steps: [
          'Identify available materials: boards, magazines, newspapers, umbrella, rolled blanket, pillow',
          'For forearm: roll magazine around the forearm, secure with tape or bandages',
          'For lower leg: use two boards or a folded newspaper on each side of the leg',
          'For shoulder/humerus: use a sling and swathe with a triangular bandage',
          'For ankle/foot: wrap with a pillow and secure with tape or bandages',
          'Always pad between the improvised splint and the skin',
          'Check CSM before and after any improvised splint application'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Splinting Principles Diagram', description: 'Illustration of a forearm fracture with a padded rigid splint in place, showing: splint extends from the joint above (elbow) to the joint below (wrist), generous padding, securing bandages, and the hand elevated. Callouts highlight: "Immobilize above AND below," "Pad all contact points," "Check CSM before and after."' },
      { title: 'Open vs Closed Fracture Comparison', description: 'Side-by-side comparison: Left shows a closed fracture with intact skin, swelling, and deformity but no external wound. Right shows an open fracture with bone ends protruding through the skin, bleeding, and contamination. Treatment priorities for each type are labeled.' },
      { title: 'Traction Splint for Femur Fracture', description: 'Step-by-step diagram showing traction splint application: (1) Manual stabilization, (2) Ankle hitch application, (3) Splint extension along lateral leg, (4) Traction applied, (5) Support straps secured. Labels show correct placement of each component.' }
    ],
    keyPoints: [
      'Splint in the POSITION FOUND unless no distal pulse — then align with gentle traction',
      'Immobilize the joint ABOVE and BELOW the fracture site',
      'Check CSM (Circulation, Sensation, Motor) before AND after splinting',
      'Open fractures: cover with sterile dressing, control bleeding, never push bone back in',
      'Pad all splints to protect bony prominences and prevent pressure injuries',
      'Femur fractures may cause 1-2 liters of internal blood loss — monitor for shock',
      'Traction splints are specifically for mid-shaft femur fractures'
    ],
    assessorQuestions: [
      'What are the general principles of splinting?',
      'How do you apply a traction splint for a femur fracture?',
      'What is the management of an open fracture?',
      'When should you realign a fractured extremity before splinting?',
      'How can you improvise a splint using common materials?'
    ],
    memorizationTips: [
      'Splinting: "PRAISE" = Position found, Remove jewelry, Assess CSM, Immobilize above/below, Secure, Evaluate CSM again',
      'CSM = "Can Someone Move?" = Circulation, Sensation, Motor function',
      'Open fracture: "CCN" = Control bleeding, Cover with sterile dressing, Never push bone back',
      'Femur blood loss = "1-2 liters" — think "Femur = Formula 1-2 liters"'
    ],
    flashcards: [
      { front: 'Should you realign a fracture before splinting?', back: 'Only if there is no distal pulse — otherwise splint in the position found' },
      { front: 'What joints must be immobilized for a fracture?', back: 'The joint above AND below the fracture site' },
      { front: 'What does CSM stand for?', back: 'Circulation, Sensation, Motor function' },
      { front: 'How much blood can be lost with a femur fracture?', back: '1-2 liters (1000-2000 mL) internally' },
      { front: 'What should you do with protruding bone ends in an open fracture?', back: 'Never push them back — cover with sterile dressing and control bleeding' }
    ],
    miniQuiz: [
      { question: 'Before applying a splint, what must you assess?', options: ['Only the fracture site', 'Distal CSM', 'Pain level only', 'Range of motion'], correctAnswer: 1, explanation: 'You must assess distal Circulation, Sensation, and Motor function before splinting to establish a baseline.' },
      { question: 'An open fracture is characterized by:', options: ['Swelling at the site', 'Bone ends protruding through the skin', 'Severe pain only', 'Crepitus on palpation'], correctAnswer: 1, explanation: 'An open (compound) fracture involves bone ends that have broken through the skin.' },
      { question: 'A traction splint is specifically indicated for:', options: ['Wrist fractures', 'Ankle fractures', 'Mid-shaft femur fractures', 'Humeral fractures'], correctAnswer: 2, explanation: 'Traction splints are specifically designed for mid-shaft femur fractures to reduce muscle spasm and minimize blood loss.' },
      { question: 'After splinting, if distal CSM is diminished, you should:', options: ['Document and continue', 'Loosen the splint and reapply', 'Apply more padding', 'Remove the splint entirely'], correctAnswer: 1, explanation: 'If distal CSM worsens after splinting, the splint may be too tight. Loosen it, recheck CSM, and reapply properly.' },
      { question: 'When is it acceptable to realign a deformed extremity before splinting?', options: ['Always', 'Never', 'When there is no distal pulse', 'When the patient requests it'], correctAnswer: 2, explanation: 'Realign the extremity only when there is no distal pulse, using gentle traction to restore perfusion. Otherwise, splint in the position found.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 10. AMBULANCE OPERATIONS — Operations
  // ──────────────────────────────────────────────
  {
    id: 'ambulance-operations',
    title: 'Ambulance Operations',
    shortTitle: 'Ambulance Ops',
    description: 'Safe ambulance operation, vehicle readiness, equipment management, communication protocols, and patient transport procedures in the Philippine EMS system.',
    icon: '🚑',
    color: '#2563EB',
    category: 'Operations',
    reviewerNotes: 'Ambulance operations is a critical operational competency covering vehicle operation, equipment management, and transport procedures. The TESDA NCII assessor will evaluate your knowledge of ambulance safety, pre-trip inspections, proper use of warning devices (lights and sirens), patient loading and securing, and communication with dispatch and receiving facilities. In the Philippine context, ambulance operations must consider traffic conditions, road quality variations (especially in rural areas), and the DOH standards for ambulance specification. Understanding when to use lights and sirens (emergent vs non-emergent transport), proper defensive driving techniques, and infection control measures within the ambulance are all assessed. The "load and go" versus "stay and play" decision-making process is also important.',
    procedures: [
      {
        title: 'Ambulance Pre-Trip Inspection',
        steps: [
          'Check vehicle exterior: tire pressure and condition, body damage, fluid leaks',
          'Verify fuel level (maintain at least ¾ tank at all times)',
          'Check engine compartment: oil, coolant, brake fluid, belts, hoses',
          'Test all warning devices: lights, sirens, horn, backup alarm',
          'Inspect patient compartment: stretcher function, oxygen supply, suction unit',
          'Verify all required equipment is present and functional per DOH checklist',
          'Check communication equipment: two-way radio, mobile phone, GPS',
          'Document inspection findings on the daily vehicle checklist',
          'Report any deficiencies immediately and do not operate unsafe vehicle'
        ]
      },
      {
        title: 'Patient Loading and Transport',
        steps: [
          'Position the ambulance for optimal loading and departure',
          'Ensure the stretcher is at the correct height and locked in position',
          'With a minimum of two rescuers, lift the patient using proper body mechanics',
          'Load the stretcher into the ambulance and engage all locking mechanisms',
          'Secure the patient with all stretcher straps (minimum: chest, waist, knees)',
          'Secure all loose equipment and ensure nothing can become a projectile',
          'Confirm with the team: patient secured, equipment secured, doors closed',
          'Determine transport mode: emergent (lights and sirens) or non-emergent',
          'Notify the receiving facility with a radio report including ETA'
        ]
      },
      {
        title: 'Radio Communication Protocol',
        steps: [
          'Listen before transmitting to avoid interrupting other communications',
          'Identify your unit: "Base, this is Ambulance [number]"',
          'Keep transmissions clear, concise, and professional',
          'Use standard medical terminology and approved abbreviations',
          'Include in patient report: unit ID, patient age/sex, chief complaint, vital signs, treatment given, ETA',
          'Use the echo-back method to confirm received instructions',
          'End transmission with your unit identifier: "Ambulance [number], clear"'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Ambulance Equipment Layout', description: 'Top-down diagram of a standard ambulance patient compartment showing: primary stretcher (center), squad bench (left), airway cabinet (above head), oxygen and suction (behind head), medication and supply cabinets (right side), and exterior compartments. Each area is labeled with its contents.' },
      { title: 'Stretcher Loading Sequence', description: 'Four-panel illustration showing: (1) Stretcher at loading height with patient secured, (2) Two-rescuer lift with proper body mechanics, (3) Stretcher rolling into ambulance, (4) Stretcher locked into the floor mount with all straps secured. Safety checks are highlighted at each step.' },
      { title: 'Radio Communication Flow', description: 'Flowchart showing proper radio communication: Listen → Identify Unit → Transmit Message → Wait for Acknowledgment → Confirm with Echo-back → Clear. Common errors (interrupting, no identification, lengthy transmission) are shown in red.' }
    ],
    keyPoints: [
      'Maintain ambulance fuel at ¾ tank minimum at all times',
      'Pre-trip inspections must be documented daily before the shift begins',
      'Use lights and sirens only for emergent transport — they increase accident risk by 3x',
      'Secure the patient with minimum three straps: chest, waist, and knees',
      'All loose equipment must be secured to prevent becoming projectiles during sudden stops',
      'Radio reports should include: unit ID, patient info, vital signs, treatment, ETA',
      'Defensive driving is always required — even with lights and sirens, the ambulance does NOT have absolute right of way'
    ],
    assessorQuestions: [
      'What are the components of a daily ambulance pre-trip inspection?',
      'When should lights and sirens be used during transport?',
      'Describe the proper procedure for loading a patient into an ambulance.',
      'What information should be included in a radio report to the receiving facility?',
      'What safety precautions must be observed when operating an ambulance with lights and sirens?'
    ],
    memorizationTips: [
      'Pre-trip inspection: "FLOW-BERT" = Fluids, Lights, Oxygen, Warning devices, Body, Equipment, Radio, Tires',
      'Patient securing: "CWK" = Chest, Waist, Knees — minimum three straps',
      'Radio report: "PVT-TE" = Patient info, Vital signs, Treatment given, Transport mode, ETA',
      'Lights and sirens risk: "3x danger" — they triple accident risk, use wisely'
    ],
    flashcards: [
      { front: 'What is the minimum fuel level an ambulance should maintain?', back: '¾ tank at all times' },
      { front: 'How many straps at minimum should secure a patient on a stretcher?', back: 'Three: chest, waist, and knees' },
      { front: 'Using lights and sirens increases accident risk by approximately:', back: '3 times (300%)' },
      { front: 'What should be included in a radio report?', back: 'Unit ID, patient age/sex, chief complaint, vital signs, treatment, ETA' },
      { front: 'What must be done with loose equipment before transport?', back: 'Secure all loose equipment to prevent it from becoming projectiles during sudden stops' }
    ],
    miniQuiz: [
      { question: 'What is the minimum acceptable fuel level for an ambulance at shift start?', options: ['¼ tank', '½ tank', '¾ tank', 'Full tank'], correctAnswer: 2, explanation: 'Ambulances should maintain at least ¾ tank of fuel at all times to ensure readiness for long-distance or multiple calls.' },
      { question: 'Using lights and sirens increases the risk of ambulance crashes by approximately:', options: ['50%', '100%', '200%', '500%'], correctAnswer: 2, explanation: 'Studies show that using lights and sirens increases crash risk by approximately 3 times (200% increase).' },
      { question: 'How many straps at minimum should secure a patient on the stretcher?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 2, explanation: 'At minimum, three straps should secure the patient: chest, waist, and knees.' },
      { question: 'What is the FIRST thing you should do before transmitting on the radio?', options: ['Speak loudly', 'Identify your unit', 'Listen for clear channel', 'Give the patient report'], correctAnswer: 2, explanation: 'Always listen first to ensure the channel is clear before transmitting to avoid interrupting other communications.' },
      { question: 'Who has absolute right of way when an ambulance approaches with lights and sirens?', options: ['The ambulance always', 'The ambulance never has absolute right of way', 'Only at intersections', 'Only on highways'], correctAnswer: 1, explanation: 'An ambulance with lights and sirens NEVER has absolute right of way. Defensive driving is always required, and the ambulance operator must ensure other vehicles have yielded before proceeding.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 11. INFECTION CONTROL — Foundation
  // ──────────────────────────────────────────────
  {
    id: 'infection-control',
    title: 'Infection Control',
    shortTitle: 'Infection Ctrl',
    description: 'Principles and practices of infection prevention including standard precautions, PPE use, sharps handling, biohazard waste disposal, and communicable disease awareness in the EMS setting.',
    icon: '🧤',
    color: '#16A34A',
    category: 'Foundation',
    reviewerNotes: 'Infection control is a fundamental competency that protects both the EMS provider and the patient. The TESDA NCII assessor will evaluate your understanding of standard precautions (formerly universal precautions), proper PPE selection and donning/doffing sequence, sharps handling, and biohazard waste management. In the Philippine context, communicable diseases such as tuberculosis, dengue, HIV, and hepatitis are prevalent, making infection control knowledge critical. The DOH and WHO guidelines form the basis of practice. Key emphasis is on the chain of infection, hand hygiene as the single most effective infection control measure, and proper post-exposure management protocols. The assessor may present scenarios involving highly infectious patients such as those with TB or COVID-19.',
    procedures: [
      {
        title: 'PPE Donning and Doffing Sequence',
        steps: [
          'Donning sequence: (1) Hand hygiene, (2) Gown, (3) Mask/respirator, (4) Goggles/face shield, (5) Gloves (over gown cuffs)',
          'Ensure gown covers all exposed skin and ties securely in back',
          'Fit-check the N95 mask: positive and negative pressure check',
          'Doffing sequence (most contaminated first): (1) Gloves, (2) Gown, (3) Goggles/face shield, (4) Mask/respirator',
          'Remove gloves using glove-in-glove technique — avoid touching outer surface',
          'Remove gown by untying and pulling forward, rolling outside in',
          'Handle goggles by the headband only — do not touch the front surface',
          'Perform hand hygiene immediately after removing all PPE'
        ]
      },
      {
        title: 'Sharps and Biohazard Waste Management',
        steps: [
          'Never recap, bend, or break used needles — place directly in sharps container',
          'Sharps containers must be puncture-resistant, leak-proof, and labeled with biohazard symbol',
          'Replace sharps containers when ¾ full — never overfill',
          'Place all contaminated disposable items in red biohazard bags',
          'Seal biohazard bags before removing from the patient care area',
          'Clean blood spills with appropriate disinfectant (1:10 bleach solution for large spills)',
          'Transport biohazard waste in leak-proof secondary containers',
          'Document any exposure incidents and report to the infection control officer immediately'
        ]
      },
      {
        title: 'Post-Exposure Management',
        steps: [
          'Needlestick/sharps exposure: immediately wash the wound with soap and water',
          'Mucous membrane exposure: flush with copious amounts of water',
          'Report the exposure to your supervisor/infection control officer immediately',
          'Identify the source patient if possible for baseline testing',
          'Seek medical evaluation within 1-2 hours for PEP consideration',
          'HIV PEP must be started within 72 hours (ideally within 1-2 hours)',
          'Hepatitis B PEP (HBIG and vaccine) should be given within 24 hours',
          'Complete incident report and follow up at recommended intervals (6 weeks, 3 months, 6 months)'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Chain of Infection', description: 'Six linked circles showing the chain of infection: (1) Infectious Agent (virus, bacteria), (2) Reservoir (human, environment), (3) Portal of Exit (respiratory, blood), (4) Mode of Transmission (contact, droplet, airborne), (5) Portal of Entry (mucous membrane, wound), (6) Susceptible Host. Breaking any link stops infection.' },
      { title: 'PPE Donning and Doffing Sequence', description: 'Two vertical sequences: Left (Donning): Hand hygiene → Gown → Mask → Goggles → Gloves. Right (Doffing): Gloves → Gown → Goggles → Mask → Hand hygiene. Each step has an illustration. Arrows show the progression direction.' },
      { title: 'Biohazard Symbols and Labels', description: 'Display of standard biohazard warning symbols: biohazard symbol (red/orange on white), sharps container label, red biohazard bag, and regulated medical waste label. Each symbol is labeled with its specific use case and regulatory requirement.' }
    ],
    keyPoints: [
      'Standard precautions apply to ALL patient contact — treat all blood and body fluids as infectious',
      'Hand hygiene is the single most effective measure to prevent infection spread',
      'Donning sequence: Gown → Mask → Goggles → Gloves',
      'Doffing sequence: Gloves → Gown → Goggles → Mask (most contaminated first)',
      'Never recap, bend, or break needles — place directly in sharps container',
      'Sharps containers must be replaced when ¾ full',
      'Post-exposure: wash wound immediately, report within 1 hour, seek PEP evaluation'
    ],
    assessorQuestions: [
      'What is the correct sequence for donning and doffing PPE?',
      'What are the six links in the chain of infection?',
      'How should sharps be handled and disposed of in the prehospital setting?',
      'What is the proper management after a needlestick exposure?',
      'What is the difference between standard precautions and transmission-based precautions?'
    ],
    memorizationTips: [
      'Donning: "G-M-G-G" = Gown, Mask, Goggles, Gloves (clean to dirty)',
      'Doffing: "G-G-G-M" = Gloves, Gown, Goggles, Mask (dirty to clean)',
      'Chain of infection: "ARTEMIS" = Agent, Reservoir, Transmission, Exit, Mode, Immunity (susceptibility), Site (entry)',
      'Sharps safety: "No Re-Brek" = Never Recap, Bend, or Break needles'
    ],
    flashcards: [
      { front: 'What is the correct donning sequence for PPE?', back: 'Gown → Mask/Respirator → Goggles/Face Shield → Gloves' },
      { front: 'What is the single most effective infection control measure?', back: 'Hand hygiene' },
      { front: 'When should a sharps container be replaced?', back: 'When it is ¾ full' },
      { front: 'What should you do first after a needlestick injury?', back: 'Wash the wound immediately with soap and water, then report the exposure' },
      { front: 'How soon must HIV PEP be started after exposure?', back: 'Within 72 hours (ideally within 1-2 hours for maximum effectiveness)' }
    ],
    miniQuiz: [
      { question: 'What is the correct order for donning PPE?', options: ['Gloves, Gown, Mask, Goggles', 'Gown, Mask, Goggles, Gloves', 'Mask, Gown, Gloves, Goggles', 'Goggles, Mask, Gown, Gloves'], correctAnswer: 1, explanation: 'The correct donning sequence is Gown → Mask → Goggles → Gloves. Gloves go last so they can cover the gown cuffs.' },
      { question: 'The single most effective infection control measure is:', options: ['Wearing gloves', 'Hand hygiene', 'Using an N95 mask', 'Vaccination'], correctAnswer: 1, explanation: 'Hand hygiene is universally recognized as the single most effective measure to prevent the spread of infections.' },
      { question: 'Used needles should be:', options: ['Recapped before disposal', 'Broken and placed in regular trash', 'Placed directly in a sharps container without recapping', 'Given to the patient for disposal'], correctAnswer: 2, explanation: 'Never recap, bend, or break used needles. Place them directly in a puncture-resistant sharps container.' },
      { question: 'After a needlestick exposure, HIV PEP should ideally be started within:', options: ['24 hours', '48 hours', '1-2 hours', '72 hours'], correctAnswer: 2, explanation: 'HIV PEP should ideally be started within 1-2 hours of exposure for maximum effectiveness, and no later than 72 hours.' },
      { question: 'Standard precautions apply to:', options: ['Only patients with known infections', 'Only blood', 'All blood and body fluids from all patients', 'Only patients with HIV or hepatitis'], correctAnswer: 2, explanation: 'Standard precautions apply to ALL blood and body fluids from ALL patients, regardless of known infection status.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 12. DISASTER RESPONSE — Operations
  // ──────────────────────────────────────────────
  {
    id: 'disaster-response',
    title: 'Disaster Response',
    shortTitle: 'Disaster',
    description: 'Principles and procedures for responding to mass casualty incidents and disasters including the Incident Command System, MCI management, and disaster preparedness in the Philippine context.',
    icon: '🌀',
    color: '#CA8A04',
    category: 'Operations',
    reviewerNotes: 'Disaster response is a critical operational competency in the Philippines, which is highly vulnerable to natural disasters including typhoons, earthquakes, volcanic eruptions, and flooding. The TESDA NCII assessor will evaluate your understanding of the Incident Command System (ICS), mass casualty incident (MCI) management, and the Philippine disaster management framework (NDRRMC, LDRRMC). Key concepts include the transition from normal operations to disaster mode, proper resource allocation, communication during disasters, and the role of EMS within the broader disaster response system. Understanding the difference between an MCI and a disaster, and how to adapt standard EMS procedures for mass casualty situations, is essential.',
    procedures: [
      {
        title: 'Mass Casualty Incident Response',
        steps: [
          'Arrive and perform scene size-up: assess scope, number of patients, hazards',
          'Declare an MCI and activate the local disaster response plan',
          'Establish the Incident Command Post (ICP) in a safe location upwind and uphill',
          'Assume Incident Commander role until relieved by a higher-ranking officer',
          'Designate triage, treatment, transport, and staging areas',
          'Conduct rapid triage using START or SALT method',
          'Begin moving patients to designated treatment areas by priority',
          'Request additional resources through proper ICS channels',
          'Maintain documentation: patient tracking, resource allocation, situation reports'
        ]
      },
      {
        title: 'Incident Command System Setup',
        steps: [
          'Incident Commander: overall command and responsibility for the incident',
          'Operations Section Chief: directs tactical operations (triage, treatment, transport)',
          'Planning Section Chief: collects and evaluates information, develops action plans',
          'Logistics Section Chief: provides resources, supplies, and support',
          'Finance/Administration Section Chief: tracks costs and manages procurement',
          'Establish clear span of control (1 supervisor to 3-7 subordinates, optimal 5)',
          'Use common terminology and standardized ICS forms',
          'Conduct regular briefings and maintain unified command with other agencies'
        ]
      },
      {
        title: 'Typhoon/Disaster Preparedness Protocol',
        steps: [
          'Monitor PAGASA weather bulletins and NDRRMC advisories',
          'Pre-position ambulances and resources in strategic locations before landfall',
          'Ensure all vehicles are fueled, equipped, and ready for deployment',
          'Establish communication backup: radio, satellite phone, mobile phone',
          'Coordinate with local DRRMC and hospital command centers',
          'Prepare for extended operations: food, water, rest rotation for personnel',
          'After the event: conduct search and rescue, damage assessment, and medical missions',
          'Document all responses and participate in after-action reviews'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'ICS Organization Chart', description: 'Hierarchical chart showing the ICS structure: Incident Commander at top, with four section chiefs below (Operations, Planning, Logistics, Finance/Admin). Each section has its subordinate units: Operations has Triage, Treatment, Transport; Planning has Situation Unit, Resource Unit; Logistics has Supply, Communications, Facilities; Finance has Time, Cost, Procurement.' },
      { title: 'MCI Scene Layout', description: 'Bird\'s-eye view of an MCI scene: Incident Command Post upwind, triage area near the incident, treatment areas (Red/Yellow/Green zones) further away, transport sector with ambulance staging, and a morgue area (Black zone). Arrows show patient flow from incident → triage → treatment → transport.' },
      { title: 'Philippine Disaster Management Framework', description: 'Organizational chart showing the Philippine disaster response hierarchy: NDRRMC (national) → RDRRMC (regional) → PDRRMC (provincial) → C/MDRRMC (city/municipal) → BDRRMC (barangay). Each level shows its roles and responsibilities.' }
    ],
    keyPoints: [
      'ICS provides a standardized management structure for all-hazard response',
      'Span of control: 1 supervisor to 3-7 subordinates (optimal 5)',
      'MCI: when the number of patients exceeds available resources',
      'START triage: assess RPM — Respirations, Perfusion, Mental status',
      'Philippine disaster management: NDRRMC leads at the national level',
      'Pre-positioning of resources before predictable disasters saves lives',
      'Common terminology in ICS prevents miscommunication between agencies'
    ],
    assessorQuestions: [
      'What is the Incident Command System and why is it important?',
      'Describe the proper setup of an MCI scene including designated areas.',
      'What is the role of NDRRMC in Philippine disaster management?',
      'How do you establish span of control during a disaster response?',
      'What preparations should EMS make before a typhoon makes landfall?'
    ],
    memorizationTips: [
      'ICS sections: "OPLF" = Operations, Planning, Logistics, Finance/Administration',
      'MCI scene layout: "T-T-T-T" = Triage, Treatment, Transport, Triage (exit)',
      'Span of control: "3 to 7, 5 is heaven" — optimal 5 subordinates per supervisor',
      'START triage: "RPM" = Respirations, Perfusion (pulse), Mental status'
    ],
    flashcards: [
      { front: 'What does ICS stand for?', back: 'Incident Command System — a standardized management structure for emergency response' },
      { front: 'What is the optimal span of control in ICS?', back: '1 supervisor to 5 subordinates (range: 3-7)' },
      { front: 'What does NDRRMC stand for?', back: 'National Disaster Risk Reduction and Management Council' },
      { front: 'What defines a mass casualty incident?', back: 'When the number and severity of patients exceeds available resources' },
      { front: 'What does RPM stand for in START triage?', back: 'Respirations, Perfusion (capillary refill/pulse), Mental status' }
    ],
    miniQuiz: [
      { question: 'The Incident Command System provides:', options: ['A specific disaster response plan', 'A standardized management framework for all-hazard response', 'A triage protocol', 'A communication device'], correctAnswer: 1, explanation: 'The ICS provides a standardized, flexible management framework applicable to all types and sizes of incidents.' },
      { question: 'The optimal span of control in ICS is:', options: ['1:2', '1:5', '1:10', '1:15'], correctAnswer: 1, explanation: 'The optimal span of control is 1 supervisor to 5 subordinates, with an acceptable range of 3-7.' },
      { question: 'During an MCI, the Incident Command Post should be located:', options: ['At the incident site', 'Upwind and uphill from the incident', 'At the nearest hospital', 'At the ambulance staging area'], correctAnswer: 1, explanation: 'The ICP should be established in a safe location upwind and uphill from the incident to protect command staff from hazards.' },
      { question: 'NDRRMC stands for:', options: ['National Disaster Rescue and Relief Management Council', 'National Disaster Risk Reduction and Management Council', 'National Disaster Response and Recovery Management Center', 'National Disease Risk Reduction and Management Council'], correctAnswer: 1, explanation: 'NDRRMC stands for National Disaster Risk Reduction and Management Council, the lead agency for disaster management in the Philippines.' },
      { question: 'Before a typhoon, EMS should:', options: ['Wait for the typhoon to pass', 'Pre-position resources in strategic locations', 'Evacuate all ambulances', 'Shut down all operations'], correctAnswer: 1, explanation: 'Pre-positioning ambulances and resources in strategic locations before a typhoon ensures rapid response capability when the storm passes.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 13. TRIAGE SYSTEM — Operations
  // ──────────────────────────────────────────────
  {
    id: 'triage-system',
    title: 'Triage System',
    shortTitle: 'Triage',
    description: 'Patient prioritization systems for mass casualty incidents including START, SALT, and color-coded triage categories with proper tagging and documentation procedures.',
    icon: '🏷️',
    color: '#E11D48',
    category: 'Operations',
    reviewerNotes: 'Triage is the process of prioritizing patients based on the severity of their condition when resources are limited. The TESDA NCII assessor will test your knowledge of triage systems, particularly the START (Simple Triage and Rapid Treatment) method, and the four color-coded categories: Red (Immediate), Yellow (Delayed), Green (Minor), and Black (Deceased/Expectant). Understanding the RPM assessment (Respirations, Perfusion, Mental status) is critical for START triage. In the Philippine context, the DOH has adopted the color-coded triage system, and EMS providers must be proficient in rapid decision-making. The assessor may present MCI scenarios requiring you to triage multiple patients within seconds per patient. Remember: in MCI, you do the GREATEST GOOD for the GREATEST NUMBER — this is different from routine care where you focus on the individual patient.',
    procedures: [
      {
        title: 'START Triage Procedure',
        steps: [
          'Instruct all walking patients to move to a designated area — these are GREEN (Minor)',
          'For non-ambulatory patients, assess RPM starting with Respirations',
          'Respirations >30/min: tag RED (Immediate)',
          'Respirations not present: open airway with positioning; if still no breathing: tag BLACK (Deceased)',
          'If respirations present and <30/min: assess Perfusion (radial pulse or capillary refill)',
          'Absent radial pulse or capillary refill >2 seconds: tag RED (Immediate)',
          'Radial pulse present: assess Mental status (follows commands?)',
          'Unable to follow commands (altered mental status): tag RED (Immediate)',
          'Able to follow commands: tag YELLOW (Delayed)',
          'Each patient assessment should take no more than 30-60 seconds'
        ]
      },
      {
        title: 'Triage Tag Application and Documentation',
        steps: [
          'Use standard METTAG or similar triage tags for each patient',
          'Apply the tag to the patient\'s wrist or ankle — never remove a tag once applied',
          'Tear off the colored sections that do NOT apply (leaving only the assigned color)',
          'Document: triage category, time of triage, obvious injuries, and interventions given',
          'Record the triage tag number for patient tracking',
          'Re-triage patients periodically as conditions can change',
          'Communicate total patient counts by category to the Incident Commander',
          'Ensure all patients have tags before moving to treatment areas'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'START Triage Decision Tree', description: 'A flowchart for START triage: Can walk? → YES = GREEN. NO → Respirations? NONE after positioning → BLACK. >30/min → RED. <30/min → Perfusion? No radial pulse → RED. Radial present → Mental? Cannot follow commands → RED. Can follow commands → YELLOW. Each decision point is clearly labeled with the color result.' },
      { title: 'Triage Color Categories', description: 'Four color-coded panels: RED (Immediate — life-threatening, needs treatment within minutes), YELLOW (Delayed — serious but can wait 1-2 hours), GREEN (Minor — walking wounded, can wait hours), BLACK (Deceased/Expectant — not survivable with available resources). Each panel lists examples of injuries in that category.' },
      { title: 'METTAG Triage Tag', description: 'An illustration of a standard METTAG with four tear-off colored strips: RED at top, YELLOW below, GREEN below that, BLACK at bottom. The tag includes spaces for patient information, vital signs, time, and interventions. Proper application on the wrist is shown.' }
    ],
    keyPoints: [
      'START triage uses RPM: Respirations, Perfusion, Mental status',
      'RED (Immediate): life-threatening, needs treatment within minutes',
      'YELLOW (Delayed): serious but stable, can wait 1-2 hours',
      'GREEN (Minor): walking wounded, minor injuries, can wait hours',
      'BLACK (Deceased/Expectant): not breathing after airway opening, or unsurvivable injuries',
      'MCI principle: greatest good for the greatest number — NOT individual-focused care',
      'Each patient triage should take no more than 30-60 seconds'
    ],
    assessorQuestions: [
      'Describe the START triage process step by step.',
      'What does RPM stand for and how is it used in triage?',
      'What is the difference between RED and YELLOW triage categories?',
      'How does the MCI triage principle differ from routine patient care?',
      'What information should be documented on a triage tag?'
    ],
    memorizationTips: [
      'START triage: "RPM" = Respirations, Perfusion, Mental status — check in that order',
      'Categories: "RYGB" = Red (Immediate), Yellow (Delayed), Green (Minor), Black (Deceased)',
      'MCI principle: "Greatest Good for Greatest Number" — think "GGGN"',
      'Walking = GREEN automatically; >30 breaths = RED; no pulse = RED; confused = RED'
    ],
    flashcards: [
      { front: 'What does RPM stand for in START triage?', back: 'Respirations, Perfusion (radial pulse/capillary refill), Mental status' },
      { front: 'What triage category are walking patients assigned?', back: 'GREEN (Minor) — they are the walking wounded' },
      { front: 'What is the RED triage category?', back: 'Immediate — life-threatening conditions requiring treatment within minutes' },
      { front: 'What is the MCI triage principle?', back: 'Greatest good for the greatest number of patients' },
      { front: 'How long should each patient triage assessment take?', back: '30-60 seconds maximum' }
    ],
    miniQuiz: [
      { question: 'In START triage, a patient with respirations of 35/min is tagged:', options: ['GREEN', 'YELLOW', 'RED', 'BLACK'], correctAnswer: 2, explanation: 'Respirations >30/min automatically tags the patient as RED (Immediate) in START triage.' },
      { question: 'A patient who can walk to a designated area is triaged as:', options: ['RED', 'YELLOW', 'GREEN', 'BLACK'], correctAnswer: 2, explanation: 'All patients who can walk are automatically triaged as GREEN (Minor) in the START system.' },
      { question: 'What is the BLACK triage category?', options: ['Immediate', 'Delayed', 'Minor', 'Deceased/Expectant'], correctAnswer: 3, explanation: 'BLACK indicates deceased or expectant patients whose injuries are unsurvivable with available resources.' },
      { question: 'In MCI triage, the guiding principle is:', options: ['Save the most critical patient first', 'Greatest good for the greatest number', 'First come, first served', 'Treat children first'], correctAnswer: 1, explanation: 'MCI triage follows the principle of doing the greatest good for the greatest number, which may mean not spending resources on patients with minimal chance of survival.' },
      { question: 'In START triage, absent radial pulse indicates:', options: ['GREEN tag', 'YELLOW tag', 'RED tag', 'BLACK tag'], correctAnswer: 2, explanation: 'Absent radial pulse (or capillary refill >2 seconds) indicates poor perfusion and tags the patient as RED (Immediate).' }
    ]
  },

  // ──────────────────────────────────────────────
  // 14. EMS ETHICS — Foundation
  // ──────────────────────────────────────────────
  {
    id: 'ems-ethics',
    title: 'EMS Ethics',
    shortTitle: 'Ethics',
    description: 'Ethical principles, legal responsibilities, patient rights, consent, confidentiality, and professional conduct for Emergency Medical Services providers in the Philippine context.',
    icon: '⚖️',
    color: '#6D28D9',
    category: 'Foundation',
    reviewerNotes: 'EMS Ethics covers the legal and ethical framework within which all EMS providers must operate. The TESDA NCII assessor will evaluate your understanding of informed consent, implied consent, patient refusal, confidentiality, and your legal duties as an EMS provider. In the Philippine context, key legal bases include RA 8344 (prohibiting the refusal of hospitals to administer emergency treatment), the Philippine Constitution\'s right to health, and the Data Privacy Act of 2012 (RA 10173). Understanding the difference between ethical and legal obligations, the principle of beneficence versus autonomy, and the duty to act is critical. The assessor may present scenarios involving patient refusal, end-of-life decisions, or conflicts between patient wishes and medical best interest.',
    procedures: [
      {
        title: 'Obtaining Informed Consent',
        steps: [
          'Identify yourself and your qualifications to the patient',
          'Explain the proposed treatment or procedure in clear, non-medical language',
          'Describe the risks, benefits, and alternatives to the proposed treatment',
          'Explain the consequences of refusing treatment',
          'Ensure the patient has the capacity to make decisions (alert, oriented, not impaired)',
          'Allow the patient to ask questions and answer them fully',
          'Obtain and document verbal or written consent before proceeding',
          'For minors: obtain consent from a parent or legal guardian'
        ]
      },
      {
        title: 'Managing Patient Refusal',
        steps: [
          'Determine if the patient has decision-making capacity (AOx4, no impairment)',
          'Explain the risks of refusing treatment, including potential death or disability',
          'Document the patient\'s stated reason for refusal in their own words',
          'Have the patient sign a refusal form (Against Medical Advice / AMA)',
          'Have a witness (preferably a family member or another provider) sign the form',
          'Offer alternative options (e.g., follow up with their own doctor)',
          'Document all assessment findings, vital signs, and the advice given',
          'If the patient lacks capacity and is in danger, treat under implied consent'
        ]
      },
      {
        title: 'Patient Confidentiality Protocol',
        steps: [
          'Share patient information only with other healthcare providers involved in the patient\'s care',
          'Do not discuss patient information in public areas or with unauthorized persons',
          'Secure all patient records and documentation',
          'Comply with the Data Privacy Act of 2012 (RA 10173)',
          'Exceptions: mandatory reporting (child abuse, notifiable diseases, threats to self/others)',
          'Obtain patient consent before releasing information to third parties',
          'Use secure communication methods when transmitting patient data',
          'Dispose of patient records according to retention and destruction policies'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Types of Consent in EMS', description: 'A decision tree showing consent types: Informed Consent (competent patient, explained risks/benefits), Implied Consent (unconscious or incapacitated patient, emergency treatment), Minor Consent (parent/guardian required), and Involuntary Consent (court order, public health emergency). Each type has examples and legal basis.' },
      { title: 'Ethical Decision-Making Framework', description: 'A flowchart for ethical dilemmas: Identify the problem → Gather facts → Identify stakeholders → Consider ethical principles (beneficence, non-maleficence, autonomy, justice) → Explore options → Choose and implement → Evaluate outcome. Each step includes guiding questions.' },
      { title: 'Patient Rights in the Philippines', description: 'A visual list of patient rights under Philippine law: Right to emergency treatment (RA 8344), Right to informed consent, Right to refuse treatment, Right to confidentiality (RA 10173), Right to access medical records, Right to be treated with dignity, Right to choose healthcare provider.' }
    ],
    keyPoints: [
      'Informed consent requires: capacity, disclosure of risks/benefits, and voluntary agreement',
      'Implied consent applies when a patient cannot consent (unconscious, altered mental status) in an emergency',
      'RA 8344 prohibits hospitals from refusing emergency treatment to patients',
      'RA 10173 (Data Privacy Act) protects patient health information',
      'Patient refusal (AMA) must be documented thoroughly with risks explained and witness signature',
      'Duty to act: once you begin care, you have a legal obligation to continue until transferred',
      'Beneficence (do good) must be balanced with autonomy (respect patient\'s choices)'
    ],
    assessorQuestions: [
      'What is the difference between informed consent and implied consent?',
      'What does RA 8344 provide for patients in the Philippines?',
      'How should you manage a patient who refuses treatment against medical advice?',
      'What are the exceptions to patient confidentiality?',
      'What is the duty to act and when does it apply?'
    ],
    memorizationTips: [
      'Consent types: "IIMI" = Informed, Implied, Minor (guardian), Involuntary (court)',
      'Implied consent: "Unconscious = Consent to treat" — emergency doctrine',
      'RA 8344: "No refusal of emergency care" — remember the number 8-3-4-4 (8 hospitals, 3 patients, 4 rights, 4 penalties)',
      'Ethical principles: "BANJ" = Beneficence, Autonomy, Non-maleficence, Justice'
    ],
    flashcards: [
      { front: 'What is implied consent?', back: 'Legal doctrine that allows treatment of patients who cannot consent (unconscious, altered) in emergency situations' },
      { front: 'What does RA 8344 prohibit?', back: 'Refusal of hospitals and clinics to administer emergency medical treatment to patients' },
      { front: 'What does AMA stand for?', back: 'Against Medical Advice — when a competent patient refuses recommended treatment' },
      { front: 'What are the four main ethical principles?', back: 'Beneficence, Autonomy, Non-maleficence, Justice' },
      { front: 'What does RA 10173 protect?', back: 'Personal data privacy, including health information (Data Privacy Act of 2012)' }
    ],
    miniQuiz: [
      { question: 'Implied consent applies when:', options: ['A patient signs a consent form', 'A patient is unconscious or unable to consent in an emergency', 'A patient verbally agrees', 'A family member consents'], correctAnswer: 1, explanation: 'Implied consent (emergency doctrine) allows treatment when a patient is unable to consent and emergency treatment is needed to prevent death or disability.' },
      { question: 'RA 8344 prohibits:', options: ['Patients from refusing treatment', 'Hospitals from refusing emergency treatment', 'EMS from transporting patients', 'Doctors from prescribing medications'], correctAnswer: 1, explanation: 'RA 8344 prohibits hospitals and clinics from refusing to administer emergency medical treatment or requesting deposits before treatment.' },
      { question: 'When a patient refuses treatment, you should:', options: ['Force the treatment', 'Document the refusal with risks explained and witness signature', 'Leave immediately', 'Call the police'], correctAnswer: 1, explanation: 'When a competent patient refuses, document the refusal, explain the risks, and have the patient sign an AMA form with a witness present.' },
      { question: 'The Data Privacy Act of 2012 is:', options: ['RA 10173', 'RA 8344', 'RA 9433', 'RA 10121'], correctAnswer: 0, explanation: 'The Data Privacy Act of 2012 is Republic Act 10173, which protects personal data including health information.' },
      { question: 'Once you begin providing care to a patient, you have:', options: ['No further obligation', 'A duty to act and continue care until transfer', 'Only a moral obligation', 'An obligation only if the patient pays'], correctAnswer: 1, explanation: 'Once you initiate care, you have a legal duty to act — you must continue providing care until properly transferred to another qualified provider.' }
    ]
  },

  // ──────────────────────────────────────────────
  // 15. VITAL SIGNS MONITORING — Foundation
  // ──────────────────────────────────────────────
  {
    id: 'vital-signs',
    title: 'Vital Signs Monitoring',
    shortTitle: 'Vital Signs',
    description: 'Accurate measurement, interpretation, and documentation of vital signs including blood pressure, heart rate, respiratory rate, oxygen saturation, temperature, and blood glucose level.',
    icon: '🩺',
    color: '#0D9488',
    category: 'Foundation',
    reviewerNotes: 'Vital signs monitoring is a fundamental assessment skill that provides objective data about a patient\'s physiological status. The TESDA NCII assessor will evaluate your ability to accurately measure and interpret all vital signs, including blood pressure (both manual and automated), heart rate, respiratory rate, SpO₂, temperature, and blood glucose. In the Philippine EMS setting, manual blood pressure measurement using a sphygmomanometer and stethoscope is a core competency that must be demonstrated flawlessly. Understanding normal ranges for all age groups, recognizing abnormal values, and identifying trends is critical. The assessor will pay close attention to your technique: proper cuff size selection, patient positioning, Korotkoff sounds identification, and respiratory rate measurement (count for a full minute without the patient knowing). Blood glucose measurement and interpretation is also assessed.',
    procedures: [
      {
        title: 'Manual Blood Pressure Measurement',
        steps: [
          'Select the correct cuff size: bladder should cover 80% of the arm circumference',
          'Position the patient seated with arm supported at heart level',
          'Palpate the brachial artery in the antecubital fossa',
          'Apply the cuff snugly with the artery marker over the brachial artery',
          'Inflate the cuff 30 mmHg above the palpatory systolic pressure estimate',
          'Deflate slowly at 2-3 mmHg per second while listening with the stethoscope',
          'Record the first Korotkoff sound as systolic and the disappearance as diastolic',
          'Record the reading, patient position, arm used, and time of measurement'
        ]
      },
      {
        title: 'Complete Vital Signs Assessment',
        steps: [
          'Heart Rate: palpate radial pulse for 30 seconds × 2 (regular) or full 60 seconds (irregular)',
          'Respiratory Rate: count for 30 seconds × 2 (regular) or full 60 seconds (irregular) — do not tell the patient',
          'Blood Pressure: measure using proper technique (see separate procedure)',
          'SpO₂: apply pulse oximeter probe to finger, note reading and waveform quality',
          'Temperature: use appropriate route (oral, tympanic, temporal, axillary)',
          'Blood Glucose: perform fingerstick using glucometer, record in mg/dL',
          'Skin assessment: color, temperature, moisture, condition (CTMC)',
          'Pupils: size, equality, reactivity to light (PERRL)',
          'Document all findings with time and compare to previous readings for trends'
        ]
      },
      {
        title: 'Blood Glucose Measurement',
        steps: [
          'Explain the procedure to the patient and obtain consent',
          'Gather supplies: glucometer, test strip, lancet, alcohol swab, gauze',
          'Insert a fresh test strip into the glucometer and verify it is ready',
          'Clean the finger with alcohol and allow to dry completely',
          'Use the lancet on the SIDE of the fingertip (less painful than the pad)',
          'Wipe away the first drop of blood, then apply the second drop to the test strip',
          'Wait for the glucometer to display the result',
          'Record the reading, time, and any interventions',
          'Normal range: 70-110 mg/dL (fasting); Hypoglycemia: <60 mg/dL; Hyperglycemia: >300 mg/dL'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Normal Vital Signs Ranges by Age', description: 'A comprehensive table showing normal vital sign ranges for four age groups: Adult, Child (6-12), Preschool (2-5), and Infant (0-1). Categories include: Heart Rate, Respiratory Rate, Systolic BP, Diastolic BP, Temperature, and SpO₂. Abnormal values are highlighted in red.' },
      { title: 'Blood Pressure Measurement Technique', description: 'Step-by-step illustration showing: (1) Proper cuff placement with artery marker over brachial artery, (2) Stethoscope placement in antecubital fossa, (3) Correct arm position at heart level, (4) Inflation/deflation technique. Korotkoff sounds diagram showing phases I-V is included.' },
      { title: 'Pulse Oximetry and Waveform Quality', description: 'A pulse oximeter display showing SpO₂ reading and a plethysmographic waveform. Good signal (tall, regular wave) vs poor signal (flat, irregular) is compared. Common causes of inaccurate readings: nail polish, poor perfusion, motion artifact, and carbon monoxide exposure are listed.' }
    ],
    keyPoints: [
      'Normal adult vital signs: HR 60-100, RR 12-20, BP 90-140/60-90, SpO₂ 95-100%, Temp 36.1-37.2°C',
      'Manual BP: proper cuff size is essential — too small falsely elevates, too large falsely lowers',
      'Measure respiratory rate without the patient\'s awareness (pretend to check pulse)',
      'Hypoglycemia: <60 mg/dL; Normal fasting glucose: 70-110 mg/dL',
      'Korotkoff Phase I = systolic; Phase V (disappearance) = diastolic for adults',
      'Always compare vital signs to previous readings to identify trends',
      'Tachycardia is often the FIRST sign of shock — do not ignore it'
    ],
    assessorQuestions: [
      'What are the normal vital sign ranges for an adult?',
      'Describe the proper technique for measuring manual blood pressure.',
      'Why is it important to measure respiratory rate without the patient\'s awareness?',
      'What is the correct technique for measuring blood glucose?',
      'What is the significance of tachycardia as an early sign of shock?'
    ],
    memorizationTips: [
      'Adult normal vital signs: "60-100, 12-20, 120/80, 98%" = HR, RR, BP, SpO₂',
      'BP cuff size: "80% rule" — bladder covers 80% of arm circumference',
      'Korotkoff sounds: "First sound = Systolic, Final disappearance = Diastolic"',
      'Glucose levels: "70-110 Normal, Under 60 Low, Over 300 High" — "7-1-N, U-6-L, O-3-H"'
    ],
    flashcards: [
      { front: 'What is the normal adult heart rate range?', back: '60-100 beats per minute' },
      { front: 'What is the normal adult blood pressure range?', back: '90-140 mmHg systolic / 60-90 mmHg diastolic' },
      { front: 'What is the blood glucose threshold for hypoglycemia?', back: 'Below 60 mg/dL' },
      { front: 'What does Korotkoff Phase I represent?', back: 'Systolic blood pressure (the first sound heard during deflation)' },
      { front: 'How should you measure respiratory rate without the patient knowing?', back: 'Continue holding the wrist after counting pulse, then count respirations for 30-60 seconds' }
    ],
    miniQuiz: [
      { question: 'What is the normal adult respiratory rate?', options: ['6-10 breaths/min', '12-20 breaths/min', '20-30 breaths/min', '30-40 breaths/min'], correctAnswer: 1, explanation: 'The normal adult respiratory rate is 12-20 breaths per minute.' },
      { question: 'Using a BP cuff that is too small will result in:', options: ['Accurate reading', 'Falsely low reading', 'Falsely high reading', 'No reading'], correctAnswer: 2, explanation: 'A cuff that is too small requires higher pressure to compress the artery, resulting in a falsely elevated blood pressure reading.' },
      { question: 'What is the normal fasting blood glucose range?', options: ['40-60 mg/dL', '70-110 mg/dL', '120-180 mg/dL', '200-300 mg/dL'], correctAnswer: 1, explanation: 'Normal fasting blood glucose is 70-110 mg/dL. Values below 60 indicate hypoglycemia, and values above 300 indicate significant hyperglycemia.' },
      { question: 'Tachycardia is significant because it is often:', options: ['A normal finding in all patients', 'The first sign of shock', 'Only seen in cardiac patients', 'A sign of recovery'], correctAnswer: 1, explanation: 'Tachycardia is often the FIRST sign of hemorrhagic shock, appearing before blood pressure drops. It should never be ignored.' },
      { question: 'When measuring respiratory rate, you should:', options: ['Tell the patient you are counting their breaths', 'Measure without the patient\'s awareness', 'Ask the patient to breathe normally while counting', 'Use a stethoscope only'], correctAnswer: 1, explanation: 'Patients who know their breathing is being measured often unconsciously alter their breathing pattern. Pretend to continue checking the pulse while actually counting respirations.' }
    ]
  }
]
