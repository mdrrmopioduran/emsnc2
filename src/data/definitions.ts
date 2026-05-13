export interface Definition {
  term: string;
  definition: string;
  example: string;
  category: "legal" | "clinical" | "operations" | "assessment" | "general";
}

export const definitions: Definition[] = [
  // ===== Legal =====
  {
    term: "Triage",
    definition:
      "The process of prioritizing patients for treatment based on the severity of their condition when resources are limited, ensuring the greatest good for the greatest number.",
    example:
      "During a bus accident with 20 casualties, the EMS provider uses START triage to categorize patients: the patient with massive hemorrhage is tagged Red (Immediate), while the patient with a forearm fracture is tagged Yellow (Delayed).",
    category: "legal",
  },
  {
    term: "Scope of Practice",
    definition:
      "The defined set of skills, interventions, and activities that a healthcare provider is legally authorized and trained to perform based on their certification level.",
    example:
      "An EMS First Responder (NCII) may assist a patient with their prescribed nitroglycerin but cannot initiate an IV line, which is outside their scope of practice.",
    category: "legal",
  },
  {
    term: "Standard of Care",
    definition:
      "The level of care, skill, and treatment that a reasonably competent provider with the same training would provide under similar circumstances.",
    example:
      "If a trained EMT fails to perform a primary survey on a trauma patient and misses a blocked airway, this may represent a breach of the standard of care expected of all EMTs.",
    category: "legal",
  },
  {
    term: "Negligence",
    definition:
      "A legal concept where a provider fails to meet the standard of care, causing harm to a patient. Requires four elements: duty, breach, proximate cause, and damages.",
    example:
      "An on-duty EMT responds to a call but fails to check the patient's airway, resulting in death from an unrecognized airway obstruction—all four elements of negligence are present.",
    category: "legal",
  },
  {
    term: "Abandonment",
    definition:
      "The termination of care without ensuring that an equal or higher level of care has been assumed by another qualified provider, or without the patient's consent to terminate.",
    example:
      "An EMT treats a patient at a scene but leaves before turning over care to hospital staff—this constitutes abandonment because care was terminated without a proper transfer.",
    category: "legal",
  },
  {
    term: "Consent (Expressed)",
    definition:
      "Consent given explicitly by a competent patient, either verbally or in writing, after being informed of the nature and risks of the proposed treatment.",
    example:
      "A conscious, alert patient verbally agrees to have a wound dressed after the EMT explains the procedure—this is expressed consent.",
    category: "legal",
  },
  {
    term: "Consent (Implied)",
    definition:
      "Consent presumed by law when a patient is unable to give expressed consent (unconscious, altered mental status, minor without guardian) but would reasonably agree to life-saving treatment.",
    example:
      "An unconscious patient from a vehicular crash is treated without verbal or written agreement—implied consent applies because a reasonable person would consent to life-saving care.",
    category: "legal",
  },
  {
    term: "Duty to Act",
    definition:
      "A legal obligation to provide care that arises from an employment relationship, contractual agreement, or in some jurisdictions, from initiating patient contact.",
    example:
      "An on-duty EMT dispatched to a call has a duty to act; an off-duty EMT who stops to help may have a duty once they begin providing care.",
    category: "legal",
  },
  {
    term: "Good Samaritan Law",
    definition:
      "Legal protection for individuals who voluntarily render emergency care in good faith, without compensation, and without gross negligence or willful misconduct.",
    example:
      "An off-duty nurse performs CPR on a cardiac arrest victim at a mall—the Good Samaritan Law protects her from liability provided she acted in good faith and within her training.",
    category: "legal",
  },
  {
    term: "Res Ipsa Loquitur",
    definition:
      "A legal doctrine meaning 'the thing speaks for itself,' applied when the negligence is so obvious that no expert testimony is required to prove it occurred.",
    example:
      "A patient is dropped from a stretcher by EMS crew and sustains a head injury—the circumstances themselves demonstrate negligence without needing expert explanation.",
    category: "legal",
  },
  {
    term: "Protocols",
    definition:
      "Written, approved guidelines that establish the standard of care for specific clinical situations, authorizing EMS providers to perform certain interventions under medical direction.",
    example:
      "A protocol may authorize an EMT to administer aspirin to a patient with chest pain suggestive of a heart attack without requiring direct physician authorization for each case.",
    category: "legal",
  },
  {
    term: "Standing Orders",
    definition:
      "Pre-authorized treatment instructions from medical direction that allow EMS providers to perform specific interventions without requiring real-time physician consultation.",
    example:
      "The standing order for a patient in anaphylaxis allows the EMT to assist with epinephrine auto-injector administration without calling medical direction first.",
    category: "legal",
  },
  {
    term: "Medical Direction",
    definition:
      "The physician oversight of an EMS system that ensures quality of care through protocols, training, consultation, and quality improvement; required for all EMS operations.",
    example:
      "Every EMS agency in the Philippines must have a medical director who establishes treatment protocols and provides online and offline medical control.",
    category: "legal",
  },
  {
    term: "Online Medical Control",
    definition:
      "Real-time, direct communication with a physician during an emergency response for guidance on patient care decisions beyond standing orders.",
    example:
      "An EMT calls the base station hospital physician for guidance on whether to administer a medication not covered by standing orders—this is online medical control.",
    category: "legal",
  },
  {
    term: "Offline Medical Control",
    definition:
      "Indirect physician oversight through written protocols, standing orders, training, and retrospective case review, rather than real-time communication.",
    example:
      "The medical director reviews PCRs monthly and updates treatment protocols based on current evidence—this is offline medical control.",
    category: "legal",
  },

  // ===== Operations =====
  {
    term: "Mass Casualty Incident",
    definition:
      "An event that produces more patients than available resources can handle using normal procedures, requiring triage, multi-agency coordination, and the Incident Command System.",
    example:
      "A building collapse in Manila produces 50 casualties with only 3 ambulances initially available—the incident is declared an MCI, triggering START triage and ICS activation.",
    category: "operations",
  },
  {
    term: "Golden Hour",
    definition:
      "The concept that seriously injured patients have the best chance of survival if they receive definitive surgical care within 60 minutes of injury.",
    example:
      "A patient with internal bleeding from a vehicular crash must reach a trauma center for surgery within 60 minutes—the Golden Hour—to optimize survival chances.",
    category: "operations",
  },
  {
    term: "Platinum 10 Minutes",
    definition:
      "The critical first 10 minutes on scene during which the most important life-saving interventions must be performed, including airway management and hemorrhage control.",
    example:
      "Upon arriving at a trauma scene, the EMT must assess and address the airway, control major bleeding, and prepare for transport within 10 minutes—the Platinum 10.",
    category: "operations",
  },
  {
    term: "Definitive Care",
    definition:
      "The final, most effective treatment for a condition, typically provided at a hospital with the appropriate specialists and resources.",
    example:
      "For a patient with a heart attack, definitive care is cardiac catheterization at a hospital with a catheterization lab—not the aspirin and oxygen provided by EMS.",
    category: "operations",
  },
  {
    term: "Incident Command System",
    definition:
      "A standardized, flexible management framework used to coordinate emergency response across multiple agencies, with defined roles including Incident Commander, Operations, Logistics, Planning, and Administration.",
    example:
      "During a typhoon response, the Incident Commander coordinates BFP, PNP, LGU rescue teams, and volunteer organizations using the ICS structure to ensure efficient resource use.",
    category: "operations",
  },
  {
    term: "Scene Size-Up",
    definition:
      "The initial assessment of the emergency scene to identify hazards, determine the MOI/NOI, estimate patient count, and identify resource needs before making patient contact.",
    example:
      "Before exiting the ambulance at a crash scene, the EMT observes downed power lines, the number of vehicles involved, and the approximate number of patients—this is scene size-up.",
    category: "operations",
  },
  {
    term: "Loading Dose",
    definition:
      "An initial higher dose of a medication given to rapidly achieve a therapeutic blood concentration, followed by maintenance doses.",
    example:
      "In cardiac arrest, a loading dose of epinephrine 1 mg IV push is given initially, with subsequent doses at 3-5 minute intervals.",
    category: "operations",
  },

  // ===== Clinical =====
  {
    term: "Body Substance Isolation",
    definition:
      "An infection control practice that treats all body fluids as potentially infectious, requiring the use of appropriate PPE before any patient contact.",
    example:
      "Before approaching a bleeding patient, the EMT dons gloves, eye protection, and a mask—this is BSI, the first step in every response.",
    category: "clinical",
  },
  {
    term: "Pathogen",
    definition:
      "A microorganism (bacteria, virus, fungus, or parasite) capable of causing disease in a host organism.",
    example:
      "Hepatitis B virus is a bloodborne pathogen that can infect EMS providers through needlestick injuries or blood contact with mucous membranes.",
    category: "clinical",
  },
  {
    term: "Communicable Disease",
    definition:
      "An illness caused by a pathogen that can be transmitted from one person to another through direct or indirect contact.",
    example:
      "Tuberculosis is a communicable disease transmitted through airborne droplets when an infected person coughs, a significant risk for EMS providers in the Philippines.",
    category: "clinical",
  },
  {
    term: "Standard Precautions",
    definition:
      "Infection control measures that apply to all patients regardless of suspected or confirmed infection status, including hand hygiene, PPE use, and safe injection practices.",
    example:
      "Even if a patient appears healthy, the EMS provider wears gloves and performs hand hygiene after patient contact—Standard Precautions apply to every encounter.",
    category: "clinical",
  },
  {
    term: "Respiration",
    definition:
      "The physiological process of gas exchange—oxygen intake and carbon dioxide elimination—at the alveolar level in the lungs and at the cellular level in tissues.",
    example:
      "A patient with a respiratory rate of 28 breaths per minute and SpO2 of 89% has impaired respiration and requires supplemental oxygen.",
    category: "clinical",
  },
  {
    term: "Perfusion",
    definition:
      "The adequate flow of blood through body tissues, delivering oxygen and nutrients while removing waste products; impaired perfusion leads to shock and organ failure.",
    example:
      "A patient with cool, pale, clammy skin and a delayed capillary refill time of 4 seconds shows signs of poor perfusion from hemorrhagic shock.",
    category: "clinical",
  },
  {
    term: "Hypoxia",
    definition:
      "A dangerous condition in which the body or a region of the body is deprived of adequate oxygen supply, leading to cellular dysfunction and potential death.",
    example:
      "A patient with SpO2 of 85%, cyanotic lips, and altered mental status is hypoxic and requires immediate airway management and supplemental oxygen.",
    category: "clinical",
  },
  {
    term: "Shock",
    definition:
      "A life-threatening condition of inadequate tissue perfusion and oxygenation that can result from hemorrhage, heart failure, infection, or allergic reaction, leading to organ failure and death if untreated.",
    example:
      "A patient who has lost 1.5 liters of blood from a femoral fracture develops tachycardia, hypotension, and altered mental status—classic signs of hypovolemic shock.",
    category: "clinical",
  },
  {
    term: "Atherosclerosis",
    definition:
      "The progressive narrowing of arteries due to plaque buildup (cholesterol, fat, calcium) on the inner walls, reducing blood flow and potentially causing complete blockage.",
    example:
      "A 55-year-old patient with chest pain has atherosclerosis of the coronary arteries, reducing blood flow to the heart muscle and causing angina or myocardial infarction.",
    category: "clinical",
  },
  {
    term: "Myocardial Infarction",
    definition:
      "Death of heart muscle tissue due to complete blockage of a coronary artery, typically presenting with severe chest pain, shortness of breath, and diaphoresis; a medical emergency.",
    example:
      "A patient with crushing substernal chest pain radiating to the left arm, lasting 30 minutes with no relief from rest, is experiencing a myocardial infarction requiring immediate transport.",
    category: "clinical",
  },
  {
    term: "Angina Pectoris",
    definition:
      "Chest pain caused by temporary, partial reduction of blood flow to the heart muscle, typically triggered by exertion and relieved by rest or nitroglycerin.",
    example:
      "A patient who develops chest tightness after climbing stairs, relieved by sitting down and taking prescribed nitroglycerin, is experiencing angina pectoris.",
    category: "clinical",
  },
  {
    term: "Cardiac Arrest",
    definition:
      "The sudden cessation of cardiac mechanical activity, resulting in absence of pulse, breathing, and consciousness; requires immediate CPR and defibrillation if shockable rhythm.",
    example:
      "A patient who suddenly collapses, is unresponsive, has no pulse, and is not breathing is in cardiac arrest—the EMT immediately begins CPR and applies the AED.",
    category: "clinical",
  },
  {
    term: "Agonal Breathing",
    definition:
      "Abnormal, ineffective gasping or labored breathing that occurs in the first minutes after cardiac arrest; does NOT provide adequate oxygenation and should not delay CPR initiation.",
    example:
      "A patient found unresponsive with no pulse is making occasional gasping sounds—this is agonal breathing, not normal respiration, and CPR must be started immediately.",
    category: "clinical",
  },

  // ===== Assessment =====
  {
    term: "SAMPLE History",
    definition:
      "A systematic method for obtaining a patient's medical history: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, and Events leading to the illness or injury.",
    example:
      "When assessing a patient with chest pain, the EMT asks: 'What are your symptoms? Any allergies? What medications do you take? Any past medical history? When did you last eat? What were you doing when the pain started?'",
    category: "assessment",
  },
  {
    term: "OPQRST",
    definition:
      "A mnemonic for pain assessment: Onset (when did it start?), Provocation/Palliation (what makes it better/worse?), Quality (sharp, dull, burning?), Radiation (does it spread?), Severity (0-10 scale), Time (constant or intermittent?).",
    example:
      "For a patient with abdominal pain: Onset—2 hours ago; Provocation—worse after eating; Quality—sharp; Radiation—to the right shoulder; Severity—8/10; Time—constant.",
    category: "assessment",
  },
  {
    term: "DCAP-BTLS",
    definition:
      "A mnemonic for the physical examination of trauma patients: Deformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling.",
    example:
      "During a head-to-toe exam of a motorcyclist, the EMT notes: Deformity of the left wrist, Contusion on the right thigh, Tenderness over the ribs, and Swelling at the ankle.",
    category: "assessment",
  },
  {
    term: "AVPU Scale",
    definition:
      "A rapid assessment of consciousness: Alert (aware and responsive), Verbal (responds to verbal stimuli), Pain (responds only to painful stimuli), Unresponsive (no response to any stimulus).",
    example:
      "A patient who opens their eyes and answers questions appropriately is Alert (A); a patient who only groans when pinched is Pain-responsive (P).",
    category: "assessment",
  },
  {
    term: "Glasgow Coma Scale",
    definition:
      "A standardized neurological assessment scoring three responses: Eye opening (1-4), Verbal response (1-5), Motor response (1-6), with total scores ranging from 3 (worst) to 15 (best).",
    example:
      "A patient who opens eyes to voice (3), speaks confused words (4), and localizes pain (5) has a GCS of 12, indicating moderate head injury.",
    category: "assessment",
  },
  {
    term: "Primary Survey",
    definition:
      "The initial, rapid assessment performed immediately on patient contact to identify and treat life-threatening conditions using the ABCDE approach: Airway, Breathing, Circulation, Disability, Exposure.",
    example:
      "On reaching an unconscious patient, the EMT checks: Airway—clear; Breathing—absent—begins CPR; this is the primary survey addressing immediate life threats.",
    category: "assessment",
  },
  {
    term: "Secondary Survey",
    definition:
      "A comprehensive head-to-toe examination and detailed history performed after the primary survey has identified and addressed all immediate life threats.",
    example:
      "After ensuring the trauma patient has a patent airway and no major bleeding, the EMT performs a systematic head-to-toe exam checking for DCAP-BTLS findings and obtains a SAMPLE history.",
    category: "assessment",
  },
];
