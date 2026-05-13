export interface RoadmapTopic {
  id: string;
  order: number;
  icon: string;
  title: string;
  badge: string;
  badgeClass: string;
  shortDescription: string;
  content: string;
  keyPoints: string[];
  category: 'foundation' | 'orientation' | 'core' | 'legal' | 'operations' | 'coordination' | 'clinical' | 'critical';
  categoryColor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  xpReward: number;
  outcomes: string[];
  whatYoullLearn: string[];
  quickNotes: {
    keyTerms: string[];
    protocols: string[];
    commonMistakes: string[];
    mnemonics: string[];
    summary: string;
  };
  sections: { id: string; title: string; type: 'overview' | 'lesson' | 'practice' | 'summary' | 'quiz' }[];
  isCritical: boolean;
}

export const roadmapTopics: RoadmapTopic[] = [
  {
    id: "osh",
    order: 1,
    icon: "🛡️",
    title: "OSH & Health",
    badge: "Foundation",
    badgeClass: "badge-foundation",
    shortDescription:
      "Occupational Safety and Health fundamentals for EMS responders in the Philippines.",
    content: `Occupational Safety and Health (OSH) is the cornerstone of every EMS responder's career. In the Philippines, OSH is governed by the Occupational Safety and Health Standards (OSHS) as mandated by the Department of Labor and Employment (DOLE). As an EMS First Responder or EMT, understanding OSH is not merely academic—it is a matter of personal survival and professional responsibility. Every call you respond to carries inherent risks: biological hazards from bloodborne and airborne pathogens, physical hazards from unstable structures and traffic, chemical hazards from hazardous materials (HAZMAT), and psychological hazards from traumatic scenes and cumulative stress.

The Philippine Occupational Safety and Health Center (OSHC) establishes guidelines that apply to all workplaces, including EMS operations. Republic Act No. 11058, also known as the "OSH Law," strengthens compliance with OSH standards and imposes penalties on employers who fail to provide a safe working environment. For EMS providers, this means your employer—whether a government agency like the Bureau of Fire Protection (BFP) or a private ambulance service—must provide you with adequate PPE, training, vaccination (especially against Hepatitis B), and post-exposure protocols. Understanding your rights under this law is essential.

Body Substance Isolation (BSI) is the first line of defense against infectious diseases. BSI goes beyond simply wearing gloves—it encompasses a comprehensive approach including hand hygiene, proper donning and doffing of PPE, eye protection when splash exposure is possible, and the use of N95 respirators when airborne pathogens like tuberculosis (TB) are suspected. The Philippines has one of the highest TB burdens globally, making respiratory protection a critical concern for Filipino EMS providers.

Standard Precautions, as defined by the World Health Organization (WHO) and adopted by the Philippine Department of Health (DOH), require that all blood and body fluids be treated as potentially infectious. This approach eliminates the need to identify every patient's infection status before taking protective measures. In the Philippine EMS context, where patients may present with undiagnosed communicable diseases such as dengue, HIV, COVID-19, or multidrug-resistant TB, Standard Precautions must be applied consistently and without exception.

Finally, OSH extends to your psychological well-being. EMS responders in the Philippines face unique stressors: high patient-to-provider ratios, limited resources, difficult working conditions, and exposure to mass casualty events during typhoons, earthquakes, and other natural disasters. Critical Incident Stress Management (CISM) and debriefing protocols should be available to all responders. Recognizing the signs of burnout, compassion fatigue, and post-traumatic stress disorder (PTSD) is part of maintaining your occupational health and ensuring long-term career sustainability.`,
    keyPoints: [
      "OSH is mandated by RA 11058 and enforced by DOLE—know your rights as an EMS provider",
      "BSI (Body Substance Isolation) is your first action at every scene—before patient contact",
      "Standard Precautions: treat ALL blood and body fluids as potentially infectious",
      "TB is a major occupational risk in the Philippines—use N95 respirators when indicated",
      "PPE requirements: gloves, eye protection, mask, gown—match the level to the hazard",
      "Employers must provide Hepatitis B vaccination and post-exposure prophylaxis protocols",
      "CISM (Critical Incident Stress Management) is essential for psychological well-being",
      "Proper donning and doffing of PPE prevents self-contamination and disease transmission",
    ],
    category: 'foundation',
    categoryColor: '#2EC4B6',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    xpReward: 20,
    outcomes: [
      "Identify OSH hazards in EMS",
      "Apply BSI precautions correctly",
      "Understand RA 11058 provisions",
      "Recognize psychological hazards",
    ],
    whatYoullLearn: [
      "🧤 PPE & BSI Basics",
      "⚠️ Hazard Recognition",
      "🚑 EMS Exposure Risks",
      "📋 Reporting Procedures",
      "🧠 Stress & CISM",
    ],
    quickNotes: {
      keyTerms: ["BSI", "Standard Precautions", "N95", "CISM", "RA 11058"],
      protocols: [
        "BSI before patient contact",
        "TB → N95 respirator",
        "Hep B vaccination required",
      ],
      commonMistakes: [
        "Forgetting BSI first",
        "Using surgical mask instead of N95 for TB",
        "Not reporting exposures",
      ],
      mnemonics: ["BSI = Body Substance Isolation (always first)"],
      summary: "OSH protects EMS providers. BSI is first action. RA 11058 mandates safe workplaces. Standard Precautions apply to ALL patients. CISM for psychological well-being.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'OSH Fundamentals', type: 'lesson' },
      { id: 'ppe', title: 'PPE & BSI', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: false,
  },
  {
    id: "life-on-the-line",
    order: 2,
    icon: "💓",
    title: "Life on the Line",
    badge: "Orientation",
    badgeClass: "badge-orientation",
    shortDescription:
      "Introduction to the EMS system, career pathways, and the role of first responders in the Philippines.",
    content: `The Emergency Medical Services (EMS) system in the Philippines is an evolving network of agencies, organizations, and personnel dedicated to providing prehospital emergency care. Unlike countries with well-established single-agency EMS systems, the Philippine EMS landscape involves multiple stakeholders: the Bureau of Fire Protection (BFP) under the Department of the Interior and Local Government (DILG), the Philippine National Police (PNP), local government unit (LGU) emergency units, private ambulance services, and volunteer rescue organizations. Understanding how these entities interact is fundamental to functioning effectively within the system.

The Technical Education and Skills Development Authority (TESDA) plays a pivotal role in standardizing EMS training through the National Certificate II (NCII) qualification for Emergency Medical Services. The TESDA NCII certification ensures that all EMS First Responders meet a minimum competency standard covering basic life support, patient assessment, trauma care, medical emergency management, and ambulance operations. Achieving this certification is not merely a professional requirement—it is a legal prerequisite for employment in most EMS agencies throughout the country. The qualification follows the Philippine Qualifications Framework (PQF) and is aligned with ASEAN mutual recognition arrangements.

The career pathway in Philippine EMS typically begins with the EMS First Responder (NCII) level, progressing to EMT-Basic, EMT-Intermediate, and ultimately Paramedic. Each level expands the scope of practice, adding advanced skills such as intravenous access, advanced airway management, medication administration, and cardiac monitoring. The Professional Regulation Commission (PRC) and the Department of Health (DOH) are working toward a unified licensure system, but as of current standards, TESDA NCII remains the entry-level certification. Understanding the distinctions between these levels—and operating strictly within your scope of practice—is both a professional and legal imperative.

EMS operations in the Philippines are governed by several key laws and frameworks. Republic Act No. 10871, also known as the "Basic Life Support for Schools Act," mandates BLS training for students. Republic Act No. 10971 provides for the development of emergency medical services in the country. The Philippine National EMS Framework establishes the organizational structure, standards of care, and coordination mechanisms for EMS delivery. The National Disaster Risk Reduction and Management Council (NDRRMC) coordinates multi-agency responses during major emergencies and disasters, utilizing the Incident Command System (ICS) as the standard management framework.

Life as an EMS provider in the Philippines is demanding but deeply rewarding. You will face unique challenges: responding to emergencies in congested urban areas with limited access, providing care with constrained resources during typhoons and floods, managing mass casualty incidents with fewer personnel than needed, and navigating the emotional toll of treating victims of violence, accidents, and natural disasters. Yet, every life saved, every patient stabilized, and every family comforted reinforces the critical importance of your role. You are the frontline of the healthcare system—the first link in the chain of survival for millions of Filipinos.`,
    keyPoints: [
      "Philippine EMS involves BFP, PNP, LGUs, private services, and volunteer organizations",
      "TESDA NCII is the entry-level certification required for EMS First Responders",
      "Career pathway: First Responder → EMT-Basic → EMT-Intermediate → Paramedic",
      "RA 10971 provides the legal framework for EMS development in the Philippines",
      "NDRRMC coordinates multi-agency disaster response using the Incident Command System",
      "Always operate within your scope of practice—exceeding it has legal and ethical consequences",
      "Resource limitations in Philippine EMS require adaptability and critical thinking",
      "EMS providers are the first link in the chain of survival for the community",
    ],
    category: 'orientation',
    categoryColor: '#6C757D',
    difficulty: 'beginner',
    estimatedMinutes: 7,
    xpReward: 15,
    outcomes: [
      "Describe the Philippine EMS system structure",
      "Identify TESDA NCII certification requirements",
      "Understand career pathways in EMS",
      "Know key EMS laws in the Philippines",
    ],
    whatYoullLearn: [
      "🏥 EMS System Structure",
      "📜 TESDA NCII Requirements",
      "🎓 Career Pathways",
      "⚖️ Key EMS Laws",
      "🇵🇭 Philippine Context",
    ],
    quickNotes: {
      keyTerms: ["TESDA NCII", "BFP", "NDRRMC", "RA 10971", "AMATS"],
      protocols: [
        "NCII required for EMS employment",
        "ICS for disaster management",
        "BFP under DILG",
      ],
      commonMistakes: [
        "Confusing EMT levels",
        "Operating beyond scope of practice",
        "Not knowing the chain of command",
      ],
      mnemonics: ["NCII = National Certificate Level II (entry-level)"],
      summary: "Philippine EMS involves multiple agencies. TESDA NCII is the entry certification. RA 10971 provides legal framework. Career: First Responder → EMT-B → EMT-I → Paramedic.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'EMS System', type: 'lesson' },
      { id: 'career', title: 'Career Path', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: false,
  },
  {
    id: "first-aider",
    order: 3,
    icon: "🤝",
    title: "First Aider",
    badge: "Core Role",
    badgeClass: "badge-core",
    shortDescription:
      "Essential first aid skills and techniques every EMS responder must master.",
    content: `First aid is the immediate care provided to a sick or injured person before professional medical treatment becomes available. As an EMS First Responder certified under TESDA NCII, your first aid capabilities go far beyond the layperson level. You are trained to assess, stabilize, and manage a wide range of medical and trauma emergencies using systematic approaches that prioritize life-threatening conditions. The principles of first aid—preserve life, prevent further harm, and promote recovery—form the foundation of every intervention you perform.

The primary survey (initial assessment) follows the ABCDE approach: Airway (with cervical spine protection), Breathing, Circulation, Disability (neurological status), and Exposure (with environmental control). This systematic method ensures that the most critical conditions are identified and addressed first. A blocked airway will kill a patient in minutes, regardless of any other injuries. Uncontrolled hemorrhage can be fatal within the "Platinum 10 Minutes." Recognizing and treating these priorities in order is what separates a trained first aider from a well-meaning bystander. In the Philippine setting, where transport times can be prolonged due to traffic and distance, your ability to provide effective initial care is often the difference between life and death.

Bleeding control is one of the most critical first aid skills. External hemorrhage is managed using a stepwise approach: direct pressure, elevation (when appropriate), pressure dressings, tourniquet application for life-threatening extremity bleeding, and hemostatic dressings when available. The Philippine EMS environment may involve injuries from vehicular crashes, industrial accidents, agricultural machinery, and violence—all of which can produce severe hemorrhage. Knowing when and how to apply a tourniquet correctly, and understanding that a tourniquet is not a last resort for life-threatening bleeding, is essential knowledge that reflects current evidence-based guidelines.

Burn management in the Philippines is particularly relevant given the prevalence of household cooking fires, industrial incidents, and electrical injuries. First aid for burns follows the "Stop, Drop, and Roll" principle for clothing fires, cooling the burn with clean running water for at least 10-20 minutes (never ice), covering with a sterile dressing, and managing pain. Chemical burns require copious irrigation, and electrical burns may have hidden internal damage requiring careful assessment. The rule of nines (modified for pediatric patients) helps estimate total body surface area (TBSA) affected, which guides fluid resuscitation decisions.

Fracture management, splinting, and immobilization are essential first aid skills that prevent further injury and reduce pain. The principles include: immobilize the joint above and below the injury, check distal pulses before and after splinting, pad the splint for comfort, and treat all suspected fractures before moving the patient. In the Philippine EMS context, where spinal injuries from motorcycle crashes and falls are common, proper spinal motion restriction (SMR) techniques—including the use of cervical collars, long spine boards, and vacuum mattresses—are critical competencies that must be practiced until they become automatic.`,
    keyPoints: [
      "First aid priorities: Preserve life → Prevent further harm → Promote recovery",
      "Primary survey follows ABCDE: Airway, Breathing, Circulation, Disability, Exposure",
      "Bleeding control: direct pressure → pressure dressing → tourniquet (for life-threatening bleeding)",
      "Burn first aid: cool with running water 10-20 min, never use ice, cover with sterile dressing",
      "Fracture management: immobilize joints above and below, check distal pulses before and after",
      "Platinum 10 Minutes: uncontrolled hemorrhage can be fatal within minutes",
      "Spinal Motion Restriction (SMR) is critical for motorcycle crash and fall injuries in the Philippines",
      "Always reassess the patient—conditions can change rapidly after initial treatment",
    ],
    category: 'core',
    categoryColor: '#1E3A5F',
    difficulty: 'intermediate',
    estimatedMinutes: 8,
    xpReward: 25,
    outcomes: [
      "Perform primary survey using ABCDE",
      "Control bleeding using stepwise approach",
      "Manage burns and fractures",
      "Apply splinting techniques correctly",
    ],
    whatYoullLearn: [
      "🫁 ABCDE Primary Survey",
      "🩸 Bleeding Control Steps",
      "🔥 Burn Management",
      "🦴 Fracture & Splinting",
      "⏱️ Platinum 10 Minutes",
    ],
    quickNotes: {
      keyTerms: ["ABCDE", "SAMPLE", "DCAP-BTLS", "Tourniquet", "Rule of Nines"],
      protocols: [
        "ABCDE always in order",
        "Tourniquet: NOT last resort for life-threatening bleeding",
        "Burns: cool 10-20 min with water, never ice",
      ],
      commonMistakes: [
        "Applying tourniquet as last resort",
        "Using ice on burns",
        "Not checking distal PSM before/after splinting",
      ],
      mnemonics: [
        "ABCDE = Airway, Breathing, Circulation, Disability, Exposure",
        "SAMPLE = Signs, Allergies, Medications, Past history, Last intake, Events",
      ],
      summary: "Primary survey: ABCDE. Bleeding: direct pressure → tourniquet for life-threatening. Burns: cool with water 10-20 min. Fractures: immobilize above & below, check distal PSM.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'First Aid Skills', type: 'lesson' },
      { id: 'bleeding', title: 'Bleeding Control', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: true,
  },
  {
    id: "rules-law",
    order: 4,
    icon: "⚖️",
    title: "Rules & Law",
    badge: "Legal",
    badgeClass: "badge-legal",
    shortDescription:
      "Legal and ethical frameworks governing EMS practice in the Philippines.",
    content: `The legal landscape governing EMS practice in the Philippines is defined by a combination of national legislation, administrative orders, local ordinances, and professional standards. As an EMS provider, understanding these laws is not optional—it is a professional requirement that protects both you and your patients. The foundational principle is that every patient has the right to emergency medical care, and every provider has a duty to deliver care within established standards. Failure to understand and comply with legal requirements can result in criminal charges, civil liability, professional discipline, and loss of certification.

Consent is a fundamental legal concept in EMS. Expressed consent is obtained when a competent patient explicitly agrees to treatment, either verbally or in writing. Implied consent applies when a patient is unable to consent (unconscious, altered mental status, or a minor without a guardian) and it is assumed they would agree to life-saving treatment if they could. In the Philippines, the principle of implied consent is particularly important during mass casualty incidents and disaster responses, where obtaining explicit consent from every patient is impractical. However, competent patients always have the right to refuse treatment, and this right must be respected—provided the patient has been informed of the risks of refusal and the refusal is documented.

Negligence in EMS occurs when four elements are present: duty to act, breach of duty, proximate cause, and damages. Duty to act exists when you have a legal or contractual obligation to provide care—for example, when you are on duty with an EMS agency and dispatched to a call. Breach of duty occurs when your care falls below the accepted standard of care. Proximate cause means your breach directly caused the patient's harm. Damages refer to the actual harm suffered by the patient. The concept of "res ipsa loquitur" (the thing speaks for itself) may apply when the negligence is so obvious that no expert testimony is needed—for instance, leaving a patient unattended on a stretcher that then rolls away.

The Good Samaritan Law in the Philippines, as provided under Republic Act No. 10871 and related provisions, offers legal protection to individuals who voluntarily render emergency care in good faith, without expectation of compensation, and without gross negligence or willful misconduct. While this protection is valuable for laypersons and off-duty providers, it is important to understand that on-duty EMS providers may be held to a higher standard of care. Additionally, abandonment—terminating care without ensuring an equal or higher level of care is assumed by another provider—is a serious legal and ethical violation that can result in liability.

Documentation is your best legal defense. The Patient Care Report (PCR) is a legal document that must accurately and comprehensively record all assessments, interventions, patient responses, and communications. The golden rule of documentation is: "If it wasn't documented, it wasn't done." In the Philippine EMS system, PCRs must follow the minimum data set established by the DOH and should include timestamps, vital signs, SAMPLE history, treatment rendered, and any refusals of care with witnessed signatures. Proper documentation protects the patient, the provider, and the system—and is an indispensable component of professional EMS practice.`,
    keyPoints: [
      "Expressed consent: competent patient explicitly agrees; Implied consent: patient unable to consent",
      "Negligence requires: duty, breach, proximate cause, and damages—all four must be proven",
      "Good Samaritan Law protects voluntary rescuers acting in good faith without gross negligence",
      "Abandonment: leaving a patient without ensuring equal or higher level of care transfer",
      "Duty to Act exists when on-duty and dispatched; may not exist when off-duty in some cases",
      "PCR documentation: 'If it wasn't documented, it wasn't done'—always document thoroughly",
      "Patients have the right to refuse treatment if competent and informed of risks",
      "Scope of practice: never exceed your authorized level—legal consequences apply",
    ],
    category: 'legal',
    categoryColor: '#845EC2',
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    xpReward: 20,
    outcomes: [
      "Distinguish expressed vs implied consent",
      "Identify the 4 elements of negligence",
      "Understand Good Samaritan protections",
      "Apply proper documentation standards",
    ],
    whatYoullLearn: [
      "✋ Consent Types",
      "⚖️ Negligence Elements",
      "🆘 Good Samaritan Law",
      "📝 Documentation Rules",
      "🚫 Abandonment Definition",
    ],
    quickNotes: {
      keyTerms: ["Expressed consent", "Implied consent", "Negligence", "Good Samaritan", "Abandonment", "PCR"],
      protocols: [
        "Competent patients can refuse",
        "Document all refusals with witnesses",
        "PCR: if not documented, not done",
      ],
      commonMistakes: [
        "Treating without consent",
        "Failing to document refusals",
        "Leaving without proper turnover",
      ],
      mnemonics: ["Duty → Breach → Cause → Damages = Negligence"],
      summary: "Consent: expressed or implied. Negligence needs 4 elements. Good Samaritan protects good-faith rescuers. Abandonment = leaving without turnover. Document everything.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'Legal Framework', type: 'lesson' },
      { id: 'consent', title: 'Consent Scenarios', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: false,
  },
  {
    id: "action-plan",
    order: 5,
    icon: "📋",
    title: "Action Plan",
    badge: "Operations",
    badgeClass: "badge-operations",
    shortDescription:
      "Operational planning, response protocols, and the EMS action plan framework.",
    content: `The EMS Action Plan is a systematic framework that guides responders through every phase of an emergency response, from dispatch to post-call documentation. In the Philippine EMS system, the action plan ensures that no critical step is overlooked and that all team members operate with a shared understanding of priorities and procedures. The standard action plan follows a sequence: Receive Dispatch → En Route → Arrival and Scene Size-Up → Patient Assessment → Treatment → Transport → Turnover → Documentation → Post-Call Review. Each phase has specific tasks, decision points, and communication requirements that must be executed consistently.

Scene size-up is arguably the most critical phase of the action plan, as it determines the safety and strategy of the entire response. Scene size-up begins before you exit the ambulance: observe the scene for hazards (traffic, fire, downed power lines, HAZMAT, violence), determine the mechanism of injury (MOI) or nature of illness (NOI), estimate the number of patients, and identify the need for additional resources. In the Philippine context, scene hazards may include unstable structures after earthquakes, flooding during typhoons, vehicular traffic on busy highways, and potentially violent situations. The cardinal rule is: scene safety first—you cannot help others if you become a patient yourself. If the scene is unsafe, stage at a safe distance and request appropriate resources (police, fire, HAZMAT) before approaching.

The concept of the "Golden Hour" and "Platinum 10 Minutes" are central to EMS operational planning. The Golden Hour refers to the critical 60-minute window from the time of injury to definitive care, during which mortality rates significantly increase if treatment is delayed. The Platinum 10 Minutes emphasizes that the most critical interventions—airway management, hemorrhage control, and spinal immobilization—must be performed within the first 10 minutes on scene. In the Philippines, where transport times can be extended by traffic congestion, road conditions, and distance from trauma centers, these time frames underscore the importance of efficient scene management and rapid transport decisions.

Triage is a key operational skill when multiple patients exceed available resources. The START (Simple Triage and Rapid Treatment) method categorizes patients into four groups: Immediate (Red), Delayed (Yellow), Walking Wounded (Green), and Deceased/Expectant (Black). In mass casualty incidents (MCIs) during Philippine disasters—typhoons, earthquakes, landslides—triage decisions must be made rapidly and objectively, allocating limited resources to save the greatest number of lives. The Incident Command System (ICS) provides the organizational structure for managing MCIs, with clearly defined roles for the Incident Commander, Operations Section, Logistics, Planning, and Administration.

Communication and coordination are the glue that holds the action plan together. In the Philippine EMS system, radio communication follows standardized protocols using the AMATS (Ambulance Medical Assistance and Transfer System) network. All communications should be clear, concise, and follow the SBAR format: Situation, Background, Assessment, Recommendation. When calling a hospital or medical direction, identify yourself, state your unit, provide the patient's condition and vital signs, describe interventions performed, and state your request. Effective communication reduces errors, facilitates smooth patient turnover, and ensures continuity of care from the field to the emergency department.`,
    keyPoints: [
      "Action Plan sequence: Dispatch → En Route → Scene Size-Up → Assess → Treat → Transport → Turnover",
      "Scene size-up: safety first, MOI/NOI, patient count, resource needs—before patient contact",
      "Golden Hour: definitive care within 60 minutes; Platinum 10 Minutes: critical interventions in 10 min",
      "START Triage: Immediate (Red), Delayed (Yellow), Walking Wounded (Green), Expectant (Black)",
      "ICS (Incident Command System) is the standard framework for MCI and disaster management",
      "SBAR communication: Situation, Background, Assessment, Recommendation",
      "Never enter an unsafe scene—stage and request appropriate resources first",
      "Efficient scene time + rapid transport = improved patient outcomes",
    ],
    category: 'operations',
    categoryColor: '#F4A261',
    difficulty: 'intermediate',
    estimatedMinutes: 7,
    xpReward: 20,
    outcomes: [
      "Execute the EMS action plan sequence",
      "Perform proper scene size-up",
      "Apply START triage method",
      "Communicate using SBAR format",
    ],
    whatYoullLearn: [
      "📋 Action Plan Steps",
      "🔍 Scene Size-Up",
      "🏷️ START Triage",
      "📡 SBAR Communication",
      "⏰ Golden Hour Concept",
    ],
    quickNotes: {
      keyTerms: ["Scene size-up", "MOI/NOI", "Golden Hour", "START", "SBAR", "ICS"],
      protocols: [
        "Scene safety FIRST",
        "START: walk → breathe → perfuse → mental",
        "SBAR: Situation, Background, Assessment, Recommendation",
      ],
      commonMistakes: [
        "Entering unsafe scenes",
        "Treating before triage in MCI",
        "Poor communication with hospital",
      ],
      mnemonics: [
        "SBAR = Situation, Background, Assessment, Recommendation",
        "START = Simple Triage and Rapid Treatment",
      ],
      summary: "Action Plan: Dispatch → Size-Up → Assess → Treat → Transport. Scene safety first. START triage for MCI. SBAR for communication. Golden Hour = 60 min to definitive care.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'Action Plan', type: 'lesson' },
      { id: 'triage', title: 'Triage Practice', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: true,
  },
  {
    id: "amats",
    order: 6,
    icon: "📡",
    title: "AMATS",
    badge: "Coordination",
    badgeClass: "badge-coordination",
    shortDescription:
      "Ambulance Medical Assistance and Transfer System — the Philippine EMS coordination network.",
    content: `The Ambulance Medical Assistance and Transfer System (AMATS) is the Philippine's standardized framework for coordinating emergency medical transport and inter-facility transfers. Established under Department of Health Administrative Orders and aligned with the National EMS Framework, AMATS provides a structured system for dispatching ambulances, coordinating medical assistance, and ensuring that patients receive appropriate care during transport. Understanding AMATS is essential for every EMS provider, as it defines the communication protocols, dispatch procedures, and coordination mechanisms that govern daily EMS operations across the country.

AMATS operates on multiple levels: the national AMATS center coordinates resources during large-scale emergencies and disasters, while regional and local AMATS units handle day-to-day emergency dispatch and inter-facility transfers. The system integrates with the NDRRMC during disaster responses and with local Emergency Operations Centers (EOCs) for routine operations. When a call is received—whether through the national emergency hotline (911), local emergency numbers, or hospital-to-hospital requests—the AMATS dispatcher determines the appropriate response based on the nature and severity of the emergency, the availability of ambulances and personnel, and the proximity of receiving facilities.

The AMATS dispatch protocol follows a priority-based system. Priority 1 (Emergent) responses involve life-threatening conditions requiring immediate response with lights and sirens. Priority 2 (Urgent) responses involve serious but not immediately life-threatening conditions requiring prompt but not emergency response. Priority 3 (Non-emergent) responses involve non-urgent situations such as scheduled inter-facility transfers or medical standby duties. Each priority level has corresponding response time standards, crew configuration requirements, and documentation protocols. Understanding these priorities ensures that resources are allocated efficiently and that the most critical patients receive the fastest response.

Inter-facility transfer is a key AMATS function that requires careful coordination between the sending facility, the receiving facility, and the transporting EMS crew. The transfer must be authorized by a physician at the sending facility, the receiving facility must confirm acceptance, and the EMS crew must verify that their level of training and equipment is appropriate for the patient's condition during transport. The AMATS protocol requires documentation of the transfer reason, patient condition, and all communications. In the Philippine setting, inter-facility transfers often involve moving patients from rural health units or district hospitals to tertiary care centers in urban areas—a process that can take hours and requires meticulous planning for patient safety.

Communication within the AMATS network follows standardized radio protocols to ensure clarity and efficiency. All AMATS communication uses designated frequencies and follows the call sign system for unit identification. The standard communication format includes: unit identification, location, patient status report, and request or notification. When communicating with medical direction, EMS providers must provide a concise patient report including the SAMPLE history, vital signs, interventions performed, and the patient's response to treatment. In areas with limited radio coverage—common in rural and mountainous regions of the Philippines—AMATS may utilize cellular phones, satellite communications, or relay systems to maintain contact between field units and dispatch centers.`,
    keyPoints: [
      "AMATS = Ambulance Medical Assistance and Transfer System — the national EMS coordination framework",
      "Three priority levels: Priority 1 (Emergent), Priority 2 (Urgent), Priority 3 (Non-emergent)",
      "National AMATS coordinates disaster responses; local AMATS handles daily dispatch and transfers",
      "Inter-facility transfers require physician authorization, receiving facility acceptance, and proper crew",
      "Standardized radio protocols with designated frequencies and call sign identification",
      "AMATS integrates with NDRRMC and local Emergency Operations Centers during disasters",
      "Communication format: unit ID → location → patient status → request/notification",
      "In remote areas, AMATS may use cellular, satellite, or relay communication systems",
    ],
    category: 'coordination',
    categoryColor: '#A78BFA',
    difficulty: 'intermediate',
    estimatedMinutes: 6,
    xpReward: 15,
    outcomes: [
      "Describe AMATS structure and function",
      "Determine response priorities correctly",
      "Execute inter-facility transfer protocols",
      "Use standard radio communication formats",
    ],
    whatYoullLearn: [
      "📡 AMATS Overview",
      "🚨 Priority Levels",
      "🏥 Inter-Facility Transfer",
      "📻 Radio Protocols",
      "🗺️ Local vs National AMATS",
    ],
    quickNotes: {
      keyTerms: ["AMATS", "Priority 1/2/3", "Inter-facility transfer", "EOC", "911"],
      protocols: [
        "P1 = lights & sirens",
        "Transfer needs physician auth + receiving acceptance",
        "Unit ID → location → status → request",
      ],
      commonMistakes: [
        "Wrong priority classification",
        "Transferring without physician authorization",
        "Poor radio communication",
      ],
      mnemonics: ["AMATS = Ambulance Medical Assistance & Transfer System"],
      summary: "AMATS coordinates EMS dispatch and transfers. 3 priorities: Emergent, Urgent, Non-emergent. Transfers need physician auth. Standard radio protocols apply.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'AMATS System', type: 'lesson' },
      { id: 'transfer', title: 'Transfer Protocol', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: false,
  },
  {
    id: "assessment-procedure",
    order: 7,
    icon: "🩺",
    title: "Assessment & Procedure",
    badge: "Clinical",
    badgeClass: "badge-clinical",
    shortDescription:
      "Systematic patient assessment procedures and clinical skills for EMS providers.",
    content: `Patient assessment is the fundamental clinical skill that underpins all EMS practice. A systematic, thorough assessment ensures that life-threatening conditions are identified and treated in order of priority, that no significant findings are missed, and that appropriate treatment and transport decisions are made. The TESDA NCII competency standards require EMS First Responders to demonstrate proficiency in both medical and trauma patient assessment, using standardized approaches that are consistent with international best practices while adapted to the Philippine healthcare context.

The primary survey (initial assessment) is performed on every patient and follows the ABCDE framework: Airway (with cervical spine protection for trauma patients), Breathing, Circulation, Disability (neurological status using AVPU or GCS), and Exposure (with environmental protection). The primary survey identifies and treats immediate life threats. A patient with a compromised airway must have their airway opened and maintained before breathing is assessed. A patient not breathing must be ventilated before circulation is checked. A patient with no pulse requires CPR. This systematic approach ensures that the most critical problems are addressed first, every time, without omission.

The secondary survey (focused assessment) is performed only after the primary survey is complete and all life threats have been addressed. It includes a detailed head-to-toe physical examination, vital signs measurement, and SAMPLE history taking (Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to illness/injury). For trauma patients, the DCAP-BTLS mnemonic guides the physical examination: Deformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling. OPQRST is used to assess pain: Onset, Provocation/Palliation, Quality, Radiation, Severity, Time. These systematic tools ensure comprehensive assessment and consistent documentation.

Vital signs are objective measurements that provide critical information about the patient's physiological status. The standard vital signs include: Blood Pressure (BP), Heart Rate (HR/Pulse), Respiratory Rate (RR), SpO2 (pulse oximetry), Temperature, and Pain Scale (0-10). Normal ranges vary by age, and trends are more meaningful than single measurements. For example, a blood pressure of 110/70 may be normal for some adults but represents relative hypotension in a patient whose baseline is 160/100—indicating potential hemorrhagic shock. In the Philippine EMS setting, where patients may present with tropical diseases, environmental exposures, and chronic conditions that affect vital signs, understanding the clinical significance of abnormal values is essential.

Special assessment considerations apply to pediatric patients, geriatric patients, and patients with communication barriers. Pediatric assessment follows the Pediatric Assessment Triangle (PAT): Appearance, Work of Breathing, Circulation to Skin. Geriatric patients may have atypical presentations—myocardial infarction without chest pain, infections without fever, and fractures from minimal trauma. Patients with language barriers, hearing impairments, or cognitive disabilities require adapted communication techniques. In the Philippines, with its diverse linguistic landscape (over 170 languages), EMS providers must be prepared to use alternative communication methods, including translation apps, visual aids, and assistance from family members or bystanders, while still conducting a thorough and accurate assessment.`,
    keyPoints: [
      "Primary Survey: ABCDE (Airway, Breathing, Circulation, Disability, Exposure)—treat life threats first",
      "Secondary Survey: head-to-toe exam, vital signs, SAMPLE history—only after primary survey complete",
      "SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events",
      "DCAP-BTLS: Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling",
      "OPQRST: Onset, Provocation, Quality, Radiation, Severity, Time—systematic pain assessment",
      "Vital signs: BP, HR, RR, SpO2, Temp, Pain—trends are more meaningful than single readings",
      "Pediatric Assessment Triangle: Appearance, Work of Breathing, Circulation to Skin",
      "Adapt assessment for geriatric atypical presentations and patients with communication barriers",
    ],
    category: 'clinical',
    categoryColor: '#0081CF',
    difficulty: 'advanced',
    estimatedMinutes: 8,
    xpReward: 25,
    outcomes: [
      "Perform systematic primary survey (ABCDE)",
      "Conduct thorough secondary survey",
      "Apply SAMPLE, OPQRST, DCAP-BTLS tools",
      "Adapt assessment for special populations",
    ],
    whatYoullLearn: [
      "🫁 Primary Survey (ABCDE)",
      "🔍 Secondary Survey",
      "📝 SAMPLE & OPQRST",
      "🩺 Vital Signs",
      "👶 Special Populations",
    ],
    quickNotes: {
      keyTerms: ["ABCDE", "SAMPLE", "OPQRST", "DCAP-BTLS", "AVPU", "GCS", "PAT"],
      protocols: [
        "Primary survey FIRST always",
        "SAMPLE for history",
        "DCAP-BTLS for trauma exam",
        "Trends > single readings for vitals",
      ],
      commonMistakes: [
        "Skipping primary survey",
        "Not checking distal PSM",
        "Ignoring atypical presentations in elderly",
      ],
      mnemonics: [
        "ABCDE = Airway, Breathing, Circulation, Disability, Exposure",
        "SAMPLE = Signs, Allergies, Meds, Past, Last intake, Events",
        "OPQRST = Onset, Provocation, Quality, Radiation, Severity, Time",
      ],
      summary: "Primary survey (ABCDE) → treat life threats → secondary survey. SAMPLE for history. OPQRST for pain. DCAP-BTLS for trauma. Trends more meaningful than single vitals.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'Assessment Skills', type: 'lesson' },
      { id: 'vitals', title: 'Vital Signs', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: true,
  },
  {
    id: "chain-of-survival",
    order: 8,
    icon: "🔗",
    title: "Chain of Survival",
    badge: "Critical",
    badgeClass: "badge-critical",
    shortDescription:
      "The AHA Chain of Survival — the critical sequence for cardiac arrest management.",
    content: `The Chain of Survival is the American Heart Association's (AHA) conceptual framework for optimizing outcomes from out-of-hospital cardiac arrest (OHCA). Originally a 4-link chain introduced in 1991, it has evolved through successive AHA guidelines—expanding to 5 links in 2010 and to the current 6-link In-Hospital and Out-of-Hospital Chains of Survival in the 2020/2025 AHA Guidelines. Each link represents a critical action that must occur in sequence, and the strength of the chain depends on its weakest link. In the Philippine EMS context, where cardiac arrest survival rates remain significantly lower than in developed countries, understanding and strengthening every link is a matter of life and death.

The AHA 2025 Guidelines maintain the 6-link Out-of-Hospital Chain of Survival established in 2020, with updated evidence and refined recommendations. Comparing the 2020 and 2025 versions: LINK 1 — "Early Access and Notification" (2020) has been refined in 2025 to emphasize dispatcher-assisted CPR and rapid recognition of cardiac arrest, with stronger evidence supporting the role of emergency medical dispatchers (EMDs) in guiding bystander CPR. LINK 2 — "Early CPR with Emphasis on Chest Compressions" remains consistent, but 2025 guidelines further reinforce the critical importance of starting chest compressions within the first moments, with dispatcher coaching for untrained rescuers. The 2025 update provides additional evidence that compression-only CPR by bystanders produces outcomes comparable to conventional CPR for adult OHCA.

LINK 3 — "Early Defibrillation" continues to emphasize that survival decreases by approximately 7-10% for every minute defibrillation is delayed. The 2025 guidelines strengthen recommendations for public access defibrillation (PAD) programs and note that in the Philippine setting, where AED availability in public spaces is limited, EMS providers must prioritize rapid AED application upon arrival. Community AED placement in high-traffic areas (malls, transport hubs, government offices) is a key strategy. LINK 4 — "Advanced Resuscitation" (2020: "Effective Advanced Life Support") has been updated in 2025 with refined medication timing recommendations—epinephrine should be administered as early as possible for non-shockable rhythms, and antiarrhythmic administration is recommended after the second shock for shockable rhythms. Double sequential defibrillation is discussed as a consideration for refractory VF.

LINK 5 — "Post-Cardiac Arrest Care" has seen the most significant updates in 2025. The guidelines now emphasize targeted temperature management (TTM) with a recommended range of 32-37.5°C, providing flexibility based on patient factors. Neuroprognostication should be performed no earlier than 72 hours after ROSC, using a multimodal approach. Early cardiac catheterization is recommended for patients with ST-elevation on post-ROSC ECG. LINK 6 — "Recovery" was added in 2020 and remains a critical component in 2025, emphasizing that survival to hospital discharge is not the endpoint. The 2025 guidelines strengthen recommendations for cardiac arrest survivor follow-up, including cognitive assessment, psychological support, and rehabilitation—recognizing that many survivors face significant long-term challenges including memory problems, anxiety, depression, and post-traumatic stress.

For the Philippine EMS system, implementing the Chain of Survival faces unique challenges. Community CPR training rates remain low despite RA 10871 mandating BLS in schools. AED availability in public spaces is extremely limited compared to developed nations. Transport times to hospitals capable of providing post-cardiac arrest care (including TTM and cardiac catheterization) can be prolonged. However, progress is being made: the 911 emergency number is being rolled out nationally, AMATS is improving dispatch and coordination, and TESDA NCII training is producing more qualified first responders. Strengthening the Chain of Survival in the Philippines requires a systems approach—investment in public education, AED deployment, EMS workforce development, hospital capacity building, and survivor support programs—all working together as integrated links in a chain that can save thousands of lives each year.`,
    keyPoints: [
      "6-Link Chain (AHA 2020/2025): 1-Early Access, 2-Early CPR, 3-Early Defibrillation, 4-Advanced Resuscitation, 5-Post-Cardiac Arrest Care, 6-Recovery",
      "Link 1 (2025 update): Dispatcher-assisted CPR with stronger evidence for EMD-guided bystander intervention",
      "Link 2 (2025 update): Compression-only CPR is comparable to conventional CPR for adult OHCA bystander response",
      "Link 3: Survival drops 7-10% per minute without defibrillation—PAD programs are critical",
      "Link 4 (2025 update): Early epinephrine for non-shockable rhythms; antiarrhythmics after 2nd shock for VF",
      "Link 5 (2025 update): TTM range 32-37.5°C; neuroprognostication at ≥72 hours using multimodal approach",
      "Link 6: Recovery includes cognitive assessment, psychological support, and rehabilitation for survivors",
      "Philippine challenges: low community CPR rates, limited AED access, prolonged transport to definitive care",
    ],
    category: 'critical',
    categoryColor: '#E63946',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    xpReward: 30,
    outcomes: [
      "Recall all 6 links of the AHA 2025 Chain",
      "Compare AHA 2020 vs 2025 updates",
      "Understand survival rate factors",
      "Identify Philippine-specific challenges",
    ],
    whatYoullLearn: [
      "🔗 6 Links of Survival",
      "📊 2020 vs 2025 Updates",
      "⚡ Defibrillation Timing",
      "❄️ TTM Range",
      "🇵🇭 PH Challenges & Solutions",
    ],
    quickNotes: {
      keyTerms: ["Chain of Survival", "ROSC", "TTM", "AED", "PAD", "Dispatcher CPR"],
      protocols: [
        "Survival drops 7-10%/min without defibrillation",
        "TTM: 32-37.5°C",
        "Neuroprognostication ≥72 hours",
        "Compression-only CPR OK for bystanders",
      ],
      commonMistakes: [
        "Delaying defibrillation",
        "Using old 5-link chain",
        "Stopping at ROSC (forget Recovery link)",
      ],
      mnemonics: [
        "6 Links: Early Access → Early CPR → Early Defib → Advanced Resuscitation → Post-Arrest Care → Recovery",
      ],
      summary: "6-link Chain: Access → CPR → Defibrillation → Advanced → Post-Arrest → Recovery. 7-10% survival drop per minute. TTM 32-37.5°C. PH challenges: low CPR rates, limited AEDs.",
    },
    sections: [
      { id: 'overview', title: 'Overview', type: 'overview' },
      { id: 'lesson', title: 'Chain of Survival', type: 'lesson' },
      { id: 'comparison', title: '2020 vs 2025', type: 'practice' },
      { id: 'summary', title: 'Key Takeaways', type: 'summary' },
      { id: 'quiz', title: 'Knowledge Check', type: 'quiz' },
    ],
    isCritical: true,
  },
];
