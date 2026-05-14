export interface ScenarioChoice {
  text: string;
  nextStepId: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ScenarioStep {
  id: string;
  text: string;
  choices: ScenarioChoice[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  startStepId: string;
  steps: Record<string, ScenarioStep>;
}

export const scenarios: Scenario[] = [
  // ===== 1. Cardiac Arrest - Adult =====
  {
    id: "cardiac-arrest-adult",
    title: "Adult CPR with AED",
    description:
      "You respond to a 55-year-old male who has collapsed in a shopping mall. Bystanders report he was walking normally, then suddenly fell to the ground. He is unresponsive and not breathing normally.",
    category: "BLS",
    startStepId: "step1",
    steps: {
      step1: {
        id: "step1",
        text: "You arrive at the scene and find a 55-year-old male lying on the floor. He is unresponsive. You observe occasional gasping respirations. What is your FIRST action?",
        choices: [
          {
            text: "Check for a pulse for 10 seconds",
            nextStepId: "step2a",
            isCorrect: false,
            feedback:
              "While checking for a pulse is important, your FIRST action should be to ensure scene safety and apply BSI. However, in this scenario the scene is safe. The critical first step is confirming unresponsiveness and calling for help/AED.",
          },
          {
            text: "Ensure scene safety, apply BSI, tap and shout to confirm unresponsiveness, then direct someone to call for help and get an AED",
            nextStepId: "step2b",
            isCorrect: true,
            feedback:
              "Correct! Scene safety and BSI always come first. Confirming unresponsiveness, activating the emergency response system, and getting an AED are the critical first steps in the Chain of Survival.",
          },
          {
            text: "Immediately begin chest compressions",
            nextStepId: "step2a",
            isCorrect: false,
            feedback:
              "While early compressions are critical, you must first confirm cardiac arrest (check responsiveness and breathing), activate the emergency response system, and get an AED before starting CPR.",
          },
          {
            text: "Open the airway with head-tilt/chin-lift and give 2 rescue breaths",
            nextStepId: "step2a",
            isCorrect: false,
            feedback:
              "Rescue breaths before compressions delay the most important intervention. Current AHA guidelines emphasize starting with chest compressions (CAB sequence) for adult cardiac arrest.",
          },
        ],
      },
      step2a: {
        id: "step2a",
        text: "You skipped important initial steps. Let's refocus. The patient is confirmed unresponsive with agonal gasping. A bystander has called for help and is bringing an AED. You check for a pulse for no more than 10 seconds and find no pulse. What should you do NOW?",
        choices: [
          {
            text: "Begin CPR starting with chest compressions at a rate of 100-120/min, depth of at least 2 inches",
            nextStepId: "step3",
            isCorrect: true,
            feedback:
              "Correct! With no pulse and agonal breathing, this is cardiac arrest. Begin CPR immediately with chest compressions (30:2 ratio), rate 100-120/min, depth at least 2 inches.",
          },
          {
            text: "Wait for the AED before starting any intervention",
            nextStepId: "step2a",
            isCorrect: false,
            feedback:
              "Never delay CPR to wait for an AED. Begin compressions immediately. The AED will be applied as soon as it arrives.",
          },
        ],
      },
      step2b: {
        id: "step2b",
        text: "Good! You've confirmed the patient is unresponsive with agonal gasping. A bystander is calling for help and retrieving an AED. You check for a pulse for no more than 10 seconds—no pulse detected. What is your next action?",
        choices: [
          {
            text: "Begin CPR starting with chest compressions (CAB sequence), 30 compressions to 2 breaths, rate 100-120/min, depth at least 2 inches",
            nextStepId: "step3",
            isCorrect: true,
            feedback:
              "Correct! Start CPR immediately with the CAB sequence (Compressions-Airway-Breathing). Rate 100-120/min, depth at least 2 inches (5 cm), full chest recoil between compressions.",
          },
          {
            text: "Open the airway first and provide rescue breaths before compressions",
            nextStepId: "step3",
            isCorrect: false,
            feedback:
              "For adult cardiac arrest, the CAB sequence (Compressions first) is preferred over ABC. Starting with compressions reduces delay to the most critical intervention.",
          },
        ],
      },
      step3: {
        id: "step3",
        text: "You are performing CPR. The AED has arrived. What should you do?",
        choices: [
          {
            text: "Stop CPR, apply AED pads, and follow the device prompts",
            nextStepId: "step4",
            isCorrect: true,
            feedback:
              "Correct! Apply the AED as soon as it arrives. Place one pad on the upper right chest and one on the lower left side. Follow the device prompts. Minimize interruption to compressions.",
          },
          {
            text: "Continue CPR and ignore the AED until you complete 5 cycles",
            nextStepId: "step3",
            isCorrect: false,
            feedback:
              "The AED should be applied as soon as it arrives. Do not delay defibrillation to complete CPR cycles. Early defibrillation is the third link in the Chain of Survival.",
          },
          {
            text: "Apply the AED pads but continue compressions while it analyzes",
            nextStepId: "step3",
            isCorrect: false,
            feedback:
              "You must stop compressions for the AED to accurately analyze the heart rhythm. Movement from compressions can interfere with rhythm analysis.",
          },
        ],
      },
      step4: {
        id: "step4",
        text: "The AED analyzes the rhythm and advises: 'SHOCK ADVISED.' What should you do?",
        choices: [
          {
            text: "Deliver the shock immediately while continuing compressions",
            nextStepId: "step5",
            isCorrect: false,
            feedback:
              "You must ensure NO ONE is touching the patient before delivering a shock. Announce 'Clear!' and visually confirm no contact before pressing the shock button.",
          },
          {
            text: "Ensure no one is touching the patient, announce 'Clear!', visually confirm, then press the shock button",
            nextStepId: "step5",
            isCorrect: true,
            feedback:
              "Correct! Safety first—ensure no one is in contact with the patient before delivering the shock. Announce 'Clear!' and verify visually before pressing the shock button.",
          },
          {
            text: "Check for a pulse before delivering the shock",
            nextStepId: "step4",
            isCorrect: false,
            feedback:
              "Do not check for a pulse between AED analysis and shock delivery. The AED has identified a shockable rhythm—deliver the shock immediately after clearing everyone.",
          },
        ],
      },
      step5: {
        id: "step5",
        text: "The shock has been delivered. What should you do immediately after the shock?",
        choices: [
          {
            text: "Check for a pulse to see if the shock worked",
            nextStepId: "step6",
            isCorrect: false,
            feedback:
              "Do not check for a pulse immediately after a shock. Resume CPR immediately—minimizing interruptions to compressions is critical. The AED will reanalyze after 2 minutes of CPR.",
          },
          {
            text: "Resume CPR immediately starting with chest compressions, without checking for a pulse",
            nextStepId: "step6",
            isCorrect: true,
            feedback:
              "Correct! After a shock, immediately resume CPR starting with compressions. Do not check for a pulse. Perform 2 minutes of CPR before the AED reanalyzes.",
          },
          {
            text: "Wait for the AED to reanalyze before doing anything",
            nextStepId: "step6",
            isCorrect: false,
            feedback:
              "Do not wait for the AED to reanalyze. Resume CPR immediately after the shock. The AED will prompt reanalysis after 2 minutes of CPR.",
          },
        ],
      },
      step6: {
        id: "step6",
        text: "After 2 minutes of CPR, the AED reanalyzes and advises: 'NO SHOCK ADVISED.' The patient now has a weak pulse and is making some respiratory effort. What should you do?",
        choices: [
          {
            text: "Stop CPR, monitor the patient, place in recovery position if adequate breathing, and prepare for transport",
            nextStepId: "step7",
            isCorrect: true,
            feedback:
              "Correct! ROSC (Return of Spontaneous Circulation) is indicated by the return of a pulse. Stop compressions, monitor vital signs, support breathing as needed, and prepare for immediate transport.",
          },
          {
            text: "Continue compressions since the pulse is weak",
            nextStepId: "step6",
            isCorrect: false,
            feedback:
              "A weak pulse indicates ROSC—do not continue compressions on a patient with a pulse. Stop compressions, monitor, and provide supportive care including oxygen.",
          },
        ],
      },
      step7: {
        id: "step7",
        text: "The patient has ROSC but remains unconscious with irregular breathing. You are awaiting transport. What post-cardiac arrest care should you provide?",
        choices: [
          {
            text: "Provide supplemental oxygen targeting SpO2 94-99%, monitor vital signs, maintain IV access if available, and document all interventions and times",
            nextStepId: "step8",
            isCorrect: true,
            feedback:
              "Correct! Post-cardiac arrest care includes: oxygen to maintain SpO2 94-99%, continuous monitoring, 12-lead ECG if available, and rapid transport to a hospital capable of post-arrest care including TTM and cardiac catheterization.",
          },
          {
            text: "Give the patient water to drink since they may be thirsty",
            nextStepId: "step7",
            isCorrect: false,
            feedback:
              "An unconscious patient must NOT be given anything by mouth due to aspiration risk. Maintain airway, provide supplemental oxygen, and monitor.",
          },
        ],
      },
      step8: {
        id: "step8",
        text: "Excellent work! You have successfully managed an adult cardiac arrest using the Chain of Survival: Early Access, Early CPR, Early Defibrillation, and Advanced Care. The patient has been transported to the nearest hospital for post-cardiac arrest care. Key takeaways: Always ensure scene safety and BSI first, start CPR immediately, apply the AED as soon as available, minimize interruptions to compressions, and provide appropriate post-ROSC care.",
        choices: [],
      },
    },
  },

  // ===== 2. Choking Adult =====
  {
    id: "choking-adult",
    title: "Choking Adult (Conscious → Unconscious)",
    description:
      "You are on duty at a community event when a 40-year-old male suddenly begins clutching his throat while eating. He appears distressed and cannot speak.",
    category: "FA",
    startStepId: "c1",
    steps: {
      c1: {
        id: "c1",
        text: "A 40-year-old male is clutching his throat at a community event. He cannot speak or cough effectively. His face is turning red. What is this sign called and what should you do?",
        choices: [
          {
            text: "This is the universal sign of choking. Ask 'Are you choking?' and if he nods yes, tell him you are going to help him",
            nextStepId: "c2",
            isCorrect: true,
            feedback:
              "Correct! Clutching the throat is the universal distress signal for choking. Confirm the airway obstruction by asking and then intervene immediately.",
          },
          {
            text: "Give him water to drink to wash down the obstruction",
            nextStepId: "c1",
            isCorrect: false,
            feedback:
              "Never give water or fluids to a choking patient—this can worsen the obstruction or cause aspiration. The patient needs abdominal thrusts (Heimlich maneuver).",
          },
          {
            text: "Wait to see if the object passes on its own",
            nextStepId: "c1",
            isCorrect: false,
            feedback:
              "A patient with a severe airway obstruction (cannot speak, cough, or breathe) needs immediate intervention. Waiting can lead to unconsciousness and death.",
          },
          {
            text: "Slap the patient on the back while they are standing upright",
            nextStepId: "c1",
            isCorrect: false,
            feedback:
              "Back blows are not recommended for conscious adults with severe airway obstruction in an upright position—they may push the object deeper. Use abdominal thrusts instead.",
          },
        ],
      },
      c2: {
        id: "c2",
        text: "The patient confirms he is choking by nodding. He cannot speak, cough, or breathe effectively. This is a severe (complete) airway obstruction. What is the correct intervention?",
        choices: [
          {
            text: "Perform abdominal thrusts (Heimlich maneuver): stand behind the patient, place the thumb side of your fist above the navel, grab your fist with the other hand, and deliver inward-upward thrusts",
            nextStepId: "c3",
            isCorrect: true,
            feedback:
              "Correct! For a conscious adult with severe airway obstruction, perform abdominal thrusts. Each thrust should be a separate, distinct movement aimed at dislodging the object.",
          },
          {
            text: "Perform chest thrusts from the front",
            nextStepId: "c2",
            isCorrect: false,
            feedback:
              "Chest thrusts are used for obese or pregnant patients where you cannot encircle the abdomen. For a standard adult, abdominal thrusts are the first-line intervention.",
          },
        ],
      },
      c3: {
        id: "c3",
        text: "You have performed 5 abdominal thrusts but the object has not been dislodged. The patient is still choking. What should you do?",
        choices: [
          {
            text: "Give up and call for help",
            nextStepId: "c3",
            isCorrect: false,
            feedback:
              "Never give up on a choking patient. Continue alternating between abdominal thrusts until the object is dislodged or the patient becomes unconscious.",
          },
          {
            text: "Continue performing abdominal thrusts, repeating sets of 5 until the object is dislodged or the patient becomes unconscious",
            nextStepId: "c4",
            isCorrect: true,
            feedback:
              "Correct! Continue performing abdominal thrusts in sets of 5 until the obstruction is relieved or the patient loses consciousness. Do not stop prematurely.",
          },
        ],
      },
      c4: {
        id: "c4",
        text: "The patient has now become unconscious and slumps to the ground. What should you do immediately?",
        choices: [
          {
            text: "Try to reach into the mouth to remove the object blindly",
            nextStepId: "c4",
            isCorrect: false,
            feedback:
              "Never perform blind finger sweeps—they can push the object deeper. Only perform a finger sweep if you can visually see the object in the mouth.",
          },
          {
            text: "Lower the patient to the ground, activate emergency response, begin CPR starting with chest compressions (no rescue breaths yet—check mouth between compressions and breaths)",
            nextStepId: "c5",
            isCorrect: true,
            feedback:
              "Correct! When a choking patient becomes unconscious: lower them to the ground, call for help, begin CPR with chest compressions. Before giving rescue breaths, look in the mouth and remove any visible object. Each compression may help dislodge the obstruction.",
          },
          {
            text: "Leave the patient to find help",
            nextStepId: "c4",
            isCorrect: false,
            feedback:
              "Never leave an unconscious patient. Lower them to the ground, call for help if possible, and begin CPR immediately.",
          },
        ],
      },
      c5: {
        id: "c5",
        text: "You begin CPR. After 30 compressions, you open the airway and see a piece of food in the back of the throat. What should you do?",
        choices: [
          {
            text: "Perform a blind finger sweep to remove the object",
            nextStepId: "c5",
            isCorrect: false,
            feedback:
              "This is NOT a blind sweep—you can SEE the object. Since it's visible, use a finger sweep to carefully remove it. Blind sweeps (when you can't see anything) are never appropriate.",
          },
          {
            text: "Since the object is visible, use a finger sweep to remove it, then attempt 2 rescue breaths",
            nextStepId: "c6",
            isCorrect: true,
            feedback:
              "Correct! When the object is VISIBLE in the mouth, use a finger sweep to hook and remove it, then attempt rescue breaths. If breaths don't make the chest rise, reposition the head and try again.",
          },
          {
            text: "Skip the removal and just give rescue breaths anyway",
            nextStepId: "c5",
            isCorrect: false,
            feedback:
              "If you can see the obstructing object, remove it before attempting rescue breaths. Trying to ventilate past a visible obstruction will be ineffective.",
          },
        ],
      },
      c6: {
        id: "c6",
        text: "You remove the food object and deliver 2 rescue breaths—the chest rises visibly. You check for a pulse and find one. The patient begins to breathe spontaneously and is starting to regain consciousness. What should you do now?",
        choices: [
          {
            text: "Place the patient in the recovery position, monitor their airway and breathing, and arrange transport for medical evaluation",
            nextStepId: "c7",
            isCorrect: true,
            feedback:
              "Correct! After relieving the obstruction, place the patient in recovery position, monitor continuously, and transport for evaluation. Complications from abdominal thrusts (rib fractures, internal organ damage) must be assessed at the hospital.",
          },
          {
            text: "Let the patient sit up and continue eating",
            nextStepId: "c6",
            isCorrect: false,
            feedback:
              "The patient needs medical evaluation after a choking emergency. Abdominal thrusts can cause internal injuries. The patient should not eat or drink until cleared by a physician.",
          },
        ],
      },
      c7: {
        id: "c7",
        text: "Well done! You successfully managed a choking adult from conscious to unconscious state. Key points: Recognize the universal distress signal, perform abdominal thrusts for conscious adults, transition to CPR when the patient becomes unconscious, visually check the mouth before rescue breaths, and always arrange transport for post-obstruction evaluation.",
        choices: [],
      },
    },
  },

  // ===== 3. Severe Bleeding =====
  {
    id: "severe-bleeding",
    title: "Severe Bleeding / Hemorrhage Control",
    description:
      "You respond to a construction site where a worker has sustained a deep laceration to his left thigh from a power saw. There is profuse, pulsatile bleeding.",
    category: "Trauma",
    startStepId: "b1",
    steps: {
      b1: {
        id: "b1",
        text: "You arrive at a construction site. A worker has a deep laceration on his left thigh with profuse, bright red, pulsatile bleeding. The scene appears safe. What is your FIRST action?",
        choices: [
          {
            text: "Apply BSI (gloves at minimum) and then immediately apply direct pressure to the wound",
            nextStepId: "b2",
            isCorrect: true,
            feedback:
              "Correct! BSI first (gloves are essential with profuse bleeding), then immediate direct pressure on the wound. Pulsatile, bright red bleeding indicates arterial hemorrhage—a life-threatening emergency.",
          },
          {
            text: "Assess the patient's airway and breathing first",
            nextStepId: "b1",
            isCorrect: false,
            feedback:
              "While ABC is the standard approach, profuse arterial bleeding is an immediate life threat that must be controlled simultaneously with or even before airway assessment in extreme hemorrhage. Apply BSI and control bleeding immediately.",
          },
          {
            text: "Apply a tourniquet immediately without trying direct pressure",
            nextStepId: "b2",
            isCorrect: false,
            feedback:
              "Direct pressure is the first intervention for hemorrhage control. Tourniquets are indicated when direct pressure fails to control life-threatening extremity bleeding.",
          },
        ],
      },
      b2: {
        id: "b2",
        text: "You have applied firm direct pressure with a dressing, but the bleeding is soaking through rapidly and not controlled. What should you do next?",
        choices: [
          {
            text: "Remove the dressing and apply a new one",
            nextStepId: "b2",
            isCorrect: false,
            feedback:
              "Never remove a blood-soaked dressing—it disrupts clot formation. Instead, add additional dressings on top and increase pressure.",
          },
          {
            text: "Apply additional dressings on top of the existing one and increase direct pressure. If bleeding still cannot be controlled, apply a tourniquet",
            nextStepId: "b3",
            isCorrect: true,
            feedback:
              "Correct! Add dressings on top (never remove), increase pressure. For life-threatening extremity bleeding not controlled by direct pressure, a tourniquet is indicated.",
          },
          {
            text: "Elevate the leg and wait for the bleeding to slow",
            nextStepId: "b2",
            isCorrect: false,
            feedback:
              "Elevation alone will not control arterial bleeding. Continue direct pressure and move to tourniquet application if needed.",
          },
        ],
      },
      b3: {
        id: "b3",
        text: "Direct pressure is not controlling the hemorrhage. You decide to apply a tourniquet. Where should it be placed?",
        choices: [
          {
            text: "Directly over the wound",
            nextStepId: "b3",
            isCorrect: false,
            feedback:
              "The tourniquet should NOT be placed directly over the wound. Place it 2-3 inches above (proximal to) the wound, avoiding joints if possible.",
          },
          {
            text: "2-3 inches above (proximal to) the wound, over the clothing if necessary for speed",
            nextStepId: "b4",
            isCorrect: true,
            feedback:
              "Correct! Place the tourniquet 2-3 inches proximal to the wound. It can be applied over clothing if necessary for speed. Do not place over joints.",
          },
          {
            text: "At the hip (highest possible point)",
            nextStepId: "b3",
            isCorrect: false,
            feedback:
              "The tourniquet should be placed 2-3 inches above the wound, not at the highest possible point. Unnecessarily high placement sacrifices more tissue.",
          },
        ],
      },
      b4: {
        id: "b4",
        text: "You have applied the tourniquet and tightened it until the bleeding has stopped. What must you do now?",
        choices: [
          {
            text: "Note and document the time of tourniquet application, then proceed with the rest of the primary survey",
            nextStepId: "b5",
            isCorrect: true,
            feedback:
              "Correct! Always document the time of tourniquet application—it is critical information for the hospital. Then continue with the primary survey (ABCDE). NEVER remove a tourniquet once applied in the field.",
          },
          {
            text: "Loosen the tourniquet every 15 minutes to allow circulation",
            nextStepId: "b4",
            isCorrect: false,
            feedback:
              "NEVER loosen or remove a field-applied tourniquet. This can dislodge clots and cause rebleeding that may be uncontrollable. The tourniquet stays on until hospital care.",
          },
          {
            text: "Cover the tourniquet with a bandage so it's not visible",
            nextStepId: "b4",
            isCorrect: false,
            feedback:
              "Never cover or hide a tourniquet—it must remain visible. Write the time of application on the patient or the tourniquet itself. Hospital staff need to see it immediately.",
          },
        ],
      },
      b5: {
        id: "b5",
        text: "Bleeding is controlled with the tourniquet. You proceed with the primary survey. The patient is Alert, breathing at 24/min, pulse 120/min, BP 100/70, skin cool and pale. These signs indicate:",
        choices: [
          {
            text: "Normal vital signs for a trauma patient",
            nextStepId: "b5",
            isCorrect: false,
            feedback:
              "Tachycardia (HR 120), tachypnea (RR 24), relative hypotension (BP 100/70 with significant bleeding), and cool/pale skin indicate hypovolemic shock (Class II-III). This patient needs rapid transport.",
          },
          {
            text: "Hypovolemic shock secondary to hemorrhage—the patient needs rapid transport to a trauma center",
            nextStepId: "b6",
            isCorrect: true,
            feedback:
              "Correct! The tachycardia, tachypnea, relative hypotension, and cool/pale skin indicate hemorrhagic shock. The patient needs rapid transport with ongoing monitoring and IV fluid resuscitation if available.",
          },
        ],
      },
      b6: {
        id: "b6",
        text: "You are preparing the patient for rapid transport. What additional interventions should be performed?",
        choices: [
          {
            text: "Administer high-flow oxygen, keep the patient warm (prevent hypothermia), splint other injuries if found, and continuously monitor vital signs during transport",
            nextStepId: "b7",
            isCorrect: true,
            feedback:
              "Correct! Shock management includes: high-flow O2, warmth (hypothermia worsens coagulopathy), splinting other injuries, and continuous monitoring. Rapid transport is the priority—definitive surgical care saves lives.",
          },
          {
            text: "Give the patient oral fluids to replace blood volume",
            nextStepId: "b6",
            isCorrect: false,
            feedback:
              "Never give oral fluids to a patient in shock—they may need surgery and oral intake increases aspiration risk. IV fluid resuscitation is indicated if available.",
          },
        ],
      },
      b7: {
        id: "b7",
        text: "Excellent management of severe hemorrhage! Key takeaways: BSI first, direct pressure is the initial intervention, add dressings (never remove), apply tourniquet when direct pressure fails for life-threatening extremity bleeding, always document the tourniquet time, recognize signs of hemorrhagic shock, and prioritize rapid transport to definitive care within the Golden Hour.",
        choices: [],
      },
    },
  },

  // ===== 4. Anaphylaxis =====
  {
    id: "anaphylaxis",
    title: "Anaphylaxis (Epi-Pen Administration)",
    description:
      "A 30-year-old female was stung by a bee at a park. She has a known bee allergy and carries an EpiPen. She is developing facial swelling and difficulty breathing.",
    category: "Med Emerg",
    startStepId: "a1",
    steps: {
      a1: {
        id: "a1",
        text: "A 30-year-old female reports a bee sting 5 minutes ago. She has known bee allergy and carries an EpiPen. She now has facial swelling, difficulty breathing, and is developing hives on her arms. What is your assessment?",
        choices: [
          {
            text: "This is a mild allergic reaction—give her an antihistamine and monitor",
            nextStepId: "a1",
            isCorrect: false,
            feedback:
              "Facial swelling and difficulty breathing indicate a SEVERE allergic reaction (anaphylaxis), not a mild reaction. Anaphylaxis is life-threatening and requires immediate epinephrine.",
          },
          {
            text: "This is anaphylaxis—a severe, potentially fatal allergic reaction requiring immediate epinephrine administration",
            nextStepId: "a2",
            isCorrect: true,
            feedback:
              "Correct! Facial swelling (angioedema), difficulty breathing (bronchospasm/airway compromise), and hives (urticaria) constitute anaphylaxis. Epinephrine is the FIRST and ONLY first-line treatment.",
          },
          {
            text: "Call the hospital and wait for physician orders before treating",
            nextStepId: "a1",
            isCorrect: false,
            feedback:
              "Anaphylaxis requires immediate epinephrine—do not delay treatment for physician consultation. This is a standing order in most EMS protocols.",
          },
        ],
      },
      a2: {
        id: "a2",
        text: "You recognize anaphylaxis. The patient has her prescribed EpiPen. What should you do?",
        choices: [
          {
            text: "Assist the patient with her prescribed EpiPen: remove the safety cap, press the auto-injector firmly against the anterolateral thigh, hold for 10 seconds, then massage the injection site",
            nextStepId: "a3",
            isCorrect: true,
            feedback:
              "Correct! For BLS providers: assist the patient with her prescribed EpiPen. Inject into the anterolateral thigh (can be done through clothing), hold for 10 seconds, then massage the site for 10 seconds to enhance absorption.",
          },
          {
            text: "Inject the EpiPen into the deltoid muscle of the upper arm",
            nextStepId: "a2",
            isCorrect: false,
            feedback:
              "The anterolateral thigh (vastus lateralis) is the recommended injection site for auto-injectors, not the deltoid. The thigh provides more reliable IM absorption.",
          },
          {
            text: "Give diphenhydramine (Benadryl) first, then use the EpiPen",
            nextStepId: "a2",
            isCorrect: false,
            feedback:
              "Epinephrine is the FIRST-LINE treatment for anaphylaxis. Antihistamines are adjuncts given AFTER epinephrine. Never delay epinephrine for other medications.",
          },
        ],
      },
      a3: {
        id: "a3",
        text: "You administer the EpiPen. After 3 minutes, the patient's breathing has improved slightly but facial swelling persists and she still feels short of breath. What should you do?",
        choices: [
          {
            text: "The EpiPen has been given—no further treatment is possible",
            nextStepId: "a3",
            isCorrect: false,
            feedback:
              "If anaphylaxis symptoms persist after the first dose, a second dose of epinephrine may be given after 5-15 minutes if available. Continue monitoring and supportive care.",
          },
          {
            text: "Administer a second dose of epinephrine if available (the patient has a second EpiPen), provide high-flow oxygen, position the patient in a comfortable position, and prepare for immediate transport",
            nextStepId: "a4",
            isCorrect: true,
            feedback:
              "Correct! A second dose may be needed if symptoms persist. Provide supplemental oxygen, position for comfort (sitting up for breathing difficulty), and transport immediately. Anaphylaxis can recur (biphasic reaction).",
          },
        ],
      },
      a4: {
        id: "a4",
        text: "After the second EpiPen and oxygen, the patient's breathing has improved. Her BP is 100/70, HR 110, RR 22, SpO2 94%. She is more comfortable but still has some swelling. What is your transport priority?",
        choices: [
          {
            text: "Cancel the ambulance since she's improving—the EpiPen solved the problem",
            nextStepId: "a4",
            isCorrect: false,
            feedback:
              "Always transport anaphylaxis patients, even after improvement. Biphasic reactions can occur hours later. The patient needs hospital observation and additional treatment.",
          },
          {
            text: "Transport immediately—she needs hospital observation for biphasic reaction and additional treatment including corticosteroids and antihistamines",
            nextStepId: "a5",
            isCorrect: true,
            feedback:
              "Correct! Anaphylaxis patients MUST be transported even if they improve. Biphasic reactions (recurrence without re-exposure) can occur 4-12 hours later. Hospital treatment includes corticosteroids, H1/H2 blockers, and observation.",
          },
        ],
      },
      a5: {
        id: "a5",
        text: "During transport, the patient suddenly becomes hypotensive (BP 70/40) and confused. What should you do?",
        choices: [
          {
            text: "Place the patient supine with legs elevated (Trendelenburg/shock position), ensure IV access if available, increase oxygen, and notify the receiving hospital of deteriorating status",
            nextStepId: "a6",
            isCorrect: true,
            feedback:
              "Correct! Hypotension in anaphylaxis indicates distributive shock. Place the patient supine with legs elevated, maximize oxygen delivery, and arrange for IV fluid resuscitation and additional epinephrine. Notify the hospital immediately.",
          },
          {
            text: "Sit the patient upright to help breathing",
            nextStepId: "a5",
            isCorrect: false,
            feedback:
              "A hypotensive patient should be placed supine with legs elevated to improve venous return and perfusion. Sitting upright worsens hypotension in shock.",
          },
        ],
      },
      a6: {
        id: "a6",
        text: "Great job managing this anaphylaxis case! Key takeaways: Recognize anaphylaxis signs (airway compromise, breathing difficulty, hypotension, hives), administer epinephrine FIRST, a second dose may be needed, always transport even if the patient improves, and be prepared for biphasic reactions. Epinephrine is the ONLY first-line treatment—antihistamines are adjuncts.",
        choices: [],
      },
    },
  },

  // ===== 5. Stroke FAST =====
  {
    id: "stroke-fast",
    title: "Stroke Recognition (FAST Assessment)",
    description:
      "You respond to a home where a 65-year-old woman's family reports she suddenly developed right-sided weakness and slurred speech during breakfast.",
    category: "Med Emerg",
    startStepId: "s1",
    steps: {
      s1: {
        id: "s1",
        text: "A 65-year-old woman's family reports she suddenly developed right-sided weakness and slurred speech while eating breakfast about 30 minutes ago. What is your initial impression?",
        choices: [
          {
            text: "Possible stroke—this is a time-critical emergency requiring rapid assessment and transport",
            nextStepId: "s2",
            isCorrect: true,
            feedback:
              "Correct! Sudden onset of unilateral weakness and slurred speech is the classic presentation of stroke. Time is brain—every minute counts for thrombolytic therapy eligibility.",
          },
          {
            text: "This is likely just fatigue—monitor and reassess later",
            nextStepId: "s1",
            isCorrect: false,
            feedback:
              "Sudden onset of focal neurological deficits is NEVER normal fatigue. This is a stroke until proven otherwise and requires immediate action.",
          },
          {
            text: "Administer oral glucose for suspected hypoglycemia",
            nextStepId: "s1",
            isCorrect: false,
            feedback:
              "While hypoglycemia can mimic stroke symptoms, you must assess blood glucose first. Giving oral glucose without confirming hypoglycemia is inappropriate, and a stroke patient may aspirate oral medications.",
          },
        ],
      },
      s2: {
        id: "s2",
        text: "You suspect stroke. You perform the FAST assessment. What does FAST stand for and what do you assess?",
        choices: [
          {
            text: "Face (ask to smile—look for droop), Arms (ask to raise both—look for drift), Speech (ask to repeat a phrase—listen for slurring), Time (note the time of symptom onset—it's critical)",
            nextStepId: "s3",
            isCorrect: true,
            feedback:
              "Correct! FAST: Face droop, Arm drift, Speech abnormality, Time of onset. The time of onset is critical because thrombolytic therapy has a narrow time window.",
          },
          {
            text: "Fever, Appetite, Stomach pain, Thirst",
            nextStepId: "s2",
            isCorrect: false,
            feedback:
              "FAST in the stroke context stands for Face, Arms, Speech, Time—not fever, appetite, stomach pain, thirst.",
          },
        ],
      },
      s3: {
        id: "s3",
        text: "FAST assessment reveals: Right facial droop when smiling, right arm drifts down when raised, slurred speech when repeating 'The sky is blue.' Family confirms symptom onset was 30 minutes ago during breakfast. You check blood glucose: 110 mg/dL (normal). What is your next priority?",
        conditions: [],
        choices: [
          {
            text: "Rapid transport to a stroke center, noting the exact time of symptom onset (last known normal time), and notify the receiving hospital en route",
            nextStepId: "s4",
            isCorrect: true,
            feedback:
              "Correct! This is a likely acute ischemic stroke. The last known normal time is 30 minutes ago—well within the thrombolytic window (typically 4.5 hours). Rapid transport with pre-notification is critical.",
          },
          {
            text: "Administer aspirin immediately",
            nextStepId: "s3",
            isCorrect: false,
            feedback:
              "Aspirin should not be given in the field for stroke until hemorrhagic stroke is ruled out by CT scan. Giving aspirin to a hemorrhagic stroke patient could worsen bleeding.",
          },
        ],
      },
      s4: {
        id: "s4",
        text: "During transport, what additional assessments and interventions should you perform?",
        choices: [
          {
            text: "Monitor ABCs, check vital signs every 5 minutes, keep the patient NPO (nothing by mouth), position with head elevated 30 degrees, perform a more detailed neurological exam (GCS, pupil check, extremity strength), and pre-notify the hospital",
            nextStepId: "s5",
            isCorrect: true,
            feedback:
              "Correct! Stroke care during transport: maintain ABCs, frequent vital signs, NPO (dysphagia risk), head elevation 30° to reduce ICP, detailed neuro exam, and hospital pre-notification for rapid CT upon arrival.",
          },
          {
            text: "Give the patient water to prevent dehydration",
            nextStepId: "s4",
            isCorrect: false,
            feedback:
              "Stroke patients must be NPO (nothing by mouth) due to high dysphagia risk. Aspiration pneumonia is a leading cause of death after stroke. Keep the patient NPO until swallowing is assessed.",
          },
        ],
      },
      s5: {
        id: "s5",
        text: "You arrive at the hospital and provide turnover. The stroke team is activated and takes the patient directly to CT. What information is MOST critical to communicate?",
        choices: [
          {
            text: "The patient's name and address only",
            nextStepId: "s5",
            isCorrect: false,
            feedback:
              "While patient identification is important, the most critical information for stroke treatment is the last known normal time and the FAST findings.",
          },
          {
            text: "Last known normal time (30 minutes ago), FAST findings (right facial droop, right arm drift, slurred speech), vital signs, blood glucose result, and all interventions performed",
            nextStepId: "s6",
            isCorrect: true,
            feedback:
              "Correct! The last known normal time is THE most critical piece of information—it determines thrombolytic eligibility. Include FAST findings, vitals, glucose, and interventions.",
          },
        ],
      },
      s6: {
        id: "s6",
        text: "Excellent stroke management! Key takeaways: Recognize stroke signs with FAST, determine the last known normal time immediately, check blood glucose to rule out hypoglycemia, keep patient NPO, transport rapidly with hospital pre-notification, and communicate the last known normal time as the most critical information. 'Time is brain'—every minute counts!",
        choices: [],
      },
    },
  },

  // ===== 6. Spinal Injury =====
  {
    id: "spinal-injury",
    title: "Suspected Spinal Injury",
    description:
      "You respond to a motorcycle crash. The rider was thrown from the motorcycle and is lying on the road, complaining of neck and back pain with tingling in both hands.",
    category: "Trauma",
    startStepId: "sp1",
    steps: {
      sp1: {
        id: "sp1",
        text: "You arrive at a motorcycle crash. The rider was thrown approximately 10 meters and is lying on the road, complaining of severe neck pain and tingling in both hands. What is your first priority?",
        choices: [
          {
            text: "Apply BSI, ensure scene safety, and immediately stabilize the cervical spine with manual in-line stabilization",
            nextStepId: "sp2",
            isCorrect: true,
            feedback:
              "Correct! For a motorcycle crash with neck pain and neurological symptoms, manual in-line stabilization of the cervical spine must be applied immediately while ensuring scene safety and BSI.",
          },
          {
            text: "Remove the patient's helmet immediately to assess the head",
            nextStepId: "sp1",
            isCorrect: false,
            feedback:
              "Do NOT remove the helmet immediately if spinal injury is suspected—unless it prevents airway management. Helmet removal should be a coordinated two-person procedure with simultaneous spinal stabilization.",
          },
          {
            text: "Roll the patient into the recovery position first",
            nextStepId: "sp1",
            isCorrect: false,
            feedback:
              "Do not move a patient with suspected spinal injury without proper stabilization. Maintain manual in-line stabilization and perform a primary survey with minimal patient movement.",
          },
        ],
      },
      sp2: {
        id: "sp2",
        text: "You have applied manual in-line stabilization. The patient is conscious and breathing. You perform the primary survey. Which assessment approach is most appropriate for this trauma patient?",
        choices: [
          {
            text: "ABCDE with cervical spine protection maintained throughout the assessment",
            nextStepId: "sp3",
            isCorrect: true,
            feedback:
              "Correct! For trauma patients, the ABCDE approach includes c-spine protection as part of the Airway assessment. Maintain manual stabilization throughout the entire assessment and until the patient is fully immobilized.",
          },
          {
            text: "SAMPLE first, then ABCDE",
            nextStepId: "sp2",
            isCorrect: false,
            feedback:
              "The primary survey (ABCDE) must be performed before the secondary survey (SAMPLE history). Life threats must be identified and treated first.",
          },
        ],
      },
      sp3: {
        id: "sp3",
        text: "Primary survey reveals: Airway patent, breathing adequate, pulse present and regular, patient Alert and oriented, no major external bleeding. The patient is wearing a motorcycle helmet. What should you do about the helmet?",
        choices: [
          {
            text: "Leave the helmet on until it can be removed with a coordinated two-person technique while maintaining spinal alignment",
            nextStepId: "sp4",
            isCorrect: true,
            feedback:
              "Correct! If the helmet does not interfere with airway management, it should be removed using a coordinated two-person technique: one person stabilizes the head/helmet while the other cuts or removes the chin strap, then both persons work together to slide the helmet off while maintaining alignment.",
          },
          {
            text: "Never remove a helmet in the field under any circumstances",
            nextStepId: "sp3",
            isCorrect: false,
            feedback:
              "Helmets should be removed when spinal immobilization is needed, but only with proper two-person technique. Leaving the helmet on prevents proper application of a cervical collar and spinal immobilization.",
          },
        ],
      },
      sp4: {
        id: "sp4",
        text: "The helmet has been removed with proper technique. You need to apply a cervical collar and immobilize the patient. The patient is still lying on the ground. What is the correct sequence?",
        choices: [
          {
            text: "Apply the cervical collar, then log-roll the patient onto a long spine board or vacuum mattress while maintaining manual stabilization",
            nextStepId: "sp5",
            isCorrect: true,
            feedback:
              "Correct! Apply the cervical collar first (while maintaining manual stabilization), then coordinate the log-roll with sufficient rescuers to move the patient as a unit onto the immobilization device.",
          },
          {
            text: "Log-roll the patient first, then apply the cervical collar",
            nextStepId: "sp4",
            isCorrect: false,
            feedback:
              "The cervical collar should be applied BEFORE log-rolling to provide some structural support. Manual stabilization must be maintained throughout the entire process.",
          },
        ],
      },
      sp5: {
        id: "sp5",
        text: "The patient is immobilized and being prepared for transport. She reports numbness and weakness in both legs that was not present initially. This new neurological finding indicates:",
        choices: [
          {
            text: "Progressive spinal cord compromise—this is a critical finding requiring immediate transport to a facility with neurosurgical capability",
            nextStepId: "sp6",
            isCorrect: true,
            feedback:
              "Correct! Worsening neurological symptoms suggest progressive spinal cord compression or injury. This requires the most rapid transport possible to a facility with neurosurgical and CT/MRI capability. Document the time of onset of new symptoms.",
          },
          {
            text: "Normal progression that does not change the transport priority",
            nextStepId: "sp5",
            isCorrect: false,
            feedback:
              "Progressive neurological deficits in a spinal injury patient are a CRITICAL finding that UPGRADES the transport priority. Rapid transport to a facility with neurosurgical capability is essential.",
          },
        ],
      },
      sp6: {
        id: "sp6",
        text: "Well done managing this suspected spinal injury! Key takeaways: Apply manual in-line stabilization immediately, maintain c-spine protection throughout the primary survey, remove helmets with coordinated two-person technique, apply cervical collar before log-rolling, use sufficient rescuers for the log-roll, and recognize that worsening neurological symptoms are critical findings requiring urgent transport to a neurosurgical facility.",
        choices: [],
      },
    },
  },

  // ===== 7. Diabetic Emergency =====
  {
    id: "diabetic-emergency",
    title: "Diabetic Emergency (Hypoglycemia)",
    description:
      "You respond to an office where a 45-year-old male with diabetes has become confused, diaphoretic, and tremulous. Coworkers say he took insulin but skipped lunch.",
    category: "Med Emerg",
    startStepId: "d1",
    steps: {
      d1: {
        id: "d1",
        text: "A 45-year-old diabetic male is confused, sweating profusely, and trembling. His coworkers say he took his insulin this morning but skipped lunch. What is your initial assessment?",
        choices: [
          {
            text: "This is likely hypoglycemia (low blood sugar) caused by insulin without adequate food intake",
            nextStepId: "d2",
            isCorrect: true,
            feedback:
              "Correct! Insulin without food intake is the classic cause of hypoglycemia. Confusion, diaphoresis, and tremor are hallmark signs of low blood glucose. This must be confirmed with a glucose check.",
          },
          {
            text: "This is likely hyperglycemia (high blood sugar)",
            nextStepId: "d1",
            isCorrect: false,
            feedback:
              "Hyperglycemia typically presents with polyuria, polydipsia, and Kussmaul respirations over a longer period. The acute onset of confusion, sweating, and tremor after insulin without food is classic for hypoglycemia.",
          },
          {
            text: "This is a psychiatric emergency",
            nextStepId: "d1",
            isCorrect: false,
            feedback:
              "Always rule out organic causes (especially hypoglycemia) before attributing altered mental status to psychiatric causes. Hypoglycemia is a medical emergency that is easily reversible.",
          },
        ],
      },
      d2: {
        id: "d2",
        text: "You suspect hypoglycemia. What should you do to confirm and treat?",
        choices: [
          {
            text: "Check blood glucose with a glucometer, and if below 60 mg/dL in a conscious patient who can swallow, administer oral glucose",
            nextStepId: "d3",
            isCorrect: true,
            feedback:
              "Correct! Always confirm hypoglycemia with a glucose check. For a conscious patient who can swallow safely, oral glucose is the first-line treatment. Target: raise blood glucose above 70 mg/dL.",
          },
          {
            text: "Administer insulin to counteract the confusion",
            nextStepId: "d2",
            isCorrect: false,
            feedback:
              "Insulin LOWERS blood glucose—giving it to a hypoglycemic patient would worsen the condition dangerously. NEVER give insulin for suspected hypoglycemia.",
          },
          {
            text: "Give the patient water only and wait for improvement",
            nextStepId: "d2",
            isCorrect: false,
            feedback:
              "Water does not contain glucose and will not treat hypoglycemia. The patient needs glucose (sugar) administration. Check blood glucose first, then treat.",
          },
        ],
      },
      d3: {
        id: "d3",
        text: "Blood glucose is 38 mg/dL. The patient is conscious but increasingly confused and has a weak gag reflex. What should you do?",
        choices: [
          {
            text: "Give oral glucose anyway—the patient needs sugar urgently",
            nextStepId: "d3",
            isCorrect: false,
            feedback:
              "Oral glucose should NOT be given to a patient with a weak gag reflex due to aspiration risk. This patient needs an alternative route of glucose administration.",
          },
          {
            text: "Since the patient has a weak gag reflex and cannot safely swallow, administer glucagon 1 mg IM or arrange for IV dextrose if ALS is available",
            nextStepId: "d4",
            isCorrect: true,
            feedback:
              "Correct! For patients who cannot safely swallow, glucagon IM is the BLS alternative. It works by mobilizing glycogen from the liver. Onset is 10-20 minutes. IV dextrose is faster but requires ALS capability.",
          },
        ],
      },
      d4: {
        id: "d4",
        text: "You administer glucagon 1 mg IM. While waiting for it to take effect, what should you do?",
        choices: [
          {
            text: "Place the patient in the recovery position (to protect the airway if vomiting occurs), monitor ABCs and vital signs, and prepare for transport",
            nextStepId: "d5",
            isCorrect: true,
            feedback:
              "Correct! Position in recovery position (glucagon can cause nausea/vomiting), monitor airway and vital signs, and arrange transport. Glucagon takes 10-20 minutes to work—monitor continuously.",
          },
          {
            text: "Leave the patient unattended while you complete paperwork",
            nextStepId: "d4",
            isCorrect: false,
            feedback:
              "Never leave a patient with altered mental status unattended. Their condition can deteriorate rapidly, and they cannot protect their own airway.",
          },
        ],
      },
      d5: {
        id: "d5",
        text: "After 15 minutes, the patient's mental status is improving. Repeat blood glucose is 78 mg/dL. He is now alert and oriented. He asks if he can just go home. What should you advise?",
        choices: [
          {
            text: "Let him go home—he's fine now",
            nextStepId: "d5",
            isCorrect: false,
            feedback:
              "The patient should be transported for medical evaluation. The underlying cause of hypoglycemia must be assessed, and the patient is at risk for recurrence. Glucagon's effects may wear off.",
          },
          {
            text: "Strongly recommend transport—the hypoglycemia may recur, the underlying cause needs evaluation, and he should eat a meal with complex carbohydrates to maintain glucose levels",
            nextStepId: "d6",
            isCorrect: true,
            feedback:
              "Correct! Even after recovery, hypoglycemia can recur. The patient needs medical evaluation, a meal with complex carbohydrates to maintain glucose, and education about preventing future episodes.",
          },
        ],
      },
      d6: {
        id: "d6",
        text: "Great management of this diabetic emergency! Key takeaways: Recognize hypoglycemia signs (confusion, diaphoresis, tremor), always check blood glucose, give oral glucose ONLY to patients who can swallow safely, use glucagon IM for patients with impaired swallowing, position in recovery position after glucagon (vomiting risk), and always recommend transport even after recovery due to recurrence risk.",
        choices: [],
      },
    },
  },

  // ===== 8. Choking Infant =====
  {
    id: "choking-infant",
    title: "Choking Infant",
    description:
      "You respond to a home where a distressed parent reports their 8-month-old infant was playing with small toys and is now choking, unable to cry, and turning blue around the lips.",
    category: "Pediatric",
    startStepId: "ci1",
    steps: {
      ci1: {
        id: "ci1",
        text: "An 8-month-old infant is choking—unable to cry, making high-pitched sounds, and showing cyanosis around the lips. The parent is panicked. What is your first action?",
        choices: [
          {
            text: "Apply BSI, confirm severe airway obstruction (cannot cry, cyanosis), and begin infant choking interventions immediately",
            nextStepId: "ci2",
            isCorrect: true,
            feedback:
              "Correct! An infant who cannot cry and is cyanotic has a severe airway obstruction—this is a life-threatening emergency requiring immediate intervention with back blows and chest thrusts.",
          },
          {
            text: "Perform abdominal thrusts (Heimlich maneuver) on the infant",
            nextStepId: "ci1",
            isCorrect: false,
            feedback:
              "Abdominal thrusts are NOT appropriate for infants under 1 year—they can cause internal organ damage. For infants, use 5 back blows alternating with 5 chest thrusts.",
          },
          {
            text: "Give the infant water to drink to wash down the obstruction",
            nextStepId: "ci1",
            isCorrect: false,
            feedback:
              "Never give fluids to a choking infant—this can worsen the obstruction or cause aspiration. Immediate back blows and chest thrusts are indicated.",
          },
        ],
      },
      ci2: {
        id: "ci2",
        text: "You confirm severe airway obstruction. What is the correct technique for relieving choking in a conscious infant?",
        choices: [
          {
            text: "5 back blows (between the shoulder blades with the infant face-down along your forearm) followed by 5 chest thrusts (using 2 fingers on the center of the chest), repeating until the object is dislodged or the infant becomes unconscious",
            nextStepId: "ci3",
            isCorrect: true,
            feedback:
              "Correct! For a conscious choking infant: support the infant face-down along your forearm (head lower than chest), deliver 5 back blows between the shoulder blades. If ineffective, turn the infant face-up, and give 5 chest thrusts with 2 fingers on the lower half of the sternum. Repeat the cycle.",
          },
          {
            text: "Perform blind finger sweeps in the mouth",
            nextStepId: "ci2",
            isCorrect: false,
            feedback:
              "Never perform blind finger sweeps in an infant's mouth—this can push the object deeper. Only remove visible objects with a finger sweep.",
          },
        ],
      },
      ci3: {
        id: "ci3",
        text: "After 2 cycles of back blows and chest thrusts, the object has not been dislodged and the infant is now becoming limp and unresponsive. What should you do?",
        choices: [
          {
            text: "Continue back blows even though the infant is unconscious",
            nextStepId: "ci3",
            isCorrect: false,
            feedback:
              "When the infant becomes unconscious, switch to infant CPR. Back blows and chest thrusts are for conscious infants only.",
          },
          {
            text: "Place the infant on a firm flat surface, begin infant CPR (2 fingers, compression depth 1.5 inches, ratio 30:2 for single rescuer), look in the mouth before each set of rescue breaths and remove any visible object",
            nextStepId: "ci4",
            isCorrect: true,
            feedback:
              "Correct! When an infant becomes unconscious from choking: begin infant CPR. Use 2 fingers for compressions, depth about 1.5 inches (4 cm). Before each set of rescue breaths, look in the mouth and remove any visible object. Do NOT perform blind finger sweeps.",
          },
        ],
      },
      ci4: {
        id: "ci4",
        text: "During CPR, after 30 compressions you open the airway and see a small toy piece in the back of the infant's throat. What should you do?",
        choices: [
          {
            text: "Perform a blind finger sweep",
            nextStepId: "ci4",
            isCorrect: false,
            feedback:
              "This is NOT a blind sweep—the object is VISIBLE. Since you can see it, carefully use your little finger to hook and remove the object. Blind sweeps are never appropriate.",
          },
          {
            text: "Carefully use your little finger to hook and remove the visible object, then attempt 2 rescue breaths",
            nextStepId: "ci5",
            isCorrect: true,
            feedback:
              "Correct! When the object is visible, use your little finger to carefully hook and remove it. Then attempt rescue breaths. If the chest doesn't rise, reposition the head and try again.",
          },
        ],
      },
      ci5: {
        id: "ci5",
        text: "You remove the toy piece and deliver 2 rescue breaths—the chest rises. You check for a pulse and find a brachial pulse of 130/min. The infant begins to cry and breathe spontaneously. What should you do?",
        choices: [
          {
            text: "Monitor the infant closely, maintain airway, position in recovery position, and arrange immediate transport for medical evaluation even though the infant appears to be recovering",
            nextStepId: "ci6",
            isCorrect: true,
            feedback:
              "Correct! After relieving the obstruction, monitor closely, maintain airway, and transport for evaluation. Infants can develop complications (pulmonary edema, aspiration) after choking episodes.",
          },
          {
            text: "Tell the parents the infant is fine and they don't need to go to the hospital",
            nextStepId: "ci5",
            isCorrect: false,
            feedback:
              "Always recommend transport after a choking emergency, especially for infants. Complications may not be immediately apparent, and chest thrusts can cause internal injuries that need evaluation.",
          },
        ],
      },
      ci6: {
        id: "ci6",
        text: "Excellent management of a choking infant! Key takeaways: For conscious choking infants, use 5 back blows alternating with 5 chest thrusts (NOT abdominal thrusts), when the infant becomes unconscious begin infant CPR, visually check the mouth before rescue breaths, only remove VISIBLE objects (never blind sweeps), and always arrange transport for post-obstruction evaluation. Remember: infants are NOT small adults—techniques differ significantly!",
        choices: [],
      },
    },
  },
];
