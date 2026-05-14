export interface CompetencyModuleFil {
  title: string
  description: string
  reviewerNotes: string
  procedures: { title: string; steps: string[] }[]
  visualIllustrations: { title: string; description: string }[]
  keyPoints: string[]
  assessorQuestions: string[]
  memorizationTips: string[]
  flashcards: { front: string; back: string }[]
  miniQuiz: { question: string; options: string[]; correctAnswer: number; explanation: string }[]
}

export const competenciesFil: Record<string, CompetencyModuleFil> = {
  'bls': {
    title: 'Basic Life Support (BLS)',
    description: 'Pangunahing mga pamamaraan sa pagbibigay ng life support kabilang ang Chain of Survival, high-quality CPR para sa lahat ng grupo ng edad, at pagkilala sa cardiac arrest. Ito ang pinakamahalagang kakayahang dapat tamarin ng bawat EMS provider.',
    reviewerNotes: 'Ang BLS ay ang pundasyon ng buong kasanayan sa EMS at ang pinakamabigat na sinusuring kakayahan sa pagsusulit ng TESDA NCII. Magtuon sa pag-master sa Chain of Survival, mga sukat ng high-quality CPR (lalim, bilis, recoil, fraction), at ang C-A-B sequence na pinagtibay ng 2020 AHA guidelines. Sa kapaligiran ng Pilipinas, ang mga responder ay madalas na nagtatrabaho nang may limitadong resources, kaya ang diin sa epektibong bystander CPR at mabilis na pag-deploy ng AED ay kritikal. Susuriin ng assessor ang parehong kaalaman at hands-on na pagganap, kabilang ang kalidad ng compression sa manikin. Tandaan na ang survival ay bumababa ng 7-10% sa bawat minutong walang defibrillation sa VF cardiac arrest.',
    procedures: [
      {
        title: 'High-Quality CPR para sa Matanda',
        steps: [
          'Beripikahin ang kaligtasan ng eksena at magsuot ng angkop na PPE',
          'Suriin ang pagtugon (tapikin ang mga balikat at sumigaw "Okay ka ba?")',
          'I-activate ang emergency response at kunin ang AED kung available',
          'Sabay na suriin ang normal na paghinga at pulso (5-10 segundo)',
          'Kung walang pulso o abnormal na paghinga, magsimula ng chest compressions agad',
          'Ilagay ang takong ng isang kamay sa ibabang kalahati ng sternum, ang isa pang kamay sa ibabaw, mag-interlock ng mga daliri',
          'I-compress ng 2-2.4 pulgada (5-6 cm) sa bilis na 100-120/min na may buong chest recoil',
          'Pagkatapos ng 30 compressions, buksan ang airway (head tilt-chin lift o jaw thrust para sa trauma)',
          'Magbigay ng 2 hininga (1 segundo bawat isa, may nakikitang pagtaas ng dibdib)',
          'Ipagpatuloy ang 30:2 cycle; i-minimize ang mga pagkakapatigil sa mas mababa sa 10 segundo'
        ]
      },
      {
        title: 'Pagpapawi ng Foreign Body Airway Obstruction (FBAO)',
        steps: [
          'Kilalanin ang mga palatandaan: may hawak sa leeg, hindi makapagsalita/umuhaw, cyanosis',
          'Tanungin "Nahihirapan ka bang huminga?" — kung makaka-uhaw ang pasyente, hikayatin na umuhaw',
          'Kung matinding obstruction (hindi makapagsalita/umuhaw): tumayo sa likod ng pasyente',
          'Iposisyon ang kamao sa itaas lamang ng umbilicus (pusod), yakapin ng isa pang kamay',
          'Magbigay ng abdominal thrusts (Heimlich maneuver) pabligtas at paitaas',
          'Ipagpatuloy ang thrusts hanggang lumabas ang bagay o mawalan ng malay ang pasyente',
          'Kung mawalan ng malay ang pasyente: magsimula ng CPR, suriin ang bibig bago bawat hininga',
          'Para sa mataba o buntis na pasyente: gumamit ng chest thrusts sa halip na abdominal thrusts'
        ]
      },
      {
        title: 'Recovery Position',
        steps: [
          'Kumpirmahin na ang pasyente ay humihinga nang normal at may pulso',
          'Luhod sa tabi ng pasyente at iunat ang kamay na pinakamalapit sa iyo papalabas',
          'Ilagay ang malayong kamay sa ibabaw ng dibdib papunta sa malapit na balikat',
          'Yukuing ang malayong tuhod at i-roll ang pasyente papunta sa iyo',
          'Iposisyon ang ulo upang mapanatili ang bukas na airway at mapahintulutan ang pag-agos',
          'Patuloy na subaybayan ang paghinga at sirkulasyon hanggang dumating ang tulong'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Chain of Survival', description: 'Anim na magkakaugnay na link ng kadena: (1) Pagkilala sa cardiac arrest, (2) Pag-activate ng emergency response, (3) Agarang high-quality CPR, (4) Mabilis na defibrillation, (5) Advanced life support, (6) Post-cardiac arrest care. Bawat link ay may kanya-kanyang kulay mula berde hanggang pula na nagpapakita ng pag-unlad ng pangangalaga.' },
      { title: 'Pagposisyon ng Kamay para sa Compressions', description: 'Harapang pagtingin sa dibdib na nagpapakita ng tamang pagposisyon ng kamay: takong ng isang kamay sa ibabang kalahati ng sternum sa pagitan ng linya ng utong, ang isa pang kamay sa ibabaw na may magka-interlock na mga daliri at nakaangat mula sa dibdib. Ang mga balikat ay direktang nasa ibabaw ng pasyente na may nakalawit na mga bisig para sa patayong compression.' },
      { title: 'Posisyon sa Heimlich Maneuver', description: 'Pagtingin sa gilid na nagpapakita ng rescuer na nakatayo sa likod ng isang nahihirapang matanda: kamao na inilagay sa itaas lamang ng umbilicus, ang isa pang kamay na sumasaklaw sa kamao. Ang mga arrow ay nagpapakita ng pabligtas at paitaas na direksyon ng abdominal thrusts. Ang inset ay nagpapakita ng alternatibong chest thrust para sa buntis/matabang pasyente.' }
    ],
    keyPoints: [
      'C-A-B sequence: Compressions muna, tapos Airway, tapos Breathing',
      'Lalim ng compression sa matanda: 2-2.4 pulgada (5-6 cm); bilis: 100-120/min',
      'Ang compression fraction ay dapat hindi bababa sa 60% — i-minimize ang mga pagkakapatigil',
      'Magpalit ng compressor bawat 2 minuto (5 cycles) upang maiwasan ang pagkapagod',
      'Ang survival ay bumababa ng 7-10% kada minutong walang defibrillation sa VF',
      'Ang buong chest recoil ay mahalaga — ang pag-lean ay nagbabawas sa cardiac output',
      'Para sa FBAO: abdominal thrusts sa matanda; back blows at chest thrusts sa sanggol'
    ],
    assessorQuestions: [
      'Ipaliwanag ang Chain of Survival at ang kahalagahan ng bawat link.',
      'Ano ang limang kritikal na bahagi ng high-quality CPR?',
      'Paano nagkakaiba ang pamamahala ng FBAO sa may malay at walang malay na pasyente?',
      'Ano ang tamang compression-to-ventilation ratio para sa single-rescuer adult CPR?',
      'Bakit mahalaga ang buong chest recoil sa panahon ng compressions?'
    ],
    memorizationTips: [
      'CAB = "Compressions Are Best" — laging magsimula sa compressions',
      'Bilis ng compression 100-120 = tempo ng "Stayin\' Alive" ng Bee Gees o "Leron Leron Sinta"',
      'Lalim na "2 to 2.4" = isipin ang kapal ng dalawang piso na nakasalansan',
      'Chain of Survival: "R-A-C-D-A-P" = Recognize, Activate, CPR, Defibrillate, ALS, Post-care'
    ],
    flashcards: [
      { front: 'Ano ang ibig sabihin ng C-A-B?', back: 'Compressions, Airway, Breathing' },
      { front: 'Ano ang lalim ng compression sa matanda?', back: '2-2.4 pulgada (5-6 cm)' },
      { front: 'Ano ang pinakamababang katanggap-tanggap na compression fraction?', back: '60%' },
      { front: 'Gaano kadalas dapat magpalit ng compressor?', back: 'Bawat 2 minuto (humigit-kumulang 5 cycles ng 30:2)' },
      { front: 'Ano ang compression-to-ventilation ratio para sa single-rescuer adult CPR?', back: '30:2 (30 compressions sa 2 hininga)' }
    ],
    miniQuiz: [
      { question: 'Ano ang tamang bilis ng compression para sa adult CPR?', options: ['80-100/min', '100-120/min', '120-140/min', '60-80/min'], correctAnswer: 1, explanation: 'Itinatakda ng 2020 AHA guidelines ang compression rate na 100-120 kada minuto para sa high-quality CPR.' },
      { question: 'Sa C-A-B sequence, ano ang unang ginagawa?', options: ['Airway', 'Breathing', 'Compressions', 'Defibrillation'], correctAnswer: 2, explanation: 'Ang C-A-B ay nangangahulugang Compressions-Airway-Breathing. Ang compressions ay sinisimulan muna upang mapanatili ang sirkulasyon.' },
      { question: 'Ano ang tamang pamamaraan para maibsan ang matinding FBAO sa may malay na matanda?', options: ['Back blows lamang', 'Abdominal thrusts (Heimlich maneuver)', 'Chest compressions', 'Finger sweep'], correctAnswer: 1, explanation: 'Para sa may malay na matanda na may matinding FBAO, ang abdominal thrusts (Heimlich maneuver) ang nirerekomendang pamamaraan.' },
      { question: 'Gaano kalaki ang pagbaba ng survival kada minutong walang defibrillation sa VF?', options: ['2-3%', '5-6%', '7-10%', '15-20%'], correctAnswer: 2, explanation: 'Ang survival mula sa VF cardiac arrest ay bumababa ng humigit-kumulang 7-10% sa bawat minutong walang defibrillation.' },
      { question: 'Kailan dapat magpalit ng compressor sa panahon ng CPR?', options: ['Bawat minuto', 'Bawat 2 minuto', 'Bawat 5 minuto', 'Kapag pagod na'], correctAnswer: 1, explanation: 'Magpalit ng compressor bawat 2 minuto (humigit-kumulang 5 cycles) upang maiwasan ang pagbaba ng kalidad ng compression dahil sa pagkapagod.' }
    ]
  },

  'airway-management': {
    title: 'Airway Management',
    description: 'Mga pamamaraan sa pagtatatag at pagpapanatili ng bukas na airway kabilang ang basic airway maneuvers, adjuncts, suctioning, at advanced airway devices sa antas ng BLS.',
    reviewerNotes: 'Ang airway management ay ang pinakamataas na priyoridad sa ABCDE approach at isang kritikal na kasanayan na sinusuri sa TESDA NCII. Susuriin ng assessor ang iyong kakayahang buksan ang airway gamit ang manual maneuvers, pumili at mag-insert ng angkop na airway adjuncts (OPA at NPA), magsagawa ng suctioning, at gumamit ng bag-valve-mask nang epektibo. Sa prehospital setting ng Pilipinas, ang mga advanced airway devices ay maaaring hindi laging available, kaya ang pag-master sa basic airway skills ay napakahalaga. Kasama sa mga pangunahing konsepto ang pagkakaiba sa pagitan ng OPA (nangangailangan ng walang malay na pasyente na walang gag reflex) at NPA (maaring gamitin sa semi-conscious na pasyente), tamang BVM technique (EC-clamp), at pagkilala sa airway obstruction. Tandaan: kung ang pasyente ay hindi makahinga, walang ibang bagay ang mahalaga.',
    procedures: [
      {
        title: 'Mga Pangunahing Pamamaraan sa Pagbubukas ng Airway',
        steps: [
          'Suriin ang patency ng airway: tumingin, makinig, at maramdaman ang galaw ng hangin',
          'Para sa medikal na pasyente na walang pinaghihinalaang spinal injury: head tilt-chin lift',
          'Ilagay ang isang kamay sa noo na itinutulak pabalik, mga daliri ng isa pang kamay sa ilalim ng baba na itinutulak paitaas',
          'Para sa trauma na pasyente na may pinaghihinalaang spinal injury: jaw thrust maneuver',
          'Ilagay ang mga daliri sa likod ng anggulo ng panga at itulak paitaas nang hindi inuunat ang leeg',
          'Kung may nakitang foreign body: magsagawa ng finger sweep (sa walang malay na matanda lamang)',
          'Kung nananatiling na-obstruct ang airway: isaalang-alang ang repositioning o pag-abante sa airway adjuncts'
        ]
      },
      {
        title: 'Pag-insert ng Airway Adjunct',
        steps: [
          'Pag-insert ng OPA: sukatin mula sa sulok ng bibig hanggang sa earlobe o anggulo ng panga',
          'Ilagay ang OPA na ang dulo ay nakaturo sa bubong ng bibig, pagkatapos i-rotate ng 180° paglampas sa soft palate',
          'Bilang alternatibo, gumamit ng tongue depressor para igiya ang OPA nang direkta sa ibabaw ng dila',
          'Siguraduhin na hindi itinutulik ng OPA ang dila pabalik — kung mag-gag ang pasyente, alisin agad',
          'Pag-insert ng NPA: sukatin mula sa dulo ng ilong hanggang sa earlobe, mag-lubricate ng water-soluble gel',
          'Ilagay ang NPA na ang bevel ay nakaturo sa nasal septum, dahan-dahang isusulong sa ibabaw ng nasopharynx',
          'Kung may resistance, subukan ang iba pang butas ng ilong — huwag kailanman pilitin ang NPA',
          'Ang NPA ay maaaring gamitin sa semi-conscious na pasyente na may intact na gag reflex (hindi tulad ng OPA)'
        ]
      },
      {
        title: 'Ventilasyon gamit ang Bag-Valve-Mask (BVM)',
        steps: [
          'Pumili ng angkop na laki ng mask (adult, bata, sanggol)',
          'Ikonekta ang BVM sa oxygen source sa 15 L/min na may nakalagay na reservoir',
          'Iposisyon ang iyong sarili sa ulo ng pasyente',
          'Ilapat ang mask gamit ang EC-clamp technique: hinlalaki at pointer finger na bumubuo ng "C" sa mask, ang natitirang mga daliri ay nagtataas ng panga ("E")',
          'Siguraduhing mahigpit ang seal sa pagitan ng mask at mukha — walang pagtagas ng hangin',
          'Pindutin ang bag para magbigay ng 1-segundong hininga na may nakikitang pagtaas ng dibdib',
          'Iwasan ang labis na ventilasyon — magbigay lamang ng sapat na volume para sa nakikitang pagtaas ng dibdib',
          'Para sa single rescuer: mahirap panatilihin ang seal at pindutin ang bag — isaalang-alang ang pocket mask sa halip'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Head Tilt-Chin Lift laban sa Jaw Thrust', description: 'Paghahambing na magkatabi: Sa kaliwa ay nagpapakita ng head tilt-chin lift (isang kamay sa noo na itinutulak pabalik, mga daliri sa ilalim ng baba na itinutulak paitaas) para sa medikal na pasyente. Sa kanan ay nagpapakita ng jaw thrust (mga daliri sa likod ng mga anggulo ng panga na itinutulak paitaas, walang pag-unat ng leeg) para sa trauma na pasyente. Ang mga arrow ay nagpapakita ng direksyon ng puwersa para sa bawat maneuver.' },
      { title: 'Pagsukat at Pag-insert ng OPA', description: 'Tatlong panel: (1) Pagsukat ng OPA mula sa sulok ng bibig hanggang sa earlobe, (2) Pag-insert ng OPA na ang dulo ay nakaturo sa bubong ng bibig, (3) 180° rotation paglampas sa soft palate upang pumunta sa ibabaw ng dila. Cross-section na nagpapakita ng OPA na hinihiwalay ang dila mula sa posterior pharynx.' },
      { title: 'EC-Clamp Technique sa BVM', description: 'Malapitang pagtingin sa EC-clamp na posisyon ng kamay: hinlalaki at pointer finger na bumubuo ng "C" na pinipiga ang mask sa mukha, habang ang middle, ring, at pinky fingers ay bumubuo ng "E" na nagtataas ng panga. Ang isa pang kamay ay pumipiga sa bag. Ang tamang seal ay naipapakita na walang nakikitang puwang.' }
    ],
    keyPoints: [
      'Ang airway ay ang UNANG priyoridad — ang "A" ay nauna sa lahat sa ABCDE',
      'Head tilt-chin lift: para sa medikal na pasyente; Jaw thrust: para sa trauma na pasyente',
      'OPA: para sa walang malay na pasyente lamang na WALANG gag reflex — alisin kung mag-gag ang pasyente',
      'NPA: maaaring gamitin sa semi-conscious na pasyente na may intact na gag reflex; mag-lubricate bago mag-insert',
      'BVM gamit ang EC-clamp technique: panatilihin ang mask seal habang itinataas ang panga',
      'Iwasan ang labis na ventilasyon — sapat lamang para sa nakikitang pagtaas ng dibdib (1 segundo bawat hininga)',
      'Ang NPA ay kontraindikado sa pinaghihinalaang basilar skull fracture (CSF leak sa ilong/tainga)'
    ],
    assessorQuestions: [
      'Ano ang pagkakaiba sa pagitan ng head tilt-chin lift at jaw thrust, at kailan ginagamit ang bawat isa?',
      'Paano mo tamaang sinusukat at ini-insert ang Oropharyngeal Airway?',
      'Ano ang mga bentahe ng NPA kaysa sa OPA?',
      'Ilarawan ang EC-clamp technique para sa BVM ventilation.',
      'Kailan kontraindikado ang NPA?'
    ],
    memorizationTips: [
      'Airway maneuvers: "Medical = Tilt, Trauma = Thrust" — simpleng patakaran sa pagpili ng pamamaraan',
      'Pagsukat ng OPA: "Bibig hanggang Tenga" — mabilis na paraan ng pagsukat',
      'Pag-insert ng OPA: "Roof-Rotate" = ituro sa bubong ng bibig, i-rotate ng 180°',
      'EC-clamp: "C sa mask, E sa panga" — C ang nag-se-seal, E ang nagtataas'
    ],
    flashcards: [
      { front: 'Aling airway maneuver ang ginagamit para sa trauma na pasyente?', back: 'Jaw thrust (walang head tilt, upang mapanatili ang spinal alignment)' },
      { front: 'Paano tamang sinasukat ang OPA?', back: 'Sukatin mula sa sulok ng bibig hanggang sa earlobe o anggulo ng panga' },
      { front: 'Kailan dapat alisin ang OPA?', back: 'Agad kung mag-gag ang pasyente o may intact na gag reflex' },
      { front: 'Anong bentahe ang meron ang NPA kaysa sa OPA?', back: 'Ang NPA ay maaaring gamitin sa semi-conscious na pasyente na may intact na gag reflex' },
      { front: 'Ano ang EC-clamp technique?', back: 'Hinlalabi at pointer finger na bumubuo ng "C" sa mask, ang natitirang mga daliri ay bumubuo ng "E" na nagtataas ng panga upang mapanatili ang airway at seal' }
    ],
    miniQuiz: [
      { question: 'Ang jaw thrust maneuver ay ipinapakita para sa:', options: ['Lahat ng pasyente', 'Mga medikal na pasyente lamang', 'Mga pasyenteng may pinaghihinalaang spinal injury', 'Mga may malay na pasyente'], correctAnswer: 2, explanation: 'Ang jaw thrust ay ginagamit para sa mga pasyenteng may pinaghihinalaang spinal injury dahil binubuksan nito ang airway nang hindi inuunat ang leeg.' },
      { question: 'Ang OPA ay dapat alisin kung:', options: ['Ang pasyente ay walang malay', 'Mag-gag ang pasyente', 'Maling laki ito', 'May available na NPA'], correctAnswer: 1, explanation: 'Ang OPA ay dapat gamitin lamang sa walang malay na pasyente na walang gag reflex. Kung mag-gag ang pasyente, alisin ito agad upang maiwasan ang pagsusuka at aspiration.' },
      { question: 'Ang NPA ay kontraindikado sa:', options: ['Mga may malay na pasyente', 'Mga pasyenteng may gag reflex', 'Pinaghihinalaang basilar skull fracture', 'Mga pediatric na pasyente'], correctAnswer: 2, explanation: 'Ang NPA ay kontraindikado sa pinaghihinalaang basilar skull fracture dahil maaaring ito ay pumasok sa fractured cribriform plate papunta sa cranial vault.' },
      { question: 'Gaano katagal dapat ibigay ang bawat hininga gamit ang BVM?', options: ['0.5 segundo', '1 segundo', '2 segundo', '3 segundo'], correctAnswer: 1, explanation: 'Ang bawat hininga ay dapat ibigay sa loob ng 1 segundo na may sapat na volume para sa nakikitang pagtaas ng dibdib.' },
      { question: 'Aling adjunct ang maaaring gamitin sa semi-conscious na pasyente?', options: ['OPA lamang', 'NPA lamang', 'Parehong OPA at NPA', 'Wala — maghintay na mawalan ng malay'], correctAnswer: 1, explanation: 'Ang NPA ay maaaring gamitin sa semi-conscious na pasyente na may intact na gag reflex, hindi tulad ng OPA na nangangailangan ng walang malay na pasyente.' }
    ]
  },

  'patient-assessment': {
    title: 'Assessment',
    description: 'Sistematikong paglalapit sa pagsusuri ng pasyente kabilang ang scene size-up, primary survey, focused history, at detalyadong pisikal na pagsusuri na may tamang pamamaraan sa dokumentasyon.',
    reviewerNotes: 'Ang patient assessment ay ang sistematikong pundasyon kung saan nakabatay ang buong pangangalagang EMS. Sakop ng module na ito ang tatlong yugto: initial assessment (scene size-up at primary survey gamit ang ABCDE), focused assessment (SAMPLE history at OPQRST pain assessment), at detalyadong head-to-toe examination. Susuriin ng TESDA NCII assessor ang iyong kakayahang magsagawa ng metodiko at organisadong assessment nang walang nakaliligtaang kritikal na hakbang. Sa setting ng EMS sa Pilipinas, ang mga pasyente ay madalas na nagpapakita nang huli at na may maraming reklamo, kaya ang kasiguruhan ay mahalaga. Ang dokumentasyon gamit ang SOAP format ay sinusuri rin. Ang critical thinking sa pagpapanatili ng priyoridad sa mga banta sa buhay ay mabigat na sinusuri.',
    procedures: [
      {
        title: 'Primary Survey (ABCDE)',
        steps: [
          'Magsagawa ng scene size-up: siguraduhing ligtas ang eksena, BSI, mechanism of injury/nature of illness',
          'Tantyahin ang bilang ng mga pasyente at humingi ng karagdagang resources kung kinakailangan',
          'Suriin ang pangkalahatang impresyon: edad, posisyon, kitang pagkabahala, mga halatang pinsala',
          'A — Airway: Bukas at malaya ba? (head tilt-chin lift o jaw thrust para sa trauma)',
          'B — Breathing: Meron ba? Sapat ba? (tingin, pakikinig, pandinig — 5-10 segundo)',
          'C — Circulation: May pulso ba? Nagdurugo? Kulay/temperatura ng balat/capillary refill',
          'D — Disability: AVPU scale, mga pupil, lateralizing signs',
          'E — Exposure: Suriing mabuti, maiwasan ang pagkawala ng init',
          'Tukuyin at gamutin ang mga banta sa buhay agad',
          'Gumawa ng desisyon sa transport: kritikal = agarang transport na may interbensyon sa daan'
        ]
      },
      {
        title: 'Focused History at Pisikal na Pagsusuri',
        steps: [
          'Kunin ang pangunahing reklamo sa sariling salita ng pasyente',
          'Mangalap ng SAMPLE history: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events',
          'Suriin ang OPQRST para sa sakit: Onset, Provocation, Quality, Radiation, Severity, Time',
          'Magsagawa ng focused physical exam batay sa pangunahing reklamo',
          'Kunin ang baseline vital signs: BP, HR, RR, SpO2, temperatura, blood glucose kung may indikasyon',
          'I-reassess nang madalas: bawat 5 minuto para sa kritikal, bawat 15 minuto para sa stable na pasyente',
          'Idokumento ang lahat ng natuklasan gamit ang SOAP format'
        ]
      },
      {
        title: 'Detalyadong Head-to-Toe Examination',
        steps: [
          'Magsimula sa ulo: suriin at palpasin ang anit, mukha, mata (PERRL), tainga, ilong, bibig',
          'Suriin ang leeg: JVD, posisyon ng trachea, subcutaneous emphysema, cervical spine tenderness',
          'Suriin ang dibdib: bilateral breath sounds, integridad ng chest wall, heart sounds',
          'Palpasin ang tiyan: distension, tenderness, rigidity, guarding',
          'Suriin ang pelvis: banayad na compression para sa stability (HUWAG ulit-uliting subukan)',
          'Suriin ang mga ekstremit: deformity, crepitus, pulso, sensation, motor function (CSM)',
          'Log roll at suriin ang likod: tenderness ng spine, mga sugat, flanks',
          'Idokumento ang lahat ng positibo at may-kaugnayang negatibong natuklasan'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'ABCDE Assessment Flowchart', description: 'Isang sequential na flowchart: A (Airway) → B (Breathing) → C (Circulation) → D (Disability) → E (Exposure). Bawat box ay naglalaman ng mga pangunahing parameter ng assessment, mga red flag na nangangailangan ng agarang interbensyon, at karaniwang gamot. Ang mga arrow ay nagpapakita ng parehong pag-unlad at feedback loops para sa reassessment.' },
      { title: 'SAMPLE History Mnemonic', description: 'Isang visual mnemonic card na may bawat letra ng SAMPLE: S=Signs/Symptoms, A=Allergies, M=Medications, P=Past medical history, L=Last oral intake, E=Events leading up to. Bawat letra ay may kasamang halimbawa ng mga tanong na itatanong ng provider sa pasyente.' },
      { title: 'Pagkakasunod-sunod ng Head-to-Toe Examination', description: 'Isang diagram ng katawan na may naka-numerong bilog na nagpapakita ng pagkakasunod-sunod ng pagsusuri mula sa ulo (1) hanggang sa paa (7), na may posterior exam pagkatapos ng log roll (8). Bawat bilog ay nagpapakita kung ano ang susuriin sa bawat rehiyon ng katawan.' }
    ],
    keyPoints: [
      'Laging magsagawa ng scene size-up BAGO lapitan ang pasyente',
      'Ang primary survey (ABCDE) ay nagtutukoy at nagpapagamot sa mga banta sa buhay muna',
      'SAMPLE = Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events',
      'OPQRST = Onset, Provocation, Quality, Radiation, Severity, Time',
      'AVPU scale: Alert → Verbal → Pain → Unresponsive',
      'I-reassess ang vital signs: bawat 5 min (kritikal) o 15 min (stable)',
      'Idokumento gamit ang SOAP: Subjective, Objective, Assessment, Plan'
    ],
    assessorQuestions: [
      'Ilarawan ang mga bahagi ng primary survey at ang tamang pagkakasunod-sunod nito.',
      'Ano ang ibig sabihin ng SAMPLE at paano ito ginagamit sa patient assessment?',
      'Paano mo isinasagawa ang scene size-up bago lapitan ang isang pasyente?',
      'Ipaliwanag ang AVPU scale at ang klinikal na kahalagahan nito sa assessment.',
      'Ano ang SOAP documentation format at bakit ito mahalaga?'
    ],
    memorizationTips: [
      'ABCDE = "Always Be Checking Dead Elevators" — Airway, Breathing, Circulation, Disability, Exposure',
      'SAMPLE = "Some Answers Make Patients Lie" — tandaan na kunin ang LAHAT ng kategorya',
      'OPQRST = "On Pure Quest, Radiate Some Time" — mnemonic sa pain assessment',
      'AVPU = descending consciousness scale mula Alert hanggang Unresponsive'
    ],
    flashcards: [
      { front: 'Ano ang ibig sabihin ng ABCDE sa primary survey?', back: 'Airway, Breathing, Circulation, Disability, Exposure' },
      { front: 'Ano ang ibig sabihin ng SAMPLE?', back: 'Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events' },
      { front: 'Ano ang sinusuri ng OPQRST?', back: 'Mga katangian ng sakit: Onset, Provocation, Quality, Radiation, Severity, Time' },
      { front: 'Gaano kadalas dapat i-reassess ang isang kritikal na pasyente?', back: 'Bawat 5 minuto' },
      { front: 'Ano ang ibig sabihin ng SOAP sa dokumentasyon?', back: 'Subjective, Objective, Assessment, Plan' }
    ],
    miniQuiz: [
      { question: 'Ano ang tamang pagkakasunod-sunod ng primary survey?', options: ['ABCDE', 'CABDE', 'ABDCE', 'EABCD'], correctAnswer: 0, explanation: 'Ang primary survey ay sumusunod sa ABCDE sequence: Airway, Breathing, Circulation, Disability, Exposure.' },
      { question: 'Ano ang ibig sabihin ng "L" sa SAMPLE?', options: ['Location', 'Last oral intake', 'Level of consciousness', 'Laboratory results'], correctAnswer: 1, explanation: 'Sa SAMPLE, ang L ay nangangahulugang Last oral intake, na mahalaga para sa anesthesia considerations at pagtatasa ng poisoning.' },
      { question: 'Gaano kadalas dapat i-reassess ang isang stable na pasyente?', options: ['Bawat 2 minuto', 'Bawat 5 minuto', 'Bawat 15 minuto', 'Bawat 30 minuto'], correctAnswer: 2, explanation: 'Ang mga stable na pasyente ay dapat i-reassess bawat 15 minuto, habang ang mga kritikal na pasyente ay bawat 5 minuto.' },
      { question: 'Ano ang UNANG dapat gawin kapag nakarating sa isang eksena?', options: ['Lapitan ang pasyente', 'Suriin ang airway', 'Scene size-up', 'Tumawag ng backup'], correctAnswer: 2, explanation: 'Ang scene size-up ay dapat LAGING gawin MUNA upang masiguro ang kaligtasan bago lapitan ang pasyente.' },
      { question: 'Ano ang ibig sabihin ng "Q" sa OPQRST?', options: ['Quick', 'Quality', 'Quantity', 'Question'], correctAnswer: 1, explanation: 'Ang Q ay nangangahulugang Quality ng sakit (matindi, banayad, nakakasunog, nakakasa), na nakakatulong makilala ang mga uri ng kondisyon.' }
    ]
  },

  'medical-emergencies': {
    title: 'Med Emerg',
    description: 'Pagkilala at pamamahala ng mga acute na medikal na kondisyon kabilang ang cardiac emergencies, stroke, diabetic emergencies, respiratory distress, allergic reactions, at seizures.',
    reviewerNotes: 'Sakop ng medical emergencies ang malawak na hanay ng acute na kondisyon na madalas na nakikita ng mga EMS provider. Susuriin ng TESDA NCII assessor ang iyong kakayahang makilala ang iba\'t ibang medikal na kondisyon batay sa pagpapakita, magbigay ng angkop na prehospital intervensyon, at tantyahin ang priyoridad sa transport. Sa konteksto ng Pilipinas, kabilang sa mga karaniwang pagpapakita ang hypertensive emergencies, diabetic crises (parehong hypo at hyperglycemia), asthma exacerbations, at cerebrovascular accidents. Ang pangunahing diin ay sa mabilis na assessment gamit ang OPQRST at SAMPLE mnemonics, pagkilala sa stroke gamit ang FAST mnemonic, at angkop na paggamit ng glucose meter. Ang pag-unawa sa pagkakaiba sa pagitan ng angina at MI, hypo at hyperglycemia, at iba\'t ibang respiratory conditions ay mahalaga.',
    procedures: [
      {
        title: 'Assessment at Pamamahala ng Cardiac Emergency',
        steps: [
          'Magsagawa ng primary survey at kunin ang baseline vital signs',
          'Mangalap ng SAMPLE history na nakatuon sa mga cardiac risk factor',
          'Suriin ang sakit sa dibdib gamit ang OPQRST — karaniwang MI: nakakasaksak, umaabot sa kaliwang braso/baba',
          'Magbigay ng aspirin 162-325 mg na nguya-nguyain kung walang kontraindikasyon (allergy, pagdurugo)',
          'Tulungan sa prescribed na nitroglycerin (1 spray/sublingual bawat 5 min, max 3 doses) kung SBP >100',
          'Subaybayan ang mga palatandaan ng cardiogenic shock: hypotension, altered LOC, malamis/nagpapawis na balat',
          'Kunin ang 12-lead ECG kung available at ipadala sa receiving facility',
          'I-transport nang mabilis — ang oras ay myocardium'
        ]
      },
      {
        title: 'Assessment ng Stroke (FAST)',
        steps: [
          'Kilalanin ang biglaang pagsisimula ng neurologic deficits',
          'F — Face: hilingin sa pasyente na ngumiti, hanapin ang facial droop',
          'A — Arms: hilingin sa pasyente na itaas ang parehong braso, hanapin ang drift',
          'S — Speech: hilingin sa pasyente na ulitin ang isang parirala, makinig sa pagkakabaluktot',
          'T — Time: tandaan ang eksaktong oras ng pagsisimula ng mga sintomas (huling kilalang normal)',
          'Magsagawa ng Cincinnati Prehospital Stroke Scale kung sanay',
          'I-transport sa stroke center agad — ang oras ay utak (tPA window: 3-4.5 oras)',
          'Ipanatili ang pasyenteng NPO, itaas ang head of stretcher ng 30 degrees, subaybayan ang airway'
        ]
      },
      {
        title: 'Pamamahala ng Diabetic Emergency',
        steps: [
          'Suriin ang antas ng kamalayan at vital signs',
          'Kunin ang antas ng blood glucose gamit ang glucometer',
          'Hypoglycemia (<60 mg/dL) na may malay: magbigay ng oral glucose 15-30 gramo',
          'Hypoglycemia na walang malay: HUWAG magbigay ng anuman sa bibig, magtatag ng IV access kung sanay',
          'Hyperglycemia (>300 mg/dL): subaybayan ang airway, i-transport para sa medikal na pagsusuri',
          'Muling suriin ang blood glucose 15 minuto pagkatapos ng paggamot sa hypoglycemia',
          'Idokumento ang mga glucose reading, interbensyon, at reaksyon ng pasyente',
          'I-transport ang lahat ng pasyenteng may altered mental status at abnormal na glucose'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'FAST Stroke Assessment', description: 'Apat na panel na nagpapakita ng FAST assessment: (F) Face droop sa isang gilid kapag ngumingiti, (A) Arm drift kapag itinaas ang parehong braso, (S) Slurred speech kapag nag-uulit ng parirala, (T) Time na tumawag ng tulong — orasan na nagpapakita ng kahalagahan ng pagtala sa oras ng pagsisimula ng sintomas.' },
      { title: 'Paghahambing ng Hypoglycemia at Hyperglycemia', description: 'Pahalip na paghahambing na tsart: Hypoglycemia (mababang glucose <60) mga palatandaan ay kabilang ang pagpapawis, panginginig, kalituhan, tachycardia, gutom. Hyperglycemia (mataas na glucose >300) mga palatandaan ay kabilang ang polyuria, polydipsia, Kussmaul breathing, fruity na amoy ng hininga, dehydration. Malinaw na naka-marka ang pagkakaiba sa paggamot.' },
      { title: 'Pattern ng Radiation ng Cardiac Chest Pain', description: 'Diagram ng katawan na nagpapakita ng karaniwang cardiac chest pain: sentral na presyon/pagsasaksak sa dibdib na may radiation sa kaliwang braso, baba, leeg, at minsan sa likod. Ang mga label ay nagsisipi sa typical vs atypical na pagpapakita, na may tala na ang mga babae at diabetic ay maaaring magpakita nang atypically.' }
    ],
    keyPoints: [
      'FAST = Face droop, Arm drift, Speech difficulty, Time na tumawag ng tulong',
      'Stroke tPA window: 3-4.5 oras mula sa huling kilalang normal — ang oras ay utak',
      'Hypoglycemia (<60 mg/dL): may malay = oral glucose; walang malay = IV dextrose o glucagon',
      'Huwag kailanman magbigay ng anuman sa bibig sa walang malay o altered na pasyente',
      'Aspirin para sa pinaghihinalaang MI: 162-325 mg nguya-nguyain (maliban kung allergic o nagdurugo)',
      'Ang nitroglycerin ay kontraindikado kung SBP <100 mmHg o kung uminom ang pasyente ng PDE5 inhibitors',
      'Anaphylaxis: epinephrine IM (0.3-0.5 mg ng 1:1000) ang unang linya ng paggamot'
    ],
    assessorQuestions: [
      'Ilarawan ang FAST assessment para sa pagkilala sa stroke.',
      'Paano mo idinidiperensya ang hypoglycemia at hyperglycemia?',
      'Ano ang angkop na pamamahala para sa pinaghihinalaang acute myocardial infarction?',
      'Ano ang mga indikasyon at kontraindikasyon ng nitroglycerin?',
      'Ano ang unang linya ng paggamot para sa anaphylaxis?'
    ],
    memorizationTips: [
      'FAST = "Face, Arms, Speech, Time" — kumilos nang Mabilis kapag nakita mo ang mga palatandaan ng stroke',
      'Hypoglycemia: "TSCC" = Tremor, Sweating, Confusion, Consciousness changes (isipin "Too Sweet, Can\'t Concentrate")',
      'Hyperglycemia: "3 Polys" = Polyuria, Polydipsia, Polyphagia',
      'Cardiac pain: "CRUSH" = Central, Radiating, Uncomfortable, Sweating, Heavy'
    ],
    flashcards: [
      { front: 'Ano ang ibig sabihin ng FAST sa stroke assessment?', back: 'Face droop, Arm drift, Speech difficulty, Time (tandaan ang oras ng pagsisimula)' },
      { front: 'Ano ang tPA window para sa stroke?', back: '3-4.5 oras mula sa huling kilalang normal' },
      { front: 'Ano ang threshold ng blood glucose para sa hypoglycemia?', back: 'Baba sa 60 mg/dL' },
      { front: 'Ano ang unang linya ng paggamot para sa anaphylaxis?', back: 'Epinephrine 0.3-0.5 mg IM (1:1000 concentration)' },
      { front: 'Ano ang dose ng aspirin para sa pinaghihinalaang MI?', back: '162-325 mg nguya-nguyain' }
    ],
    miniQuiz: [
      { question: 'Ano ang ibig sabihin ng "T" sa FAST?', options: ['Treatment', 'Temperature', 'Time', 'Tremor'], correctAnswer: 2, explanation: 'Ang T ay nangangahulugang Time — kritikal na tandaan ang eksaktong oras ng pagsisimula ng sintomas o huling kilalang normal upang matukoy ang eligibility para sa tPA.' },
      { question: 'Ang isang walang malay na pasyenteng may blood glucose na 35 mg/dL ay dapat tumanggap ng:', options: ['Oral glucose', 'Wala sa bibig, magtatag ng IV access para sa dextrose', 'Insulin', 'Glucagon sa bibig'], correctAnswer: 1, explanation: 'Huwag kailanman magbigay ng anuman sa bibig sa walang malay na pasyente. Magtatag ng IV access at magbigay ng dextrose, o magbigay ng IM glucagon kung hindi magawang magtatag ng IV.' },
      { question: 'Ang nitroglycerin ay kontraindikado kapag:', options: ['Heart rate ay nasa itaas ng 100', 'Systolic BP ay nasa ibaba ng 100 mmHg', 'May sakit sa dibdib ang pasyente', 'Diabetic ang pasyente'], correctAnswer: 1, explanation: 'Ang nitroglycerin ay nagdudulot ng vasodilation at maaaring palalain ang hypotension. Ito ay kontraindikado kung ang systolic BP ay nasa ibaba ng 100 mmHg.' },
      { question: 'Ang dose ng epinephrine para sa anaphylaxis ay:', options: ['0.3-0.5 mg IV', '0.3-0.5 mg IM ng 1:1000', '1 mg IV push', '0.1 mg IM ng 1:10,000'], correctAnswer: 1, explanation: 'Ang anaphylaxis ay ginagamot ng epinephrine 0.3-0.5 mg IM gamit ang 1:1000 concentration.' },
      { question: 'Ang karaniwang MI chest pain ay inilarawan bilang:', options: ['Matindi, sumasaksak, lumalala sa paghinga', 'Nakakasaksak, umaabot sa kaliwang braso/baba', 'Nakakasunog pagkatapos kumain', 'Matindi, lumalala sa paggalaw'], correctAnswer: 1, explanation: 'Ang karaniwang MI pain ay inilarawan bilang isang nakakasaksak na presyon na maaaring umabot sa kaliwang braso, baba, o leeg, hindi tulad ng pleuritic o musculoskeletal na sakit.' }
    ]
  },

  'trauma-care': {
    title: 'Trauma Care',
    description: 'Pagsusuri at pamamahala ng mga traumatic na pinsala kabilang ang mekanismo ng pinsala, multi-system trauma care, spinal motion restriction, at mga tiyak na pattern ng pinsala.',
    reviewerNotes: 'Ang trauma management ay isang mataas na panganib na kakayahan na nangangailangan ng mabilis na pagsusuri at interbensyon. Susuriin ng TESDA NCII assessor ang iyong kakayahang makilala ang mga pattern ng mekanismo ng pinsala, magsagawa ng rapid trauma assessment, mag-prioritize ng mga interbensyon, at gumawa ng angkop na desisyon sa transport. Sa Pilipinas, kabilang sa mga karaniwang mekanismo ng trauma ang vehicular crashes (lalo na ang motorsiklo), pagkahulog, at karahasan. Ang pangunahing diin ay sa konsepto ng Golden Hour, damage control principles, at spinal motion restriction. Dapat mo maipakita ang kaalaman sa mga tiyak na pattern ng pinsala tulad ng flail chest, tension pneumothorax, at neurogenic shock.',
    procedures: [
      {
        title: 'Rapid Trauma Assessment',
        steps: [
          'Magsagawa ng scene size-up at tukuyin ang mechanism of injury',
          'Magsagawa ng primary survey (ABCDE) at gamutin ang mga banta sa buhay agad',
          'Ilapat ang cervical spine motion restriction para sa blunt trauma sa itaas ng mga clavicle',
          'Magsagawa ng mabilis na head-to-toe examination (2-3 minuto maximum)',
          'Tukuyin at i-prioritize ang mga pinsala: airway threats, massive hemorrhage, tension pneumothorax',
          'I-splint ang mga halatang fracture, kontrolin ang pagdurugo, tapatan ang mga sugat',
          'I-package ang pasyente para sa transport na may spinal precautions kung may indikasyon',
          'I-transport ang mga kritikal na trauma na pasyente sa pinakamalapit na angkop na pasilidad nang walang antala'
        ]
      },
      {
        title: 'Spinal Motion Restriction (SMR)',
        steps: [
          'Suriin ang mekanismo ng pinsala: pagkahulog >3 talampakan, MVC, diving injury, axial load',
          'Manually i-stabilize ang ulo at leeg sa neutral na posisyon',
          'Suriin ang mga indikador ng spinal injury: midline tenderness, neurologic deficit, altered LOC',
          'Ilapat ang cervical collar na angkop sa laki',
          'Log roll ang pasyente na may nakasabay na kilos ng koponan (minimum 3 rescuers)',
          'Ilagay ang pasyente sa long backboard o scoop stretcher',
          'I-secure ang pasyente ng straps: torso, pelvis, binti, at sa huli ay ulo',
          'I-reassess ang distal CSM pagkatapos ng immobilization'
        ]
      },
      {
        title: 'Pamamahala ng Chest Trauma',
        steps: [
          'Suriin ang mga nakamamatay na pinsala sa dibdib sa panahon ng primary survey',
          'Open pneumothorax: mag-apply ng three-sided occlusive dressing (mas mabuti ang vented chest seal)',
          'Tension pneumothorax: kilalanin (walang breath sounds, JVD, tracheal deviation, hypotension)',
          'Flail chest: i-stabilize ng manual pressure o unan, subaybayan ang underlying pulmonary contusion',
          'Massive hemothorax: maghanda para sa fluid resuscitation, mabilis na transport',
          'Cardiac tamponade: kilalanin ang Beck\'s triad (muffled heart sounds, JVD, hypotension)',
          'I-transport nang mabilis ang lahat ng may malaking chest trauma na pasyente — ang oras ay kritikal'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Mga Pattern ng Mechanism of Injury', description: 'Mga diagram na nagpapakita ng karaniwang MOI at inaasahang pattern ng pinsala: frontal MVC (dashboard injury — femur/pelvis), lateral MVC (compression sa dibdib/tiyan), pagkahulog mula sa taas (calcaneus/lumbar spine), motorcycle crash (lower extremity/deglowing). Bawat diagram ay nagpapakita ng mga vector ng paglilipat ng enerhiya.' },
      { title: 'Teknik ng Spinal Motion Restriction', description: 'Pagkakasunod-sunod na hakbang: (1) Manual in-line stabilization, (2) Pagsukat at pag-apply ng C-collar, (3) Log roll na may 3-taong koponan, (4) Pasyente sa backboard na may naka-immobilize na ulo. Bawat hakbang ay nagpapakita ng tamang pagposisyon ng kamay at body mechanics.' },
      { title: 'Mga Nakamamatay na Pinsala sa Dibdib', description: 'Cross-section ng dibdib na nagpapakita ng anim na agad na nakamamatay na pinsala: (1) Open pneumothorax, (2) Tension pneumothorax, (3) Massive hemothorax, (4) Flail chest, (5) Cardiac tamponade, (6) Tracheal/esophageal rupture. Bawat isa ay naka-label na may pangunahing palatandaan.' }
    ],
    keyPoints: [
      'Golden Hour: ang mga trauma na pasyente ay may pinakamahusay na kinalabasan kapag naabot ang definitive care sa loob ng 1 oras',
      'Ang mekanismo ng pinsala ay naghe-predict ng pattern ng pinsala — laging suriin ang eksena para sa mga pahiwatig ng MOI',
      'Ang spinal motion restriction ay ipinapakita para sa blunt trauma sa itaas ng mga clavicle na may nakababahalang MOI',
      'Tension pneumothorax: walang breath sounds + JVD + tracheal deviation + hypotension',
      'Open pneumothorax: mag-apply ng three-sided occlusive dressing o vented chest seal',
      'Flail chest: paradoxical na galaw ng chest wall — ang underlying pulmonary contusion ang tunay na panganib',
      'Damage control: limitahan ang oras sa eksena para sa kritikal na trauma, mga interbensyon sa daan'
    ],
    assessorQuestions: [
      'Ano ang Golden Hour at bakit ito mahalaga sa trauma management?',
      'Ilarawan ang mga indikasyon at pamamaraan ng spinal motion restriction.',
      'Ano ang anim na agad na nakamamatay na pinsala sa dibdib?',
      'Paano nag-gi-guide ang mechanism of injury sa iyong mga priyoridad sa assessment?',
      'Ano ang Beck\'s triad at anong kondisyon ito ay nagpapakita?'
    ],
    memorizationTips: [
      'Lethal 6 ng chest trauma: "ATOM-FC" = Airway obstruction, Tension pneumothorax, Open pneumothorax, Massive hemothorax, Flail chest, Cardiac tamponade',
      'Beck\'s triad: "3 D\'s" = Distant (muffled) heart sounds, Distended neck veins, Decreased BP',
      'Mga indikasyon ng SMR: "Any fall >3 feet, MVC, Diving, Axial load" = "FDA x3"',
      'Golden Hour = "60 minuto hanggang definitive care" — isipin "60 for survival"'
    ],
    flashcards: [
      { front: 'Ano ang Golden Hour sa trauma?', back: 'Ang konsepto na ang mga trauma na pasyente ay may pinakamahusay na kinalabasan kapag naabot ang definitive surgical care sa loob ng 1 oras mula sa pinsala' },
      { front: 'Ano ang mga palatandaan ng tension pneumothorax?', back: 'Walang breath sounds sa apektadong gilid, JVD, tracheal deviation (huling palatandaan), hypotension' },
      { front: 'Ano ang Beck\'s triad?', back: 'Muffled heart sounds, JVD, hypotension — nagpapakita ng cardiac tamponade' },
      { front: 'Paano pinamamahalaan ang open pneumothorax?', back: 'Mag-apply ng three-sided occlusive dressing o vented chest seal upang maiwasan ang pagpasok ng hangin' },
      { front: 'Ano ang tunay na panganib sa flail chest?', back: 'Ang underlying pulmonary contusion na nagdudulot ng hypoxia, hindi ang instability ng chest wall mismo' }
    ],
    miniQuiz: [
      { question: 'Ano ang pinakamahalagang indikador para sa spinal motion restriction?', options: ['Edad ng pasyente', 'Mekanismo ng pinsala sa itaas ng mga clavicle', 'Presensya ng sakit', 'Kagustuhan ng pasyente'], correctAnswer: 1, explanation: 'Ang mekanismo ng pinsala na may kaugnayan sa blunt trauma sa itaas ng mga clavicle ay pangunahing indikador para sa spinal motion restriction.' },
      { question: 'Ang Beck\'s triad ay nauugnay sa aling kondisyon?', options: ['Tension pneumothorax', 'Massive hemothorax', 'Cardiac tamponade', 'Flail chest'], correctAnswer: 2, explanation: 'Ang Beck\'s triad (muffled heart sounds, JVD, hypotension) ay ang klasikong pagpapakita ng cardiac tamponade.' },
      { question: 'Para sa open pneumothorax, ang inisyal na pamamahala ay:', options: ['Pag-insert ng chest tube', 'Three-sided occlusive dressing', 'Needle decompression', 'Intubation'], correctAnswer: 1, explanation: 'Mag-apply ng three-sided occlusive dressing (o vented chest seal) upang payagan ang paglabas ng hangin ngunit maiwasan ang pagpasok ng hangin sa pleural space.' },
      { question: 'Ano ang pangunahing alalahanin sa flail chest?', options: ['Deformity ng chest wall', 'Mga broken na tadyang', 'Underlying pulmonary contusion', 'Subcutaneous emphysema'], correctAnswer: 2, explanation: 'Habang ang instability ng chest wall ay nakikita, ang underlying pulmonary contusion na nagdudulot ng hypoxia ang pangunahing banta sa buhay.' },
      { question: 'Ang Golden Hour ay tumutukoy sa:', options: ['Oras na maabot ang eksena', 'Oras mula sa pinsala hanggang sa definitive surgical care', 'Oras para sa CPR', 'Oras para sa spinal assessment'], correctAnswer: 1, explanation: 'Ang konsepto ng Golden Hour ay nagbibigay-diin na ang mga trauma na pasyente ay may mas mahusay na kinalabasan kapag naabot nila ang definitive surgical care sa loob ng 1 oras mula sa pinsala.' }
    ]
  },

  'pharmacology': {
    title: 'Pharmacology',
    description: 'Mga prinsipyo ng pharmacology na may kaugnayan sa EMS kabilang ang mga karaniwang gamot sa prehospital setting, mga ruta ng pamamahagi, mga kalkulasyon ng dosis, at ang 5 Rights ng medication administration.',
    reviewerNotes: 'Ang pharmacology ay isang mahalagang kakayahang sinusuri sa TESDA NCII examination. Inaasahan ng assessor na maunawaan mo ang mga prinsipyo ng medication administration, ang 5 Rights, at angkop na paggamit ng mga karaniwang gamot na available sa antas ng EMS First Responder. Sa konteksto ng Pilipinas, ang mga gamot na maaaring i-administer ng EMS First Responder ay limitado at kinabibilangan ng oxygen, aspirin, oral glucose, at nitroglycerin (assisting with prescribed medication). Mahalagang maunawaan na ang bawat gamot ay may tiyak na indikasyon, kontraindikasyon, at mga posibleng side effect. Ang pagkakamali sa pagbibigay ng gamot ay maaaring magkaroon ng seryosong kahihinatnan, kaya ang pagiging maingat at pag obserba sa 5 Rights ay hindi-negotiable.',
    procedures: [
      {
        title: '5 Rights ng Medication Administration',
        steps: [
          'Right Patient — beripikahin ang pagkakakilanlan ng pasyente bago magbigay ng anumang gamot',
          'Right Medication — suriin ang label ng gamot nang dalawang beses, kumparahin sa order',
          'Right Dose — kalkulahin at beripikahin ang tamang dosis, suriin ang konsentrasyon at lagay',
          'Right Route — kumpirmahin ang tamang ruta ng pamamahagi (oral, sublingual, IM, IV, inhaled)',
          'Right Time — bigyan ang gamot sa tamang oras at tamang agwat ayon sa protokol',
          'Karagdagang pagsisiyasat: suriin ang expiry date, suriin para sa mga contraindication',
          'Idokumento ang lahat: pangalan ng gamot, dosis, ruta, oras ng pagbibigay, at reaksyon ng pasyente',
          'Subaybayan ang pasyente para sa mga therapeutic effect at adverse reaction pagkatapos magbigay'
        ]
      },
      {
        title: 'Mga Karaniwang Gamot sa EMS',
        steps: [
          'Oxygen: ang pinaka-karaniwang gamot na ibinibigay ng EMS; iba\'t ibang delivery device at flow rate',
          'Aspirin (ASA): 162-325 mg nguya-nguyain para sa suspected acute MI; kontraindikado kung allergic o may active bleeding',
          'Oral Glucose: 15-30 gramo para sa conscious hypoglycemic patient (<60 mg/dL)',
          'Nitroglycerin: tulungan ang pasyente sa prescribed NTG (sublingual/spray); suriin ang BP bago ibigay — kontraindikado kung SBP <100',
          'Epinephrine Auto-Injector: tulungan ang pasyente na may prescribed na EpiPen para sa anaphylaxis; 0.3 mg IM para sa matanda',
          'Activated Charcoal: isinasaalang-alang lamang kung may medical direction at sa loob ng 1 oras mula sa ingestion',
          'Bawat gamot ay may tiyak na indikasyon, kontraindikasyon, dosis, at ruta — dapat malaman ng provider',
          'Huwag kailanman magbigay ng gamot na lampas sa iyong scope of practice'
        ]
      },
      {
        title: 'Medication Administration Procedures',
        steps: [
          'Kunin ang medical direction/order kung kinakailangan (on-line o off-line medical direction)',
          'Suriin ang 5 Rights bago magbigay ng anumang gamot',
          'Ipaalam sa pasyente ang gamot na ibibigay, ang dahilan, at mga posibleng epekto',
          'Sublingual na gamot: ilagay sa ilalim ng dila, huwag paghaluin o lunukin agad',
          'Oral na gamot: bigyan ng tubig kung naaangkop, siguraduhing makalunok ang pasyente',
          'Inhaled na gamot (tulad ng bronchodilator): pamamahalaan gamit ang metered-dose inhaler na may spacer kung available',
          'Auto-injector: pindutin sa lateral thigh, hawigan ng 10 segundo, massage ang site',
          'Idokumento ang pangalan ng gamot, dosis, ruta, oras, at reaksyon ng pasyente sa bawat pagbibigay'
        ]
      }
    ],
    visualIllustrations: [
      { title: '5 Rights ng Medication Administration', description: 'Limang magkakaugnay na icon na nagpapakita ng 5 Rights: (1) Right Patient (check ID), (2) Right Medication (check label), (3) Right Dose (check amount), (4) Right Route (check method), (5) Right Time (check schedule). Bawat icon ay may checkmark na nagpapakita ng verification step.' },
      { title: 'Mga Karaniwang Gamot sa EMS at Kanilang Indikasyon', description: 'Isang talahanayan na nagpapakita ng mga karaniwang gamot sa EMS: Oxygen (hypoxia, cardiac, trauma), Aspirin (suspected MI), Oral Glucose (hypoglycemia), Nitroglycerin (chest pain), Epinephrine (anaphylaxis). Bawat gamot ay may dose, route, at mga pangunahing contraindication.' },
      { title: 'Route ng Pamamahagi ng Gamot', description: 'Mga diagram na nagpapakita ng iba\'t ibang ruta: Oral (bibig), Sublingual (sa ilalim ng dila), Inhaled (sa baga), IM (intramuscular — lateral thigh para sa auto-injector), IV (intravenous — para sa advanced providers). Bawat ruta ay may label na may onset of action at mga halimbawa ng gamot.' }
    ],
    keyPoints: [
      '5 Rights: Right Patient, Right Medication, Right Dose, Right Route, Right Time',
      'Oxygen ay ang pinakakaraniwang gamot sa EMS — alamin ang bawat delivery device at flow rate',
      'Aspirin para sa MI: 162-325 mg nguya-nguyain; kontraindikado kung allergic o may active bleeding',
      'Nitroglycerin: suriin ang BP bago ibigay — kontraindikado kung SBP <100 mmHg o may PDE5 inhibitor use',
      'Oral Glucose: para sa CONSCIOUS hypoglycemic patient lamang — huwag ibigay sa walang malay',
      'Epinephrine auto-injector: 0.3 mg IM para sa matanda; 0.15 mg para sa bata',
      'Huwag kailanman magbigay ng gamot na lampas sa iyong scope of practice o walang medical direction'
    ],
    assessorQuestions: [
      'Ano ang 5 Rights ng medication administration at bakit mahalaga ang bawat isa?',
      'Ano ang mga karaniwang gamot na maaaring i-administer ng EMS First Responder?',
      'Ano ang mga kontraindikasyon ng aspirin at nitroglycerin?',
      'Paano mo pinamamahalaan ang isang pasyenteng may prescribed na EpiPen para sa anaphylaxis?',
      'Bakit mahalagang suriin ang blood pressure bago magbigay ng nitroglycerin?'
    ],
    memorizationTips: [
      '5 Rights: "PMDRT" = Patient, Medication, Dose, Route, Time — "Please Make Darn Right Treatment"',
      'EMS drugs: "O-ANG-NE" = Oxygen, Aspirin, Nitroglycerin, Glucose, Epinephrine',
      'Nitro check: "BP bago NTG" — kung SBP <100, HUWAG ibigay',
      'Aspirin dose: "162-325" = "One-six-two to Three-two-five" — nguya-nguyain, huwag lunukin buo'
    ],
    flashcards: [
      { front: 'Ano ang 5 Rights ng medication administration?', back: 'Right Patient, Right Medication, Right Dose, Right Route, Right Time' },
      { front: 'Ano ang dose ng aspirin para sa suspected MI?', back: '162-325 mg nguya-nguyain' },
      { front: 'Bago magbigay ng nitroglycerin, ano ang dapat suriin?', back: 'Blood pressure — kontraindikado kung systolic BP <100 mmHg' },
      { front: 'Sino ang maaaring bigyan ng oral glucose?', back: 'Mga conscious na pasyenteng may hypoglycemia lamang (<60 mg/dL)' },
      { front: 'Ano ang dose ng epinephrine sa auto-injector para sa matanda?', back: '0.3 mg IM (1:1000 concentration)' }
    ],
    miniQuiz: [
      { question: 'Ano ang UNANG dapat suriin sa 5 Rights ng medication administration?', options: ['Right Dose', 'Right Patient', 'Right Route', 'Right Time'], correctAnswer: 1, explanation: 'Ang Right Patient ay ang unang hakbang — dapat beripikahin ang pagkakakilanlan ng pasyente bago magbigay ng anumang gamot upang maiwasan ang error.' },
      { question: 'Ang aspirin para sa suspected MI ay dapat:', options: ['Lunukin buo', 'Nguya-nguyain', 'Ilagay sa ilalim ng dila', 'I-crush at ihalo sa tubig'], correctAnswer: 1, explanation: 'Ang aspirin para sa suspected MI ay dapat nguya-nguyain para sa mas mabilis na pagsisipsip, hindi lunukin buo.' },
      { question: 'Kailan HUWAG magbigay ng nitroglycerin?', options: ['Kung ang pasyente ay may sakit sa dibdib', 'Kung ang systolic BP ay nasa ibaba ng 100 mmHg', 'Kung ang pasyente ay matanda', 'Kung may order ang doktor'], correctAnswer: 1, explanation: 'Ang nitroglycerin ay nagdudulot ng vasodilation at maaaring magdulot ng mapanganib na hypotension kung ang SBP ay <100 mmHg.' },
      { question: 'Ang oral glucose ay ibinibigay para sa:', options: ['Hyperglycemia', 'Conscious hypoglycemic patient', 'Walang malay na pasyente', 'Mataas na presyon ng dugo'], correctAnswer: 1, explanation: 'Ang oral glucose ay ibinibigay lamang sa conscious na pasyenteng may hypoglycemia. Huwag kailanman magbigay ng anuman sa bibig sa walang malay na pasyente.' },
      { question: 'Ang epinephrine auto-injector para sa anaphylaxis ay inilalagay sa:', options: ['Braso', 'Tiyan', 'Lateral thigh', 'Dibdib'], correctAnswer: 2, explanation: 'Ang epinephrine auto-injector ay inilalagay sa lateral thigh (panlabas na bahagi ng hita) para sa intramuscular injection na may mabilis na pagsisipsip.' }
    ]
  },

  'ambulance-operations': {
    title: 'Ambulance Operations',
    description: 'Ligtas na operasyon ng ambulansya, paghahanda ng sasakyan, pamamahala ng kagamitan, mga protokol sa komunikasyon, at mga pamamaraan sa transport ng pasyente sa sistema ng EMS sa Pilipinas.',
    reviewerNotes: 'Ang ambulance operations ay isang kritikal na operational na kakayahang sumasaklaw sa operasyon ng sasakyan, pamamahala ng kagamitan, at mga pamamaraan sa transport. Susuriin ng TESDA NCII assessor ang iyong kaalaman sa kaligtasan ng ambulansya, pre-trip inspections, tamang paggamit ng warning devices (lights at sirens), pag-load at pag-secure ng pasyente, at komunikasyon sa dispatch at receiving facilities. Sa konteksto ng Pilipinas, ang mga operasyon ng ambulansya ay dapat isaalang-alang ang kondisyon ng trapiko, pagkakaiba-iba ng kalidad ng kalsada (lalo na sa rural na lugar), at ang mga pamantayan ng DOH para sa specification ng ambulansya. Ang pag-unawa kung kailan gumamit ng lights at sirens (emergent vs non-emergent transport), tamang defensive driving techniques, at infection control measures sa loob ng ambulansya ay lahat sinusuri. Ang proseso ng paggawa ng desisyon na "load and go" laban sa "stay and play" ay mahalaga rin.',
    procedures: [
      {
        title: 'Pre-Trip Inspection ng Ambulansya',
        steps: [
          'Suriin ang panlabas ng sasakyan: pressure at kondisyon ng gulong, pinsala sa katawan, fluid leaks',
          'Beripikahin ang fuel level (panatilihin ng hindi bababa sa ¾ na tangke sa lahat ng oras)',
          'Suriin ang engine compartment: langis, coolant, brake fluid, belts, hoses',
          'Subukan ang lahat ng warning devices: lights, sirens, horn, backup alarm',
          'Suriin ang patient compartment: function ng stretcher, oxygen supply, suction unit',
          'Beripikahin na lahat ng kinakailangang kagamitan ay naroroon at gumagana ayon sa DOH checklist',
          'Suriin ang communication equipment: two-way radio, mobile phone, GPS',
          'Idokumento ang mga natuklasan ng inspection sa daily vehicle checklist',
          'Iulat agad ang anumang kakulangan at huwag paandarin ang hindi ligtas na sasakyan'
        ]
      },
      {
        title: 'Pag-load at Transport ng Pasyente',
        steps: [
          'Iposisyon ang ambulansya para sa pinaka-optimal na loading at pag-alis',
          'Siguraduhing nasa tamang taas at naka-lock ang stretcher',
          'Sa minimum na dalawang rescuer, i-angat ang pasyente gamit ang tamang body mechanics',
          'I-load ang stretcher sa ambulansya at i-engage ang lahat ng locking mechanisms',
          'I-secure ang pasyente ng lahat ng stretcher straps (minimum: dibdib, baywang, tuhod)',
          'I-secure ang lahat ng malalayang kagamitan at siguraduhing walang maaaring maging projectile',
          'Kumpirmahin sa koponan: pasyente secured, kagamitan secured, pinto nakasara',
          'Tukuyin ang mode ng transport: emergent (lights at sirens) o non-emergent',
          'Ipaalam sa receiving facility ang radio report kabilang ang ETA'
        ]
      },
      {
        title: 'Radio Communication Protocol',
        steps: [
          'Makinig bago mag-transmit upang maiwasan ang pag-abala sa iba pang komunikasyon',
          'Kilalanin ang iyong unit: "Base, ito ay Ambulansya [numero]"',
          'Panatilihin ang mga transmission na malinaw, maikli, at propesyonal',
          'Gumamit ng standard medical terminology at approved na abbreviations',
          'Isama sa patient report: unit ID, edad/sex ng pasyente, pangunahing reklamo, vital signs, treatment na ibinigay, ETA',
          'Gumamit ng echo-back method para kumpirmahin ang natanggap na mga instruksyon',
          'Tapusin ang transmission gamit ang iyong unit identifier: "Ambulansya [numero], clear"'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Layout ng Kagamitan sa Ambulansya', description: 'Top-down na diagram ng standard na patient compartment ng ambulansya na nagpapakita ng: primary stretcher (gitna), squad bench (kaliwa), airway cabinet (itaas ng ulo), oxygen at suction (sa likod ng ulo), medication at supply cabinets (kanang gilid), at exterior compartments. Bawat lugar ay naka-label ng nilalaman nito.' },
      { title: 'Pagkakasunod-sunod ng Stretcher Loading', description: 'Apat na panel na nagpapakita ng: (1) Stretcher sa loading height na may naka-secure na pasyente, (2) Pag-angat ng dalawang rescuer na may tamang body mechanics, (3) Stretcher na pumasok sa ambulansya, (4) Stretcher na naka-lock sa floor mount na may lahat ng straps na naka-secure. Ang mga safety check ay naka-highlight sa bawat hakbang.' },
      { title: 'Daloy ng Radio Communication', description: 'Flowchart na nagpapakita ng tamang radio communication: Makinig → Kilalanin ang Unit → I-transmit ang Mensahe → Maghintay ng Acknowledgment → Kumpirmahin gamit ang Echo-back → Clear. Ang mga karaniwang error (pag-abala, walang identification, mahabang transmission) ay ipinapakita sa pula.' }
    ],
    keyPoints: [
      'Panatilihin ang fuel ng ambulansya ng hindi bababa sa ¾ na tangke sa lahat ng oras',
      'Ang pre-trip inspections ay dapat nadodokumento araw-araw bago magsimula ang shift',
      'Gumamit ng lights at sirens lamang para sa emergent transport — dinadagdagan nito ang panganib ng aksidente ng 3x',
      'I-secure ang pasyente ng minimum tatlong straps: dibdib, baywang, at tuhod',
      'Lahat ng malalayang kagamitan ay dapat i-secure upang hindi maging projectile sa biglaang paghinto',
      'Ang radio report ay dapat kabilangan ng: unit ID, impormasyon ng pasyente, vital signs, treatment, ETA',
      'Ang defensive driving ay laging kailangan — kahit may lights at sirens, ang ambulansya ay WALANG absolute right of way'
    ],
    assessorQuestions: [
      'Ano ang mga bahagi ng araw-araw na pre-trip inspection ng ambulansya?',
      'Kailan dapat gamitin ang lights at sirens sa panahon ng transport?',
      'Ilarawan ang tamang pamamaraan ng pag-load ng pasyente sa ambulansya.',
      'Anong impormasyon ang dapat kasama sa radio report sa receiving facility?',
      'Anong mga pag-iingat sa kaligtasan ang dapat obserbahan kapag nag-o-operate ng ambulansya na may lights at sirens?'
    ],
    memorizationTips: [
      'Pre-trip inspection: "FLOW-BERT" = Fluids, Lights, Oxygen, Warning devices, Body, Equipment, Radio, Tires',
      'Pag-secure ng pasyente: "DBT" = Dibdib, Baywang, Tuhod — minimum tatlong straps',
      'Radio report: "PVT-TE" = Patient info, Vital signs, Treatment given, Transport mode, ETA',
      'Panganib ng lights at sirens: "3x danger" — dinadagdagan nito ng tatlong beses ang panganib ng aksidente'
    ],
    flashcards: [
      { front: 'Ano ang minimum na fuel level na dapat panatilihin ng ambulansya?', back: '¾ na tangke sa lahat ng oras' },
      { front: 'Ilang straps ang minimum para i-secure ang pasyente sa stretcher?', back: 'Tatlo: dibdib, baywang, at tuhod' },
      { front: 'Ang paggamit ng lights at sirens ay nagdaragdag ng panganib ng aksidente ng humigit-kumulang:', back: '3 beses (300%)' },
      { front: 'Ano ang dapat kasama sa radio report?', back: 'Unit ID, edad/sex ng pasyente, pangunahing reklamo, vital signs, treatment, ETA' },
      { front: 'Ano ang dapat gawin sa mga malalayang kagamitan bago mag-transport?', back: 'I-secure ang lahat ng malalayang kagamitan upang hindi maging projectile sa biglaang paghinto' }
    ],
    miniQuiz: [
      { question: 'Ano ang minimum na katanggap-tanggap na fuel level para sa ambulansya sa simula ng shift?', options: ['¼ na tangke', '½ na tangke', '¾ na tangke', 'Puno na tangke'], correctAnswer: 2, explanation: 'Ang mga ambulansya ay dapat panatilihin ng hindi bababa sa ¾ na tangke ng fuel sa lahat ng oras upang masiguro ang kahandaan para sa mahabang distansya o maraming tawag.' },
      { question: 'Ang paggamit ng lights at sirens ay nagdaragdag ng panganib ng ambulance crash ng humigit-kumulang:', options: ['50%', '100%', '200%', '500%'], correctAnswer: 2, explanation: 'Ipinapakita ng mga pag-aaral na ang paggamit ng lights at sirens ay nagdaragdag ng panganib ng crash ng humigit-kumulang 3 beses (200% increase).' },
      { question: 'Ilang straps ang minimum para i-secure ang pasyente sa stretcher?', options: ['Isa', 'Dalawa', 'Tatlo', 'Apat'], correctAnswer: 2, explanation: 'Sa minimum, tatlong straps ang dapat i-secure sa pasyente: dibdib, baywang, at tuhod.' },
      { question: 'Ano ang UNANG dapat gawin bago mag-transmit sa radio?', options: ['Magsalita nang malakas', 'Kilalanin ang iyong unit', 'Makinig para sa malinaw na channel', 'Ibigay ang patient report'], correctAnswer: 2, explanation: 'Laging makinig muna upang masiguro na ang channel ay malaya bago mag-transmit upang maiwasan ang pag-abala sa iba pang komunikasyon.' },
      { question: 'Sino ang may absolute right of way kapag papalapit ang ambulansya na may lights at sirens?', options: ['Ang ambulansya laging', 'Ang ambulansya ay walang absolute right of way', 'Sa intersections lamang', 'Sa highways lamang'], correctAnswer: 1, explanation: 'Ang ambulansya na may lights at sirens ay WALANG absolute right of way. Ang defensive driving ay laging kailangan, at ang operator ng ambulansya ay dapat masiguro na ang iba pang sasakyan ay nagbigay na ng daan bago sumulong.' }
    ]
  },

  'communication': {
    title: 'Communication & Documentation',
    description: 'Mga prinsipyo at kasanayan sa epektibong komunikasyon, radio protocols, verbal reporting, at tamang dokumentasyon gamit ang standardized na format sa prehospital setting ng EMS.',
    reviewerNotes: 'Ang komunikasyon at dokumentasyon ay kritikal na kakayahang madalas hindi nabibigyan ng sapat na pansin ngunit mahalaga sa safe at epektibong EMS practice. Susuriin ng TESDA NCII assessor ang iyong kakayahang makipagkomunikaton nang malinaw at maikli gamit ang standardized na format, magsagawa ng tamang radio communication, magbigay ng epektibong verbal report sa receiving facility, at gumawa ng komprehensibo at tumpak na dokumentasyon. Sa konteksto ng Pilipinas, ang komunikasyon ay maaaring mahirap dahil sa mga hadlang sa wika (iba\'t ibang diyalekto), limitadong radio coverage sa rural na lugar, at mataas na bilang ng pasyente. Ang Patient Care Report (PCR) ay isang legal na dokumento, at ang gintong patakaran ay: "Kung hindi nadokumento, hindi ginawa." Ang SBAR format (Situation, Background, Assessment, Recommendation) at SOAP documentation ay mga pangunahing tool na dapat masterin.',
    procedures: [
      {
        title: 'SBAR Communication Format',
        steps: [
          'Situation — Ipahayag ang iyong pangalan, titulo, at ang kasalukuyang sitwasyon ng pasyente nang maikli',
          'Background — Ibigay ang may-katuturang medikal na background: chief complaint, SAMPLE history, mga nakaraang intervensyon',
          'Assessment — Ibigay ang iyong klinikal na pagtatasa: vital signs, physical exam findings, bilang ng gravity ng kondisyon',
          'Recommendation — Sabihin kung anong mga aksyon ang iniirerekomenda o hinihingi: orders, receiving area, special preparations',
          'Maghintay ng confirmation at mag-apply ng echo-back para sa mga order na natanggap',
          'Idokumento ang oras, pangalan ng tumatanggap, at buong laman ng komunikasyon'
        ]
      },
      {
        title: 'Verbal Report sa Receiving Facility',
        steps: [
          'Kilalanin ang iyong sarili at ang iyong unit',
          'Ibigay ang edad at kasarian ng pasyente',
          'Ilarawan ang chief complaint at kasalukuyang kondisyon',
          'Ibigay ang vital signs at mga significant na pagbabago',
          'Ilarawan ang mga interbensyong ginawa at reaksyon ng pasyente',
          'Ibigay ang ETA at anumang mga espesyal na kahilingan (trauma team, isolation, etc.)',
          'Tanungin kung may mga order o espesyal na paghahanda na kailangan',
          'Kumpirmahin ang acceptance at particular na area ng pagtanggap'
        ]
      },
      {
        title: 'Pagsulat ng Patient Care Report (PCR)',
        steps: [
          'Isulat ang demographic data ng pasyente at impormasyon ng incident',
          'Idokumento ang scene size-up at mga natuklasan sa kaligtasan',
          'I-record ang primary survey findings gamit ang ABCDE format',
          'Idokumento ang SAMPLE history at OPQRST findings',
          'I-record ang lahat ng vital signs na may timestamps',
          'Idokumento ang lahat ng interbensyon na ginawa, oras, at reaksyon ng pasyente',
          'Isulat ang final assessment at clinical impression',
          'Idokumento ang turnover information at receiving provider',
          'Gamitin ang SOAP format para sa organisasyon: Subjective, Objective, Assessment, Plan',
          'Beripikahin ang pagkakumpleto at katumpakan bago isumite — ang PCR ay legal na dokumento'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'SBAR Communication Framework', description: 'Apat na kolor-code na box na nagpapakita ng SBAR: Situation (berde — kasalukuyang sitwasyon), Background (asul — medikal na konteksto), Assessment (dilaw — klinikal na pagtatasa), Recommendation (pula — mga aksyong hinihingi). Arrows ang nagpapakita ng daloy ng impormasyon mula sa field papunta sa receiving facility.' },
      { title: 'Verbal Report Flow', description: 'Sequential na flowchart ng verbal report: Unit ID → Patient Demographics → Chief Complaint → Vital Signs → Interventions → ETA → Special Requests. Bawat hakbang ay may halimbawa ng tamang phrasing at karaniwang mga pagkakamali na dapat iwasan.' },
      { title: 'SOAP Documentation Format', description: 'Apat na seksyon na nagpapakita ng SOAP format: Subjective (mga sinabi ng pasyente, chief complaint sa sariling salita), Objective (vital signs, physical exam findings, measurable data), Assessment (clinical impression, severity), Plan (mga interbensyon, transport decision, follow-up). Bawat seksyon ay may halimbawa ng tamang dokumentasyon.' }
    ],
    keyPoints: [
      'SBAR = Situation, Background, Assessment, Recommendation — standardized na format ng komunikasyon',
      'Ang PCR ay isang legal na dokumento — "Kung hindi nadokumento, hindi ginawa"',
      'Ang SOAP format: Subjective, Objective, Assessment, Plan — organizational tool para sa dokumentasyon',
      'Laging makinig muna bago mag-transmit sa radio — iwasan ang pag-abala sa iba pang komunikasyon',
      'Ang verbal report ay dapat maikli ngunit kumpleto: ID → demographics → complaint → vitals → treatment → ETA',
      'Ang echo-back method ay nagsisiguro na ang mga order at instruksyon ay tama natanggap',
      'Idokumento ang lahat ng komunikasyon kabilang ang oras, pangalan ng kausap, at laman ng usapan'
    ],
    assessorQuestions: [
      'Ano ang SBAR format at paano ito ginagamit sa EMS komunikasyon?',
      'Anong impormasyon ang dapat kasama sa verbal report sa receiving facility?',
      'Bakit mahalaga ang Patient Care Report at ano ang mga kinakailangan nito?',
      'Ano ang SOAP documentation format at paano ito nakakatulong sa organisasyon ng dokumentasyon?',
      'Ano ang echo-back method at bakit ito mahalaga sa radio komunikasyon?'
    ],
    memorizationTips: [
      'SBAR = "S-Bar" = Situation, Background, Assessment, Recommendation — isipin "I-step on the S-Bar to communicate"',
      'Verbal report: "ID-Dem-Comp-VS-Tx-ETA" = ID, Demographics, Complaint, Vital Signs, Treatment, ETA',
      'SOAP = "Subjective=Sinabi, Objective=Sukat, Assessment=Palagay, Plan=Plano"',
      'PCR golden rule: "Kung hindi nadokumento, hindi ginawa" — laging dokumentuhin nang maayos'
    ],
    flashcards: [
      { front: 'Ano ang ibig sabihin ng SBAR?', back: 'Situation, Background, Assessment, Recommendation' },
      { front: 'Ano ang gintong patakaran ng dokumentasyon?', back: '"Kung hindi nadokumento, hindi ginawa"' },
      { front: 'Ano ang SOAP format?', back: 'Subjective, Objective, Assessment, Plan' },
      { front: 'Ano ang echo-back method?', back: 'Ang pag-uulit ng natanggap na instruksyon upang kumpirmahin ang katumpakan bago ipatupad' },
      { front: 'Ano ang kinakailangan sa verbal report?', back: 'Unit ID, demographics ng pasyente, chief complaint, vital signs, treatment na ibinigay, ETA, espesyal na kahilingan' }
    ],
    miniQuiz: [
      { question: 'Ano ang unang letra ng SBAR na nangangahulugang "Situation"?', options: ['Standby', 'Situation', 'Standard', 'Status'], correctAnswer: 1, explanation: 'Ang "S" sa SBAR ay nangangahulugang Situation — ang kasalukuyang sitwasyon ng pasyente na dapat ipahayag nang maikli at malinaw.' },
      { question: 'Ang PCR (Patient Care Report) ay itinuturing bilang:', options: ['Impormal na tala', 'Legal na dokumento', 'Opsyonal na record', 'Personal na talaarawan'], correctAnswer: 1, explanation: 'Ang PCR ay isang legal na dokumento na maaaring gamitin sa korte. Dapat itong tumpak, kumpleto, at isinulat nang propesyonal.' },
      { question: 'Sa SOAP format, ang "Objective" ay kabilangan ng:', options: ['Mga reklamo ng pasyente', 'Vital signs at physical exam findings', 'Clinical impression', 'Plano ng paggamot'], correctAnswer: 1, explanation: 'Ang Objective section ay naglalaman ng measurable na data tulad ng vital signs, physical exam findings, at iba pang masusukat na impormasyon.' },
      { question: 'Bago mag-transmit sa radio, dapat mong:', options: ['Magsalita nang malakas agad', 'Makinig muna para sa clear channel', 'Ibigay agad ang report', 'Tumawag sa mobile phone'], correctAnswer: 1, explanation: 'Laging makinig muna upang masiguro na ang channel ay malaya bago mag-transmit at maiwasan ang pag-abala sa iba pang mahahalagang komunikasyon.' },
      { question: 'Ano ang "R" sa SBAR?', options: ['Report', 'Response', 'Recommendation', 'Record'], correctAnswer: 2, explanation: 'Ang "R" sa SBAR ay nangangahulugang Recommendation — ang mga aksyong iniirerekomenda o hinihingi mula sa receiving provider o medical direction.' }
    ]
  },

  'medical-ethics': {
    title: 'Medical Ethics & Legal Issues',
    description: 'Mga prinsipyo ng medikal na etika, legal na responsibilidad ng EMS provider, patient consent, confidentiality, at mga batas na nauugnay sa prehospital care sa Pilipinas.',
    reviewerNotes: 'Ang medical ethics at legal issues ay mahalagang bahagi ng TESDA NCII pagsusulit na madalas na binabalewala ng mga kandidato. Susuriin ng assessor ang iyong kaalaman sa mga batas na nagbibigay-proteksyon sa pasyente at sa responder, kabilang ang RA 11058 (OSH Law), RA 8344 (Anti-Hospital Deposit Law), at DOH Administrative Orders. Mahalagang maunawaan ang informed consent, implied consent sa emergency, patient confidentiality, at ang legal na obligasyon sa pagdokumento ng pangangalaga. Sa Pilipinas, ang mga isyung etikal ay madalas na lumilitaw dahil sa limitadong resources, kultura ng "utang na loob," at kakulangan ng malinaw na protocols sa ilang lugar. Ang moral at legal na obligations ay maaaring magkabaliktad sa ilang sitwasyon, kaya ang kritikal na pag-iisip ay mahalaga.',
    procedures: [
      {
        title: 'Pagkuha ng Consent sa Prehospital Setting',
        steps: [
          'Informed Consent: ipaliwanag ang procedura, mga panganib, at benepisyo sa pasyente bago gumawa ng interbensyon',
          'Implied Consent: pinapalagay sa emergency na ang walang malay na pasyente ay nagpapahintulot sa life-saving na pangangalaga',
          'Minor Consent: kailangan ang consent ng magulang o legal na guardian, maliban sa emergency na nagbabanta sa buhay',
          'Refusal of Care: igalang ang karapatan ng may kakayahang pasyente na tumanggi, ngunit idokumento nang mabuti',
          'Gumamit ng Against Medical Advice (AMA) form kung tumanggi ang pasyente, at kumuha ng saksi',
          'Kung tumanggi ang menor de edad na walang guardian, maghanap ng emergency court order kung nagbabanta sa buhay',
          'Idokumento ang lahat ng pagtanggi: dahilan ng pasyente, binigyan ng impormasyon, at mga saksi'
        ]
      },
      {
        title: 'Pamamahala ng Confidentiality at Documentation',
        steps: [
          'Panatilihin ang confidentiality ng lahat ng impormasyon ng pasyente batay sa Data Privacy Act (RA 10173)',
          'Huwag ibahagi ang medikal na impormasyon nang walang pahintulot ng pasyente, maliban sa mga legal na exemptions',
          'Magsagawa ng tamang dokumentasyon: oras, petsa, interbensyon, pagtanggi, at reaksyon ng pasyente',
          'Gumamit ng objective na wika sa dokumentasyon — iwasan ang mga opinyon o judgemental na salita',
          'I-record ang mga pagbabago sa kalagayan ng pasyente at ang mga hakbang na ginawa sa bawat pagbabago',
          'Siguraduhin ang secure na pag-iimbak ng mga tala ng pasyente upang maiwasan ang unauthorized access',
          'I-follow ang HIPAA-equivalent na mga prinsipyo sa pag-share ng impormasyon sa receiving facility'
        ]
      },
      {
        title: 'Pamamahala ng Ethical Dilemmas sa Field',
        steps: [
          'Kilalanin ang ethical dilemma: kapag ang dalawang moral na obligasyon ay nagkakasalungatan',
          'Gamitin ang four-box method: medical indications, patient preferences, quality of life, contextual features',
          'Konsultahin ang medical director o supervisor sa mga kumplikadong sitwasyon',
          'Prayoridad: ang benepisyo sa pasyente (beneficence) at ang pag-iwas sa pinsala (non-maleficence)',
          'Igalang ang autonomy ng pasyente kahit hindi sumasang-ayon ang responder sa desisyon',
          'Idokumento ang proseso ng paggawa ng desisyon kabilang ang mga konsultasyon na ginawa',
          'Humingi ng debriefing pagkatapos ng mga nakakabagabag na kaganapan upang mapanatili ang mental health'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Hierarchy ng Consent sa Emergency', description: 'Flowchart na nagpapakita ng hierarchy: (1) Informed consent — may kakayahang pasyente na nagbibigay ng pahintulot, (2) Implied consent — walang malay na pasyente sa emergency, (3) Parental/guardian consent — para sa menor de edad, (4) Court order — kapag walang magulang/guardian at hindi emergency, (5) Emergency doctrine — life-threatening na sitwasyon sa menor de edad na walang guardian.' },
      { title: 'Four Principles of Medical Ethics', description: 'Apat na magkakaugnay na bilog: (1) Autonomy — paggalang sa desisyon ng pasyente, (2) Beneficence — paggawa ng mabuti para sa pasyente, (3) Non-maleficence — pag-iwas sa pinsala, (4) Justice — patas na pamamahagi ng resources. Sa gitna ay ang pasyente, na pinag-iikutan ng lahat ng prinsipyo.' },
      { title: 'Legal Framework para sa EMS sa Pilipinas', description: 'Hierarchical diagram ng mga batas: (1) 1987 Constitution — karapatan sa kalusugan, (2) RA 11058 — OSH Law, (3) RA 8344 — Anti-Hospital Deposit Law, (4) RA 10173 — Data Privacy Act, (5) DOH Administrative Orders, (6) TESDA Training Regulations, (7) Local government ordinances. Bawat layer ay sumasaklaw sa mas mababang antas.' }
    ],
    keyPoints: [
      'Informed consent: kailangan bago ang anumang procedura sa may kakayahang pasyente',
      'Implied consent: automatic sa life-threatening emergency sa walang malay na pasyente',
      'RA 11058 (OSH Law): nagbibigay-proteksyon sa workers right na mag-refuse ng hazardous work',
      'RA 8344: bawal mag-demand ng deposit bago magamot ang emergency na pasyente',
      'Patient autonomy: karapatan ng pasyente na tumanggi sa pangangalaga kahit ito ay makakaligtas sa buhay',
      'Confidentiality: panatilihin ang privacy ng impormasyon ng pasyente batay sa RA 10173',
      'Documentation: ang hindi naidokumento ay hindi nagawa — kumpletuhin ang lahat ng tala'
    ],
    assessorQuestions: [
      'Ano ang pagkakaiba sa pagitan ng informed consent at implied consent?',
      'Paano mo hahandle ang sitwasyon kung tumanggi ang isang may kakayahang pasyente sa life-saving na pangangalaga?',
      'Ano ang mga batas na nagbibigay-proteksyon sa EMS provider sa Pilipinas?',
      'Ipaliwanag ang four principles of medical ethics at paano ito nalalapat sa prehospital care.',
      'Ano ang dapat mong gawin kung nakasaksi ka sa unethical na pag-uugali ng kasamahan?'
    ],
    memorizationTips: [
      'Four Principles: "ABNJ" = Autonomy, Beneficence, Non-maleficence, Justice',
      'Consent types: "I3" = Informed, Implied, Emergency',
      'Key laws: "11058-8344-10173" = OSH Law, Anti-Deposit, Data Privacy',
      'Documentation rule: "Kung hindi naisulat, hindi nangyari" — palaging idokumento ang lahat'
    ],
    flashcards: [
      { front: 'Ano ang implied consent?', back: 'Ang legal na palagay na ang walang malay na pasyente sa emergency ay nagpapahintulot sa life-saving na pangangalaga' },
      { front: 'Ano ang RA 8344?', back: 'Anti-Hospital Deposit Law — bawal mag-demand ng deposit o advance payment bago magamot ang emergency na pasyente' },
      { front: 'Ano ang apat na prinsipyo ng medical ethics?', back: 'Autonomy, Beneficence, Non-maleficence, Justice' },
      { front: 'Ano ang dapat gawin kung tumanggi ang pasyente sa pangangalaga?', back: 'Igalang ang desisyon, ipaliwanag ang mga panganib, ipirma ang AMA form, kumuha ng saksi, at idokumento nang kumpleto' },
      { front: 'Ano ang RA 10173?', back: 'Data Privacy Act — nagpoprotekta sa personal na impormasyon ng pasyente at nagtatakda ng mga panuntunan sa pag-handle ng data' }
    ],
    miniQuiz: [
      { question: 'Aling batas ang nagbibigay-proteksyon sa workers na mag-refuse sa hazardous work?', options: ['RA 8344', 'RA 10173', 'RA 11058', 'RA 6715'], correctAnswer: 2, explanation: 'Ang RA 11058 o OSH Law ay nagbibigay sa workers ng karapatang mag-refuse sa trabahong mapanganib nang walang takot sa pagkawala ng trabaho.' },
      { question: 'Kapag ang isang may kakayahang pasyente ay tumanggi sa pangangalaga, ang responder ay dapat:', options: ['Pilitin ang pasyente na tanggapin ang pangangalaga', 'Igalang ang desisyon at idokumento nang mabuti', 'Tumawag ng pulis para pilitin ang pasyente', 'Iwanan ang pasyente nang walang paliwanag'], correctAnswer: 1, explanation: 'Ang patient autonomy ay nirerespeto. Idokumento ang refusal, ipaliwanag ang mga panganib, kumuha ng AMA form at saksi.' },
      { question: 'Ang implied consent ay naaangkop kapag:', options: ['Ang pasyente ay may kakayahang pumayag', 'Ang pasyente ay menor de edad na may magulang', 'Ang pasyente ay walang malay sa life-threatening emergency', 'Ang pasyente ay tumanggi ng tulong'], correctAnswer: 2, explanation: 'Ang implied consent ay pinapalagay sa mga walang malay na pasyente sa life-threatening na sitwasyon na sila ay papayag sa life-saving na pangangalaga.' },
      { question: 'Ano ang primaryong layunin ng non-maleficence?', options: ['Gumawa ng mabuti para sa pasyente', 'Iwasan ang pagdulot ng pinsala', 'Igalang ang desisyon ng pasyente', 'Pantay na paggamot sa lahat'], correctAnswer: 1, explanation: 'Ang non-maleficence ay ang prinsipyong "unang-una, huwag magdulot ng pinsala" — ang responder ay dapat iwasan ang mga interbensyon na maaaring magdulot ng higit pang pinsala.' },
      { question: 'Ang hindi naidokumentong intervensyon ay itinuturing na:', options: ['Tama hangga\'t epektibo', 'Hindi nangyari', 'Kanang kamay ng pangangalaga', 'Opsiyonal na talaan'], correctAnswer: 1, explanation: 'Sa medikal at legal na pananaw, kung ang isang interbensyon ay hindi naidokumento, ito ay itinuturing na hindi nangyari. Ang tamang dokumentasyon ay proteksyon para sa pasyente at sa provider.' }
    ]
  },

  'pediatric-emergencies': {
    title: 'Pediatric Emergencies',
    description: 'Pagkilala at pamamahala ng mga emergency sa mga bata kabilang ang pediatric assessment, respiratory emergencies, seizures, dehydration, at child abuse recognition.',
    reviewerNotes: 'Ang pediatric emergencies ay isang kritikal na module sa TESDA NCII na nangangailangan ng espesyal na kaalaman dahil iba ang pisikal na katangian, dosis ng gamot, at pamamaraan sa bata kumpara sa matanda. Susuriin ng assessor ang iyong kakayahang gumamit ng Pediatric Assessment Triangle (PAT), maibigay ang tamang dosis ng gamot base sa timbang (mg/kg), at makilala ang mga life-threatening na kondisyon sa bata. Sa Pilipinas, ang mga karaniwang pediatric emergencies ay kinabibilangan ng acute gastroenteritis na may dehydration, pneumonia, dengue fever, at seizures. Mahalaga rin ang pagkilala sa child abuse at ang obligasyong magreport batay sa RA 7610 (Special Protection of Children Against Abuse, Exploitation and Discrimination Act). Tandaan: ang mga bata ay hindi lamang maliit na matanda — sila ay may unique na pangangailangan.',
    procedures: [
      {
        title: 'Pediatric Assessment Triangle (PAT)',
        steps: [
          'Tukuyin ang edad at tantyahin ang timbang (gauntlet method o Broselow tape)',
          'Appearance: suriin ang muscle tone, interactiveness, look/gaze, cry/consolability (TICLS)',
          'Work of Breathing: abnormally positioned? nasal flaring? retractions? audible sounds?',
          'Circulation to Skin: kulay ng balat, mottling, pallor, cyanosis, capillary refill',
          'Kung abnormal ang PAT: agarang intervensyon — ito ay "sick child" na nangangailangan ng mabilis na aksyon',
          'Kung normal ang PAT: mas detalyadong assessment ngunit manatiling alerto sa pagbabago',
          'Gumamit ng Pediatric Early Warning System (PEWS) para sa patuloy na pagsubaybay'
        ]
      },
      {
        title: 'Pamamahala ng Pediatric Respiratory Emergency',
        steps: [
          'Kilalanin ang upper airway obstruction: stridor, tripod position, drooling, restlessness',
          'Croup: barking cough, stridor, maputlang bata — magbigay ng humidified oxygen, keep calm',
          'Epiglottitis: drooling, stridor, high fever, toxic appearance — HUWAG suriin ang lalamunan, agarang i-refer',
          'Lower airway: wheezing (asthma/bronchiolitis) — magbigay ng bronchodilator kung available',
          'Pediatric respiratory distress: tachypnea, retractions, nasal flaring, grunting',
          'Respiratory failure: bradypnea, apnea, cyanosis, decreased LOC — handa sa intubation/BVM',
          'Oxygen target: SpO2 >94% sa mga bata; magbigay ng supplemental O2 kung bababa sa 94%'
        ]
      },
      {
        title: 'Pamamahala ng Pediatric Seizures at Dehydration',
        steps: [
          'Seizure management: protektahan ang bata mula sa pinsala, huwag ipasok ang anuman sa bibig',
          'Posisyon sa recovery pagkatapos ng seizure, suriin ang airway at breathing',
          'Suriin ang blood glucose — ang hypoglycemia ay karaniwang sanhi ng seizure sa bata',
          'Febrile seizure: karaniwan sa 6 buwan hanggang 5 taon, kadalasang self-limiting, kalmado ang magulang',
          'Dehydration assessment: skin turgor, mucous membranes, tears, capillary refill, urine output',
          'Mild dehydration: oral rehydration solution (ORS) 50 mL/kg sa 4 na oras',
          'Moderate/severe dehydration: IV access, bolus ng 20 mL/kg NS, ulitin kung kinakailangan',
          'Tandaan: ang mga bata ay mas madaling matuyuan dahil sa mas malaking ratio ng body surface area sa body weight'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Pediatric Assessment Triangle (PAT)', description: 'Tatsulok na may tatlong sulok: (1) Appearance — suriin ang tone, interactiveness, consistency of cry, look/gaze, consolability, (2) Work of Breathing — abnormally positioned, nasal flaring, retractions, audible sounds, (3) Circulation to Skin — pallor, mottling, cyanosis. Kung abnormal ang kahit isa, "sick child" na nagbibigay ng agarang pangangalaga.' },
      { title: 'Broselow Tape at Weight-Based Dosing', description: 'Color-coded na tape na inilalagay sa tabi ng bata mula sa ulo hanggang sa paa: bawat kulay ay may kaukulang estimated na timbang at dose ng gamot. Halimbawa: Pink = 6-7 kg, Red = 8-9 kg, Purple = 10-11 kg, Yellow = 12-14 kg. Ang bawat seksyon ay nagpapakita ng drug doses at equipment sizes.' },
      { title: 'Dehydration Assessment sa Bata', description: 'Paghahambing na tsart ng tatlong antas: Mild (3-5%) — banayad na tuyo ang mucous membranes, normal na tears, normal na skin turgor; Moderate (6-9%) — tuyo ang mucous membranes, decreased tears, decreased skin turgor, tachycardia; Severe (>10%) — walang tears, very poor skin turgor, hypotension, altered LOC, walang urine output.' }
    ],
    keyPoints: [
      'PAT = Appearance + Work of Breathing + Circulation to Skin — mabilis na "across the room" assessment',
      'Ang mga bata ay hindi maliit na matanda — iba ang physiology, drug dosing, at equipment sizes',
      'Weight-based dosing: laging kalkulahin ang dosis sa mg/kg bago magbigay ng gamot',
      'Broselow tape: pinakamabilis na paraan ng pagtantiya ng timbang at drug doses sa emergency',
      'Febrile seizures: karaniwan sa 6 buwan–5 taon, kadalasang benign, kalmado ang magulang',
      'Child abuse: obligadong magreport batay sa RA 7610 — kailangan lang ang makatwirang hinala',
      'Dehydration: ang mga bata ay mas madaling matuyuan — agapan nang mabilis gamit ang ORS o IV fluids'
    ],
    assessorQuestions: [
      'Ano ang Pediatric Assessment Triangle at paano ito ginagamit?',
      'Paano mo idinidifferentiate ang croup at epiglottitis?',
      'Ano ang tamang diskarte sa pagmamanage ng pediatric seizure sa prehospital setting?',
      'Paano mo tinitantiya ang timbang ng bata para sa weight-based dosing?',
      'Ano ang iyong legal na obligasyon kung hinalaan ang child abuse?'
    ],
    memorizationTips: [
      'PAT: "A-B-C sa malayo" = Appearance, Breathing work, Circulation to skin',
      'TICLS (Appearance): Tone, Interactiveness, Consolability, Look/Gaze, Speech/Cry',
      'Dehydration: "3-5% mild, 6-9% moderate, >10% severe" — percent equals mL lost per 100 mL',
      'Broselow: "Ilay sa bata, kulay ang magbibigay ng dose" — color-coded system'
    ],
    flashcards: [
      { front: 'Ano ang tatlong bahagi ng Pediatric Assessment Triangle?', back: 'Appearance, Work of Breathing, Circulation to Skin' },
      { front: 'Ano ang TICLS mnemonic?', back: 'Tone, Interactiveness, Consolability, Look/Gaze, Speech/Cry — assessment ng appearance ng bata' },
      { front: 'Ano ang pinakamabilis na paraan ng pagtantiya ng timbang ng bata sa emergency?', back: 'Broselow tape — color-coded tape na inilalagay mula ulo hanggang paa' },
      { front: 'Ano ang IV fluid bolus para sa severely dehydrated na bata?', back: '20 mL/kg na normal saline, maaaring ulitin kung kinakailangan' },
      { front: 'Ano ang batas na nag-uutos sa pagreport ng child abuse?', back: 'RA 7610 — Special Protection of Children Against Abuse, Exploitation and Discrimination Act' }
    ],
    miniQuiz: [
      { question: 'Ang Pediatric Assessment Triangle ay binubuo ng:', options: ['Airway, Breathing, Circulation', 'Appearance, Work of Breathing, Circulation to Skin', 'Tone, Reflexes, Color', 'Heart rate, Respiratory rate, BP'], correctAnswer: 1, explanation: 'Ang PAT ay binubuo ng Appearance, Work of Breathing, at Circulation to Skin — isang mabilis na visual assessment na ginagawa kahit sa malayo.' },
      { question: 'Kung hinalaan ang epiglottitis sa bata, ang pinakamahalagang hakbang ay:', options: ['Suriin ang lalamunan gamit ang tongue depressor', 'Huwag suriin ang lalamunan, panatilihin ang kalmado ng bata, at agarang i-refer', 'Magbigay ng oral antibiotics', 'Maglagay ng OPA'], correctAnswer: 1, explanation: 'Sa epiglottitis, ang pagsusuri sa lalamunan ay maaaring magdulot ng laryngospasm at complete airway obstruction. Panatilihin ang kalmado at i-refer agad.' },
      { question: 'Ang IV fluid bolus para sa dehydrated na bata ay:', options: ['10 mL/kg', '20 mL/kg', '30 mL/kg', '50 mL/kg'], correctAnswer: 1, explanation: 'Ang standard na IV fluid bolus para sa mga bata ay 20 mL/kg ng normal saline, na maaaring ulitin batay sa clinical response.' },
      { question: 'Ang febrile seizure ay karaniwan sa edad na:', options: ['0-2 buwan', '6 buwan hanggang 5 taon', '5-10 taon', 'Lahat ng edad'], correctAnswer: 1, explanation: 'Ang febrile seizures ay karaniwan sa mga bata na 6 buwan hanggang 5 taon ang edad, kadalasang self-limiting at benign.' },
      { question: 'Sa RA 7610, ang obligasyon ng EMS provider ay:', options: ['Kumpirmahin muna ang abuse bago magreport', 'Magreport sa makatwirang hinala ng child abuse', 'Maghintay ng court order bago magreport', 'I-consult muna ang magulang'], correctAnswer: 1, explanation: 'Sa RA 7610, kinakailangan lamang ang makatwirang hinala (reasonable suspicion) ng child abuse upang magreport. Hindi kailangan ng kumpirmasyon o court order.' }
    ]
  },

  'geriatric-emergencies': {
    title: 'Geriatric Emergencies',
    description: 'Pagkilala at pamamahala ng mga emergency sa mga matatanda kabilang ang age-related changes, polypharmacy, fall assessment, at mga karaniwang geriatric conditions.',
    reviewerNotes: 'Ang geriatric emergencies ay isang mahalagang module dahil ang populasyon ng mga matatanda sa Pilipinas ay lumalaki, at sila ay isa sa mga pinakamadalas na gumagamit ng EMS services. Susuriin ng TESDA NCII assessor ang iyong kaalaman sa age-related physiological changes na nakakaapekto sa assessment at paggamot, polypharmacy complications, at fall assessment. Ang mga matatanda ay madalas na nagpapakita ng atypical na sintomas — halimbawa, ang MI ay maaaring walang sakit sa dibdib kundi dyspnea o confusion lamang. Sa Pilipinas, ang mga karaniwang isyu ay kinabibilangan ng uncontrolled hypertension, diabetes complications, stroke, at falls. Mahalagang maunawaan na ang "normal aging" ay hindi sakit, ngunit ang mga pagbabago sa katawan ay nagpapababa ng physiological reserve at nagpapataas ng panganib sa emergency.',
    procedures: [
      {
        title: 'Geriatric Assessment sa Prehospital Setting',
        steps: [
          'Kilalanin ang age-related changes: decreased cardiac reserve, reduced lung capacity, impaired thermoregulation',
          'Suriin ang baseline functional status — magtanong sa pamilya/caregiver kung ano ang "normal" ng pasyente',
          'Suriin ang medication list — ang polypharmacy ay karaniwan at maaaring magdulot ng drug interactions',
          'Gumamit ng geriatric-specific assessment: falls risk, cognitive screening, at nutritional status',
          'Tandaan: ang mga matatanda ay madalas magpakita ng atypical na sintomas (silent MI, afebrile infection)',
          'Suriin ang skin integrity — ang mga matatanda ay prone sa pressure injuries at skin tears',
          'Magtanong ng advance directives o DNR orders — igalang ang mga ito kung mayroon'
        ]
      },
      {
        title: 'Pamamahala ng Falls sa Matatanda',
        steps: [
          'Suriin ang mekanismo ng pagkahulog: traumatic ba o medical (syncope, arrhythmia, hypoglycemia)?',
          'Magsagawa ng primary survey at katawan na pagsusuri para sa mga pinsala',
          'Suriin ang hip at pelvis — ang hip fracture ay karaniwan at life-threatening sa matatanda',
          'Tukuyin ang sanhi: orthostatic hypotension, medication side effect, environmental hazard, cardiac event',
          'Kung may head trauma: mas maingat — ang mga matatanda sa anticoagulants ay nasa mataas na panganib ng intracranial bleeding',
          'Suriin ang neurological status — ang fall ay maaaring resulta ng stroke o TIA',
          'I-transport para sa pagsusuri kahit maliit lamang ang pagkahulog — ang mga complications ay maaaring lumabas nang huli'
        ]
      },
      {
        title: 'Pamamahala ng Polypharmacy Complications',
        steps: [
          'Kunin ang kumpletong listahan ng mga gamot na iniinom — kabilang ang herbal supplements at OTC drugs',
          'Kilalanin ang high-risk medications: anticoagulants, hypoglycemics, antihypertensives, sedatives',
          'Anticoagulant-related bleeding: maingat na kontrolin ang pagdurugo, bantayan ang signs ng intracranial bleed',
          'Hypoglycemia mula sa oral hypoglycemics: maaaring tumagal ng ilang oras — kailangan ng extended monitoring',
          'Sedative overdose: respiratory depression, confusion, falls — suportahan ang airway at breathing',
          'Drug interactions: ang bagong gamot ay maaaring makipag-interact sa mga kasalukuyang gamot',
          'Idokumento ang lahat ng gamot na nakita sa eksena at dalhin sa ospital'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Age-Related Physiological Changes', description: 'Diagram ng katawan ng matatanda na may mga arrow na nagpapakita ng mga pagbabago: (1) Puso — decreased cardiac reserve at max heart rate, (2) Bagá — reduced vital capacity at blunted cough reflex, (3) Bato — decreased GFR at impaired drug clearance, (4) Atay — reduced metabolism ng gamot, (5) Utak — decreased cerebral blood flow at altered drug sensitivity, (6) Balat — thin skin, decreased thermoregulation.' },
      { title: 'Atypical Presentation ng MI sa Matatanda', description: 'Paghahambing na tsart: Typical MI (matanda sa ibaba ng 65) — chest pain, radiation sa kaliwang braso, diaphoresis; Atypical MI (matatanda 65+) — dyspnea lamang, confusion, fatigue, syncope, epigastric discomfort, walang chest pain. Babala: "Huwag magpadala sa kawalan ng sakit sa dibdib — ang matatanda ay madalas na walang classic na sintomas."' },
      { title: 'Fall Assessment Algorithm', description: 'Flowchart: Fall → Traumatic o Medical? → Traumatic: assess injuries, SMR kung may indication → Medical: syncope? arrhythmia? hypoglycemia? stroke? → Kung sa anticoagulant at may head trauma → Agarang CT scan → I-transport sa lahat ng kaso para sa observation.' }
    ],
    keyPoints: [
      'Ang mga matatanda ay madalas magpakita ng atypical na sintomas — laging mag-ingat',
      'Polypharmacy: karamihan sa matatanda ay umiinom ng 5+ na gamot — suriin ang interactions',
      'Silent MI: ang matatanda ay maaaring magkaroon ng MI nang walang chest pain — hanapin ang dyspnea, confusion',
      'Falls: laging suriin kung may underlying medical cause, hindi lang traumatic injury',
      'Anticoagulants: ang matatanda sa blood thinners ay nasa mataas na panganib ng intracranial bleed sa head trauma',
      'Respect advance directives at DNR orders — igalang ang autonomy ng pasyente',
      'Ang "normal aging" ay hindi sakit — huwag i-dismiss ang mga reklamo bilang "kahit na matanda na"'
    ],
    assessorQuestions: [
      'Bakit madalas magpakita ang mga matatanda ng atypical na sintomas sa emergency?',
      'Paano mo susuriin ang isang matandang nahulog sa bahay?',
      'Ano ang mga panganib ng polypharmacy sa prehospital setting?',
      'Bakit espesyal ang pag-iingat sa matatandang umiinom ng anticoagulants?',
      'Paano mo hahandle ang advance directives sa prehospital setting?'
    ],
    memorizationTips: [
      'Geriatric atypical: "DCFSE" = Dyspnea, Confusion, Fatigue, Syncope, Epigastric pain — walang classic chest pain',
      'Polypharmacy rule: "5+ gamot = 5+ panganib" — laging suriin ang drug interactions',
      'Fall assessment: "T-M-H" = Traumatic cause, Medical cause, High-risk (anticoagulated)',
      'Age-related changes: "Heart-Lung-Kidney-Liver-Brain-Skin" = bawat organ system ay nagbabago'
    ],
    flashcards: [
      { front: 'Ano ang karaniwang atypical na presentasyon ng MI sa matatanda?', back: 'Dysphea, confusion, fatigue, syncope, o epigastric discomfort — madalas walang chest pain' },
      { front: 'Ano ang polypharmacy?', back: 'Paggamit ng lima o higit pang gamot nang sabay-sabay, na nagpapataas ng panganib ng drug interactions at adverse effects' },
      { front: 'Bakit espesyal ang pag-iingat sa head trauma sa matatandang umiinom ng anticoagulants?', back: 'Dahil ang anticoagulants ay nagpapataas ng panganib ng intracranial bleeding kahit sa maliit na head trauma' },
      { front: 'Ano ang dapat gawin kung may advance directive o DNR order?', back: 'Igalang ang wishes ng pasyente, kumpirmahin ang dokumento, at idokumento sa prehospital care report' },
      { front: 'Ano ang pinakamahalagang tanong sa geriatric assessment?', back: '"Ano ang normal na kalagayan ng pasyente?" — kinakailangan ang baseline para makilala ang pagbabago' }
    ],
    miniQuiz: [
      { question: 'Ang karaniwang atypical na sintomas ng MI sa matatanda ay:', options: ['Severe na chest pain', 'Dyspnea, confusion, o syncope', 'Nakakasaksak na sakit sa kaliwang braso', 'Malakas na pawis lamang'], correctAnswer: 1, explanation: 'Ang mga matatanda ay madalas na walang classic na chest pain sa MI. Ang dyspnea, confusion, fatigue, at syncope ang karaniwang presentasyon.' },
      { question: 'Ang polypharmacy ay binibigyang-kahulugan bilang:', options: ['Pag-inom ng 2 o higit pang gamot', 'Pag-inom ng 5 o higit pang gamot nang sabay', 'Pag-inom ng herbal supplements lamang', 'Pag-inom ng isang gamot sa maling oras'], correctAnswer: 1, explanation: 'Ang polypharmacy ay ang paggamit ng 5 o higit pang gamot nang sabay-sabay, na nagpapataas ng panganib ng drug interactions at adverse effects.' },
      { question: 'Kung ang isang matandang umiinom ng anticoagulant ay nahulog at tumama ang ulo, dapat:', options: ['Obserbahan lamang sa bahay', 'Mag-apply ng ice at iwanan', 'I-transport agad para sa CT scan kahit walang halatang pinsala', 'Bigyan ng pain medication lamang'], correctAnswer: 2, explanation: 'Ang mga matatanda sa anticoagulants na may head trauma ay nasa mataas na panganib ng intracranial bleeding. I-transport agad para sa CT scan kahit walang halatang pinsala.' },
      { question: 'Ang unang hakbang sa geriatric assessment ay:', options: ['Magbigay ng oxygen agad', 'Alamin ang baseline functional status ng pasyente', 'I-check ang blood glucose', 'Maglagay ng IV line'], correctAnswer: 1, explanation: 'Ang pag-alam ng baseline functional status ay kritikal dahil kailangan malaman kung ang presentasyon ay bago o normal na para sa pasyente.' },
      { question: 'Ang "normal aging" ay dapat naunawaan bilang:', options: ['Isang sakit na ginagamot', 'Isang natural na proseso na hindi sakit', 'Dahilan para balewalain ang mga reklamo', 'Pagkakataon na limitahan ang pangangalaga'], correctAnswer: 1, explanation: 'Ang normal aging ay isang natural na proseso na hindi sakit. Ang mga reklamo ng matatanda ay dapat seryosohin at hindi balewalain bilang "kahit na matanda na lamang."' }
    ]
  },

  'ob-gyn-emergencies': {
    title: 'OB/GYN Emergencies',
    description: 'Pagkilala at pamamahala ng mga obstetric at gynecologic emergencies kabilang ang emergency childbirth, antepartum hemorrhage, preeclampsia/eclampsia, at sexual assault.',
    reviewerNotes: 'Ang OB/GYN emergencies ay isang challenging na module na nangangailangan ng kalmado at sistematikong paglalapit. Susuriin ng TESDA NCII assessor ang iyong kakayahang magsagawa ng emergency delivery, makilala ang mga komplikasyon ng pagbubuntis, at magbigay ng naaangkop na prehospital care. Sa Pilipinas, ang maternal mortality rate ay nananatiling isang pampublikong kalusugan na isyu, kaya ang maagang pagkilala at agarang referral ay kritikal. Ang mga pangunahing kasanayan ay kinabibilangan ng assessment ng third-trimester bleeding, pagkilala sa eclampsia at pagbigay ng magnesium sulfate referral, at tamang pamamaraan sa emergency delivery. Ang sexual assault cases ay nangangailangan ng sensitivity, proper evidence handling, at referral batay sa RA 8505 (Rape Victim Assistance and Protection Act).',
    procedures: [
      {
        title: 'Emergency Childbirth (Normal Delivery)',
        steps: [
          'Suriin kung talagang nasa active labor ang pasyente — contractions bawat 2 minuto na tumatagal ng 60+ segundo',
          'Kung ang crowning ay nangyari (ulung ng sanggol ay nakikita): maghanda sa delivery — HUWAG hadlangan',
          'Magsuot ng PPE, ihanda ang clean towels/clamps/scissors, at magtayo ng clean area',
          'Suportahan ang ulo ng sanggola habang nanggagalaw — huwag hilahin, hayaang lumabas nang natural',
          'Suriin kung may naka-wrap na umbilical cord sa leeg (nuchal cord) — maingat na i-slide sa ulo',
          'Pagkatapos lumabas ang ulo: suriin at linisin ang airway ng sanggol gamit ang bulb syringe',
          'Hayaang lumabas ang balikat: unahin ang anterior na balikat, tapos ang posterior',
          'I-clamp ang umbilical cord sa dalawang lugar at i-cut sa pagitan — huwag madaliin, hintayin ang pulsation'
        ]
      },
      {
        title: 'Pamamahala ng Third Trimester Bleeding',
        steps: [
          'Kilalanin ang antepartum hemorrhage: anumang vaginal bleeding pagkatapos ng 20 weeks ng gestation',
          'Placenta previa: painless bright red bleeding — HUWAG magsagawa ng vaginal examination',
          'Abruptio placentae: painful dark red bleeding, matinding sakit sa tiyan, uterine tenderness',
          'I-monitor ang vital signs nang madalas — ang hemorrhagic shock ay maaaring mabilis na lumala',
          'Maglagay ng IV access na may large-bore catheter at magsimula ng fluid resuscitation',
          'Iposisyon ang pasyente sa left lateral tilt upang maiwasan ang aortocaval compression',
          'I-transport agad sa ospital na may obstetric capability — DOH Emergency Obstetric Care facility'
        ]
      },
      {
        title: 'Pamamahala ng Eclampsia at Sexual Assault',
        steps: [
          'Preeclampsia: hypertension (>140/90) + proteinuria pagkatapos ng 20 weeks — monitor lang',
          'Eclampsia: seizure sa preeclamptic na pasyente — protektahan ang airway, i-prevent ang injury',
          'Kung nag-seizure: ilagay sa left lateral position, suportahan ang airway, magbigay ng high-flow O2',
          'Konsultahin ang medical director para sa posible ng magnesium sulfate administration',
          'Sexual assault: tratuhin ang pasyente nang may sensitivity at dignity — maging maingat sa wording',
          'I-preserve ang evidence: huwag palitan ang damit, huwag hugasan, i-wrap ang mga damit sa clean paper bag',
          'I-refer sa Women and Children Protection Unit (WCPU) ng DOH — batay sa RA 8505',
          'Kunin ang informed consent para sa lahat ng procedura — ang survivor ay nasa kontrol'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Emergency Delivery Sequence', description: 'Anim na panel na nagpapakita: (1) Crowning — ulo ng sanggol na nakikita sa vaginal opening, (2) Support ng ulo — kamay na sumusuporta sa ulo habang lumalabas, (3) Nuchal cord check — pag-check at pag-slide ng cord sa ulo, (4) Anterior shoulder delivery — unang balikat na lumalabas, (5) Posterior shoulder at body — katawan na sumusunod, (6) Cord clamping at cutting — dalawang clamp na may gunting sa gitna.' },
      { title: 'Placenta Previa laban sa Abruptio Placentae', description: 'Paghahambing na magkatabi: Placenta Previa — placenta ay nasa ibaba na takip sa cervical os, painless bright red bleeding, walang uterine tenderness; Abruptio Placentae — placenta ay naghihiwalay mula sa uterine wall, painful dark red bleeding, matinding sakit, uterine tenderness at rigidity. Malaking "HUWAG SURIIN" na label sa previa para sa vaginal exam.' },
      { title: 'Left Lateral Tilt Position', description: 'Diagram ng buntis na nakahiga sa left lateral tilt: isang pillow o rolled blanket sa kanang balakang na nagpapataas ng right hip ng 15-30 degrees. Arrow na nagpapakita ng decompression ng inferior vena cava. Caption: "Ito ay nagpapabuti ng venous return at fetal blood supply sa pamamagitan ng pag-iwas sa aortocaval compression."' }
    ],
    keyPoints: [
      'Emergency delivery: HUWAG hadlangan ang delivery kung nangyari na ang crowning — hayaang mangyari',
      'Nuchal cord: suriin at maingat na i-slide sa ulo — huwag putulin kung maaari',
      'Placenta previa: painless bright red bleeding — HUWAG magsagawa ng vaginal exam',
      'Abruptio placentae: painful dark red bleeding + uterine tenderness — agarang transport',
      'Eclampsia: seizure sa preeclamptic — protektahan ang airway, left lateral position',
      'Sexual assault: preserve evidence, tratuhin nang may sensitivity, i-refer sa WCPU (RA 8505)',
      'Left lateral tilt: palaging ilagay ang buntis sa left lateral tilt upang maiwasan ang aortocaval compression'
    ],
    assessorQuestions: [
      'Ilarawan ang hakbang-hakbang na pamamaraan sa emergency delivery.',
      'Paano mo idinidifferentiate ang placenta previa at abruptio placentae?',
      'Ano ang tamang pamamahala ng eclamptic seizure sa prehospital setting?',
      'Bakit mahalagang i-position ang buntis sa left lateral tilt?',
      'Ano ang mga dapat tandaan sa pag-handle ng sexual assault survivor?'
    ],
    memorizationTips: [
      'Delivery rule: "Huwag Hadlangan, Suportahan" — hayaang mangyari nang natural at suportahan ang proseso',
      'Previa vs Abruptio: "Painless vs Painful, Bright vs Dark" — previa = painless/bright; abruptio = painful/dark',
      'Eclampsia: "Left-Lateral-Airway-Oxygen" = left lateral position, airway protection, high-flow O2',
      'Sexual assault: "Preserve-Respect-Refer" = preserve evidence, respect dignity, refer sa WCPU'
    ],
    flashcards: [
      { front: 'Ano ang placenta previa?', back: 'Ang placenta ay nakaposisyon sa ibaba na nakatakip sa cervical os, nagdudulot ng painless bright red bleeding — HUWAG magsagawa ng vaginal exam' },
      { front: 'Ano ang abruptio placentae?', back: 'Ang placenta ay naghihiwalay mula sa uterine wall, nagdudulot ng painful dark red bleeding at uterine tenderness' },
      { front: 'Bakit kailangan ang left lateral tilt sa buntis na pasyente?', back: 'Upang maiwasan ang aortocaval compression — ang matris ay nagpiga sa inferior vena cava na nagbabawas sa venous return at fetal blood supply' },
      { front: 'Ano ang DAPAT GAWIN kapag may nuchal cord?', back: 'Maingat na i-slide ang cord sa ulo ng sanggol — huwag putulin kung maaari' },
      { front: 'Ano ang RA 8505?', back: 'Rape Victim Assistance and Protection Act — nagbibigay ng proteksyon at tulong sa mga survivor ng sexual assault' }
    ],
    miniQuiz: [
      { question: 'Sa emergency delivery, kapag nangyari na ang crowning, ang dapat gawin ay:', options: ['Hadlangan ang delivery hanggang sa makarating sa ospital', 'Hayaang mangyari ang delivery at suportahan ang proseso', 'Mag-apply ng pressure sa ulo ng sanggol', 'Hilingin sa pasyente na tumayo'], correctAnswer: 1, explanation: 'Kapag nangyari na ang crowning, hindi na dapat hadlangan ang delivery. Suportahan ang proseso at hayaang mangyari nang natural.' },
      { question: 'Ang placenta previa ay karaniwang nagdudulot ng:', options: ['Painful dark red bleeding', 'Painless bright red bleeding', 'Severe na abdominal cramping', 'Walang bleeding — internal lamang'], correctAnswer: 1, explanation: 'Ang placenta previa ay karaniwang nagdudulot ng painless bright red bleeding dahil ang placenta ay nasa ibaba na nakatakip sa cervical os.' },
      { question: 'Kapag ang isang buntis ay nasa supine position, ang panganib ay:', options: ['Wala — normal lang', 'Aortocaval compression na nagbabawas sa venous return', 'Nagdudulot ng preterm labor', 'Nagdudulot ng fetal distress lamang'], correctAnswer: 1, explanation: 'Sa supine position, ang matris ay nagpiga sa inferior vena cava (aortocaval compression), na nagbabawas sa venous return at maaaring magdulot ng hypotension at fetal distress.' },
      { question: 'Sa sexual assault case, ang pinakamahalagang hakbang sa evidence preservation ay:', options: ['Hugasan ang pasyente para sa kalinisan', 'Huwag palitan o hugasan ang damit, i-wrap sa paper bag', 'I-collect lahat ng evidence gamit ang plastic bag', 'Magtanong ng detalyadong tanong tungkol sa pangyayari'], correctAnswer: 1, explanation: 'Ang damit ay hindi dapat palitan o hugasan upang ma-preserve ang evidence. I-wrap sa clean paper bag (hindi plastic) para maiwasan ang moisture contamination.' },
      { question: 'Ang preeclampsia ay binibigyan-kahulugan bilang:', options: ['Hypertension lamang sa unang trimester', 'Hypertension + proteinuria pagkatapos ng 20 weeks', 'Seizure sa panahon ng pagbubuntis', 'Edema lamang sa paa'], correctAnswer: 1, explanation: 'Ang preeclampsia ay binibigyan-kahulugan bilang hypertension (>140/90) kasama ang proteinuria na nangyayari pagkatapos ng 20 weeks ng gestation.' }
    ]
  },

  'environmental-emergencies': {
    title: 'Environmental Emergencies',
    description: 'Pagkilala at pamamahala ng mga emergency dulot ng kapaligiran kabilang ang heat-related illness, hypothermia, drowning, bites at stings, at lightning injuries.',
    reviewerNotes: 'Ang environmental emergencies ay isang praktikal na module na may direktang aplikasyon sa Pilipinas dahil sa tropikal na klima at madalas na pagkakataon ng bagyo at baha. Susuriin ng TESDA NCII assessor ang iyong kakayahang makilala at gamutin ang heat-related emergencies (na karaniwan sa mainit na klima ng Pilipinas), drowning (sa archipelagic na bansa), at bites/stings (maraming species sa Pilipinas). Ang mga pangunahing konsepto ay kinabibilangan ng thermoregulation, pathophysiology ng heat stroke vs heat exhaustion, cold immersion, at venom management. Sa konteksto ng Pilipinas, ang snake bites, jellyfish stings, at rabies exposure ay karaniwang scenarios. Mahalaga rin ang kaalaman sa NDRRMC protocols para sa disaster-related na environmental injuries.',
    procedures: [
      {
        title: 'Pamamahala ng Heat-Related Emergencies',
        steps: [
          'Heat cramps: painful muscle spasms sa mainit na environment — magbigay ng oral fluids at rest sa malamig na lugar',
          'Heat exhaustion: malala na pagpapawis, panghihina, nausea, headache, tachycardia — cool the patient, oral/IV fluids',
          'Heat stroke: altered LOC, hot skin (dry o moist), core temp >40°C — ITO AY MEDICAL EMERGENCY',
          'Para sa heat stroke: agarang cool the patient — cold water immersion ang gold standard kung available',
          'Kung walang immersion: mag-apply ng ice packs sa leeg, kili-kili, at singit, basang basahan sa buong katawan',
          'Maglagay ng IV access at magbigay ng cold IV fluids',
          'I-monitor ang core temperature — itigil ang active cooling kapag umabot sa 39°C upang maiwasan ang hypothermia',
          'I-transport agad — ang heat stroke ay may mataas na mortality rate kung hindi agad ginagamot'
        ]
      },
      {
        title: 'Pamamahala ng Drowning at Hypothermia',
        steps: [
          'Drowning: siguraduhing ligtas ang eksena bago pumasok sa tubig — scene safety muna',
          'Simulan ang rescue breathing agad para sa drowning victim — 5 initial breaths bago ang compressions',
          'Kung walang pulso: magsimula ng CPR — tandaan na ang drowning ay primarily respiratory emergency',
          'Huwag subukan ang abdominal thrusts o Heimlich para sa water removal — hindi ito epektibo at nagdudulot ng delay',
          'Hypothermia: mild (32-35°C) — warm the patient progressively, remove wet clothing, insulate',
          'Moderate hypothermia (28-32°C): gentle handling lamang — ang rough movement ay maaaring magdulot ng VF',
          'Severe hypothermia (<28°C): maaaring maging pulseless — suriin ang pulso ng 60 segundo bago mag-CPR',
          "Active external rewarming: warm IV fluids, heat packs sa groin/axillae/neck, remove wet clothing"
        ]
      },
      {
        title: 'Pamamahala ng Bites, Stings, at Lightning',
        steps: [
          'Snake bite: immobilize ang nasugatan na ekstremit, panatilihin sa level ng puso, HUWAG gamitin ang tourniquet',
          'Huwag putukan, hiwain, o suck out ang venom — ang mga ito ay hindi epektibo at nagdudulot ng pinsala',
          'I-transport sa ospital na may available na antivenom — tandaan ang hitsura ng ahas kung maaari',
          'Jellyfish sting: banlawan ng vinegar para sa box jellyfish — HUWAG gamitin ang freshwater',
          'Animal bite (rabies risk): banlawan ng soap at water nang 15 minuto, i-refer para sa PEP (post-exposure prophylaxis)',
          'Lightning injury: suriin ang ABCDE, treat ang cardiac arrest agad — ang lightning ay maaaring magdulot ng asystole',
          'Lightning victim na walang pulso: CPR agad — ang reverse triage ay nalalapat (treat ang pulseless muna)',
          'Konsultahin ang medical director para sa Snake Antivenom Protocol ng DOH'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Heat Illness Spectrum', description: 'Continuous spectrum mula mild hanggang severe: Heat Cramps (green) → Heat Syncope (yellow-green) → Heat Exhaustion (yellow) → Heat Stroke (red). Bawat yugto ay may mga sintomas at treatment: Cramps = rest + fluids; Syncope = position + fluids; Exhaustion = cool + fluids + rest; Stroke = AGARANG COOLING + transport. Malaking babala: "Heat Stroke = Medical Emergency — Cool Agad!"' },
      { title: 'Drowning Rescue Algorithm', description: 'Flowchart: Scene safe? → Rescue → Unresponsive? → Check breathing → Not breathing → 5 rescue breaths → Check pulse → No pulse → CPR 30:2 → AED when available → Transport. Espesyal na tala: "5 breaths muna bago compressions — ang drowning ay respiratory emergency." Cross-out na label sa Heimlich/water removal.' },
      { title: 'Snake Bite First Aid', description: 'Diagram ng ekstremit na may snake bite na may mga DO at DON\'T: DO — Immobilize, Keep at heart level, Mark the edge of swelling with time, Transport to hospital with antivenom. DON\'T — Tourniquet (X), Cut wound (X), Suck venom (X), Apply ice (X), Drink alcohol (X). Caption: "Ang tanging epektibong paggamot ay ang antivenom — transport agad."' }
    ],
    keyPoints: [
      'Heat stroke: altered LOC + hot skin + core temp >40°C = MEDICAL EMERGENCY — cool agad',
      'Heat exhaustion: may pa rin ang pagpapawis — heat stroke: maaaring tuyo ang balat',
      'Drowning: 5 rescue breaths muna bago compressions — primarily respiratory emergency',
      'Hypothermia: "No one is dead until warm and dead" — suriin ang pulso ng 60 segundo sa severe hypothermia',
      'Snake bite: HUWAG tourniquet, HUWAG suck, HUWAG cut — immobilize at i-transport sa antivenom facility',
      'Rabies exposure: banlawan ng soap at water nang 15 minuto — kailangan ang PEP (RA 9482)',
      'Lightning: treat ang pulseless muna (reverse triage) — CPR agad para sa cardiac arrest'
    ],
    assessorQuestions: [
      'Paano mo idinidifferentiate ang heat exhaustion at heat stroke?',
      'Ano ang tamang pamamaraan sa rescue ng drowning victim?',
      'Bakit hindi dapat gumamit ng tourniquet sa snake bite?',
      'Ano ang ibig sabihin ng "no one is dead until warm and dead"?',
      'Paano mo hahandle ang lightning injury na may maraming biktima?'
    ],
    memorizationTips: [
      'Heat spectrum: "C-S-E-S" = Cramps, Syncope, Exhaustion, Stroke — mula mild hanggang severe',
      'Heat stroke vs exhaustion: "Stroke = Sick brain (altered LOC), Exhaustion = Sick body (still sweating)"',
      'Drowning: "5 Bago 30" = 5 rescue breaths bago ang 30 compressions',
      'Snake bite DO NOT: "TCSID" = Tourniquet, Cut, Suck, Ice, Drink alcohol — lahat ng ito ay bawal'
    ],
    flashcards: [
      { front: 'Ano ang pinakamahalagang pagkakaiba ng heat stroke at heat exhaustion?', back: 'Heat stroke = altered LOC at core temp >40°C (medical emergency); Heat exhaustion = may malay at mas mababang temp' },
      { front: 'Gaano katagal dapat suriin ang pulso sa severe hypothermia?', back: '60 segundo — ang pulse ay maaaring mabagal at mahirap maramdaman sa hypothermic na pasyente' },
      { front: 'Ano ang unang dapat gawin sa drowning victim na walang hininga?', back: 'Magbigay ng 5 rescue breaths bago simulan ang chest compressions' },
      { front: 'Ano ang dapat gawin sa snake bite na ekstremit?', back: 'Immobilize sa level ng puso, huwag gumamit ng tourniquet, at i-transport sa ospital na may antivenom' },
      { front: 'Bakit reverse triage ang lightning incident?', back: 'Dahil ang mga pulseless na biktima ng lightning ay maaaring maibalik sa pamamagitan ng agarang CPR, samantalang ang may pulso ay malamang na surviving' }
    ],
    miniQuiz: [
      { question: 'Ang gold standard ng cooling para sa heat stroke ay:', options: ['Ice packs sa kilikili', 'Cold water immersion', 'Electric fan', 'Wet cloth sa noo'], correctAnswer: 1, explanation: 'Ang cold water immersion ang gold standard para sa rapid cooling sa heat stroke. Ito ay pinakamabilis na paraan ng pagbaba ng core temperature.' },
      { question: 'Sa drowning victim, ang unang hakbang pagkatapos i-secure ang airway ay:', options: ['Magsimula ng chest compressions', 'Magbigay ng 5 rescue breaths', 'Tangkaing alisin ang tubig sa baga', 'Mag-apply ng AED'], correctAnswer: 1, explanation: 'Sa drowning, ang primary na problema ay hypoxia. Magbigay ng 5 rescue breaths bago simulan ang compressions upang maibalik ang oxygenation.' },
      { question: 'Ang tanging epektibong paggamot para sa venomous snake bite ay:', options: ['Tourniquet', 'Suction device', 'Antivenom sa ospital', 'Ice application'], correctAnswer: 2, explanation: 'Ang tanging epektibong paggamot para sa venomous snake bite ay ang antivenom na ibinibigay sa ospital. Ang tourniquet, suction, at ice ay hindi nirerekomenda.' },
      { question: 'Sa severe hypothermia (<28°C), ang pulso ay dapat suriin ng:', options: ['5 segundo', '10 segundo', '30 segundo', '60 segundo'], correctAnswer: 3, explanation: 'Sa severe hypothermia, ang pulso ay maaaring mabagal at mahirap maramdaman. Suriin ng buong 60 segundo bago ideklara na walang pulso at magsimula ng CPR.' },
      { question: 'Ang RA 9482 ay nauukol sa:', options: ['Anti-Hospital Deposit Law', 'Anti-Rabies Act', 'OSH Law', 'Data Privacy Act'], correctAnswer: 1, explanation: 'Ang RA 9482 o Anti-Rabies Act ay nag-uutos sa responsible pet ownership at nagbibigay ng framework para sa post-exposure prophylaxis (PEP) sa animal bite victims.' }
    ]
  },

  'special-rescue': {
    title: 'Special Rescue Operations',
    description: 'Mga prinsipyo at pamamaraan ng special rescue operations kabilang ang vehicle extrication, confined space rescue, water rescue, at coordination sa BFP at NDRRMC.',
    reviewerNotes: 'Ang special rescue operations ay isang praktikal na module na sinusuri sa TESDA NCII na may diin sa vehicle extrication at coordination sa iba pang ahensya. Susuriin ng assessor ang iyong kaalaman sa scene safety, patient access sa mga pinakamabibigat na sitwasyon, at tamang komunikasyon sa rescue team. Sa Pilipinas, ang BFP (Bureau of Fire Protection) ang pangunahing ahensya para sa rescue operations, at ang EMS provider ay madalas na nagtatrabaho bilang support sa BFP. Ang NDRRMC framework ay mahalaga sa disaster response coordination. Ang mga pangunahing kasanayan ay kinabibilangan ng vehicle stabilization, glass management, at patient packaging para sa extrication. Mahalagang tandaan: ang seguridad ng rescuer ay LAGING nangunguna — hindi mo matutulungan ang pasyente kung ikaw din ay mapapahamak.',
    procedures: [
      {
        title: 'Vehicle Extrication Protocol',
        steps: [
          'Scene size-up: siguraduhing ligtas, i-activate ang BFP/rescue, itakda ang command post',
          'Vehicle stabilization: patigilin ang makina, i-park ang brake, ilagay ang wheel chocks, disconnect ang battery',
          'Glass management: protektahan ang pasyente ng blanket bago basagin ang bintana — basagin mula sa kabilang panig',
          'Patient access: lapitan ang pasyente sa pinakamalapit na pintuan, suriin ang ABCDE habang nasa sasakyan',
          'Magsagawa ng spinal motion restriction kung may indication — manual in-line stabilization muna',
          'Kung kailangan ng roof removal o door displacement: hayaan ang BFP na gumawa — EMS ay nagfo-focus sa pasyente',
          'Patient packaging: ilagay ang KED (Kendrick Extrication Device) o short board bago i-extricate',
          'I-extricate nang maingat: synchronized movement, head-first kapag posible, protektahan ang cervical spine'
        ]
      },
      {
        title: 'Confined Space at Water Rescue Awareness',
        steps: [
          'Confined space rescue: HUWAG pumasok nang walang proper training at equipment — ito ay specialist operation',
          'Kung may pasyente sa confined space: i-notify ang rescue team, magtatag ng perimeter, maghanda ng medical equipment',
          'Maging handa sa hazmat: ang confined spaces ay maaaring maglaman ng toxic gases o oxygen deficiency',
          'Water rescue awareness: HUWAG pumasok sa tubig nang walang water rescue training — "Reach, Throw, Row, Go"',
          'Reach: gamitin ang stick o rope mula sa pampang; Throw: magtapon ng throw bag o flotation device',
          'Row: gumamit ng bangka; Go: ang pinakamapanganib — para sa trained water rescue personnel lamang',
          'Kapag may flood rescue: maging alerto sa hidden hazards — bukas na mga manhole, kuryente, contamination'
        ]
      },
      {
        title: 'Multi-Agency Coordination at NDRRMC Protocol',
        steps: [
          'Kilalanin ang Incident Command System (ICS): Incident Commander, Operations, Planning, Logistics, Finance',
          'Sa Pilipinas: BFP ang lead agency para sa urban rescue, NDRRMC para sa disaster response',
          'EMS role sa ICS: medical branch sa Operations section — responsableng mag-set up ng triage at treatment areas',
          'Communication: gumamit ng common terminology, i-report sa Operations Chief, huwag mag-act nang solo',
          'START triage sa mass casualty: Rapid, Sort, Treat, Transport — color-coded system',
          'Mag-set up ng treatment areas: Immediate (red), Delayed (yellow), Minimal (green), Expectant (black)',
          'Staging area para sa mga ambulansya — huwag pumasok sa hot zone nang walang clearance'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'Vehicle Extrication Sequence', description: 'Anim na hakbang na diagram: (1) Scene safety at BFP activation, (2) Vehicle stabilization (chocks, battery disconnect), (3) Glass management (blanket protection, break from opposite side), (4) Patient access at ABCDE assessment, (5) KED application for spinal protection, (6) Extrication — head-first, synchronized movement. Sa bawat hakbang, ang role ng EMS (patient care) ay nakahiwalay sa role ng BFP (tool operations).' },
      { title: 'Water Rescue Hierarchy', description: 'Patungong pyramid mula sa pinakaligtas hanggang pinakamapanganib: (1) REACH — stick o rope mula sa pampang (pinakaligtas), (2) THROW — throw bag o flotation device, (3) ROW — bangka o rescue boat, (4) GO — direktang pagpasok sa tubig (pinakamapanganib, para sa trained rescuers lamang). Malaking babala: "Huwag pumasok sa tubig kung hindi trained — dagdagan mo lang ang bilang ng mga biktima."' },
      { title: 'ICS Structure para sa Mass Casualty Incident', description: 'Organizational chart: Incident Commander → (Operations Chief → Medical Branch → Triage + Treatment + Transport), (Planning Chief), (Logistics Chief), (Finance/Admin). Ang EMS ay nasa Medical Branch ng Operations. Ang START triage colors ay ipinapakita sa tabi ng Triage unit: Red (Immediate), Yellow (Delayed), Green (Minimal), Black (Expectant).' }
    ],
    keyPoints: [
      'Scene safety MUNA: ang seguridad ng rescuer ay laging nangunguna — hindi mo matutulungan ang pasyente kung ikaw ay mapapahamak',
      'Vehicle extrication: BFP ang gumagawa ng tool operations — EMS ay nagfo-focus sa patient care',
      'KED (Kendrick Extrication Device): ginagamit para sa spinal protection habang inaalis ang pasyente sa sasakyan',
      'Confined space: HUWAG pumasok nang walang training at equipment — i-notify ang specialist rescue team',
      'Water rescue: "Reach, Throw, Row, Go" — palaging subukan ang pinakaligtas na paraan muna',
      'ICS at NDRRMC: sundin ang chain of command, gumamit ng common terminology, huwag mag-act nang solo',
      'START triage: Immediate (red), Delayed (yellow), Minimal (green), Expectant (black)'
    ],
    assessorQuestions: [
      'Ilarawan ang tamang vehicle extrication protocol at ang papel ng EMS.',
      'Ano ang water rescue hierarchy at bakit mahalagang sundin ito?',
      'Paano mo iaayos ang ICS structure sa mass casualty incident?',
      'Bakit hindi dapat pumasok sa confined space nang walang proper training?',
      'Ano ang START triage system at paano ito ginagamit?'
    ],
    memorizationTips: [
      'Rescue safety: "IKA Muna Bago Sila" — seguridad ng rescuer ang pinakauna',
      'Water rescue: "RT-RG" = Reach, Throw, Row, Go — mula pinakaligtas hanggang pinakamapanganib',
      'Extrication: "SBGA-E" = Stabilize, Battery, Glass, Access, Extricate',
      'START triage: "IDME" = Immediate (Red), Delayed (Yellow), Minimal (Green), Expectant (Black)'
    ],
    flashcards: [
      { front: 'Ano ang unang hakbang sa vehicle extrication?', back: 'Scene size-up at vehicle stabilization — patigilin ang makina, ilagay ang wheel chocks, i-disconnect ang battery' },
      { front: 'Ano ang papel ng EMS sa vehicle extrication?', back: 'Patient care at assessment habang ang BFP ay nag-aasikaso ng tool operations (door removal, roof removal, etc.)' },
      { front: 'Ano ang KED?', back: 'Kendrick Extrication Device — isang short spinal immobilization device na ginagamit para sa patient extrication sa sasakyan' },
      { front: 'Ano ang pinakamapanganib na hakbang sa water rescue?', back: 'GO — direktang pagpasok sa tubig — ito ay para sa trained water rescue personnel lamang' },
      { front: 'Ano ang apat na kategorya ng START triage?', back: 'Immediate (Red), Delayed (Yellow), Minimal (Green), Expectant (Black)' }
    ],
    miniQuiz: [
      { question: 'Sa vehicle extrication, ang EMS ay responsableng:', options: ['Gumamit ng hydraulic tools', 'Mag-focus sa patient care at assessment', 'Mag-displace ng doors', 'Mag-remove ng roof'], correctAnswer: 1, explanation: 'Sa vehicle extrication, ang EMS ay nagfo-focus sa patient care at assessment habang ang BFP ay gumagamit ng tools para sa vehicle access.' },
      { question: 'Ang pinakaligtas na paraan ng water rescue ay:', options: ['Go — pumasok sa tubig', 'Row — gumamit ng bangka', 'Throw — magtapon ng flotation device', 'Reach — gumamit ng stick o rope mula sa pampang'], correctAnswer: 3, explanation: 'Ang Reach ang pinakaligtas na paraan dahil hindi ka pumasok sa tubig. Palaging subukan mula sa pinakaligtas na paraan bago ang mas mapanganib.' },
      { question: 'Sa START triage, ang pasyenteng may respiratory rate na 36 at walang nakikitang panganib sa buhay ay:', options: ['Immediate (Red)', 'Delayed (Yellow)', 'Minimal (Green)', 'Expectant (Black)'], correctAnswer: 0, explanation: 'Ang respiratory rate na 36 (beyond 30) ay naglalagay sa pasyente sa Immediate (Red) category sa START triage dahil nagpapakita ng respiratory distress.' },
      { question: 'Kung may confined space rescue, ang EMS provider ay dapat:', options: ['Pumasok agad para ilabas ang pasyente', 'I-notify ang specialist rescue team at maghanda ng medical equipment', 'Maghintay lamang ng BFP', 'Pumasok nang may basic na PPE lamang'], correctAnswer: 1, explanation: 'Ang confined space rescue ay isang specialist operation. I-notify ang trained rescue team, mag-set up ng perimeter, at maghanda ng medical equipment para sa paglabas ng pasyente.' },
      { question: 'Ang Incident Command System (ICS) sa Pilipinas ay naka-coordinate sa pamamagitan ng:', options: ['PNP lamang', 'BFP para sa urban rescue, NDRRMC para sa disaster response', 'DOH lamang', 'Local government lamang'], correctAnswer: 1, explanation: 'Ang BFP ang lead agency para sa urban rescue operations, habang ang NDRRMC ay nag-coordinate para sa disaster response. Ang ICS framework ay ginagamit sa parehong scenarios.' }
    ]
  },

  'ncii-review': {
    title: 'NCII Comprehensive Review',
    description: 'Komprehensibong pagsusuri para sa TESDA NCII Examination kabilang ang exam format, common competency areas, practical exam tips, at test-taking strategies.',
    reviewerNotes: 'Ang NCII Comprehensive Review ay isang capstone module na nag-iisa-isa sa lahat ng competencies na sinusuri sa TESDA NCII examination para sa Emergency Medical Services. Susuriin ng assessor ang iyong kaalaman sa exam format, mga karaniwang tanong, at mga praktikal na demo na kailangan. Ang TESDA NCII exam ay binubuo ng tatlong bahagi: (1) Written exam — multiple choice na nagtatanong sa lahat ng competency areas, (2) Practical exam — demonstration ng mga kasanayan sa manikin at equipment, (3) Oral interview — tanong mula sa assessor tungkol sa decision-making at critical thinking. Sa Pilipinas, ang passing rate ay 70% para sa written at "competent" rating para sa practical. Ang mga karaniwang dahilan ng pagbagsak ay kinabibilangan ng kawalan ng kasanayan sa time management, hindi pagsunod sa proper sequence, at kawalan ng confidence sa practical demo.',
    procedures: [
      {
        title: 'Paghahanda para sa Written Exam',
        steps: [
          'Suriin ang TESDA Training Regulations (TR) para sa EMS NCII — alamin ang exact na competencies na susuriin',
          'Mag-focus sa mga high-yield topics: BLS/CPR, Patient Assessment, Trauma Management, at Medical Emergencies',
          'Magsanay ng multiple choice questions — suriin ang bawat option bago pumili ng sagot',
          'Elimination technique: alisin ang mga malinaw na maling sagot bago pumili sa natitira',
          'Maglaan ng oras sa pharmacology at dosage calculations — madalas itong lumalabas sa exam',
          'Suriin ang mga legal at ethical na tanong — RA 11058, RA 8344, RA 10173, at patient rights',
          'Time management: huwag magtagal sa isang tanong — markahan at balikan na lang kung may oras'
        ]
      },
      {
        title: 'Paghahanda para sa Practical Exam',
        steps: [
          'Sanayin ang BLS/CPR sequence nang walang tulong ng cheat sheet — kabisadohin ang bawat hakbang',
          'Magsanay ng patient assessment gamit ang ABCDE approach — verbalize ang bawat hakbang habang ginagawa',
          'Magsanay ng SAMPLE at OPQRST history taking — ang assessor ay nag-oobserba ng communication skills',
          'Magsanay ng proper PPE donning at doffing — ang infection control ay sinascore',
          'Magsanay ng vital signs taking: BP, HR, RR, SpO2, temperature — dapat smooth at confident',
          'Magsanay ng spinal motion restriction at KED application — ito ay palaging sinusuri',
          "Verbalize lahat ng ginagawa: \"Ngayon ay sinusuri ko ang patency ng airway...\" — ang assessor ay nagbbase sa score sa nakikita at naririnig"
        ]
      },
      {
        title: 'Test Day Tips at Strategies',
        steps: [
          'Pumunta nang maaga — ang late arrival ay maaaring magresulta sa disqualification',
          'Magsuot ng proper uniform o attire — ang unang impresyon ay mahalaga',
          'Dala ang mga kinakailangang dokumento: TESDA registration, valid ID, at certification fees',
          'Bago magsimula: huminga nang malalim, kalmado, at positive na isipin — confidence is key',
          'Sa practical exam: kalmado at sistematiko — huwag magmadali, sundin ang tamang sequence',
          'Kung makalimot sa practical: huwag mag-panic, humingi ng sandali, at ipagpatuloy — ang recovery ay sinascore din',
          'Pagkatapos ng exam: magpahinga at huwag muna mag-overthink — ang resulta ay lalabas sa tamang oras'
        ]
      }
    ],
    visualIllustrations: [
      { title: 'TESDA NCII Exam Structure', description: 'Tatlong bahagi na diagram: (1) Written Exam (30%) — 100 multiple choice items, 70% passing rate, 2 oras; (2) Practical Exam (50%) — skills demonstration sa manikin at equipment, "Competent" o "Not Yet Competent" rating; (3) Oral Interview (20%) — situational questions mula sa assessor, critical thinking assessment. Total: Dapat pumasa sa lahat ng bahagi para makuha ang NCII certification.' },
      { title: 'High-Yield Topics sa NCII Exam', description: 'Pareto chart ng mga competency areas na may pinakamaraming tanong sa exam: BLS/CPR (20%), Patient Assessment (18%), Trauma Management (15%), Medical Emergencies (12%), Airway Management (10%), Pharmacology (8%), Ambulance Operations (7%), Ethics/Legal (5%), Others (5%). Ang top 4 ay sumasaklaw sa 65% ng exam.' },
      { title: 'Practical Exam Scoring Rubric', description: 'Score sheet na may 4 na kategorya: (1) Sequence/Procedure — correct order ng hakbang, (2) Technique — proper execution ng bawat skill, (3) Communication — verbalization at patient interaction, (4) Safety/Infection Control — PPE use at body mechanics. Bawat kategorya ay may score na 1-5: 1 = Not Competent, 3 = Competent with minor errors, 5 = Fully Competent.' }
    ],
    keyPoints: [
      'Ang TESDA NCII exam ay may tatlong bahagi: Written (30%), Practical (50%), Oral (20%)',
      'Written exam: 70% passing rate — ang elimination technique ay nakakatulong sa mga mahirap na tanong',
      'Practical exam: "Verbalize lahat" — kung hindi mo sinabi, hindi alam ng assessor na ginawa mo',
      'High-yield topics: BLS/CPR, Patient Assessment, Trauma, Medical Emergencies — 65% ng exam',
      'Proper PPE at infection control: laging simulan sa PPE — ito ay automatic na puntos',
      'Time management: huwag magtagal sa isang tanong — markahan at balikan',
      'Confidence at composure: kalmado ka lang — ang assessor ay nag-oobserba hindi lang ng skills kundi ng attitude'
    ],
    assessorQuestions: [
      'Ano ang tatlong bahagi ng TESDA NCII examination at ang kanilang timbang?',
      'Ano ang mga high-yield topics na dapat pagtuunan ng pansin?',
      'Bakit mahalagang "verbalize lahat" sa practical exam?',
      'Ano ang elimination technique at paano ito nakakatulong sa written exam?',
      'Paano mo hahandle ang pagkakalimot sa practical exam?'
    ],
    memorizationTips: [
      'Exam structure: "W-P-O" = Written (30%), Practical (50%), Oral (20%) — kailangan pumasa sa lahat',
      'High-yield: "BP-TM" = BLS, Patient Assessment, Trauma, Medical — 65% ng exam dito nanggagaling',
      'Practical rule: "Kung hindi mo sinabi, hindi mo ginawa" — verbalize lahat ng hakbang',
      'Exam day: "Early-Calm-Prepared" = pumunta nang maaga, kalmado, at handa'
    ],
    flashcards: [
      { front: 'Ano ang passing rate sa written exam ng TESDA NCII?', back: '70% — kailangan makakuha ng hindi bababa sa 70% sa 100 multiple choice items' },
      { front: 'Ano ang rating system sa practical exam?', back: '"Competent" o "Not Yet Competent" — walang numerical grade, binary ang rating' },
      { front: 'Bakit mahalagang verbalize ang bawat hakbang sa practical exam?', back: 'Dahil ang assessor ay nagba-base sa score sa nakikita at naririnig — kung hindi mo sinabi, hindi niya alam na ginawa mo' },
      { front: 'Ano ang apat na high-yield topics na sumasaklaw sa 65% ng exam?', back: 'BLS/CPR, Patient Assessment, Trauma Management, Medical Emergencies' },
      { front: 'Ano ang dapat gawin kung makalimot sa practical exam?', back: 'Huwag mag-panic, humingi ng sandali, kumuha ng komposur, at ipagpatuloy — ang recovery ay sinusuri rin ng assessor' }
    ],
    miniQuiz: [
      { question: 'Ang TESDA NCII examination ay binubuo ng:', options: ['Written lamang', 'Written at Practical lamang', 'Written, Practical, at Oral Interview', 'Practical lamang'], correctAnswer: 2, explanation: 'Ang TESDA NCII exam ay may tatlong bahagi: Written Exam (30%), Practical Exam (50%), at Oral Interview (20%). Kailangan pumasa sa lahat ng bahagi.' },
      { question: 'Ang passing rate sa written exam ng TESDA NCII ay:', options: ['50%', '60%', '70%', '80%'], correctAnswer: 2, explanation: 'Ang passing rate sa written exam ng TESDA NCII ay 70% — kailangan makakuha ng hindi bababa sa 70 out of 100 items.' },
      { question: 'Sa practical exam, ang pinakamahalagang praktika ay:', options: ['Magmadali para matapos agad', 'Verbalize ang bawat hakbang habang ginagawa', 'Huwag magsalita para makapag-concentrate', 'Magtanong sa assessor kung paano gawin'], correctAnswer: 1, explanation: 'Ang verbalization ng bawat hakbang ay mahalaga dahil ang assessor ay nagba-base sa score sa nakikita at naririnig. Kung hindi mo sinabi, maaaring hindi maibigay ang puntos.' },
      { question: 'Kung makalimot sa practical exam, ang pinakamahusay na gagawin ay:', options: ['Ihinto ang demo at umalis', 'Mag-panic at piliting maalala', 'Kumuha ng komposur, humingi ng sandali, at ipagpatuloy', 'Magtanong sa assessor kung ano ang susunod'], correctAnswer: 2, explanation: 'Kung makalimot, huwag mag-panic. Kumuha ng komposur, humingi ng sandali, at ipagpatuloy. Ang recovery at composure ay sinusuri rin ng assessor.' },
      { question: 'Ang pinakamaraming puntos sa practical exam ay nanggagaling sa:', options: ['PPE donning', 'Sequence/Procedure at Technique', 'Oral na paliwanag lamang', 'Pagbilis sa demo'], correctAnswer: 1, explanation: 'Ang Sequence/Procedure at Technique ay ang mga pinakamahalagang kategorya sa practical exam scoring. Ang tamang pagkakasunod-sunod at tamang execution ng bawat skill ang pangunahing basehan ng score.' }
    ]
  }
}
