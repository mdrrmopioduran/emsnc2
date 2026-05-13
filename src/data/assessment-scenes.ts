export interface AssessmentStep {
  id: number;
  description: string;
  isCritical: boolean;
  notes: string;
}

export interface AssessmentScene {
  id: string;
  title: string;
  overview: string;
  steps: AssessmentStep[];
}

export const assessmentScenes: AssessmentScene[] = [
  // ===== 1. BLS — CPR & AED =====
  {
    id: "bls-cpr-aed",
    title: "BLS — CPR & AED",
    overview:
      "Perform Basic Life Support for an adult cardiac arrest patient, including high-quality CPR and AED operation. This skill station evaluates the candidate's ability to follow the AHA BLS sequence without error, maintain compression quality, and safely operate an AED. All critical steps (marked ★) must be performed correctly—missing a critical step results in automatic failure.",
    steps: [
      {
        id: 1,
        description:
          "Verify scene safety and apply BSI (minimum: gloves for CPR, eye protection if splash risk)",
        isCritical: false,
        notes:
          "Scene safety and BSI are always the first actions. In a real cardiac arrest, BSI must be applied quickly without delaying CPR.",
      },
      {
        id: 2,
        description:
          "Tap and shout to check responsiveness. If unresponsive, activate emergency response system and get an AED (or direct someone to do so)",
        isCritical: true,
        notes:
          "CRITICAL: Failure to activate the emergency response system and obtain an AED delays the Chain of Survival. Must be performed immediately upon confirming unresponsiveness.",
      },
      {
        id: 3,
        description:
          "Check for normal breathing and pulse simultaneously (no more than 10 seconds). Look for chest rise, feel for carotid pulse",
        isCritical: true,
        notes:
          "CRITICAL: Pulse check must not exceed 10 seconds. If unsure, begin CPR. Agonal gasping is NOT normal breathing.",
      },
      {
        id: 4,
        description:
          "Begin CPR with chest compressions (CAB sequence): rate 100-120/min, depth at least 2 inches (5 cm), full chest recoil, minimize interruptions",
        isCritical: true,
        notes:
          "CRITICAL: Compression quality is essential—rate, depth, full recoil, and minimal interruptions. Allow less than 10 seconds for all interruptions combined.",
      },
      {
        id: 5,
        description:
          "Provide 30 compressions followed by 2 rescue breaths (30:2 ratio). Open airway with head-tilt/chin-lift (or jaw-thrust if spinal injury suspected). Each breath over 1 second, visible chest rise",
        isCritical: false,
        notes:
          "Ensure proper volume—just enough to see chest rise. Excessive ventilation causes gastric distension and reduces coronary perfusion.",
      },
      {
        id: 6,
        description:
          "When AED arrives, turn it on and apply pads: one on upper right chest (below right clavicle), one on lower left side (lateral to heart). Follow AED prompts",
        isCritical: true,
        notes:
          "CRITICAL: AED must be applied as soon as available. Minimize interruption to compressions during pad application. Stop compressions only when AED is analyzing.",
      },
      {
        id: 7,
        description:
          "When AED advises shock: clear the patient ('Clear!'), visually confirm no one is touching the patient, then press shock button",
        isCritical: true,
        notes:
          "CRITICAL: Safety check before shock delivery is mandatory. Failure to clear the patient before shock creates a danger to rescuers and is an automatic fail.",
      },
      {
        id: 8,
        description:
          "Immediately after shock delivery, resume CPR starting with compressions. Do NOT check for a pulse after shock. Perform 2 minutes of CPR before next AED analysis",
        isCritical: true,
        notes:
          "CRITICAL: Do not interrupt CPR to check for a pulse after a shock. Resume compressions immediately. The AED will reanalyze after 2 minutes.",
      },
      {
        id: 9,
        description:
          "If AED advises 'No Shock': resume CPR immediately for 2 minutes, then recheck rhythm. If ROSC (pulse returns), monitor patient, provide supportive care, and prepare for transport",
        isCritical: false,
        notes:
          "For 'No Shock Advised,' resume CPR unless the patient has signs of life (breathing, movement, pulse). Check for pulse if patient shows signs of ROSC.",
      },
      {
        id: 10,
        description:
          "Switch compressor every 2 minutes (during AED analysis) to prevent fatigue. Switch must take less than 5 seconds",
        isCritical: false,
        notes:
          "Fatigue degrades compression quality within 1-2 minutes. Rotate providers during the AED analysis pause to minimize compression interruption.",
      },
    ],
  },

  // ===== 2. Patient Assessment — Medical =====
  {
    id: "patient-assessment-medical",
    title: "Patient Assessment — Medical",
    overview:
      "Perform a complete systematic assessment on a medical patient. This skill station evaluates the candidate's ability to conduct a primary survey, obtain a focused medical history using SAMPLE and OPQRST, perform a secondary survey with vital signs, and develop a treatment and transport plan. Critical steps involve identifying and treating immediate life threats in the ABCDE sequence.",
    steps: [
      {
        id: 1,
        description:
          "Ensure scene safety and apply BSI precautions before making patient contact",
        isCritical: false,
        notes:
          "Always assess scene safety and apply BSI first. Identify any environmental hazards or potential dangers.",
      },
      {
        id: 2,
        description:
          "Determine the Nature of Illness (NOI) from scene assessment and initial observation of the patient",
        isCritical: false,
        notes:
          "Observe the patient's general appearance, position, and any obvious distress. Ask bystanders what happened.",
      },
      {
        id: 3,
        description:
          "Perform primary survey using ABCDE: Airway (patent? needs intervention?), Breathing (rate, quality, effort?), Circulation (pulse, bleeding, skin), Disability (AVPU/GCS), Exposure (environmental control)",
        isCritical: true,
        notes:
          "CRITICAL: Each life threat must be identified and treated before moving to the next step. Never skip or abbreviate the primary survey.",
      },
      {
        id: 4,
        description:
          "Obtain chief complaint and SAMPLE history: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to illness",
        isCritical: false,
        notes:
          "SAMPLE history provides critical information for treatment decisions. Ask about current medications (including OTC and supplements) and allergies specifically.",
      },
      {
        id: 5,
        description:
          "Assess pain using OPQRST: Onset, Provocation/Palliation, Quality, Radiation, Severity (0-10), Time",
        isCritical: false,
        notes:
          "OPQRST is the standard pain assessment tool. Document all components for a complete picture of the patient's pain.",
      },
      {
        id: 6,
        description:
          "Perform secondary survey: systematic head-to-toe physical examination, auscultate lung sounds, check for focal findings",
        isCritical: false,
        notes:
          "The secondary survey is performed ONLY after the primary survey is complete and all life threats are addressed.",
      },
      {
        id: 7,
        description:
          "Obtain baseline vital signs: Blood Pressure, Heart Rate, Respiratory Rate, SpO2, Temperature, Pain Scale, and blood glucose if indicated",
        isCritical: true,
        notes:
          "CRITICAL: Vital signs are essential objective data. Failure to obtain vital signs means no baseline for comparison and may miss deteriorating conditions.",
      },
      {
        id: 8,
        description:
          "Formulate a field impression and treatment plan based on assessment findings. Provide appropriate interventions within scope of practice",
        isCritical: false,
        notes:
          "Based on assessment, determine the most likely condition and provide appropriate treatment (e.g., oxygen, medication assistance, positioning).",
      },
      {
        id: 9,
        description:
          "Determine transport priority and mode. Provide a verbal patient report to the receiving facility using SBAR format",
        isCritical: true,
        notes:
          "CRITICAL: Failure to determine appropriate transport priority or to communicate with the receiving facility can delay definitive care. Use SBAR for clear communication.",
      },
    ],
  },

  // ===== 3. Patient Assessment — Trauma =====
  {
    id: "patient-assessment-trauma",
    title: "Patient Assessment — Trauma",
    overview:
      "Perform a complete systematic assessment on a trauma patient, with emphasis on spinal motion restriction, mechanism of injury assessment, and identification of life-threatening conditions. This skill station includes c-spine protection as part of the primary survey and DCAP-BTLS examination in the secondary survey.",
    steps: [
      {
        id: 1,
        description:
          "Perform scene size-up: ensure scene safety, apply BSI, determine Mechanism of Injury (MOI), estimate patient count, identify need for additional resources",
        isCritical: true,
        notes:
          "CRITICAL: Scene size-up determines safety and strategy. Entering an unsafe scene or failing to identify the MOI can miss critical injury patterns and endanger rescuers.",
      },
      {
        id: 2,
        description:
          "Apply manual in-line stabilization of the cervical spine immediately upon patient contact for any trauma patient with suspected spinal injury",
        isCritical: true,
        notes:
          "CRITICAL: Failure to stabilize the cervical spine in a trauma patient with potential spinal injury can cause or worsen spinal cord damage. Maintain stabilization until the patient is fully immobilized or spinal injury is ruled out.",
      },
      {
        id: 3,
        description:
          "Perform primary survey with c-spine protection: Airway (with simultaneous spinal protection), Breathing, Circulation (control major bleeding), Disability (AVPU/GCS), Exposure (with environmental protection)",
        isCritical: true,
        notes:
          "CRITICAL: Airway must be assessed and managed while maintaining spinal alignment. Use jaw-thrust for trauma patients. Life-threatening hemorrhage must be controlled during Circulation assessment.",
      },
      {
        id: 4,
        description:
          "Address life threats identified in the primary survey: manage airway, assist breathing, control hemorrhage (direct pressure → tourniquet), treat for shock",
        isCritical: true,
        notes:
          "CRITICAL: Life-threatening conditions must be treated as they are found. Do not proceed to the next step until each life threat is addressed.",
      },
      {
        id: 5,
        description:
          "Obtain a rapid trauma history (SAMPLE) from the patient or bystanders while preparing for immobilization",
        isCritical: false,
        notes:
          "Gather SAMPLE history concurrent with other interventions to save time. Bystanders and family can provide valuable information if the patient cannot.",
      },
      {
        id: 6,
        description:
          "Perform secondary survey: head-to-toe examination using DCAP-BTLS, check all body regions, assess distal PSM (pulses, sensation, motor) for all extremities",
        isCritical: false,
        notes:
          "DCAP-BTLS ensures no traumatic findings are missed. Check distal PSM before and after any splinting or immobilization.",
      },
      {
        id: 7,
        description:
          "Obtain baseline vital signs: BP, HR, RR, SpO2, Temperature, Pain Scale. Assess for signs of shock (tachycardia, hypotension, cool/pale skin, delayed capillary refill)",
        isCritical: true,
        notes:
          "CRITICAL: Vital signs are essential for identifying hemorrhagic shock. Reassess frequently—shock can develop or worsen during assessment.",
      },
      {
        id: 8,
        description:
          "Apply cervical collar (sizing correctly), then log-roll with coordinated team to place patient on immobilization device (long spine board or vacuum mattress)",
        isCritical: false,
        notes:
          "Ensure proper cervical collar sizing. Use sufficient rescuers for log-roll (minimum 3-4 people) to maintain spinal alignment. Manual stabilization must be maintained until the patient is secured on the device.",
      },
      {
        id: 9,
        description:
          "Reassess distal PSM after immobilization, determine transport priority, provide SBAR report to receiving facility, and prepare for rapid transport if indicated",
        isCritical: true,
        notes:
          "CRITICAL: Reassess distal PSM after immobilization to ensure no neurovascular compromise. Failure to reassess can miss deterioration from improper immobilization.",
      },
    ],
  },

  // ===== 4. Airway Management =====
  {
    id: "airway-management",
    title: "Airway Management",
    overview:
      "Demonstrate the skills necessary to assess, open, and maintain a patient's airway using basic and advanced airway adjuncts appropriate to the BLS level. This includes manual techniques, suction, OPA/NPA insertion, and BVM ventilation. Critical steps involve recognizing airway obstruction and providing adequate ventilation.",
    steps: [
      {
        id: 1,
        description:
          "Assess airway patency: look, listen, and feel for air movement. Identify signs of airway obstruction (snoring, gurgling, stridor, silence)",
        isCritical: true,
        notes:
          "CRITICAL: Failure to recognize an obstructed airway leads to hypoxia and death within minutes. Each obstruction sound indicates a different problem: snoring = tongue, gurgling = fluid, stridor = partial upper airway obstruction.",
      },
      {
        id: 2,
        description:
          "Open the airway using appropriate technique: head-tilt/chin-lift for medical patients, jaw-thrust without head extension for trauma patients",
        isCritical: true,
        notes:
          "CRITICAL: Using head-tilt/chin-lift on a trauma patient with potential spinal injury can worsen spinal cord damage. Always use jaw-thrust for trauma patients.",
      },
      {
        id: 3,
        description:
          "Suction the oropharynx if fluid, vomitus, or secretions are present. Use rigid suction catheter (Yankauer), suction no longer than 15 seconds at a time in adults",
        isCritical: false,
        notes:
          "Limit suction time: adults 15 seconds, children 10 seconds, infants 5 seconds. Suction on the way out, not in. Pre-oxygenate before suctioning if possible.",
      },
      {
        id: 4,
        description:
          "Insert an oropharyngeal airway (OPA) in an unconscious patient without gag reflex: measure from corner of mouth to earlobe or angle of jaw, insert using a tongue blade or rotating technique",
        isCritical: false,
        notes:
          "OPA is contraindicated in conscious or semi-conscious patients with intact gag reflex—it can cause vomiting and aspiration. Confirm correct sizing—an improperly sized OPA can worsen airway obstruction.",
      },
      {
        id: 5,
        description:
          "Insert a nasopharyngeal airway (NPA) if OPA is contraindicated (intact gag reflex) or in patients with clenched jaws: measure from nostril to earlobe, lubricate, insert with bevel toward septum",
        isCritical: false,
        notes:
          "NPA is relatively contraindicated in suspected basilar skull fracture (CSF leakage from ears/nose). Use caution with anticoagulant patients. Better tolerated than OPA in semi-conscious patients.",
      },
      {
        id: 6,
        description:
          "Assemble and operate a bag-valve-mask (BVM): connect to oxygen source (15 L/min), attach reservoir, ensure proper mask seal using E-C clamp technique, deliver breaths over 1 second with visible chest rise",
        isCritical: true,
        notes:
          "CRITICAL: Inadequate mask seal results in failed ventilation. Use the E-C clamp technique: thumb and index finger form 'C' on mask, remaining fingers form 'E' lifting the jaw. Two-person BVM is more effective than one-person.",
      },
      {
        id: 7,
        description:
          "Ventilate at appropriate rate: adult 1 breath every 6 seconds (10/min) during CPR with advanced airway; 1 breath every 5-6 seconds (10-12/min) for respiratory arrest with pulse",
        isCritical: true,
        notes:
          "CRITICAL: Excessive ventilation (hyperventilation) reduces coronary perfusion pressure during CPR and can cause gastric distension. Maintain the correct rate and volume.",
      },
      {
        id: 8,
        description:
          "Reassess airway and ventilation effectiveness continuously: observe chest rise, monitor SpO2, auscultate breath sounds, and watch for signs of inadequate ventilation (cyanosis, decreasing SpO2, abdominal distension)",
        isCritical: false,
        notes:
          "Continuous monitoring ensures airway interventions remain effective. Reassess after every move, position change, or if the patient's condition changes.",
      },
    ],
  },

  // ===== 5. Bleeding Control & Wound Management =====
  {
    id: "bleeding-control",
    title: "Bleeding Control & Wound Management",
    overview:
      "Demonstrate the skills necessary to control external hemorrhage and manage wounds in the prehospital setting. This includes direct pressure, pressure dressings, tourniquet application, wound packing, and management of specific wound types (amputations, eviscerations, impaled objects). Critical steps involve recognizing and controlling life-threatening hemorrhage.",
    steps: [
      {
        id: 1,
        description:
          "Apply BSI (gloves, eye protection) before contact with any bleeding patient. Identify the source and severity of hemorrhage",
        isCritical: false,
        notes:
          "Blood is the most common source of occupational exposure. Eye protection is essential when managing hemorrhage due to splash risk.",
      },
      {
        id: 2,
        description:
          "Apply firm, direct pressure to the wound using a sterile dressing. Do not remove the first dressing if it becomes soaked—add additional dressings on top",
        isCritical: true,
        notes:
          "CRITICAL: Removing a blood-soaked dressing disrupts clot formation and can worsen bleeding. Always add dressings on top and increase pressure.",
      },
      {
        id: 3,
        description:
          "If direct pressure fails to control life-threatening extremity bleeding, apply a tourniquet 2-3 inches above (proximal to) the wound, over clothing if necessary. Tighten until bleeding stops",
        isCritical: true,
        notes:
          "CRITICAL: Failure to apply a tourniquet for uncontrolled life-threatening extremity hemorrhage can result in preventable death. Tourniquets are NOT a last resort for life-threatening bleeding.",
      },
      {
        id: 4,
        description:
          "Document the time of tourniquet application on the patient (write on forehead or tourniquet). Never cover, loosen, or remove a field-applied tourniquet",
        isCritical: true,
        notes:
          "CRITICAL: The tourniquet time is critical surgical information. Never loosen or remove a tourniquet applied in the field—this can cause fatal rebleeding.",
      },
      {
        id: 5,
        description:
          "For wounds not controlled by direct pressure in non-extremity areas (neck, axilla, groin), apply wound packing with hemostatic gauze if available, and maintain firm pressure",
        isCritical: false,
        notes:
          "Junctional wounds (neck, axilla, groin) cannot accommodate tourniquets. Wound packing with hemostatic gauze and sustained direct pressure are the primary interventions.",
      },
      {
        id: 6,
        description:
          "Manage special wounds: eviscerations (cover with moist sterile + occlusive dressing), impaled objects (stabilize in place, never remove), amputations (control bleeding, recover and wrap the amputated part in moist sterile dressing, then bag on ice)",
        isCritical: false,
        notes:
          "For amputated parts: wrap in moist sterile dressing, place in sealed plastic bag, and place that bag on ice (do NOT place the part directly on ice). Transport with the patient.",
      },
      {
        id: 7,
        description:
          "Assess for signs of hemorrhagic shock after bleeding control: tachycardia, hypotension, cool/pale/clammy skin, delayed capillary refill, altered mental status. Treat with high-flow oxygen, warmth, and rapid transport",
        isCritical: true,
        notes:
          "CRITICAL: Failure to recognize hemorrhagic shock after controlling external bleeding can result in missed internal hemorrhage or inadequate resuscitation. Monitor vital signs continuously.",
      },
    ],
  },

  // ===== 6. Splinting & Fracture Management =====
  {
    id: "splinting-fracture",
    title: "Splinting & Fracture Management",
    overview:
      "Demonstrate the proper technique for splinting suspected fractures and dislocations in the prehospital setting. This includes assessment before and after splinting, proper splint selection and application, and management of open fractures. Critical steps involve checking distal PSM (pulses, sensation, motor) before and after splinting.",
    steps: [
      {
        id: 1,
        description:
          "Assess the injured extremity: check for deformity, swelling, crepitus, point tenderness. Check distal PSM (pulses, sensation, motor function) BEFORE splinting",
        isCritical: true,
        notes:
          "CRITICAL: Failure to check distal PSM before splinting means you cannot determine if the splint caused neurovascular compromise. Document baseline PSM.",
      },
      {
        id: 2,
        description:
          "Expose the injury site fully (cut clothing if necessary). Assess for open fractures (bone visible or protruding through skin)",
        isCritical: false,
        notes:
          "Open fractures have a high risk of infection and require careful wound management. Control bleeding and cover with sterile dressings.",
      },
      {
        id: 3,
        description:
          "For open fractures: control bleeding with sterile dressings (gentle pressure around the bone, not on it), cover exposed bone with moist sterile dressing, do not push bone back under the skin",
        isCritical: true,
        notes:
          "CRITICAL: Never push exposed bone back into the wound—this introduces infection deep into the tissue. Cover with moist sterile dressing to prevent drying.",
      },
      {
        id: 4,
        description:
          "Select appropriate splint: rigid, formable, or traction splint based on the injury type and location. Pad the splint adequately for comfort and to prevent pressure injuries",
        isCritical: false,
        notes:
          "Femur fractures require traction splints. Other fractures use rigid or formable splints. Always pad bony prominences and voids.",
      },
      {
        id: 5,
        description:
          "Apply the splint immobilizing the joints above and below the fracture site. For joint injuries, immobilize the bones above and below the joint",
        isCritical: true,
        notes:
          "CRITICAL: A splint that does not immobilize both the joint above and below the fracture provides inadequate stabilization and may worsen the injury.",
      },
      {
        id: 6,
        description:
          "Secure the splint with bandages or tape, ensuring it is snug but not circumferentially tight (can impair circulation). Reassess distal PSM after splint application",
        isCritical: true,
        notes:
          "CRITICAL: Rechecking distal PSM after splinting is mandatory. If PSM is diminished or absent after splinting, the splint may be too tight or improperly positioned and must be adjusted immediately.",
      },
      {
        id: 7,
        description:
          "Apply ice if available (wrapped in cloth, not directly on skin). Elevate the injured extremity if possible (after splinting and if no contraindication). Monitor for compartment syndrome signs (pain out of proportion, pallor, paresthesia)",
        isCritical: false,
        notes:
          "Compartment syndrome is a late complication of fractures. Monitor for the 6 P's: Pain (disproportionate), Pressure, Paresthesia, Pallor, Paralysis, Pulselessness.",
      },
      {
        id: 8,
        description:
          "Document the injury (location, type, open/closed, neurovascular status before and after splinting), splint type applied, and any changes in PSM",
        isCritical: false,
        notes:
          "Thorough documentation protects the patient and the provider. Note the time of injury, time of splinting, and any changes in the patient's condition.",
      },
    ],
  },

  // ===== 7. Triage START Method =====
  {
    id: "triage-start",
    title: "Triage — START Method",
    overview:
      "Demonstrate the ability to perform rapid triage of multiple patients using the START (Simple Triage and Rapid Treatment) method during a mass casualty incident. Candidates must correctly categorize patients into Immediate (Red), Delayed (Yellow), Minor (Green), and Expectant (Black) categories. Critical steps involve rapid decision-making and correct categorization.",
    steps: [
      {
        id: 1,
        description:
          "Perform scene size-up: ensure safety, apply BSI, declare MCI, establish Incident Command, request appropriate resources",
        isCritical: true,
        notes:
          "CRITICAL: Failure to declare an MCI and establish Incident Command leads to disorganized response and inefficient resource allocation. The first-arriving provider assumes Incident Commander role until relieved.",
      },
      {
        id: 2,
        description:
          "Instruct all patients who can walk to move to a designated area — these are the MINOR (Green) category. They are the lowest treatment priority but can provide information about other patients",
        isCritical: false,
        notes:
          "Walking wounded are automatically categorized as Minor/Green. This step quickly reduces the number of patients requiring individual assessment.",
      },
      {
        id: 3,
        description:
          "Begin rapid individual assessment of non-ambulatory patients using START: first assess RESPIRATIONS — if absent, open airway; if still no respirations → EXPECTANT (Black). If respirations > 30/min → IMMEDIATE (Red). If respirations ≤ 30/min → assess perfusion",
        isCritical: true,
        notes:
          "CRITICAL: Misclassifying a patient who needs immediate care can result in preventable death. Respirations >30/min indicates respiratory distress requiring immediate attention. Patients with no respirations after airway opening are unsalvageable in an MCI with limited resources.",
      },
      {
        id: 4,
        description:
          "Assess PERFUSION: check radial pulse or capillary refill. If absent radial pulse or capillary refill > 2 seconds → IMMEDIATE (Red). If radial pulse present and capillary refill ≤ 2 seconds → assess mental status",
        isCritical: true,
        notes:
          "CRITICAL: Absent radial pulse indicates inadequate perfusion (shock). These patients need immediate intervention to survive and must be categorized as Red/Immediate.",
      },
      {
        id: 5,
        description:
          "Assess MENTAL STATUS: if unable to follow simple commands (altered mental status) → IMMEDIATE (Red). If able to follow simple commands → DELAYED (Yellow)",
        isCritical: false,
        notes:
          "Altered mental status can indicate head injury, hypoxia, or shock—these patients need immediate evaluation. Patients who can follow commands have adequate brain perfusion.",
      },
      {
        id: 6,
        description:
          "Apply triage tags to each patient with the correct color category. Document the number of patients in each category and report to the Incident Commander",
        isCritical: true,
        notes:
          "CRITICAL: Triage tags ensure all responding agencies know each patient's priority. Without tags, patients can be reassessed repeatedly, wasting resources and delaying treatment.",
      },
      {
        id: 7,
        description:
          "Begin treatment of Immediate (Red) patients in order of priority: airway management, hemorrhage control. Continue triage until all patients are categorized before beginning treatment",
        isCritical: true,
        notes:
          "CRITICAL: In START triage, ALL patients must be triaged before treatment begins (except immediate life-saving interventions like opening an airway). Treating patients before completing triage delays care for more critical patients.",
      },
      {
        id: 8,
        description:
          "Re-triage patients as resources become available. Patient conditions can change—a Yellow patient who deteriorates may become Red. Continuously reassess and adjust categories",
        isCritical: false,
        notes:
          "Triage is a dynamic process. Conditions change, resources fluctuate, and patient categories may need adjustment. Re-triage during transport and at the treatment area.",
      },
    ],
  },

  // ===== 8. AMATS Activation Procedure =====
  {
    id: "amats-activation",
    title: "AMATS Activation Procedure",
    overview:
      "Demonstrate the proper procedure for activating the AMATS (Ambulance Medical Assistance and Transfer System) for emergency dispatch and inter-facility transfer in the Philippine EMS system. This includes communication protocols, priority determination, and coordination with AMATS dispatch. Critical steps involve proper priority classification and communication.",
    steps: [
      {
        id: 1,
        description:
          "Receive and confirm the dispatch information: location, nature of emergency, number of patients, caller contact information, and any special hazards",
        isCritical: false,
        notes:
          "Confirm all details with the dispatcher. Repeat back the address and key information to verify accuracy.",
      },
      {
        id: 2,
        description:
          "Determine the AMATS response priority based on the reported emergency: Priority 1 (Emergent/life-threatening), Priority 2 (Urgent/serious but stable), Priority 3 (Non-emergent/routine transfer)",
        isCritical: true,
        notes:
          "CRITICAL: Incorrect priority classification can result in delayed response to life-threatening emergencies or inappropriate use of lights/sirens for non-emergent calls. Priority 1 requires lights and sirens; Priority 2 and 3 typically do not.",
      },
      {
        id: 3,
        description:
          "Acknowledge the dispatch and confirm unit response via AMATS radio protocol using proper call signs and standard format",
        isCritical: false,
        notes:
          "Use designated call signs and frequencies. Confirm dispatch receipt with: unit identification, location, and estimated time of arrival.",
      },
      {
        id: 4,
        description:
          "Upon arrival at the scene, confirm arrival with AMATS dispatch and provide an initial scene report: unit on scene, scene safety status, initial patient count, and resource needs",
        isCritical: true,
        notes:
          "CRITICAL: Failure to confirm arrival and provide a scene report means dispatch cannot track unit status or send additional resources if needed. This is a communication safety requirement.",
      },
      {
        id: 5,
        description:
          "For inter-facility transfer: obtain physician authorization from the sending facility, confirm receiving facility acceptance, verify crew and equipment are appropriate for patient condition, and document all transfer information",
        isCritical: true,
        notes:
          "CRITICAL: Transferring a patient without physician authorization or receiving facility confirmation constitutes abandonment and violates AMATS protocols. The crew must also verify their capability matches the patient's needs.",
      },
      {
        id: 6,
        description:
          "During transport, maintain communication with AMATS dispatch providing periodic status updates. If patient condition changes, update the priority level and notify the receiving facility",
        isCritical: false,
        notes:
          "Regular status updates keep dispatch informed. If a Priority 2 patient deteriorates, upgrade to Priority 1 and notify all parties.",
      },
      {
        id: 7,
        description:
          "Upon arrival at the receiving facility, provide a complete patient turnover using SBAR format: Situation, Background, Assessment, Recommendation. Confirm the receiving provider has accepted care",
        isCritical: true,
        notes:
          "CRITICAL: Leaving a patient without proper turnover constitutes abandonment. Verbal confirmation that the receiving provider has accepted care must be obtained before releasing the patient.",
      },
      {
        id: 8,
        description:
          "Confirm with AMATS dispatch that the unit is available, clear the call, and prepare the Patient Care Report (PCR) with all required documentation including times, interventions, and communications",
        isCritical: false,
        notes:
          "Complete the PCR promptly while details are fresh. Document all times (dispatch, en route, arrival, transport, turnover), interventions, communications, and patient responses.",
      },
    ],
  },

  // ===== 9. Documentation & Reporting PCR =====
  {
    id: "documentation-pcr",
    title: "Documentation & Reporting (PCR)",
    overview:
      "Demonstrate the ability to complete a comprehensive Patient Care Report (PCR) that meets DOH and AMATS documentation standards. The PCR is a legal document that must accurately record all assessments, interventions, communications, and patient responses. Critical steps involve documenting all times, interventions, and refusals properly.",
    steps: [
      {
        id: 1,
        description:
          "Record all dispatch and response times accurately: time of call, dispatch, en route, arrival on scene, departure from scene, arrival at facility, and turnover time",
        isCritical: true,
        notes:
          "CRITICAL: Accurate time documentation is legally required and essential for quality improvement. Inaccurate or missing times create legal vulnerability and prevent meaningful quality analysis.",
      },
      {
        id: 2,
        description:
          "Document the patient's chief complaint, mechanism of injury or nature of illness, and all primary and secondary survey findings including vital signs",
        isCritical: false,
        notes:
          "Use standardized terminology. Record all findings, both positive and pertinent negatives (e.g., 'no chest pain' in a cardiac patient).",
      },
      {
        id: 3,
        description:
          "Document ALL interventions performed, the time of each intervention, and the patient's response to each intervention. Include medications (dose, route, time), procedures, and treatments",
        isCritical: true,
        notes:
          "CRITICAL: 'If it wasn't documented, it wasn't done.' Failure to document interventions creates the legal presumption that they were not performed. Document patient response to each intervention.",
      },
      {
        id: 4,
        description:
          "Document all communications: radio reports to dispatch, hospital reports, medical direction consultations, and any instructions received or given",
        isCritical: false,
        notes:
          "Record the name of the physician or nurse who accepted the patient turnover, any orders received from medical direction, and the content of all communications.",
      },
      {
        id: 5,
        description:
          "For patients who refuse treatment or transport: document the patient's mental status, informed consent discussion (risks explained), the patient's stated reason for refusal, witnessed signature, and the name of the witness",
        isCritical: true,
        notes:
          "CRITICAL: An inadequately documented refusal is a major source of EMS liability. The patient must be informed of the specific risks of refusal, demonstrate decision-making capacity, and sign the refusal form with a witness present.",
      },
      {
        id: 6,
        description:
          "Include the minimum data set required by DOH: patient demographics, chief complaint, vital signs, assessments, interventions, patient response, outcome, and receiving facility",
        isCritical: false,
        notes:
          "The DOH minimum data set ensures standardized documentation across the Philippine EMS system. Missing data elements reduce the value of the PCR for clinical, legal, and quality purposes.",
      },
      {
        id: 7,
        description:
          "Review the completed PCR for accuracy, completeness, and consistency before submission. Correct any errors using proper amendment procedures (single line through error, initial, date, and correct entry—never obliterate)",
        isCritical: true,
        notes:
          "CRITICAL: Altering a PCR improperly (white-out, erasure, obliteration) is considered tampering with a legal document and can result in criminal charges. All corrections must follow proper amendment procedures.",
      },
    ],
  },
];
