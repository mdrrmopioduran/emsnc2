export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category:
    | "BLS"
    | "Assessment"
    | "Trauma"
    | "Med Emerg"
    | "PH Care"
    | "LSE"
    | "Comms"
    | "Driving"
    | "Transport"
    | "Extrication"
    | "Amb Mgmt"
    | "OHS"
    | "Legal"
    | "AMATS";
}

export const questions: Question[] = [
 {
   "id": 1,
   "question": "What is the correct compression-to-ventilation ratio for adult CPR?",
   "options": [
      "15:01",
      "30:02:00",
      "20:02",
      "10:01"
   ],
   "correctAnswer": 1,
   "explanation": "The standard ratio for adult CPR is 30 compressions to 2 ventilations per American Heart Association (AHA) guidelines.",
   "category": "BLS/CPR"
},
 {
   "id": 2,
   "question": "What is the recommended compression depth for an adult during CPR?",
   "options": [
      "1 2 inches",
      "At least 2 inches (5 cm)",
      "3 4 inches",
      "0.5 inch (1.3 cm)"
   ],
   "correctAnswer": 1,
   "explanation": "American Heart Association (AHA) recommends at least 2 inches (5 cm) compression depth for adults.",
   "category": "BLS/CPR"
},
 {
   "id": 3,
   "question": "What is the correct compression rate per minute during CPR?",
   "options": [
      "60-80 compressions/min",
      "80-100 compressions/min",
      "100-120 compressions/min",
      "140-160 compressions/min"
   ],
   "correctAnswer": 2,
   "explanation": "The recommended compression rate is 100-120 compressions per minute.",
   "category": "BLS/CPR"
},
 {
   "id": 4,
   "question": "When should an AED be used on a patient?",
   "options": [
      "When the patient is conscious",
      "When the patient is breathing normally",
      "When the patient is unresponsive and not breathing normally",
      "When the patient has a minor wound"
   ],
   "correctAnswer": 2,
   "explanation": "An AED is used when a patient is unresponsive and not breathing normally to analyze heart rhythm.",
   "category": "BLS/CPR"
},
 {
   "id": 5,
   "question": "What is the first step before starting CPR?",
   "options": [
      "Check for pulse",
      "Call for help and check scene safety",
      "Give rescue breaths",
      "Apply AED pads"
   ],
   "correctAnswer": 1,
   "explanation": "Always ensure scene safety and call for help before initiating CPR.",
   "category": "BLS/CPR"
},
 {
   "id": 6,
   "question": "How long should each rescue breath last during CPR?",
   "options": [
      "5 seconds",
      "1 second",
      "3 seconds",
      "10 seconds"
   ],
   "correctAnswer": 1,
   "explanation": "Each rescue breath should be given over 1 second to provide adequate ventilation without over-inflating.",
   "category": "BLS/CPR"
},
 {
   "id": 7,
   "question": "What is the correct hand placement for adult chest compressions?",
   "options": [
      "Upper third of the sternum",
      "Lower half of the sternum",
      "On the ribs",
      "On the abdomen"
   ],
   "correctAnswer": 1,
   "explanation": "Hands should be placed on the lower half of the sternum for effective compressions.",
   "category": "BLS/CPR"
},
 {
   "id": 8,
   "question": "What should you do if the AED advises 'No Shock'?",
   "options": [
      "Remove the AED pads",
      "Resume CPR immediately",
      "Wait for paramedics",
      "Give the patient water"
   ],
   "correctAnswer": 1,
   "explanation": "If AED advises no shock, resume CPR immediately starting with chest compressions.",
   "category": "BLS/CPR"
},
 {
   "id": 9,
   "question": "What is the recommended compression depth for a child during CPR?",
   "options": [
      "At least 1 inch",
      "At least 2 inches (5 cm)",
      "About 2 inches or 1/3 AP diameter",
      "3 inches"
   ],
   "correctAnswer": 2,
   "explanation": "For children, compress at least 1/3 the AP diameter of the chest, about 2 inches.",
   "category": "BLS/CPR"
},
 {
   "id": 10,
   "question": "How often should you switch compressor roles during CPR?",
   "options": [
      "Every 5 minutes",
      "Every 2 minutes or 5 cycles",
      "Every 10 minutes",
      "Only when tired"
   ],
   "correctAnswer": 1,
   "explanation": "Switch compressors every 2 minutes or 5 cycles to prevent fatigue and maintain quality.",
   "category": "BLS/CPR"
},
 {
   "id": 11,
   "question": "What is the correct CPR ratio for a child with two rescuers?",
   "options": [
      "30:02:00",
      "15:02",
      "20:02",
      "10:01"
   ],
   "correctAnswer": 1,
   "explanation": "For two-rescuer child CPR, the ratio is 15 compressions to 2 ventilations.",
   "category": "BLS/CPR"
},
 {
   "id": 12,
   "question": "What is the most common cause of airway obstruction in an unconscious patient?",
   "options": [
      "Food",
      "The tongue",
      "Vomit",
      "Foreign object"
   ],
   "correctAnswer": 1,
   "explanation": "In an unconscious patient, the tongue relaxes and falls back, blocking the airway.",
   "category": "BLS/CPR"
},
 {
   "id": 13,
   "question": "What is the recovery position used for?",
   "options": [
      "To treat cardiac arrest",
      "To maintain open airway in a breathing but unresponsive patient",
      "To stop bleeding",
      "To treat fractures"
   ],
   "correctAnswer": 1,
   "explanation": "The recovery position keeps the airway open and allows fluids to drain in an unresponsive breathing patient.",
   "category": "BLS/CPR"
},
 {
   "id": 14,
   "question": "Before applying AED pads, what should you check?",
   "options": [
      "Patient temperature",
      "Water or moisture on the chest, medication patches, and implanted devices",
      "Patient weight",
      "Patient age only"
   ],
   "correctAnswer": 1,
   "explanation": "Check for moisture, medication patches, and pacemakers as they interfere with AED function.",
   "category": "BLS/CPR"
},
 {
   "id": 15,
   "question": "What is the recommended compression depth for an infant during CPR?",
   "options": [
      "0.5 inch (1.3 cm)",
      "About 1.5 inches or 1/3 AP diameter",
      "3 inches",
      "2.5 inches"
   ],
   "correctAnswer": 1,
   "explanation": "For infants, compress about 1/3 the AP diameter, approximately 1.5 inches (4 cm).",
   "category": "BLS/CPR"
},
 {
   "id": 16,
   "question": "What technique is used to open the airway of an unconscious patient without suspected spinal injury?",
   "options": [
      "Jaw thrust",
      "Head tilt-chin lift",
      "Nasopharyngeal airway",
      "Cricothyrotomy"
   ],
   "correctAnswer": 1,
   "explanation": "Head tilt-chin lift is the standard method to open the airway when no spinal injury is suspected.",
   "category": "BLS/CPR"
},
 {
   "id": 17,
   "question": "When using an AED, when should you press the shock button?",
   "options": [
      "While touching the patient",
      "Only when the AED advises and everyone is clear of the patient",
      "Immediately after pads are placed",
      "When the patient is breathing"
   ],
   "correctAnswer": 1,
   "explanation": "Press shock only when AED advises and ensure no one is touching the patient.",
   "category": "BLS/CPR"
},
 {
   "id": 18,
   "question": "What is the correct technique for infant CPR compressions?",
   "options": [
      "Two hands",
      "Two fingers in the center of the chest",
      "Heel of one hand",
      "Fist"
   ],
   "correctAnswer": 1,
   "explanation": "For infants, use two fingers placed in the center of the chest just below the nipple line.",
   "category": "BLS/CPR"
},
 {
   "id": 19,
   "question": "What does the 'C' in the CAB sequence of CPR stand for?",
   "options": [
      "Circulation",
      "Compressions",
      "Checking",
      "Care"
   ],
   "correctAnswer": 1,
   "explanation": "CAB stands for Compressions, Airway, Breathing - compressions are started first.",
   "category": "BLS/CPR"
},
 {
   "id": 20,
   "question": "What is the purpose of allowing full chest recoil during CPR?",
   "options": [
      "To rest the rescuer",
      "To allow the heart to refill with blood",
      "To count compressions",
      "To check breathing"
   ],
   "correctAnswer": 1,
   "explanation": "Full chest recoil allows the heart to refill with blood for the next compression to be effective.",
   "category": "BLS/CPR"
},
 {
   "id": 21,
   "question": "How often should an AED be inspected?",
   "options": [
      "Daily or per manufacturer and agency protocol",
      "Weekly only",
      "Monthly only",
      "Yearly"
   ],
   "correctAnswer": 0,
   "explanation": "AEDs should be checked daily or per protocol to ensure battery charge and pad availability.",
   "category": "Life Support Equipment"
},
 {
   "id": 22,
   "question": "What is the typical shelf life of AED electrode pads?",
   "options": [
      "2 to 5 years depending on manufacturer",
      "6 months",
      "10 years",
      "1 year"
   ],
   "correctAnswer": 0,
   "explanation": "AED pads typically last 2-5 years; always check the expiration date before use.",
   "category": "Life Support Equipment"
},
 {
   "id": 23,
   "question": "What should you do if an oxygen cylinder gauge reads in the red zone?",
   "options": [
      "Continue using it",
      "Shake the cylinder",
      "Wait until it is empty",
      "Replace the cylinder immediately"
   ],
   "correctAnswer": 3,
   "explanation": "A reading in the red zone indicates low supply; replace the cylinder immediately.",
   "category": "Life Support Equipment"
},
 {
   "id": 24,
   "question": "What is the proper storage position for oxygen cylinders?",
   "options": [
      "Upside down",
      "On their side near heat",
      "Upright and secured",
      "Laying flat on the floor"
   ],
   "correctAnswer": 2,
   "explanation": "Oxygen cylinders must be stored upright and secured to prevent falling and valve damage.",
   "category": "Life Support Equipment"
},
 {
   "id": 25,
   "question": "What should be checked on a bag-valve-mask (BVM) before use?",
   "options": [
      "Weight only",
      "Valve function, mask seal, and oxygen reservoir",
      "Color only",
      "Brand name"
   ],
   "correctAnswer": 1,
   "explanation": "Check that the valve works, the mask seals properly, and the reservoir is attached.",
   "category": "Life Support Equipment"
},
 {
   "id": 26,
   "question": "What is the recommended method to clean reusable EMS equipment?",
   "options": [
      "Wipe with dry cloth only",
      "Use gasoline",
      "Clean with approved disinfectant per manufacturer guidelines",
      "Rinse with water only"
   ],
   "correctAnswer": 2,
   "explanation": "Use approved disinfectants following manufacturer guidelines to ensure proper decontamination.",
   "category": "Life Support Equipment"
},
 {
   "id": 27,
   "question": "What must be verified on a suction unit before responding to a call?",
   "options": [
      "Its weight",
      "Its brand",
      "Its color",
      "That it powers on and generates adequate vacuum pressure"
   ],
   "correctAnswer": 3,
   "explanation": "Suction units must be tested for power and adequate vacuum pressure before each shift.",
   "category": "Life Support Equipment"
},
 {
   "id": 28,
   "question": "How should disposable EMS supplies be handled after use?",
   "options": [
      "Reused after wiping",
      "Thrown in regular trash",
      "Disposed of in appropriate biohazard containers",
      "Left in the ambulance"
   ],
   "correctAnswer": 2,
   "explanation": "All disposable supplies that contacted bodily fluids must go into biohazard containers.",
   "category": "Life Support Equipment"
},
 {
   "id": 29,
   "question": "What is the purpose of checking the AED battery indicator?",
   "options": [
      "To record patient data",
      "To know the brand",
      "To ensure the device has sufficient charge to deliver shocks",
      "To check the time"
   ],
   "correctAnswer": 2,
   "explanation": "The battery indicator confirms the AED has enough power to analyze and deliver shocks.",
   "category": "Life Support Equipment"
},
 {
   "id": 30,
   "question": "Why should equipment be checked at the start of every shift?",
   "options": [
      "To ensure all items are present, functional, and ready for use",
      "For appearance",
      "To count inventory for billing",
      "To impress supervisors"
   ],
   "correctAnswer": 0,
   "explanation": "Shift checks ensure all equipment is present, functional, and ready for emergency use.",
   "category": "Life Support Equipment"
},
 {
   "id": 31,
   "question": "What is the first priority at a vehicle crash scene?",
   "options": [
      "Start CPR",
      "Ensure scene safety and hazard control",
      "Call the family",
      "Remove the patient immediately"
   ],
   "correctAnswer": 1,
   "explanation": "Scene safety and hazard control must be established before any rescue or patient contact.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 32,
   "question": "What tool is commonly used to stabilize a vehicle before extrication?",
   "options": [
      "Cribbing and wheel chocks",
      "Flashlight only",
      "Bandages",
      "Stethoscope"
   ],
   "correctAnswer": 0,
   "explanation": "Cribbing and wheel chocks stabilize the vehicle to prevent movement during extrication.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 33,
   "question": "What is the purpose of the Kendrick Extrication Device (KED)?",
   "options": [
      "To immobilize the cervical and thoracic spine during extrication",
      "To splint leg fractures",
      "To stop bleeding",
      "To administer oxygen"
   ],
   "correctAnswer": 0,
   "explanation": "The KED immobilizes the head, neck, and torso for safe removal from a vehicle.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 34,
   "question": "When should a patient be rapidly extricated from a vehicle?",
   "options": [
      "When the patient is comfortable",
      "Only at night",
      "When there is immediate danger to life or the scene is unsafe",
      "When the ambulance arrives"
   ],
   "correctAnswer": 2,
   "explanation": "Rapid extrication is used when the scene poses immediate danger to the patient or rescuers.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 35,
   "question": "What PPE should be worn during vehicle extrication?",
   "options": [
      "nan",
      "Only gloves",
      "Full protective gear including helmet, gloves, and eye protection",
      "Surgical mask only"
   ],
   "correctAnswer": 2,
   "explanation": "Full PPE including helmet, gloves, eye protection, and reflective vest is required during extrication.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 36,
   "question": "What is the correct procedure when a vehicle has deployed airbags?",
   "options": [
      "Ignore them",
      "Remove the airbags",
      "Sit on them",
      "Deactivate the battery and keep a safe distance from undeployed airbags"
   ],
   "correctAnswer": 3,
   "explanation": "Deactivate the vehicle battery and maintain distance from undeployed airbags to prevent accidental deployment.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 37,
   "question": "What is a simple extrication method when no tools are available?",
   "options": [
      "Drag the patient by the arms",
      "Use the rapid extrication technique with manual spinal stabilization",
      "Leave the patient in the vehicle",
      "Pull by the legs"
   ],
   "correctAnswer": 1,
   "explanation": "Rapid extrication with manual spinal stabilization is used when tools are not available.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 38,
   "question": "Why must the vehicle battery be disconnected during extrication?",
   "options": [
      "To eliminate electrical, fire, and airbag deployment hazards",
      "To charge devices",
      "To save fuel",
      "To test the battery"
   ],
   "correctAnswer": 0,
   "explanation": "Disconnecting the battery prevents electrical fires, accidental airbag deployment, and other hazards.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 39,
   "question": "What should be done before breaking a vehicle window for access?",
   "options": [
      "Nothing special",
      "Protect the patient, announce the action, and use proper tools",
      "Ask the patient to roll it down first",
      "Just punch it"
   ],
   "correctAnswer": 1,
   "explanation": "Protect the patient from glass, announce the action for safety, and use a window punch or proper tool.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 40,
   "question": "What is the role of the EMS provider during technical extrication?",
   "options": [
      "Take photographs",
      "Operate hydraulic tools",
      "Direct traffic",
      "Provide patient care and communicate with the extrication team"
   ],
   "correctAnswer": 3,
   "explanation": "EMS providers focus on patient care while coordinating with the extrication team.",
   "category": "Safe Access/ Extrication"
},
 {
   "id": 41,
   "question": "What document governs the operational standards of an ambulance service in the Philippines?",
   "options": [
      "Personal preference",
      "Barangay ordinance",
      "DOH Administrative Order and TESDA training regulations",
      "School policy"
   ],
   "correctAnswer": 2,
   "explanation": "DOH Administrative Orders and TESDA TRs set the standards for ambulance service operations.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 42,
   "question": "What is the minimum staffing requirement for a BLS ambulance?",
   "options": [
      "Five personnel",
      "One driver only",
      "At least two trained EMS providers",
      "A doctor and nurse only"
   ],
   "correctAnswer": 2,
   "explanation": "A BLS ambulance requires at least two trained EMS providers for safe operations.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 43,
   "question": "What type of license is required to operate an ambulance service?",
   "options": [
      "Driver license only",
      "No license needed",
      "Business permit only",
      "DOH license to operate"
   ],
   "correctAnswer": 3,
   "explanation": "A DOH License to Operate is required for ambulance services in the Philippines.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 44,
   "question": "What is the purpose of an ambulance service quality assurance program?",
   "options": [
      "To reduce staff",
      "To ensure compliance with standards and improve patient care",
      "To increase revenue",
      "To punish employees"
   ],
   "correctAnswer": 1,
   "explanation": "Quality assurance ensures compliance with standards and continuous improvement of patient care.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 45,
   "question": "What must be included in an ambulance service incident report?",
   "options": [
      "Only the patient name",
      "Date, time, location, personnel, patient info, and care provided",
      "The weather only",
      "Only the destination"
   ],
   "correctAnswer": 1,
   "explanation": "Incident reports must comprehensively include date, time, location, personnel, patient info, and care given.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 46,
   "question": "How should ambulance service records be maintained?",
   "options": [
      "Left in the ambulance",
      "Stored securely and retained per regulatory requirements",
      "Given to the patient",
      "Thrown away after each shift"
   ],
   "correctAnswer": 1,
   "explanation": "Records must be securely stored and retained according to DOH and regulatory requirements.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 47,
   "question": "What is the purpose of ambulance service Standard Operating Procedures (SOPs)?",
   "options": [
      "To limit patient care",
      "To make work harder",
      "To reduce paperwork",
      "To provide consistent and standardized guidelines for operations"
   ],
   "correctAnswer": 3,
   "explanation": "SOPs provide standardized guidelines ensuring consistent, safe, and effective ambulance operations.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 48,
   "question": "Who is responsible for ensuring the ambulance is properly equipped before a shift?",
   "options": [
      "The patient",
      "The hospital admin",
      "The assigned EMS crew on duty",
      "The bystander"
   ],
   "correctAnswer": 2,
   "explanation": "The assigned EMS crew is responsible for checking and ensuring the ambulance is properly equipped.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 49,
   "question": "What is the purpose of a patient care report (PCR)?",
   "options": [
      "To track fuel consumption",
      "To document all assessment findings, care, and interventions provided",
      "Billing only",
      "To record weather"
   ],
   "correctAnswer": 1,
   "explanation": "The PCR documents all findings, care provided, and interventions for medical and legal purposes.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 50,
   "question": "What should an ambulance service do when receiving a complaint?",
   "options": [
      "Ignore it",
      "Argue with the complainant",
      "Delete the record",
      "Document, investigate, and take corrective action"
   ],
   "correctAnswer": 3,
   "explanation": "Complaints must be documented, investigated, and resolved with appropriate corrective action.",
   "category": "Ambu-Srvce Management"
},
 {
   "id": 51,
   "question": "What is the primary communication tool used by EMS to contact medical direction?",
   "options": [
      "Signal flag",
      "Social media",
      "Email",
      "Two-way radio or phone"
   ],
   "correctAnswer": 3,
   "explanation": "Two-way radio or phone is the standard tool for communicating with medical direction.",
   "category": "Ambulance Communication"
},
 {
   "id": 52,
   "question": "What information should be included in a radio report to the hospital?",
   "options": [
      "Only the patient name",
      "The weather only",
      "Only the destination",
      "Patient demographics, chief complaint, assessment findings, and treatment given"
   ],
   "correctAnswer": 3,
   "explanation": "A radio report must include demographics, chief complaint, findings, and treatment for continuity of care.",
   "category": "Ambulance Communication"
},
 {
   "id": 53,
   "question": "What is the SBAR format used in EMS communication?",
   "options": [
      "Situation, Background, Assessment, Recommendation",
      "Send, Bring, Advise, Return",
      "Stop, Breathe, Assess, React",
      "Simple, Brief, Accurate, Rapid"
   ],
   "correctAnswer": 0,
   "explanation": "SBAR stands for Situation, Background, Assessment, Recommendation - a structured communication method.",
   "category": "Ambulance Communication"
},
 {
   "id": 54,
   "question": "When should you use plain language instead of codes in radio communication?",
   "options": [
      "Always, as recommended by NIMS and FEMA",
      "Only at night",
      "Only for critical patients",
      "Never"
   ],
   "correctAnswer": 0,
   "explanation": "NIMS and FEMA recommend plain language for clear, universal communication across agencies.",
   "category": "Ambulance Communication"
},
 {
   "id": 55,
   "question": "What is the purpose of the MCI (Mass Casualty Incident) communication protocol?",
   "options": [
      "To record music",
      "To coordinate resources and communication during multi-patient incidents",
      "To order food",
      "To chat with friends"
   ],
   "correctAnswer": 1,
   "explanation": "MCI protocols coordinate resources, triage, and communication among responders during large-scale incidents.",
   "category": "Ambulance Communication"
},
 {
   "id": 56,
   "question": "What should you do before transmitting on a radio?",
   "options": [
      "Listen first to ensure the channel is clear",
      "Remove the antenna",
      "Shout into the microphone",
      "Turn the radio off"
   ],
   "correctAnswer": 0,
   "explanation": "Always listen first to avoid interrupting ongoing communications on the channel.",
   "category": "Ambulance Communication"
},
 {
   "id": 57,
   "question": "What is the proper way to acknowledge a radio transmission?",
   "options": [
      "Repeat key information and confirm receipt",
      "Ignore it",
      "Just say OK",
      "Change the channel"
   ],
   "correctAnswer": 0,
   "explanation": "Repeat key information and confirm receipt to ensure accurate communication.",
   "category": "Ambulance Communication"
},
 {
   "id": 58,
   "question": "When communicating with a hearing-impaired patient, what should you do?",
   "options": [
      "Shout loudly",
      "Ignore the patient",
      "Talk faster",
      "Face the patient, speak clearly, and use gestures or writing if needed"
   ],
   "correctAnswer": 3,
   "explanation": "Face the patient, speak clearly, and use alternative methods like writing to communicate effectively.",
   "category": "Ambulance Communication"
},
 {
   "id": 59,
   "question": "What is the standard format for an EMS verbal report during patient turnover?",
   "options": [
      "Only mention the name",
      "Only mention the diagnosis",
      "Random order",
      "Follow a structured format such as I-PASS or SBAR"
   ],
   "correctAnswer": 3,
   "explanation": "Structured formats like I-PASS or SBAR ensure complete and accurate patient turnover.",
   "category": "Ambulance Communication"
},
 {
   "id": 60,
   "question": "Why is patient confidentiality important in EMS communication?",
   "options": [
      "Only for doctors",
      "It is required by law (Data Privacy Act) and protects patient rights",
      "Only for billing",
      "It is not important"
   ],
   "correctAnswer": 1,
   "explanation": "The Data Privacy Act and medical ethics require protecting patient information during all communications.",
   "category": "Ambulance Communication"
},
 {
   "id": 61,
   "question": "What is the first step in scene management upon arrival?",
   "options": [
      "Start treating immediately",
      "Call the family",
      "Take photographs",
      "Assess scene safety and identify hazards"
   ],
   "correctAnswer": 3,
   "explanation": "Scene safety assessment is always the first priority before any patient contact.",
   "category": "Scene Management"
},
 {
   "id": 62,
   "question": "What does the 'M' in MARCH stand for in tactical casualty care?",
   "options": [
      "Monitoring",
      "Medication",
      "Massive hemorrhage",
      "Movement"
   ],
   "correctAnswer": 2,
   "explanation": "MARCH: Massive hemorrhage, Airway, Respiration, Circulation, Hypothermia/Head injury.",
   "category": "Scene Management"
},
 {
   "id": 63,
   "question": "How many patients are needed to declare a Mass Casualty Incident (MCI)?",
   "options": [
      "One patient",
      "Fifty patients minimum",
      "When the number of patients exceeds available resources",
      "Ten patients minimum"
   ],
   "correctAnswer": 2,
   "explanation": "An MCI is declared when patient numbers exceed available resources to manage them effectively.",
   "category": "Scene Management"
},
 {
   "id": 64,
   "question": "What is the role of the Incident Commander at an MCI?",
   "options": [
      "To oversee overall operations and resource allocation",
      "To treat patients",
      "To call the media",
      "To drive the ambulance"
   ],
   "correctAnswer": 0,
   "explanation": "The Incident Commander oversees the entire operation, resource allocation, and coordination.",
   "category": "Scene Management"
},
 {
   "id": 65,
   "question": "What color tag is given to a deceased patient in triage?",
   "options": [
      "Green",
      "Black",
      "Yellow",
      "Red"
   ],
   "correctAnswer": 1,
   "explanation": "Black tags indicate deceased or nonsurvivable injuries in the START triage system.",
   "category": "Scene Management"
},
 {
   "id": 66,
   "question": "What color tag is given to the most critical but salvageable patient in triage?",
   "options": [
      "Black",
      "Green",
      "Red",
      "White"
   ],
   "correctAnswer": 2,
   "explanation": "Red tags identify immediate/critical patients who need urgent care to survive.",
   "category": "Scene Management"
},
 {
   "id": 67,
   "question": "What is a danger zone at an emergency scene?",
   "options": [
      "A safe waiting area",
      "A rest area",
      "An area with potential hazards that should be cordoned off",
      "A parking area"
   ],
   "correctAnswer": 2,
   "explanation": "Danger zones contain hazards and must be cordoned off to protect both rescuers and bystanders.",
   "category": "Scene Management"
},
 {
   "id": 68,
   "question": "Who has authority over patient care decisions at a scene?",
   "options": [
      "The driver",
      "Bystanders",
      "Police only",
      "The highest qualified EMS provider or medical direction"
   ],
   "correctAnswer": 3,
   "explanation": "Patient care decisions are made by the highest qualified EMS provider in consultation with medical direction.",
   "category": "Scene Management"
},
 {
   "id": 69,
   "question": "What is the purpose of establishing a treatment sector at an MCI?",
   "options": [
      "To provide a designated area for patient assessment and treatment",
      "For parking",
      "To store equipment",
      "For staff breaks"
   ],
   "correctAnswer": 0,
   "explanation": "The treatment sector is a designated area where patients receive assessment and initial treatment.",
   "category": "Scene Management"
},
 {
   "id": 70,
   "question": "What is the role of the triage officer at an MCI?",
   "options": [
      "To treat all patients",
      "To quickly assess and categorize patients by severity",
      "To transport patients",
      "To call families"
   ],
   "correctAnswer": 1,
   "explanation": "The triage officer rapidly assesses and categorizes patients by injury severity for priority care.",
   "category": "Scene Management"
},
 {
   "id": 71,
   "question": "What is the first step in patient assessment?",
   "options": [
      "Start an IV",
      "Take vital signs",
      "Give medication",
      "Determine scene safety and form a general impression"
   ],
   "correctAnswer": 3,
   "explanation": "Scene safety and general impression are always assessed first before any patient contact.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 72,
   "question": "What does the SAMPLE history stand for?",
   "options": [
      "Simple, Accurate, Meaningful, Practical, Logical, Easy",
      "Scan, Analyze, Measure, Predict, Learn, Execute",
      "Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading up",
      "Save, Assess, Move, Protect, Locate, Evacuate"
   ],
   "correctAnswer": 2,
   "explanation": "SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 73,
   "question": "What are the components of the primary survey?",
   "options": [
      "Only vital signs",
      "Only checking pupils",
      "Airway, Breathing, Circulation, Disability, Exposure",
      "Head to toe exam"
   ],
   "correctAnswer": 2,
   "explanation": "The primary survey follows ABCDE: Airway, Breathing, Circulation, Disability, Exposure.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 74,
   "question": "What is a normal adult respiratory rate?",
   "options": [
      "30-40 breaths/min",
      "12-20 breaths/min",
      "40-60 breaths/min",
      "5-10 breaths/min"
   ],
   "correctAnswer": 1,
   "explanation": "The normal adult respiratory rate is 12-20 breaths per minute.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 75,
   "question": "What is a normal adult heart rate?",
   "options": [
      "150-200 compressions/min",
      "60-100 compressions/min",
      "40-50 compressions/min",
      "120-150 compressions/min"
   ],
   "correctAnswer": 1,
   "explanation": "The normal adult heart rate ranges from 60 to 100 beats per minute.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 76,
   "question": "What is a normal systolic blood pressure for an adult?",
   "options": [
      "150-180 mmHg",
      "200-250 mmHg",
      "60-80 mmHg",
      "90-120 mmHg"
   ],
   "correctAnswer": 3,
   "explanation": "Normal adult systolic blood pressure is typically 90-120 mmHg.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 77,
   "question": "When should a secondary assessment be performed?",
   "options": [
      "Before the primary assessment",
      "Only at the hospital",
      "Instead of the primary assessment",
      "After the primary survey when the patient is stable"
   ],
   "correctAnswer": 3,
   "explanation": "The secondary assessment is done after the primary survey once immediate threats are addressed.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 78,
   "question": "What is the Glasgow Coma Scale (GCS) used for?",
   "options": [
      "To measure blood pressure",
      "To check temperature",
      "To measure oxygen levels",
      "To assess level of consciousness"
   ],
   "correctAnswer": 3,
   "explanation": "The GCS assesses level of consciousness based on eye, verbal, and motor responses.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 79,
   "question": "What does OPQRST stand for in pain assessment?",
   "options": [
      "Onset, Provocation, Quality, Radiation, Severity, Time",
      "Open, Position, Question, Record, Solve, Treat",
      "Only, Pain, Quality, Rate, Speed, Time",
      "Observe, Palpate, Question, React, Support, Transport"
   ],
   "correctAnswer": 0,
   "explanation": "OPQRST: Onset, Provocation, Quality, Radiation, Severity, Time of pain.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 80,
   "question": "What is the normal range for pulse oximetry (SpO2)?",
   "options": [
      "50-60%",
      "95-100%",
      "80-85%",
      "70-80%"
   ],
   "correctAnswer": 1,
   "explanation": "Normal SpO2 is 95-100%; below 94% may indicate hypoxemia requiring intervention.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 81,
   "question": "What is the correct technique for measuring blood pressure?",
   "options": [
      "Apply the cuff on the ankle",
      "Apply the cuff on bare skin at heart level",
      "Apply the cuff loosely",
      "Apply the cuff on clothing"
   ],
   "correctAnswer": 1,
   "explanation": "The cuff must be on bare skin, at heart level, and properly sized for accurate readings.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 82,
   "question": "What does DCAP-BTLS stand for during a physical exam?",
   "options": [
      "Deformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling",
      "Direct, Careful, Assessment, Patient - Basic, Trauma, Life, Support",
      "Don't Check Any Part - Be Too Lazy Sometimes",
      "Diagnose, Classify, Assess, Plan - Basic, Treatment, Level, Severity"
   ],
   "correctAnswer": 0,
   "explanation": "DCAP-BTLS is a mnemonic for signs of injury: Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 83,
   "question": "What is the purpose of the rapid trauma assessment?",
   "options": [
      "To quickly identify life-threatening injuries across the body",
      "To check only the extremities",
      "To check only the head",
      "To count heartbeat only"
   ],
   "correctAnswer": 0,
   "explanation": "Rapid trauma assessment quickly identifies life-threatening injuries from head to toe.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 84,
   "question": "What is the normal pupillary response to light?",
   "options": [
      "No change",
      "One pupil fixed",
      "Constriction (both pupils react equally)",
      "Dilation"
   ],
   "correctAnswer": 2,
   "explanation": "Normal pupils constrict equally and briskly when exposed to light (PERL - Pupils Equal and Reactive to Light).",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 85,
   "question": "What position should a patient with difficulty breathing be placed in?",
   "options": [
      "Trendelenburg",
      "Prone",
      "Fowler's or semi-Fowler's position",
      "Supine"
   ],
   "correctAnswer": 2,
   "explanation": "Fowler's or semi-Fowler's position helps patients with breathing difficulty by allowing lung expansion.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 86,
   "question": "What is the shock position (modified Trendelenburg)?",
   "options": [
      "Head down, feet flat",
      "Prone position",
      "Supine with legs elevated 12 inches",
      "Sitting upright"
   ],
   "correctAnswer": 2,
   "explanation": "Modified Trendelenburg is supine with legs elevated about 12 inches to improve venous return.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 87,
   "question": "When should vital signs be reassessed during transport?",
   "options": [
      "Only at the start",
      "Every 5 minutes for critical patients and every 15 minutes for stable patients",
      "Only at the hospital",
      "Once only"
   ],
   "correctAnswer": 1,
   "explanation": "Vital signs are monitored every 5 min for critical and every 15 min for stable patients during transport.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 88,
   "question": "What is the purpose of auscultation in patient assessment?",
   "options": [
      "To visually inspect",
      "To smell for abnormalities",
      "To feel for abnormalities",
      "To listen to body sounds such as breath sounds and heart sounds"
   ],
   "correctAnswer": 3,
   "explanation": "Auscultation uses a stethoscope to listen to breath, heart, and other body sounds for abnormalities.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 89,
   "question": "What is the significance of absent breath sounds on one side?",
   "options": [
      "Patient is healthy",
      "Patient is sleeping",
      "Possible pneumothorax or hemothorax",
      "Normal finding"
   ],
   "correctAnswer": 2,
   "explanation": "Absent breath sounds on one side may indicate pneumothorax or hemothorax requiring immediate attention.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 90,
   "question": "What is the correct method to assess skin signs in a patient?",
   "options": [
      "Check only the hands",
      "Check skin color, temperature, and moisture",
      "Ignore skin signs",
      "Look only at the face"
   ],
   "correctAnswer": 1,
   "explanation": "Assess skin color, temperature, and moisture as indicators of perfusion and shock.",
   "category": "Pre-Hospital Patient Care"
},
 {
   "id": 91,
   "question": "What is the most important consideration when transporting a patient with spinal injury?",
   "options": [
      "Cost of transport",
      "Maintaining spinal immobilization throughout transport",
      "Patient comfort only",
      "Speed only"
   ],
   "correctAnswer": 1,
   "explanation": "Spinal immobilization must be maintained at all times to prevent further spinal cord damage.",
   "category": "Transport Patients"
},
 {
   "id": 92,
   "question": "What is the correct way to carry a patient on a stretcher down stairs?",
   "options": [
      "Carry horizontally only",
      "Sideways",
      "Head first going down",
      "Feet first going down with the patient's head higher than feet"
   ],
   "correctAnswer": 3,
   "explanation": "Carry feet first going down stairs with the patient's head at the higher end.",
   "category": "Transport Patients"
},
 {
   "id": 93,
   "question": "When should a patient be secured to a long backboard?",
   "options": [
      "Only at night",
      "Only for long transports",
      "When spinal injury is suspected before movement",
      "Only for conscious patients"
   ],
   "correctAnswer": 2,
   "explanation": "Secure the patient to a long backboard before any movement when spinal injury is suspected.",
   "category": "Transport Patients"
},
 {
   "id": 94,
   "question": "What is the minimum number of rescuers needed to safely carry a stretcher?",
   "options": [
      "Two at minimum, preferably four",
      "Six",
      "Eight",
      "One"
   ],
   "correctAnswer": 0,
   "explanation": "At least two rescuers are needed, but four is preferred for safe stretcher carrying.",
   "category": "Transport Patients"
},
 {
   "id": 95,
   "question": "What must be done before loading a stretcher into the ambulance?",
   "options": [
      "Ensure the stretcher is locked and the patient is secured with straps",
      "Release the wheels",
      "Remove all straps",
      "Nothing"
   ],
   "correctAnswer": 0,
   "explanation": "Verify the stretcher locking mechanism and that the patient is secured with all straps before loading.",
   "category": "Transport Patients"
},
 {
   "id": 96,
   "question": "What position should a pregnant patient in labor be placed in during transport?",
   "options": [
      "Standing",
      "Left lateral recumbent position",
      "Prone",
      "Head down"
   ],
   "correctAnswer": 1,
   "explanation": "Left lateral recumbent position prevents aortocaval compression and improves blood flow to the fetus.",
   "category": "Transport Patients"
},
 {
   "id": 97,
   "question": "How should a patient with a suspected pelvic fracture be transported?",
   "options": [
      "Walking",
      "Sitting upright",
      "On a chair",
      "On a long backboard or scoop stretcher with minimal movement"
   ],
   "correctAnswer": 3,
   "explanation": "Use a long backboard or scoop stretcher with minimal movement to prevent further pelvic injury.",
   "category": "Transport Patients"
},
 {
   "id": 98,
   "question": "What is a critical safety step during ambulance transport?",
   "options": [
      "Leave doors open",
      "Drive as fast as possible always",
      "Let the patient hold equipment",
      "Secure the patient and all equipment to prevent movement during transport"
   ],
   "correctAnswer": 3,
   "explanation": "All patients and equipment must be secured to prevent injury from sudden movements.",
   "category": "Transport Patients"
},
 {
   "id": 99,
   "question": "When should you use an emergency (lights and siren) transport?",
   "options": [
      "Only at night",
      "Always",
      "Only when the patient's condition is time-critical and the benefit outweighs the risk",
      "Never"
   ],
   "correctAnswer": 2,
   "explanation": "Emergency transport is used only when time-critical conditions exist and benefits outweigh risks.",
   "category": "Transport Patients"
},
 {
   "id": 100,
   "question": "What should be communicated to the receiving hospital before arrival?",
   "options": [
      "Only the patient name",
      "Nothing",
      "Only the weather",
      "Patient condition, ETA, and any special needs"
   ],
   "correctAnswer": 3,
   "explanation": "Notify the hospital of patient condition, estimated time of arrival, and any special requirements.",
   "category": "Transport Patients"
},
 {
   "id": 101,
   "question": "What LTO requirement must an ambulance driver possess?",
   "options": [
      "Only a barangay clearance",
      "Student permit only",
      "Valid professional driver's license with restriction code for the ambulance vehicle",
      "No license needed"
   ],
   "correctAnswer": 2,
   "explanation": "Ambulance drivers must have a valid professional driver's license with the appropriate restriction code.",
   "category": "Drive Ambulance"
},
 {
   "id": 102,
   "question": "When driving with lights and siren, what is the recommended approach at an intersection?",
   "options": [
      "Speed through without stopping",
      "Slow down, check all lanes are clear, then proceed with caution",
      "Honk and accelerate",
      "Close your eyes"
   ],
   "correctAnswer": 1,
   "explanation": "At intersections, slow down, verify all lanes are clear, and proceed with extreme caution.",
   "category": "Drive Ambulance"
},
 {
   "id": 103,
   "question": "What is the maximum speed limit for an ambulance during emergency response according to LTO?",
   "options": [
      "No limit",
      "Within posted speed limits with due regard for safety",
      "100 kph always",
      "Double the limit"
   ],
   "correctAnswer": 1,
   "explanation": "Even during emergencies, ambulances must observe speed limits with due regard for public safety.",
   "category": "Drive Ambulance"
},
 {
   "id": 104,
   "question": "What should an ambulance driver do when approaching a red traffic light during an emergency?",
   "options": [
      "Speed up",
      "Stop, ensure intersection is clear, then proceed with caution",
      "Reverse",
      "Ignore it completely"
   ],
   "correctAnswer": 1,
   "explanation": "Stop at red lights, ensure all traffic has yielded, then proceed cautiously through the intersection.",
   "category": "Drive Ambulance"
},
 {
   "id": 105,
   "question": "What is the purpose of the ambulance pre-trip inspection?",
   "options": [
      "To waste time",
      "To clean the exterior only",
      "To check fuel only",
      "To ensure the vehicle is mechanically safe and properly equipped before responding"
   ],
   "correctAnswer": 3,
   "explanation": "Pre-trip inspections ensure the ambulance is mechanically sound and fully equipped for emergencies.",
   "category": "Drive Ambulance"
},
 {
   "id": 106,
   "question": "What is the recommended following distance when driving an ambulance?",
   "options": [
      "2 car lengths always",
      "At least 3-4 seconds under normal conditions",
      "1 second",
      "Tailgate the vehicle ahead"
   ],
   "correctAnswer": 1,
   "explanation": "Maintain at least 3-4 seconds following distance in normal conditions for safe stopping.",
   "category": "Drive Ambulance"
},
 {
   "id": 107,
   "question": "Why should an ambulance driver avoid sudden braking during patient transport?",
   "options": [
      "To impress bystanders",
      "To save fuel",
      "To prevent patient and crew injury from unsecured movement",
      "To arrive faster"
   ],
   "correctAnswer": 2,
   "explanation": "Sudden braking can injure the patient and crew; smooth driving prevents unsecured movement.",
   "category": "Drive Ambulance"
},
 {
   "id": 108,
   "question": "What must an ambulance driver do when involved in an accident during response?",
   "options": [
      "Flee the scene",
      "Stop, check for injuries, notify dispatch and authorities",
      "Continue to the hospital",
      "Only call the hospital"
   ],
   "correctAnswer": 1,
   "explanation": "Stop immediately, check for injuries, and notify dispatch and authorities per protocol.",
   "category": "Drive Ambulance"
},
 {
   "id": 109,
   "question": "What is the purpose of using escorts or lead vehicles during ambulance transport?",
   "options": [
      "To take photos",
      "For show",
      "To carry extra equipment",
      "To clear traffic and ensure safe passage in heavy congestion or special situations"
   ],
   "correctAnswer": 3,
   "explanation": "Escorts help clear traffic and ensure safe passage through congested or hazardous areas.",
   "category": "Drive Ambulance"
},
 {
   "id": 110,
   "question": "What should the ambulance driver do when parking at a scene?",
   "options": [
      "Block all traffic",
      "Double park",
      "Park at a safe distance, use warning lights, and position for rapid departure",
      "Park on the sidewalk"
   ],
   "correctAnswer": 2,
   "explanation": "Park at a safe distance from hazards with warning lights on, positioned for rapid departure.",
   "category": "Drive Ambulance"
},
 {
   "id": 111,
   "question": "What law governs occupational safety and health in the Philippines?",
   "options": [
      "No law exists",
      "Republic Act 1",
      "Presidential Decree 442 (Labor Code) and RA 11058",
      "Local ordinance only"
   ],
   "correctAnswer": 2,
   "explanation": "PD 442 (Labor Code) and RA 11058 establish occupational safety and health standards in the Philippines.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 112,
   "question": "What is the primary purpose of PPE in EMS?",
   "options": [
      "To protect the EMS provider from workplace hazards and infectious materials",
      "To look professional only",
      "To identify rank",
      "Fashion"
   ],
   "correctAnswer": 0,
   "explanation": "PPE protects EMS providers from exposure to biological, chemical, and physical hazards.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 113,
   "question": "What is Standard Precautions in EMS?",
   "options": [
      "Treating only HIV patients differently",
      "Treating all body fluids as potentially infectious and using PPE for all patient contact",
      "Wearing gloves only",
      "Ignoring blood"
   ],
   "correctAnswer": 1,
   "explanation": "Standard Precautions means treating ALL body fluids as potentially infectious with appropriate PPE.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 114,
   "question": "What should you do after a needlestick injury?",
   "options": [
      "Ignore it",
      "Continue working",
      "Put a band-aid only",
      "Wash the area, report immediately, and follow post-exposure protocols"
   ],
   "correctAnswer": 3,
   "explanation": "Wash immediately, report the incident, and follow post-exposure prophylaxis protocols.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 115,
   "question": "What is the correct method for removing contaminated gloves?",
   "options": [
      "Bite them off",
      "Cut them off",
      "Pull them off quickly",
      "Peel off using a glove-in-glove technique to avoid skin contact with the outer surface"
   ],
   "correctAnswer": 3,
   "explanation": "Use the glove-in-glove technique: remove one glove inside the other to prevent contamination.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 116,
   "question": "What is the DOLE requirement for incident reporting of workplace injuries?",
   "options": [
      "Not required",
      "Report after one year",
      "Must be reported within 48 hours using the DOLE prescribed form",
      "Report only fatalities"
   ],
   "correctAnswer": 2,
   "explanation": "DOLE requires workplace incidents to be reported within 48 hours using prescribed forms.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 117,
   "question": "What is ergonomics in the context of EMS?",
   "options": [
      "A type of stretcher",
      "Designing work practices and equipment to reduce injury risk, especially during lifting",
      "Equipment brand",
      "A medication"
   ],
   "correctAnswer": 1,
   "explanation": "Ergonomics focuses on safe lifting techniques and equipment design to prevent musculoskeletal injuries.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 118,
   "question": "What is the correct lifting technique for moving heavy patients?",
   "options": [
      "Bend at the waist",
      "Lift with one arm",
      "Bend at the knees, keep the back straight, and lift with the legs",
      "Twist while lifting"
   ],
   "correctAnswer": 2,
   "explanation": "Proper technique: bend knees, keep back straight, lift with leg muscles to prevent back injuries.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 119,
   "question": "What is critical incident stress debriefing (CISD)?",
   "options": [
      "A medical procedure",
      "A training session",
      "A punishment session",
      "A structured group discussion to help EMS providers process traumatic events"
   ],
   "correctAnswer": 3,
   "explanation": "CISD helps emergency providers process psychological effects of traumatic incidents.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 120,
   "question": "What is the minimum PPE required when handling a bleeding patient?",
   "options": [
      "Only a helmet",
      "Only a mask",
      "Gloves at minimum; eye protection and gown recommended for splash risk",
      "No PPE needed"
   ],
   "correctAnswer": 2,
   "explanation": "Gloves are minimum; add eye protection and gown when there is splash risk from bleeding.",
   "category": "Occupational Health and Safety"
},
 {
   "id": 121,
   "question": "What is the most common symptom of an acute myocardial infarction (heart attack)?",
   "options": [
      "Stomach ache",
      "Chest pain or pressure",
      "Ear pain",
      "Headache"
   ],
   "correctAnswer": 1,
   "explanation": "Chest pain or pressure is the hallmark symptom of an acute myocardial infarction.",
   "category": "Medical Emergency"
},
 {
   "id": 122,
   "question": "What is the first medication typically given for chest pain of cardiac origin?",
   "options": [
      "Aspirin (if not contraindicated)",
      "Antihistamine",
      "Insulin",
      "Antibiotics"
   ],
   "correctAnswer": 0,
   "explanation": "Aspirin is given to inhibit platelet aggregation during suspected cardiac chest pain.",
   "category": "Medical Emergency"
},
 {
   "id": 123,
   "question": "What is a stroke?",
   "options": [
      "A heart attack",
      "A disruption of blood flow to the brain causing neurological deficits",
      "A seizure",
      "A broken bone"
   ],
   "correctAnswer": 1,
   "explanation": "A stroke occurs when blood flow to part of the brain is disrupted, causing brain tissue damage.",
   "category": "Medical Emergency"
},
 {
   "id": 124,
   "question": "What is the FAST mnemonic used for stroke identification?",
   "options": [
      "First, Assess, Send, Treat",
      "Find, Assess, Stabilize, Transport",
      "Face drooping, Arm weakness, Speech difficulty, Time to call emergency",
      "Fast, Accurate, Strong, Tough"
   ],
   "correctAnswer": 2,
   "explanation": "FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.",
   "category": "Medical Emergency"
},
 {
   "id": 125,
   "question": "What is the normal blood glucose level for an adult?",
   "options": [
      "200-300 mg/dL",
      "20-40 mg/dL",
      "70-110 mg/dL",
      "500-600 mg/dL"
   ],
   "correctAnswer": 2,
   "explanation": "Normal fasting blood glucose for adults is approximately 70-110 mg/dL.",
   "category": "Medical Emergency"
},
 {
   "id": 126,
   "question": "What is the primary treatment for a patient with severe hypoglycemia who is unconscious?",
   "options": [
      "Give water",
      "Wait for the patient to wake up",
      "Administer IV dextrose or glucagon per protocol",
      "Give oral food"
   ],
   "correctAnswer": 2,
   "explanation": "Unconscious hypoglycemic patients need IV dextrose or glucagon; never give oral food to an unconscious patient.",
   "category": "Medical Emergency"
},
 {
   "id": 127,
   "question": "What is anaphylaxis?",
   "options": [
      "A heart condition",
      "A severe, potentially life-threatening allergic reaction",
      "A mild allergic reaction",
      "A type of cancer"
   ],
   "correctAnswer": 1,
   "explanation": "Anaphylaxis is a severe allergic reaction that can cause airway obstruction and shock.",
   "category": "Medical Emergency"
},
 {
   "id": 128,
   "question": "What is the first-line treatment for anaphylaxis?",
   "options": [
      "Ointment",
      "Aspirin",
      "Epinephrine auto-injector (EpiPen)",
      "Antibiotics"
   ],
   "correctAnswer": 2,
   "explanation": "Epinephrine is the first-line treatment for anaphylaxis to reverse airway obstruction and hypotension.",
   "category": "Medical Emergency"
},
 {
   "id": 129,
   "question": "What is the hallmark sign of a tension pneumothorax?",
   "options": [
      "Absent breath sounds on the affected side with tracheal deviation away",
      "Hiccups",
      "Cough",
      "Sneezing"
   ],
   "correctAnswer": 0,
   "explanation": "Absent breath sounds on the affected side with tracheal deviation are classic signs of tension pneumothorax.",
   "category": "Medical Emergency"
},
 {
   "id": 130,
   "question": "What is the correct position for a patient with suspected hypovolemic shock?",
   "options": [
      "Standing",
      "Prone",
      "Sitting upright",
      "Supine with legs elevated"
   ],
   "correctAnswer": 3,
   "explanation": "Supine with legs elevated (modified Trendelenburg) improves venous return in hypovolemic shock.",
   "category": "Medical Emergency"
},
 {
   "id": 131,
   "question": "What is a seizure?",
   "options": [
      "An abnormal electrical discharge in the brain causing involuntary movements",
      "A fainting episode",
      "A heart attack",
      "A breathing problem"
   ],
   "correctAnswer": 0,
   "explanation": "Seizures are caused by abnormal brain electrical activity resulting in involuntary movements or altered consciousness.",
   "category": "Medical Emergency"
},
 {
   "id": 132,
   "question": "What should you NOT do during a seizure?",
   "options": [
      "Time the seizure",
      "Protect the patient from injury",
      "Clear the area of hazards",
      "Place objects in the patient's mouth"
   ],
   "correctAnswer": 3,
   "explanation": "Never place objects in a seizing patient's mouth; it can cause injury or airway obstruction.",
   "category": "Medical Emergency"
},
 {
   "id": 133,
   "question": "What is COPD?",
   "options": [
      "Chronic Obstructive Pulmonary Disease - a progressive lung disease",
      "A skin condition",
      "A bone disease",
      "A heart disease"
   ],
   "correctAnswer": 0,
   "explanation": "COPD is a progressive lung disease that includes emphysema and chronic bronchitis, causing airflow obstruction.",
   "category": "Medical Emergency"
},
 {
   "id": 134,
   "question": "What is the appropriate oxygen delivery for a COPD patient?",
   "options": [
      "No oxygen ever",
      "High-flow 15 L/min",
      "100% non-rebreather",
      "Low-flow oxygen via nasal cannula (2-4 L/min)"
   ],
   "correctAnswer": 3,
   "explanation": "COPD patients require low-flow oxygen to avoid suppressing their hypoxic respiratory drive.",
   "category": "Medical Emergency"
},
 {
   "id": 135,
   "question": "What is the most common cause of abdominal pain in elderly patients that requires immediate attention?",
   "options": [
      "Abdominal aortic aneurysm",
      "Indigestion",
      "Constipation",
      "Gas"
   ],
   "correctAnswer": 0,
   "explanation": "Abdominal aortic aneurysm is a life-threatening cause of abdominal pain in elderly patients.",
   "category": "Medical Emergency"
},
 {
   "id": 136,
   "question": "What is pulmonary edema?",
   "options": [
      "Fluid in the brain",
      "Fluid accumulation in the lungs",
      "Fluid in the stomach",
      "Fluid in the joints"
   ],
   "correctAnswer": 1,
   "explanation": "Pulmonary edema is fluid accumulation in the lungs, often caused by heart failure.",
   "category": "Medical Emergency"
},
 {
   "id": 137,
   "question": "What position helps a patient with pulmonary edema?",
   "options": [
      "Supine flat",
      "Sitting upright with legs dangling",
      "Prone",
      "Trendelenburg"
   ],
   "correctAnswer": 1,
   "explanation": "Sitting upright with legs dangling reduces venous return and eases breathing in pulmonary edema.",
   "category": "Medical Emergency"
},
 {
   "id": 138,
   "question": "What is a transient ischemic attack (TIA)?",
   "options": [
      "A migraine",
      "A permanent stroke",
      "A temporary disruption of blood flow to the brain with symptoms resolving within 24 hours",
      "A seizure"
   ],
   "correctAnswer": 2,
   "explanation": "TIA is a temporary stroke-like episode that resolves within 24 hours but warns of future stroke risk.",
   "category": "Medical Emergency"
},
 {
   "id": 139,
   "question": "What is the most important pre-hospital intervention for a suspected stroke patient?",
   "options": [
      "Give aspirin",
      "Give fluids by mouth",
      "Apply a tourniquet",
      "Rapid transport to a stroke center"
   ],
   "correctAnswer": 3,
   "explanation": "Time is critical; rapid transport to a stroke center allows for timely thrombolytic therapy.",
   "category": "Medical Emergency"
},
 {
   "id": 140,
   "question": "What is diabetic ketoacidosis (DKA)?",
   "options": [
      "A fracture",
      "A serious complication of diabetes with high blood sugar, ketones, and acidosis",
      "Low blood sugar",
      "A type of allergy"
   ],
   "correctAnswer": 1,
   "explanation": "DKA is a life-threatening complication of diabetes characterized by hyperglycemia, ketosis, and metabolic acidosis.",
   "category": "Medical Emergency"
},
 {
   "id": 141,
   "question": "What is the first step in controlling external bleeding?",
   "options": [
      "Apply direct pressure to the wound",
      "Apply a tourniquet immediately",
      "Apply ice",
      "Elevate the area only"
   ],
   "correctAnswer": 0,
   "explanation": "Direct pressure is the first and most effective method to control external bleeding.",
   "category": "First Aid"
},
 {
   "id": 142,
   "question": "When should a tourniquet be applied?",
   "options": [
      "For bruises",
      "For any minor cut",
      "For nosebleeds",
      "When direct pressure fails to control life-threatening extremity hemorrhage"
   ],
   "correctAnswer": 3,
   "explanation": "Tourniquets are used only when direct pressure cannot control severe, life-threatening extremity bleeding.",
   "category": "First Aid"
},
 {
   "id": 143,
   "question": "What is the correct first aid for a suspected fracture?",
   "options": [
      "Immobilize the area in the position found and pad around it",
      "Try to realign the bone",
      "Massage the area",
      "Apply heat"
   ],
   "correctAnswer": 0,
   "explanation": "Immobilize the fracture in the position found without attempting realignment; pad and splint.",
   "category": "First Aid"
},
 {
   "id": 144,
   "question": "What is the appropriate first aid for a thermal burn?",
   "options": [
      "Cool the burn with clean, cool running water for at least 10-20 minutes",
      "Pop blisters",
      "Apply butter",
      "Apply ice directly"
   ],
   "correctAnswer": 0,
   "explanation": "Cool the burn with running water for 10-20 minutes; never apply ice, butter, or pop blisters.",
   "category": "First Aid"
},
 {
   "id": 145,
   "question": "How should a nosebleed be managed?",
   "options": [
      "Lie flat",
      "Blow the nose hard",
      "Sit upright, lean slightly forward, and pinch the soft part of the nose",
      "Tilt the head back"
   ],
   "correctAnswer": 2,
   "explanation": "Sit upright, lean forward, pinch the soft part of the nose for 10-15 minutes to stop bleeding.",
   "category": "First Aid"
},
 {
   "id": 146,
   "question": "What is the first aid for a patient with a foreign body in the eye?",
   "options": [
      "Rub the eye",
      "Do not remove embedded objects; flush with water for loose particles",
      "Remove with fingers",
      "Apply pressure"
   ],
   "correctAnswer": 1,
   "explanation": "Do not remove embedded objects; flush with clean water only for loose, superficial particles.",
   "category": "First Aid"
},
 {
   "id": 147,
   "question": "What is the correct treatment for a snake bite?",
   "options": [
      "Apply ice directly",
      "Keep the patient calm and still, immobilize the limb, and transport immediately",
      "Cut the wound and suck out venom",
      "Apply a tourniquet tightly"
   ],
   "correctAnswer": 1,
   "explanation": "Keep the patient calm, immobilize the bitten limb at heart level, and transport immediately.",
   "category": "First Aid"
},
 {
   "id": 148,
   "question": "What is the first aid for a patient experiencing heat stroke?",
   "options": [
      "Exercise more",
      "Move to a cool area, remove excess clothing, and cool the body rapidly",
      "Give hot drinks",
      "Wrap in blankets"
   ],
   "correctAnswer": 1,
   "explanation": "Heat stroke is life-threatening; move to a cool place, remove clothing, and cool the body rapidly.",
   "category": "First Aid"
},
 {
   "id": 149,
   "question": "What is the first aid for hypothermia?",
   "options": [
      "Move to a warm area, remove wet clothing, and warm the body gradually",
      "Rub the skin vigorously",
      "Give alcohol",
      "Apply direct heat to skin"
   ],
   "correctAnswer": 0,
   "explanation": "Move to warmth, remove wet clothing, and warm gradually with blankets; avoid rapid reheating.",
   "category": "First Aid"
},
 {
   "id": 150,
   "question": "How should an amputated body part be preserved?",
   "options": [
      "Wrap in sterile dressing, place in a sealed bag, and put that bag on ice",
      "Throw it away",
      "Place directly on ice",
      "Put it in hot water"
   ],
   "correctAnswer": 0,
   "explanation": "Wrap in sterile dressing, seal in a bag, then place that bag on ice for transport with the patient.",
   "category": "First Aid"
},
 {
   "id": 151,
   "question": "What is the Heimlich maneuver used for?",
   "options": [
      "Choking due to foreign body airway obstruction",
      "Fracture treatment",
      "Bleeding control",
      "Cardiac arrest"
   ],
   "correctAnswer": 0,
   "explanation": "The Heimlich maneuver (abdominal thrusts) is used to clear foreign body airway obstruction.",
   "category": "First Aid"
},
 {
   "id": 152,
   "question": "What is the first aid for a chemical burn?",
   "options": [
      "Ignore it",
      "Flush with large amounts of water for at least 20 minutes",
      "Apply oil",
      "Apply bandage immediately"
   ],
   "correctAnswer": 1,
   "explanation": "Flush chemical burns with copious amounts of water for at least 20 minutes to remove the chemical.",
   "category": "First Aid"
},
 {
   "id": 153,
   "question": "What is the rule of nines used for?",
   "options": [
      "Estimating the percentage of body surface area burned",
      "Counting breaths",
      "Counting heartbeats",
      "Measuring blood pressure"
   ],
   "correctAnswer": 0,
   "explanation": "The rule of nines estimates burn surface area to guide fluid resuscitation and treatment decisions.",
   "category": "First Aid"
},
 {
   "id": 154,
   "question": "What is the first aid for an insect sting?",
   "options": [
      "Apply heat",
      "Ignore it",
      "Squeeze the stinger",
      "Remove the stinger by scraping, clean the area, apply cold compress"
   ],
   "correctAnswer": 3,
   "explanation": "Scrape off the stinger, clean the area, and apply a cold compress to reduce swelling.",
   "category": "First Aid"
},
 {
   "id": 155,
   "question": "What should you do for a patient with a suspected spinal injury?",
   "options": [
      "Massage the back",
      "Stretch the neck",
      "Immobilize the spine, minimize movement, and use a backboard for transport",
      "Let the patient walk"
   ],
   "correctAnswer": 2,
   "explanation": "Immobilize the cervical spine, minimize all movement, and use a backboard for safe transport.",
   "category": "First Aid"
},
 {
   "id": 156,
   "question": "What is the first aid for a puncture wound?",
   "options": [
      "Remove the impaled object",
      "Push the object through",
      "Apply heat",
      "Do not remove impaled objects; stabilize them and control bleeding around the wound"
   ],
   "correctAnswer": 3,
   "explanation": "Never remove impaled objects as they may be tamponading bleeding; stabilize and transport.",
   "category": "First Aid"
},
 {
   "id": 157,
   "question": "What is the correct first aid for a choking infant?",
   "options": [
      "Give water",
      "Perform back blows and chest thrusts",
      "Perform abdominal thrusts",
      "Shake the infant"
   ],
   "correctAnswer": 1,
   "explanation": "For choking infants, use 5 back blows followed by 5 chest thrusts; never use abdominal thrusts.",
   "category": "First Aid"
},
 {
   "id": 158,
   "question": "What is the appropriate first aid for a sprain?",
   "options": [
      "Walk it off",
      "RICE: Rest, Ice, Compression, Elevation",
      "Apply heat immediately",
      "Massage vigorously"
   ],
   "correctAnswer": 1,
   "explanation": "RICE (Rest, Ice, Compression, Elevation) is the standard first aid treatment for sprains.",
   "category": "First Aid"
},
 {
   "id": 159,
   "question": "What is the first step when approaching a poisoning victim?",
   "options": [
      "Ensure scene safety and identify the substance if possible",
      "Give milk",
      "Induce vomiting",
      "Give salt water"
   ],
   "correctAnswer": 0,
   "explanation": "Ensure scene safety first, then identify the substance; never induce vomiting without medical direction.",
   "category": "First Aid"
},
 {
   "id": 160,
   "question": "What is the first aid for an electrical burn patient?",
   "options": [
      "Ignore the patient",
      "Pour water on electrical equipment",
      "Ensure the power source is disconnected, then assess and treat the patient",
      "Touch the patient immediately"
   ],
   "correctAnswer": 2,
   "explanation": "Disconnect the power source first to ensure safety, then assess and treat the patient.",
   "category": "First Aid"
},
 {
   "id": 161,
   "question": "What is the main purpose of chest compressions?",
   "options": [
      "To warm the patient",
      "To move blood to vital organs",
      "To reduce bleeding",
      "To wake the patient"
   ],
   "correctAnswer": 1,
   "explanation": "Compressions help circulate blood to the brain and heart.",
   "category": "BLS/CPR"
},
 {
   "id": 162,
   "question": "Where should hands be placed for adult chest compressions?",
   "options": [
      "On the upper abdomen",
      "On the left ribs",
      "Center of the chest",
      "On the neck"
   ],
   "correctAnswer": 2,
   "explanation": "Place hands on the center of the chest.",
   "category": "BLS/CPR"
},
 {
   "id": 163,
   "question": "What is the recommended adult CPR compression rate?",
   "options": [
      "40 to 60 per minute",
      "60 to 80 per minute",
      "100 to 120 per minute",
      "140 to 160 per minute"
   ],
   "correctAnswer": 2,
   "explanation": "Adult CPR uses 100 to 120 compressions per minute.",
   "category": "BLS/CPR"
},
 {
   "id": 164,
   "question": "How deep should adult chest compressions be?",
   "options": [
      "About 1 cm",
      "About 2 cm",
      "About 5 to 6 cm",
      "About 10 cm"
   ],
   "correctAnswer": 2,
   "explanation": "Compress the adult chest about 5 to 6 cm.",
   "category": "BLS/CPR"
},
 {
   "id": 165,
   "question": "What should be done when an AED arrives?",
   "options": [
      "Ignore it until ambulance arrives",
      "Turn it on and follow prompts",
      "Use it only after 30 minutes",
      "Place pads on clothing"
   ],
   "correctAnswer": 1,
   "explanation": "Switch on the AED and follow voice or visual prompts.",
   "category": "BLS/CPR"
},
 {
   "id": 166,
   "question": "What must everyone do before AED shock is delivered?",
   "options": [
      "Touch the patient",
      "Give water",
      "Stand clear",
      "Remove all pads"
   ],
   "correctAnswer": 2,
   "explanation": "No one should touch the patient during shock.",
   "category": "BLS/CPR"
},
 {
   "id": 167,
   "question": "What is the correct CPR cycle for one rescuer adult CPR?",
   "options": [
      "15 compressions and 1 breath",
      "30 compressions and 2 breaths",
      "5 compressions and 5 breaths",
      "10 compressions only"
   ],
   "correctAnswer": 1,
   "explanation": "Adult CPR commonly uses 30 compressions and 2 breaths.",
   "category": "BLS/CPR"
},
 {
   "id": 168,
   "question": "What should you do if the patient starts breathing normally during CPR?",
   "options": [
      "Continue compressions strongly",
      "Place in recovery position if no spinal concern",
      "Give food",
      "Remove AED pads immediately"
   ],
   "correctAnswer": 1,
   "explanation": "If breathing returns, monitor and place safely if appropriate.",
   "category": "BLS/CPR"
},
 {
   "id": 169,
   "question": "Why should interruptions in compressions be minimized?",
   "options": [
      "To save battery",
      "To keep blood circulation going",
      "To reduce noise",
      "To make transport faster"
   ],
   "correctAnswer": 1,
   "explanation": "Frequent pauses reduce blood flow to vital organs.",
   "category": "BLS/CPR"
},
 {
   "id": 170,
   "question": "What is the purpose of rescue breaths?",
   "options": [
      "To provide oxygen",
      "To stop bleeding",
      "To cool the body",
      "To check blood pressure"
   ],
   "correctAnswer": 0,
   "explanation": "Rescue breaths deliver air to the lungs.",
   "category": "BLS/CPR"
},
 {
   "id": 171,
   "question": "What should be done if you are not trained to give breaths?",
   "options": [
      "Do nothing",
      "Give hands-only CPR",
      "Wait for family",
      "Move the patient upright"
   ],
   "correctAnswer": 1,
   "explanation": "Hands-only CPR is better than no CPR.",
   "category": "BLS/CPR"
},
 {
   "id": 172,
   "question": "Where are AED pads placed on an adult?",
   "options": [
      "Both pads on the back",
      "Upper right chest and lower left side",
      "Both pads on the legs",
      "Over thick clothing only"
   ],
   "correctAnswer": 1,
   "explanation": "Pads are placed upper right chest and lower left side.",
   "category": "BLS/CPR"
},
 {
   "id": 173,
   "question": "What should you avoid when using an AED?",
   "options": [
      "Drying a wet chest",
      "Following AED prompts",
      "Touching the patient during analysis",
      "Calling for help"
   ],
   "correctAnswer": 2,
   "explanation": "Do not touch the patient while AED analyzes rhythm.",
   "category": "BLS/CPR"
},
 {
   "id": 174,
   "question": "What is the correct action if the chest is wet before AED pad placement?",
   "options": [
      "Place pads anyway",
      "Dry the chest first",
      "Apply lotion",
      "Cover with blanket only"
   ],
   "correctAnswer": 1,
   "explanation": "A dry chest helps pads stick and improves safety.",
   "category": "BLS/CPR"
},
 {
   "id": 175,
   "question": "What should be done if the patient has a visible medication patch where a pad goes?",
   "options": [
      "Place pad over it",
      "Remove patch with gloves and wipe area",
      "Cut the wire",
      "Do not use AED"
   ],
   "correctAnswer": 1,
   "explanation": "Remove the patch with gloves before pad placement.",
   "category": "BLS/CPR"
},
 {
   "id": 176,
   "question": "When should CPR be stopped?",
   "options": [
      "When rescuer is tired only",
      "When trained help takes over or patient recovers",
      "After one minute always",
      "When bystanders arrive"
   ],
   "correctAnswer": 1,
   "explanation": "Stop only when help takes over, patient recovers, or it is unsafe.",
   "category": "BLS/CPR"
},
 {
   "id": 177,
   "question": "What is the main goal of Basic Life Support?",
   "options": [
      "To replace hospital care",
      "To support breathing and circulation",
      "To diagnose all diseases",
      "To give medicines first"
   ],
   "correctAnswer": 1,
   "explanation": "BLS keeps oxygen and blood flow until advanced care arrives.",
   "category": "BLS/CPR"
},
 {
   "id": 178,
   "question": "What is the correct compression-to-ventilation ratio",
   "options": [
      "15:02",
      "30:02:00",
      "30:01:00",
      "50:02:00"
   ],
   "correctAnswer": 1,
   "explanation": "The standard adult CPR ratio for a single",
   "category": "BLS/CPR"
},
 {
   "id": 179,
   "question": "When operating an AED, after the device analyzes",
   "options": [
      "Immediately press the",
      "Resume chest",
      "Ensure no one is",
      "Remove the AED"
   ],
   "correctAnswer": 2,
   "explanation": "Before delivering a shock, the rescuer",
   "category": "BLS/CPR"
},
 {
   "id": 180,
   "question": "What is the recommended depth of chest",
   "options": [
      "1 to 2 inches",
      "At least 2 inches (5",
      "3 to 4 inches",
      "0.5 inches"
   ],
   "correctAnswer": 1,
   "explanation": "AHA guidelines recommend at least 2",
   "category": "BLS/CPR"
},
 {
   "id": 181,
   "question": "What is the correct compression rate for CPR?",
   "options": [
      "60-80 compressions",
      "80-100 compressions",
      "100-120",
      "140-160"
   ],
   "correctAnswer": 2,
   "explanation": "The recommended compression rate is",
   "category": "BLS/CPR"
},
 {
   "id": 182,
   "question": "What is the compression-to-ventilation ratio for",
   "options": [
      "15:02",
      "30:02:00",
      "30:01:00",
      "50:02:00"
   ],
   "correctAnswer": 1,
   "explanation": "For two-rescuer adult CPR, the ratio",
   "category": "BLS/CPR"
},
 {
   "id": 183,
   "question": "What is the compression-to-ventilation ratio for",
   "options": [
      "30:02:00",
      "15:02",
      "30:01:00",
      "5:01"
   ],
   "correctAnswer": 1,
   "explanation": "For two-rescuer CPR on a child, the",
   "category": "BLS/CPR"
},
 {
   "id": 184,
   "question": "During CPR, what is the maximum allowable",
   "options": [
      "30 seconds",
      "20 seconds",
      "10 seconds",
      "60 seconds"
   ],
   "correctAnswer": 2,
   "explanation": "Interruptions to chest compressions",
   "category": "BLS/CPR"
},
 {
   "id": 185,
   "question": "After placing AED pads on a patient, what is the",
   "options": [
      "Delivers a shock",
      "Analyzes the heart",
      "Charges the capacitor",
      "Records the ECG"
   ],
   "correctAnswer": 1,
   "explanation": "Once pads are placed, the AED",
   "category": "BLS/CPR"
},
 {
   "id": 186,
   "question": "Which heart rhythm is most commonly associated",
   "options": [
      "Asystole",
      "Ventricular fibrillation",
      "Pulseless electrical",
      "Sinus bradycardia"
   ],
   "correctAnswer": 1,
   "explanation": "Ventricular fibrillation (VF) is the most",
   "category": "BLS/CPR"
},
 {
   "id": 187,
   "question": "What is the correct hand placement for chest",
   "options": [
      "Upper third of the",
      "Lower half of the",
      "Over the xiphoid",
      "Left side of the chest"
   ],
   "correctAnswer": 1,
   "explanation": "Compressions should be performed on",
   "category": "BLS/CPR"
},
 {
   "id": 188,
   "question": "What should the rescuer allow during chest",
   "options": [
      "Full chest recoil",
      "Partial chest recoil",
      "No recoil is needed",
      "Recoil only every 5"
   ],
   "correctAnswer": 0,
   "explanation": "Full chest recoil between compressions",
   "category": "BLS/CPR"
},
 {
   "id": 189,
   "question": "For an infant, what technique is used for chest",
   "options": [
      "Two hands",
      "One hand",
      "Two fingers (thumb",
      "Heel of one hand"
   ],
   "correctAnswer": 2,
   "explanation": "For infant CPR, two fingers are placed on",
   "category": "BLS/CPR"
},
 {
   "id": 190,
   "question": "When should the AED be used on a pediatric",
   "options": [
      "Only if the child is",
      "When pediatric pads",
      "Never on pediatric",
      "Only with a physician"
   ],
   "correctAnswer": 1,
   "explanation": "AEDs can be used on pediatric patients",
   "category": "BLS/CPR"
},
 {
   "id": 191,
   "question": "What is the first action when checking for breathing and pulse in an unresponsive patient?",
   "options": [
      "Check for breathing only, then check pulse separately",
      "Simultaneously check for breathing and pulse for no more than 10 seconds",
      "Check breathing only",
      "Check pupils first"
   ],
   "correctAnswer": 1,
   "explanation": "Current AHA guidelines recommend simultaneously checking for breathing and pulse for no more than 10 seconds to minimize delays in starting CPR.",
   "category": "BLS/CPR"
},
 {
   "id": 192,
   "question": "How long should the rescuer take to check for",
   "options": [
      "At least 30 seconds",
      "5-10 seconds",
      "1-2 seconds",
      "60 seconds"
   ],
   "correctAnswer": 1,
   "explanation": "Assessment of breathing and pulse",
   "category": "BLS/CPR"
},
 {
   "id": 193,
   "question": "What is the appropriate ventilation volume for an",
   "options": [
      "500-600 mL per",
      "200-300 mL per",
      "1000-1200 mL per",
      "100 mL per breath"
   ],
   "correctAnswer": 0,
   "explanation": "Each breath should be about 500-600 mL",
   "category": "BLS/CPR"
},
 {
   "id": 194,
   "question": "What complication can result from excessive",
   "options": [
      "Improved",
      "Gastric inflation and",
      "Increased cardiac",
      "Better chest recoil"
   ],
   "correctAnswer": 1,
   "explanation": "Excessive ventilation can cause gastric",
   "category": "BLS/CPR"
},
 {
   "id": 195,
   "question": "What does the 'CAB' sequence in BLS stand for?",
   "options": [
      "Circulation, Airway,",
      "Compress, Assess,",
      "Check Airway,",
      "Cardiac, Assessment,"
   ],
   "correctAnswer": 0,
   "explanation": "CAB stands for Circulation, Airway,",
   "category": "BLS/CPR"
},
 {
   "id": 196,
   "question": "If a patient is unresponsive but breathing normally",
   "options": [
      "Begin chest",
      "Place the patient in",
      "Apply the AED",
      "Perform rescue"
   ],
   "correctAnswer": 1,
   "explanation": "An unresponsive patient with normal",
   "category": "BLS/CPR"
},
 {
   "id": 197,
   "question": "After an AED delivers a shock, what is the",
   "options": [
      "Check for a pulse",
      "Resume chest",
      "Remove the AED",
      "Wait for the AED to"
   ],
   "correctAnswer": 1,
   "explanation": "After a shock is delivered, resume chest",
   "category": "BLS/CPR"
},
 {
   "id": 198,
   "question": "What is the correct jaw-thrust maneuver technique",
   "options": [
      "Tilt the head back",
      "Place fingers behind",
      "Push down on the",
      "Turn the head to the"
   ],
   "correctAnswer": 1,
   "explanation": "The jaw-thrust maneuver involves placing",
   "category": "BLS/CPR"
},
 {
   "id": 199,
   "question": "What device is used to provide supplemental",
   "options": [
      "Nasopharyngeal",
      "Bag-valve-mask",
      "Oropharyngeal airway",
      "Chest decompression"
   ],
   "correctAnswer": 1,
   "explanation": "A bag-valve-mask (BVM) is the primary",
   "category": "BLS/CPR"
},
 {
   "id": 200,
   "question": "When using a Bag-Valve-Mask (BVM), what is the",
   "options": [
      "1-2 liters per minute",
      "10-15 liters per",
      "5-6 liters per minute",
      "25-30 liters per"
   ],
   "correctAnswer": 1,
   "explanation": "The BVM should be connected to",
   "category": "BLS/CPR"
},
 {
   "id": 201,
   "question": "Which of the following is a non-shockable rhythm?",
   "options": [
      "Ventricular fibrillation",
      "Ventricular",
      "Pulseless electrical",
      "Both A and B"
   ],
   "correctAnswer": 2,
   "explanation": "Pulseless electrical activity (PEA) is a",
   "category": "BLS/CPR"
},
 {
   "id": 202,
   "question": "What is the purpose of the head-tilt/chin-lift",
   "options": [
      "To check for injuries",
      "To open the airway of",
      "To perform chest",
      "To deliver rescue"
   ],
   "correctAnswer": 1,
   "explanation": "The head-tilt/chin-lift maneuver opens the",
   "category": "BLS/CPR"
},
 {
   "id": 203,
   "question": "What is the primary purpose of inspecting life",
   "options": [
      "To comply with",
      "To ensure all devices",
      "To determine the",
      "To assign equipment"
   ],
   "correctAnswer": 1,
   "explanation": "Equipment inspection ensures that all life",
   "category": "BLS/CPR"
},
 {
   "id": 204,
   "question": "What should an EMS provider do if a portable",
   "options": [
      "Ignore it and proceed",
      "Document the failure",
      "Wait until end of shift",
      "Use it anyway and"
   ],
   "correctAnswer": 1,
   "explanation": "Any equipment malfunction must be",
   "category": "BLS/CPR"
},
 {
   "id": 205,
   "question": "When should the rescuer switch from compression-only CPR to conventional CPR (with rescue breaths)?",
   "options": [
      "After 2 minutes of compressions",
      "When an AED becomes available",
      "When a second rescuer arrives and can provide effective rescue breaths",
      "Never switch from compression-only CPR"
   ],
   "correctAnswer": 2,
   "explanation": "When a second trained rescuer arrives who can provide effective rescue breaths, switch from compression-only CPR to conventional CPR with a 30:2 ratio.",
   "category": "BLS/CPR"
},
 {
   "id": 206,
   "question": "How should oxygen cylinders be stored?",
   "options": [
      "Lying flat on the floor",
      "Upright and secured",
      "Near heat sources for",
      "In direct sunlight"
   ],
   "correctAnswer": 1,
   "explanation": "Oxygen cylinders must be stored upright",
   "category": "BLS/CPR"
},
 {
   "id": 207,
   "question": "What is the function of a pulse oximeter?",
   "options": [
      "Measures blood",
      "Measures oxygen",
      "Measures blood",
      "Measures carbon"
   ],
   "correctAnswer": 1,
   "explanation": "A pulse oximeter non-invasively",
   "category": "BLS/CPR"
},
 {
   "id": 208,
   "question": "What is the normal SpO2 reading for a healthy",
   "options": [
      "80-90%",
      "94-100%",
      "70-80%",
      "50-60%"
   ],
   "correctAnswer": 1,
   "explanation": "A normal SpO2 reading for a healthy adult",
   "category": "BLS/CPR"
},
 {
   "id": 209,
   "question": "What component of a Bag-Valve-Mask prevents",
   "options": [
      "The reservoir bag",
      "The one-way valve",
      "The oxygen tubing",
      "The pop-off valve"
   ],
   "correctAnswer": 1,
   "explanation": "The one-way valve in the BVM directs",
   "category": "BLS/CPR"
},
 {
   "id": 210,
   "question": "What is the purpose of the pop-off valve on a",
   "options": [
      "To increase",
      "To release excessive",
      "To deliver more",
      "To keep the mask"
   ],
   "correctAnswer": 1,
   "explanation": "The pop-off (pressure relief) valve vents",
   "category": "BLS/CPR"
},
 {
   "id": 211,
   "question": "Which suction catheter is most appropriate for",
   "options": [
      "6 Fr",
      "8 Fr",
      "14 Fr",
      "4 Fr"
   ],
   "correctAnswer": 2,
   "explanation": "A 14 Fr rigid suction catheter (Yankauer)",
   "category": "BLS/CPR"
},
 {
   "id": 212,
   "question": "What should be checked on an oxygen regulator",
   "options": [
      "The color of the",
      "The pressure gauge",
      "The manufacturing",
      "The serial number"
   ],
   "correctAnswer": 1,
   "explanation": "The pressure gauge must show adequate",
   "category": "BLS/CPR"
},
 {
   "id": 213,
   "question": "What is the purpose of a non-rebreather mask?",
   "options": [
      "To deliver low-flow",
      "To deliver high-",
      "To deliver medication",
      "To measure oxygen"
   ],
   "correctAnswer": 1,
   "explanation": "A non-rebreather mask with a reservoir",
   "category": "BLS/CPR"
},
 {
   "id": 214,
   "question": "At what flow rate should a nasal cannula typically",
   "options": [
      "10-15 L/min",
      "1-6 L/min",
      "8-10 L/min",
      "15-20 L/min"
   ],
   "correctAnswer": 1,
   "explanation": "A nasal cannula is typically set at 1-6",
   "category": "BLS/CPR"
},
 {
   "id": 215,
   "question": "What percentage of oxygen does a simple face",
   "options": [
      "24-28%",
      "40-60%",
      "80-90%",
      "100%"
   ],
   "correctAnswer": 1,
   "explanation": "A simple face mask at 6-10 L/min delivers",
   "category": "BLS/CPR"
},
 {
   "id": 216,
   "question": "What is the minimum number of AED pads that",
   "options": [
      "One set",
      "Two sets (adult and",
      "Five sets",
      "None required"
   ],
   "correctAnswer": 1,
   "explanation": "Ambulances should carry at least two sets",
   "category": "BLS/CPR"
},
 {
   "id": 217,
   "question": "What is the purpose of a cervical collar in the EMS",
   "options": [
      "To treat neck pain",
      "To immobilize the",
      "To support the head",
      "To keep the patient"
   ],
   "correctAnswer": 1,
   "explanation": "A cervical collar immobilizes the cervical",
   "category": "BLS/CPR"
},
 {
   "id": 218,
   "question": "What is the function of a Kendrick Extrication",
   "options": [
      "To transport a",
      "To immobilize a",
      "To deliver oxygen",
      "To measure vital"
   ],
   "correctAnswer": 1,
   "explanation": "The KED is a vest-type device designed",
   "category": "BLS/CPR"
},
 {
   "id": 219,
   "question": "How often should ambulance equipment be",
   "options": [
      "Weekly only",
      "At the beginning of",
      "Monthly only",
      "Only after each call"
   ],
   "correctAnswer": 1,
   "explanation": "Equipment must be checked at the",
   "category": "BLS/CPR"
},
 {
   "id": 220,
   "question": "What does the acronym 'PASS' stand for when",
   "options": [
      "Pull, Aim, Squeeze,",
      "Point, Activate,",
      "Pull, Adjust, Squeeze,",
      "Push, Aim, Squeeze,"
   ],
   "correctAnswer": 0,
   "explanation": "PASS stands for Pull the pin, Aim at the",
   "category": "BLS/CPR"
},
 {
   "id": 221,
   "question": "What is the purpose of a cervical immobilization",
   "options": [
      "To secure the",
      "To prevent lateral",
      "To elevate the",
      "To measure cervical"
   ],
   "correctAnswer": 1,
   "explanation": "A CID (head immobilizer) prevents lateral",
   "category": "BLS/CPR"
},
 {
   "id": 222,
   "question": "Which equipment documentation must be",
   "options": [
      "Only purchase",
      "Equipment check",
      "Only the",
      "No documentation is"
   ],
   "correctAnswer": 1,
   "explanation": "EMS providers must maintain equipment",
   "category": "BLS/CPR"
},
 {
   "id": 223,
   "question": "What is the first priority when arriving at a motor",
   "options": [
      "Immediately remove",
      "Establish scene",
      "Administer oxygen to",
      "Contact the receiving"
   ],
   "correctAnswer": 1,
   "explanation": "Scene safety is always the first priority.",
   "category": "Trauma"
},
 {
   "id": 224,
   "question": "Which device is most appropriate for cervical spine",
   "options": [
      "Soft cervical collar",
      "Rigid cervical collar",
      "Cervical traction",
      "Pelvic binder"
   ],
   "correctAnswer": 1,
   "explanation": "A rigid cervical collar provides necessary",
   "category": "Trauma"
},
 {
   "id": 225,
   "question": "What is the purpose of the rapid extrication",
   "options": [
      "To quickly move a",
      "To save time on all",
      "To avoid using",
      "To practice teamwork"
   ],
   "correctAnswer": 0,
   "explanation": "Rapid extrication is used when the",
   "category": "Trauma"
},
 {
   "id": 226,
   "question": "When should a patient be extricated using a long",
   "options": [
      "Only for patients with",
      "When spinal injury is",
      "For all patients",
      "Only for unconscious"
   ],
   "correctAnswer": 1,
   "explanation": "A long spine board is used for extrication",
   "category": "Trauma"
},
 {
   "id": 227,
   "question": "What is the correct technique for log-rolling a",
   "options": [
      "One rescuer pulls the",
      "Multiple rescuers",
      "The patient rolls",
      "Only the torso is"
   ],
   "correctAnswer": 1,
   "explanation": "Log-rolling requires multiple rescuers to",
   "category": "Trauma"
},
 {
   "id": 228,
   "question": "What is the minimum number of rescuers",
   "options": [
      "One",
      "Two",
      "Three",
      "Five"
   ],
   "correctAnswer": 2,
   "explanation": "At least three rescuers are needed: one at",
   "category": "Trauma"
},
 {
   "id": 229,
   "question": "What hazard should be assessed first at a vehicle",
   "options": [
      "Vehicle color",
      "Traffic and oncoming",
      "Patient's insurance",
      "Weather forecast"
   ],
   "correctAnswer": 1,
   "explanation": "Traffic and oncoming vehicles pose an",
   "category": "Trauma"
},
 {
   "id": 230,
   "question": "What does the term 'golden hour' refer to in trauma",
   "options": [
      "The first 60 minutes",
      "The shift change",
      "The time of day with",
      "The duration of"
   ],
   "correctAnswer": 0,
   "explanation": "The golden hour refers to the critical first",
   "category": "Trauma"
},
 {
   "id": 231,
   "question": "Which of the following is a late sign of hemorrhagic shock?",
   "options": [
      "Anxiety and restlessness",
      "Hypotension",
      "Tachycardia",
      "Pale, cool, clammy skin"
   ],
   "correctAnswer": 1,
   "explanation": "Hypotension is a late sign of hemorrhagic shock. The body compensates initially with tachycardia and vasoconstriction, maintaining blood pressure until significant blood volume is lost.",
   "category": "Trauma"
},
 {
   "id": 232,
   "question": "What type of vehicle hazard requires immediate",
   "options": [
      "A flat tire",
      "Leaking fuel with risk",
      "A broken windshield",
      "An open door"
   ],
   "correctAnswer": 1,
   "explanation": "Leaking fuel with a risk of fire is a life-",
   "category": "Trauma"
},
 {
   "id": 233,
   "question": "What is the purpose of stabilizing a vehicle before",
   "options": [
      "To make the vehicle",
      "To prevent the",
      "To access the trunk",
      "To turn off the engine"
   ],
   "correctAnswer": 1,
   "explanation": "Vehicle stabilization prevents unexpected",
   "category": "Trauma"
},
 {
   "id": 234,
   "question": "When using a stair chair, the patient should be",
   "options": [
      "Facing backward",
      "Facing forward in a",
      "Lying flat",
      "Standing upright"
   ],
   "correctAnswer": 1,
   "explanation": "A stair chair is designed for a seated",
   "category": "Trauma"
},
 {
   "id": 235,
   "question": "What is the primary concern when extricating a",
   "options": [
      "Getting the patient",
      "Maintaining spinal",
      "Finding the patient's",
      "Swimming speed"
   ],
   "correctAnswer": 1,
   "explanation": "When extricating from water, spinal",
   "category": "Trauma"
},
 {
   "id": 236,
   "question": "What is the recommended method for moving a",
   "options": [
      "Log-roll the patient",
      "Use a scoop stretcher",
      "Have the patient walk",
      "Drag the patient by"
   ],
   "correctAnswer": 1,
   "explanation": "A scoop stretcher minimizes movement of",
   "category": "Trauma"
},
 {
   "id": 237,
   "question": "What PPE should rescuers wear during vehicle",
   "options": [
      "Only gloves",
      "Full PPE including",
      "Casual clothing",
      "Only a reflective vest"
   ],
   "correctAnswer": 1,
   "explanation": "Full PPE including helmet, eye protection,",
   "category": "Trauma"
},
 {
   "id": 238,
   "question": "What is the correct position for the rescuer at the",
   "options": [
      "Standing beside the",
      "Kneeling behind the",
      "Sitting on the",
      "Holding the patient's"
   ],
   "correctAnswer": 1,
   "explanation": "The rescuer kneels behind the patient's",
   "category": "Trauma"
},
 {
   "id": 239,
   "question": "When is it acceptable to remove a motorcycle",
   "options": [
      "Never",
      "When it interferes",
      "Always, immediately",
      "Only if the patient"
   ],
   "correctAnswer": 1,
   "explanation": "A helmet should be removed when it",
   "category": "Trauma"
},
 {
   "id": 240,
   "question": "What is the recommended technique for removing",
   "options": [
      "One rescuer pulls it",
      "Two-rescuer",
      "Cut the helmet off",
      "Leave it on"
   ],
   "correctAnswer": 1,
   "explanation": "A two-rescuer technique ensures spinal",
   "category": "Trauma"
},
 {
   "id": 241,
   "question": "What is a basket stretcher (Stokes litter) primarily",
   "options": [
      "Hospital transport",
      "Moving patients over",
      "Wheelchair transport",
      "Stretching exercises"
   ],
   "correctAnswer": 1,
   "explanation": "A basket stretcher is designed for moving",
   "category": "Trauma"
},
 {
   "id": 242,
   "question": "What is the first step in the extrication process?",
   "options": [
      "Cutting the roof of the",
      "Assessing the scene",
      "Removing the patient",
      "Starting an IV line"
   ],
   "correctAnswer": 1,
   "explanation": "Scene assessment and safety must be",
   "category": "Trauma"
},
 {
   "id": 243,
   "question": "Which type of glass should be managed before",
   "options": [
      "Only the windshield",
      "All broken or unstable",
      "No glass",
      "Only the rear window"
   ],
   "correctAnswer": 1,
   "explanation": "All broken or unstable glass must be",
   "category": "Trauma"
},
 {
   "id": 244,
   "question": "What is the function of a spring-loaded center",
   "options": [
      "To measure tire",
      "To break vehicle",
      "To open the hood",
      "To check the battery"
   ],
   "correctAnswer": 1,
   "explanation": "A spring-loaded center punch is used to",
   "category": "Trauma"
},
 {
   "id": 245,
   "question": "What is the correct body mechanics principle when",
   "options": [
      "Bend at the waist and",
      "Keep the back",
      "Twist the torso while",
      "Lift with arms"
   ],
   "correctAnswer": 1,
   "explanation": "Proper body mechanics require keeping",
   "category": "Trauma"
},
 {
   "id": 246,
   "question": "What is the purpose of the 'power grip' when",
   "options": [
      "To look professional",
      "To maximize grip",
      "To carry with one",
      "To reduce weight"
   ],
   "correctAnswer": 1,
   "explanation": "The power grip involves gripping the",
   "category": "Trauma"
},
 {
   "id": 247,
   "question": "How many rescuers are minimally required to",
   "options": [
      "One",
      "Two",
      "Four",
      "Six"
   ],
   "correctAnswer": 1,
   "explanation": "At minimum, two rescuers are required to",
   "category": "Trauma"
},
 {
   "id": 248,
   "question": "In ambulance dispatch protocols, what does",
   "options": [
      "Distributing medical",
      "Assigning the",
      "Allocating budget for",
      "Dividing patient care"
   ],
   "correctAnswer": 1,
   "explanation": "Resource allocation involves assigning",
   "category": "AMATS"
},
 {
   "id": 249,
   "question": "What is the primary purpose of a dispatch protocol",
   "options": [
      "To reduce the",
      "To ensure timely and",
      "To eliminate the need",
      "To track fuel"
   ],
   "correctAnswer": 1,
   "explanation": "Dispatch protocols standardize the",
   "category": "AMATS"
},
 {
   "id": 250,
   "question": "What does the acronym 'START' stand for in",
   "options": [
      "Simple Triage And",
      "Systematic Tracking",
      "Standard Treatment",
      "Speed, Triage,"
   ],
   "correctAnswer": 0,
   "explanation": "START stands for Simple Triage And",
   "category": "AMATS"
},
 {
   "id": 251,
   "question": "What is the purpose of mutual aid agreements",
   "options": [
      "To compete with each",
      "To provide assistance",
      "To share employee",
      "To reduce the"
   ],
   "correctAnswer": 1,
   "explanation": "Mutual aid agreements allow agencies to",
   "category": "AMATS"
},
 {
   "id": 252,
   "question": "What is the meaning of 'response time' in EMS?",
   "options": [
      "The time taken to",
      "The interval from",
      "The time spent on",
      "The duration of"
   ],
   "correctAnswer": 1,
   "explanation": "Response time is measured from the",
   "category": "AMATS"
},
 {
   "id": 253,
   "question": "What information should be obtained during",
   "options": [
      "Only the caller's",
      "Location, nature of",
      "Only the address",
      "The weather"
   ],
   "correctAnswer": 1,
   "explanation": "Call intake must capture location, nature",
   "category": "AMATS"
},
 {
   "id": 254,
   "question": "What is the role of the EMS dispatcher?",
   "options": [
      "To treat patients at the scene",
      "To receive emergency calls, determine priority, and dispatch appropriate resources",
      "To drive the ambulance",
      "To perform surgery"
   ],
   "correctAnswer": 1,
   "explanation": "The EMS dispatcher receives emergency calls, determines the priority of the call, and dispatches the appropriate ambulance and crew to the scene.",
   "category": "AMATS"
},
 {
   "id": 255,
   "question": "What is a 'standing order' in EMS?",
   "options": [
      "A permanent",
      "A preauthorized",
      "An order to remain on",
      "A shift schedule order"
   ],
   "correctAnswer": 1,
   "explanation": "Standing orders are preauthorized",
   "category": "AMATS"
},
 {
   "id": 256,
   "question": "What is the purpose of an after-action review",
   "options": [
      "To assign blame to",
      "To evaluate",
      "To celebrate",
      "To complete"
   ],
   "correctAnswer": 1,
   "explanation": "An AAR is a structured review process to",
   "category": "AMATS"
},
 {
   "id": 257,
   "question": "What is the difference between BLS and ALS",
   "options": [
      "BLS units are faster",
      "BLS provides basic",
      "ALS units cannot",
      "There is no difference"
   ],
   "correctAnswer": 1,
   "explanation": "BLS units provide basic interventions",
   "category": "AMATS"
},
 {
   "id": 258,
   "question": "What is the role of the incident commander at an",
   "options": [
      "To treat the most",
      "To oversee all",
      "To transport patients",
      "To communicate with"
   ],
   "correctAnswer": 1,
   "explanation": "The incident commander has overall",
   "category": "AMATS"
},
 {
   "id": 259,
   "question": "What does the term 'staging' mean in EMS",
   "options": [
      "Preparing for a",
      "Holding units at a",
      "Parking at the",
      "Returning to the"
   ],
   "correctAnswer": 1,
   "explanation": "Staging refers to holding ambulances and",
   "category": "AMATS"
},
 {
   "id": 260,
   "question": "What is the function of a treatment sector in an",
   "options": [
      "To triage patients",
      "To provide medical",
      "To transport patients",
      "To communicate with"
   ],
   "correctAnswer": 1,
   "explanation": "The treatment sector provides medical",
   "category": "AMATS"
},
 {
   "id": 261,
   "question": "What is the recommended staffing minimum for a",
   "options": [
      "One EMT",
      "Two EMTs",
      "Three paramedics",
      "One physician"
   ],
   "correctAnswer": 1,
   "explanation": "A BLS ambulance requires at minimum",
   "category": "AMATS"
},
 {
   "id": 262,
   "question": "What is the meaning of 'turnaround time' in EMS?",
   "options": [
      "The time to turn the",
      "The time from arrival",
      "The time spent",
      "The shift duration"
   ],
   "correctAnswer": 1,
   "explanation": "Turnaround time is the interval from",
   "category": "AMATS"
},
 {
   "id": 263,
   "question": "What is a 'mass casualty incident' (MCI)?",
   "options": [
      "An incident with one",
      "An event where the",
      "A routine ambulance",
      "A hospital code blue"
   ],
   "correctAnswer": 1,
   "explanation": "An MCI is any event where the number",
   "category": "AMATS"
},
 {
   "id": 264,
   "question": "What priority level is typically assigned to a patient",
   "options": [
      "Priority 3 (non-urgent)",
      "Priority 1",
      "Priority 4 (scheduled)",
      "No priority assigned"
   ],
   "correctAnswer": 1,
   "explanation": "Priority 1 indicates a life-threatening",
   "category": "AMATS"
},
 {
   "id": 265,
   "question": "What is the purpose of a pre-arrival instruction",
   "options": [
      "To keep the caller",
      "To provide the caller",
      "To collect payment",
      "To determine the"
   ],
   "correctAnswer": 1,
   "explanation": "Pre-arrival instructions (PAI) guide callers",
   "category": "AMATS"
},
 {
   "id": 266,
   "question": "What document outlines the scope of practice for",
   "options": [
      "The ambulance",
      "The TESDA Training",
      "The hospital",
      "The driver's license"
   ],
   "correctAnswer": 1,
   "explanation": "The scope of practice is defined by the",
   "category": "AMATS"
},
 {
   "id": 267,
   "question": "What is the purpose of quality improvement (QI) in",
   "options": [
      "To punish providers",
      "To continuously",
      "To increase the",
      "To reduce staff"
   ],
   "correctAnswer": 1,
   "explanation": "QI programs systematically evaluate care",
   "category": "AMATS"
},
 {
   "id": 268,
   "question": "When communicating via radio with a hospital,",
   "options": [
      "Speak as quickly as",
      "Use clear, concise,",
      "Use slang and jargon",
      "Speak in the local"
   ],
   "correctAnswer": 1,
   "explanation": "Radio communication must use clear,",
   "category": "AMATS"
},
 {
   "id": 269,
   "question": "What information must be included in the patient care report (PCR)?",
   "options": [
      "Only the patient's name and address",
      "Patient assessment, treatment provided, changes in condition, and all communications",
      "Only the vital signs",
      "Only the destination"
   ],
   "correctAnswer": 1,
   "explanation": "A PCR must comprehensively document patient assessment findings, interventions, patient response, and all relevant communications to serve as a legal and medical record.",
   "category": "AMATS"
},
 {
   "id": 270,
   "question": "What does the acronym 'SBAR' stand for in",
   "options": [
      "Situation,",
      "Symptoms,",
      "Standard, Basic,",
      "Systolic, Blood,"
   ],
   "correctAnswer": 0,
   "explanation": "SBAR is a structured communication",
   "category": "AMATS"
},
 {
   "id": 271,
   "question": "What is the primary reason for using standardized",
   "options": [
      "To make",
      "To ensure clear and",
      "To keep information",
      "To reduce the need"
   ],
   "correctAnswer": 1,
   "explanation": "Standardized codes ensure consistent,",
   "category": "AMATS"
},
 {
   "id": 272,
   "question": "When communicating with a confused or agitated",
   "options": [
      "Speak loudly and",
      "Use a calm,",
      "Ignore the patient",
      "Use medical jargon to"
   ],
   "correctAnswer": 1,
   "explanation": "A calm, reassuring tone with simple",
   "category": "AMATS"
},
 {
   "id": 273,
   "question": "What information must be included in the patient",
   "options": [
      "Only the patient's",
      "Patient assessment,",
      "Only the vital signs",
      "Only the transport"
   ],
   "correctAnswer": 1,
   "explanation": "A PCR must comprehensively document",
   "category": "AMATS"
},
 {
   "id": 274,
   "question": "What is the purpose of a verbal handoff report",
   "options": [
      "To delay patient care",
      "To communicate",
      "To avoid writing a",
      "To socialize with"
   ],
   "correctAnswer": 1,
   "explanation": "A verbal handoff communicates essential",
   "category": "AMATS"
},
 {
   "id": 275,
   "question": "Which of the following is an example of a closed-",
   "options": [
      "Giving an order",
      "Repeating back the",
      "Ignoring the",
      "Writing notes without"
   ],
   "correctAnswer": 1,
   "explanation": "Closed-loop communication involves the",
   "category": "AMATS"
},
 {
   "id": 276,
   "question": "What is the HIPAA regulation regarding patient",
   "options": [
      "No restrictions apply",
      "Only the minimum",
      "All patient details",
      "HIPAA does not apply"
   ],
   "correctAnswer": 1,
   "explanation": "HIPAA requires that only the minimum",
   "category": "AMATS"
},
 {
   "id": 277,
   "question": "When should an EMS provider use the term 'copy'",
   "options": [
      "To request a",
      "To confirm that a",
      "To end the radio",
      "To request a repeat"
   ],
   "correctAnswer": 1,
   "explanation": "'Copy' is used to confirm that the",
   "category": "AMATS"
},
 {
   "id": 278,
   "question": "What is the proper procedure if radio",
   "options": [
      "Continue speaking",
      "Stop, identify",
      "Hang up and call",
      "Switch to a personal"
   ],
   "correctAnswer": 1,
   "explanation": "If interrupted, the provider should stop, re-",
   "category": "AMATS"
},
 {
   "id": 279,
   "question": "What is the '10-code' system used for in some",
   "options": [
      "Medical diagnosis",
      "Brief standardized",
      "Patient billing codes",
      "Equipment inventory"
   ],
   "correctAnswer": 1,
   "explanation": "10-codes are standardized numeric codes",
   "category": "AMATS"
},
 {
   "id": 280,
   "question": "Why is plain language preferred over 10-codes in",
   "options": [
      "It is shorter",
      "It reduces",
      "It sounds less",
      "10-codes are no"
   ],
   "correctAnswer": 1,
   "explanation": "Plain language is preferred because 10-",
   "category": "AMATS"
},
 {
   "id": 281,
   "question": "What is the purpose of documenting all radio",
   "options": [
      "To fill space in the",
      "To create a legal",
      "To test the radio",
      "To count the number"
   ],
   "correctAnswer": 1,
   "explanation": "Documenting all radio communications",
   "category": "AMATS"
},
 {
   "id": 282,
   "question": "When giving a patient report, what should be",
   "options": [
      "Only whether the",
      "Level of",
      "The patient's mood",
      "Whether the patient is"
   ],
   "correctAnswer": 1,
   "explanation": "Mental status should be reported using a",
   "category": "AMATS"
},
 {
   "id": 283,
   "question": "What does AVPU stand for in patient",
   "options": [
      "Airway, Ventilation,",
      "Alert, Verbal, Pain,",
      "Assessment, Vital",
      "Airway, Voice, Pulse,"
   ],
   "correctAnswer": 1,
   "explanation": "AVPU is a simplified mental status",
   "category": "AMATS"
},
 {
   "id": 284,
   "question": "How should an EMS provider communicate with a",
   "options": [
      "Use the same",
      "Use age-appropriate",
      "Ignore the child and",
      "Use medical jargon to"
   ],
   "correctAnswer": 1,
   "explanation": "Pediatric communication requires age-",
   "category": "AMATS"
},
 {
   "id": 285,
   "question": "What is the purpose of a 'patch' call in EMS radio",
   "options": [
      "To repair the radio",
      "To connect with a",
      "To change radio",
      "To test the antenna"
   ],
   "correctAnswer": 1,
   "explanation": "A patch call connects the EMS provider",
   "category": "AMATS"
},
 {
   "id": 286,
   "question": "What is 'off-line medical direction' in EMS?",
   "options": [
      "Physician is not",
      "Standing orders and",
      "No medical oversight",
      "Communication by"
   ],
   "correctAnswer": 1,
   "explanation": "Off-line (indirect) medical direction refers",
   "category": "AMATS"
},
 {
   "id": 287,
   "question": "What should an EMS provider do if they disagree",
   "options": [
      "Ignore the order",
      "Clarify the order",
      "Follow the order",
      "File a lawsuit"
   ],
   "correctAnswer": 1,
   "explanation": "Providers should respectfully clarify the",
   "category": "AMATS"
},
 {
   "id": 288,
   "question": "In a mass casualty incident, which triage category",
   "options": [
      "Green (Minor)",
      "Yellow (Delayed)",
      "Red (Immediate)",
      "Black"
   ],
   "correctAnswer": 2,
   "explanation": "Red-tagged patients have life-threatening",
   "category": "Patient Assessment"
},
 {
   "id": 289,
   "question": "What is the primary purpose of hazard assessment",
   "options": [
      "To determine the cost",
      "To identify potential",
      "To write a report for",
      "To identify witnesses"
   ],
   "correctAnswer": 1,
   "explanation": "Hazard assessment identifies risks such",
   "category": "Patient Assessment"
},
 {
   "id": 290,
   "question": "What does the 'I' in the Incident Command System",
   "options": [
      "Infection",
      "Incident",
      "Intervention",
      "Inspection"
   ],
   "correctAnswer": 1,
   "explanation": "ICS stands for Incident Command System",
   "category": "Patient Assessment"
},
 {
   "id": 291,
   "question": "What is the first step in the START triage process?",
   "options": [
      "Treat all injuries",
      "Assess all patients for",
      "Start IV lines",
      "Transport the most"
   ],
   "correctAnswer": 1,
   "explanation": "The first step in START triage is to",
   "category": "Patient Assessment"
},
 {
   "id": 292,
   "question": "In START triage, what is the respiratory rate",
   "options": [
      "Less than 10 breaths",
      "Greater than 30",
      "12-20 breaths per",
      "Exactly 16 breaths"
   ],
   "correctAnswer": 1,
   "explanation": "In START triage, a respiratory rate",
   "category": "Patient Assessment"
},
 {
   "id": 293,
   "question": "What color tag is assigned to patients with minor",
   "options": [
      "Red",
      "Yellow",
      "Green",
      "Black"
   ],
   "correctAnswer": 2,
   "explanation": "Green tags are assigned to walking",
   "category": "Patient Assessment"
},
 {
   "id": 294,
   "question": "What does a black triage tag indicate?",
   "options": [
      "Patient needs",
      "Patient is deceased",
      "Patient has minor",
      "Patient is the first to"
   ],
   "correctAnswer": 1,
   "explanation": "A black tag indicates the patient is",
   "category": "Patient Assessment"
},
 {
   "id": 295,
   "question": "What is the purpose of establishing a command",
   "options": [
      "To provide",
      "To centralize",
      "To park ambulances",
      "To treat patients"
   ],
   "correctAnswer": 1,
   "explanation": "A command post centralizes incident",
   "category": "Patient Assessment"
},
 {
   "id": 296,
   "question": "What is the role of the triage officer at an MCI?",
   "options": [
      "To treat patients",
      "To rapidly assess and",
      "To drive ambulances",
      "To communicate with"
   ],
   "correctAnswer": 1,
   "explanation": "The triage officer rapidly assesses each",
   "category": "Patient Assessment"
},
 {
   "id": 297,
   "question": "What is scene control in EMS?",
   "options": [
      "Controlling the",
      "Managing access to",
      "Controlling the",
      "Controlling the radio"
   ],
   "correctAnswer": 1,
   "explanation": "Scene control involves managing who",
   "category": "Patient Assessment"
},
 {
   "id": 298,
   "question": "What is the 'warm zone' in a hazardous materials",
   "options": [
      "The area completely",
      "The area where",
      "The area of maximum",
      "The hospital"
   ],
   "correctAnswer": 1,
   "explanation": "The warm zone is the contamination",
   "category": "Patient Assessment"
},
 {
   "id": 299,
   "question": "What is the 'cold zone' in a hazardous materials",
   "options": [
      "The area of maximum",
      "The safe area where",
      "The decontamination",
      "The area inside the"
   ],
   "correctAnswer": 1,
   "explanation": "The cold zone is the safe area free from",
   "category": "Patient Assessment"
},
 {
   "id": 300,
   "question": "What is the 'hot zone' in a hazardous materials",
   "options": [
      "The area with warm",
      "The area of maximum",
      "The hospital zone",
      "The patient waiting"
   ],
   "correctAnswer": 1,
   "explanation": "The hot zone is the contaminated area",
   "category": "Patient Assessment"
},
 {
   "id": 301,
   "question": "When should an EMS provider enter a hazardous",
   "options": [
      "Whenever they feel it",
      "Only with appropriate",
      "Only during daylight",
      "Never under any"
   ],
   "correctAnswer": 1,
   "explanation": "Entry into the hot zone requires",
   "category": "Patient Assessment"
},
 {
   "id": 302,
   "question": "What is the primary goal of scene size-up?",
   "options": [
      "To determine patient",
      "To identify hazards,",
      "To start treatment",
      "To locate valuables"
   ],
   "correctAnswer": 1,
   "explanation": "Scene size-up rapidly identifies hazards,",
   "category": "Patient Assessment"
},
 {
   "id": 303,
   "question": "What principle guides the order of patient treatment",
   "options": [
      "First come, first",
      "Treat the greatest",
      "Treat the most",
      "Treat children first"
   ],
   "correctAnswer": 1,
   "explanation": "MCI triage prioritizes treating the greatest",
   "category": "Patient Assessment"
},
 {
   "id": 304,
   "question": "What is the function of a staging area during an",
   "options": [
      "To treat patients",
      "To hold incoming",
      "To decontaminate",
      "To discharge patients"
   ],
   "correctAnswer": 1,
   "explanation": "The staging area holds arriving units and",
   "category": "Patient Assessment"
},
 {
   "id": 305,
   "question": "What is the function of a staging area during an MCI?",
   "options": [
      "To treat patients",
      "To hold incoming resources until they are assigned to a specific task",
      "To decontaminate patients",
      "To repair vehicles"
   ],
   "correctAnswer": 1,
   "explanation": "The staging area holds arriving units and resources in an organized manner until the incident commander assigns them to specific tasks or sectors.",
   "category": "Patient Assessment"
},
 {
   "id": 306,
   "question": "In the JumpSTART pediatric triage system, what is",
   "options": [
      "Check blood pressure",
      "Assess if the child",
      "Start an IV",
      "Check pupil response"
   ],
   "correctAnswer": 1,
   "explanation": "Similar to START, JumpSTART begins by",
   "category": "Patient Assessment"
},
 {
   "id": 307,
   "question": "What is the purpose of an incident action plan",
   "options": [
      "To document the",
      "To outline the",
      "To order food for",
      "To assign parking"
   ],
   "correctAnswer": 1,
   "explanation": "An IAP documents the incident objectives,",
   "category": "Patient Assessment"
},
 {
   "id": 308,
   "question": "What is the minimum PPE required for EMS",
   "options": [
      "No PPE is required",
      "Gloves, eye",
      "Full hazmat suit",
      "Only a helmet"
   ],
   "correctAnswer": 1,
   "explanation": "Minimum PPE at a crash scene includes",
   "category": "Patient Assessment"
},
 {
   "id": 309,
   "question": "What should an EMS provider do if they discover a",
   "options": [
      "Attempt to disarm or",
      "Immediately evacuate",
      "Ignore it and continue",
      "Take a photograph"
   ],
   "correctAnswer": 1,
   "explanation": "If a secondary hazard is discovered,",
   "category": "Patient Assessment"
},
 {
   "id": 310,
   "question": "What does 'size-up' involve in emergency scene",
   "options": [
      "Only counting the",
      "Rapid visual",
      "Measuring the scene",
      "Interviewing all"
   ],
   "correctAnswer": 1,
   "explanation": "Size-up is a rapid visual assessment that",
   "category": "Patient Assessment"
},
 {
   "id": 311,
   "question": "What is the role of law enforcement at an EMS",
   "options": [
      "To provide medical",
      "To ensure scene",
      "To drive the",
      "To perform triage"
   ],
   "correctAnswer": 1,
   "explanation": "Law enforcement provides scene safety,",
   "category": "Patient Assessment"
},
 {
   "id": 312,
   "question": "What is the principle of 'doing the most good for",
   "options": [
      "Routine patient care",
      "Mass casualty",
      "Hospital",
      "Ambulance"
   ],
   "correctAnswer": 1,
   "explanation": "This principle guides MCI triage",
   "category": "Patient Assessment"
},
 {
   "id": 313,
   "question": "What is the normal resting heart rate range for a",
   "options": [
      "40-60 bpm",
      "60-100 bpm",
      "100-120 bpm",
      "120-140 bpm"
   ],
   "correctAnswer": 1,
   "explanation": "The normal resting heart rate for a healthy",
   "category": "Patient Assessment"
},
 {
   "id": 314,
   "question": "What does the mnemonic 'SAMPLE' stand for?",
   "options": [
      "Signs/Symptoms,",
      "Size, Age, Medical",
      "Scene safety,",
      "Systolic, Airway,"
   ],
   "correctAnswer": 0,
   "explanation": "SAMPLE is a medical history mnemonic:",
   "category": "Patient Assessment"
},
 {
   "id": 315,
   "question": "What is the normal blood pressure range for a",
   "options": [
      "80/40 to 90/50 mmHg",
      "90/60 to 120/80",
      "140/90 to 160/100",
      "160/100 to 180/120"
   ],
   "correctAnswer": 1,
   "explanation": "Normal adult blood pressure is",
   "category": "Patient Assessment"
},
 {
   "id": 316,
   "question": "What is the normal respiratory rate for a healthy",
   "options": [
      "6-10 breaths per",
      "12-20 breaths per",
      "25-35 breaths per",
      "35-45 breaths per"
   ],
   "correctAnswer": 1,
   "explanation": "The normal respiratory rate for a healthy",
   "category": "Patient Assessment"
},
 {
   "id": 317,
   "question": "What does the 'P' in the OPQRST mnemonic stand",
   "options": [
      "Position",
      "Provocation",
      "Pulse",
      "Pressure"
   ],
   "correctAnswer": 1,
   "explanation": "In OPQRST (pain assessment), P stands",
   "category": "Patient Assessment"
},
 {
   "id": 318,
   "question": "What does the 'Q' in OPQRST stand for?",
   "options": [
      "Quick",
      "Quality",
      "Quantity",
      "Quadrant"
   ],
   "correctAnswer": 1,
   "explanation": "Q stands for Quality   asking the patient",
   "category": "Patient Assessment"
},
 {
   "id": 319,
   "question": "What does the 'R' in OPQRST stand for?",
   "options": [
      "Respiration",
      "Radiation",
      "Rate",
      "Reaction"
   ],
   "correctAnswer": 1,
   "explanation": "R stands for Radiation   asking whether",
   "category": "Patient Assessment"
},
 {
   "id": 320,
   "question": "What does the 'S' in OPQRST stand for?",
   "options": [
      "Signs",
      "Severity",
      "Symptoms",
      "Skin"
   ],
   "correctAnswer": 1,
   "explanation": "S stands for Severity   asking the patient",
   "category": "Patient Assessment"
},
 {
   "id": 321,
   "question": "What does the 'T' in OPQRST stand for?",
   "options": [
      "Treatment",
      "Time",
      "Temperature",
      "Tenderness"
   ],
   "correctAnswer": 1,
   "explanation": "T stands for Time   asking when the",
   "category": "Patient Assessment"
},
 {
   "id": 322,
   "question": "What is the first step in patient assessment?",
   "options": [
      "Check vital signs",
      "Scene size-up and",
      "Administer",
      "Start an IV"
   ],
   "correctAnswer": 1,
   "explanation": "Patient assessment begins with scene",
   "category": "Patient Assessment"
},
 {
   "id": 323,
   "question": "What is the correct technique for measuring blood",
   "options": [
      "Inflate the cuff to 200",
      "Inflate 30 mmHg",
      "Inflate to 100 mmHg",
      "Do not use a"
   ],
   "correctAnswer": 1,
   "explanation": "Proper technique involves inflating the",
   "category": "Patient Assessment"
},
 {
   "id": 324,
   "question": "What is a normal pupillary response to light?",
   "options": [
      "Dilation",
      "Constriction (both",
      "No change",
      "One pupil constricts,"
   ],
   "correctAnswer": 1,
   "explanation": "Normal pupils constrict equally and briskly",
   "category": "Patient Assessment"
},
 {
   "id": 325,
   "question": "What does PEARL stand for in neurological",
   "options": [
      "Pulse, Eyes, Airway,",
      "Pupils Equal And",
      "Pain, Ears, Airway,",
      "Pressure, Eyes,"
   ],
   "correctAnswer": 1,
   "explanation": "PEARL stands for Pupils Equal And",
   "category": "Patient Assessment"
},
 {
   "id": 326,
   "question": "What is the Glasgow Coma Scale (GCS) score",
   "options": [
      "0-10",
      "15-Mar",
      "20-Jan",
      "25-May"
   ],
   "correctAnswer": 1,
   "explanation": "The GCS ranges from 3 (worst) to 15",
   "category": "Patient Assessment"
},
 {
   "id": 327,
   "question": "A GCS score of 8 or below indicates what?",
   "options": [
      "Mild head injury",
      "Severe head injury",
      "No injury",
      "Moderate headache"
   ],
   "correctAnswer": 1,
   "explanation": "A GCS of 8 or below indicates severe",
   "category": "Patient Assessment"
},
 {
   "id": 328,
   "question": "What are the three components of the Glasgow",
   "options": [
      "Heart rate, blood",
      "Eye opening, verbal",
      "Pupil size, reflexes,",
      "Pain, temperature,"
   ],
   "correctAnswer": 1,
   "explanation": "GCS assesses three components: Eye",
   "category": "Patient Assessment"
},
 {
   "id": 329,
   "question": "What is the medical term for difficulty breathing?",
   "options": [
      "Dyspnea",
      "Apnea",
      "Bradypnea",
      "Orthopnea"
   ],
   "correctAnswer": 0,
   "explanation": "Dyspnea is the medical term for difficulty",
   "category": "Patient Assessment"
},
 {
   "id": 330,
   "question": "What is the normal body temperature range for a",
   "options": [
      "35.0-35.5 C",
      "36.1-37.2 C",
      "38.0-39.0 C",
      "40.0-41.0 C"
   ],
   "correctAnswer": 1,
   "explanation": "Normal body temperature is 36.1-37.2 C",
   "category": "Patient Assessment"
},
 {
   "id": 331,
   "question": "What is the correct site for checking a pulse in an",
   "options": [
      "Radial pulse",
      "Carotid pulse",
      "Pedal pulse",
      "Temporal pulse"
   ],
   "correctAnswer": 1,
   "explanation": "The carotid pulse is the preferred site for",
   "category": "Patient Assessment"
},
 {
   "id": 332,
   "question": "What does 'tidaling' in a chest drainage system",
   "options": [
      "System malfunction",
      "Normal function with",
      "Air leak",
      "Infection"
   ],
   "correctAnswer": 1,
   "explanation": "Tidaling (fluctuation of fluid level with",
   "category": "Patient Assessment"
},
 {
   "id": 333,
   "question": "What is the correct position for a patient in",
   "options": [
      "Prone position",
      "Supine with legs",
      "Sitting upright",
      "Trendelenburg only"
   ],
   "correctAnswer": 1,
   "explanation": "A patient in anaphylactic shock should be",
   "category": "Patient Assessment"
},
 {
   "id": 334,
   "question": "What is the first-line medication for anaphylaxis?",
   "options": [
      "Aspirin",
      "Epinephrine",
      "Nitroglycerin",
      "Metoprolol"
   ],
   "correctAnswer": 1,
   "explanation": "Epinephrine is the first-line treatment for",
   "category": "Patient Assessment"
},
 {
   "id": 335,
   "question": "What is the appropriate dose of epinephrine for",
   "options": [
      "0.01 mg IV",
      "0.3-0.5 mg IM",
      "1 mg IV push",
      "5 mg IM"
   ],
   "correctAnswer": 1,
   "explanation": "The standard adult dose for anaphylaxis",
   "category": "Patient Assessment"
},
 {
   "id": 336,
   "question": "What is a key sign of inadequate breathing?",
   "options": [
      "Equal chest rise",
      "Shallow or irregular",
      "Normal skin color",
      "Clear speech"
   ],
   "correctAnswer": 1,
   "explanation": "Shallow or irregular chest movement",
   "category": "Patient Assessment"
},
 {
   "id": 337,
   "question": "What is the correct method for opening the airway",
   "options": [
      "Jaw thrust",
      "Head-tilt/chin-lift",
      "Neck extension only",
      "Finger sweep"
   ],
   "correctAnswer": 1,
   "explanation": "The head-tilt/chin-lift is the standard",
   "category": "Patient Assessment"
},
 {
   "id": 338,
   "question": "What is an oropharyngeal airway (OPA) used for?",
   "options": [
      "To deliver oxygen",
      "To maintain airway",
      "To suction secretions",
      "To measure oxygen"
   ],
   "correctAnswer": 1,
   "explanation": "An OPA keeps the tongue away from the",
   "category": "Patient Assessment"
},
 {
   "id": 339,
   "question": "What is a nasopharyngeal airway (NPA) used for?",
   "options": [
      "Only for nasal",
      "To maintain airway",
      "To deliver nasal",
      "To check nasal"
   ],
   "correctAnswer": 1,
   "explanation": "An NPA maintains airway patency and",
   "category": "Patient Assessment"
},
 {
   "id": 340,
   "question": "What is a contraindication for nasopharyngeal",
   "options": [
      "Patient is awake and",
      "Suspected basilar",
      "Patient has a fever",
      "Patient is over 50"
   ],
   "correctAnswer": 1,
   "explanation": "Suspected basilar skull fracture is a",
   "category": "Patient Assessment"
},
 {
   "id": 341,
   "question": "What is the correct size for an oropharyngeal",
   "options": [
      "Measure from the",
      "Measure from the",
      "Measure from the",
      "Any size will work"
   ],
   "correctAnswer": 1,
   "explanation": "The correct OPA size is measured from",
   "category": "Patient Assessment"
},
 {
   "id": 342,
   "question": "What does capillary refill time assess?",
   "options": [
      "Lung function",
      "Peripheral perfusion",
      "Kidney function",
      "Brain function"
   ],
   "correctAnswer": 1,
   "explanation": "Capillary refill time assesses peripheral",
   "category": "Patient Assessment"
},
 {
   "id": 343,
   "question": "Which position is most appropriate for transporting",
   "options": [
      "Supine position",
      "Prone position",
      "Semi-Fowler's",
      "Trendelenburg"
   ],
   "correctAnswer": 2,
   "explanation": "Semi-Fowler's position (head elevated 30-",
   "category": "AMATS"
},
 {
   "id": 344,
   "question": "When transporting a patient with a suspected",
   "options": [
      "Stair chair",
      "Long spine board",
      "Scoop stretcher only",
      "Wheeled stretcher"
   ],
   "correctAnswer": 1,
   "explanation": "A long spine board provides full spinal",
   "category": "AMATS"
},
 {
   "id": 345,
   "question": "What is the Trendelenburg position used for?",
   "options": [
      "To treat head injuries",
      "To increase venous",
      "To improve breathing",
      "To reduce nausea"
   ],
   "correctAnswer": 1,
   "explanation": "The Trendelenburg position (feet elevated",
   "category": "AMATS"
},
 {
   "id": 346,
   "question": "What is the shock position (modified",
   "options": [
      "Head elevated, feet",
      "Supine with legs",
      "Prone position",
      "Lateral recumbent"
   ],
   "correctAnswer": 1,
   "explanation": "The shock position involves placing the",
   "category": "AMATS"
},
 {
   "id": 347,
   "question": "What is the recovery position?",
   "options": [
      "Supine with arms at",
      "Lateral recumbent",
      "Prone with head to",
      "Sitting upright"
   ],
   "correctAnswer": 1,
   "explanation": "The recovery position (lateral recumbent)",
   "category": "AMATS"
},
 {
   "id": 348,
   "question": "When should a patient be placed in a left lateral",
   "options": [
      "For all patients",
      "For pregnant patients",
      "For patients with arm",
      "For patients with eye"
   ],
   "correctAnswer": 1,
   "explanation": "Pregnant patients in the third trimester",
   "category": "AMATS"
},
 {
   "id": 349,
   "question": "What is the purpose of strapping a patient to the",
   "options": [
      "To restrain the patient",
      "To secure the patient",
      "To keep the patient",
      "To restrict breathing"
   ],
   "correctAnswer": 1,
   "explanation": "Stretcher straps secure the patient to",
   "category": "AMATS"
},
 {
   "id": 350,
   "question": "What is the correct procedure for loading a",
   "options": [
      "One person pushes",
      "At least two rescuers:",
      "The patient loads the",
      "Only the driver loads"
   ],
   "correctAnswer": 1,
   "explanation": "At least two rescuers are required   one",
   "category": "AMATS"
},
 {
   "id": 351,
   "question": "How should a patient with chest pain be positioned",
   "options": [
      "Prone",
      "Semi-Fowler's or",
      "Trendelenburg",
      "Head down"
   ],
   "correctAnswer": 1,
   "explanation": "Patients with chest pain should be placed",
   "category": "AMATS"
},
 {
   "id": 352,
   "question": "What is the proper position for a patient with",
   "options": [
      "No specific position",
      "Supine with cervical",
      "Sitting upright",
      "Side-lying without"
   ],
   "correctAnswer": 1,
   "explanation": "A suspected neck injury requires cervical",
   "category": "AMATS"
},
 {
   "id": 353,
   "question": "What monitoring should be performed during",
   "options": [
      "No monitoring is",
      "Continuous",
      "Only checking once",
      "Only at the end of"
   ],
   "correctAnswer": 1,
   "explanation": "Continuous monitoring during transport",
   "category": "AMATS"
},
 {
   "id": 354,
   "question": "What is the purpose of a transport checklist?",
   "options": [
      "To delay transport",
      "To ensure all",
      "To count the number",
      "To record fuel levels"
   ],
   "correctAnswer": 1,
   "explanation": "A transport checklist ensures all",
   "category": "AMATS"
},
 {
   "id": 355,
   "question": "What is the correct technique for moving a",
   "options": [
      "Feet first with the",
      "Head first",
      "Sideways",
      "Carried by one"
   ],
   "correctAnswer": 0,
   "explanation": "When descending stairs, the stretcher",
   "category": "AMATS"
},
 {
   "id": 356,
   "question": "What is the maximum weight capacity of a",
   "options": [
      "150 kg",
      "Approximately 225-",
      "100 kg",
      "50 kg"
   ],
   "correctAnswer": 1,
   "explanation": "Standard EMS stretchers typically have a",
   "category": "AMATS"
},
 {
   "id": 357,
   "question": "What is a bariatric stretcher?",
   "options": [
      "A stretcher for",
      "A stretcher designed",
      "A stretcher for",
      "A stretcher for"
   ],
   "correctAnswer": 1,
   "explanation": "A bariatric stretcher is specifically",
   "category": "AMATS"
},
 {
   "id": 358,
   "question": "What should be done before moving a patient to a",
   "options": [
      "Just push the",
      "Communicate with",
      "Leave the patient on",
      "Transfer without any"
   ],
   "correctAnswer": 1,
   "explanation": "Before transferring, communicate with",
   "category": "AMATS"
},
 {
   "id": 359,
   "question": "What is the purpose of a patient care report during",
   "options": [
      "To keep the provider",
      "To document all",
      "To bill the patient only",
      "To record the"
   ],
   "correctAnswer": 1,
   "explanation": "The PCR documents the complete record",
   "category": "AMATS"
},
 {
   "id": 360,
   "question": "What is the function of a stair chair in patient",
   "options": [
      "To transport patients",
      "To replace the",
      "To transport patients",
      "To perform physical"
   ],
   "correctAnswer": 0,
   "explanation": "A stair chair is specifically designed to",
   "category": "AMATS"
},
 {
   "id": 361,
   "question": "When is a non-emergency transport indicated?",
   "options": [
      "When the patient has",
      "When a patient needs",
      "When no ambulance",
      "Never"
   ],
   "correctAnswer": 1,
   "explanation": "Non-emergency transport is for patients",
   "category": "AMATS"
},
 {
   "id": 362,
   "question": "What should be done immediately after completing",
   "options": [
      "Go home immediately",
      "Clean and restock the",
      "Wait for the next shift",
      "Only refuel the"
   ],
   "correctAnswer": 1,
   "explanation": "After transport, the ambulance must be",
   "category": "AMATS"
},
 {
   "id": 363,
   "question": "When driving an ambulance under emergency",
   "options": [
      "Arriving as fast as",
      "Driving safely and",
      "Using the siren",
      "Overtaking all"
   ],
   "correctAnswer": 1,
   "explanation": "The paramount rule in emergency driving",
   "category": "AMATS"
},
 {
   "id": 364,
   "question": "What is the purpose of using lights and siren during",
   "options": [
      "To show authority",
      "To alert other drivers",
      "To clear traffic for fun",
      "To test the equipment"
   ],
   "correctAnswer": 1,
   "explanation": "Lights and siren are used to request the",
   "category": "AMATS"
},
 {
   "id": 365,
   "question": "When approaching an intersection with a red light",
   "options": [
      "Proceed through",
      "Come to a complete",
      "Speed up to beat the",
      "Turn off the siren"
   ],
   "correctAnswer": 1,
   "explanation": "At a red light or stop sign, the ambulance",
   "category": "AMATS"
},
 {
   "id": 366,
   "question": "What is 'due regard' in the context of emergency",
   "options": [
      "Ignoring all traffic",
      "Driving with",
      "Driving at maximum",
      "Following the"
   ],
   "correctAnswer": 1,
   "explanation": "Due regard means operating the",
   "category": "AMATS"
},
 {
   "id": 367,
   "question": "What should the ambulance driver do when",
   "options": [
      "Force the vehicle off",
      "Slow down or stop",
      "Honk continuously",
      "Call the police on the"
   ],
   "correctAnswer": 1,
   "explanation": "If a vehicle does not yield, the ambulance",
   "category": "AMATS"
},
 {
   "id": 368,
   "question": "What is the recommended following distance when",
   "options": [
      "1 second",
      "3-4 seconds behind",
      "10 seconds",
      "Tailgate the vehicle"
   ],
   "correctAnswer": 1,
   "explanation": "A following distance of 3-4 seconds",
   "category": "AMATS"
},
 {
   "id": 369,
   "question": "What is the effect of wet road conditions on",
   "options": [
      "No effect",
      "Braking distance",
      "Braking distance",
      "Only affects speed,"
   ],
   "correctAnswer": 1,
   "explanation": "Wet roads reduce tire traction,",
   "category": "AMATS"
},
 {
   "id": 370,
   "question": "What should the ambulance driver do before",
   "options": [
      "Just look in the",
      "Use a spotter and",
      "Back up as fast as",
      "Honk the horn"
   ],
   "correctAnswer": 1,
   "explanation": "Before backing up, the driver should use",
   "category": "AMATS"
},
 {
   "id": 371,
   "question": "What is the purpose of a daily vehicle inspection",
   "options": [
      "To create paperwork",
      "To identify",
      "To count the number",
      "To record fuel costs"
   ],
   "correctAnswer": 1,
   "explanation": "A daily vehicle inspection identifies",
   "category": "AMATS"
},
 {
   "id": 372,
   "question": "When should the ambulance driver use emergency",
   "options": [
      "When arriving at a",
      "When parked at a",
      "Never",
      "Only at night"
   ],
   "correctAnswer": 1,
   "explanation": "Emergency lights without siren are used",
   "category": "AMATS"
},
 {
   "id": 373,
   "question": "What is the purpose of the ambulance governor",
   "options": [
      "To prevent the",
      "To increase engine",
      "To reduce fuel",
      "To play music in the"
   ],
   "correctAnswer": 0,
   "explanation": "A governor limits the maximum speed of",
   "category": "AMATS"
},
 {
   "id": 374,
   "question": "What should the ambulance driver do if the vehicle",
   "options": [
      "Brake hard and steer",
      "Steer in the direction",
      "Accelerate to regain",
      "Turn off the engine"
   ],
   "correctAnswer": 1,
   "explanation": "When skidding, steer in the direction the",
   "category": "AMATS"
},
 {
   "id": 375,
   "question": "What is the safest position for the ambulance when",
   "options": [
      "Facing oncoming",
      "Angled slightly to",
      "Parked on the",
      "Parked in the middle"
   ],
   "correctAnswer": 1,
   "explanation": "The ambulance should be angled slightly",
   "category": "AMATS"
},
 {
   "id": 376,
   "question": "What is the meaning of 'code 3' response?",
   "options": [
      "Routine response",
      "Emergency response",
      "Return to station",
      "Cancel the call"
   ],
   "correctAnswer": 1,
   "explanation": "Code 3 indicates an emergency response",
   "category": "AMATS"
},
 {
   "id": 377,
   "question": "What is the meaning of 'code 2' response?",
   "options": [
      "Emergency response",
      "Urgent response",
      "Cancel the call",
      "Mass casualty"
   ],
   "correctAnswer": 1,
   "explanation": "Code 2 indicates an urgent but non-life-",
   "category": "AMATS"
},
 {
   "id": 378,
   "question": "What is the most effective method for preventing",
   "options": [
      "Wearing gloves only",
      "Proper hand hygiene",
      "Using antibiotics",
      "Avoiding all patient"
   ],
   "correctAnswer": 1,
   "explanation": "Hand hygiene is the single most effective",
   "category": "OSH"
},
 {
   "id": 379,
   "question": "Which type of precautions should be taken for a",
   "options": [
      "Contact precautions",
      "Airborne precautions",
      "No precautions",
      "Droplet precautions"
   ],
   "correctAnswer": 1,
   "explanation": "Tuberculosis is transmitted via airborne",
   "category": "OSH"
},
 {
   "id": 380,
   "question": "What is the minimum time recommended for",
   "options": [
      "5 seconds",
      "20 seconds",
      "2 minutes",
      "10 minutes"
   ],
   "correctAnswer": 1,
   "explanation": "The WHO and CDC recommend",
   "category": "OSH"
},
 {
   "id": 381,
   "question": "When should alcohol-based hand rub NOT be",
   "options": [
      "Before patient contact",
      "When hands are",
      "After removing gloves",
      "Before eating"
   ],
   "correctAnswer": 1,
   "explanation": "Alcohol-based hand rub is not effective",
   "category": "OSH"
},
 {
   "id": 382,
   "question": "What is Standard Precautions?",
   "options": [
      "Precautions used",
      "Infection control",
      "Precautions only for",
      "Precautions only"
   ],
   "correctAnswer": 1,
   "explanation": "Standard Precautions are applied to ALL",
   "category": "OSH"
},
 {
   "id": 383,
   "question": "What PPE is required for contact with blood or",
   "options": [
      "Only a mask",
      "Gloves at minimum;",
      "Only a gown",
      "No PPE is required"
   ],
   "correctAnswer": 1,
   "explanation": "Gloves are the minimum PPE for",
   "category": "OSH"
},
 {
   "id": 384,
   "question": "What is the correct sequence for removing PPE?",
   "options": [
      "Gloves, gown, mask,",
      "Gloves first, then eye",
      "Mask first, then",
      "Any order is"
   ],
   "correctAnswer": 1,
   "explanation": "The correct removal sequence minimizes",
   "category": "OSH"
},
 {
   "id": 385,
   "question": "What should be done with needles after use?",
   "options": [
      "Recap the needle and",
      "Dispose immediately",
      "Leave on the patient's",
      "Bend the needle and"
   ],
   "correctAnswer": 1,
   "explanation": "Used needles must be placed directly in a",
   "category": "OSH"
},
 {
   "id": 386,
   "question": "What is a needlestick injury?",
   "options": [
      "A cut from a scalpel",
      "An accidental",
      "A burn injury",
      "A muscle strain"
   ],
   "correctAnswer": 1,
   "explanation": "A needlestick injury is a percutaneous",
   "category": "OSH"
},
 {
   "id": 387,
   "question": "What is the first action after a needlestick injury?",
   "options": [
      "Continue working",
      "Wash the wound with",
      "Apply a bandage and",
      "Squeeze the wound"
   ],
   "correctAnswer": 1,
   "explanation": "After a needlestick, wash the wound with",
   "category": "OSH"
},
 {
   "id": 388,
   "question": "What are the three major bloodborne pathogens of",
   "options": [
      "Influenza, common",
      "Hepatitis B, Hepatitis",
      "Tuberculosis, malaria,",
      "E. coli, Salmonella,"
   ],
   "correctAnswer": 1,
   "explanation": "The three major bloodborne pathogens of",
   "category": "OSH"
},
 {
   "id": 389,
   "question": "What is the purpose of an exposure control plan?",
   "options": [
      "To eliminate all",
      "To outline procedures",
      "To punish employees",
      "To reduce the"
   ],
   "correctAnswer": 1,
   "explanation": "An exposure control plan details",
   "category": "OSH"
},
 {
   "id": 390,
   "question": "What type of mask is required for droplet",
   "options": [
      "N95 respirator",
      "Surgical mask",
      "Full-face respirator",
      "No mask needed"
   ],
   "correctAnswer": 1,
   "explanation": "Droplet precautions require a standard",
   "category": "OSH"
},
 {
   "id": 391,
   "question": "How should biohazardous waste be disposed of?",
   "options": [
      "In the regular trash",
      "In designated",
      "By flushing down the",
      "By burning in the"
   ],
   "correctAnswer": 1,
   "explanation": "Biohazardous waste must be disposed of",
   "category": "OSH"
},
 {
   "id": 392,
   "question": "What is the incubation period?",
   "options": [
      "The time from",
      "The time from",
      "The duration of the",
      "The recovery period"
   ],
   "correctAnswer": 0,
   "explanation": "The incubation period is the interval",
   "category": "OSH"
},
 {
   "id": 393,
   "question": "When encountering a patient displaying aggressive",
   "options": [
      "Physically restrain the",
      "Ensure personal",
      "Shout at the patient to",
      "Ignore the behavior"
   ],
   "correctAnswer": 1,
   "explanation": "The provider must first ensure personal",
   "category": "Legal/Ethical"
},
 {
   "id": 394,
   "question": "What is de-escalation?",
   "options": [
      "Using physical force",
      "Verbal and non-",
      "Ignoring the patient",
      "Calling the police"
   ],
   "correctAnswer": 1,
   "explanation": "De-escalation uses calm communication,",
   "category": "Legal/Ethical"
},
 {
   "id": 395,
   "question": "Which communication technique is most effective",
   "options": [
      "Arguing with the",
      "Active listening and",
      "Threatening the",
      "Walking away without"
   ],
   "correctAnswer": 1,
   "explanation": "Active listening and empathy help validate",
   "category": "Legal/Ethical"
},
 {
   "id": 396,
   "question": "When is physical restraint of a patient justified?",
   "options": [
      "Whenever the",
      "When the patient",
      "For all psychiatric",
      "Only for elderly"
   ],
   "correctAnswer": 1,
   "explanation": "Physical restraint is justified only when",
   "category": "Legal/Ethical"
},
 {
   "id": 397,
   "question": "What is the appropriate documentation when",
   "options": [
      "No documentation",
      "Document the reason",
      "Only the patient's",
      "Only the time of"
   ],
   "correctAnswer": 1,
   "explanation": "Complete documentation includes the",
   "category": "Legal/Ethical"
},
 {
   "id": 398,
   "question": "What is the legal concept of 'implied consent' in",
   "options": [
      "Patient verbally",
      "Consent assumed for",
      "Consent from a minor",
      "Consent given in"
   ],
   "correctAnswer": 1,
   "explanation": "Implied consent allows EMS providers to",
   "category": "Legal/Ethical"
},
 {
   "id": 399,
   "question": "What is 'expressed consent'?",
   "options": [
      "Consent implied by",
      "Verbal or written",
      "Consent from a family",
      "Consent from a police"
   ],
   "correctAnswer": 1,
   "explanation": "Expressed consent is explicitly given by a",
   "category": "Legal/Ethical"
},
 {
   "id": 400,
   "question": "What should an EMS provider do if a competent",
   "options": [
      "Treat the patient",
      "Respect the refusal,",
      "Call the police to",
      "Restrain the patient"
   ],
   "correctAnswer": 1,
   "explanation": "Competent adults have the right to refuse",
   "category": "Legal/Ethical"
},
 {
   "id": 401,
   "question": "What is the correct first aid for a minor superficial",
   "options": [
      "Apply butter or oil",
      "Cool the burn with",
      "Apply ice directly",
      "Pop any blisters"
   ],
   "correctAnswer": 1,
   "explanation": "Cooling with running cool water for at",
   "category": "First Aid"
},
 {
   "id": 402,
   "question": "In managing epistaxis (nosebleed), which action is",
   "options": [
      "Tilt the head",
      "Pinch the soft part of",
      "Lie the patient flat on",
      "Insert tissue deep into"
   ],
   "correctAnswer": 1,
   "explanation": "Pinching the soft nose while leaning",
   "category": "First Aid"
},
 {
   "id": 403,
   "question": "What is the correct first aid for a choking adult who",
   "options": [
      "Give water",
      "Perform abdominal",
      "Slap the back while",
      "Wait for the object to"
   ],
   "correctAnswer": 1,
   "explanation": "Abdominal thrusts (Heimlich maneuver)",
   "category": "First Aid"
},
 {
   "id": 404,
   "question": "What is the correct first aid for a suspected",
   "options": [
      "Attempt to realign the",
      "Immobilize the injured",
      "Apply a tight bandage",
      "Massage the area"
   ],
   "correctAnswer": 1,
   "explanation": "Suspected fractures should be",
   "category": "First Aid"
},
 {
   "id": 405,
   "question": "What is the correct management for a snake bite?",
   "options": [
      "Apply a tourniquet",
      "Keep the patient calm",
      "Suck out the venom",
      "Apply ice directly to"
   ],
   "correctAnswer": 1,
   "explanation": "Keep the patient calm and still to slow",
   "category": "First Aid"
},
 {
   "id": 406,
   "question": "What is the RICE method for treating sprains?",
   "options": [
      "Rest, Ice,",
      "Rest, Immobilize,",
      "Run, Ice, Carry,",
      "Rest, Inspect,"
   ],
   "correctAnswer": 0,
   "explanation": "RICE stands for Rest, Ice, Compression,",
   "category": "First Aid"
},
 {
   "id": 407,
   "question": "What is the correct management for an impaled",
   "options": [
      "Remove the object",
      "Stabilize the object in",
      "Push the object",
      "Cut the object short"
   ],
   "correctAnswer": 1,
   "explanation": "Impaled objects should be stabilized in",
   "category": "First Aid"
},
 {
   "id": 408,
   "question": "What is the correct first aid for a seizure?",
   "options": [
      "Restrain the patient",
      "Protect the patient",
      "Hold the patient down",
      "Pour water on the"
   ],
   "correctAnswer": 1,
   "explanation": "During a seizure, protect the patient from",
   "category": "First Aid"
},
 {
   "id": 409,
   "question": "What is the correct first aid for a dog bite?",
   "options": [
      "Apply a tourniquet",
      "Wash the wound with",
      "Ignore the bite",
      "Apply butter to the"
   ],
   "correctAnswer": 1,
   "explanation": "Dog bites should be washed with soap",
   "category": "First Aid"
},
 {
   "id": 410,
   "question": "What is the correct management for a chemical",
   "options": [
      "Apply a bandage",
      "Flush with copious",
      "Apply butter",
      "Rub the area"
   ],
   "correctAnswer": 1,
   "explanation": "Chemical burns require immediate and",
   "category": "First Aid"
},
 {
   "id": 411,
   "question": "What is the correct first aid for an insect sting?",
   "options": [
      "Squeeze the sting",
      "Remove the stinger",
      "Apply heat",
      "Ignore it"
   ],
   "correctAnswer": 1,
   "explanation": "Scrape the stinger away (not squeeze),",
   "category": "First Aid"
},
 {
   "id": 412,
   "question": "What are the signs of a closed fracture?",
   "options": [
      "Bone protruding through the skin",
      "Swelling, deformity, pain, and crepitus without an open wound",
      "No pain or swelling",
      "Bleeding only"
   ],
   "correctAnswer": 1,
   "explanation": "A closed fracture presents with swelling, deformity, pain, tenderness, and crepitus at the injury site without the bone protruding through the skin.",
   "category": "Trauma"
},
 {
   "id": 413,
   "question": "What is an open fracture?",
   "options": [
      "A fracture with no",
      "A fracture where the",
      "A dislocated joint",
      "A muscle tear"
   ],
   "correctAnswer": 1,
   "explanation": "An open (compound) fracture involves a",
   "category": "First Aid"
},
 {
   "id": 414,
   "question": "What is the primary goal of maintaining high patient",
   "options": [
      "To receive awards",
      "To ensure quality",
      "To complete",
      "To compete with"
   ],
   "correctAnswer": 1,
   "explanation": "High patient service standards ensure",
   "category": "Patient Assessment"
},
 {
   "id": 415,
   "question": "What is patient confidentiality?",
   "options": [
      "Sharing patient",
      "Protecting patient",
      "Discussing patients",
      "Telling family"
   ],
   "correctAnswer": 1,
   "explanation": "Patient confidentiality means protecting",
   "category": "Patient Assessment"
},
 {
   "id": 416,
   "question": "What is informed consent?",
   "options": [
      "Consent obtained",
      "Permission given",
      "Consent from a minor",
      "Consent without any"
   ],
   "correctAnswer": 1,
   "explanation": "Informed consent requires that the patient",
   "category": "Patient Assessment"
},
 {
   "id": 417,
   "question": "What is the patient's bill of rights?",
   "options": [
      "A list of rules patients",
      "A set of guarantees",
      "A billing statement",
      "A list of hospital"
   ],
   "correctAnswer": 1,
   "explanation": "The patient's bill of rights guarantees",
   "category": "Patient Assessment"
},
 {
   "id": 418,
   "question": "Which best describes effective workplace",
   "options": [
      "Giving orders without",
      "Gathering, conveying,",
      "Communicating only",
      "Sharing personal"
   ],
   "correctAnswer": 1,
   "explanation": "Effective workplace communication",
   "category": "AMATS"
},
 {
   "id": 419,
   "question": "What is the purpose of a shift change briefing?",
   "options": [
      "To socialize with",
      "To transfer critical",
      "To count inventory",
      "To assign parking"
   ],
   "correctAnswer": 1,
   "explanation": "Shift change briefings transfer essential",
   "category": "AMATS"
},
 {
   "id": 420,
   "question": "What is active listening?",
   "options": [
      "Hearing what someone says without responding",
      "Fully concentrating on what is being said, understanding, responding, and remembering",
      "Interrupting the speaker with questions",
      "Multitasking while someone is talking"
   ],
   "correctAnswer": 1,
   "explanation": "Active listening involves fully concentrating on the speaker, understanding their message, responding appropriately, and remembering what was said for effective communication.",
   "category": "AMATS"
},
 {
   "id": 421,
   "question": "Why is accurate documentation important in EMS?",
   "options": [
      "To fill time during",
      "To provide a legal",
      "Only for billing",
      "To count the number"
   ],
   "correctAnswer": 1,
   "explanation": "Accurate documentation provides a legal",
   "category": "AMATS"
},
 {
   "id": 422,
   "question": "What is the purpose of a written incident report?",
   "options": [
      "To assign blame",
      "To document facts",
      "To create publicity",
      "To count the number"
   ],
   "correctAnswer": 1,
   "explanation": "Incident reports document factual details",
   "category": "AMATS"
},
 {
   "id": 423,
   "question": "What is the key benefit of effective teamwork in",
   "options": [
      "Individual recognition",
      "Improved patient",
      "Reduced need for",
      "Elimination of"
   ],
   "correctAnswer": 1,
   "explanation": "Effective teamwork ensures coordinated,",
   "category": "AMATS"
},
 {
   "id": 424,
   "question": "What is a 'crew resource management' (CRM)",
   "options": [
      "Managing the",
      "Using all available",
      "Managing patient",
      "Assigning tasks"
   ],
   "correctAnswer": 1,
   "explanation": "CRM utilizes all available resources  ",
   "category": "AMATS"
},
 {
   "id": 425,
   "question": "What is the role of a team leader during an",
   "options": [
      "To do all tasks alone",
      "To direct and",
      "To delegate all tasks",
      "To drive the"
   ],
   "correctAnswer": 1,
   "explanation": "The team leader directs and coordinates",
   "category": "AMATS"
},
 {
   "id": 426,
   "question": "What is constructive feedback?",
   "options": [
      "Criticizing a colleague",
      "Specific, actionable",
      "Ignoring mistakes",
      "Only positive"
   ],
   "correctAnswer": 1,
   "explanation": "Constructive feedback provides specific,",
   "category": "AMATS"
},
 {
   "id": 427,
   "question": "What is the purpose of a post-call debriefing?",
   "options": [
      "To gossip about the",
      "To review the call,",
      "To assign blame for",
      "To plan social"
   ],
   "correctAnswer": 1,
   "explanation": "Post-call debriefing is a structured review",
   "category": "AMATS"
},
 {
   "id": 428,
   "question": "Which action best demonstrates career",
   "options": [
      "Arriving late for shifts",
      "Setting work priorities",
      "Refusing tasks",
      "Gossiping about"
   ],
   "correctAnswer": 1,
   "explanation": "Professionalism involves setting priorities,",
   "category": "Legal/Ethical"
},
 {
   "id": 429,
   "question": "What is the purpose of continuing education in",
   "options": [
      "To earn more money",
      "To maintain and",
      "To avoid working",
      "To become a doctor"
   ],
   "correctAnswer": 1,
   "explanation": "Continuing education ensures EMS",
   "category": "Legal/Ethical"
},
 {
   "id": 430,
   "question": "What is ethical behavior in EMS?",
   "options": [
      "Treating patients",
      "Adhering to moral",
      "Accepting gifts from",
      "Sharing patient"
   ],
   "correctAnswer": 1,
   "explanation": "Ethical behavior in EMS requires honesty,",
   "category": "Legal/Ethical"
},
 {
   "id": 431,
   "question": "What is the purpose of a code of ethics in EMS?",
   "options": [
      "To create rules for",
      "To provide a",
      "To increase",
      "To reduce the"
   ],
   "correctAnswer": 1,
   "explanation": "A code of ethics establishes professional",
   "category": "Legal/Ethical"
},
 {
   "id": 432,
   "question": "What is stress management important for in EMS?",
   "options": [
      "Only for personal",
      "Preventing burnout,",
      "To avoid work",
      "To get more vacation"
   ],
   "correctAnswer": 1,
   "explanation": "Stress management prevents burnout,",
   "category": "Legal/Ethical"
},
 {
   "id": 433,
   "question": "What is the purpose of a post-incident analysis?",
   "options": [
      "To assign blame for mistakes",
      "To review the incident response and identify areas for improvement",
      "To increase workload",
      "To document patient information only"
   ],
   "correctAnswer": 1,
   "explanation": "A post-incident analysis reviews the response to identify what went well and what could be improved, enhancing future performance without assigning blame.",
   "category": "AMATS"
},
 {
   "id": 434,
   "question": "What is the purpose of a risk assessment in the",
   "options": [
      "To create more",
      "To identify hazards,",
      "To count the number",
      "To determine salary"
   ],
   "correctAnswer": 1,
   "explanation": "Risk assessment identifies workplace",
   "category": "OSH"
},
 {
   "id": 435,
   "question": "What is the hierarchy of controls for managing",
   "options": [
      "PPE first, then",
      "Elimination,",
      "Administrative",
      "PPE only"
   ],
   "correctAnswer": 1,
   "explanation": "The hierarchy prioritizes elimination (most",
   "category": "OSH"
},
 {
   "id": 436,
   "question": "What is the purpose of Material Safety Data Sheets",
   "options": [
      "To list product prices",
      "To provide",
      "To advertise products",
      "To record employee"
   ],
   "correctAnswer": 1,
   "explanation": "MSDS/SDS provides critical information",
   "category": "OSH"
},
 {
   "id": 437,
   "question": "What is the correct action if an EMS provider",
   "options": [
      "Ignore it",
      "Report it immediately",
      "Wait for the next",
      "Only report if"
   ],
   "correctAnswer": 1,
   "explanation": "Newly identified hazards must be reported",
   "category": "OSH"
}
]