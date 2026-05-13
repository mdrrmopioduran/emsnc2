export interface Acronym {
  acronym: string;
  fullTerm: string;
  definition: string;
  category: "philippines" | "clinical" | "assessment" | "general" | "drugs";
}

export const acronyms: Acronym[] = [
  // ===== Philippines-Specific =====
  {
    acronym: "BFP",
    fullTerm: "Bureau of Fire Protection",
    definition:
      "The primary fire suppression and rescue agency under the DILG, also responsible for EMS and rescue operations in many municipalities across the Philippines.",
    category: "philippines",
  },
  {
    acronym: "PNP",
    fullTerm: "Philippine National Police",
    definition:
      "The national police force of the Philippines that assists in emergency response, scene security, and traffic management during EMS operations.",
    category: "philippines",
  },
  {
    acronym: "DOH",
    fullTerm: "Department of Health",
    definition:
      "The executive department of the Philippine government responsible for public health, EMS standards, and healthcare policy including the National EMS Framework.",
    category: "philippines",
  },
  {
    acronym: "TESDA",
    fullTerm: "Technical Education and Skills Development Authority",
    definition:
      "The Philippine government agency that sets competency standards and certifies EMS First Responders through the National Certificate II (NCII) qualification.",
    category: "philippines",
  },
  {
    acronym: "NDRRMC",
    fullTerm: "National Disaster Risk Reduction and Management Council",
    definition:
      "The Philippine government body that coordinates disaster preparedness, response, and recovery efforts, including multi-agency EMS coordination during major emergencies.",
    category: "philippines",
  },
  {
    acronym: "AMATS",
    fullTerm: "Ambulance Medical Assistance and Transfer System",
    definition:
      "The Philippine national system for coordinating emergency ambulance dispatch, medical assistance, and inter-facility patient transfers under DOH oversight.",
    category: "philippines",
  },
  {
    acronym: "LGU",
    fullTerm: "Local Government Unit",
    definition:
      "City or municipal government bodies that fund and operate local EMS and rescue services, including emergency response units and ambulance services.",
    category: "philippines",
  },
  {
    acronym: "PhilHealth",
    fullTerm: "Philippine Health Insurance Corporation",
    definition:
      "The national health insurance program that provides coverage for emergency medical services and hospital care for Filipino citizens.",
    category: "philippines",
  },
  {
    acronym: "DILG",
    fullTerm: "Department of the Interior and Local Government",
    definition:
      "The executive department overseeing local governance, public safety, and the BFP, with a role in EMS system development at the local level.",
    category: "philippines",
  },
  {
    acronym: "OCD",
    fullTerm: "Office of Civil Defense",
    definition:
      "The government agency under the DND that administers the national civil defense program and coordinates with NDRRMC during disasters and emergencies.",
    category: "philippines",
  },
  {
    acronym: "PRC",
    fullTerm: "Professional Regulation Commission",
    definition:
      "The Philippine agency responsible for professional licensure, including the ongoing development of licensure standards for EMS and allied health professionals.",
    category: "philippines",
  },
  {
    acronym: "DOLE",
    fullTerm: "Department of Labor and Employment",
    definition:
      "The Philippine agency that enforces Occupational Safety and Health Standards (OSHS) applicable to EMS workplaces and personnel.",
    category: "philippines",
  },
  {
    acronym: "RA 10971",
    fullTerm: "Republic Act No. 10971",
    definition:
      "The Philippine law providing for the development of emergency medical services in the country, establishing the legal foundation for the national EMS system.",
    category: "philippines",
  },
  {
    acronym: "RA 10871",
    fullTerm: "Republic Act No. 10871",
    definition:
      "The Basic Life Support for Schools Act, mandating BLS training for basic education students in the Philippines to improve community CPR response rates.",
    category: "philippines",
  },
  {
    acronym: "OSHC",
    fullTerm: "Occupational Safety and Health Center",
    definition:
      "The agency under DOLE that develops and promotes OSH standards, including guidelines for EMS provider safety and workplace health.",
    category: "philippines",
  },

  // ===== Clinical =====
  {
    acronym: "BLS",
    fullTerm: "Basic Life Support",
    definition:
      "The foundation of emergency cardiovascular care including CPR, AED use, and relief of foreign-body airway obstruction, performed without advanced equipment.",
    category: "clinical",
  },
  {
    acronym: "ALS",
    fullTerm: "Advanced Life Support",
    definition:
      "Advanced emergency care including IV access, advanced airway management, cardiac monitoring, and medication administration beyond BLS interventions.",
    category: "clinical",
  },
  {
    acronym: "CPR",
    fullTerm: "Cardiopulmonary Resuscitation",
    definition:
      "The emergency procedure combining chest compressions and rescue breaths to maintain circulatory flow and oxygenation in cardiac arrest patients.",
    category: "clinical",
  },
  {
    acronym: "AED",
    fullTerm: "Automated External Defibrillator",
    definition:
      "A portable device that analyzes heart rhythm and delivers an electrical shock to restore normal rhythm in ventricular fibrillation or pulseless ventricular tachycardia.",
    category: "clinical",
  },
  {
    acronym: "EMS",
    fullTerm: "Emergency Medical Services",
    definition:
      "The integrated system of prehospital emergency care including dispatch, response, assessment, treatment, and transport of patients with acute illness or injury.",
    category: "clinical",
  },
  {
    acronym: "EMT",
    fullTerm: "Emergency Medical Technician",
    definition:
      "A trained prehospital care provider certified to perform BLS, patient assessment, and certain ALS interventions depending on certification level.",
    category: "clinical",
  },
  {
    acronym: "AHA",
    fullTerm: "American Heart Association",
    definition:
      "The organization that publishes the Guidelines for CPR and Emergency Cardiovascular Care, the international standard for resuscitation protocols.",
    category: "clinical",
  },
  {
    acronym: "ACLS",
    fullTerm: "Advanced Cardiovascular Life Support",
    definition:
      "A set of clinical interventions for the urgent treatment of cardiac arrest, stroke, and other life-threatening cardiovascular emergencies, beyond BLS.",
    category: "clinical",
  },
  {
    acronym: "PALS",
    fullTerm: "Pediatric Advanced Life Support",
    definition:
      "A systematic approach to the assessment and management of critically ill pediatric patients, including pediatric cardiac arrest algorithms.",
    category: "clinical",
  },
  {
    acronym: "BVM",
    fullTerm: "Bag-Valve-Mask",
    definition:
      "A manual resuscitator device used to provide positive-pressure ventilation to patients who are not breathing or have inadequate respiration.",
    category: "clinical",
  },
  {
    acronym: "OPA",
    fullTerm: "Oropharyngeal Airway",
    definition:
      "A curved plastic device inserted into the mouth to maintain airway patency by preventing the tongue from obstructing the oropharynx in unconscious patients.",
    category: "clinical",
  },
  {
    acronym: "NPA",
    fullTerm: "Nasopharyngeal Airway",
    definition:
      "A soft rubber or plastic tube inserted through the nostril to maintain airway patency, usable in semi-conscious patients where an OPA may trigger gag reflex.",
    category: "clinical",
  },
  {
    acronym: "ROSC",
    fullTerm: "Return of Spontaneous Circulation",
    definition:
      "The resumption of a palpable pulse and measurable blood pressure following cardiac arrest, indicating successful resuscitation.",
    category: "clinical",
  },
  {
    acronym: "VF",
    fullTerm: "Ventricular Fibrillation",
    definition:
      "A chaotic, disorganized heart rhythm originating from the ventricles that produces no effective cardiac output and is the most common initial rhythm in sudden cardiac arrest.",
    category: "clinical",
  },
  {
    acronym: "VT",
    fullTerm: "Ventricular Tachycardia",
    definition:
      "A rapid heart rhythm originating from the ventricles; pulseless VT is a shockable rhythm requiring immediate defibrillation.",
    category: "clinical",
  },
  {
    acronym: "PEA",
    fullTerm: "Pulseless Electrical Activity",
    definition:
      "A condition where organized electrical activity is present on the ECG but no palpable pulse exists; a non-shockable rhythm requiring CPR and epinephrine.",
    category: "clinical",
  },
  {
    acronym: "ECP",
    fullTerm: "Emergency Care Practitioner",
    definition:
      "A healthcare worker trained to provide advanced emergency care.",
    category: "clinical",
  },
  {
    acronym: "MI",
    fullTerm: "Myocardial Infarction",
    definition:
      "A heart attack, which happens when the heart doesn't get enough blood.",
    category: "clinical",
  },
  {
    acronym: "NKDA",
    fullTerm: "No Known Drug Allergies",
    definition:
      "A note to say that a person has no known allergies to medications.",
    category: "clinical",
  },
  {
    acronym: "BT",
    fullTerm: "Body Temperature",
    definition:
      "Measured in °C or °F; a key vital sign that indicates the body's thermal state and can signal infection, hypothermia, or heat illness.",
    category: "clinical",
  },
  {
    acronym: "PR",
    fullTerm: "Pulse Rate",
    definition:
      "Another term for heart rate; the number of heartbeats per minute, a fundamental vital sign in patient assessment.",
    category: "clinical",
  },

  // ===== Assessment =====
  {
    acronym: "SAMPLE",
    fullTerm: "Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events",
    definition:
      "The standard mnemonic for obtaining a focused medical history during patient assessment, covering key information needed for treatment decisions.",
    category: "assessment",
  },
  {
    acronym: "DCAP-BTLS",
    fullTerm: "Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling",
    definition:
      "A systematic mnemonic for performing a head-to-toe physical examination, ensuring no significant traumatic findings are missed.",
    category: "assessment",
  },
  {
    acronym: "LOC",
    fullTerm: "Level of Consciousness",
    definition:
      "A measurement of a patient's awareness and responsiveness, assessed using the AVPU scale or Glasgow Coma Scale.",
    category: "assessment",
  },
  {
    acronym: "GCS",
    fullTerm: "Glasgow Coma Scale",
    definition:
      "A neurological assessment tool scoring eye opening (1-4), verbal response (1-5), and motor response (1-6), with a total range of 3-15; lower scores indicate more severe brain injury.",
    category: "assessment",
  },
  {
    acronym: "AVPU",
    fullTerm: "Alert, Verbal, Pain, Unresponsive",
    definition:
      "A rapid consciousness assessment scale used in the primary survey to quickly determine a patient's level of responsiveness.",
    category: "assessment",
  },
  {
    acronym: "OPQRST",
    fullTerm: "Onset, Provocation/Palliation, Quality, Radiation, Severity, Time",
    definition:
      "A mnemonic for systematic pain assessment, used during the secondary survey to characterize the nature and severity of a patient's pain.",
    category: "assessment",
  },
  {
    acronym: "MOI",
    fullTerm: "Mechanism of Injury",
    definition:
      "The forces and circumstances that caused a traumatic injury, used during scene size-up to predict injury patterns and guide assessment priorities.",
    category: "assessment",
  },
  {
    acronym: "NOI",
    fullTerm: "Nature of Illness",
    definition:
      "The apparent cause or type of medical condition a patient is experiencing, determined from scene assessment and patient history for medical patients.",
    category: "assessment",
  },
  {
    acronym: "AOx4",
    fullTerm: "Alert and Oriented × 4",
    definition:
      "A patient who is alert and correctly oriented to person, place, time, and event, indicating normal cognitive function.",
    category: "assessment",
  },
  {
    acronym: "DNR",
    fullTerm: "Do Not Resuscitate",
    definition:
      "A legal order indicating that CPR and other resuscitative measures should not be performed if the patient experiences cardiac arrest or respiratory failure.",
    category: "assessment",
  },
  {
    acronym: "ABCDE",
    fullTerm: "Airway, Breathing, Circulation, Disability, Exposure",
    definition:
      "The systematic approach to primary survey assessment, prioritizing the identification and treatment of life-threatening conditions in order.",
    category: "assessment",
  },
  {
    acronym: "FAST",
    fullTerm: "Face, Arms, Speech, Time",
    definition:
      "A stroke recognition tool assessing facial droop, arm drift, speech abnormalities, and the critical importance of time to treatment.",
    category: "assessment",
  },
  {
    acronym: "PAT",
    fullTerm: "Pediatric Assessment Triangle",
    definition:
      "An across-the-room assessment tool for pediatric patients evaluating Appearance, Work of Breathing, and Circulation to Skin without physical contact.",
    category: "assessment",
  },
  {
    acronym: "BEFAST",
    fullTerm: "Balance / Eyes / Face / Arms / Speech / Time",
    definition:
      "Used to recognize stroke symptoms: Balance problems, Eye vision changes, Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.",
    category: "assessment",
  },
  {
    acronym: "DNI",
    fullTerm: "Do Not Intubate",
    definition:
      "A directive not to place a breathing tube; a legal order indicating that endotracheal intubation should not be performed if the patient experiences respiratory failure.",
    category: "assessment",
  },
  {
    acronym: "APGAR",
    fullTerm: "Appearance, Pulse, Grimace, Activity, Respiration",
    definition:
      "A quick test to check the health of a newborn baby after birth, scoring each category 0-2 for a maximum total of 10.",
    category: "assessment",
  },
  {
    acronym: "PEARL",
    fullTerm: "Pupils Equal and React to Light",
    definition:
      "A check to see if both pupils react properly to light, helping to spot brain problems or neurological injury.",
    category: "assessment",
  },

  // ===== Drugs/Equipment =====
  {
    acronym: "IV",
    fullTerm: "Intravenous",
    definition:
      "A route of medication or fluid administration directly into a vein, the preferred route for rapid drug delivery in emergency situations.",
    category: "drugs",
  },
  {
    acronym: "BP",
    fullTerm: "Blood Pressure",
    definition:
      "The force of blood against arterial walls; measured as systolic over diastolic pressure in mmHg, a key vital sign in patient assessment.",
    category: "assessment",
  },
  {
    acronym: "HR",
    fullTerm: "Heart Rate",
    definition:
      "The number of heartbeats per minute; a fundamental vital sign that indicates cardiovascular function and overall patient condition.",
    category: "assessment",
  },
  {
    acronym: "RR",
    fullTerm: "Respiratory Rate",
    definition:
      "The number of breaths per minute; a critical vital sign that indicates respiratory function and the need for intervention.",
    category: "assessment",
  },
  {
    acronym: "SpO2",
    fullTerm: "Peripheral Capillary Oxygen Saturation",
    definition:
      "A pulse oximetry measurement of oxygen saturation in the blood, with normal values typically 95-100%; below 90% indicates hypoxemia.",
    category: "assessment",
  },
  {
    acronym: "ECG",
    fullTerm: "Electrocardiogram",
    definition:
      "A diagnostic test that records the electrical activity of the heart, used to identify arrhythmias, ischemia, and other cardiac abnormalities.",
    category: "assessment",
  },
  {
    acronym: "EKG",
    fullTerm: "Elektrokardiogramm (German)",
    definition:
      "An alternative abbreviation for ECG derived from the German spelling; both ECG and EKG refer to the same cardiac electrical recording.",
    category: "assessment",
  },
  {
    acronym: "PPE",
    fullTerm: "Personal Protective Equipment",
    definition:
      "Equipment worn to minimize exposure to hazards, including gloves, masks, eye protection, and gowns, essential for BSI and Standard Precautions.",
    category: "general",
  },
  {
    acronym: "TTM",
    fullTerm: "Targeted Temperature Management",
    definition:
      "Post-cardiac arrest care involving controlled temperature regulation (32-37.5°C per AHA 2025) to improve neurological outcomes after ROSC.",
    category: "drugs",
  },
  {
    acronym: "IM",
    fullTerm: "Intramuscular",
    definition:
      "A route of medication administration into a muscle, used for epinephrine auto-injectors and certain other emergency medications.",
    category: "drugs",
  },
  {
    acronym: "SL",
    fullTerm: "Sublingual",
    definition:
      "A route of medication administration under the tongue, used for nitroglycerin and certain other medications for rapid absorption.",
    category: "drugs",
  },
  {
    acronym: "PO",
    fullTerm: "Per Os (By Mouth)",
    definition:
      "A route of medication administration by mouth; used for oral glucose, aspirin, and other medications that can be swallowed.",
    category: "drugs",
  },
  {
    acronym: "NEB",
    fullTerm: "Nebulizer",
    definition:
      "A device that converts liquid medication into a fine mist for inhalation, commonly used for administering bronchodilators like albuterol.",
    category: "drugs",
  },
  {
    acronym: "GTN",
    fullTerm: "Glyceryl Trinitrate",
    definition:
      "A medicine used to treat chest pain by improving blood flow to the heart; also known as nitroglycerin, administered sublingually for rapid relief of angina.",
    category: "drugs",
  },
  {
    acronym: "PMDI",
    fullTerm: "Pressurized Metered Dose Inhaler",
    definition:
      "A device used to release medicine to help someone with breathing problems like asthma, delivering a measured dose of medication in aerosol form.",
    category: "drugs",
  },

  // ===== General =====
  {
    acronym: "MCI",
    fullTerm: "Mass Casualty Incident",
    definition:
      "An event where the number of patients exceeds available resources, requiring triage, prioritized care, and activation of the Incident Command System.",
    category: "general",
  },
  {
    acronym: "ICS",
    fullTerm: "Incident Command System",
    definition:
      "A standardized management framework for emergency response that provides a common organizational structure for multi-agency coordination.",
    category: "general",
  },
  {
    acronym: "NIMS",
    fullTerm: "National Incident Management System",
    definition:
      "A comprehensive, national approach to incident management applicable at all jurisdictional levels and across functional disciplines.",
    category: "general",
  },
  {
    acronym: "SOP",
    fullTerm: "Standard Operating Procedure",
    definition:
      "A set of step-by-step instructions compiled to help workers carry out routine operations consistently and in compliance with established standards.",
    category: "general",
  },
  {
    acronym: "PCR",
    fullTerm: "Patient Care Report",
    definition:
      "The legal document that records all assessments, interventions, patient responses, and communications during an EMS response; essential for continuity of care and legal protection.",
    category: "general",
  },
  {
    acronym: "CO",
    fullTerm: "Carbon Monoxide",
    definition:
      "A colorless, odorless, toxic gas produced by incomplete combustion that can cause poisoning with symptoms including headache, nausea, and altered mental status.",
    category: "general",
  },
  {
    acronym: "HAZMAT",
    fullTerm: "Hazardous Materials",
    definition:
      "Substances that pose a risk to health, safety, or the environment; requires specialized training, PPE, and protocols for EMS response.",
    category: "general",
  },
  {
    acronym: "TB",
    fullTerm: "Tuberculosis",
    definition:
      "An infectious disease caused by Mycobacterium tuberculosis, primarily affecting the lungs; a major occupational health risk for EMS providers in the Philippines requiring N95 respirator use.",
    category: "general",
  },
  {
    acronym: "BSI",
    fullTerm: "Body Substance Isolation",
    definition:
      "An infection control practice that treats all body fluids as potentially infectious, requiring the use of appropriate PPE before patient contact.",
    category: "general",
  },
  {
    acronym: "CISM",
    fullTerm: "Critical Incident Stress Management",
    definition:
      "A comprehensive, integrated, and multi-component crisis intervention system designed to manage psychological stress in emergency responders after traumatic events.",
    category: "general",
  },
  {
    acronym: "SBAR",
    fullTerm: "Situation, Background, Assessment, Recommendation",
    definition:
      "A structured communication framework used for reporting patient information between healthcare providers, ensuring clear and complete handoff.",
    category: "general",
  },
  {
    acronym: "SMR",
    fullTerm: "Spinal Motion Restriction",
    definition:
      "The modern approach to spinal injury management that limits spinal movement using cervical collars, padding, and careful handling, replacing the term 'spinal immobilization.'",
    category: "general",
  },
  {
    acronym: "START",
    fullTerm: "Simple Triage and Rapid Treatment",
    definition:
      "A triage method used in mass casualty incidents that rapidly categorizes patients into Immediate, Delayed, Minor, and Expectant groups based on respiration, perfusion, and mental status.",
    category: "general",
  },
  {
    acronym: "PAD",
    fullTerm: "Public Access Defibrillation",
    definition:
      "Programs that place AEDs in public locations and train community members in their use, improving early defibrillation rates for out-of-hospital cardiac arrest.",
    category: "general",
  },
  {
    acronym: "EOC",
    fullTerm: "Emergency Operations Center",
    definition:
      "A central command and control facility responsible for coordinating emergency response, resource allocation, and communication during major incidents.",
    category: "general",
  },
  {
    acronym: "OHCA",
    fullTerm: "Out-of-Hospital Cardiac Arrest",
    definition:
      "Cardiac arrest occurring outside a hospital setting, where survival depends on the strength of the Chain of Survival including early CPR and defibrillation.",
    category: "general",
  },
  {
    acronym: "EMD",
    fullTerm: "Emergency Medical Dispatcher",
    definition:
      "A trained telecommunicator who receives emergency calls, dispatches appropriate resources, and provides pre-arrival instructions including dispatcher-assisted CPR.",
    category: "general",
  },
  {
    acronym: "NCII",
    fullTerm: "National Certificate Level II",
    definition:
      "The TESDA certification level for EMS First Responders, attesting that the holder has demonstrated competency in the required skills and knowledge for prehospital emergency care.",
    category: "general",
  },
  {
    acronym: "ICE",
    fullTerm: "In Case of Emergency",
    definition:
      "A contact number or plan to reach someone quickly in an emergency; commonly stored in mobile phones under ICE contacts for first responders.",
    category: "general",
  },
  {
    acronym: "MIU",
    fullTerm: "Minor Injuries Unit",
    definition:
      "A place where you can go for quick treatment of less serious injuries, like cuts or sprains, reducing burden on emergency departments.",
    category: "general",
  },
  {
    acronym: "ETA",
    fullTerm: "Exact Time Arrived",
    definition:
      "The precise time of arrival at the scene or hospital; an important documentation element in the Patient Care Report for tracking response times.",
    category: "general",
  },
];
