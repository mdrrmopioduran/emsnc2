export interface ScenarioChoice {
  text: string
  nextStepId: string
  isCorrect: boolean
  feedback: string
  consequence?: string
  vitalChange?: { hr?: number; bp?: string; rr?: number; spo2?: number; status?: string }
}

export interface ScenarioStep {
  id: string
  narrative: string
  clinicalFindings?: string
  vitalSigns?: { hr: number; bp: string; rr: number; spo2: number; status: string }
  choices: ScenarioChoice[]
  isEnd?: boolean
  endResult?: 'success' | 'partial' | 'failed'
  endSummary?: string
  keyLearning?: string[]
}

export interface EmergencyScenario {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  color: string
  icon: string
  tags: string[]
  objectives: string[]
  initialVitals: { hr: number; bp: string; rr: number; spo2: number; status: string }
  startStepId: string
  steps: Record<string, ScenarioStep>
}

export const emergencyScenarios: EmergencyScenario[] = [
  // ===== 1. CARDIAC ARREST =====
  {
    id: 'ems-cardiac-arrest',
    title: 'Cardiac Arrest',
    subtitle: 'The Chain of Survival',
    description: 'A 55-year-old male collapses in a shopping mall. Bystanders report he was walking normally, then suddenly fell. He is unresponsive and not breathing normally.',
    category: 'BLS',
    difficulty: 'beginner',
    duration: '8-12 min',
    color: '#EF4444',
    icon: '💔',
    tags: ['CPR', 'AED', 'Cardiac', 'BLS'],
    objectives: ['Apply the Chain of Survival', 'Perform high-quality CPR', 'Use an AED correctly', 'Recognize ROSC'],
    initialVitals: { hr: 0, bp: 'Palpable/0', rr: 0, spo2: 0, status: 'CARDIAC ARREST' },
    startStepId: 'ca1',
    steps: {
      ca1: {
        id: 'ca1',
        narrative: 'You arrive at the shopping mall food court. A crowd has gathered around a 55-year-old man lying on the floor. A bystander says "He just collapsed!" The patient is motionless on the ground.',
        clinicalFindings: 'Patient supine on floor, unresponsive to verbal stimuli. Occasional gasping respirations observed. No obvious injuries.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 2, spo2: 0, status: 'CARDIAC ARREST' },
        choices: [
          { text: 'Ensure scene safety, apply BSI, tap and shout to confirm unresponsiveness, then direct someone to call 911 and get an AED', nextStepId: 'ca2', isCorrect: true, feedback: 'Correct! Scene safety and BSI always come first. Confirming unresponsiveness and activating the emergency response system are the first links in the Chain of Survival.' },
          { text: 'Check for a pulse for 10 seconds first', nextStepId: 'ca1b', isCorrect: false, feedback: 'Before checking pulse, ensure scene safety and confirm unresponsiveness. However, pulse check is important — let\'s refocus.', consequence: 'You skipped scene safety and BSI precautions' },
          { text: 'Immediately begin chest compressions', nextStepId: 'ca1b', isCorrect: false, feedback: 'While early compressions are critical, you must first confirm cardiac arrest, activate EMS, and get an AED before starting CPR.', consequence: 'Starting CPR without confirming arrest or calling for help delays the full response' },
        ],
      },
      ca1b: {
        id: 'ca1b',
        narrative: 'Let\'s refocus. You\'ve now confirmed scene safety and the patient is unresponsive with agonal gasping. A bystander is calling for help and retrieving an AED. You check for a pulse for no more than 10 seconds — no pulse detected.',
        clinicalFindings: 'No pulse palpated. Agonal gasping continues. Skin is pale and cool.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 2, spo2: 0, status: 'CARDIAC ARREST' },
        choices: [
          { text: 'Begin CPR starting with chest compressions (CAB sequence), 30:2 ratio, rate 100-120/min, depth at least 2 inches', nextStepId: 'ca2', isCorrect: true, feedback: 'Correct! With no pulse and agonal breathing, this is cardiac arrest. Begin CPR immediately with compressions first (CAB).' },
          { text: 'Open the airway and give 2 rescue breaths before compressions', nextStepId: 'ca1b', isCorrect: false, feedback: 'For adult cardiac arrest, the CAB sequence (Compressions first) is preferred over ABC. Starting compressions reduces delay to the most critical intervention.' },
        ],
      },
      ca2: {
        id: 'ca2',
        narrative: 'You are performing high-quality CPR. Chest compressions at 100-120/min with full recoil. The AED has arrived — a mall security officer hands it to you. The crowd watches anxiously.',
        clinicalFindings: 'CPR in progress. AED now available. 2 minutes of CPR completed. Compressions are deep with full chest recoil.',
        vitalSigns: { hr: 0, bp: 'Compressions only', rr: 0, spo2: 0, status: 'CPR IN PROGRESS' },
        choices: [
          { text: 'Stop CPR briefly, apply AED pads (upper right chest + lower left side), then follow AED prompts', nextStepId: 'ca3', isCorrect: true, feedback: 'Correct! Apply the AED as soon as it arrives. Minimize interruptions to compressions during pad placement.' },
          { text: 'Continue CPR for 5 full cycles before using the AED', nextStepId: 'ca2b', isCorrect: false, feedback: 'The AED should be applied as soon as it arrives. Early defibrillation is the third link in the Chain of Survival — do not delay it.', consequence: 'Delaying defibrillation reduces survival chances by 7-10% per minute' },
        ],
      },
      ca2b: {
        id: 'ca2b',
        narrative: 'You\'ve now completed additional CPR cycles. The AED is finally being applied. Time has been lost — the patient\'s chances are decreasing with each minute of delay. Apply the AED pads now.',
        clinicalFindings: 'CPR ongoing for 4+ minutes. AED pads being applied. Patient remains in cardiac arrest.',
        vitalSigns: { hr: 0, bp: 'Compressions only', rr: 0, spo2: 0, status: 'DELAYED DEFIBRILLATION' },
        choices: [
          { text: 'Apply AED pads and follow prompts immediately', nextStepId: 'ca3', isCorrect: true, feedback: 'Correct — though delayed, defibrillation is still critical. Apply pads and follow the AED prompts.' },
        ],
      },
      ca3: {
        id: 'ca3',
        narrative: 'The AED is analyzing the rhythm... "SHOCK ADVISED. STAND CLEAR." The device has detected a shockable rhythm (likely Ventricular Fibrillation). The crowd steps back. You need to deliver the shock safely.',
        clinicalFindings: 'AED analyzing complete. Shockable rhythm detected. Pads properly placed. Device ready to shock.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'VF/VT — SHOCKABLE' },
        choices: [
          { text: 'Ensure no one is touching the patient, announce "CLEAR!" loudly, visually confirm, then press the shock button', nextStepId: 'ca4', isCorrect: true, feedback: 'Correct! Safety first — ensure no contact before delivering the shock. Announce "CLEAR!" and visually verify before pressing the shock button.' },
          { text: 'Deliver the shock immediately without waiting', nextStepId: 'ca3b', isCorrect: false, feedback: 'You must ensure NO ONE is touching the patient before shocking. Anyone in contact could receive a dangerous shock.', consequence: 'Risk of shocking a bystander or rescuer' },
          { text: 'Check for a pulse first before shocking', nextStepId: 'ca3', isCorrect: false, feedback: 'Do not check for a pulse between AED analysis and shock delivery. The AED has identified a shockable rhythm — deliver the shock after clearing everyone.' },
        ],
      },
      ca3b: {
        id: 'ca3b',
        narrative: 'Someone was still in contact with the patient! Fortunately, they moved away just in time. You must ALWAYS announce "CLEAR!" and visually confirm before shocking. Now deliver the shock safely.',
        clinicalFindings: 'AED still advising shock. Everyone now clear of the patient.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'VF/VT — SHOCKABLE' },
        choices: [
          { text: 'Announce "CLEAR!", visually confirm no contact, then press shock button', nextStepId: 'ca4', isCorrect: true, feedback: 'Correct! Always announce and verify before delivering any shock.' },
        ],
      },
      ca4: {
        id: 'ca4',
        narrative: '💥 SHOCK DELIVERED. The patient\'s body jerks slightly. The AED screen shows the rhythm has changed. What should you do immediately after the shock?',
        clinicalFindings: 'Shock delivered successfully. Patient remains unresponsive. No immediate return of spontaneous circulation visible.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'POST-SHOCK' },
        choices: [
          { text: 'Resume CPR immediately starting with chest compressions — do not check for a pulse', nextStepId: 'ca5', isCorrect: true, feedback: 'Correct! After a shock, immediately resume CPR. Do not check for a pulse. The AED will reanalyze after 2 minutes of CPR.' },
          { text: 'Check for a pulse to see if the shock worked', nextStepId: 'ca4b', isCorrect: false, feedback: 'Do not check for a pulse immediately after a shock. Resume CPR immediately — minimizing interruptions is critical. The AED will reanalyze.', consequence: 'Pulse check delays compressions — every second counts' },
          { text: 'Wait for the AED to reanalyze before doing anything', nextStepId: 'ca4b', isCorrect: false, feedback: 'Do not wait. Resume CPR immediately after the shock. The AED will prompt reanalysis after 2 minutes of CPR.', consequence: 'Hands-off time reduces survival probability significantly' },
        ],
      },
      ca4b: {
        id: 'ca4b',
        narrative: 'Time has been lost during the delay. Remember: after a shock, resume CPR IMMEDIATELY. The AED will reanalyze after 2 minutes. Let\'s continue — start compressions now.',
        clinicalFindings: 'Delayed CPR restart. Patient still in cardiac arrest. Additional time lost due to delay.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'CPR DELAYED' },
        choices: [
          { text: 'Resume CPR immediately with chest compressions', nextStepId: 'ca5', isCorrect: true, feedback: 'Correct — resume CPR without any further delay.' },
        ],
      },
      ca5: {
        id: 'ca5',
        narrative: 'After 2 minutes of CPR, the AED reanalyzes: "NO SHOCK ADVISED." You check for a pulse — there\'s a weak carotid pulse! The patient is making occasional respiratory effort. The crowd gasps with hope.',
        clinicalFindings: 'Weak carotid pulse detected. Occasional spontaneous respirations. Skin color improving slightly. GCS remains low.',
        vitalSigns: { hr: 56, bp: '80/50', rr: 8, spo2: 78, status: 'ROSC — UNSTABLE' },
        choices: [
          { text: 'Stop compressions, provide supplemental oxygen, place in recovery position if adequate breathing, monitor vitals, prepare for transport', nextStepId: 'ca6', isCorrect: true, feedback: 'Correct! ROSC achieved! Stop compressions, support airway and breathing, provide oxygen, and prepare for rapid transport.' },
          { text: 'Continue compressions since the pulse is weak', nextStepId: 'ca5', isCorrect: false, feedback: 'A pulse — even weak — indicates ROSC. Do not compress a beating heart. Stop compressions and provide supportive care.' },
        ],
      },
      ca6: {
        id: 'ca6',
        narrative: 'ROSC confirmed! The patient has a pulse and is breathing with assistance. EMS backup has arrived and is preparing for transport. You need to provide appropriate post-cardiac arrest care while awaiting transport.',
        clinicalFindings: 'Patient unconscious but with pulse. Irregular spontaneous breathing. BP improving. Skin color returning.',
        vitalSigns: { hr: 68, bp: '92/60', rr: 14, spo2: 88, status: 'ROSC — IMPROVING' },
        choices: [
          { text: 'Provide supplemental O2 targeting SpO2 94-99%, monitor vitals continuously, maintain IV access, document all interventions and times, rapid transport', nextStepId: 'ca7', isCorrect: true, feedback: 'Correct! Post-cardiac arrest care: oxygen, monitoring, 12-lead ECG, and rapid transport to a hospital capable of post-arrest care including TTM.' },
          { text: 'Give the patient water since they may be thirsty after the ordeal', nextStepId: 'ca6', isCorrect: false, feedback: 'An unconscious patient must NOT be given anything by mouth — aspiration risk is high. Maintain airway and provide supplemental oxygen only.' },
        ],
      },
      ca7: {
        id: 'ca7',
        narrative: 'The patient is being loaded into the ambulance. You\'ve successfully managed this cardiac arrest using the complete Chain of Survival. The hospital has been notified and is preparing for your arrival.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You successfully managed an adult cardiac arrest using all links of the Chain of Survival: Early Access, Early CPR, Early Defibrillation, and Post-Arrest Care. The patient achieved ROSC and is being transported for definitive care.',
        keyLearning: ['Always ensure scene safety and BSI first', 'Start CPR immediately — CAB sequence for adults', 'Apply AED as soon as available', 'Clear everyone before shocking', 'Resume CPR immediately after shock — no pulse check', 'ROSC requires supportive care, not continued compressions', 'Document all interventions and times'],
        choices: [],
      },
    },
  },

  // ===== 2. VEHICULAR ACCIDENT =====
  {
    id: 'ems-vehicular-accident',
    title: 'Vehicular Accident',
    subtitle: 'Highway Collision Response',
    description: 'You respond to a motor vehicle collision on a busy highway. A car has struck a concrete barrier at high speed. The driver is trapped inside the vehicle.',
    category: 'Trauma',
    difficulty: 'intermediate',
    duration: '10-15 min',
    color: '#F59E0B',
    icon: '🚗',
    tags: ['Trauma', 'Extrication', 'Spinal', 'MCI'],
    objectives: ['Scene safety in traffic', 'Primary survey', 'Spinal motion restriction', 'Rapid extrication', 'Shock management'],
    initialVitals: { hr: 110, bp: '100/70', rr: 24, spo2: 94, status: 'CRITICAL' },
    startStepId: 'va1',
    steps: {
      va1: {
        id: 'va1',
        narrative: 'Your ambulance arrives at the scene of a highway collision. A sedan has struck the concrete median at high speed. The front end is crumpled, airbags deployed. Traffic is still moving in adjacent lanes at highway speed. You can see the driver slumped over the steering wheel.',
        clinicalFindings: 'High-speed MVC with significant front-end damage. Driver appears unconscious, slumped over deployed airbag. Traffic hazard present.',
        vitalSigns: { hr: 110, bp: '100/70', rr: 24, spo2: 94, status: 'UNKNOWN — SCENE UNSAFE' },
        choices: [
          { text: 'Position the ambulance as a shield, activate warning lights, set up traffic cones, ensure BSI before approaching the vehicle', nextStepId: 'va2', isCorrect: true, feedback: 'Correct! Highway scenes are extremely dangerous. Use your ambulance as a shield, set up a safety zone, and wear appropriate PPE before approaching.' },
          { text: 'Run directly to the car to check on the driver as quickly as possible', nextStepId: 'va1b', isCorrect: false, feedback: 'Running into active traffic without establishing scene safety puts you and others at extreme risk. You could become a second victim.', consequence: 'Risk of being struck by passing vehicles — you are now a potential victim' },
          { text: 'Wait for police to arrive and secure the scene before doing anything', nextStepId: 'va1b', isCorrect: false, feedback: 'While waiting for police is reasonable in some cases, you should still position your ambulance to protect the scene and begin assessment from a safe position. Complete inaction delays patient care.', consequence: 'Patient care delayed indefinitely — the driver may have life-threatening injuries' },
        ],
      },
      va1b: {
        id: 'va1b',
        narrative: 'After a near-miss with passing traffic, you realize the critical importance of scene safety. Let\'s properly secure the scene now — position the ambulance, activate lights, and set up cones before approaching.',
        clinicalFindings: 'Scene still hazardous. Proper safety measures now being established. Delay in patient assessment.',
        vitalSigns: { hr: 120, bp: '95/65', rr: 26, spo2: 92, status: 'SCENE DELAY' },
        choices: [
          { text: 'Position ambulance as shield, set up safety zone, then approach with BSI', nextStepId: 'va2', isCorrect: true, feedback: 'Correct — scene safety must be established before any patient contact.' },
        ],
      },
      va2: {
        id: 'va2',
        narrative: 'Scene is now secured. You approach the vehicle with full BSI. The driver is a 35-year-old male, conscious but confused. He has a large laceration on his forehead and complains of severe neck and chest pain. The steering wheel is deformed.',
        clinicalFindings: 'Conscious but confused (GCS ~13). Forehead laceration with active bleeding. Deformed steering wheel. Patient trapped — door jammed. Reports neck and chest pain.',
        vitalSigns: { hr: 120, bp: '95/65', rr: 26, spo2: 92, status: 'CRITICAL — TRAPPED' },
        choices: [
          { text: 'Manually stabilize the C-spine from behind, perform a rapid primary survey while beginning extrication with fire department assistance', nextStepId: 'va3', isCorrect: true, feedback: 'Correct! C-spine stabilization is the first priority in a trauma patient with mechanism for spinal injury. Begin primary survey and request extrication resources.' },
          { text: 'Open the door and carefully help the patient walk out of the car', nextStepId: 'va2b', isCorrect: false, feedback: 'Never allow a trauma patient with spinal mechanism to walk or self-extricate. This can worsen spinal injuries. Maintain spinal motion restriction.', consequence: 'Moving without spinal precautions could cause or worsen spinal cord injury' },
          { text: 'Focus only on the forehead laceration and apply direct pressure', nextStepId: 'va2b', isCorrect: false, feedback: 'While bleeding control is important, C-spine stabilization and primary survey take priority in this multi-system trauma patient. The neck and chest complaints suggest serious injuries.', consequence: 'Missed spinal injury and potential chest trauma — bleeding is not the primary threat' },
        ],
      },
      va2b: {
        id: 'va2b',
        narrative: 'You realize the importance of spinal precautions. The patient is still trapped with potential spinal and chest injuries. Let\'s properly stabilize the C-spine and assess systematically.',
        clinicalFindings: 'Patient still in vehicle. C-spine now being manually stabilized. Delay in systematic assessment.',
        vitalSigns: { hr: 128, bp: '88/60', rr: 28, spo2: 90, status: 'WORSENING' },
        choices: [
          { text: 'Stabilize C-spine, perform primary survey, begin extrication process', nextStepId: 'va3', isCorrect: true, feedback: 'Correct approach — stabilize, assess, then extricate systematically.' },
        ],
      },
      va3: {
        id: 'va3',
        narrative: 'You have manual C-spine stabilization in place. Primary survey reveals: Airway is patent (patient speaking), breathing is rapid with decreased sounds on the left, circulation shows tachycardia with weak pulses. The patient reports severe chest pain with each breath.',
        clinicalFindings: 'A: Patent (speaking). B: RR 28, decreased breath sounds left side, chest wall tenderness. C: Tachycardic, weak radial pulses, forehead bleeding controlled. D: GCS 13, complains of neck and chest pain.',
        vitalSigns: { hr: 128, bp: '88/60', rr: 28, spo2: 90, status: 'CRITICAL' },
        choices: [
          { text: 'Apply high-flow O2, assist ventilation if needed, prepare for rapid extrication onto a spine board, request ALS intercept, and notify trauma center', nextStepId: 'va4', isCorrect: true, feedback: 'Correct! Decreased breath sounds + chest trauma suggest possible pneumothorax or hemothorax. High-flow O2, rapid extrication with spinal precautions, and early notification are critical.' },
          { text: 'Complete a full head-to-toe secondary assessment before moving the patient', nextStepId: 'va3b', isCorrect: false, feedback: 'This is a critical trauma patient — a full secondary survey delays life-saving interventions. Perform rapid extrication and transport, completing the secondary survey en route.', consequence: 'Delayed transport — the "Golden Hour" is slipping away' },
        ],
      },
      va3b: {
        id: 'va3b',
        narrative: 'While performing the secondary survey, the patient\'s condition deteriorates — breathing becomes more labored, blood pressure drops further. Critical trauma patients need rapid transport, not prolonged on-scene assessment.',
        clinicalFindings: 'Patient deteriorating. Increased respiratory distress. BP dropping. Signs of developing tension pneumothorax.',
        vitalSigns: { hr: 140, bp: '76/50', rr: 32, spo2: 84, status: 'DETERIORATING' },
        choices: [
          { text: 'Immediately begin rapid extrication with spinal precautions and prepare for emergency transport', nextStepId: 'va4', isCorrect: true, feedback: 'Correct — rapid transport is the priority now. "Load and go" for this critical trauma patient.' },
        ],
      },
      va4: {
        id: 'va4',
        narrative: 'The fire department has extricated the patient using hydraulic tools. He is now on a spine board being loaded into your ambulance. His breathing is becoming more labored, with significantly decreased breath sounds on the left. JVD is now visible.',
        clinicalFindings: 'Extricated onto spine board. Decreased left breath sounds worsening. JVD present. Trachea appears to be shifting slightly right. Signs consistent with tension pneumothorax developing.',
        vitalSigns: { hr: 136, bp: '78/48', rr: 32, spo2: 84, status: 'TENSION PNEUMO DEVELOPING' },
        choices: [
          { text: 'Recognize developing tension pneumothorax, assist ventilations with BVM, position for transport, notify receiving trauma center of suspected tension pneumothorax requiring needle decompression', nextStepId: 'va5', isCorrect: true, feedback: 'Correct! The triad of decreased breath sounds, JVD, and hypotension strongly suggests tension pneumothorax. This is a life-threatening condition requiring needle decompression (by ALS) and rapid transport.' },
          { text: 'Just increase the oxygen flow rate and monitor during transport', nextStepId: 'va4b', isCorrect: false, feedback: 'Simply increasing O2 will not resolve a tension pneumothorax. This is a mechanical problem — air is trapped in the pleural space, compressing the heart and great vessels. Decompression is needed.', consequence: 'Tension pneumothorax worsens — cardiac output continues to fall' },
        ],
      },
      va4b: {
        id: 'va4b',
        narrative: 'During transport, the patient becomes severely hypotensive and cyanotic. The tension pneumothorax was not addressed urgently enough. ALS intercept arrives and performs needle decompression — a rush of air escapes. The patient begins to stabilize.',
        clinicalFindings: 'Needle decompression performed by ALS. Rush of air released. Patient\'s hemodynamics slowly improving but significant time was lost.',
        vitalSigns: { hr: 110, bp: '86/54', rr: 28, spo2: 88, status: 'STABILIZING — DELAYED CARE' },
        choices: [
          { text: 'Continue monitoring and rapid transport to trauma center', nextStepId: 'va5', isCorrect: true, feedback: 'Correct — continue to trauma center with close monitoring.' },
        ],
      },
      va5: {
        id: 'va5',
        narrative: 'The patient is being transported to the nearest trauma center. Ventilation has improved after decompression. You are providing ongoing monitoring and supportive care. The trauma team is standing by for your arrival.',
        clinicalFindings: 'Patient intubated by ALS. Ventilation improving. SpO2 rising. Hemodynamics stabilizing with IV fluids. Multiple injuries identified: rib fractures, pneumothorax, forehead laceration, possible C-spine injury.',
        vitalSigns: { hr: 100, bp: '94/62', rr: 16, spo2: 94, status: 'STABILIZING' },
        choices: [
          { text: 'Continue monitoring vitals every 5 min, maintain spinal precautions, keep patient warm, reassess all interventions, and provide complete handoff report to trauma team', nextStepId: 'va6', isCorrect: true, feedback: 'Correct! Ongoing monitoring, thermal management, and a thorough handoff are essential for optimal trauma care. The patient is in good hands.' },
          { text: 'Relax — the hard part is over. Just drive to the hospital', nextStepId: 'va5', isCorrect: false, feedback: 'Never let your guard down during transport. Trauma patients can deteriorate rapidly. Continue monitoring and be prepared for changes.' },
        ],
      },
      va6: {
        id: 'va6',
        narrative: 'You\'ve arrived at the trauma center and provided a complete handoff report. The trauma team takes over care. Your quick actions and systematic approach have given this patient the best chance of survival.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You successfully managed a complex MVC trauma: secured a dangerous highway scene, provided spinal motion restriction, recognized developing tension pneumothorax, and facilitated rapid transport to definitive care within the Golden Hour.',
        keyLearning: ['Scene safety is always the first priority — especially on highways', 'Never allow trauma patients to self-extricate with spinal mechanism', 'Rapid extrication and transport over prolonged on-scene assessment', 'Recognize tension pneumothorax: decreased sounds + JVD + hypotension', '"Load and go" for critical trauma — secondary survey en route', 'Continuous monitoring during transport — patients can deteriorate rapidly', 'Complete handoff report with all interventions and times'],
        choices: [],
      },
    },
  },

  // ===== 3. STROKE PATIENT =====
  {
    id: 'ems-stroke',
    title: 'Stroke Patient',
    subtitle: 'Time is Brain',
    description: 'A 65-year-old woman\'s family calls for help — she suddenly developed right-sided weakness and slurred speech during breakfast. Every minute counts.',
    category: 'Med Emerg',
    difficulty: 'intermediate',
    duration: '8-10 min',
    color: '#8B5CF6',
    icon: '🧠',
    tags: ['Stroke', 'FAST', 'Neurological', 'Time-Critical'],
    objectives: ['Recognize stroke using FAST', 'Determine last known normal time', 'Perform focused neurological assessment', 'Prioritize rapid transport'],
    initialVitals: { hr: 88, bp: '170/100', rr: 18, spo2: 96, status: 'ALERT — DEFICITS' },
    startStepId: 'st1',
    steps: {
      st1: {
        id: 'st1',
        narrative: 'You arrive at a home where a 65-year-old woman\'s daughter is frantic. "Mom was eating breakfast and suddenly couldn\'t hold her spoon. Her face looks weird and she can\'t talk right!" The daughter says this happened about 25 minutes ago.',
        clinicalFindings: 'Elderly female sitting at kitchen table. Right facial droop visible. Attempting to speak but words are slurred and garbled. Appears frustrated and frightened. Left hand reaching for objects normally.',
        vitalSigns: { hr: 88, bp: '170/100', rr: 18, spo2: 96, status: 'ALERT — NEURO DEFICITS' },
        choices: [
          { text: 'Recognize possible stroke — this is a time-critical emergency. Perform FAST assessment immediately and note the time of symptom onset', nextStepId: 'st2', isCorrect: true, feedback: 'Correct! Sudden onset of unilateral weakness and slurred speech is the classic stroke presentation. Time is brain — act FAST!' },
          { text: 'Check her blood sugar first — it might just be low blood sugar', nextStepId: 'st1b', isCorrect: false, feedback: 'While hypoglycemia can mimic stroke, this presentation (sudden unilateral deficits) is far more consistent with stroke. Check glucose, but don\'t delay stroke assessment.', consequence: 'Delayed stroke recognition — brain tissue continues to die at 1.9 million neurons/minute' },
          { text: 'Tell the family to give her aspirin and monitor', nextStepId: 'st1b', isCorrect: false, feedback: 'Never give aspirin in the field for suspected stroke until hemorrhagic stroke is ruled out by CT scan. Aspirin could worsen a hemorrhagic stroke catastrophically.', consequence: 'Potential catastrophic bleeding if this is hemorrhagic stroke' },
        ],
      },
      st1b: {
        id: 'st1b',
        narrative: 'Important reminder: this sudden-onset presentation with unilateral deficits strongly suggests stroke. Let\'s perform the FAST assessment now — time is critical.',
        clinicalFindings: 'Patient still showing facial droop and slurred speech. Time continues to pass. Glucose check reveals 130 mg/dL (normal) — confirming this is NOT hypoglycemia.',
        vitalSigns: { hr: 92, bp: '172/102', rr: 18, spo2: 96, status: 'STROKE — CONFIRMED' },
        choices: [
          { text: 'Perform FAST assessment now and document last known normal time', nextStepId: 'st2', isCorrect: true, feedback: 'Correct — proceed with FAST immediately.' },
        ],
      },
      st2: {
        id: 'st2',
        narrative: 'FAST Assessment results: F — Right facial droop when asked to smile. A — Right arm drifts downward when raised. S — Speech is slurred and garbled when asked to repeat "The sky is blue today." T — Last known normal: 25 minutes ago (daughter was speaking with her normally at breakfast).',
        clinicalFindings: 'FAST positive. Right-sided facial droop, right arm drift, slurred speech. Onset 25 minutes ago. Blood glucose 130 mg/dL (normal). BP 172/102.',
        vitalSigns: { hr: 90, bp: '172/102', rr: 18, spo2: 96, status: 'ACUTE STROKE — 25 MIN' },
        choices: [
          { text: 'Rapid transport to a stroke center, document exact last known normal time, notify receiving hospital en route, keep patient NPO, position with head elevated 30°', nextStepId: 'st3', isCorrect: true, feedback: 'Correct! This patient is well within the thrombolytic window (typically 4.5 hours). Rapid transport with pre-notification is critical. Head elevation helps reduce ICP.' },
          { text: 'Lower her blood pressure immediately since it\'s very high', nextStepId: 'st2', isCorrect: false, feedback: 'Do NOT aggressively lower blood pressure in acute stroke unless it exceeds 220/120. Permissive hypertension helps maintain cerebral perfusion to the ischemic penumbra. The current BP actually helps perfuse the brain.' },
          { text: 'Wait for the doctor to arrive before deciding on transport', nextStepId: 'st2b', isCorrect: false, feedback: 'Do not delay transport for any reason. This patient has a limited window for thrombolytic therapy. Every minute, 1.9 million neurons die.', consequence: 'Precious time lost — thrombolytic window closing' },
        ],
      },
      st2b: {
        id: 'st2b',
        narrative: 'Time is brain! Do not wait — this patient needs immediate transport to a stroke center. Let\'s get moving now.',
        clinicalFindings: 'Patient status unchanged but time now 35+ minutes since onset. Window for intervention is closing.',
        vitalSigns: { hr: 94, bp: '174/104', rr: 20, spo2: 95, status: 'ACUTE STROKE — 35+ MIN' },
        choices: [
          { text: 'Immediately transport to stroke center with pre-notification', nextStepId: 'st3', isCorrect: true, feedback: 'Correct — transport now without further delay.' },
        ],
      },
      st3: {
        id: 'st3',
        narrative: 'You are en route to the stroke center. The patient remains conscious but frightened. During transport, you need to continue assessment and provide appropriate care.',
        clinicalFindings: 'Patient in ambulance. GCS 14 (E4V4M6). Persistent right-sided deficits. BP 170/98. Able to follow simple commands but speech remains garbled.',
        vitalSigns: { hr: 88, bp: '170/98', rr: 18, spo2: 97, status: 'TRANSPORT — STROKE' },
        choices: [
          { text: 'Monitor vitals every 5 min, maintain IV access, keep NPO, head elevated 30°, perform Cincinnati Stroke Scale, assess blood glucose, provide reassurance, and update the hospital with detailed report', nextStepId: 'st4', isCorrect: true, feedback: 'Correct! Comprehensive stroke care during transport: monitoring, positioning, glucose assessment, and detailed hospital notification including last known normal time.' },
          { text: 'Give the patient water since she seems thirsty and anxious', nextStepId: 'st3', isCorrect: false, feedback: 'Stroke patients must remain NPO due to dysphagia risk. Aspiration pneumonia is a leading cause of death after stroke. Keep patient NPO until swallow evaluation at the hospital.' },
        ],
      },
      st4: {
        id: 'st4',
        narrative: 'You arrive at the stroke center. The team is ready — you gave them an excellent pre-notification with FAST findings, last known normal time, and vital signs. The stroke neurologist immediately evaluates the patient for thrombolytic therapy.',
        clinicalFindings: 'Stroke team takes over. CT scan being arranged immediately. Patient is within the thrombolytic window. Your detailed report and timing documentation are invaluable.',
        vitalSigns: { hr: 86, bp: '168/96', rr: 18, spo2: 97, status: 'STROKE CENTER ARRIVAL' },
        choices: [
          { text: 'Provide complete handoff: FAST findings, last known normal time (25 min ago), glucose 130, BP trends, all medications, and timeline of events', nextStepId: 'st5', isCorrect: true, feedback: 'Excellent handoff! The last known normal time is the single most important piece of information for the stroke team. Your thorough documentation enables rapid treatment decisions.' },
          { text: 'Just tell them "possible stroke" and leave the rest to the doctors', nextStepId: 'st4', isCorrect: false, feedback: 'A complete handoff is essential. The stroke team needs specific information — especially the last known normal time — to make time-critical treatment decisions.' },
        ],
      },
      st5: {
        id: 'st5',
        narrative: 'Your excellent pre-hospital care has given this patient the best chance of recovery. The stroke team administers tPA within 45 minutes of symptom onset — well within the golden window. The patient begins showing improvement within hours.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You recognized the stroke using FAST, documented the critical last known normal time, provided appropriate transport and care, and delivered a comprehensive handoff. Your actions directly contributed to the patient receiving time-critical thrombolytic therapy.',
        keyLearning: ['FAST: Face droop, Arm drift, Speech abnormality, Time of onset', 'Last known normal time is THE most critical information', 'Keep stroke patients NPO — dysphagia risk', 'Do NOT aggressively lower BP in acute stroke unless extreme', 'Pre-notify the receiving hospital — "Stroke Alert"', '1.9 million neurons die per minute in ischemic stroke', 'Thrombolytic window: typically 4.5 hours from last known normal'],
        choices: [],
      },
    },
  },

  // ===== 4. DIABETIC EMERGENCY =====
  {
    id: 'ems-diabetic',
    title: 'Diabetic Emergency',
    subtitle: 'Sugar Crisis',
    description: 'A 28-year-old female is found confused and sweating at a bus stop. A bystander says she has diabetes. Her mental status is rapidly deteriorating.',
    category: 'Med Emerg',
    difficulty: 'beginner',
    duration: '8-10 min',
    color: '#F97316',
    icon: '💉',
    tags: ['Diabetes', 'Hypoglycemia', 'Hyperglycemia', 'Altered Mental Status'],
    objectives: ['Distinguish hypo vs hyperglycemia', 'Perform glucose assessment', 'Treat hypoglycemia appropriately', 'Recognize DKA signs'],
    initialVitals: { hr: 108, bp: '118/72', rr: 22, spo2: 97, status: 'ALTERED MENTAL STATUS' },
    startStepId: 'db1',
    steps: {
      db1: {
        id: 'db1',
        narrative: 'You arrive at a bus stop where a 28-year-old female is slumped on the bench. A bystander tells you "She said she has diabetes before she got confused." The patient is diaphoretic, trembling, and responds only to painful stimuli with groaning.',
        clinicalFindings: 'Young female, diaphoretic, pale, trembling. Altered mental status — responds to pain only (GCS ~8). Bystander reports diabetic history. No obvious injuries.',
        vitalSigns: { hr: 108, bp: '118/72', rr: 22, spo2: 97, status: 'ALTERED MENTAL STATUS' },
        choices: [
          { text: 'Ensure scene safety, apply BSI, assess ABCs, check blood glucose level immediately', nextStepId: 'db2', isCorrect: true, feedback: 'Correct! Scene safety first, then rapid assessment. In any patient with altered mental status and diabetic history, glucose check is a priority.' },
          { text: 'Administer oral glucose immediately since she probably has low blood sugar', nextStepId: 'db1b', isCorrect: false, feedback: 'While hypoglycemia is likely, you must CHECK glucose first. Also, this patient has altered mental status with reduced GCS — giving oral medications to someone who can\'t swallow safely is dangerous.', consequence: 'Risk of aspiration — patient cannot safely swallow with GCS 8' },
          { text: 'Assume this is hyperglycemia and give insulin', nextStepId: 'db1b', isCorrect: false, feedback: 'Never give insulin in the field without a confirmed glucose reading. If this patient is actually hypoglycemic, insulin would be life-threatening. Also, BLS providers do not administer insulin.', consequence: 'Giving insulin to a hypoglycemic patient could be fatal' },
        ],
      },
      db1b: {
        id: 'db1b',
        narrative: 'Let\'s do this correctly — check the blood glucose level first and assess the patient\'s ability to swallow safely before giving any oral medications.',
        clinicalFindings: 'Patient still diaphoretic and confused. Need to check glucose level before any treatment.',
        vitalSigns: { hr: 112, bp: '116/70', rr: 24, spo2: 96, status: 'GLUCOSE UNKNOWN' },
        choices: [
          { text: 'Check blood glucose immediately using a glucometer', nextStepId: 'db2', isCorrect: true, feedback: 'Correct — glucose check is essential before any treatment decision.' },
        ],
      },
      db2: {
        id: 'db2',
        narrative: 'Blood glucose reads 38 mg/dL — critically low! Normal is 70-110 mg/dL. This is severe hypoglycemia. The patient is diaphoretic, trembling, and has a GCS of 8. She cannot safely swallow.',
        clinicalFindings: 'Glucose: 38 mg/dL (SEVERE HYPOGLYCEMIA). GCS 8. Diaphoretic, pale, trembling. Cannot protect airway adequately for oral intake.',
        vitalSigns: { hr: 112, bp: '116/70', rr: 24, spo2: 96, status: 'SEVERE HYPOGLYCEMIA' },
        choices: [
          { text: 'Establish IV access and administer 50% dextrose (D50) IV push. If no IV access, administer glucagon IM. Position to protect airway, high-flow O2, rapid transport', nextStepId: 'db3', isCorrect: true, feedback: 'Correct! Severe hypoglycemia with altered mental status requires IV dextrose or IM glucagon. Oral glucose is unsafe with decreased consciousness.' },
          { text: 'Try to give her candy or juice by mouth', nextStepId: 'db2b', isCorrect: false, feedback: 'This patient has GCS 8 — she cannot safely swallow. Giving oral substances risks aspiration and death. Use IV dextrose or IM glucagon for severe hypoglycemia with decreased consciousness.', consequence: 'High aspiration risk with oral intake in unconscious patient' },
        ],
      },
      db2b: {
        id: 'db2b',
        narrative: 'The patient coughs and gags when oral glucose is attempted — she cannot safely swallow. This is a dangerous situation. Let\'s use the correct route for an unconscious patient.',
        clinicalFindings: 'Patient aspirated slightly during oral glucose attempt. Still severely hypoglycemic. Needs IV or IM intervention immediately.',
        vitalSigns: { hr: 118, bp: '112/68', rr: 28, spo2: 92, status: 'HYPOGLYCEMIA — ASPIRATION RISK' },
        choices: [
          { text: 'Administer D50 IV or glucagon IM — no oral medications for decreased consciousness', nextStepId: 'db3', isCorrect: true, feedback: 'Correct — IV dextrose or IM glucagon is the only safe route for this patient.' },
        ],
      },
      db3: {
        id: 'db3',
        narrative: 'D50 administered IV. Within 2 minutes, the patient begins to become more alert. "Where am I? What happened?" she asks weakly. Her trembling is subsiding and color is returning to her face.',
        clinicalFindings: 'Patient now alert and oriented x3. Glucose recheck: 82 mg/dL. Trembling resolved. Skin color improved. Patient reports she skipped breakfast and took her normal insulin dose.',
        vitalSigns: { hr: 88, bp: '122/76', rr: 18, spo2: 98, status: 'IMPROVING' },
        choices: [
          { text: 'Recheck glucose, provide oral carbohydrates for sustained glucose, educate about meal timing with insulin, and strongly recommend transport for evaluation', nextStepId: 'db4', isCorrect: true, feedback: 'Correct! After D50, blood sugar may drop again (D50 is short-acting). Follow up with oral complex carbohydrates, encourage transport for observation, and provide education.' },
          { text: 'She seems fine now — just let her go home', nextStepId: 'db3b', isCorrect: false, feedback: 'D50 is short-acting and glucose can crash again. The patient needs sustained oral carbohydrates and should be transported for monitoring. Recurrent hypoglycemia is dangerous.', consequence: 'Risk of recurrent hypoglycemia — glucose may drop again within 30-60 minutes' },
        ],
      },
      db3b: {
        id: 'db3b',
        narrative: 'The patient refuses transport initially. You explain the risks of recurrent hypoglycemia — that her blood sugar could drop again dangerously. You provide oral glucose gel and encourage her to eat a full meal while waiting for family.',
        clinicalFindings: 'Patient alert but at risk for recurrent hypoglycemia. Needs monitoring and sustained carbohydrates.',
        vitalSigns: { hr: 92, bp: '120/74', rr: 18, spo2: 98, status: 'AT RISK — RECURRENT HYPO' },
        choices: [
          { text: 'Encourage transport for monitoring, provide oral carbs, ensure someone stays with her, and have her follow up with her doctor', nextStepId: 'db4', isCorrect: true, feedback: 'Correct — even with refusal, provide thorough education and ensure follow-up care.' },
        ],
      },
      db4: {
        id: 'db4',
        narrative: 'The patient agrees to transport for observation. En route, you provide diabetes education and document everything. Her glucose remains stable at 95 mg/dL. You\'ve successfully managed this diabetic emergency.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You correctly identified severe hypoglycemia through glucose assessment, chose the appropriate treatment route (IV dextrose for decreased consciousness), and ensured follow-up care to prevent recurrent episodes.',
        keyLearning: ['Always check blood glucose in altered mental status patients', 'Never give oral medications to patients who cannot swallow safely (GCS < 13)', 'Severe hypoglycemia (< 50 mg/dL) with decreased consciousness = IV D50 or IM glucagon', 'D50 is short-acting — follow up with oral complex carbohydrates', 'Educate patients about matching insulin to meals', 'Hypoglycemia is more immediately life-threatening than hyperglycemia', 'Document glucose levels, interventions, and response to treatment'],
        choices: [],
      },
    },
  },

  // ===== 5. TRAUMA WITH BLEEDING =====
  {
    id: 'ems-trauma-bleeding',
    title: 'Trauma with Bleeding',
    subtitle: 'Hemorrhage Control',
    description: 'A construction worker has sustained a deep laceration to his left thigh from a power saw. There is profuse, pulsatile arterial bleeding.',
    category: 'Trauma',
    difficulty: 'intermediate',
    duration: '10-12 min',
    color: '#DC2626',
    icon: '🩸',
    tags: ['Hemorrhage', 'Tourniquet', 'Shock', 'Trauma'],
    objectives: ['Apply hemorrhage control ladder', 'Correctly apply a tourniquet', 'Recognize hemorrhagic shock', 'Prioritize rapid transport'],
    initialVitals: { hr: 120, bp: '100/70', rr: 24, spo2: 94, status: 'Hemorrhaging' },
    startStepId: 'bl1',
    steps: {
      bl1: {
        id: 'bl1',
        narrative: 'You arrive at a construction site. A worker has a deep laceration on his left thigh from a power saw. Blood is spurting from the wound in bright red, pulsatile jets. The scene appears safe — the saw is turned off.',
        clinicalFindings: 'Deep laceration left thigh with profuse arterial bleeding (bright red, pulsatile). Patient conscious but anxious and pale. Blood pooling rapidly on the ground.',
        vitalSigns: { hr: 120, bp: '100/70', rr: 24, spo2: 94, status: 'HEMORRHAGING' },
        choices: [
          { text: 'Apply BSI (gloves at minimum), then immediately apply firm direct pressure to the wound', nextStepId: 'bl2', isCorrect: true, feedback: 'Correct! BSI first with profuse bleeding, then immediate direct pressure. Arterial hemorrhage is a life-threatening emergency that must be controlled NOW.' },
          { text: 'Assess airway and breathing before addressing the bleeding', nextStepId: 'bl1b', isCorrect: false, feedback: 'While ABC is standard, profuse arterial bleeding is an immediate life threat that must be controlled simultaneously with or even before airway assessment in extreme hemorrhage. Control the bleeding first!', consequence: 'Continued massive blood loss while following traditional ABC sequence' },
          { text: 'Apply a tourniquet immediately without trying direct pressure first', nextStepId: 'bl2', isCorrect: false, feedback: 'Direct pressure is the first-line intervention for hemorrhage control. Tourniquets are indicated when direct pressure fails to control life-threatening extremity bleeding. Start with direct pressure.' },
        ],
      },
      bl1b: {
        id: 'bl1b',
        narrative: 'While you were assessing ABCs, massive blood loss continued. Remember: in catastrophic hemorrhage, bleeding control takes priority. Let\'s address the bleeding immediately.',
        clinicalFindings: 'Significant blood loss has occurred. Patient is now more pale and anxious. Bleeding still profuse.',
        vitalSigns: { hr: 132, bp: '88/58', rr: 28, spo2: 92, status: 'HEMORRHAGING — WORSENING' },
        choices: [
          { text: 'Apply BSI and firm direct pressure to the wound now', nextStepId: 'bl2', isCorrect: true, feedback: 'Correct — control the bleeding immediately.' },
        ],
      },
      bl2: {
        id: 'bl2',
        narrative: 'You\'ve applied firm direct pressure with a dressing, but the bleeding is soaking through rapidly. Blood is pooling despite your pressure. The patient is becoming more anxious and pale.',
        clinicalFindings: 'Direct pressure applied but bleeding soaking through. Dressing saturated. Patient increasingly pale, diaphoretic, anxious. Signs of continued hemorrhage.',
        vitalSigns: { hr: 128, bp: '92/62', rr: 26, spo2: 92, status: 'UNCONTROLLED HEMORRHAGE' },
        choices: [
          { text: 'Add additional dressings on top (never remove the existing one), increase pressure. If still uncontrolled, apply a tourniquet 2-3 inches above the wound', nextStepId: 'bl3', isCorrect: true, feedback: 'Correct! Never remove a blood-soaked dressing — add more on top and increase pressure. For life-threatening extremity bleeding not controlled by direct pressure, a tourniquet is indicated.' },
          { text: 'Remove the soaked dressing and apply a fresh one', nextStepId: 'bl2', isCorrect: false, feedback: 'Never remove a blood-soaked dressing — it disrupts clot formation and worsens bleeding. Add additional dressings on top instead.' },
          { text: 'Elevate the leg and wait for the bleeding to slow down', nextStepId: 'bl2', isCorrect: false, feedback: 'Elevation alone will NOT control arterial bleeding. Continue direct pressure and move to tourniquet if needed.' },
        ],
      },
      bl3: {
        id: 'bl3',
        narrative: 'Direct pressure with additional dressings is still not controlling the arterial hemorrhage. You decide to apply a tourniquet. The patient watches nervously as you prepare it.',
        clinicalFindings: 'Hemorrhage uncontrolled with direct pressure. Tourniquet needed. Patient is conscious, anxious, and showing signs of early shock.',
        vitalSigns: { hr: 132, bp: '88/58', rr: 28, spo2: 90, status: 'HEMORRHAGIC SHOCK' },
        choices: [
          { text: 'Place the tourniquet 2-3 inches above (proximal to) the wound, tighten until bleeding stops, note and document the time of application', nextStepId: 'bl4', isCorrect: true, feedback: 'Correct! Tourniquet placement 2-3 inches proximal to the wound. Tighten until bleeding stops. Document the time — this is critical for the hospital. Do not place over joints.' },
          { text: 'Place the tourniquet directly over the wound to apply maximum pressure', nextStepId: 'bl3', isCorrect: false, feedback: 'The tourniquet should NOT be placed directly over the wound. Place it 2-3 inches above (proximal to) the wound, avoiding joints if possible.' },
          { text: 'Place the tourniquet at the highest point on the thigh for maximum effectiveness', nextStepId: 'bl3', isCorrect: false, feedback: 'Place the tourniquet 2-3 inches above the wound, not at the highest point. Unnecessarily high placement sacrifices more tissue than necessary.' },
        ],
      },
      bl4: {
        id: 'bl4',
        narrative: 'The tourniquet is applied and bleeding has stopped! The patient winces in pain but is relieved the bleeding has stopped. Now you must proceed with the primary survey and manage the developing shock.',
        clinicalFindings: 'Bleeding controlled with tourniquet. Tourniquet time documented. Patient conscious but showing signs of hypovolemic shock: tachycardic, pale, cool skin, anxious.',
        vitalSigns: { hr: 126, bp: '90/60', rr: 26, spo2: 92, status: 'BLEEDING CONTROLLED — SHOCK' },
        choices: [
          { text: 'Proceed with primary survey (ABCDE), administer high-flow O2, keep patient warm, establish IV access if available, rapid transport to trauma center', nextStepId: 'bl5', isCorrect: true, feedback: 'Correct! Bleeding controlled — now manage hemorrhagic shock: high-flow O2, warmth, IV fluids, and rapid transport. The Golden Hour starts now.' },
          { text: 'Loosen the tourniquet every 15 minutes to allow circulation to return', nextStepId: 'bl4', isCorrect: false, feedback: 'NEVER loosen or remove a field-applied tourniquet! This can dislodge clots and cause rebleeding that may be uncontrollable. The tourniquet stays on until hospital care.', consequence: 'Releasing the tourniquet could cause fatal rebleeding' },
          { text: 'Cover the tourniquet with a bandage so it\'s hidden from view', nextStepId: 'bl4', isCorrect: false, feedback: 'Never cover or hide a tourniquet! It must remain visible. Write the time on the patient or tourniquet. Hospital staff must see it immediately upon arrival.' },
        ],
      },
      bl5: {
        id: 'bl5',
        narrative: 'You are transporting rapidly to the trauma center. The patient\'s vital signs are being monitored closely. IV access has been established and fluids are running. The tourniquet remains in place with the time clearly documented.',
        clinicalFindings: 'En route to trauma center. Tourniquet in place with time documented. IV fluids running. Patient remains conscious but signs of Class II shock persist. Airway patent, breathing supported with O2.',
        vitalSigns: { hr: 112, bp: '96/64', rr: 22, spo2: 96, status: 'TRANSPORT — STABLE' },
        choices: [
          { text: 'Continue monitoring, keep patient warm, reassess vitals every 5 min, ensure tourniquet remains visible and time documented, provide complete trauma handoff', nextStepId: 'bl6', isCorrect: true, feedback: 'Correct! Ongoing monitoring, thermal management, tourniquet awareness, and a thorough handoff are essential for this hemorrhagic shock patient.' },
          { text: 'Give the patient water to drink since he lost so much blood and is thirsty', nextStepId: 'bl5', isCorrect: false, feedback: 'Never give oral fluids to a patient in shock — they may need surgery and oral intake increases aspiration risk. IV fluid resuscitation is the appropriate route.' },
        ],
      },
      bl6: {
        id: 'bl6',
        narrative: 'You arrive at the trauma center and provide a complete handoff. The surgical team is preparing for emergency wound exploration and repair. Your hemorrhage control and shock management have given this patient the best chance of survival.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You successfully managed severe arterial hemorrhage: applied BSI and direct pressure first, added dressings without removing the original, correctly applied a tourniquet when direct pressure failed, documented the tourniquet time, recognized and treated hemorrhagic shock, and prioritized rapid transport.',
        keyLearning: ['BSI first — gloves are essential with profuse bleeding', 'Direct pressure is the initial intervention for hemorrhage control', 'Add dressings on top — NEVER remove a blood-soaked dressing', 'Tourniquet: 2-3 inches proximal, tighten until bleeding stops', 'ALWAYS document tourniquet time and keep it visible', 'NEVER remove or loosen a field-applied tourniquet', 'Recognize hemorrhagic shock: tachycardia, hypotension, cool/pale skin', 'Rapid transport within the Golden Hour saves lives'],
        choices: [],
      },
    },
  },

  // ===== 6. FRACTURE MANAGEMENT =====
  {
    id: 'ems-fracture',
    title: 'Fracture Management',
    subtitle: 'Breaking Point',
    description: 'A young man has fallen from a second-floor balcony. He has an obvious deformity of his right thigh and is in severe pain. Suspected femur fracture with possible pelvic involvement.',
    category: 'Trauma/First Aid',
    difficulty: 'beginner',
    duration: '8-10 min',
    color: '#06B6D4',
    icon: '🦴',
    tags: ['Fracture', 'Splinting', 'Femur', 'Pelvic'],
    objectives: ['Assess fractures using 6 P\'s', 'Apply splinting principles', 'Traction splint for femur', 'Check neurovascular status'],
    initialVitals: { hr: 100, bp: '120/80', rr: 22, spo2: 97, status: 'PAIN — ALERT' },
    startStepId: 'fr1',
    steps: {
      fr1: {
        id: 'fr1',
        narrative: 'You arrive at the scene of a fall. A 22-year-old male has fallen from a second-floor balcony onto a grassy area. He is lying on his back, clutching his right thigh and screaming in pain. His right leg has an obvious deformity — the thigh is angulated mid-shaft.',
        clinicalFindings: 'Fall from 2nd floor (significant mechanism). Obvious right mid-thigh deformity with angulation. Patient conscious, alert, in severe pain. No obvious head bleeding. Moving both arms normally.',
        vitalSigns: { hr: 100, bp: '120/80', rr: 22, spo2: 97, status: 'SEVERE PAIN — ALERT' },
        choices: [
          { text: 'Ensure scene safety, apply BSI, perform primary survey (ABCDE), assess for spinal injury due to fall mechanism, then focus on the obvious fracture', nextStepId: 'fr2', isCorrect: true, feedback: 'Correct! Scene safety first, then systematic assessment. The fall mechanism warrants spinal precautions. Address life threats before the obvious fracture.' },
          { text: 'Immediately try to straighten the deformed leg to make it look normal', nextStepId: 'fr1b', isCorrect: false, feedback: 'Never attempt to realign a fractured extremity in the field unless there is no distal pulse (vascular compromise). Realignment can worsen tissue and neurovascular damage.', consequence: 'Manipulating the fracture can cause further bone fragment damage, nerve injury, and worsened bleeding' },
          { text: 'Just give pain medication and wait for the ambulance', nextStepId: 'fr1b', isCorrect: false, feedback: 'While pain management is important, you need a systematic assessment first. This patient fell from 2 stories — there may be other life-threatening injuries.', consequence: 'Missed spinal injury or internal injuries from the fall mechanism' },
        ],
      },
      fr1b: {
        id: 'fr1b',
        narrative: 'Let\'s approach this systematically. The fall mechanism is significant — spinal precautions are warranted, and a full primary survey is needed before focusing on the fracture.',
        clinicalFindings: 'Patient still in severe pain. Needs systematic assessment. Spinal precautions not yet in place.',
        vitalSigns: { hr: 106, bp: '118/78', rr: 24, spo2: 96, status: 'ASSESSMENT PENDING' },
        choices: [
          { text: 'Perform primary survey with spinal precautions, then assess the fracture', nextStepId: 'fr2', isCorrect: true, feedback: 'Correct approach — systematic and thorough.' },
        ],
      },
      fr2: {
        id: 'fr2',
        narrative: 'Primary survey complete: Airway patent, Breathing adequate, Circulation — strong radial pulses bilaterally, but you notice the right foot is cooler than the left. The patient has severe right thigh pain with obvious deformity. You assess the fracture using the 6 P\'s.',
        clinicalFindings: '6 P\'s Assessment: Pain (severe, mid-thigh), Pallor (right foot paler than left), Pulselessness (dorsalis pedis weaker on right), Paresthesia (tingling in right foot), Paralysis (can wiggle toes but weakly), Pressure (tight thigh compartment). Right thigh significantly swollen.',
        vitalSigns: { hr: 104, bp: '116/76', rr: 22, spo2: 97, status: 'FRACTURE — NEUROVASCULAR COMPROMISE' },
        choices: [
          { text: 'Apply manual traction to realign the extremity (restore alignment for neurovascular compromise), then apply a traction splint, splint above and below the joint, check distal pulses after splinting', nextStepId: 'fr3', isCorrect: true, feedback: 'Correct! With neurovascular compromise (weaker distal pulse, pallor, paresthesia), gentle manual realignment is indicated to restore perfusion. Then apply a traction splint for femur fractures.' },
          { text: 'Apply a simple splint without realignment regardless of distal circulation', nextStepId: 'fr2b', isCorrect: false, feedback: 'When there is neurovascular compromise (weak/absent distal pulse), gentle realignment is indicated to restore blood flow. A simple splint without realignment may leave the limb ischemic.', consequence: 'Continued neurovascular compromise could lead to limb ischemia and potential amputation' },
        ],
      },
      fr2b: {
        id: 'fr2b',
        narrative: 'The right foot is becoming increasingly pale and cold. The weak distal pulse indicates ongoing neurovascular compromise. You need to restore alignment to improve blood flow to the limb.',
        clinicalFindings: 'Right foot cooler, paler, and with weaker pulse than left. Sensation decreasing. Urgent need for realignment.',
        vitalSigns: { hr: 108, bp: '114/74', rr: 24, spo2: 96, status: 'LIMB ISCHEMIA RISK' },
        choices: [
          { text: 'Apply gentle manual traction to realign, then traction splint', nextStepId: 'fr3', isCorrect: true, feedback: 'Correct — realign when neurovascular compromise is present.' },
        ],
      },
      fr3: {
        id: 'fr3',
        narrative: 'You apply gentle manual traction and the leg realigns. The patient reports immediate partial pain relief. A dorsalis pedis pulse is now palpable on the right foot! You apply a traction splint properly — securing the ankle hitch, adjusting the traction, and padding all contact points.',
        clinicalFindings: 'Femur realigned manually. Traction splint applied. Distal pulses now equal bilaterally. Sensation improved in right foot. Patient reports pain reduction. Check and recheck distal circulation.',
        vitalSigns: { hr: 92, bp: '122/80', rr: 20, spo2: 98, status: 'SPLINTED — IMPROVING' },
        choices: [
          { text: 'Recheck distal pulses, sensation, and motor function after splinting. Apply ice if available, elevate if possible, transport with continued monitoring and pain management', nextStepId: 'fr4', isCorrect: true, feedback: 'Correct! Always reassess neurovascular status after splinting. The 6 P\'s should be checked before and after any splint application. Document findings.' },
          { text: 'The splint is on — no need to check anything further', nextStepId: 'fr3', isCorrect: false, feedback: 'You MUST recheck distal pulses, sensation, and motor function after every splint application. A splint that is too tight can cause its own neurovascular compromise.' },
        ],
      },
      fr4: {
        id: 'fr4',
        narrative: 'You are now checking for additional injuries. You notice the patient guards his pelvis when you palpate it — there may be a pelvic fracture as well from the fall. This changes your management approach significantly.',
        clinicalFindings: 'Pelvic tenderness on palpation. Possible pelvic fracture in addition to the femur fracture. Fall from 2nd floor = high-energy mechanism. Patient\'s vitals remain stable but need close monitoring for hemorrhagic shock.',
        vitalSigns: { hr: 96, bp: '118/78', rr: 20, spo2: 98, status: 'SPLINTED — PELVIC CONCERN' },
        choices: [
          { text: 'Apply a pelvic binder, do NOT compress or rock the pelvis, monitor for signs of hemorrhagic shock (pelvic fractures can cause 2L+ blood loss), and expedite transport to trauma center', nextStepId: 'fr5', isCorrect: true, feedback: 'Correct! Pelvic fractures can cause massive retroperitoneal hemorrhage (2-3L blood loss). Apply a pelvic binder, do NOT repeatedly palpate or rock the pelvis, and watch for shock.' },
          { text: 'Squeeze the pelvis firmly to test for stability', nextStepId: 'fr4', isCorrect: false, feedback: 'NEVER compress or "rock" the pelvis to test for stability! This can worsen bleeding from pelvic fracture sites. Assess once gently and apply a binder if fracture is suspected.', consequence: 'Compressing an unstable pelvis can lacerate blood vessels and worsen hemorrhage' },
        ],
      },
      fr5: {
        id: 'fr5',
        narrative: 'A pelvic binder has been applied. The femur is splinted with traction. The patient is stable for now but requires close monitoring. You are transporting to a trauma center. Your thorough assessment and proper splinting have protected this patient from further injury.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You managed a complex orthopedic trauma: performed systematic primary survey, assessed neurovascular status with the 6 P\'s, realigned with neurovascular compromise, applied traction splint correctly, identified an additional pelvic fracture, and applied a pelvic binder while monitoring for shock.',
        keyLearning: ['Always perform primary survey before focusing on obvious injuries', 'Assess fractures using the 6 P\'s: Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Pressure', 'Realign extremity only when neurovascular compromise is present', 'Traction splint for femur fractures — splint above and below the joint', 'ALWAYS recheck distal pulses after splinting', 'Pelvic fractures can cause 2-3L of blood loss — apply a binder', 'NEVER compress or rock the pelvis to test stability', 'Fall from height = high-energy mechanism, look for multiple injuries'],
        choices: [],
      },
    },
  },

  // ===== 7. DROWNING =====
  {
    id: 'ems-drowning',
    title: 'Drowning',
    subtitle: 'Beneath the Surface',
    description: 'A child has been pulled from a swimming pool after being submerged for an unknown period. The child is unresponsive and not breathing normally.',
    category: 'BLS/Environmental',
    difficulty: 'advanced',
    duration: '10-12 min',
    color: '#3B82F6',
    icon: '🌊',
    tags: ['Drowning', 'CPR', 'Pediatric', 'Water Rescue'],
    objectives: ['CPR modifications for drowning', 'Cervical spine considerations', 'AED in wet environment', 'Rewarming techniques'],
    initialVitals: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'CARDIAC ARREST' },
    startStepId: 'dr1',
    steps: {
      dr1: {
        id: 'dr1',
        narrative: 'You arrive at a residential pool. A 6-year-old child has been pulled from the water by a parent. The child is lying on the pool deck, unresponsive, with water and foam coming from the mouth. The parent is hysterical and screaming "Help my baby!"',
        clinicalFindings: '6-year-old child on pool deck, unresponsive. Water/foam from mouth and nose. Cyanotic lips and face. Skin cold and wet. No spontaneous breathing observed. Possible cervical spine injury from diving.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'CARDIAC ARREST' },
        choices: [
          { text: 'Ensure scene safety, apply BSI, carefully open airway with spinal precautions (jaw thrust), give 5 initial rescue breaths first (drowning protocol), then check for pulse', nextStepId: 'dr2', isCorrect: true, feedback: 'Correct! For drowning victims, the AHA recommends giving 5 initial rescue breaths before checking pulse, as the primary problem is usually hypoxia. Use jaw thrust for C-spine precaution.' },
          { text: 'Begin chest compressions immediately like a standard cardiac arrest', nextStepId: 'dr1b', isCorrect: false, feedback: 'For drowning, the cardiac arrest is primarily from hypoxia, not a primary cardiac event. The AHA recommends starting with rescue breaths (5 breaths) before compressions for drowning victims.', consequence: 'Starting with compressions delays oxygen delivery — drowning is primarily a respiratory arrest' },
          { text: 'Turn the child face down to drain water from the lungs', nextStepId: 'dr1b', isCorrect: false, feedback: 'Do NOT turn the patient face down or attempt to drain water from the lungs. This is an outdated and harmful practice. Water in the lungs does not drain significantly, and positioning delays resuscitation.', consequence: 'Delayed resuscitation and ineffective water drainage technique' },
        ],
      },
      dr1b: {
        id: 'dr1b',
        narrative: 'Critical reminder: Drowning resuscitation differs from standard cardiac arrest! The primary problem is HYPOXIA. Give 5 rescue breaths first using jaw thrust for C-spine protection, then assess for pulse and begin CPR if needed.',
        clinicalFindings: 'Child still unresponsive and not breathing. Time being lost. Must begin drowning-specific resuscitation.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'CARDIAC ARREST — DELAYED' },
        choices: [
          { text: 'Give 5 rescue breaths using jaw thrust, then check pulse and begin CPR if needed', nextStepId: 'dr2', isCorrect: true, feedback: 'Correct — drowning protocol starts with rescue breaths.' },
        ],
      },
      dr2: {
        id: 'dr2',
        narrative: 'You give 5 rescue breaths using the jaw thrust maneuver to protect the C-spine. The chest rises with each breath. You check for a pulse for no more than 10 seconds — no pulse detected. The child is in cardiac arrest secondary to drowning.',
        clinicalFindings: '5 rescue breaths delivered with chest rise. No pulse detected after 10-second check. Child remains cyanotic. C-spine manually stabilized by partner.',
        vitalSigns: { hr: 0, bp: 'Unobtainable', rr: 0, spo2: 0, status: 'CARDIAC ARREST — DROWNING' },
        choices: [
          { text: 'Begin CPR with 30:2 ratio (single rescuer) or 15:2 (two rescuers for pediatric), apply AED as soon as available after quickly drying the chest', nextStepId: 'dr3', isCorrect: true, feedback: 'Correct! Begin CPR with appropriate compression-to-ventilation ratio. For pediatric drowning with 2 rescuers, use 15:2 ratio. Dry the chest before applying AED pads.' },
          { text: 'Continue only rescue breathing — the heart will restart once oxygenated', nextStepId: 'dr2', isCorrect: false, feedback: 'With no pulse, the child is in cardiac arrest. Compressions are essential — rescue breathing alone is insufficient. Begin full CPR immediately.' },
        ],
      },
      dr3: {
        id: 'dr3',
        narrative: 'CPR is in progress. Your partner brings the AED. The child\'s chest is wet from the pool water. You need to apply the AED properly in these wet conditions.',
        clinicalFindings: 'CPR ongoing. AED available. Child\'s chest wet from pool water. Environment is wet — standing water on pool deck. Pediatric pads not available — adult pads being used with anterior-posterior placement.',
        vitalSigns: { hr: 0, bp: 'Compressions only', rr: 0, spo2: 0, status: 'CPR IN PROGRESS' },
        choices: [
          { text: 'Quickly dry the chest, move the patient away from standing water, ensure no one is in contact with water, apply AED pads (use pediatric if available, otherwise adult with anterior-posterior placement), follow prompts', nextStepId: 'dr4', isCorrect: true, feedback: 'Correct! Dry the chest, move from standing water, and ensure safety before using AED. Use pediatric pads/key if available; if not, adult pads with anterior-posterior placement for small children.' },
          { text: 'The AED cannot be used in wet conditions — continue CPR only', nextStepId: 'dr3b', isCorrect: false, feedback: 'The AED CAN be used in wet conditions with proper precautions: dry the chest, move from standing water, and ensure no one is in contact with water. Do not delay defibrillation if a shockable rhythm is present.', consequence: 'Potentially life-saving defibrillation delayed unnecessarily' },
        ],
      },
      dr3b: {
        id: 'dr3b',
        narrative: 'The AED can and should be used with proper precautions. Dry the chest, move the patient from standing water, and apply the pads. Let\'s do this correctly now.',
        clinicalFindings: 'CPR continues. Need to apply AED with proper wet-weather precautions.',
        vitalSigns: { hr: 0, bp: 'Compressions only', rr: 0, spo2: 0, status: 'CPR — AED DELAYED' },
        choices: [
          { text: 'Dry chest, move from water, apply AED pads, follow prompts', nextStepId: 'dr4', isCorrect: true, feedback: 'Correct — AED can be used safely with these precautions.' },
        ],
      },
      dr4: {
        id: 'dr4',
        narrative: 'The AED analyzes: "NO SHOCK ADVISED." This is consistent with drowning — the most common initial rhythm is asystole or PEA, not a shockable rhythm. You continue CPR. After 2 minutes, you reassess.',
        clinicalFindings: 'AED: No shock advised. CPR continuing. Most drowning arrests present with non-shockable rhythms (asystole/PEA). Continue high-quality CPR with ventilations.',
        vitalSigns: { hr: 0, bp: 'Compressions only', rr: 0, spo2: 0, status: 'CPR — NON-SHOCKABLE' },
        choices: [
          { text: 'Continue high-quality CPR with ventilations, reanalyze every 2 minutes, provide 100% oxygen via BVM, consider advanced airway, and begin transport — drowning patients have better ROSC rates than other cardiac arrest etiologies', nextStepId: 'dr5', isCorrect: true, feedback: 'Correct! Drowning patients have relatively better outcomes from CPR than other cardiac arrest causes. Continue high-quality CPR with adequate ventilations — hypoxia is the primary problem.' },
          { text: 'Stop CPR since the rhythm isn\'t shockable — there\'s nothing more we can do', nextStepId: 'dr4', isCorrect: false, feedback: 'Never stop CPR for a non-shockable rhythm! Continue high-quality CPR. Many drowning victims have been resuscitated after prolonged CPR, especially in cold water.' },
        ],
      },
      dr5: {
        id: 'dr5',
        narrative: 'After 4 minutes of high-quality CPR, you feel a faint pulse! The child makes a weak gasping respiratory effort. ROSC achieved! The child remains unconscious but is showing signs of life. You must now provide post-resuscitation care and address hypothermia.',
        clinicalFindings: 'ROSC achieved! Faint pulse present. Weak gasping respirations. Skin cold (core temp likely low from submersion). Child remains unconscious. GCS approximately 5-6.',
        vitalSigns: { hr: 60, bp: '70/40', rr: 8, spo2: 82, status: 'ROSC — HYPOTHERMIC' },
        choices: [
          { text: 'Assist ventilations with BVM and 100% O2, begin active rewarming (remove wet clothes, warm blankets, heat packs to axillae/groin), maintain C-spine precautions, rapid transport — continue monitoring', nextStepId: 'dr6', isCorrect: true, feedback: 'Correct! Post-drowning ROSC care: support breathing, rewarm actively, maintain C-spine, and transport. Hypothermia is common and must be addressed. Monitor for re-arrest.' },
          { text: 'Just put a towel over the child and wait for the hospital', nextStepId: 'dr5', isCorrect: false, feedback: 'Passive rewarming with a towel is insufficient for a hypothermic drowning victim. Active rewarming is needed: remove wet clothes, apply warm blankets, use heat packs, and protect from further heat loss.' },
        ],
      },
      dr6: {
        id: 'dr6',
        narrative: 'The child is being actively rewarmed and ventilated during transport. Vital signs are slowly improving. The hospital has been notified and the pediatric team is standing by. Despite the critical situation, your drowning-specific resuscitation protocol has given this child a fighting chance.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You managed a pediatric drowning with drowning-specific protocols: gave 5 initial rescue breaths before compressions, used jaw thrust for C-spine protection, applied AED with proper wet-weather precautions, maintained high-quality CPR with ventilations, and addressed hypothermia after ROSC.',
        keyLearning: ['Drowning resuscitation starts with 5 rescue breaths (A-B-C, not C-A-B)', 'Primary problem is hypoxia — ventilation is critical', 'Use jaw thrust for C-spine protection in drowning', 'AED can be used in wet conditions: dry chest, move from standing water', 'Most drowning arrests are non-shockable (asystole/PEA) — continue CPR', 'Drowning patients have better ROSC rates with prolonged CPR', 'Address hypothermia: remove wet clothes, active rewarming', 'Never attempt to "drain" water from lungs — outdated and harmful'],
        choices: [],
      },
    },
  },

  // ===== 8. HEAT STROKE =====
  {
    id: 'ems-heat-stroke',
    title: 'Heat Stroke',
    subtitle: 'Under the Blazing Sun',
    description: 'A construction worker has collapsed at a job site during an extreme heat wave. His skin is hot and dry, and he is confused. The ambient temperature is 42°C.',
    category: 'Environmental',
    difficulty: 'intermediate',
    duration: '8-10 min',
    color: '#FFB703',
    icon: '☀️',
    tags: ['Heat Stroke', 'Environmental', 'Hyperthermia', 'Cooling'],
    objectives: ['Differentiate heat exhaustion vs heat stroke', 'Initiate rapid cooling', 'Avoid antipyretics', 'Monitor for complications'],
    initialVitals: { hr: 130, bp: '90/60', rr: 28, spo2: 94, status: 'HYPERTHERMIA' },
    startStepId: 'hs1',
    steps: {
      hs1: {
        id: 'hs1',
        narrative: 'You arrive at a construction site during a heat wave (ambient temperature 42°C). A 45-year-old male worker has collapsed. His coworkers say he was working in direct sunlight for 4 hours without breaks. He is confused, his skin is hot and DRY, and his body feels like it\'s burning to the touch.',
        clinicalFindings: '45-year-old male, confused (GCS ~12). Skin HOT and DRY — not sweating. Core temperature estimated >40°C (104°F). Tachycardic. Hypotensive. Flushed face. Coworkers report no water intake for hours.',
        vitalSigns: { hr: 130, bp: '90/60', rr: 28, spo2: 94, status: 'HEAT STROKE — CRITICAL' },
        choices: [
          { text: 'Recognize heat stroke (hot dry skin + altered mental status = medical emergency), immediately move to shade, begin aggressive cooling, and call for rapid transport', nextStepId: 'hs2', isCorrect: true, feedback: 'Correct! Hot, dry skin + altered mental status = HEAT STROKE (not heat exhaustion). This is a life-threatening emergency requiring immediate aggressive cooling.' },
          { text: 'This looks like heat exhaustion — give him cold water to drink and let him rest in the shade', nextStepId: 'hs1b', isCorrect: false, feedback: 'This is NOT heat exhaustion — the HOT DRY SKIN and ALTERED MENTAL STATUS indicate HEAT STROKE. Heat exhaustion patients are typically sweating and alert. Heat stroke is life-threatening and requires aggressive cooling, not just rest.', consequence: 'Heat stroke is fatal if not aggressively cooled — organ damage is occurring' },
          { text: 'Give acetaminophen or ibuprofen to reduce the fever', nextStepId: 'hs1b', isCorrect: false, feedback: 'Antipyretics (acetaminophen, ibuprofen) are NOT effective for heat stroke. The hyperthermia is from environmental heat overload, not a hypothalamic set-point change. They may worsen liver/kidney damage. Use EXTERNAL cooling.', consequence: 'Antipyretics are ineffective and potentially harmful in heat stroke' },
        ],
      },
      hs1b: {
        id: 'hs1b',
        narrative: 'Critical distinction: Hot DRY skin + altered mental status = HEAT STROKE. This is NOT heat exhaustion. Heat stroke has a mortality rate of up to 50% if not treated rapidly. Immediate aggressive cooling is the ONLY effective treatment.',
        clinicalFindings: 'Patient deteriorating. Core temperature rising. Organ damage progressing. Must begin cooling immediately.',
        vitalSigns: { hr: 140, bp: '84/54', rr: 32, spo2: 92, status: 'HEAT STROKE — DETERIORATING' },
        choices: [
          { text: 'Move to shade, begin aggressive cooling immediately', nextStepId: 'hs2', isCorrect: true, feedback: 'Correct — immediate cooling is the only effective treatment for heat stroke.' },
        ],
      },
      hs2: {
        id: 'hs2',
        narrative: 'You move the patient to shade and begin aggressive cooling. You need to choose the most effective rapid cooling method. Cooling must begin BEFORE transport — the key to survival is how fast you lower the core temperature.',
        clinicalFindings: 'Patient in shade. Still hot and dry. Confused. Core temperature likely >41°C. Needs immediate aggressive cooling. Cooling delay = organ failure and death.',
        vitalSigns: { hr: 136, bp: '86/56', rr: 30, spo2: 92, status: 'HEAT STROKE — COOLING NEEDED' },
        choices: [
          { text: 'Remove clothing, apply cold wet sheets with ice packs to neck, axillae, and groin, fan the patient (evaporative cooling), and pour cold water over the body', nextStepId: 'hs3', isCorrect: true, feedback: 'Correct! Aggressive evaporative cooling is the most practical and effective method in the field. Cold water immersion is the gold standard, but evaporative cooling with ice packs is highly effective when immersion isn\'t available.' },
          { text: 'Just apply a cool damp cloth to the forehead', nextStepId: 'hs2b', isCorrect: false, feedback: 'A cool cloth on the forehead is grossly inadequate for heat stroke. The entire body surface must be cooled aggressively using evaporative cooling and ice packs to major vessels.', consequence: 'Insufficient cooling — core temperature remains dangerously high' },
          { text: 'Place the patient in an air-conditioned room and wait', nextStepId: 'hs2b', isCorrect: false, feedback: 'Air conditioning alone is too slow for heat stroke. The cooling rate must be aggressive — at least 0.1°C/min. Active evaporative cooling with ice packs is essential.', consequence: 'Passive cooling is too slow — organ damage continues' },
        ],
      },
      hs2b: {
        id: 'hs2b',
        narrative: 'The patient\'s temperature is barely dropping with the inadequate cooling method. You need to switch to aggressive evaporative cooling with ice packs NOW.',
        clinicalFindings: 'Core temperature still >40°C. Patient becoming less responsive. Aggressive cooling urgently needed.',
        vitalSigns: { hr: 144, bp: '80/50', rr: 34, spo2: 90, status: 'HEAT STROKE — INADEQUATE COOLING' },
        choices: [
          { text: 'Remove clothing, cold wet sheets + ice packs to neck/axillae/groin + fanning', nextStepId: 'hs3', isCorrect: true, feedback: 'Correct — aggressive evaporative cooling is essential.' },
        ],
      },
      hs3: {
        id: 'hs3',
        narrative: 'Aggressive cooling is underway. The patient\'s skin is now wet with cold water and ice packs are placed on the neck, armpits, and groin. A fan is blowing across his body. His temperature is starting to drop. He remains confused but is becoming more alert.',
        clinicalFindings: 'Active cooling in progress. Core temperature dropping. Patient more alert — responding to name. Skin now wet from cooling. Sweating may begin to return as temperature normalizes.',
        vitalSigns: { hr: 116, bp: '94/62', rr: 24, spo2: 95, status: 'COOLING — IMPROVING' },
        choices: [
          { text: 'Continue cooling until core temp reaches 38.5-39°C, administer high-flow O2, establish IV access with cool IV fluids, monitor vitals continuously, and transport to hospital', nextStepId: 'hs4', isCorrect: true, feedback: 'Correct! Continue cooling to 38.5-39°C (don\'t overcool). Cool IV fluids help from the inside. Monitor for arrhythmias, seizures, and re-arrest. Transport even if the patient improves.' },
          { text: 'Stop cooling now that he\'s more alert — the danger has passed', nextStepId: 'hs3', isCorrect: false, feedback: 'Do NOT stop cooling until the core temperature reaches 38.5-39°C. The patient may appear better but still has dangerous hyperthermia. Continue active cooling during transport.' },
        ],
      },
      hs4: {
        id: 'hs4',
        narrative: 'The patient\'s core temperature is now 38.8°C and he is oriented to name. Cooling is being continued during transport. You are monitoring for complications of heat stroke including rhabdomyolysis, kidney failure, and coagulopathy.',
        clinicalFindings: 'Core temp 38.8°C and falling. Patient alert and oriented x2. IV fluids running. Skin now sweating normally. Must still monitor for delayed complications.',
        vitalSigns: { hr: 100, bp: '106/68', rr: 20, spo2: 97, status: 'COOLING — NEAR NORMAL' },
        choices: [
          { text: 'Continue monitoring, maintain IV fluids, watch for seizures/arrhythmias, stop active cooling at 38.5°C to prevent hypothermia, provide complete handoff including maximum estimated core temp and cooling time', nextStepId: 'hs5', isCorrect: true, feedback: 'Correct! Monitor for complications, avoid overcooling, and document everything. The maximum temperature and duration of hyperthermia are critical prognostic indicators for the hospital.' },
          { text: 'Since he\'s alert now, cancel the ambulance and let him go back to work', nextStepId: 'hs4', isCorrect: false, feedback: 'Heat stroke patients MUST be transported even if they improve. Delayed complications include rhabdomyolysis, DIC, liver failure, and kidney failure. The patient needs hospital monitoring for at least 24 hours.' },
        ],
      },
      hs5: {
        id: 'hs5',
        narrative: 'You arrive at the hospital. The patient is alert and his core temperature is 38.2°C. You provide a complete handoff including the estimated maximum temperature, cooling methods used, and duration of hyperthermia. The emergency team takes over care. Your rapid recognition and aggressive cooling have saved this patient\'s life.',
        isEnd: true,
        endResult: 'success',
        endSummary: 'You correctly identified heat stroke (hot dry skin + AMS), initiated immediate aggressive cooling using evaporative methods with ice packs, avoided ineffective antipyretics, continued cooling to target temperature, and ensured hospital transport for monitoring of delayed complications.',
        keyLearning: ['Hot DRY skin + altered mental status = HEAT STROKE (not heat exhaustion)', 'Heat stroke is life-threatening — up to 50% mortality without rapid cooling', 'Aggressive cooling must begin BEFORE transport', 'Antipyretics (acetaminophen/ibuprofen) do NOT work for heat stroke', 'Evaporative cooling + ice packs to neck/axillae/groin is the most practical field method', 'Cold water immersion is the gold standard when available', 'Continue cooling to 38.5-39°C — avoid overcooling', 'Always transport heat stroke patients — delayed complications are common', 'Document maximum estimated temperature and duration of hyperthermia'],
        choices: [],
      },
    },
  },
]
