export interface Question {
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
    | "Ambulance Management"
    | "Radio Communication"
    | "Legal/Ethical"
    | "Drugs"
    | "TESDA Standards";
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the correct compression-to-ventilation ratio for adult CPR?",
    options: [
          "15:2",
          "30:2",
          "30:1",
          "50:2"
    ],
    correctAnswer: 1,
    explanation: "The standard adult CPR ratio for a single rescuer is 30:2, meaning 30 chest compressions followed by 2 breaths, as recommended by AHA guidelines.",
    category: "BLS/CPR",
  },
  {
    id: 2,
    question: "When operating an AED, after the device analyzes the heart rhythm, what should the rescuer do if a shock is advised?",
    options: [
          "Immediately press the shock button",
          "Resume chest compressions",
          "Ensure no one is touching the patient",
          "Remove the AED pads"
    ],
    correctAnswer: 2,
    explanation: "Before delivering a shock, the rescuer must ensure no one is touching the patient to prevent injury to themselves or others.",
    category: "BLS/CPR",
  },
  {
    id: 3,
    question: "What is the recommended depth of chest compressions for adults?",
    options: [
          "1 to 2 inches",
          "At least 2 inches (5 cm)",
          "3 to 4 inches",
          "0.5 inches"
    ],
    correctAnswer: 1,
    explanation: "AHA guidelines recommend at least 2 inches (5 cm) of compression depth for adults to effectively circulate blood.",
    category: "BLS/CPR",
  },
  {
    id: 4,
    question: "What is the correct compression rate for CPR?",
    options: [
          "60-80 compressions per minute",
          "80-100 compressions per minute",
          "100-120 compressions per minute",
          "140-160 compressions per minute"
    ],
    correctAnswer: 2,
    explanation: "The recommended compression rate is 100-120 compressions per minute to maintain adequate blood flow during CPR.",
    category: "BLS/CPR",
  },
  {
    id: 5,
    question: "What is the compression-to-ventilation ratio for two-rescuer adult CPR?",
    options: [
          "15:2",
          "30:2",
          "30:1",
          "50:2"
    ],
    correctAnswer: 1,
    explanation: "For two-rescuer adult CPR, the ratio is 30:2, with one rescuer performing compressions while the other provides ventilations.",
    category: "BLS/CPR",
  },
  {
    id: 6,
    question: "What is the compression-to-ventilation ratio for two-rescuer child CPR?",
    options: [
          "30:2",
          "15:2",
          "30:1",
          "5:1"
    ],
    correctAnswer: 1,
    explanation: "For two-rescuer CPR on a child, the ratio is 15:2, allowing for more frequent ventilations due to the child's smaller size.",
    category: "BLS/CPR",
  },
  {
    id: 7,
    question: "During CPR, what is the maximum allowable interruption time for chest compressions?",
    options: [
          "30 seconds",
          "20 seconds",
          "10 seconds",
          "60 seconds"
    ],
    correctAnswer: 2,
    explanation: "Interruptions to chest compressions should not exceed 10 seconds to minimize interruptions in blood flow to vital organs.",
    category: "BLS/CPR",
  },
  {
    id: 8,
    question: "After placing AED pads on a patient, what is the next step?",
    options: [
          "Delivers a shock automatically",
          "Analyzes the heart rhythm",
          "Charges the capacitor",
          "Records the ECG"
    ],
    correctAnswer: 1,
    explanation: "Once pads are placed, the AED will analyze the heart rhythm to determine if a shock is needed.",
    category: "BLS/CPR",
  },
  {
    id: 9,
    question: "Which heart rhythm is most commonly associated with sudden cardiac arrest?",
    options: [
          "Asystole",
          "Ventricular fibrillation",
          "Pulseless electrical activity",
          "Sinus bradycardia"
    ],
    correctAnswer: 1,
    explanation: "Ventricular fibrillation (VF) is the most common initial heart rhythm in witnessed sudden cardiac arrest cases.",
    category: "BLS/CPR",
  },
  {
    id: 10,
    question: "What is the correct hand placement for chest compressions on an adult?",
    options: [
          "Upper third of the sternum",
          "Lower half of the sternum",
          "Over the xiphoid process",
          "Left side of the chest"
    ],
    correctAnswer: 1,
    explanation: "Compressions should be performed on the lower half of the sternum for effective blood circulation during CPR.",
    category: "BLS/CPR",
  },
  {
    id: 11,
    question: "What should the rescuer allow during chest compressions?",
    options: [
          "Full chest recoil",
          "Partial chest recoil",
          "No recoil is needed",
          "Recoil only every 5 compressions"
    ],
    correctAnswer: 0,
    explanation: "Full chest recoil between compressions allows the heart to refill with blood, improving the effectiveness of subsequent compressions.",
    category: "BLS/CPR",
  },
  {
    id: 12,
    question: "For an infant, what technique is used for chest compressions?",
    options: [
          "Two hands",
          "One hand",
          "Two fingers (thumb-encircling technique)",
          "Heel of one hand"
    ],
    correctAnswer: 2,
    explanation: "For infant CPR, two fingers are placed on the center of the chest just below the nipple line for effective compressions.",
    category: "BLS/CPR",
  },
  {
    id: 13,
    question: "When should the AED be used on a pediatric patient?",
    options: [
          "Only if the child is over 8 years old",
          "When pediatric pads are available",
          "Never on pediatric patients",
          "Only with a physician present"
    ],
    correctAnswer: 1,
    explanation: "AEDs can be used on pediatric patients with pediatric pads or dose attenuator to deliver appropriate energy for smaller bodies.",
    category: "BLS/CPR",
  },
  {
    id: 14,
    question: "What is the first action when checking for breathing and pulse in an unresponsive patient?",
    options: [
          "Check for breathing only, then check pulse separately",
          "Simultaneously check for breathing and pulse for no more than 10 seconds",
          "Check breathing only",
          "Check pupils first"
    ],
    correctAnswer: 1,
    explanation: "Current AHA guidelines recommend simultaneously checking for breathing and pulse for no more than 10 seconds to minimize delays in starting CPR.",
    category: "BLS/CPR",
  },
  {
    id: 15,
    question: "How long should the rescuer take to check for breathing and pulse in an unresponsive adult?",
    options: [
          "At least 30 seconds",
          "5-10 seconds",
          "1-2 seconds",
          "60 seconds"
    ],
    correctAnswer: 1,
    explanation: "Assessment of breathing and pulse should take no more than 5-10 seconds to avoid delaying CPR when it's needed.",
    category: "BLS/CPR",
  },
  {
    id: 16,
    question: "What is the appropriate ventilation volume for an adult patient?",
    options: [
          "500-600 mL per breath",
          "200-300 mL per breath",
          "1000-1200 mL per breath",
          "100 mL per breath"
    ],
    correctAnswer: 0,
    explanation: "Each breath should be about 500-600 mL to avoid overinflation and gastric distension while providing adequate oxygenation.",
    category: "BLS/CPR",
  },
  {
    id: 17,
    question: "What complication can result from excessive ventilation during CPR?",
    options: [
          "Improved oxygenation",
          "Gastric inflation and reduced cardiac output",
          "Increased cardiac perfusion",
          "Better chest recoil"
    ],
    correctAnswer: 1,
    explanation: "Excessive ventilation can cause gastric inflation, which increases intrathoracic pressure and reduces venous return, thereby decreasing cardiac output.",
    category: "BLS/CPR",
  },
  {
    id: 18,
    question: "What does the 'CAB' sequence in BLS stand for?",
    options: [
          "Circulation, Airway, Breathing",
          "Compress, Assess, Breathe",
          "Check Airway, Breathing, Circulation",
          "Cardiac, Assessment, Breathing"
    ],
    correctAnswer: 0,
    explanation: "CAB stands for Circulation, Airway, Breathing, which is the current sequence for BLS according to AHA guidelines, prioritizing chest compressions before airway and breathing.",
    category: "BLS/CPR",
  },
  {
    id: 19,
    question: "If a patient is unresponsive but breathing normally, what should be done?",
    options: [
          "Begin chest compressions immediately",
          "Place the patient in the recovery position",
          "Apply the AED as soon as possible",
          "Perform rescue breathing for 2 minutes"
    ],
    correctAnswer: 1,
    explanation: "An unresponsive patient with normal breathing should be placed in the recovery position to maintain an open airway and prevent aspiration.",
    category: "BLS/CPR",
  },
  {
    id: 20,
    question: "After an AED delivers a shock, what is the next step?",
    options: [
          "Check for a pulse and then resume CPR if needed",
          "Resume chest compressions immediately",
          "Remove the AED and transport the patient",
          "Wait for the AED to analyze again"
    ],
    correctAnswer: 1,
    explanation: "After a shock is delivered, resume chest compressions immediately without checking for a pulse to minimize interruptions in circulation.",
    category: "BLS/CPR",
  },
  {
    id: 21,
    question: "What is the correct jaw-thrust maneuver technique for opening the airway?",
    options: [
          "Tilt the head back and lift the chin",
          "Place fingers behind the angles of the lower jaw and lift",
          "Push down on the forehead and lift the chin",
          "Turn the head to the side and lift the jaw"
    ],
    correctAnswer: 1,
    explanation: "The jaw-thrust maneuver involves placing fingers behind the angles of the lower jaw and lifting it forward without moving the cervical spine.",
    category: "BLS/CPR",
  },
  {
    id: 22,
    question: "What device is used to provide supplemental oxygen ventilation?",
    options: [
          "Nasopharyngeal airway",
          "Bag-valve-mask device",
          "Oropharyngeal airway",
          "Chest decompression needle"
    ],
    correctAnswer: 1,
    explanation: "A bag-valve-mask (BVM) is the primary device used to provide manual ventilation with supplemental oxygen to patients who are not breathing adequately.",
    category: "BLS/CPR",
  },
  {
    id: 23,
    question: "When using a Bag-Valve-Mask (BVM), what is the recommended oxygen flow rate?",
    options: [
          "1-2 liters per minute",
          "10-15 liters per minute",
          "5-6 liters per minute",
          "25-30 liters per minute"
    ],
    correctAnswer: 1,
    explanation: "The BVM should be connected to oxygen at a flow rate of 10-15 liters per minute to ensure adequate oxygen concentration during ventilation.",
    category: "BLS/CPR",
  },
  {
    id: 24,
    question: "Which of the following is a non-shockable rhythm?",
    options: [
          "Ventricular fibrillation",
          "Ventricular tachycardia",
          "Pulseless electrical activity (PEA)",
          "Both A and B"
    ],
    correctAnswer: 2,
    explanation: "Pulseless electrical activity (PEA) is a non-shockable rhythm as it represents organized electrical activity without a detectable pulse.",
    category: "BLS/CPR",
  },
  {
    id: 25,
    question: "What is the purpose of the head-tilt/chin-lift maneuver?",
    options: [
          "To check for cervical spine injuries",
          "To open the airway of an unconscious patient",
          "To perform chest compressions effectively",
          "To deliver rescue breaths properly"
    ],
    correctAnswer: 1,
    explanation: "The head-tilt/chin-lift maneuver opens the airway by positioning the head to allow the tongue to fall forward, preventing obstruction.",
    category: "BLS/CPR",
  },
  {
    id: 26,
    question: "What is the primary purpose of inspecting life support equipment?",
    options: [
          "To comply with department protocols",
          "To ensure all devices are functioning properly",
          "To determine the patient's condition",
          "To assign equipment to team members"
    ],
    correctAnswer: 1,
    explanation: "Equipment inspection ensures that all life support devices are functioning properly and ready for immediate use in emergency situations. Regular checks prevent equipment failure during critical patient care moments and are typically performed at the beginning of each shift.",
    category: "OSH",
  },
  {
    id: 27,
    question: "What should an EMS provider do if a portable suction unit fails during an emergency?",
    options: [
          "Ignore it and proceed without suction",
          "Document the failure and use backup equipment",
          "Wait until end of shift to report the issue",
          "Use it anyway and hope it works"
    ],
    correctAnswer: 1,
    explanation: "Any equipment malfunction must be documented immediately and backup equipment should be used to ensure patient care is not compromised. The defective equipment should be tagged and removed from service until repaired or replaced.",
    category: "OSH",
  },
  {
    id: 28,
    question: "When should the rescuer switch from compression-only CPR to conventional CPR (with rescue breaths)?",
    options: [
          "After 2 minutes of compressions",
          "When an AED becomes available",
          "When a second rescuer arrives and can provide effective rescue breaths",
          "Never switch from compression-only CPR"
    ],
    correctAnswer: 2,
    explanation: "When a second trained rescuer arrives who can provide effective rescue breaths, switch from compression-only CPR to conventional CPR with a 30:2 ratio.",
    category: "BLS/CPR",
  },
  {
    id: 29,
    question: "How should oxygen cylinders be stored?",
    options: [
          "Lying flat on the floor",
          "Upright and secured in a rack",
          "Near heat sources for easier access",
          "In direct sunlight for visibility"
    ],
    correctAnswer: 1,
    explanation: "Oxygen cylinders must be stored upright and secured in a rack to prevent tipping, which could damage the valve or cause the cylinder to become a projectile. They should be kept away from heat sources, flammable materials, and direct sunlight, and stored with valve caps in place when not in use.",
    category: "OSH",
  },
  {
    id: 30,
    question: "What is the function of a pulse oximeter?",
    options: [
          "Measures blood pressure",
          "Measures oxygen saturation in the blood",
          "Measures blood glucose levels",
          "Measures carbon dioxide levels"
    ],
    correctAnswer: 1,
    explanation: "A pulse oximeter non-invasively measures the oxygen saturation (SpO2) level in arterial blood, providing real-time information about a patient's oxygenation status. Normal SpO2 is 94-100%. Readings may be inaccurate with poor perfusion, nail polish, carbon monoxide exposure, or excessive patient movement.",
    category: "OSH",
  },
  {
    id: 31,
    question: "What is the normal SpO2 reading for a healthy adult?",
    options: [
          "80-90%",
          "94-100%",
          "70-80%",
          "50-60%"
    ],
    correctAnswer: 1,
    explanation: "A normal SpO2 reading for a healthy adult is between 94-100%, which indicates adequate oxygen saturation in the blood.",
    category: "BLS/CPR",
  },
  {
    id: 32,
    question: "What component of a Bag-Valve-Mask prevents air from going back into the bag?",
    options: [
          "The reservoir bag",
          "The one-way valve",
          "The oxygen tubing",
          "The pop-off valve"
    ],
    correctAnswer: 1,
    explanation: "The one-way valve in the BVM directs airflow from the bag to the patient while preventing exhaled air from returning to the bag.",
    category: "BLS/CPR",
  },
  {
    id: 33,
    question: "What is the purpose of the pop-off valve on a Bag-Valve-Mask?",
    options: [
          "To increase ventilation pressure",
          "To release excessive pressure during ventilation",
          "To deliver more oxygen to the patient",
          "To keep the mask sealed on the patient's face"
    ],
    correctAnswer: 1,
    explanation: "The pop-off (pressure relief) valve vents excessive pressure during ventilation to prevent barotrauma and lung injury, especially in pediatric patients. It typically activates at 35-45 cmH2O pressure.",
    category: "BLS/CPR",
  },
  {
    id: 34,
    question: "Which suction catheter is most appropriate for adult suctioning?",
    options: [
          "6 Fr",
          "8 Fr",
          "14 Fr",
          "4 Fr"
    ],
    correctAnswer: 2,
    explanation: "A 14 Fr rigid suction catheter (Yankauer) is most appropriate for adult suctioning as it provides adequate diameter for effective removal of secretions. Suction should be applied for no longer than 15 seconds at a time to prevent hypoxia and mucosal damage.",
    category: "OSH",
  },
  {
    id: 35,
    question: "What should be checked on an oxygen regulator before use?",
    options: [
          "The color of the cylinder",
          "The pressure gauge",
          "The manufacturing date and lot number",
          "The serial number"
    ],
    correctAnswer: 1,
    explanation: "The pressure gauge must show adequate pressure (typically at least 500 PSI for a D cylinder) to ensure proper oxygen delivery. A full D cylinder reads approximately 2000 PSI.",
    category: "OSH",
  },
  {
    id: 36,
    question: "What is the purpose of a non-rebreather mask?",
    options: [
          "To deliver low-flow oxygen to the patient",
          "To deliver high-concentration oxygen to the patient",
          "To deliver medication via nebulization",
          "To measure oxygen concentration in the blood"
    ],
    correctAnswer: 1,
    explanation: "A non-rebreather mask with a reservoir delivers high concentrations of oxygen (up to 90-100%) to patients with respiratory distress.",
    category: "BLS/CPR",
  },
  {
    id: 37,
    question: "At what flow rate should a nasal cannula typically be set?",
    options: [
          "10-15 L/min",
          "1-6 L/min",
          "8-10 L/min",
          "15-20 L/min"
    ],
    correctAnswer: 1,
    explanation: "A nasal cannula is typically set at 1-6 L/min to deliver low-flow oxygen concentrations (24-44%) to patients.",
    category: "BLS/CPR",
  },
  {
    id: 38,
    question: "What percentage of oxygen does a simple face mask deliver?",
    options: [
          "24-28%",
          "40-60%",
          "80-90%",
          "100%"
    ],
    correctAnswer: 1,
    explanation: "A simple face mask at 6-10 L/min delivers 40-60% oxygen concentration to patients with mild respiratory distress.",
    category: "BLS/CPR",
  },
  {
    id: 39,
    question: "What is the minimum number of AED pads that should be carried on an ambulance?",
    options: [
          "One set",
          "Two sets (adult and pediatric)",
          "Five sets",
          "None required"
    ],
    correctAnswer: 1,
    explanation: "Ambulances should carry at least two sets of AED pads (adult and pediatric) to accommodate different patient sizes.",
    category: "BLS/CPR",
  },
  {
    id: 40,
    question: "What is the purpose of a cervical collar in the EMS setting?",
    options: [
          "To treat neck pain and muscle spasms",
          "To immobilize the cervical spine",
          "To support the head during transport",
          "To keep the patient warm and comfortable"
    ],
    correctAnswer: 1,
    explanation: "A cervical collar immobilizes the cervical spine to prevent further injury in patients with suspected spinal trauma. It should be properly sized and applied while maintaining manual stabilization. Note: a cervical collar alone does NOT provide complete spinal immobilization — it must be used with a backboard and head immobilizer.",
    category: "Trauma",
  },
  {
    id: 41,
    question: "What is the function of a Kendrick Extrication Device (KED)?",
    options: [
          "To transport a patient over rough terrain",
          "To immobilize a seated patient with suspected spinal injuries",
          "To deliver oxygen supplementation to the patient",
          "To measure vital signs continuously"
    ],
    correctAnswer: 1,
    explanation: "The KED is a vest-type device designed to immobilize a seated patient with suspected spinal injuries during extrication from vehicles. It wraps around the torso, head, and chin, providing lateral support. It includes straps for the torso, legs, and head to maintain spinal alignment during removal.",
    category: "Trauma",
  },
  {
    id: 42,
    question: "How often should ambulance equipment be checked?",
    options: [
          "Weekly only",
          "At the beginning of each shift",
          "Monthly only",
          "Only after each call"
    ],
    correctAnswer: 1,
    explanation: "Equipment must be checked at the beginning of each shift to ensure it is functioning properly and available for patient care. Any discrepancies should be documented and corrected before the unit is placed in service.",
    category: "OSH",
  },
  {
    id: 43,
    question: "What does the acronym 'PASS' stand for when using a fire extinguisher?",
    options: [
          "Pull, Aim, Squeeze, Sweep",
          "Point, Activate, Squeeze, Sweep",
          "Pull, Adjust, Squeeze, Sweep",
          "Push, Aim, Squeeze, Sweep"
    ],
    correctAnswer: 0,
    explanation: "PASS stands for Pull the pin, Aim at the base of the fire, Squeeze the lever, and Sweep from side to side. EMS providers should know this technique for workplace fire safety, as fire extinguishers are standard equipment on ambulances.",
    category: "OSH",
  },
  {
    id: 44,
    question: "What is the purpose of a cervical immobilization device (CID)?",
    options: [
          "To secure the patient's head to the backboard",
          "To prevent lateral movement of the head",
          "To elevate the patient's head for comfort",
          "To measure cervical range of motion"
    ],
    correctAnswer: 1,
    explanation: "A CID (cervical immobilization device or head immobilizer) prevents lateral movement of the head when used with a backboard to maintain spinal alignment. It typically consists of foam blocks and straps that secure the head bilaterally and is used in combination with a cervical collar for complete spinal immobilization.",
    category: "Trauma",
  },
  {
    id: 45,
    question: "Which equipment documentation must be maintained by EMS providers?",
    options: [
          "Only purchase receipts and invoices",
          "Equipment check logs and maintenance records",
          "Only the patient's name and address",
          "No documentation is required"
    ],
    correctAnswer: 1,
    explanation: "EMS providers must maintain equipment check logs and maintenance records to ensure all equipment is functioning properly and meets regulatory standards. This documentation serves as legal proof of compliance and helps track equipment lifecycle and replacement schedules.",
    category: "OSH",
  },
  {
    id: 46,
    question: "What is the first priority when arriving at a motor vehicle accident?",
    options: [
          "Immediately remove the patient from the vehicle",
          "Establish scene safety",
          "Administer oxygen to the patient",
          "Contact the receiving hospital"
    ],
    correctAnswer: 1,
    explanation: "Scene safety is always the first priority. Rescuers must ensure the environment is safe before approaching any patient to prevent becoming victims themselves.",
    category: "Trauma",
  },
  {
    id: 47,
    question: "Which device is most appropriate for cervical spine immobilization?",
    options: [
          "Soft cervical collar",
          "Rigid cervical collar",
          "Cervical traction",
          "Pelvic binder"
    ],
    correctAnswer: 1,
    explanation: "A rigid cervical collar provides necessary immobilization of the cervical spine to prevent further injury in trauma patients.",
    category: "Trauma",
  },
  {
    id: 48,
    question: "What is the purpose of the rapid extrication technique?",
    options: [
          "To quickly move a patient from a dangerous scene",
          "To save time on all patient movements",
          "To avoid using specialized equipment",
          "To practice teamwork among rescuers"
    ],
    correctAnswer: 0,
    explanation: "Rapid extrication is used when the scene is unsafe and immediate patient removal is necessary to prevent further harm.",
    category: "Trauma",
  },
  {
    id: 49,
    question: "When should a patient be extricated using a long spine board?",
    options: [
          "Only for patients with spinal injuries",
          "When spinal injury is suspected or confirmed",
          "For all patients requiring transport",
          "Only for unconscious patients"
    ],
    correctAnswer: 1,
    explanation: "A long spine board is used for extrication when spinal injury is suspected or confirmed to maintain spinal alignment during movement.",
    category: "Trauma",
  },
  {
    id: 50,
    question: "What is the correct technique for log-rolling a patient?",
    options: [
          "One rescuer pulls the patient while others push",
          "Multiple rescuers should coordinate to roll the patient as a unit",
          "The patient rolls independently with minimal assistance",
          "Only the torso is rotated while the head remains stationary"
    ],
    correctAnswer: 1,
    explanation: "Log-rolling requires multiple rescuers to coordinate movement as a unit to maintain spinal alignment during position changes.",
    category: "Trauma",
  },
  {
    id: 51,
    question: "What is the minimum number of rescuers needed for a proper log-roll?",
    options: [
          "One",
          "Two",
          "Three",
          "Five"
    ],
    correctAnswer: 2,
    explanation: "At least three rescuers are needed: one at the head to maintain cervical alignment, one at the torso, and one at the legs to ensure coordinated movement.",
    category: "Trauma",
  },
  {
    id: 52,
    question: "What hazard should be assessed first at a vehicle accident scene?",
    options: [
          "Vehicle color",
          "Traffic and oncoming vehicles",
          "Patient's insurance information",
          "Weather forecast"
    ],
    correctAnswer: 1,
    explanation: "Traffic and oncoming vehicles pose an immediate threat to rescuer safety and must be addressed before patient care can begin.",
    category: "Trauma",
  },
  {
    id: 53,
    question: "What does the term 'golden hour' refer to in trauma care?",
    options: [
          "The first 60 minutes after injury",
          "The shift change for EMS personnel",
          "The time of day with most trauma calls",
          "The duration of a trauma patient's hospital stay"
    ],
    correctAnswer: 0,
    explanation: "The golden hour refers to the critical first 60 minutes after injury when prompt medical intervention can significantly improve patient outcomes.",
    category: "Trauma",
  },
  {
    id: 54,
    question: "Which of the following is a late sign of hemorrhagic shock?",
    options: [
          "Anxiety and restlessness",
          "Hypotension",
          "Tachycardia",
          "Pale, cool, clammy skin"
    ],
    correctAnswer: 1,
    explanation: "Hypotension is a late sign of hemorrhagic shock, typically indicating 30-40% or greater blood volume loss. The body compensates initially with tachycardia and vasoconstriction, maintaining blood pressure until significant blood volume is lost. Early signs include anxiety, tachycardia, and pale cool skin; late signs include hypotension, altered mental status, and weak pulses.",
    category: "Trauma",
  },
  {
    id: 55,
    question: "What type of vehicle hazard requires immediate attention?",
    options: [
          "A flat tire",
          "Leaking fuel with risk of explosion",
          "A broken windshield",
          "An open door"
    ],
    correctAnswer: 1,
    explanation: "Leaking fuel with a risk of fire is a life-threatening hazard that must be addressed immediately before patient care can begin.",
    category: "Trauma",
  },
  {
    id: 56,
    question: "What is the purpose of stabilizing a vehicle before extrication?",
    options: [
          "To make the vehicle look more organized",
          "To prevent the vehicle from moving during patient removal",
          "To access the trunk for additional supplies",
          "To turn off the engine safely"
    ],
    correctAnswer: 1,
    explanation: "Vehicle stabilization prevents unexpected movement that could injure the patient or rescuers during extrication procedures.",
    category: "Trauma",
  },
  {
    id: 57,
    question: "When using a stair chair, the patient should be positioned how?",
    options: [
          "Facing backward",
          "Facing forward in a seated position",
          "Lying flat",
          "Standing upright"
    ],
    correctAnswer: 1,
    explanation: "A stair chair is designed for a seated patient to maintain stability and prevent falls during stair descent.",
    category: "Trauma",
  },
  {
    id: 58,
    question: "What is the primary concern when extricating a patient from water?",
    options: [
          "Getting the patient to shore quickly",
          "Maintaining spinal immobilization",
          "Finding the patient's personal belongings",
          "Swimming speed of the rescuers"
    ],
    correctAnswer: 1,
    explanation: "When extricating from water, spinal immobilization is critical as water-related trauma can include spinal injuries that may be worsened by improper movement.",
    category: "Trauma",
  },
  {
    id: 59,
    question: "What is the recommended method for moving a patient with suspected spinal injury?",
    options: [
          "Log-roll the patient manually",
          "Use a scoop stretcher",
          "Have the patient walk with assistance",
          "Drag the patient by the clothing"
    ],
    correctAnswer: 1,
    explanation: "A scoop stretcher minimizes movement of the spine by allowing the patient to be transferred in a divided device that can be assembled around them.",
    category: "Trauma",
  },
  {
    id: 60,
    question: "What PPE should rescuers wear during vehicle extrication?",
    options: [
          "Only gloves",
          "Full PPE including helmet, eye protection, and gloves",
          "Casual clothing with reflective vest",
          "Only a reflective vest"
    ],
    correctAnswer: 1,
    explanation: "Full PPE including helmet, eye protection, and gloves is essential during vehicle extrication to protect against flying debris, chemicals, and other hazards.",
    category: "Trauma",
  },
  {
    id: 61,
    question: "What is the correct position for the rescuer at the head of a patient performing CPR?",
    options: [
          "Standing beside the patient",
          "Kneeling behind the patient's head",
          "Sitting on the patient's chest",
          "Holding the patient's shoulders"
    ],
    correctAnswer: 1,
    explanation: "The rescuer kneels behind the patient's head to maintain proper alignment and leverage for effective chest compressions during CPR.",
    category: "BLS/CPR",
  },
  {
    id: 62,
    question: "When is it acceptable to remove a motorcycle helmet from a patient?",
    options: [
          "Never",
          "When it interferes with patient care or airway management",
          "Always, immediately upon arrival",
          "Only if the patient is conscious"
    ],
    correctAnswer: 1,
    explanation: "A helmet should be removed when it interferes with patient care or airway management, as long as cervical spine precautions are maintained during removal.",
    category: "Trauma",
  },
  {
    id: 63,
    question: "What is the recommended technique for removing a motorcycle helmet?",
    options: [
          "One rescuer pulls it straight up",
          "Two-rescuer technique with manual stabilization",
          "Cut the helmet off with shears",
          "Leave it on and transport with patient"
    ],
    correctAnswer: 1,
    explanation: "A two-rescuer technique ensures spinal stabilization during helmet removal, minimizing the risk of further injury to the cervical spine.",
    category: "Trauma",
  },
  {
    id: 64,
    question: "What is a basket stretcher (Stokes litter) primarily used for?",
    options: [
          "Hospital transport",
          "Moving patients over rough or uneven terrain",
          "Wheelchair transport",
          "Stretching exercises"
    ],
    correctAnswer: 1,
    explanation: "A basket stretcher is designed for moving patients over rough or uneven terrain where standard stretchers would be difficult to maneuver.",
    category: "Trauma",
  },
  {
    id: 65,
    question: "What is the first step in the extrication process?",
    options: [
          "Cutting the roof of the vehicle",
          "Assessing the scene for safety hazards",
          "Removing the patient immediately",
          "Starting an IV line for medication"
    ],
    correctAnswer: 1,
    explanation: "Scene assessment and safety must be established first to identify potential hazards and ensure rescuer safety before proceeding with patient extrication.",
    category: "Trauma",
  },
  {
    id: 66,
    question: "Which type of glass should be managed before extricating a patient from a vehicle?",
    options: [
          "Only the windshield",
          "All broken or unstable glass",
          "No glass",
          "Only the rear window"
    ],
    correctAnswer: 1,
    explanation: "All broken or unstable glass must be carefully removed or secured to prevent additional injury to the patient or rescuers during extrication.",
    category: "Trauma",
  },
  {
    id: 67,
    question: "What is the function of a spring-loaded center punch in vehicle extrication?",
    options: [
          "To measure tire pressure",
          "To break vehicle windows safely",
          "To open the hood",
          "To check the battery"
    ],
    correctAnswer: 1,
    explanation: "A spring-loaded center punch is used to break vehicle windows safely by creating a small hole before shattering the glass, reducing the risk of injury from sharp edges.",
    category: "Trauma",
  },
  {
    id: 68,
    question: "What is the correct body mechanics principle when lifting a patient?",
    options: [
          "Bend at the waist and lift with back muscles",
          "Keep the back straight and bend at the knees",
          "Twist the torso while lifting",
          "Lift with arms only"
    ],
    correctAnswer: 1,
    explanation: "Proper body mechanics require keeping the back straight and bending at the knees to distribute weight evenly and prevent musculoskeletal injuries. Keep the load close to the body, use leg muscles for lifting, avoid twisting while lifting, and communicate with team members before moving.",
    category: "OSH",
  },
  {
    id: 69,
    question: "What is the purpose of the 'power grip' when carrying equipment?",
    options: [
          "To look professional",
          "To maximize grip strength and control",
          "To carry with one hand",
          "To reduce weight"
    ],
    correctAnswer: 1,
    explanation: "The power grip involves gripping the stretcher or equipment with all fingers wrapped around the handle, palm facing down, maximizing grip strength and control while reducing fatigue. This is safer than the pinch grip, which uses only the thumb and fingers and is more prone to slipping.",
    category: "OSH",
  },
  {
    id: 70,
    question: "How many rescuers are minimally required to safely move a patient using a scoop stretcher?",
    options: [
          "One",
          "Two",
          "Four",
          "Six"
    ],
    correctAnswer: 1,
    explanation: "At minimum, two rescuers are required to safely operate a scoop stretcher and maintain proper spinal alignment during patient movement.",
    category: "Trauma",
  },
  {
    id: 71,
    question: "In ambulance dispatch protocols, what does 'resource allocation' refer to?",
    options: [
          "Distributing medical supplies equally",
          "Assigning the appropriate ambulance and crew to each call",
          "Allocating budget for equipment purchases",
          "Dividing patient care responsibilities"
    ],
    correctAnswer: 1,
    explanation: "Resource allocation involves assigning the appropriate ambulance and crew to each call based on the nature and severity of the emergency.",
    category: "AMATS",
  },
  {
    id: 72,
    question: "What is the primary purpose of a dispatch protocol in EMS?",
    options: [
          "To reduce the number of ambulances",
          "To ensure timely and appropriate response to emergencies",
          "To eliminate the need for paramedics",
          "To track fuel consumption"
    ],
    correctAnswer: 1,
    explanation: "Dispatch protocols standardize the response process, ensuring timely and appropriate care based on the nature of each emergency.",
    category: "AMATS",
  },
  {
    id: 73,
    question: "What does the acronym 'START' stand for in mass casualty triage?",
    options: [
          "Simple Triage And Rapid Treatment",
          "Systematic Tracking And Response Time",
          "Standard Treatment And Rapid Transport",
          "Speed, Triage, And Rescue Team"
    ],
    correctAnswer: 0,
    explanation: "START stands for Simple Triage And Rapid Treatment, which is a triage system used to prioritize patients in mass casualty incidents based on their immediate needs.",
    category: "AMATS",
  },
  {
    id: 74,
    question: "What is the purpose of mutual aid agreements between EMS agencies?",
    options: [
          "To compete with each other for patients",
          "To provide assistance during large-scale emergencies",
          "To share employee resources",
          "To reduce the number of ambulances needed"
    ],
    correctAnswer: 1,
    explanation: "Mutual aid agreements allow agencies to provide assistance during large-scale emergencies when local resources are insufficient.",
    category: "AMATS",
  },
  {
    id: 75,
    question: "What is the meaning of 'response time' in EMS?",
    options: [
          "The time taken to assess the patient",
          "The interval from dispatch to arrival at the scene",
          "The time spent on scene providing care",
          "The duration of transport to the hospital"
    ],
    correctAnswer: 1,
    explanation: "Response time is measured from the moment the call is received to when the ambulance arrives at the scene, a key performance indicator in EMS.",
    category: "AMATS",
  },
  {
    id: 76,
    question: "What information should be obtained during an emergency call?",
    options: [
          "Only the caller's name and number",
          "Location, nature of emergency, caller information, and patient condition",
          "Only the address of the emergency",
          "The weather conditions at the scene"
    ],
    correctAnswer: 1,
    explanation: "Call intake must capture location, nature of emergency, caller information, and patient condition to ensure appropriate response and preparation.",
    category: "AMATS",
  },
  {
    id: 77,
    question: "What is the role of the EMS dispatcher?",
    options: [
          "To treat patients at the scene",
          "To receive emergency calls, determine priority, and dispatch appropriate resources",
          "To drive the ambulance",
          "To perform surgery"
    ],
    correctAnswer: 1,
    explanation: "The EMS dispatcher receives emergency calls, determines the priority of the call, and dispatches the appropriate ambulance and crew to the scene.",
    category: "AMATS",
  },
  {
    id: 78,
    question: "What is a 'standing order' in EMS?",
    options: [
          "A permanent schedule for EMS shifts",
          "A preauthorized medical directive that allows EMS personnel to provide specific treatments without direct physician oversight",
          "An order to remain on standby at a specific location",
          "A shift schedule order for ambulance drivers"
    ],
    correctAnswer: 1,
    explanation: "Standing orders are preauthorized medical protocols that allow EMS personnel to provide specific treatments within their scope of practice without requiring direct orders from a physician.",
    category: "AMATS",
  },
  {
    id: 79,
    question: "What is the purpose of an after-action review in EMS operations?",
    options: [
          "To assign blame to individuals involved in an incident",
          "To evaluate the response to an incident and identify areas for improvement",
          "To celebrate successful emergency responses",
          "To complete mandatory documentation requirements"
    ],
    correctAnswer: 1,
    explanation: "An AAR is a structured review process to evaluate the response to an incident, identify strengths and weaknesses, and implement improvements for future operations.",
    category: "AMATS",
  },
  {
    id: 80,
    question: "What is the difference between BLS and ALS in EMS services?",
    options: [
          "BLS units are faster in response time",
          "BLS provides basic life support interventions while ALS provides advanced life support interventions",
          "ALS units cannot transport patients to hospitals",
          "There is no difference between BLS and ALS services"
    ],
    correctAnswer: 1,
    explanation: "BLS units provide basic interventions like CPR and first aid, while ALS units offer advanced interventions such as IV therapy and medication administration.",
    category: "AMATS",
  },
  {
    id: 81,
    question: "What is the role of the incident commander at an emergency scene?",
    options: [
          "To treat the most critical patients first",
          "To oversee all operations and maintain command of the incident",
          "To transport patients to medical facilities",
          "To communicate with the media"
    ],
    correctAnswer: 1,
    explanation: "The incident commander has overall authority and responsibility for all operations at the emergency scene, ensuring a coordinated response.",
    category: "AMATS",
  },
  {
    id: 82,
    question: "What does the term 'staging' mean in EMS operations?",
    options: [
          "Preparing for a specific type of emergency",
          "Holding units at a designated location near the scene until needed",
          "Parking at the hospital emergency department",
          "Returning to the station after completing a call"
    ],
    correctAnswer: 1,
    explanation: "Staging refers to holding ambulances and other resources at a designated location near the scene until they are needed, preventing congestion at the actual incident site.",
    category: "AMATS",
  },
  {
    id: 83,
    question: "What is the function of a treatment sector in an incident command system?",
    options: [
          "To triage patients and determine priority of care",
          "To provide medical treatment to patients after triage",
          "To transport patients to medical facilities",
          "To communicate with other response agencies"
    ],
    correctAnswer: 1,
    explanation: "The treatment sector provides medical care to patients after they have been triaged, organized by the level of care needed.",
    category: "AMATS",
  },
  {
    id: 84,
    question: "What is the recommended staffing minimum for a BLS ambulance?",
    options: [
          "One EMT and one driver",
          "Two EMTs or one EMT and one driver",
          "Three paramedics",
          "One physician and one nurse"
    ],
    correctAnswer: 1,
    explanation: "A BLS ambulance requires at minimum two EMTs or one EMT and one driver to ensure safe operation and patient care.",
    category: "AMATS",
  },
  {
    id: 85,
    question: "What is the meaning of 'turnaround time' in EMS?",
    options: [
          "The time to turn the ambulance around at the hospital",
          "The time from arrival at the hospital to departure for the next call",
          "The time spent at the scene with the patient",
          "The shift duration for EMS personnel"
    ],
    correctAnswer: 1,
    explanation: "Turnaround time is the interval from arrival at the hospital to departure for the next call, which affects system efficiency and availability.",
    category: "AMATS",
  },
  {
    id: 86,
    question: "What is a 'mass casualty incident' (MCI) in EMS?",
    options: [
          "An incident with one patient requiring multiple ambulances",
          "An event where the number of patients exceeds available resources",
          "A routine ambulance call to a nursing home",
          "A hospital code blue for cardiac arrest"
    ],
    correctAnswer: 1,
    explanation: "An MCI is any event where the number of patients exceeds the available resources of the EMS system, requiring special protocols.",
    category: "AMATS",
  },
  {
    id: 87,
    question: "What priority level is typically assigned to a patient with cardiac arrest?",
    options: [
          "Priority 3 (non-urgent)",
          "Priority 1 (life-threatening)",
          "Priority 4 (scheduled)",
          "No priority assigned"
    ],
    correctAnswer: 1,
    explanation: "Priority 1 indicates a life-threatening condition requiring immediate response, such as cardiac arrest.",
    category: "AMATS",
  },
  {
    id: 88,
    question: "What is the purpose of a pre-arrival instruction given by EMS dispatch?",
    options: [
          "To keep the caller on the line until help arrives",
          "To provide the caller with life-saving instructions before EMS arrival",
          "To collect payment information from the caller",
          "To determine the exact location of the emergency"
    ],
    correctAnswer: 1,
    explanation: "Pre-arrival instructions (PAI) guide callers through providing immediate care that can save lives while waiting for EMS to arrive.",
    category: "AMATS",
  },
  {
    id: 89,
    question: "What document outlines the scope of practice for EMS personnel in the Philippines?",
    options: [
          "The ambulance service policy manual",
          "The TESDA Training Regulation for NCII",
          "The hospital emergency department protocols",
          "The driver's license requirements"
    ],
    correctAnswer: 1,
    explanation: "The scope of practice is defined by the TESDA Training Regulation for NCII, which outlines the competencies and limitations for EMS personnel.",
    category: "AMATS",
  },
  {
    id: 90,
    question: "What is the purpose of quality improvement (QI) in EMS?",
    options: [
          "To punish providers who make mistakes",
          "To continuously improve patient care and system efficiency",
          "To increase the number of calls handled per shift",
          "To reduce staff overtime costs"
    ],
    correctAnswer: 1,
    explanation: "QI programs systematically evaluate care delivery to identify opportunities for improvement and ensure optimal patient outcomes.",
    category: "AMATS",
  },
  {
    id: 91,
    question: "When communicating via radio with a hospital, what is the most appropriate approach?",
    options: [
          "Speak as quickly as possible to save time",
          "Use clear, concise, and professional language",
          "Use slang and jargon to sound experienced",
          "Speak in the local dialect for better understanding"
    ],
    correctAnswer: 1,
    explanation: "Radio communication must use clear, concise language to ensure accurate transmission of critical information without misunderstanding.",
    category: "Radio Communication",
  },
  {
    id: 92,
    question: "What information must be included in the patient care report (PCR)?",
    options: [
          "Only the patient's name and address",
          "Patient assessment, treatment provided, changes in condition, and all communications",
          "Only the vital signs",
          "Only the destination hospital"
    ],
    correctAnswer: 1,
    explanation: "A PCR must comprehensively document patient assessment findings, interventions, patient response, and all relevant communications to serve as a legal and medical record.",
    category: "Radio Communication",
  },
  {
    id: 93,
    question: "What does the acronym 'SBAR' stand for in healthcare communication?",
    options: [
          "Situation, Background, Assessment, Recommendation",
          "Symptoms, Body, Actions, Response",
          "Standard, Basic, Advanced, Rescue",
          "Systolic, Blood, Arterial, Rate"
    ],
    correctAnswer: 0,
    explanation: "SBAR is a structured communication framework that stands for Situation, Background, Assessment, and Recommendation, used to ensure clear and concise handoffs.",
    category: "Radio Communication",
  },
  {
    id: 94,
    question: "What is the primary reason for using standardized medical codes in EMS communication?",
    options: [
          "To make reports look more professional",
          "To ensure clear and consistent communication across different agencies",
          "To keep information confidential",
          "To reduce the need for verbal communication"
    ],
    correctAnswer: 1,
    explanation: "Standardized codes ensure consistent, clear communication among healthcare providers and help prevent misunderstandings in emergency situations.",
    category: "Radio Communication",
  },
  {
    id: 95,
    question: "When communicating with a confused or agitated patient, what approach should be taken?",
    options: [
          "Speak loudly and directly to command attention",
          "Use a calm, reassuring tone with simple language",
          "Ignore the patient to avoid agitation",
          "Use medical jargon to demonstrate expertise"
    ],
    correctAnswer: 1,
    explanation: "A calm, reassuring tone with simple language helps reduce patient anxiety and facilitates better understanding and cooperation during treatment.",
    category: "Radio Communication",
  },
  {
    id: 96,
    question: "What is the primary purpose of the patient care report (PCR)?",
    options: [
          "To serve as a billing document for insurance companies",
          "To provide a legal and medical record of the patient encounter and care provided",
          "To track ambulance response times only",
          "To replace verbal handoff communication"
    ],
    correctAnswer: 1,
    explanation: "The primary purpose of the PCR is to provide a comprehensive legal and medical record of the patient encounter, including assessment findings, interventions, patient response, and communications. It serves as a critical document for continuity of care, legal protection, and quality improvement.",
    category: "Radio Communication",
  },
  {
    id: 97,
    question: "What is the purpose of a verbal handoff report in EMS?",
    options: [
          "To delay patient care while discussing details",
          "To communicate essential patient information to receiving providers",
          "To avoid writing a detailed report",
          "To socialize with hospital staff"
    ],
    correctAnswer: 1,
    explanation: "A verbal handoff communicates essential patient information, interventions, and current status to ensure continuity of care.",
    category: "Radio Communication",
  },
  {
    id: 98,
    question: "Which of the following is an example of a closed-loop communication?",
    options: [
          "Giving an order without waiting for response",
          "Repeating back the received message for confirmation",
          "Ignoring the message completely",
          "Writing notes without verbal confirmation"
    ],
    correctAnswer: 1,
    explanation: "Closed-loop communication involves the sender providing information, the receiver acknowledging receipt, and the receiver confirming understanding.",
    category: "Radio Communication",
  },
  {
    id: 99,
    question: "What is the HIPAA regulation regarding patient information disclosure?",
    options: [
          "No restrictions apply to emergency situations",
          "Only the minimum necessary information should be shared",
          "All patient details must be disclosed to all providers",
          "HIPAA does not apply to EMS providers"
    ],
    correctAnswer: 1,
    explanation: "HIPAA (Health Insurance Portability and Accountability Act) requires that only the minimum necessary information be disclosed to ensure patient privacy while allowing for appropriate care. Violations can result in significant fines and legal penalties. EMS providers must protect patient information during verbal reports, written documentation, and radio communications.",
    category: "Legal/Ethical",
  },
  {
    id: 100,
    question: "When should an EMS provider use the term 'copy' in radio communication?",
    options: [
          "To request a repeat of the message",
          "To confirm that a message was received and understood",
          "To end the radio transmission",
          "To request a change in frequency"
    ],
    correctAnswer: 1,
    explanation: "'Copy' is used to confirm that the message was received and understood, ensuring clear communication in radio transmissions.",
    category: "Radio Communication",
  },
  {
    id: 101,
    question: "What is the proper procedure if radio communication is interrupted?",
    options: [
          "Continue speaking louder to overcome the interruption",
          "Stop, identify the interruption, and then resume transmission",
          "Hang up and call back on a different channel",
          "Switch to a personal cell phone for the remainder"
    ],
    correctAnswer: 1,
    explanation: "If interrupted, the provider should stop, identify the interruption, and then resume transmission to ensure complete message delivery.",
    category: "Radio Communication",
  },
  {
    id: 102,
    question: "What is the '10-code' system used for in some EMS communications?",
    options: [
          "Medical diagnosis codes",
          "Brief standardized radio communications",
          "Patient billing codes",
          "Equipment inventory tracking"
    ],
    correctAnswer: 1,
    explanation: "10-codes are standardized numeric codes used for brief radio communications to save time and ensure clarity in transmissions.",
    category: "Radio Communication",
  },
  {
    id: 103,
    question: "Why is plain language preferred over 10-codes in modern EMS communication?",
    options: [
          "It is shorter than using codes",
          "It reduces the risk of misinterpretation",
          "It sounds less professional",
          "10-codes are no longer used"
    ],
    correctAnswer: 1,
    explanation: "Plain language is preferred because 10-codes can vary between agencies and may lead to misinterpretation, risking patient safety.",
    category: "Radio Communication",
  },
  {
    id: 104,
    question: "What is the purpose of documenting all radio communications in the PCR?",
    options: [
          "To fill space in the report",
          "To create a legal record of all communications",
          "To test the radio equipment",
          "To count the number of radio calls"
    ],
    correctAnswer: 1,
    explanation: "Documenting all radio communications creates a legal record that can be referenced for treatment decisions and quality improvement purposes.",
    category: "Radio Communication",
  },
  {
    id: 105,
    question: "When giving a patient report, what should be included about the patient's mental status?",
    options: [
          "Only whether the patient is awake or asleep",
          "Level of consciousness and orientation using AVPU scale",
          "The patient's mood and personality traits",
          "Whether the patient is cooperative or not"
    ],
    correctAnswer: 1,
    explanation: "Mental status should be reported using a standardized scale like AVPU to provide objective information about the patient's neurological status.",
    category: "Radio Communication",
  },
  {
    id: 106,
    question: "What does AVPU stand for in patient assessment?",
    options: [
          "Airway, Ventilation, Perfusion",
          "Alert, Verbal, Pain, Unresponsive",
          "Assessment, Vital, Pulse, Unresponsive",
          "Airway, Voice, Pulse, Unresponsive"
    ],
    correctAnswer: 1,
    explanation: "AVPU is a simplified mental status assessment scale used in emergency medicine to quickly determine a patient's level of consciousness. Alert = patient is awake and responsive; Verbal = responds to voice; Pain = responds only to painful stimuli; Unresponsive = no response to any stimulus. A patient at 'P' or 'U' requires immediate airway management.",
    category: "Patient Assessment",
  },
  {
    id: 107,
    question: "How should an EMS provider communicate with a pediatric patient?",
    options: [
          "Use the same terminology as with adults",
          "Use age-appropriate language and explanations",
          "Ignore the child and speak only to the parents",
          "Use medical jargon to sound professional"
    ],
    correctAnswer: 1,
    explanation: "Pediatric communication requires age-appropriate language and explanations to ensure understanding and reduce anxiety in young patients.",
    category: "Radio Communication",
  },
  {
    id: 108,
    question: "What is the purpose of a 'patch' call in EMS radio communication?",
    options: [
          "To repair the radio equipment",
          "To connect with a medical control physician",
          "To change radio channels",
          "To test the antenna strength"
    ],
    correctAnswer: 1,
    explanation: "A patch call connects the EMS provider directly with a medical control physician for consultation and orders during patient care.",
    category: "Radio Communication",
  },
  {
    id: 109,
    question: "What is 'off-line medical direction' in EMS?",
    options: [
          "Physician is not available for consultation",
          "Standing orders and protocols that guide treatment",
          "No medical oversight for emergency care",
          "Communication by written instructions only"
    ],
    correctAnswer: 1,
    explanation: "Off-line (indirect) medical direction refers to standing orders and protocols that guide treatment when a physician is not directly available for real-time consultation.",
    category: "Radio Communication",
  },
  {
    id: 110,
    question: "What should an EMS provider do if they disagree with a medical order?",
    options: [
          "Ignore the order and proceed differently",
          "Clarify the order respectfully with the physician",
          "Follow the order without question",
          "File a lawsuit against the medical director"
    ],
    correctAnswer: 1,
    explanation: "Providers should respectfully clarify the order with the physician while maintaining professional communication to ensure proper patient care.",
    category: "Radio Communication",
  },
  {
    id: 111,
    question: "In a mass casualty incident, which triage category has the highest priority?",
    options: [
          "Green (Minor)",
          "Yellow (Delayed)",
          "Red (Immediate)",
          "Black (Expectant)"
    ],
    correctAnswer: 2,
    explanation: "Red-tagged patients have life-threatening injuries that require immediate intervention to survive, making them the highest priority in triage.",
    category: "AMATS",
  },
  {
    id: 112,
    question: "What is the primary purpose of hazard assessment in EMS?",
    options: [
          "To determine the cost of the emergency response",
          "To identify potential risks to providers and patients",
          "To write a report for insurance purposes",
          "To identify witnesses to the incident"
    ],
    correctAnswer: 1,
    explanation: "Hazard assessment identifies risks such as traffic hazards, structural instability, or hazardous materials that could endanger providers or patients.",
    category: "AMATS",
  },
  {
    id: 113,
    question: "What does the 'I' in the Incident Command System stand for?",
    options: [
          "Infection control",
          "Incident command",
          "Intervention strategy",
          "Inspection protocol"
    ],
    correctAnswer: 1,
    explanation: "ICS stands for Incident Command System, a standardized management system used to manage emergency response operations.",
    category: "AMATS",
  },
  {
    id: 114,
    question: "What is the first step in the START triage process?",
    options: [
          "Treat all injuries immediately",
          "Assess all patients for ambulation",
          "Start IV lines for critical patients",
          "Transport the most injured patients first"
    ],
    correctAnswer: 1,
    explanation: "The first step in START triage is to assess all patients for ambulation, as walking patients are typically categorized as minor injuries.",
    category: "AMATS",
  },
  {
    id: 115,
    question: "In START triage, what is the respiratory rate threshold for immediate red tag?",
    options: [
          "Less than 10 breaths per minute",
          "Greater than 30 breaths per minute",
          "12-20 breaths per minute",
          "Exactly 16 breaths per minute"
    ],
    correctAnswer: 1,
    explanation: "In START triage, a respiratory rate greater than 30 breaths per minute indicates respiratory distress and qualifies the patient for an immediate (red tag) priority. Patients with RR > 30 need urgent intervention.",
    category: "AMATS",
  },
  {
    id: 116,
    question: "What color tag is assigned to patients with minor injuries in triage?",
    options: [
          "Red",
          "Yellow",
          "Green",
          "Black"
    ],
    correctAnswer: 2,
    explanation: "Green tags are assigned to walking wounded patients with minor injuries who can wait for treatment or transport.",
    category: "AMATS",
  },
  {
    id: 117,
    question: "What does a black triage tag indicate?",
    options: [
          "Patient needs immediate medical attention",
          "Patient is deceased or has unsurvivable injuries",
          "Patient has minor injuries",
          "Patient is the first to arrive at the scene"
    ],
    correctAnswer: 1,
    explanation: "A black tag indicates the patient is deceased or has unsurvivable injuries and should not receive immediate treatment resources.",
    category: "AMATS",
  },
  {
    id: 118,
    question: "What is the purpose of establishing a command post at an incident?",
    options: [
          "To provide medical treatment to all patients",
          "To centralize command and control of the response",
          "To park ambulances in an organized manner",
          "To treat patients in a designated area"
    ],
    correctAnswer: 1,
    explanation: "A command post centralizes incident management, ensuring coordinated communication and efficient resource allocation during emergencies.",
    category: "AMATS",
  },
  {
    id: 119,
    question: "What is the role of the triage officer at an MCI?",
    options: [
          "To treat patients as they arrive",
          "To rapidly assess and categorize patients by injury severity",
          "To drive ambulances to transport patients",
          "To communicate with family members"
    ],
    correctAnswer: 1,
    explanation: "The triage officer rapidly assesses each patient to determine the priority of care and appropriate resource allocation during mass casualty incidents.",
    category: "AMATS",
  },
  {
    id: 120,
    question: "What is scene control in EMS?",
    options: [
          "Controlling the emotional state of patients",
          "Managing access to the scene and ensuring safety",
          "Controlling the flow of information to the public",
          "Controlling the radio communications"
    ],
    correctAnswer: 1,
    explanation: "Scene control involves managing who enters and exits the emergency scene to ensure safety for providers, patients, and bystanders.",
    category: "AMATS",
  },
  {
    id: 121,
    question: "What is the 'warm zone' in a hazardous materials incident?",
    options: [
          "The area completely free of contamination",
          "The area where decontamination occurs",
          "The area of maximum contamination",
          "The hospital receiving area"
    ],
    correctAnswer: 1,
    explanation: "The warm zone is the contamination control area where decontamination occurs. It is between the hot zone and cold zone, allowing for safe transition of personnel and equipment.",
    category: "AMATS",
  },
  {
    id: 122,
    question: "What is the 'cold zone' in a hazardous materials incident?",
    options: [
          "The area of maximum contamination",
          "The safe area where personnel can operate without PPE",
          "The decontamination area",
          "The area inside the hospital"
    ],
    correctAnswer: 1,
    explanation: "The cold zone is the safe area free from contamination where personnel can operate without specialized protective equipment. It is the command and support area for the incident.",
    category: "AMATS",
  },
  {
    id: 123,
    question: "What is the 'hot zone' in a hazardous materials incident?",
    options: [
          "The area with warm temperatures",
          "The area of maximum contamination",
          "The hospital zone",
          "The patient waiting area"
    ],
    correctAnswer: 1,
    explanation: "The hot zone is the contaminated area where the hazardous material is present. Entry requires specialized protective equipment and is restricted to essential personnel only.",
    category: "AMATS",
  },
  {
    id: 124,
    question: "When should an EMS provider enter a hazardous materials incident scene?",
    options: [
          "Whenever they feel it is necessary",
          "Only with appropriate training and PPE",
          "Only during daylight hours",
          "Never under any circumstances"
    ],
    correctAnswer: 1,
    explanation: "Entry into the hot zone requires appropriate training and proper personal protective equipment. EMS providers must be properly certified and equipped before entering hazardous areas.",
    category: "AMATS",
  },
  {
    id: 125,
    question: "What is the primary goal of scene size-up?",
    options: [
          "To determine patient condition",
          "To identify hazards, ensure scene safety, and determine resource needs",
          "To start treatment immediately",
          "To locate valuables at the scene"
    ],
    correctAnswer: 1,
    explanation: "Scene size-up rapidly identifies hazards, ensures scene safety, and determines resource needs before patient care begins. This assessment guides the entire emergency response process.",
    category: "AMATS",
  },
  {
    id: 126,
    question: "What principle guides the order of patient treatment in mass casualty incidents?",
    options: [
          "First come, first served",
          "Treat the greatest good for the greatest number",
          "Treat the most severely injured first",
          "Treat children first regardless of condition"
    ],
    correctAnswer: 1,
    explanation: "MCI triage prioritizes treating the greatest good for the greatest number, focusing on patients who will benefit most from immediate care to maximize survival rates.",
    category: "AMATS",
  },
  {
    id: 127,
    question: "What is the function of a staging area during an emergency incident?",
    options: [
          "To treat patients immediately",
          "To hold incoming resources until they are assigned to a specific task",
          "To decontaminate patients",
          "To discharge patients from care"
    ],
    correctAnswer: 1,
    explanation: "The staging area holds arriving units and resources in an organized manner, preventing chaos and ensuring resources are deployed efficiently as needed.",
    category: "AMATS",
  },
  {
    id: 128,
    question: "What is the function of a staging area during an MCI?",
    options: [
          "To treat patients",
          "To hold incoming resources until they are assigned to a specific task",
          "To decontaminate patients",
          "To repair vehicles"
    ],
    correctAnswer: 1,
    explanation: "The staging area holds arriving units and resources in an organized manner until the incident commander assigns them to specific tasks or sectors.",
    category: "AMATS",
  },
  {
    id: 129,
    question: "In the JumpSTART pediatric triage system, what is the first assessment performed?",
    options: [
          "Check blood pressure",
          "Assess if the child can walk or follow simple commands",
          "Start an IV",
          "Check pupil response"
    ],
    correctAnswer: 1,
    explanation: "Similar to START, JumpSTART begins by assessing if the child can walk or follow simple commands, which quickly identifies patients who need immediate care.",
    category: "AMATS",
  },
  {
    id: 130,
    question: "What is the purpose of an incident action plan in emergency management?",
    options: [
          "To document the patient's medical history",
          "To outline the objectives, strategies, and tactics for managing the incident",
          "To order food for emergency personnel",
          "To assign parking for vehicles at the scene"
    ],
    correctAnswer: 1,
    explanation: "An IAP documents the incident objectives, strategies, and tactics, providing a clear framework for all responders to follow during the incident.",
    category: "AMATS",
  },
  {
    id: 131,
    question: "What is the minimum PPE required for EMS providers at a motor vehicle crash scene?",
    options: [
          "No PPE is required",
          "Gloves, eye protection, and a face mask",
          "Full hazmat suit",
          "Only a helmet"
    ],
    correctAnswer: 1,
    explanation: "Minimum PPE at a crash scene includes gloves, eye protection, and a face mask to protect against bloodborne pathogens and other potential hazards.",
    category: "OSH",
  },
  {
    id: 132,
    question: "What should an EMS provider do if they discover a secondary hazard at an emergency scene?",
    options: [
          "Attempt to disarm or neutralize the hazard",
          "Immediately evacuate the area and notify the incident commander",
          "Ignore it and continue with patient care",
          "Take a photograph for documentation"
    ],
    correctAnswer: 1,
    explanation: "If a secondary hazard is discovered, EMS providers should immediately evacuate the area and notify the incident commander to ensure everyone's safety.",
    category: "AMATS",
  },
  {
    id: 133,
    question: "What does 'size-up' involve in emergency scene management?",
    options: [
          "Only counting the number of patients",
          "Rapid visual assessment of the scene, hazards, and resources needed",
          "Measuring the exact dimensions of the scene",
          "Interviewing all witnesses before providing care"
    ],
    correctAnswer: 1,
    explanation: "Size-up is a rapid visual assessment that identifies hazards, determines the nature of the emergency, and estimates resources needed before approaching patients.",
    category: "AMATS",
  },
  {
    id: 134,
    question: "What is the role of law enforcement at an EMS emergency scene?",
    options: [
          "To provide medical treatment to patients",
          "To ensure scene safety, control crowds, and manage traffic",
          "To drive the ambulance to the hospital",
          "To perform triage assessments"
    ],
    correctAnswer: 1,
    explanation: "Law enforcement provides scene safety, controls crowds, and manages traffic, creating a secure environment for EMS personnel to provide care.",
    category: "AMATS",
  },
  {
    id: 135,
    question: "What is the principle of 'doing the most good for the most people' in emergency medicine?",
    options: [
          "Routine patient care approach",
          "Mass casualty incident triage principle",
          "Hospital admission protocol",
          "Ambulance dispatch priority system"
    ],
    correctAnswer: 1,
    explanation: "This principle guides MCI triage decisions, ensuring limited resources are used to save the greatest number of lives during large-scale emergencies.",
    category: "AMATS",
  },
  {
    id: 136,
    question: "What is the normal resting heart rate range for a healthy adult?",
    options: [
          "40-60 bpm",
          "60-100 bpm",
          "100-120 bpm",
          "120-140 bpm"
    ],
    correctAnswer: 1,
    explanation: "The normal resting heart rate for a healthy adult is typically between 60-100 beats per minute. This range represents the standard physiological heart rate at rest.",
    category: "Patient Assessment",
  },
  {
    id: 137,
    question: "What does the mnemonic 'SAMPLE' stand for?",
    options: [
          "Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to injury",
          "Size, Age, Medical history, Pain level, Events",
          "Scene safety, Age, Medical history, Last oral intake, Events",
          "Systolic, Airway, Breathing, Circulation, Temperature"
    ],
    correctAnswer: 0,
    explanation: "SAMPLE is a medical history mnemonic used to gather important patient information: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, and Events leading to the injury or illness.",
    category: "Patient Assessment",
  },
  {
    id: 138,
    question: "What is the normal blood pressure range for a healthy adult?",
    options: [
          "80/40 to 90/50 mmHg",
          "90/60 to 120/80 mmHg",
          "140/90 to 160/100 mmHg",
          "160/100 to 180/120 mmHg"
    ],
    correctAnswer: 1,
    explanation: "Normal adult blood pressure is typically 90/60 to 120/80 mmHg. This range is considered optimal for cardiovascular health according to current medical guidelines.",
    category: "Patient Assessment",
  },
  {
    id: 139,
    question: "What is the normal respiratory rate for a healthy adult?",
    options: [
          "6-10 breaths per minute",
          "12-20 breaths per minute",
          "25-35 breaths per minute",
          "35-45 breaths per minute"
    ],
    correctAnswer: 1,
    explanation: "The normal respiratory rate for a healthy adult is 12-20 breaths per minute. This represents the standard number of breaths taken at rest.",
    category: "Patient Assessment",
  },
  {
    id: 140,
    question: "What does the 'P' in the OPQRST mnemonic stand for?",
    options: [
          "Position",
          "Provocation",
          "Pulse",
          "Pressure"
    ],
    correctAnswer: 1,
    explanation: "In OPQRST (pain assessment), P stands for Provocation — asking what makes the pain better or worse helps identify potential causes and aggravating factors.",
    category: "Patient Assessment",
  },
  {
    id: 141,
    question: "What does the 'Q' in OPQRST stand for?",
    options: [
          "Quick",
          "Quality",
          "Quantity",
          "Quadrant"
    ],
    correctAnswer: 1,
    explanation: "Q stands for Quality — asking the patient to describe the pain helps determine its characteristics such as sharp, dull, burning, or throbbing.",
    category: "Patient Assessment",
  },
  {
    id: 142,
    question: "What does the 'R' in OPQRST stand for?",
    options: [
          "Respiration",
          "Radiation",
          "Rate",
          "Reaction"
    ],
    correctAnswer: 1,
    explanation: "R stands for Radiation — asking whether the pain spreads to other areas of the body helps determine the potential source and extent of the problem.",
    category: "Patient Assessment",
  },
  {
    id: 143,
    question: "What does the 'S' in OPQRST stand for?",
    options: [
          "Signs",
          "Severity",
          "Symptoms",
          "Skin"
    ],
    correctAnswer: 1,
    explanation: "S stands for Severity — asking the patient to rate their pain on a scale of 1-10 helps quantify the intensity of their discomfort.",
    category: "Patient Assessment",
  },
  {
    id: 144,
    question: "What does the 'T' in OPQRST stand for?",
    options: [
          "Treatment",
          "Time",
          "Temperature",
          "Tenderness"
    ],
    correctAnswer: 1,
    explanation: "T stands for Time — asking when the pain started helps determine the onset and potential duration of the medical condition.",
    category: "Patient Assessment",
  },
  {
    id: 145,
    question: "What is the first step in patient assessment?",
    options: [
          "Check vital signs",
          "Scene size-up and ensuring safety",
          "Administer oxygen",
          "Start an IV line"
    ],
    correctAnswer: 1,
    explanation: "Patient assessment begins with scene size-up and ensuring safety for both the patient and responders. This initial step is crucial for preventing further harm.",
    category: "Patient Assessment",
  },
  {
    id: 146,
    question: "What is the correct technique for measuring blood pressure?",
    options: [
          "Inflate the cuff to 200 mmHg",
          "Inflate 30 mmHg above the estimated systolic pressure",
          "Inflate to 100 mmHg",
          "Do not use a cuff"
    ],
    correctAnswer: 1,
    explanation: "Proper technique involves inflating the cuff 30 mmHg above the estimated systolic pressure to ensure accurate measurement of both systolic and diastolic values.",
    category: "Patient Assessment",
  },
  {
    id: 147,
    question: "What is a normal pupillary response to light?",
    options: [
          "Dilation",
          "Constriction (both pupils)",
          "No change",
          "One pupil constricts, the other dilates"
    ],
    correctAnswer: 1,
    explanation: "Normal pupils constrict equally and briskly when exposed to light, indicating proper neurological function and intact optic pathways.",
    category: "Patient Assessment",
  },
  {
    id: 148,
    question: "What does PEARL stand for in neurological assessment?",
    options: [
          "Pulse, Eyes, Airway, Limbs",
          "Pupils Equal And Reactive to Light",
          "Pain, Ears, Airway, Response Level",
          "Pressure, Eyes, Airway, Response"
    ],
    correctAnswer: 1,
    explanation: "PEARL stands for Pupils Equal And Reactive to Light, which is a key indicator of neurological function and brainstem integrity.",
    category: "Patient Assessment",
  },
  {
    id: 149,
    question: "What is the Glasgow Coma Scale (GCS) score range?",
    options: [
          "0-10",
          "3-15",
          "1-20",
          "5-25"
    ],
    correctAnswer: 1,
    explanation: "The GCS ranges from 3 (worst) to 15 (best), with lower scores indicating more severe impairment of consciousness.",
    category: "Patient Assessment",
  },
  {
    id: 150,
    question: "A GCS score of 8 or below indicates what?",
    options: [
          "Mild head injury",
          "Severe head injury",
          "No injury",
          "Moderate headache"
    ],
    correctAnswer: 1,
    explanation: "A GCS of 8 or below indicates severe traumatic brain injury and requires immediate medical intervention as it represents a significant alteration in consciousness.",
    category: "Patient Assessment",
  },
  {
    id: 151,
    question: "What are the three components of the Glasgow Coma Scale?",
    options: [
          "Heart rate, blood pressure",
          "Eye opening, verbal response, motor response",
          "Pupil size, reflexes, level of consciousness",
          "Pain, temperature, oxygen saturation"
    ],
    correctAnswer: 1,
    explanation: "GCS assesses three components: Eye opening, verbal response, and motor response, which together provide a standardized measure of a patient's level of consciousness.",
    category: "Patient Assessment",
  },
  {
    id: 152,
    question: "What is the medical term for difficulty breathing?",
    options: [
          "Dyspnea",
          "Apnea",
          "Bradypnea",
          "Orthopnea"
    ],
    correctAnswer: 0,
    explanation: "Dyspnea is the medical term for difficulty breathing, which can be caused by various conditions affecting the respiratory system.",
    category: "Patient Assessment",
  },
  {
    id: 153,
    question: "What is the normal body temperature range for an adult?",
    options: [
          "35.0-35.5°C",
          "36.1-37.2°C",
          "38.0-39.0°C",
          "40.0-41.0°C"
    ],
    correctAnswer: 1,
    explanation: "Normal body temperature is 36.1-37.2°C (97.0-99.0°F), with variations depending on time of day, age, and measurement method.",
    category: "Patient Assessment",
  },
  {
    id: 154,
    question: "What is the correct site for checking a pulse in an adult patient?",
    options: [
          "Radial pulse",
          "Carotid pulse",
          "Pedal pulse",
          "Temporal pulse"
    ],
    correctAnswer: 1,
    explanation: "The carotid pulse is the preferred site for checking circulation in adults, as it is more reliable and easier to locate than peripheral pulses.",
    category: "Patient Assessment",
  },
  {
    id: 155,
    question: "What does 'tidaling' in a chest drainage system indicate?",
    options: [
          "System malfunction",
          "Normal function with breathing",
          "Air leak",
          "Infection"
    ],
    correctAnswer: 1,
    explanation: "Tidaling (fluctuation of fluid level with breathing) indicates normal function of the chest drainage system, showing the system is responding to intrathoracic pressure changes.",
    category: "Patient Assessment",
  },
  {
    id: 156,
    question: "What is the correct position for a patient in anaphylactic shock?",
    options: [
          "Prone position",
          "Supine with legs elevated",
          "Sitting upright",
          "Trendelenburg only"
    ],
    correctAnswer: 1,
    explanation: "A patient in anaphylactic shock should be placed in a supine position with legs elevated to improve venous return and maintain blood pressure.",
    category: "Patient Assessment",
  },
  {
    id: 157,
    question: "What is the first-line medication for anaphylaxis?",
    options: [
          "Aspirin",
          "Epinephrine",
          "Nitroglycerin",
          "Metoprolol"
    ],
    correctAnswer: 1,
    explanation: "Epinephrine is the first-line treatment for anaphylaxis as it rapidly reverses life-threatening symptoms by causing vasoconstriction and bronchodilation.",
    category: "Patient Assessment",
  },
  {
    id: 158,
    question: "What is the appropriate dose of epinephrine for anaphylaxis in adults?",
    options: [
          "0.01 mg IV",
          "0.3-0.5 mg IM",
          "1 mg IV push",
          "5 mg IM"
    ],
    correctAnswer: 1,
    explanation: "The standard adult dose for anaphylaxis is 0.3-0.5 mg of epinephrine (1:1000 concentration) administered intramuscularly.",
    category: "Patient Assessment",
  },
  {
    id: 159,
    question: "What is a key sign of inadequate breathing?",
    options: [
          "Equal chest rise",
          "Shallow or irregular chest movement",
          "Normal skin color",
          "Clear speech"
    ],
    correctAnswer: 1,
    explanation: "Shallow or irregular chest movement indicates inadequate breathing, suggesting reduced tidal volume or ineffective ventilation.",
    category: "Patient Assessment",
  },
  {
    id: 160,
    question: "What is the correct method for opening the airway in a patient without cervical spine injury?",
    options: [
          "Jaw thrust",
          "Head-tilt/chin-lift",
          "Neck extension only",
          "Finger sweep"
    ],
    correctAnswer: 1,
    explanation: "The head-tilt/chin-lift is the standard method for opening the airway in patients without suspected cervical spine injury.",
    category: "Patient Assessment",
  },
  {
    id: 161,
    question: "What is an oropharyngeal airway (OPA) used for?",
    options: [
          "To deliver oxygen supplementation to the patient",
          "To maintain airway patency in unconscious patients",
          "To suction secretions",
          "To measure oxygen saturation"
    ],
    correctAnswer: 1,
    explanation: "An OPA keeps the tongue away from the posterior pharynx, maintaining airway patency in unconscious patients without gag reflex.",
    category: "Patient Assessment",
  },
  {
    id: 162,
    question: "What is a nasopharyngeal airway (NPA) used for?",
    options: [
          "Only for nasal intubation",
          "To maintain airway patency in conscious or unconscious patients",
          "To deliver nasal oxygen",
          "To check nasal patency"
    ],
    correctAnswer: 1,
    explanation: "An NPA maintains airway patency and can be used in conscious or unconscious patients when an OPA is not tolerated.",
    category: "Patient Assessment",
  },
  {
    id: 163,
    question: "What is a contraindication for nasopharyngeal airway insertion?",
    options: [
          "Patient is awake and alert",
          "Suspected basilar skull fracture",
          "Patient has a fever",
          "Patient is over 50 years old"
    ],
    correctAnswer: 1,
    explanation: "Suspected basilar skull fracture is a contraindication for NPA insertion as it could cause the airway to enter the cranial cavity.",
    category: "Patient Assessment",
  },
  {
    id: 164,
    question: "What is the correct size for an oropharyngeal airway?",
    options: [
          "Measure from the nose to the earlobe",
          "Measure from the corner of the mouth to the angle of the jaw",
          "Measure from the nose to the sternum",
          "Any size will work as long as it fits"
    ],
    correctAnswer: 1,
    explanation: "The correct OPA size is measured from the corner of the mouth to the angle of the jaw, ensuring proper fit without causing airway obstruction.",
    category: "Patient Assessment",
  },
  {
    id: 165,
    question: "What does capillary refill time assess?",
    options: [
          "Lung function",
          "Peripheral perfusion and circulatory status",
          "Kidney function",
          "Brain function"
    ],
    correctAnswer: 1,
    explanation: "Capillary refill time assesses peripheral perfusion and circulatory status, with normal refill time being less than 2 seconds in adults.",
    category: "Patient Assessment",
  },
  {
    id: 166,
    question: "Which position is most appropriate for transporting a patient with respiratory distress?",
    options: [
          "Supine position",
          "Prone position",
          "Semi-Fowler's position",
          "Trendelenburg position"
    ],
    correctAnswer: 2,
    explanation: "Semi-Fowler's position (head elevated 30-45 degrees) is most appropriate for transporting patients with respiratory distress as it facilitates breathing by reducing pressure on the diaphragm and improving lung expansion.",
    category: "Ambulance Management",
  },
  {
    id: 167,
    question: "When transporting a patient with a suspected spinal injury, which device should be used?",
    options: [
          "Stair chair",
          "Long spine board",
          "Scoop stretcher only",
          "Wheeled stretcher"
    ],
    correctAnswer: 1,
    explanation: "A long spine board provides full spinal immobilization during transport, maintaining proper alignment and preventing further injury to the spinal cord.",
    category: "Ambulance Management",
  },
  {
    id: 168,
    question: "What is the Trendelenburg position used for?",
    options: [
          "To treat head injuries",
          "To increase venous return",
          "To improve breathing",
          "To reduce nausea"
    ],
    correctAnswer: 1,
    explanation: "The Trendelenburg position (feet elevated above the head) increases venous return to the heart by utilizing gravity, which can be beneficial in certain shock situations.",
    category: "Ambulance Management",
  },
  {
    id: 169,
    question: "What is the shock position (modified Trendelenburg)?",
    options: [
          "Head elevated, feet elevated",
          "Supine with legs elevated",
          "Prone position",
          "Lateral recumbent"
    ],
    correctAnswer: 1,
    explanation: "The shock position involves placing the patient supine with legs elevated 8-12 inches above the heart level to improve venous return and cardiac output.",
    category: "Ambulance Management",
  },
  {
    id: 170,
    question: "What is the recovery position?",
    options: [
          "Supine with arms at sides",
          "Lateral recumbent position",
          "Prone with head to side",
          "Sitting upright position"
    ],
    correctAnswer: 1,
    explanation: "The recovery position (lateral recumbent) maintains an open airway and prevents aspiration by allowing fluids to drain from the mouth.",
    category: "Ambulance Management",
  },
  {
    id: 171,
    question: "When should a patient be placed in a left lateral position during transport?",
    options: [
          "For all patients",
          "For pregnant patients",
          "For patients with arm injuries",
          "For patients with eye injuries"
    ],
    correctAnswer: 1,
    explanation: "Pregnant patients in the third trimester should be placed in a left lateral position during transport to prevent compression of the inferior vena cava by the uterus.",
    category: "Ambulance Management",
  },
  {
    id: 172,
    question: "What is the purpose of strapping a patient to the stretcher?",
    options: [
          "To restrain the patient",
          "To secure the patient safely",
          "To keep the patient comfortable",
          "To restrict breathing"
    ],
    correctAnswer: 1,
    explanation: "Stretcher straps secure the patient to the stretcher during transport to prevent falls and injuries while allowing for necessary movement.",
    category: "Ambulance Management",
  },
  {
    id: 173,
    question: "What is the correct procedure for loading a patient onto a stretcher?",
    options: [
          "One person pushes while another pulls",
          "At least two rescuers: one at head and one at foot",
          "The patient loads themselves with assistance",
          "Only the driver loads the patient"
    ],
    correctAnswer: 1,
    explanation: "At least two rescuers are required — one at the head and one at the foot of the stretcher — to ensure safe and proper loading of the patient.",
    category: "Ambulance Management",
  },
  {
    id: 174,
    question: "How should a patient with chest pain be positioned during transport?",
    options: [
          "Prone position",
          "Semi-Fowler's or Fowler's position",
          "Trendelenburg position",
          "Head down position"
    ],
    correctAnswer: 1,
    explanation: "Patients with chest pain should be placed in Semi-Fowler's or Fowler's position to reduce cardiac workload and improve breathing.",
    category: "Ambulance Management",
  },
  {
    id: 175,
    question: "What is the proper position for a patient with suspected neck injury?",
    options: [
          "No specific position needed",
          "Supine with cervical collar applied",
          "Sitting upright position",
          "Side-lying without support"
    ],
    correctAnswer: 1,
    explanation: "A suspected neck injury requires cervical immobilization with a collar and placement on a backboard to prevent further spinal damage.",
    category: "Ambulance Management",
  },
  {
    id: 176,
    question: "What monitoring should be performed during patient transport?",
    options: [
          "No monitoring is necessary",
          "Continuous vital signs monitoring",
          "Only checking once during transport",
          "Only at the end of transport"
    ],
    correctAnswer: 1,
    explanation: "Continuous monitoring during transport allows for early detection of changes in the patient's condition and prompt intervention if needed.",
    category: "Ambulance Management",
  },
  {
    id: 177,
    question: "What is the purpose of a transport checklist?",
    options: [
          "To delay transport",
          "To ensure all equipment and medications are accounted for",
          "To count the number of staff",
          "To record fuel levels"
    ],
    correctAnswer: 1,
    explanation: "A transport checklist ensures all necessary equipment, medications, and documentation are properly prepared before and during patient transport.",
    category: "Ambulance Management",
  },
  {
    id: 178,
    question: "What is the correct technique for moving a patient down stairs?",
    options: [
          "Feet first with the head elevated",
          "Head first orientation",
          "Sideways movement",
          "Carried by one person"
    ],
    correctAnswer: 0,
    explanation: "When descending stairs, the stretcher should be moved feet first with the head elevated to maintain proper patient positioning and prevent falls.",
    category: "Ambulance Management",
  },
  {
    id: 179,
    question: "What is the maximum weight capacity of a standard EMS stretcher?",
    options: [
          "150 kg",
          "Approximately 225-300 kg",
          "100 kg",
          "50 kg"
    ],
    correctAnswer: 1,
    explanation: "Standard EMS stretchers typically have a weight capacity of approximately 225-300 kg to accommodate most patients safely.",
    category: "Ambulance Management",
  },
  {
    id: 180,
    question: "What is a bariatric stretcher?",
    options: [
          "A stretcher for pediatric patients",
          "A stretcher designed for obese patients",
          "A stretcher for trauma patients",
          "A stretcher for psychiatric patients"
    ],
    correctAnswer: 1,
    explanation: "A bariatric stretcher is specifically designed to safely transport patients with extreme obesity, having higher weight capacity and wider dimensions.",
    category: "Ambulance Management",
  },
  {
    id: 181,
    question: "What should be done before moving a patient to a stretcher?",
    options: [
          "Just push the patient",
          "Communicate with the receiving facility",
          "Leave the patient on the ground",
          "Transfer without any preparation"
    ],
    correctAnswer: 1,
    explanation: "Before transferring, communicate with the receiving facility to ensure proper care can be provided immediately upon arrival.",
    category: "Ambulance Management",
  },
  {
    id: 182,
    question: "What is the purpose of a patient care report during patient transport?",
    options: [
          "To keep the provider entertained",
          "To document all patient care and interventions",
          "To bill the patient only",
          "To record the weather conditions"
    ],
    correctAnswer: 1,
    explanation: "The PCR documents the complete record of patient assessment, treatment, and condition changes during transport, ensuring continuity of care.",
    category: "Ambulance Management",
  },
  {
    id: 183,
    question: "What is the function of a stair chair in patient transport?",
    options: [
          "To transport patients safely on stairs",
          "To replace the ambulance stretcher",
          "To transport patients in narrow hallways",
          "To perform physical therapy"
    ],
    correctAnswer: 0,
    explanation: "A stair chair is specifically designed to safely transport patients up and down stairs while providing proper immobilization.",
    category: "Ambulance Management",
  },
  {
    id: 184,
    question: "When is a non-emergency transport indicated?",
    options: [
          "When the patient has a headache",
          "When a patient needs routine transfer to a facility",
          "When no ambulance is available",
          "Never"
    ],
    correctAnswer: 1,
    explanation: "Non-emergency transport is for patients whose condition is stable and does not require immediate life-saving interventions.",
    category: "Ambulance Management",
  },
  {
    id: 185,
    question: "What should be done immediately after completing patient transport?",
    options: [
          "Go home immediately",
          "Clean and restock the ambulance",
          "Wait for the next shift",
          "Only refuel the vehicle"
    ],
    correctAnswer: 1,
    explanation: "After transport, the ambulance must be cleaned and restocked to ensure it's ready for the next emergency call.",
    category: "Ambulance Management",
  },
  {
    id: 186,
    question: "When driving an ambulance under emergency conditions, what is the primary consideration?",
    options: [
          "Arriving as fast as possible",
          "Driving safely and maintaining control",
          "Using the siren continuously",
          "Overtaking all vehicles"
    ],
    correctAnswer: 1,
    explanation: "The paramount rule in emergency driving is to balance speed with safety to protect both the crew and the public.",
    category: "Ambulance Management",
  },
  {
    id: 187,
    question: "What is the purpose of using lights and siren during emergency transport?",
    options: [
          "To show authority",
          "To alert other drivers and clear the way",
          "To clear traffic for fun",
          "To test the equipment"
    ],
    correctAnswer: 1,
    explanation: "Lights and siren are used to request the right-of-way from other drivers while maintaining safe operation.",
    category: "Ambulance Management",
  },
  {
    id: 188,
    question: "When approaching an intersection with a red light, what should the ambulance driver do?",
    options: [
          "Proceed through without stopping",
          "Come to a complete stop before proceeding",
          "Speed up to beat the light",
          "Turn off the siren"
    ],
    correctAnswer: 1,
    explanation: "At a red light or stop sign, the ambulance must come to a complete stop before proceeding, even with emergency lights on.",
    category: "Ambulance Management",
  },
  {
    id: 189,
    question: "What is 'due regard' in the context of emergency vehicle operation?",
    options: [
          "Ignoring all traffic laws",
          "Driving with consideration for public safety",
          "Driving at maximum speed at all times",
          "Following the vehicle in front closely"
    ],
    correctAnswer: 1,
    explanation: "Due regard means operating the emergency vehicle with reasonable care for the safety of others on the road.",
    category: "Ambulance Management",
  },
  {
    id: 190,
    question: "What should the ambulance driver do when other vehicles do not yield?",
    options: [
          "Force the vehicle off the road",
          "Slow down or stop if necessary",
          "Honk continuously",
          "Call the police on the radio"
    ],
    correctAnswer: 1,
    explanation: "If a vehicle does not yield, the ambulance driver should slow down or stop if necessary to avoid a collision.",
    category: "Ambulance Management",
  },
  {
    id: 191,
    question: "What is the recommended following distance when driving an ambulance?",
    options: [
          "1 second",
          "3-4 seconds behind other vehicles",
          "10 seconds",
          "Tailgate the vehicle in front"
    ],
    correctAnswer: 1,
    explanation: "A following distance of 3-4 seconds provides adequate time to react and stop safely, even with the ambulance's weight.",
    category: "Ambulance Management",
  },
  {
    id: 192,
    question: "What is the effect of wet road conditions on ambulance braking?",
    options: [
          "No effect",
          "Increases braking distance significantly",
          "Decreases braking distance",
          "Only affects speed, not stopping distance"
    ],
    correctAnswer: 1,
    explanation: "Wet roads reduce tire traction, increasing braking distance and requiring the driver to slow down well in advance.",
    category: "Ambulance Management",
  },
  {
    id: 193,
    question: "What should the ambulance driver do before backing up?",
    options: [
          "Just look in the rearview mirror",
          "Use a spotter and check mirrors",
          "Back up as fast as possible",
          "Honk the horn"
    ],
    correctAnswer: 1,
    explanation: "Before backing up, the driver should use a spotter and check all mirrors to ensure the path is clear.",
    category: "Ambulance Management",
  },
  {
    id: 194,
    question: "What is the purpose of a daily vehicle inspection for an ambulance?",
    options: [
          "To create paperwork",
          "To identify mechanical issues before they become problems",
          "To count the number of supplies",
          "To record fuel costs"
    ],
    correctAnswer: 1,
    explanation: "A daily vehicle inspection identifies potential mechanical issues before they become problems during an emergency.",
    category: "Ambulance Management",
  },
  {
    id: 195,
    question: "When should the ambulance driver use emergency lights without siren?",
    options: [
          "When arriving at a hospital",
          "When parked at a scene for extended periods",
          "Never",
          "Only at night"
    ],
    correctAnswer: 1,
    explanation: "Emergency lights without siren are used when parked at a scene for extended periods to alert others to the ambulance's presence.",
    category: "Ambulance Management",
  },
  {
    id: 196,
    question: "What is the purpose of the ambulance governor?",
    options: [
          "To prevent the ambulance from exceeding a safe speed limit",
          "To increase engine performance",
          "To reduce fuel consumption",
          "To play music in the ambulance"
    ],
    correctAnswer: 0,
    explanation: "A governor limits the maximum speed of the ambulance to ensure safe operation during emergency responses.",
    category: "Ambulance Management",
  },
  {
    id: 197,
    question: "What should the ambulance driver do if the vehicle starts to skid?",
    options: [
          "Brake hard and steer sharply",
          "Steer in the direction the rear of the vehicle is sliding",
          "Accelerate to regain traction",
          "Turn off the engine"
    ],
    correctAnswer: 1,
    explanation: "When skidding, steer in the direction the rear of the vehicle is sliding to regain control of the ambulance.",
    category: "Ambulance Management",
  },
  {
    id: 198,
    question: "What is the safest position for the ambulance when stopped at the scene of an emergency?",
    options: [
          "Facing oncoming traffic",
          "Angled slightly to the right of the road",
          "Parked on the shoulder completely off the road",
          "Parked in the middle of the road with lights flashing"
    ],
    correctAnswer: 1,
    explanation: "The ambulance should be angled slightly to the right of the road to protect the crew and provide a clear path for other emergency vehicles.",
    category: "Ambulance Management",
  },
  {
    id: 199,
    question: "What is the meaning of 'code 3' response?",
    options: [
          "Routine response",
          "Emergency response with lights and sirens",
          "Return to station",
          "Cancel the call"
    ],
    correctAnswer: 1,
    explanation: "Code 3 indicates an emergency response where the ambulance uses lights and sirens to expedite travel to the scene.",
    category: "Ambulance Management",
  },
  {
    id: 200,
    question: "What is the meaning of 'code 2' response?",
    options: [
          "Emergency response",
          "Urgent response without lights and sirens",
          "Cancel the call",
          "Mass casualty incident"
    ],
    correctAnswer: 1,
    explanation: "Code 2 indicates an urgent but non-life-threatening situation where the ambulance responds without using lights and sirens.",
    category: "Ambulance Management",
  },
  {
    id: 201,
    question: "What is the most effective method for preventing the spread of infection?",
    options: [
          "Wearing gloves only",
          "Proper hand hygiene using soap and water or alcohol-based sanitizer",
          "Using antibiotics",
          "Avoiding all patient contact"
    ],
    correctAnswer: 1,
    explanation: "Hand hygiene is the single most effective measure to prevent healthcare-associated infections and transmission of pathogens.",
    category: "OSH",
  },
  {
    id: 202,
    question: "Which type of precautions should be taken for a patient with suspected tuberculosis?",
    options: [
          "Contact precautions",
          "Airborne precautions with N95 respirator",
          "No precautions needed",
          "Droplet precautions"
    ],
    correctAnswer: 1,
    explanation: "Tuberculosis is transmitted via airborne particles, requiring airborne precautions including the use of N95 respirators.",
    category: "OSH",
  },
  {
    id: 203,
    question: "What is the minimum time recommended for effective handwashing with soap and water?",
    options: [
          "5 seconds",
          "20 seconds",
          "2 minutes",
          "10 minutes"
    ],
    correctAnswer: 1,
    explanation: "The WHO and CDC recommend at least 20 seconds of thorough handwashing with soap and water to effectively remove pathogens.",
    category: "OSH",
  },
  {
    id: 204,
    question: "When should alcohol-based hand rub NOT be used for hand hygiene?",
    options: [
          "Before patient contact",
          "When hands are visibly soiled or contaminated with organic material",
          "After removing gloves",
          "Before eating"
    ],
    correctAnswer: 1,
    explanation: "Alcohol-based hand rub is not effective when hands are visibly soiled or contaminated with organic material, requiring soap and water instead.",
    category: "OSH",
  },
  {
    id: 205,
    question: "What are Standard Precautions?",
    options: [
          "Precautions used only for specific diseases",
          "Infection control practices applied to ALL patients regardless of diagnosis",
          "Precautions only for patients with known infections",
          "Precautions only for emergency situations"
    ],
    correctAnswer: 1,
    explanation: "Standard Precautions are applied to ALL patients to prevent transmission of infectious agents in healthcare settings.",
    category: "OSH",
  },
  {
    id: 206,
    question: "What PPE is required for contact with blood or body fluids?",
    options: [
          "Only a mask",
          "Gloves at minimum; may include gown, mask, and eye protection based on exposure risk",
          "Only a gown",
          "No PPE is required"
    ],
    correctAnswer: 1,
    explanation: "Gloves are the minimum PPE for contact with blood or body fluids, with additional protection based on the anticipated exposure risk.",
    category: "OSH",
  },
  {
    id: 207,
    question: "What is the correct sequence for removing PPE?",
    options: [
          "Gloves, gown, mask, eye protection",
          "Gloves first, then eye protection, then gown, then mask",
          "Mask first, then gloves, then gown",
          "Any order is acceptable"
    ],
    correctAnswer: 1,
    explanation: "The correct removal sequence minimizes contamination risk by removing gloves first, followed by eye protection, gown, and finally mask.",
    category: "OSH",
  },
  {
    id: 208,
    question: "What should be done with needles after use?",
    options: [
          "Recap the needle and dispose in regular trash",
          "Dispose immediately in a puncture-resistant sharps container",
          "Leave on the patient's bedside for disposal later",
          "Bend the needle and dispose in regular trash"
    ],
    correctAnswer: 1,
    explanation: "Used needles must be placed directly in a puncture-resistant sharps container to prevent needlestick injuries and contamination.",
    category: "OSH",
  },
  {
    id: 209,
    question: "What is a needlestick injury?",
    options: [
          "A cut from a scalpel",
          "An accidental puncture or cut from a contaminated needle or other sharp object",
          "A burn injury",
          "A muscle strain"
    ],
    correctAnswer: 1,
    explanation: "A needlestick injury is a percutaneous injury caused by needles or other sharp objects that may expose healthcare workers to bloodborne pathogens.",
    category: "OSH",
  },
  {
    id: 210,
    question: "What is the first action after a needlestick injury?",
    options: [
          "Continue working and report later",
          "Wash the wound with soap and water",
          "Apply a bandage and continue working",
          "Squeeze the wound to express blood"
    ],
    correctAnswer: 1,
    explanation: "After a needlestick, wash the wound with soap and water as soon as possible to reduce the risk of infection from bloodborne pathogens.",
    category: "OSH",
  },
  {
    id: 211,
    question: "What are the three major bloodborne pathogens of concern in healthcare settings?",
    options: [
          "Influenza, common cold, and strep throat",
          "Hepatitis B, Hepatitis C, and HIV",
          "Tuberculosis, malaria, and dengue fever",
          "E. coli, Salmonella, and Staphylococcus"
    ],
    correctAnswer: 1,
    explanation: "The three major bloodborne pathogens of concern in healthcare settings are Hepatitis B, Hepatitis C, and HIV, as they can be transmitted through blood and other bodily fluids.",
    category: "OSH",
  },
  {
    id: 212,
    question: "What is the purpose of an exposure control plan in healthcare settings?",
    options: [
          "To eliminate all workplace hazards",
          "To outline procedures for preventing and managing exposure to bloodborne pathogens",
          "To punish employees who violate safety protocols",
          "To reduce the cost of personal protective equipment"
    ],
    correctAnswer: 1,
    explanation: "An exposure control plan details specific procedures for identifying and controlling exposure to bloodborne pathogens, including engineering controls, work practices, and personal protective equipment.",
    category: "OSH",
  },
  {
    id: 213,
    question: "What type of mask is required for droplet precautions in infection control?",
    options: [
          "N95 respirator",
          "Surgical mask",
          "Full-face respirator",
          "No mask needed"
    ],
    correctAnswer: 1,
    explanation: "Droplet precautions require a standard surgical mask to be worn by healthcare providers within 6 feet of the patient to prevent transmission of respiratory droplets.",
    category: "OSH",
  },
  {
    id: 214,
    question: "How should biohazardous waste be disposed of in healthcare settings?",
    options: [
          "In the regular trash",
          "In designated biohazard containers with proper labeling",
          "By flushing down the toilet",
          "By burning in the open air"
    ],
    correctAnswer: 1,
    explanation: "Biohazardous waste must be disposed of in designated biohazard containers with proper labeling to prevent contamination and transmission of infectious diseases.",
    category: "OSH",
  },
  {
    id: 215,
    question: "What is the incubation period of an infectious disease?",
    options: [
          "The time from exposure to when symptoms first appear",
          "The time from infection to when symptoms become severe",
          "The duration of the symptomatic phase",
          "The recovery period after treatment"
    ],
    correctAnswer: 0,
    explanation: "The incubation period is the interval between exposure to a pathogen and the appearance of the first symptoms of the disease.",
    category: "OSH",
  },
  {
    id: 216,
    question: "When encountering a patient displaying aggressive behavior, what should the EMS provider do first?",
    options: [
          "Physically restrain the patient immediately",
          "Ensure personal safety and maintain a safe distance",
          "Shout at the patient to establish authority",
          "Ignore the behavior and continue treatment"
    ],
    correctAnswer: 1,
    explanation: "The provider must first ensure personal safety and maintain a safe distance before attempting to de-escalate the situation or provide care.",
    category: "Legal/Ethical",
  },
  {
    id: 217,
    question: "What is de-escalation in managing aggressive patients?",
    options: [
          "Using physical force to control the patient",
          "Verbal and non-verbal techniques to reduce agitation",
          "Ignoring the patient's concerns",
          "Calling the police as the first response"
    ],
    correctAnswer: 1,
    explanation: "De-escalation uses calm communication, non-threatening body language, and active listening to reduce a patient's agitation and prevent escalation.",
    category: "Legal/Ethical",
  },
  {
    id: 218,
    question: "Which communication technique is most effective when dealing with an anxious or upset patient?",
    options: [
          "Arguing with the patient to establish facts",
          "Active listening and empathy to build rapport",
          "Threatening the patient with legal consequences",
          "Walking away without explanation"
    ],
    correctAnswer: 1,
    explanation: "Active listening and empathy help validate the patient's feelings, build trust, and create a therapeutic relationship that facilitates better care.",
    category: "Legal/Ethical",
  },
  {
    id: 219,
    question: "When is physical restraint of a patient justified in EMS practice?",
    options: [
          "Whenever the patient refuses treatment",
          "When the patient poses an immediate threat to themselves or others",
          "For all psychiatric emergencies",
          "Only for elderly patients with dementia"
    ],
    correctAnswer: 1,
    explanation: "Physical restraint is justified only when the patient poses an immediate threat to themselves or others, and less restrictive measures have failed.",
    category: "Legal/Ethical",
  },
  {
    id: 220,
    question: "What is the appropriate documentation when physical restraint is used?",
    options: [
          "No documentation is required",
          "Document the reason for restraint, the method used, and patient monitoring",
          "Only the patient's vital signs need to be recorded",
          "Only the time of restraint application needs to be noted"
    ],
    correctAnswer: 1,
    explanation: "Complete documentation includes the reason for restraint, the method used, duration, vital signs, and any complications that occurred during the restraint.",
    category: "Legal/Ethical",
  },
  {
    id: 221,
    question: "What is the legal concept of 'implied consent' in emergency medical care?",
    options: [
          "Patient verbally agrees to treatment",
          "Consent assumed for unconscious patients or those unable to consent",
          "Consent from a minor without parental permission",
          "Consent given in writing but not witnessed"
    ],
    correctAnswer: 1,
    explanation: "Implied consent allows EMS providers to treat patients who cannot consent when there is an immediate threat to life or health.",
    category: "Legal/Ethical",
  },
  {
    id: 222,
    question: "What is 'expressed consent' in medical treatment?",
    options: [
          "Consent implied by the patient's behavior",
          "Verbal or written permission given by a competent patient",
          "Consent from a family member without the patient's knowledge",
          "Consent given in exchange for payment"
    ],
    correctAnswer: 1,
    explanation: "Expressed consent is explicitly given by a competent patient through verbal or written agreement to receive specific medical treatment.",
    category: "Legal/Ethical",
  },
  {
    id: 223,
    question: "What should an EMS provider do if a competent adult patient refuses treatment?",
    options: [
          "Treat the patient anyway because they need help",
          "Respect the refusal, document it, and inform medical control",
          "Call the police to force the patient to accept treatment",
          "Restrain the patient and provide treatment against their will"
    ],
    correctAnswer: 1,
    explanation: "Competent adults have the right to refuse treatment, and EMS providers must respect this decision while ensuring proper documentation and consultation with medical control.",
    category: "Legal/Ethical",
  },
  {
    id: 224,
    question: "What is the correct first aid for a minor superficial burn?",
    options: [
          "Apply butter or oil to soothe the burn",
          "Cool the burn with running cool water for 10-20 minutes",
          "Apply ice directly to the burn area",
          "Pop any blisters that form"
    ],
    correctAnswer: 1,
    explanation: "Cooling with running cool water for at least 10-20 minutes helps reduce pain, prevent further tissue damage, and promotes healing of minor burns.",
    category: "First Aid",
  },
  {
    id: 225,
    question: "In managing epistaxis (nosebleed), which action is most appropriate?",
    options: [
          "Tilt the head backward to prevent blood from flowing",
          "Pinch the soft part of the nose just below the bridge",
          "Lie the patient flat on their back with head elevated",
          "Insert tissue deep into the nostril to absorb blood"
    ],
    correctAnswer: 1,
    explanation: "Pinching the soft nose while leaning forward helps apply direct pressure to bleeding vessels and prevents blood from flowing down the throat.",
    category: "First Aid",
  },
  {
    id: 226,
    question: "What is the correct first aid for a choking adult who is conscious?",
    options: [
          "Give water to help swallow the object",
          "Perform abdominal thrusts (Heimlich maneuver)",
          "Slap the back while the patient bends forward",
          "Wait for the object to dislodge on its own"
    ],
    correctAnswer: 1,
    explanation: "Abdominal thrusts (Heimlich maneuver) are the standard treatment for a conscious choking adult. The thrusts create upward pressure on the diaphragm, forcing air from the lungs to expel the obstructing object.",
    category: "First Aid",
  },
  {
    id: 227,
    question: "What is the correct first aid for a suspected fracture?",
    options: [
          "Attempt to realign the bone manually",
          "Immobilize the injured area with a splint",
          "Apply a tight bandage above the injury",
          "Massage the area to reduce swelling"
    ],
    correctAnswer: 1,
    explanation: "Suspected fractures should be immobilized with a splint without attempting to realign the bone. Improper manipulation can cause further damage to surrounding tissues, nerves, and blood vessels.",
    category: "First Aid",
  },
  {
    id: 228,
    question: "What is the correct management for a snake bite?",
    options: [
          "Apply a tourniquet",
          "Keep the patient calm and still",
          "Suck out the venom",
          "Apply ice directly to the bite area"
    ],
    correctAnswer: 1,
    explanation: "Keep the patient calm and still to slow the spread of venom through the lymphatic system. Remove jewelry near the bite, keep the affected area at or below heart level, and seek immediate medical attention. Do not apply tourniquets, cut the wound, or apply ice.",
    category: "First Aid",
  },
  {
    id: 229,
    question: "What is the RICE method for treating sprains?",
    options: [
          "Rest, Ice, Compression, Elevation",
          "Rest, Immobilize, Carry, Exercise",
          "Run, Ice, Carry, Elevate",
          "Rest, Inspect, Carry, Elevate"
    ],
    correctAnswer: 0,
    explanation: "RICE stands for Rest, Ice, Compression, and Elevation — the standard first-aid treatment for soft tissue injuries like sprains and strains. Rest prevents further injury, ice reduces swelling (20 min on/20 min off), compression limits edema, and elevation reduces blood flow to the area.",
    category: "First Aid",
  },
  {
    id: 230,
    question: "What is the correct management for an impaled object?",
    options: [
          "Remove the object immediately",
          "Stabilize the object in place",
          "Push the object through the wound",
          "Cut the object short"
    ],
    correctAnswer: 1,
    explanation: "Impaled objects should be stabilized in place and never removed in the field, as removal could worsen bleeding and cause further tissue damage. Secure the object with bulky dressings and transport the patient immediately.",
    category: "First Aid",
  },
  {
    id: 231,
    question: "What is the correct first aid for a seizure?",
    options: [
          "Restrain the patient",
          "Protect the patient from injury",
          "Hold the patient down",
          "Pour water on the patient's face"
    ],
    correctAnswer: 1,
    explanation: "During a seizure, protect the patient from injury by moving dangerous objects away and cushioning the head. Never restrain the patient, put anything in their mouth, or pour water on their face. Place them in the recovery position once the seizure stops.",
    category: "First Aid",
  },
  {
    id: 232,
    question: "What is the correct first aid for a dog bite?",
    options: [
          "Apply a tourniquet",
          "Wash the wound with soap and water",
          "Ignore the bite",
          "Apply butter to the wound"
    ],
    correctAnswer: 1,
    explanation: "Dog bites should be washed with soap and water thoroughly, then covered with a clean dressing. Seek medical attention for assessment of rabies prophylaxis, tetanus immunization, and infection prevention.",
    category: "First Aid",
  },
  {
    id: 233,
    question: "What is the correct management for a chemical burn?",
    options: [
          "Apply a bandage",
          "Flush with copious amounts of water for at least 20 minutes",
          "Apply butter",
          "Rub the area"
    ],
    correctAnswer: 1,
    explanation: "Chemical burns require immediate and copious flushing with water for at least 20 minutes to dilute and remove the chemical agent. Remove contaminated clothing while flushing and do not apply neutralizing agents.",
    category: "First Aid",
  },
  {
    id: 234,
    question: "What is the correct first aid for an insect sting?",
    options: [
          "Squeeze the sting site to remove venom",
          "Remove the stinger by scraping it away gently",
          "Apply heat to the sting area",
          "Ignore it"
    ],
    correctAnswer: 1,
    explanation: "Scrape the stinger away using a flat edge like a credit card — do not squeeze, as squeezing can inject more venom. Wash the area with soap and water, apply a cold compress, and monitor for signs of anaphylaxis.",
    category: "First Aid",
  },
  {
    id: 235,
    question: "What are the signs of a closed fracture?",
    options: [
          "Bone protruding through the skin",
          "Swelling, deformity, pain, and crepitus without an open wound",
          "No pain or swelling",
          "Bleeding only"
    ],
    correctAnswer: 1,
    explanation: "A closed fracture presents with swelling, deformity, pain, tenderness, and crepitus at the injury site without the bone protruding through the skin.",
    category: "Trauma",
  },
  {
    id: 236,
    question: "What is an open fracture?",
    options: [
          "A fracture with no visible wound",
          "A fracture where the bone protrudes through the skin",
          "A dislocated joint",
          "A muscle tear"
    ],
    correctAnswer: 1,
    explanation: "An open (compound) fracture involves a break in the skin with bone protruding through the wound, significantly increasing the risk of infection and requiring emergency treatment. Control bleeding, immobilize the limb, and cover the wound with a sterile dressing.",
    category: "Trauma",
  },
  {
    id: 237,
    question: "What is the primary goal of maintaining high patient service standards?",
    options: [
          "To receive awards",
          "To ensure quality patient care and safety",
          "To complete paperwork efficiently",
          "To compete with other agencies"
    ],
    correctAnswer: 1,
    explanation: "High patient service standards ensure quality patient care, safety, and satisfaction — the core objectives of EMS practice. These standards guide clinical decision-making, professional behavior, and continuous quality improvement.",
    category: "Legal/Ethical",
  },
  {
    id: 238,
    question: "What is patient confidentiality?",
    options: [
          "Sharing patient information casually with others",
          "Protecting patient information from unauthorized disclosure",
          "Discussing patients in public areas",
          "Telling family members without patient consent"
    ],
    correctAnswer: 1,
    explanation: "Patient confidentiality means protecting patient information from unauthorized disclosure, as required by HIPAA and professional ethics. Only share information with authorized personnel directly involved in the patient's care.",
    category: "Legal/Ethical",
  },
  {
    id: 239,
    question: "What is informed consent?",
    options: [
          "Consent obtained under duress or coercion",
          "Permission given after explaining the procedure, risks, and benefits",
          "Consent from a minor without parental presence",
          "Consent without any explanation of the procedure"
    ],
    correctAnswer: 1,
    explanation: "Informed consent requires that the patient be fully informed about the proposed procedure, its risks, benefits, and alternatives before giving voluntary permission for treatment. The patient must have the capacity to understand and make the decision.",
    category: "Legal/Ethical",
  },
  {
    id: 240,
    question: "What is the patient's bill of rights?",
    options: [
          "A list of rules patients must follow",
          "A set of guarantees regarding patient treatment, privacy, and autonomy",
          "A billing statement",
          "A list of hospital services and fees"
    ],
    correctAnswer: 1,
    explanation: "The patient's bill of rights guarantees patients certain fundamental rights including informed consent, privacy and confidentiality, refusal of treatment, access to medical records, and respectful non-discriminatory care.",
    category: "Legal/Ethical",
  },
  {
    id: 241,
    question: "Which best describes effective workplace communication?",
    options: [
          "Giving orders without explanation or feedback",
          "Gathering, conveying, and receiving information clearly and accurately",
          "Communicating only during emergencies",
          "Sharing personal opinions about colleagues"
    ],
    correctAnswer: 1,
    explanation: "Effective workplace communication involves gathering, conveying, and receiving information clearly and accurately to ensure patient safety, coordinated team operations, and efficient emergency response.",
    category: "Radio Communication",
  },
  {
    id: 242,
    question: "What is the purpose of a shift change briefing?",
    options: [
          "To socialize with incoming crew members",
          "To transfer critical information about patients, equipment, and station status",
          "To count inventory and supplies only",
          "To assign parking spots for the shift"
    ],
    correctAnswer: 1,
    explanation: "Shift change briefings transfer critical information about ongoing calls, patient status, equipment conditions, and any pending issues to ensure continuity of care and seamless operations between shifts.",
    category: "Radio Communication",
  },
  {
    id: 243,
    question: "What is active listening?",
    options: [
          "Hearing what someone says without responding",
          "Fully concentrating on what is being said, understanding, responding, and remembering",
          "Interrupting the speaker with questions",
          "Multitasking while someone is talking"
    ],
    correctAnswer: 1,
    explanation: "Active listening involves fully concentrating on the speaker, understanding their message, responding appropriately, and remembering what was said for effective communication.",
    category: "Radio Communication",
  },
  {
    id: 244,
    question: "Why is accurate documentation important in EMS?",
    options: [
          "To fill time during slow shifts",
          "To provide a legal and medical record of patient care",
          "Only for billing and insurance purposes",
          "To count the number of calls handled"
    ],
    correctAnswer: 1,
    explanation: "Accurate documentation provides a legal and medical record of patient care, protects providers in legal proceedings, ensures continuity of care between providers, and supports quality improvement efforts. Remember: if it wasn't documented, it wasn't done.",
    category: "Radio Communication",
  },
  {
    id: 245,
    question: "What is the purpose of a written incident report?",
    options: [
          "To assign blame to individuals",
          "To document facts objectively about an incident",
          "To create publicity for the agency",
          "To count the number of incidents"
    ],
    correctAnswer: 1,
    explanation: "Incident reports document factual details objectively about unusual occurrences, accidents, or policy violations. They are used to identify trends, prevent future incidents, and support quality improvement — not to assign blame.",
    category: "AMATS",
  },
  {
    id: 246,
    question: "What is the key benefit of effective teamwork in EMS?",
    options: [
          "Individual recognition and awards",
          "Improved patient outcomes and safety",
          "Reduced need for training and education",
          "Elimination of all medical errors"
    ],
    correctAnswer: 1,
    explanation: "Effective teamwork ensures coordinated, efficient care that reduces errors, improves patient outcomes, and enhances provider safety and satisfaction. Clear communication, defined roles, and mutual respect are essential components.",
    category: "Radio Communication",
  },
  {
    id: 247,
    question: "What is 'crew resource management' (CRM) in EMS?",
    options: [
          "Managing the crew's schedule and shifts",
          "Using all available resources effectively for safe operations",
          "Managing patient complaints and feedback",
          "Assigning tasks without team consultation"
    ],
    correctAnswer: 1,
    explanation: "CRM utilizes all available resources — people, equipment, and information — to ensure safe and efficient operations. It emphasizes communication, situational awareness, teamwork, and decision-making to reduce errors and improve outcomes.",
    category: "Radio Communication",
  },
  {
    id: 248,
    question: "What is the role of a team leader during an emergency call?",
    options: [
          "To do all tasks alone without assistance",
          "To direct and coordinate team members for effective patient care",
          "To delegate all tasks and only observe",
          "To drive the ambulance only"
    ],
    correctAnswer: 1,
    explanation: "The team leader directs and coordinates team members, ensures tasks are completed in proper sequence, maintains situational awareness, and makes critical decisions for effective patient care. They also serve as the communication link with medical control.",
    category: "Radio Communication",
  },
  {
    id: 249,
    question: "What is constructive feedback?",
    options: [
          "Criticizing a colleague",
          "Specific, actionable suggestions for improvement",
          "Ignoring mistakes",
          "Only positive comments with no substance"
    ],
    correctAnswer: 1,
    explanation: "Constructive feedback provides specific, actionable suggestions for improvement rather than vague criticism. It focuses on behaviors and outcomes, not personal attributes, helping colleagues grow professionally while maintaining positive working relationships.",
    category: "Radio Communication",
  },
  {
    id: 250,
    question: "What is the purpose of a post-call debriefing?",
    options: [
          "To gossip about the patient and call details",
          "To review the call, identify lessons learned, and improve performance",
          "To assign blame for mistakes made",
          "To plan social activities for the team"
    ],
    correctAnswer: 1,
    explanation: "Post-call debriefing is a structured review of the emergency call to identify what went well, what could be improved, and to reinforce best practices for future calls. It promotes continuous learning without assigning blame.",
    category: "Radio Communication",
  },
  {
    id: 251,
    question: "Which action best demonstrates career professionalism in EMS?",
    options: [
          "Arriving late for shifts",
          "Setting work priorities and maintaining accountability",
          "Refusing tasks",
          "Gossiping about colleagues and patients"
    ],
    correctAnswer: 1,
    explanation: "Professionalism involves setting work priorities, maintaining accountability, arriving on time, conducting oneself with integrity, and treating all patients and colleagues with respect regardless of personal bias.",
    category: "Legal/Ethical",
  },
  {
    id: 252,
    question: "What is the purpose of continuing education in EMS?",
    options: [
          "To earn more money",
          "To maintain and update clinical knowledge and skills",
          "To avoid working",
          "To become a doctor"
    ],
    correctAnswer: 1,
    explanation: "Continuing education ensures EMS providers maintain and update their clinical knowledge and skills, stay current with evolving protocols and best practices, and meet certification requirements. It is essential for providing safe, evidence-based patient care.",
    category: "Legal/Ethical",
  },
  {
    id: 253,
    question: "What is ethical behavior in EMS?",
    options: [
          "Treating patients differently based on personal bias",
          "Adhering to moral principles and professional standards",
          "Accepting gifts from patients in exchange for favors",
          "Sharing patient information casually with others"
    ],
    correctAnswer: 1,
    explanation: "Ethical behavior in EMS requires honesty, integrity, adhering to moral principles and professional standards, treating all patients equally regardless of background, maintaining confidentiality, and avoiding conflicts of interest.",
    category: "Legal/Ethical",
  },
  {
    id: 254,
    question: "What is the purpose of a code of ethics in EMS?",
    options: [
          "To create rules for punishing employees",
          "To provide a framework for professional conduct and decision-making",
          "To increase revenue and profits",
          "To reduce the number of staff required"
    ],
    correctAnswer: 1,
    explanation: "A code of ethics establishes professional standards and provides a framework for ethical conduct and decision-making, guiding providers in maintaining integrity, accountability, and public trust in the EMS profession.",
    category: "Legal/Ethical",
  },
  {
    id: 255,
    question: "What is stress management important for in EMS?",
    options: [
          "Only for personal enjoyment and relaxation",
          "Preventing burnout, maintaining mental health, and ensuring quality patient care",
          "To avoid work responsibilities",
          "To get more vacation time approved"
    ],
    correctAnswer: 1,
    explanation: "Stress management prevents burnout, maintains mental health, and ensures quality patient care by helping providers cope with the emotional and psychological demands of EMS work. Strategies include peer support, critical incident stress debriefing, exercise, and professional counseling.",
    category: "Legal/Ethical",
  },
  {
    id: 256,
    question: "What is the purpose of a post-incident analysis?",
    options: [
          "To assign blame for mistakes",
          "To review the incident response and identify areas for improvement",
          "To increase workload",
          "To document patient information only"
    ],
    correctAnswer: 1,
    explanation: "A post-incident analysis reviews the response to identify what went well and what could be improved, enhancing future performance without assigning blame.",
    category: "AMATS",
  },
  {
    id: 257,
    question: "What is the purpose of a risk assessment in the workplace?",
    options: [
          "To create more paperwork and bureaucracy",
          "To identify hazards, assess risks, and implement control measures",
          "To count the number of employees present",
          "To determine salary"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment identifies workplace hazards, evaluates the level of risk they pose, and implements appropriate control measures to protect the health and safety of all workers. It is a systematic process required by occupational safety regulations.",
    category: "OSH",
  },
  {
    id: 258,
    question: "What is the hierarchy of controls for managing workplace hazards?",
    options: [
          "PPE first, then engineering controls",
          "Elimination, substitution, engineering controls, administrative controls, and PPE",
          "Administrative controls first, then elimination",
          "PPE only"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of controls prioritizes elimination (most effective), followed by substitution, engineering controls, administrative controls, and PPE (least effective). This systematic approach reduces workplace hazards from the most to least reliable methods.",
    category: "OSH",
  },
  {
    id: 259,
    question: "What is the purpose of Material Safety Data Sheets \(MSDS/SDS\)?",
    options: [
          "To list product prices",
          "To provide safety information about hazardous chemicals",
          "To advertise products",
          "To record employee attendance and schedules"
    ],
    correctAnswer: 1,
    explanation: "MSDS/SDS provides critical safety information about hazardous chemicals including physical properties, health effects, first-aid measures, proper storage, handling procedures, and personal protective equipment requirements, enabling workers to handle chemicals safely.",
    category: "OSH",
  },
  {
    id: 260,
    question: "What is the correct action if an EMS provider identifies a new workplace hazard?",
    options: [
          "Ignore it",
          "Report it immediately to the supervisor and document the hazard",
          "Wait for the next scheduled inspection to mention it",
          "Only report if someone gets injured first"
    ],
    correctAnswer: 1,
    explanation: "Newly identified hazards must be reported immediately to the supervisor and documented to ensure prompt corrective action. All employees have a responsibility to report hazards to protect the safety of themselves and their colleagues.",
    category: "OSH",
  }
]
