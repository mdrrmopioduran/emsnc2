export interface Drug {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  indications: string[];
  contraindications: string[];
  adultDose: string;
  pediatricDose: string;
  route: string;
  sideEffects: string[];
  specialNotes: string;
  scope: "BLS" | "ALS" | "Both";
}

export const drugs: Drug[] = [
  {
    id: "oxygen",
    genericName: "Oxygen",
    brandNames: ["O2", "Medical Oxygen"],
    drugClass: "Gas / Medicinal Gas",
    indications: [
      "Hypoxemia (SpO2 < 94%)",
      "Respiratory distress",
      "Cardiac arrest and post-ROSC",
      "Suspected CO poisoning",
      "Trauma with shock",
      "ST-elevation myocardial infarction (STEMI)",
      "Stroke",
    ],
    contraindications: [
      "No absolute contraindications in emergency settings",
      "Use caution in COPD patients (risk of CO2 retention)",
    ],
    adultDose:
      "Nasal cannula: 1-6 L/min (24-44% O2); Simple mask: 6-10 L/min (40-60% O2); Non-rebreather mask: 10-15 L/min (80-95% O2); BVM: 15 L/min (nearly 100% O2)",
    pediatricDose:
      "Same delivery methods as adult; Nasal cannula: 1-2 L/min; Simple mask: 6-10 L/min; Non-rebreather: 10-15 L/min; BVM: 15 L/min",
    route: "Inhalation via delivery device",
    sideEffects: [
      "Drying of mucous membranes",
      "CO2 retention in severe COPD (caution)",
      "Oxygen toxicity (prolonged high concentration > 24 hours)",
      "Retrolental fibroplasia in neonates (prolonged high concentration)",
    ],
    specialNotes:
      "Oxygen is the most commonly administered prehospital medication. Always ensure the cylinder is turned on and check flow before application. Target SpO2 94-99% for most patients. For COPD patients, target SpO2 88-92% unless otherwise directed. In the Philippines, ensure O2 cylinders are properly secured during transport and check supply before leaving base.",
    scope: "BLS",
  },
  {
    id: "oral-glucose",
    genericName: "Oral Glucose",
    brandNames: ["Glutose", "Insta-Glucose", "BD Glucose"],
    drugClass: "Carbohydrate / Antihypoglycemic",
    indications: [
      "Hypoglycemia in conscious patients (blood glucose < 60 mg/dL)",
      "Suspected hypoglycemia with altered mental status but intact gag reflex",
      "Diabetic emergency with signs of low blood sugar",
    ],
    contraindications: [
      "Unconscious or altered mental status with inability to swallow safely",
      "Absent gag reflex",
      "Suspected stroke with dysphagia",
      "Hyperglycemia (high blood glucose)",
    ],
    adultDose: "15-30 grams (1-2 tubes of gel), may repeat in 15 minutes if needed",
    pediatricDose:
      "0.5 g/kg (approximately 1/2 tube for small children), may repeat in 15 minutes",
    route: "Oral (buccal or swallowed)",
    sideEffects: [
      "Nausea and vomiting (especially if large dose)",
      "Choking hazard if given to patient with impaired swallowing",
    ],
    specialNotes:
      "Must only be given to patients who are conscious and able to swallow. Apply gel between the cheek and gum for buccal absorption if the patient cannot swallow well. Always reassess blood glucose after administration. In the Philippine setting, some patients may use alternative sugar sources (sugar water, candy, soft drinks) if oral glucose gel is unavailable.",
    scope: "BLS",
  },
  {
    id: "aspirin",
    genericName: "Aspirin (Acetylsalicylic Acid)",
    brandNames: ["Bayer Aspirin", "Ecotrin", "Bufferin"],
    drugClass: "Antiplatelet / NSAID / Salicylate",
    indications: [
      "Suspected acute coronary syndrome (chest pain of cardiac origin)",
      "ST-elevation myocardial infarction (per protocol)",
      "Non-ST-elevation myocardial infarction (per protocol)",
    ],
    contraindications: [
      "True aspirin allergy (anaphylaxis)",
      "Active gastrointestinal bleeding",
      "Known bleeding disorder",
      "Aortic dissection (relative)",
      "Patients under 16 years old (risk of Reye's syndrome)",
    ],
    adultDose: "324 mg (4 × 81 mg tablets) chewed, non-enteric coated preferred",
    pediatricDose: "Not recommended for children under 16 (risk of Reye's syndrome)",
    route: "Oral (chewed, not swallowed whole)",
    sideEffects: [
      "Gastrointestinal irritation",
      "Nausea",
      "Allergic reaction in sensitive individuals",
      "Increased bleeding risk",
      "Tinnitus at high doses",
    ],
    specialNotes:
      "Use non-enteric coated aspirin for faster absorption. Patient should chew the tablets rather than swallow them whole. If the patient has already taken aspirin, do not administer an additional dose. This is a standing order in most EMS protocols for suspected cardiac chest pain. Always document the time of administration.",
    scope: "BLS",
  },
  {
    id: "activated-charcoal",
    genericName: "Activated Charcoal",
    brandNames: ["Actidose-Aqua", "CharcoAid", "SuperChar"],
    drugClass: "Adsorbent / Antidote (poisoning)",
    indications: [
      "Ingested poisoning or overdose (within 1 hour of ingestion, per medical direction)",
      "Toxic ingestion when directed by Poison Control or medical direction",
    ],
    contraindications: [
      "Altered mental status (aspiration risk)",
      "Ingestion of acids, alkalis, or hydrocarbons",
      "Ingestion more than 1 hour prior (diminished effectiveness)",
      "Absent gag reflex",
      "Vomiting",
      "Patients who cannot protect their airway",
    ],
    adultDose: "25-50 grams (50-100 mL of 50% suspension)",
    pediatricDose: "0.5-1 g/kg (1-2 mL/kg of 50% suspension)",
    route: "Oral",
    sideEffects: [
      "Nausea and vomiting (common)",
      "Constipation",
      "Black stools (harmless)",
      "Bowel obstruction (rare, with repeated doses)",
      "Aspiration pneumonitis if aspirated",
    ],
    specialNotes:
      "Must be administered only with medical direction authorization. Effectiveness decreases significantly after 1 hour post-ingestion. The black color can complicate assessment of GI bleeding. In the Philippine setting, activated charcoal may not be routinely carried by all BLS units; always verify availability and protocol authorization before administration.",
    scope: "BLS",
  },
  {
    id: "epinephrine-autoinjector",
    genericName: "Epinephrine (Auto-Injector)",
    brandNames: ["EpiPen", "EpiPen Jr", "Adrenalin"],
    drugClass: "Sympathomimetic / Bronchodilator / Vasopressor",
    indications: [
      "Anaphylaxis (severe allergic reaction)",
      "Severe allergic reaction with respiratory distress or hypotension",
      "Anaphylactic shock",
    ],
    contraindications: [
      "No absolute contraindications in anaphylaxis",
      "Relative caution in patients with severe cardiac disease (not anaphylaxis)",
    ],
    adultDose: "0.3 mg IM (1:1,000 concentration via auto-injector); may repeat in 5-15 minutes",
    pediatricDose:
      "0.15 mg IM (EpiPen Jr, 1:1,000 concentration) for children under 25 kg; may repeat in 5-15 minutes",
    route: "Intramuscular (IM) — anterolateral thigh (vastus lateralis)",
    sideEffects: [
      "Tachycardia",
      "Palpitations",
      "Anxiety and tremor",
      "Headache",
      "Nausea",
      "Hypertension",
      "Chest pain (rare at auto-injector doses)",
    ],
    specialNotes:
      "In the Philippines, EMS First Responders may ASSIST a patient with their OWN prescribed auto-injector; some protocols allow carrying and administering agency-issued auto-injectors. Inject into the anterolateral thigh, hold for 10 seconds, then massage the site. Always document the time of injection. Dispose of the used auto-injector properly and bring it to the hospital with the patient.",
    scope: "BLS",
  },
  {
    id: "nitroglycerin",
    genericName: "Nitroglycerin",
    brandNames: ["Nitrostat", "Nitrolingual", "Nitromist"],
    drugClass: "Vasodilator / Antianginal / Nitrate",
    indications: [
      "Chest pain suspected of cardiac origin (angina/MI)",
      "Angina pectoris (as prescribed by physician)",
    ],
    contraindications: [
      "Systolic BP < 90 mmHg",
      "Recent use of PDE-5 inhibitors (sildenafil/Viagra, tadalafil/Cialis) within 24-48 hours",
      "Right ventricular infarction (suspected)",
      "Hypertrophic cardiomyopathy",
      "Severe aortic stenosis",
      "Head trauma or increased intracranial pressure",
    ],
    adultDose:
      "0.4 mg (1 tablet or spray) sublingually; may repeat every 3-5 minutes up to 3 doses total",
    pediatricDose: "Not indicated for pediatric patients in prehospital setting",
    route: "Sublingual (tablet or spray)",
    sideEffects: [
      "Hypotension (most significant)",
      "Headache (common)",
      "Dizziness and lightheadedness",
      "Flushing",
      "Reflex tachycardia",
      "Burning or tingling under the tongue (normal)",
    ],
    specialNotes:
      "Always check blood pressure BEFORE administration. Do NOT give if systolic BP < 90 mmHg. Recheck BP after each dose. In the Philippine EMS setting, BLS providers may ASSIST a patient with their OWN prescribed nitroglycerin—do not carry or administer agency stock at BLS level. Ensure the patient is sitting or lying down before administration due to hypotension risk. Ask specifically about PDE-5 inhibitor use (erectile dysfunction medications).",
    scope: "BLS",
  },
  {
    id: "naloxone",
    genericName: "Naloxone Hydrochloride",
    brandNames: ["Narcan", "Evzio"],
    drugClass: "Opioid Antagonist",
    indications: [
      "Suspected opioid overdose with respiratory depression",
      "Unconsciousness with pinpoint pupils and respiratory compromise",
      "Respiratory arrest suspected from opioid intoxication",
    ],
    contraindications: [
      "No absolute contraindications in suspected opioid overdose",
      "Known hypersensitivity to naloxone (rare)",
    ],
    adultDose:
      "Intranasal: 4 mg (1 spray in one nostril); IM: 0.4-2 mg; may repeat every 2-3 minutes as needed",
    pediatricDose:
      "Intranasal: 2 mg; IM: 0.1 mg/kg; may repeat every 2-3 minutes as needed",
    route: "Intranasal (IN), Intramuscular (IM), or IV",
    sideEffects: [
      "Acute opioid withdrawal (in opioid-dependent patients)",
      "Agitation and combativeness",
      "Nausea and vomiting",
      "Tachycardia",
      "Hypertension",
      "Seizures (rare)",
    ],
    specialNotes:
      "In the Philippines, naloxone availability at the BLS level varies by jurisdiction and protocol. Intranasal administration is preferred when available as it avoids needlestick risk. Always be prepared for the patient to become combative upon reversal—secure the scene and have additional personnel available. Naloxone has a shorter duration than most opioids; patients may re-sedate, requiring monitoring and repeat doses. Always transport patients who received naloxone, even if they appear recovered.",
    scope: "Both",
  },
  {
    id: "albuterol",
    genericName: "Albuterol (Salbutamol)",
    brandNames: ["ProAir", "Ventolin", "Proventil"],
    drugClass: "Bronchodilator / Beta-2 Agonist",
    indications: [
      "Bronchospasm / Asthma exacerbation",
      "COPD with bronchospasm",
      "Wheezing with respiratory distress",
      "Anaphylaxis with bronchospasm (adjunct to epinephrine)",
      "Hyperkalemia (ALS setting)",
    ],
    contraindications: [
      "Hypersensitivity to albuterol",
      "No absolute contraindications in respiratory emergency",
    ],
    adultDose:
      "2.5-5 mg via nebulizer; or 4-8 puffs via metered-dose inhaler (MDI) with spacer; may repeat every 5-15 minutes",
    pediatricDose:
      "2.5 mg via nebulizer; or 4-8 puffs via MDI with spacer; may repeat every 5-15 minutes",
    route: "Inhalation (nebulizer or MDI with spacer)",
    sideEffects: [
      "Tachycardia",
      "Tremor",
      "Nervousness",
      "Headache",
      "Palpitations",
      "Hypokalemia (with repeated doses)",
      "Nausea",
    ],
    specialNotes:
      "In the Philippine EMS setting, BLS providers may ASSIST a patient with their OWN prescribed inhaler. If the patient has a prescribed albuterol inhaler, the EMT may help them use it. Nebulized albuterol may be available on some BLS units per local protocol. Continuous nebulization may be required for severe bronchospasm. Monitor heart rate—tachycardia is common and expected but warrants monitoring.",
    scope: "Both",
  },
  {
    id: "diphenhydramine",
    genericName: "Diphenhydramine Hydrochloride",
    brandNames: ["Benadryl", "DIPH"],
    drugClass: "Antihistamine (H1 receptor antagonist)",
    indications: [
      "Allergic reactions (mild to moderate)",
      "Anaphylaxis (adjunct to epinephrine)",
      "Insect stings and bites with allergic response",
      "Drug reactions with urticaria",
    ],
    contraindications: [
      "Hypersensitivity to diphenhydramine",
      "Acute asthma attack (relative—may worsen bronchospasm by drying secretions)",
      "Narrow-angle glaucoma",
      "Urinary retention",
    ],
    adultDose: "25-50 mg IM or IV; may repeat in 4-6 hours",
    pediatricDose: "1 mg/kg IM or IV (max 50 mg per dose)",
    route: "Intramuscular (IM) or Intravenous (IV)",
    sideEffects: [
      "Drowsiness and sedation (most common)",
      "Dizziness",
      "Dry mouth",
      "Blurred vision",
      "Urinary retention",
      "Paradoxical excitation in children",
      "Hypotension (IV administration)",
    ],
    specialNotes:
      "Diphenhydramine is NOT a first-line treatment for anaphylaxis—epinephrine is. DIPH is an adjunct used after epinephrine to prevent symptom recurrence. At BLS level, this is typically ALS-only medication. In the Philippine setting, diphenhydramine is widely available OTC but EMS administration should follow protocol. The sedation effect can complicate patient assessment—document mental status before and after administration.",
    scope: "ALS",
  },
  {
    id: "glucagon",
    genericName: "Glucagon",
    brandNames: ["GlucaGen", "Glucagon Emergency Kit"],
    drugClass: "Antihypoglycemic / Hormone",
    indications: [
      "Severe hypoglycemia in unconscious patients unable to take oral glucose",
      "Hypoglycemia with altered mental status and absent gag reflex",
      "Beta-blocker overdose (per medical direction)",
    ],
    contraindications: [
      "Hypersensitivity to glucagon",
      "Pheochromocytoma (rare tumor)",
      "Insulinoma (may cause paradoxical insulin release)",
    ],
    adultDose: "1 mg IM or IV; may repeat in 15 minutes if no response",
    pediatricDose:
      "Less than 20 kg: 0.5 mg IM or IV; 20 kg and above: 1 mg IM or IV; may repeat in 15 minutes",
    route: "Intramuscular (IM) or Intravenous (IV)",
    sideEffects: [
      "Nausea and vomiting (common)",
      "Tachycardia",
      "Hypertension (transient)",
      "Hyperglycemia (rebound)",
      "Headache",
    ],
    specialNotes:
      "Glucagon must be reconstituted before administration—follow the kit instructions carefully. It works by mobilizing stored glycogen from the liver, so it is less effective in malnourished patients or those with depleted glycogen stores. Onset is slower than IV dextrose (10-20 minutes). Position the patient in recovery position after administration due to vomiting risk. Always reassess blood glucose levels after administration.",
    scope: "ALS",
  },
  {
    id: "nitrous-oxide",
    genericName: "Nitrous Oxide",
    brandNames: ["Entonox", "Nitronox", "Laughing Gas"],
    drugClass: "Analgesic / Anxiolytic Gas",
    indications: [
      "Moderate to severe pain (trauma, burns, fractures)",
      "Labor pain during prehospital delivery",
      "Procedural pain during splinting or wound care",
      "Anxiety during transport",
    ],
    contraindications: [
      "Pneumothorax (can expand gas spaces)",
      "Bowel obstruction",
      "Middle ear injury or surgery",
      "Head injury with increased ICP",
      "Decompression sickness",
      "Impaired consciousness",
      "Pregnancy (first trimester, relative)",
    ],
    adultDose:
      "50% nitrous oxide / 50% oxygen self-administered via demand-valve mask; patient-controlled delivery",
    pediatricDose:
      "Same mixture, self-administered with appropriate mask size; ensure patient can hold the mask independently",
    route: "Inhalation (self-administered via demand valve)",
    sideEffects: [
      "Dizziness",
      "Nausea and vomiting",
      "Euphoria or dysphoria",
      "Sedation",
      "Diffusion hypoxia (brief, if discontinued abruptly)",
    ],
    specialNotes:
      "Entonox (50:50 N2O:O2) is a self-administered analgesic—the patient holds the mask and inhales as needed. If the patient becomes drowsy, they naturally drop the mask, stopping delivery. This safety feature makes it suitable for prehospital use. In the Philippines, nitrous oxide is available on some advanced EMS units but not universally. Providers must ensure proper scavenging to prevent occupational exposure. Always use with adequate ventilation.",
    scope: "Both",
  },
  {
    id: "ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Medipren"],
    drugClass: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
    indications: [
      "Mild to moderate pain",
      "Fever reduction",
      "Inflammatory conditions (musculoskeletal pain)",
      "Dysmenorrhea",
    ],
    contraindications: [
      "Active gastrointestinal bleeding or ulcer disease",
      "Known hypersensitivity to NSAIDs or aspirin",
      "Third trimester of pregnancy",
      "Severe renal impairment",
      "Bleeding disorders",
      "Concurrent use with other NSAIDs",
    ],
    adultDose: "200-400 mg orally every 4-6 hours as needed (max 1200 mg/day OTC)",
    pediatricDose:
      "5-10 mg/kg orally every 6-8 hours as needed (max 40 mg/kg/day); not recommended under 6 months",
    route: "Oral",
    sideEffects: [
      "Gastrointestinal irritation and upset",
      "Nausea",
      "Dizziness",
      "Headache",
      "Increased bleeding risk",
      "Renal impairment with prolonged use",
    ],
    specialNotes:
      "Ibuprofen is not routinely carried by Philippine EMS units but may be available in some systems for non-emergent pain management. Not a first-line prehospital analgesic for acute traumatic or cardiac chest pain. Should be given with food or milk to reduce GI irritation. Avoid in patients already taking aspirin due to increased bleeding risk. Document any known allergies to NSAIDs before administration.",
    scope: "Both",
  },
  {
    id: "acetaminophen",
    genericName: "Acetaminophen (Paracetamol)",
    brandNames: ["Tylenol", "Biogesic", "Calpol", "Panadol"],
    drugClass: "Analgesic / Antipyretic",
    indications: [
      "Mild to moderate pain",
      "Fever reduction",
      "Headache",
      "Alternative analgesic for patients who cannot take NSAIDs",
    ],
    contraindications: [
      "Known hypersensitivity to acetaminophen",
      "Severe hepatic impairment or active liver disease",
      "Chronic alcohol use (relative—increased hepatotoxicity risk)",
    ],
    adultDose:
      "325-1000 mg orally every 4-6 hours as needed (max 4000 mg/day; lower in elderly or hepatic impairment)",
    pediatricDose:
      "10-15 mg/kg orally every 4-6 hours as needed (max 75 mg/kg/day or 5 doses in 24 hours)",
    route: "Oral",
    sideEffects: [
      "Hepatotoxicity (overdose—primary concern)",
      "Nausea (rare at therapeutic doses)",
      "Rash (rare)",
      "Hypotension (IV form, rare)",
    ],
    specialNotes:
      "Acetaminophen (paracetamol/Biogesic) is the most widely used OTC analgesic in the Philippines. While not routinely carried by EMS units, it may be administered per protocol for fever or mild pain. The greatest risk is hepatotoxicity from overdose—the maximum daily dose must be strictly observed. In the Philippine setting, be aware that many combination OTC products contain acetaminophen—always ask about other medications to avoid accidental overdose. Unlike NSAIDs, acetaminophen does not increase bleeding risk.",
    scope: "Both",
  },
  {
    id: "oral-rehydration-salts",
    genericName: "Oral Rehydration Salts (ORS)",
    brandNames: ["Oral Rehydration Solution", "Oresol", "Hydrite"],
    drugClass: "Electrolyte Replacement / Rehydration Solution",
    indications: [
      "Dehydration from diarrhea or vomiting",
      "Heat exhaustion with dehydration",
      "Mild to moderate dehydration when oral intake is tolerated",
      "Dengue fever with dehydration (supportive care)",
    ],
    contraindications: [
      "Severe dehydration requiring IV fluid resuscitation",
      "Altered mental status with aspiration risk",
      "Bowel obstruction",
      "Inability to swallow safely",
      "Severe vomiting (cannot retain oral fluids)",
    ],
    adultDose:
      "200-400 mL per hour as tolerated; typically 1-2 liters over 4 hours; adjust based on ongoing losses",
    pediatricDose:
      "50-100 mL/kg over 4-6 hours for mild-moderate dehydration; small frequent sips; adjust based on ongoing losses",
    route: "Oral",
    sideEffects: [
      "Nausea and vomiting (if given too rapidly)",
      "Abdominal cramping (rare)",
    ],
    specialNotes:
      "ORS is critically important in the Philippine EMS setting due to the high prevalence of diarrheal diseases, dengue fever, and heat-related illness. The WHO ORS formulation contains: NaCl 2.6 g, KCl 1.5 g, Sodium Citrate 2.9 g, Glucose 13.5 g per liter. Oresol is widely available in Philippine health centers and pharmacies. For heat exhaustion, ORS is preferred over plain water due to electrolyte replacement. If the patient cannot tolerate ORS due to vomiting, IV fluid resuscitation may be necessary.",
    scope: "BLS",
  },
];
