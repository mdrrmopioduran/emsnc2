export interface RoadmapTopicFil {
  title: string
  shortDescription: string
  content: string
  keyPoints: string[]
  outcomes: string[]
  whatYoullLearn: string[]
  quickNotes: {
    keyTerms: string[]
    protocols: string[]
    commonMistakes: string[]
    mnemonics: string[]
    summary: string
  }
}

export const roadmapFil: Record<string, RoadmapTopicFil> = {
  'osh': {
    title: "OSH & Kalusugan",
    shortDescription:
      "Mga pangunahing kaalaman sa Occupational Safety and Health para sa mga EMS responder sa Pilipinas.",
    content: `Ang Occupational Safety and Health (OSH) ay ang pundasyon ng karera ng bawat EMS responder. Sa Pilipinas, ang OSH ay pinangangasiwaan ng Occupational Safety and Health Standards (OSHS) ayon sa itinakda ng Department of Labor and Employment (DOLE). Bilang EMS First Responder o EMT, ang pag-unawa sa OSH ay hindi lamang akademiko—ito ay isang bagay ng personal na kaligtasan at propesyonal na pananagutan. Bawat tawag na sinasagutan mo ay nagdadalang panganib: biological hazards mula sa bloodborne at airborne pathogens, physical hazards mula sa hindi matatag na istraktura at trapiko, chemical hazards mula sa hazardous materials (HAZMAT), at psychological hazards mula sa mga nakakabahalang eksena at nakakaipong stress.

Ang Philippine Occupational Safety and Health Center (OSHC) ay naglulunsad ng mga panuntunan na naaangkop sa lahat ng lugar ng trabaho, kabilang ang mga operasyon ng EMS. Ang Republic Act No. 11058, na kilala rin bilang "OSH Law," ay nagpapatibay ng pagsunod sa mga pamantayan ng OSH at nagmamulta sa mga employer na nabigo sa pagbibigay ng ligtas na lugar ng trabaho. Para sa mga EMS provider, nangangahulugan ito na ang iyong employer—maging ito man ay ahensya ng gobyerno tulad ng Bureau of Fire Protection (BFP) o pribadong serbisyo ng ambulansya—ay dapat magbigay sa iyo ng sapat na PPE, pagsasanay, bakuna (lalo na laban sa Hepatitis B), at mga protokol para sa post-exposure. Ang pag-unawa sa iyong mga karapatan sa ilalim ng batas na ito ay mahalaga.

Ang Body Substance Isolation (BSI) ay ang unang linya ng depensa laban sa mga nakakahawang sakit. Ang BSI ay higit pa sa simpleng pagsusuot ng guwantes—ito ay sumasaklaw sa komprehensibong pagkakataon kabilang ang hand hygiene, tamang pag-suot at pag-alis ng PPE, eye protection kapag maaaring magkaroon ng splash exposure, at paggamit ng N95 respirators kapag pinaghihinalaang may mga airborne pathogens tulad ng tuberculosis (TB). Ang Pilipinas ay may isa sa pinakamataas na bilang ng TB sa buong mundo, kaya ang respiratory protection ay isang kritikal na alalahanin para sa mga Filipino EMS provider.

Ang Standard Precautions, ayon sa World Health Organization (WHO) at pinagtibay ng Philippine Department of Health (DOH), ay nangangailangan na ang lahat ng dugo at body fluids ay ituring na potensyal na nakakahawa. Ang pagpapatakdang ito ay nag-aalis ng pangangailangan na kilalanin ang infection status ng bawat pasyente bago gumawa ng mga protektibong hakbang. Sa konteksto ng EMS sa Pilipinas, kung saan ang mga pasyente ay maaaring may hindi na-diagnose na nakakahawang sakit tulad ng dengue, HIV, COVID-19, o multidrug-resistant TB, ang Standard Precautions ay dapat ipatupad nang pare-pareho at walang eksepsyon.

Panghuli, ang OSH ay sumasaklaw rin sa iyong sikolohikal na kapakanan. Ang mga EMS responder sa Pilipinas ay nahaharap sa natatanging mga stressor: mataas na ratio ng pasyente sa provider, limitadong resources, mahirap na kondisyon ng trabaho, at pagkakalantad sa mass casualty events tuwing bagyo, lindol, at iba pang likas na kalamidad. Ang Critical Incident Stress Management (CISM) at mga protokol sa debriefing ay dapat na magagamit ng lahat ng responder. Ang pagkilala sa mga palatandaan ng burnout, compassion fatigue, at post-traumatic stress disorder (PTSD) ay bahagi ng pagpapanatili ng iyong occupational health at pagtiyak sa pangmatagalang kakayahan sa karera.`,
    keyPoints: [
      "Itinatakda ng RA 11058 ang OSH at ipinatutupad ng DOLE—kilalanin ang iyong mga karapatan bilang EMS provider",
      "Ang BSI (Body Substance Isolation) ay ang iyong unang aksyon sa bawat eksena—bago makipag-ugnayan sa pasyente",
      "Standard Precautions: ituring ang LAHAT ng dugo at body fluids bilang potensyal na nakakahawa",
      "Ang TB ay isang pangunahing occupational risk sa Pilipinas—gamitin ang N95 respirators kapag kailangan",
      "Mga kinakailangan sa PPE: guwantes, eye protection, mask, gown—iyon ang antas na akma sa panganib",
      "Dapat magbigay ang mga employer ng Hepatitis B vaccination at mga protokol sa post-exposure prophylaxis",
      "Ang CISM (Critical Incident Stress Management) ay mahalaga para sa sikolohikal na kapakanan",
      "Ang tamang pag-suot at pag-alis ng PPE ay nakaiiwas sa self-contamination at pagkalat ng sakit",
    ],
    outcomes: [
      "Matukoy ang mga OSH hazard sa EMS",
      "Mag-apply ng BSI precautions nang tama",
      "Maunawaan ang mga tadhana ng RA 11058",
      "Makilala ang mga psychological hazard",
    ],
    whatYoullLearn: [
      "🧤 Mga Pangunahin sa PPE & BSI",
      "⚠️ Pagkilala sa Hazard",
      "🚑 Mga Panganib sa EMS Exposure",
      "📋 Mga Pamamaraan sa Pag-uulat",
      "🧠 Stress & CISM",
    ],
    quickNotes: {
      keyTerms: ["BSI", "Standard Precautions", "N95", "CISM", "RA 11058"],
      protocols: [
        "BSI bago makipag-ugnayan sa pasyente",
        "TB → N95 respirator",
        "Kailangan ang Hep B vaccination",
      ],
      commonMistakes: [
        "Nakakalimutan ang BSI muna",
        "Gumagamit ng surgical mask sa halip na N95 para sa TB",
        "Hindi nag-uulat ng mga exposure",
      ],
      mnemonics: ["BSI = Body Substance Isolation (palaging una)"],
      summary: "Pinoprotektahan ng OSH ang mga EMS provider. Ang BSI ay ang unang aksyon. Itinatakda ng RA 11058 ang mga ligtas na lugar ng trabaho. Ang Standard Precautions ay naaangkop sa LAHAT ng pasyente. Ang CISM ay para sa sikolohikal na kapakanan.",
    },
  },
  'life-on-the-line': {
    title: "Buhay sa Linya",
    shortDescription:
      "Pagpapakilala sa sistema ng EMS, mga landas sa karera, at papel ng mga first responder sa Pilipinas.",
    content: `Ang Emergency Medical Services (EMS) system sa Pilipinas ay isang umuunlad na network ng mga ahensya, organisasyon, at tauhan na nakatuon sa pagbibigay ng prehospital emergency care. Hindi tulad ng mga bansang may mahusay na naitatag na single-agency EMS system, ang landscape ng EMS sa Pilipinas ay kasangkutan ng maraming stakeholder: ang Bureau of Fire Protection (BFP) sa ilalim ng Department of the Interior and Local Government (DILG), ang Philippine National Police (PNP), ang mga yunit ng emergency ng local government unit (LGU), mga pribadong serbisyo ng ambulansya, at mga organisasyong boluntaryo sa pagligtas. Ang pag-unawa kung paano nag-uugnayan ang mga entidad na ito ay pundamental upang maging epektibo sa loob ng sistema.

Ang Technical Education and Skills Development Authority (TESDA) ay gumaganap ng mahalagang papel sa pagpapatibay ng pagsasanay sa EMS sa pamamagitan ng National Certificate II (NCII) qualification para sa Emergency Medical Services. Ang TESDA NCII certification ay nagsisiguro na ang lahat ng EMS First Responder ay nakakatugon sa pinakamababang pamantayan ng kakayahan na sumasaklaw sa basic life support, patient assessment, trauma care, medical emergency management, at ambulance operations. Ang pagkamit ng certification na ito ay hindi lamang propesyonal na kinakailangan—ito ay isang legal na prerekisito para sa empleyo sa karamihan ng mga ahensya ng EMS sa buong bansa. Ang qualification ay sumusunod sa Philippine Qualifications Framework (PQF) at naaayon sa ASEAN mutual recognition arrangements.

Ang landas ng karera sa Philippine EMS ay karaniwang nagsisimula sa antas ng EMS First Responder (NCII), na umaasenso patungong EMT-Basic, EMT-Intermediate, at sa huli ay Paramedic. Bawat antas ay nagpapalawak ng scope of practice, nagdaragdag ng mga advanced na kasanayan tulad ng intravenous access, advanced airway management, medication administration, at cardiac monitoring. Ang Professional Regulation Commission (PRC) at ang Department of Health (DOH) ay nagtatrabaho patungo sa isang pinag-isang licensure system, ngunit batay sa kasalukuyang mga pamantayan, ang TESDA NCII ay nananatiling entry-level certification. Ang pag-unawa sa mga pagkakaiba sa pagitan ng mga antas na ito—at pagpapatakbo nang mahigpit sa loob ng iyong scope of practice—ay parehong propesyonal at legal na kinakailangan.

Ang mga operasyon ng EMS sa Pilipinas ay pinangangasiwaan ng ilang mahahalagang batas at balangkas. Ang Republic Act No. 10871, na kilala bilang "Basic Life Support for Schools Act," ay nagtatakda ng BLS training para sa mga mag-aaral. Ang Republic Act No. 10971 ay nagbibigay para sa pagpapaunlad ng emergency medical services sa bansa. Ang Philippine National EMS Framework ay nagtatatag ng organisational structure, standards of care, at coordination mechanisms para sa paghahatid ng EMS. Ang National Disaster Risk Reduction and Management Council (NDRRMC) ay nag-uugnay ng multi-agency responses sa panahon ng mga pangunahing emergency at kalamidad, gamit ang Incident Command System (ICS) bilang pamantayang balangkas ng pamamahala.

Ang buhay bilang EMS provider sa Pilipinas ay mahirap ngunit lubhang kapaki-pakinabang. Haharap ka sa mga natatanging hamon: pagsagot sa mga emergency sa mataong urban na lugar na may limitadong access, pagbibigay ng pangangalaga nang may kakulangan ng resources sa panahon ng bagyo at baha, pamamahala ng mass casualty incidents nang mas kaunti sa kinakailangang personal, at pagharap sa emosyonal na epekto ng paggamot sa mga biktima ng karahasan, aksidente, at likas na kalamidad. Gayunpaman, bawat buhay na naligtas, bawat pasyenteng na-stabilize, at bawat pamilyang naliwanagan ay nagpapatibay sa kritikal na kahalagahan ng iyong papel. Ikaw ang frontline ng healthcare system—ang unang link sa chain of survival para sa milyun-milyong Pilipino.`,
    keyPoints: [
      "Ang Philippine EMS ay kasangkutan ng BFP, PNP, mga LGU, pribadong serbisyo, at mga organisasyong boluntaryo",
      "Ang TESDA NCII ay ang entry-level certification na kailangan para sa mga EMS First Responder",
      "Landas sa karera: First Responder → EMT-Basic → EMT-Intermediate → Paramedic",
      "Ang RA 10971 ay nagbibigay ng legal framework para sa pagpapaunlad ng EMS sa Pilipinas",
      "Ang NDRRMC ay nag-uugnay ng multi-agency disaster response gamit ang Incident Command System",
      "Palaging mag-operate sa loob ng iyong scope of practice—ang paglampas dito ay may legal at etikal na kahihinatnan",
      "Ang limitasyon ng resources sa Philippine EMS ay nangangailangan ng adaptability at critical thinking",
      "Ang mga EMS provider ay ang unang link sa chain of survival para sa komunidad",
    ],
    outcomes: [
      "Maipaliwanag ang istruktura ng Philippine EMS system",
      "Matukoy ang mga kinakailangan sa TESDA NCII certification",
      "Maunawaan ang mga landas sa karera sa EMS",
      "Makilala ang mga mahahalagang batas ng EMS sa Pilipinas",
    ],
    whatYoullLearn: [
      "🏥 Istruktura ng EMS System",
      "📜 Mga Kinakailangan sa TESDA NCII",
      "🎓 Mga Landas sa Karera",
      "⚖️ Mga Mahahalagang Batas sa EMS",
      "🇵🇭 Konteksto ng Pilipinas",
    ],
    quickNotes: {
      keyTerms: ["TESDA NCII", "BFP", "NDRRMC", "RA 10971", "AMATS"],
      protocols: [
        "Kailangan ang NCII para sa EMS employment",
        "ICS para sa disaster management",
        "BFP sa ilalim ng DILG",
      ],
      commonMistakes: [
        "Nagkakalito sa mga antas ng EMT",
        "Nag-o-operate lampas sa scope of practice",
        "Hindi alam ang chain of command",
      ],
      mnemonics: ["NCII = National Certificate Level II (entry-level)"],
      summary: "Ang Philippine EMS ay kasangkutan ng maraming ahensya. Ang TESDA NCII ay ang entry certification. Ang RA 10971 ay nagbibigay ng legal framework. Karera: First Responder → EMT-B → EMT-I → Paramedic.",
    },
  },
  'first-aider': {
    title: "First Aider",
    shortDescription:
      "Mahahalagang kasanayan at pamamaraan sa first aid na dapat matamo ng bawat EMS responder.",
    content: `Ang first aid ay ang agarang pangangalagang ibinibigay sa isang may sakit o nasugatan bago maging available ang propesyonal na medikal na paggamot. Bilang EMS First Responder na certified sa ilalim ng TESDA NCII, ang iyong mga kakayahan sa first aid ay higit na lampas sa antas ng karaniwang tao. Ikaw ay sanay na mag-assess, mag-stabilize, at pamahalaan ang iba't ibang medikal at trauma emergency gamit ang mga sistematikong pamamaraan na nagpaprioritize sa mga buhay-na-nakakabantaang kondisyon. Ang mga prinsipyo ng first aid—preserve life, prevent further harm, at promote recovery—ang bumubuo sa pundasyon ng bawat interbensyon na iyong ginagawa.

Ang primary survey (initial assessment) ay sumusunod sa ABCDE approach: Airway (na may cervical spine protection), Breathing, Circulation, Disability (neurological status), at Exposure (na may environmental control). Ang sistematikong pamamaraang ito ay nagsisiguro na ang mga pinaka-kritikal na kondisyon ay matukoy at matugunan muna. Ang isang naka-block na airway ay papatayin ang pasyente sa loob ng ilang minuto, anuman ang iba pang mga sugat. Ang hindi nakokontrol na hemorrhage ay maaaring makamamatay sa loob ng "Platinum 10 Minutes." Ang pagkilala at paggamot sa mga priyoridad na ito sa ayos ang naghihiwalay sa isang sanay na first aider mula sa isang mabuting kaloobang bystander. Sa setting ng Pilipinas, kung saan ang transport times ay maaaring mahaba dahil sa trapiko at distansya, ang iyong kakayahang magbigay ng epektibong inisyal na pangangalaga ay kadalasang pagkakaiba sa pagitan ng buhay at kamatayan.

Ang bleeding control ay isa sa mga pinakakritikal na kasanayan sa first aid. Ang external hemorrhage ay pinamamahalaan gamit ang hakbang-hakbang na pamamaraan: direct pressure, elevation (kapag naaangkop), pressure dressings, tourniquet application para sa life-threatening extremity bleeding, at hemostatic dressings kapag available. Ang kapaligiran ng EMS sa Pilipinas ay maaaring sangkot ng mga pinsala mula sa vehicular crashes, industrial accidents, agricultural machinery, at karahasan—na lahat ay maaaring magdulot ng malubhang hemorrhage. Ang pag-alam kung kailan at paano mag-apply ng tourniquet nang tama, at pag-unawa na ang tourniquet ay hindi last resort para sa life-threatening bleeding, ay mahalagang kaalaman na sumasalamin sa kasalukuyang evidence-based guidelines.

Ang burn management sa Pilipinas ay lalong may kaugnayan dahil sa pagiging karaniwan ng mga sunog sa pagluluto sa bahay, insidente sa industriya, at electrical injuries. Ang first aid para sa burns ay sumusunod sa prinsipyong "Stop, Drop, and Roll" para sa mga sunog sa damit, pagpapalamig ng burn sa malinis na tumatakbong tubig sa loob ng hindi bababa sa 10-20 minuto (hindi kailanman yelo), pagtakip ng sterile dressing, at pamamahala ng sakit. Ang chemical burns ay nangangailangan ng sagana na irrigation, at ang electrical burns ay maaaring may tagong panloob na pinsala na nangangailangan ng maingat na assessment. Ang rule of nines (binago para sa pediatric patients) ay nakakatulong na tantyahin ang total body surface area (TBSA) na apektado, na nag-giya sa mga desisyon sa fluid resuscitation.

Ang fracture management, splinting, at immobilization ay mahahalagang kasanayan sa first aid na nakaiiwas sa karagdagang pinsala at nakababawas ng sakit. Kasama sa mga prinsipyo: i-immobilize ang joint sa itaas at ibaba ng pinsala, suriin ang distal pulses bago at pagkatapos ng splinting, mag-pad sa splint para sa kaginhawaan, at gamutin ang lahat ng pinaghihinalaang fractures bago ilipat ang pasyente. Sa konteksto ng EMS sa Pilipinas, kung saan ang mga spinal injury mula sa motorcycle crashes at pagkahulog ay karaniwan, ang tamang spinal motion restriction (SMR) techniques—kabilang ang paggamit ng cervical collars, long spine boards, at vacuum mattresses—ay mga kritikal na kakayahan na dapat sanayin hanggang sa maging automatic.`,
    keyPoints: [
      "Mga priyoridad sa first aid: Preserve life → Prevent further harm → Promote recovery",
      "Ang primary survey ay sumusunod sa ABCDE: Airway, Breathing, Circulation, Disability, Exposure",
      "Bleeding control: direct pressure → pressure dressing → tourniquet (para sa life-threatening bleeding)",
      "First aid sa burn: palamigin ng tumatakbong tubig 10-20 min, huwag kailanman gumamit ng yelo, takpan ng sterile dressing",
      "Fracture management: i-immobilize ang joints sa itaas at ibaba, suriin ang distal pulses bago at pagkatapos",
      "Platinum 10 Minutes: ang hindi nakokontrol na hemorrhage ay maaaring makamamatay sa loob ng ilang minuto",
      "Ang Spinal Motion Restriction (SMR) ay kritikal para sa mga pinsala mula sa motorcycle crash at pagkahulog sa Pilipinas",
      "Palaging i-reassess ang pasyente—ang mga kondisyon ay mabilis na magbago pagkatapos ng inisyal na paggamot",
    ],
    outcomes: [
      "Magsagawa ng primary survey gamit ang ABCDE",
      "Kontrolin ang pagdurugo gamit ang hakbang-hakbang na pamamaraan",
      "Pamahalaan ang burns at fractures",
      "Mag-apply ng splinting techniques nang tama",
    ],
    whatYoullLearn: [
      "🫁 ABCDE Primary Survey",
      "🩸 Mga Hakbang sa Bleeding Control",
      "🔥 Pamamahala sa Burn",
      "🦴 Fracture & Splinting",
      "⏱️ Platinum 10 Minutes",
    ],
    quickNotes: {
      keyTerms: ["ABCDE", "SAMPLE", "DCAP-BTLS", "Tourniquet", "Rule of Nines"],
      protocols: [
        "ABCDE palaging sa ayos",
        "Tourniquet: HINDI last resort para sa life-threatening bleeding",
        "Burns: palamigin 10-20 min ng tubig, huwag yelo",
      ],
      commonMistakes: [
        "Nag-aapply ng tourniquet bilang last resort",
        "Gumagamit ng yelo sa burns",
        "Hindi sinasuri ang distal PSM bago/pagkatapos ng splinting",
      ],
      mnemonics: [
        "ABCDE = Airway, Breathing, Circulation, Disability, Exposure",
        "SAMPLE = Signs, Allergies, Medications, Past history, Last intake, Events",
      ],
      summary: "Primary survey: ABCDE. Bleeding: direct pressure → tourniquet para sa life-threatening. Burns: palamigin ng tubig 10-20 min. Fractures: immobilize sa itaas at ibaba, suriin ang distal PSM.",
    },
  },
  'rules-law': {
    title: "Mga Patakaran & Batas",
    shortDescription:
      "Mga legal at etikal na balangkas na namamahala sa kasanayan ng EMS sa Pilipinas.",
    content: `Ang legal landscape na namamahala sa kasanayan ng EMS sa Pilipinas ay tinutukoy ng kombinasyon ng pambansang lehislasyon, administrative orders, lokal na ordinansa, at propesyonal na mga pamantayan. Bilang EMS provider, ang pag-unawa sa mga batas na ito ay hindi opsyonal—ito ay isang propesyonal na kinakailangan na nagpoprotekta sa iyo at sa iyong mga pasyente. Ang pangunahing prinsipyo ay ang bawat pasyente ay may karapatang makatanggap ng emergency medical care, at bawat provider ay may tungkuling maghatid ng pangangalaga sa loob ng mga itinatag na pamantayan. Ang kabiguan na maunawaan at sumunod sa mga legal na kinakailangan ay maaaring magresulta sa criminal charges, civil liability, propesyonal na disiplina, at pagkawala ng certification.

Ang consent ay isang pangunahing legal na konsepto sa EMS. Ang expressed consent ay nakuha kapag ang isang competent na pasyente ay tahasang sumang-ayon sa paggamot, maging sa pasalita o sa kasulatan. Ang implied consent ay naaangkop kapag ang pasyente ay hindi makapagbigay ng consent (walang malay, altered mental status, o menor de edad na walang guardian) at ipinapalagay na sila ay sasang-ayon sa life-saving na paggamot kung sila ay makakaya. Sa Pilipinas, ang prinsipyo ng implied consent ay lalong mahalaga sa panahon ng mass casualty incidents at disaster responses, kung saan ang pagkuha ng explicit consent sa bawat pasyente ay hindi praktikal. Gayunpaman, ang mga competent na pasyente ay palaging may karapatang tumanggi sa paggamot, at ang karapatang ito ay dapat irispeta—sa kondisyon na ang pasyente ay naipabatid sa mga panganib ng pagtanggi at ang pagtanggi ay nadokumento.

Ang negligence sa EMS ay nangyayari kapag apat na elemento ang naroroon: duty to act, breach of duty, proximate cause, at damages. Ang duty to act ay umiiral kapag mayroon kang legal o kontraktwal na obligasyong magbigay ng pangangalaga—halimbawa, kapag ikaw ay on-duty sa isang EMS agency at na-dispatch sa isang tawag. Ang breach of duty ay nangyayari kapag ang iyong pangangalaga ay bumaba sa tinatanggap na standard of care. Ang proximate cause ay nangangahulugan na ang iyong breach ay direktang naging sanhi ng pinsala sa pasyente. Ang damages ay tumutukoy sa aktwal na pinsalang naranasan ng pasyente. Ang konseptong "res ipsa loquitur" (ang bagay ay nagsasalita para sa sarili nito) ay maaaring naaangkop kapag ang negligence ay halatang-halata na hindi na kailangan ng ekspertong testimonya—halimbawa, ang pag-iwan sa isang pasyente na walang gabay sa stretcher na pagkatapos ay gumulong.

Ang Good Samaritan Law sa Pilipinas, ayon sa Republic Act No. 10871 at mga kaugnay na tadhana, ay nagbibigay ng legal na proteksyon sa mga indibidwal na kusang-loob na nagbibigay ng emergency care nang may magandang paniniwala, nang walang inaasahang kabayaran, at nang walang gross negligence o willful misconduct. Bagama't ang proteksyong ito ay mahalaga para sa mga karaniwang tao at off-duty na provider, mahalagang maunawaan na ang on-duty na EMS provider ay maaaring hawakan sa mas mataas na standard of care. Bukod dito, ang abandonment—ang pagtatapos ng pangangalaga nang walang katiyakan na katumbas o mas mataas na antas ng pangangalaga ay asumido ng ibang provider—ay isang seryosong legal at etikal na paglabag na maaaring magresulta sa liability.

Ang dokumentasyon ay ang iyong pinakamahusay na legal na depensa. Ang Patient Care Report (PCR) ay isang legal na dokumento na dapat na tumpak at komprehensibong itala ang lahat ng assessment, interbensyon, reaksyon ng pasyente, at komunikasyon. Ang gintong patakaran ng dokumentasyon ay: "Kung hindi nadokumento, hindi ginawa." Sa Philippine EMS system, ang mga PCR ay dapat sumunod sa minimum data set na itinatag ng DOH at dapat kabilangan ng timestamps, vital signs, SAMPLE history, treatment na ibinigay, at anumang pagtanggi sa pangangalaga na may witnessed signatures. Ang tamang dokumentasyon ay nagpoprotekta sa pasyente, sa provider, at sa sistema—at isang hindi mapaghihiwalay na bahagi ng propesyonal na kasanayan sa EMS.`,
    keyPoints: [
      "Expressed consent: ang competent na pasyente ay tahasang sumasang-ayon; Implied consent: ang pasyente ay hindi makapagbigay ng consent",
      "Ang negligence ay nangangailangan ng: duty, breach, proximate cause, at damages—apat na dapat mapatunayan",
      "Ang Good Samaritan Law ay nagpoprotekta sa mga boluntaryong rescuer na kumikilos nang may magandang paniniwala nang walang gross negligence",
      "Abandonment: pag-iwan sa pasyente nang walang katiyakan sa katumbas o mas mataas na antas ng paglipat ng pangangalaga",
      "Ang Duty to Act ay umiiral kapag on-duty at na-dispatch; maaaring wala kapag off-duty sa ilang kaso",
      "Dokumentasyon sa PCR: 'Kung hindi nadokumento, hindi ginawa'—palaging dokumentuhin nang maayos",
      "Ang mga pasyente ay may karapatang tumanggi sa paggamot kung competent at naipabatid sa mga panganib",
      "Scope of practice: huwag kailanman lumampas sa iyong awtorisadong antas—may mga legal na kahihinatnan",
    ],
    outcomes: [
      "Ikaiba ang expressed vs implied consent",
      "Matukoy ang 4 na elemento ng negligence",
      "Maunawaan ang mga proteksyon ng Good Samaritan",
      "Iaplay ang tamang mga pamantayan sa dokumentasyon",
    ],
    whatYoullLearn: [
      "✋ Mga Uri ng Consent",
      "⚖️ Mga Elemento ng Negligence",
      "🆘 Good Samaritan Law",
      "📝 Mga Patakaran sa Dokumentasyon",
      "🚫 Depinisyon ng Abandonment",
    ],
    quickNotes: {
      keyTerms: ["Expressed consent", "Implied consent", "Negligence", "Good Samaritan", "Abandonment", "PCR"],
      protocols: [
        "Ang mga competent na pasyente ay maaaring tumanggi",
        "Idokumento ang lahat ng pagtanggi na may witnesses",
        "PCR: kung hindi nadokumento, hindi ginawa",
      ],
      commonMistakes: [
        "Nagbibigay ng paggamot nang walang consent",
        "Nabibigong idokumento ang mga pagtanggi",
        "Umalis nang walang tamang turnover",
      ],
      mnemonics: ["Duty → Breach → Cause → Damages = Negligence"],
      summary: "Consent: expressed o implied. Ang negligence ay nangangailangan ng 4 na elemento. Ang Good Samaritan ay nagpoprotekta sa mga rescuer na may magandang paniniwala. Ang Abandonment = pag-alis nang walang turnover. Idokumento ang lahat.",
    },
  },
  'action-plan': {
    title: "Plano ng Aksyon",
    shortDescription:
      "Pagpaplano sa operasyon, mga protokol sa pagtugon, at ang balangkas ng EMS action plan.",
    content: `Ang EMS Action Plan ay isang sistematikong balangkas na ginagabay ang mga responder sa bawat yugto ng emergency response, mula sa dispatch hanggang sa post-call documentation. Sa Philippine EMS system, ang action plan ay nagsisiguro na walang kritikal na hakbang ang nakaligtaan at ang lahat ng miyembro ng koponan ay nag-o-operate nang may pagkakaunawa sa mga priyoridad at pamamaraan. Ang pamantayang action plan ay sumusunod sa pagkakasunod-sunod: Receive Dispatch → En Route → Arrival and Scene Size-Up → Patient Assessment → Treatment → Transport → Turnover → Documentation → Post-Call Review. Bawat yugto ay may mga tiyak na gawain, decision points, at komunikasyon na kinakailangan na dapat isagawa nang pare-pareho.

Ang scene size-up ay marahil ang pinakakritikal na yugto ng action plan, dahil tinutukoy nito ang kaligtasan at estratehiya ng buong response. Ang scene size-up ay nagsisimula bago ka bumaba sa ambulansya: obserbahan ang eksena para sa mga panganib (trapiko, sunog, bagsak na power lines, HAZMAT, karahasan), tukuyin ang mechanism of injury (MOI) o nature of illness (NOI), tantyahin ang bilang ng mga pasyente, at kilalanin ang pangangailangan para sa karagdagang resources. Sa konteksto ng Pilipinas, ang mga panganib sa eksena ay maaaring kabilangan ang hindi matatag na istraktura pagkatapos ng lindol, pagbaha sa panahon ng bagyo, vehicular traffic sa mga abalang highway, at mga potensyal na mararahas na sitwasyon. Ang pinakamahalagang tuntunin ay: scene safety muna—hindi ka makakatulong sa iba kung ikaw rin ay maging pasyente. Kung ang eksena ay hindi ligtas, mag-stage sa ligtas na distansya at humingi ng angkop na resources (police, fire, HAZMAT) bago lumapit.

Ang konsepto ng "Golden Hour" at "Platinum 10 Minutes" ay sentral sa pagpaplano ng EMS operations. Ang Golden Hour ay tumutukoy sa kritikal na 60-minutong bintana mula sa oras ng pinsala hanggang sa definitive care, kung saan ang mortality rate ay makabuluhang tumaas kapag naantala ang paggamot. Ang Platinum 10 Minutes ay nagbibigay-diin na ang pinakakritikal na interbensyon—airway management, hemorrhage control, at spinal immobilization—ay dapat gawin sa loob ng unang 10 minuto sa eksena. Sa Pilipinas, kung saan ang transport times ay maaaring pahabain ng traffic congestion, kondisyon ng kalsada, at distansya mula sa trauma centers, ang mga time frame na ito ay nagbibigay-diin sa kahalagahan ng epektibong scene management at mabilis na desisyon sa transport.

Ang triage ay isang mahalagang kasanayan sa operasyon kapag ang maraming pasyente ay lumampas sa available na resources. Ang START (Simple Triage and Rapid Treatment) method ay nagkakategorya ng mga pasyente sa apat na grupo: Immediate (Red), Delayed (Yellow), Walking Wounded (Green), at Deceased/Expectant (Black). Sa mass casualty incidents (MCIs) sa panahon ng mga kalamidad sa Pilipinas—bagyo, lindol, landslide—ang mga desisyon sa triage ay dapat gawin nang mabilis at объективно, inilaan ang limitadong resources upang iligtas ang pinakamaraming buhay. Ang Incident Command System (ICS) ay nagbibigay ng organisational structure para sa pagpapamahala ng MCIs, na may malinaw na tinukoy na mga papel para sa Incident Commander, Operations Section, Logistics, Planning, at Administration.

Ang komunikasyon at koordinasyon ang pandikit na nagbibigkis sa action plan. Sa Philippine EMS system, ang radio communication ay sumusunod sa standardized protocols gamit ang AMATS (Ambulance Medical Assistance and Transfer System) network. Lahat ng komunikasyon ay dapat na malinaw, maikli, at sumunod sa SBAR format: Situation, Background, Assessment, Recommendation. Kapag tumatawag sa ospital o medical direction, kilalanin ang iyong sarili, sabihin ang iyong unit, ibigay ang kondisyon ng pasyente at vital signs, ilarawan ang mga interbensyong ginawa, at sabihin ang iyong hinihingi. Ang epektibong komunikasyon ay nakababawas ng mga error, nagpapadali sa maayos na patient turnover, at nagsisiguro sa continuity of care mula sa field hanggang sa emergency department.`,
    keyPoints: [
      "Pagkakasunod-sunod ng Action Plan: Dispatch → En Route → Scene Size-Up → Assess → Treat → Transport → Turnover",
      "Scene size-up: safety muna, MOI/NOI, bilang ng pasyente, pangangailangan sa resources—bago makipag-ugnayan sa pasyente",
      "Golden Hour: definitive care sa loob ng 60 minuto; Platinum 10 Minutes: kritikal na interbensyon sa 10 min",
      "START Triage: Immediate (Red), Delayed (Yellow), Walking Wounded (Green), Expectant (Black)",
      "Ang ICS (Incident Command System) ay ang pamantayang balangkas para sa MCI at disaster management",
      "SBAR communication: Situation, Background, Assessment, Recommendation",
      "Huwag kailanman pumasok sa hindi ligtas na eksena—mag-stage at humingi ng angkop na resources muna",
      "Epektibong oras sa eksena + mabilis na transport = pinabuting kinalabasan ng pasyente",
    ],
    outcomes: [
      "Isagawa ang pagkakasunod-sunod ng EMS action plan",
      "Magsagawa ng tamang scene size-up",
      "Iaplay ang START triage method",
      "Makipagkomunikasyon gamit ang SBAR format",
    ],
    whatYoullLearn: [
      "📋 Mga Hakbang sa Action Plan",
      "🔍 Scene Size-Up",
      "🏷️ START Triage",
      "📡 SBAR Communication",
      "⏰ Konsepto ng Golden Hour",
    ],
    quickNotes: {
      keyTerms: ["Scene size-up", "MOI/NOI", "Golden Hour", "START", "SBAR", "ICS"],
      protocols: [
        "Scene safety MUNA",
        "START: maglakad → huminga → perfuse → mental",
        "SBAR: Situation, Background, Assessment, Recommendation",
      ],
      commonMistakes: [
        "Pumasok sa hindi ligtas na eksena",
        "Gumamot bago mag-triage sa MCI",
        "Mahinang komunikasyon sa ospital",
      ],
      mnemonics: [
        "SBAR = Situation, Background, Assessment, Recommendation",
        "START = Simple Triage and Rapid Treatment",
      ],
      summary: "Action Plan: Dispatch → Size-Up → Assess → Treat → Transport. Scene safety muna. START triage para sa MCI. SBAR para sa komunikasyon. Golden Hour = 60 min hanggang definitive care.",
    },
  },
  'amats': {
    title: "AMATS",
    shortDescription:
      "Ambulance Medical Assistance and Transfer System — ang network ng koordinasyon ng EMS sa Pilipinas.",
    content: `Ang Ambulance Medical Assistance and Transfer System (AMATS) ay ang standardized framework ng Pilipinas para sa pagko-coordinate ng emergency medical transport at inter-facility transfers. Itinatag sa ilalim ng Department of Health Administrative Orders at naaayon sa National EMS Framework, ang AMATS ay nagbibigay ng istrukturadong sistema para sa pag-dispatch ng mga ambulansya, pagko-coordinate ng medikal na tulong, at pagsisiguro na ang mga pasyente ay nakakatanggap ng angkop na pangangalaga habang nasa transport. Ang pag-unawa sa AMATS ay mahalaga para sa bawat EMS provider, dahil tinutukoy nito ang mga protokol sa komunikasyon, pamamaraan sa dispatch, at mekanismo ng koordinasyon na namamahala sa pang-araw-araw na operasyon ng EMS sa buong bansa.

Ang AMATS ay nag-o-operate sa maraming antas: ang national AMATS center ay nagko-coordinate ng resources sa panahon ng large-scale na emergency at kalamidad, habang ang regional at lokal na AMATS units ay humahawak ng pang-araw-araw na emergency dispatch at inter-facility transfers. Ang sistema ay nag-iintegrate sa NDRRMC sa panahon ng disaster responses at sa lokal na Emergency Operations Centers (EOCs) para sa routine operations. Kapag may tumatawag—maging sa pamamagitan ng national emergency hotline (911), lokal na emergency numbers, o hospital-to-hospital requests—ang AMATS dispatcher ay tumutukoy ng angkop na response batay sa kalikasan at kalubhaan ng emergency, availability ng mga ambulansya at personal, at lapit ng receiving facilities.

Ang AMATS dispatch protocol ay sumusunod sa priority-based system. Ang Priority 1 (Emergent) responses ay sangkot sa life-threatening conditions na nangangailangan ng agarang response na may lights and sirens. Ang Priority 2 (Urgent) responses ay sangkot sa seryoso ngunit hindi agad-agad na life-threatening conditions na nangangailangan ng prompt ngunit hindi emergency response. Ang Priority 3 (Non-emergent) responses ay sangkot sa non-urgent na sitwasyon tulad ng scheduled inter-facility transfers o medical standby duties. Bawat antas ng priyoridad ay may kaukulang response time standards, crew configuration requirements, at documentation protocols. Ang pag-unawa sa mga priyoridad na ito ay nagsisiguro na ang resources ay inilaan nang epektibo at ang pinakakritikal na mga pasyente ay nakakatanggap ng pinakamabilis na response.

Ang inter-facility transfer ay isang mahalagang tungkulin ng AMATS na nangangailangan ng maingat na koordinasyon sa pagitan ng sending facility, receiving facility, at transporting EMS crew. Ang transfer ay dapat na awtorisado ng physician sa sending facility, ang receiving facility ay dapat kumpirmahin ang pagtanggap, at ang EMS crew ay dapat beripikahin na ang kanilang antas ng pagsasanay at kagamitan ay angkop sa kondisyon ng pasyente habang nasa transport. Ang protokol ng AMATS ay nangangailangan ng dokumentasyon ng dahilan ng transfer, kondisyon ng pasyente, at lahat ng komunikasyon. Sa setting ng Pilipinas, ang inter-facility transfers ay kadalasang sangkot sa paglipat ng mga pasyente mula sa rural health units o district hospitals patungo sa tertiary care centers sa urban areas—isang proseso na maaaring tumagal ng oras at nangangailangan ng masusing pagpaplano para sa kaligtasan ng pasyente.

Ang komunikasyon sa loob ng AMATS network ay sumusunod sa standardized radio protocols para siguraduhin ang kalinawan at kahusayan. Lahat ng AMATS communication ay gumagamit ng designated frequencies at sumusunod sa call sign system para sa unit identification. Ang pamantayang format ng komunikasyon ay kabilangan ng: unit identification, lokasyon, patient status report, at request o notification. Kapag nakikipag-usap sa medical direction, ang mga EMS provider ay dapat magbigay ng maikling pasyente report kabilang ang SAMPLE history, vital signs, intervensyong ginawa, at reaksyon ng pasyente sa paggamot. Sa mga lugar na may limitadong radio coverage—karaniwan sa rural at matataas na rehiyon ng Pilipinas—ang AMATS ay maaaring gumamit ng cellular phones, satellite communications, o relay systems upang mapanatili ang kontak sa pagitan ng field units at dispatch centers.`,
    keyPoints: [
      "AMATS = Ambulance Medical Assistance and Transfer System — ang pambansang EMS coordination framework",
      "Tatlong antas ng priyoridad: Priority 1 (Emergent), Priority 2 (Urgent), Priority 3 (Non-emergent)",
      "Ang national AMATS ay nagko-coordinate ng disaster responses; ang lokal na AMATS ay humahawak ng pang-araw-araw na dispatch at transfers",
      "Ang inter-facility transfers ay nangangailangan ng physician authorization, receiving facility acceptance, at tamang crew",
      "Standardized radio protocols na may designated frequencies at call sign identification",
      "Ang AMATS ay nag-iintegrate sa NDRRMC at lokal na Emergency Operations Centers sa panahon ng kalamidad",
      "Format ng komunikasyon: unit ID → lokasyon → patient status → request/notification",
      "Sa mga malalayong lugar, ang AMATS ay maaaring gumamit ng cellular, satellite, o relay communication systems",
    ],
    outcomes: [
      "Maipaliwanag ang istruktura at tungkulin ng AMATS",
      "Tukuyin nang tama ang mga priyoridad sa pagtugon",
      "Isagawa ang mga protokol sa inter-facility transfer",
      "Gumamit ng pamantayang format ng radio komunikasyon",
    ],
    whatYoullLearn: [
      "📡 Pangkalahatang-ideya ng AMATS",
      "🚨 Mga Antas ng Priyoridad",
      "🏥 Inter-Facility Transfer",
      "📻 Mga Protokol sa Radio",
      "🗺️ Lokal vs Pambansang AMATS",
    ],
    quickNotes: {
      keyTerms: ["AMATS", "Priority 1/2/3", "Inter-facility transfer", "EOC", "911"],
      protocols: [
        "P1 = lights & sirens",
        "Ang transfer ay nangangailangan ng physician auth + receiving acceptance",
        "Unit ID → lokasyon → status → request",
      ],
      commonMistakes: [
        "Maling klasipikasyon ng priyoridad",
        "Naglilipat nang walang physician authorization",
        "Mahinang radio komunikasyon",
      ],
      mnemonics: ["AMATS = Ambulance Medical Assistance & Transfer System"],
      summary: "Nagko-coordinate ang AMATS ng EMS dispatch at transfers. 3 priyoridad: Emergent, Urgent, Non-emergent. Ang transfers ay nangangailangan ng physician auth. May naaangkop na standard radio protocols.",
    },
  },
  'assessment-procedure': {
    title: "Assessment & Pamamaraan",
    shortDescription:
      "Mga sistematikong pamamaraan sa patient assessment at klinikal na kasanayan para sa mga EMS provider.",
    content: `Ang patient assessment ay ang pangunahing klinikal na kasanayan na nagsisilbing pundasyon ng buong kasanayan sa EMS. Ang sistematiko at masusing assessment ay nagsisiguro na ang mga life-threatening conditions ay matukoy at gamutin ayon sa priyoridad, na walang mahalagang pagtuklas ang nakaliligtaan, at na ang angkop na paggamot at desisyon sa transport ay ginawa. Ang mga pamantayan sa kakayahan ng TESDA NCII ay nangangailangan na ang mga EMS First Responder ay maipakita ang kahusayan sa parehong medikal at trauma patient assessment, gamit ang standardized approaches na naaayon sa pandaigdigang pinakamahusay na kasanayan habang inangkop sa konteksto ng healthcare sa Pilipinas.

Ang primary survey (initial assessment) ay isinasagawa sa bawat pasyente at sumusunod sa ABCDE framework: Airway (na may cervical spine protection para sa trauma patients), Breathing, Circulation, Disability (neurological status gamit ang AVPU o GCS), at Exposure (na may environmental protection). Ang primary survey ay nagtutukoy at nagmamando ng agarang mga banta sa buhay. Ang isang pasyenteng may compromised airway ay dapat ma-open at mapanatili ang kanilang airway bago suriin ang paghinga. Ang isang pasyenteng hindi humihinga ay dapat ma-ventilate bago suriin ang sirkulasyon. Ang isang pasyenteng walang pulso ay nangangailangan ng CPR. Ang sistematikong pagpapatakdang ito ay nagsisiguro na ang mga pinakakritikal na problema ay natutugunan muna, sa bawat oras, nang walang pagkakaligtaan.

Ang secondary survey (focused assessment) ay isinasagawa lamang pagkatapos kumpleto ang primary survey at natugunan na ang lahat ng life threats. Ito ay kabilangan ng detalyadong head-to-toe physical examination, pagsukat ng vital signs, at pagkuha ng SAMPLE history (Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to illness/injury). Para sa trauma patients, ang DCAP-BTLS mnemonic ang gumagabay sa physical examination: Deformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling. Ang OPQRST ay ginagamit para suriin ang sakit: Onset, Provocation/Palliation, Quality, Radiation, Severity, Time. Ang mga sistematikong kagamitang ito ay nagsisiguro sa komprehensibong assessment at konsistenteng dokumentasyon.

Ang vital signs ay mga obhetibong pagsukat na nagbibigay ng kritikal na impormasyon tungkol sa physiological status ng pasyente. Kasama sa pamantayang vital signs: Blood Pressure (BP), Heart Rate (HR/Pulse), Respiratory Rate (RR), SpO2 (pulse oximetry), Temperature, at Pain Scale (0-10). Ang mga normal na saklaw ay nag-iiba ayon sa edad, at ang mga trend ay mas makahulugan kaysa sa isahang pagsukat. Halimbawa, ang blood pressure na 110/70 ay maaaring normal para sa ilang matanda ngunit kumakatawan sa relative hypotension sa pasyenteng ang baseline ay 160/100—na nagpapahiwatig ng potensyal na hemorrhagic shock. Sa setting ng EMS sa Pilipinas, kung saan ang mga pasyente ay maaaring may tropical diseases, environmental exposures, at chronic conditions na nakakaapekto sa vital signs, ang pag-unawa sa klinikal na kahalagahan ng abnormal na halaga ay mahalaga.

Espesyal na mga konsiderasyon sa assessment ay naaangkop sa pediatric patients, geriatric patients, at mga pasyenteng may komunikasyon na hadlang. Ang pediatric assessment ay sumusunod sa Pediatric Assessment Triangle (PAT): Appearance, Work of Breathing, Circulation to Skin. Ang mga geriatric patient ay maaaring may atypical presentations—myocardial infarction nang walang pananakit ng dibdib, impeksyon nang walang lagnat, at fractures mula sa minimal na trauma. Ang mga pasyenteng may language barriers, hearing impairments, o cognitive disabilities ay nangangailangan ng naangkop na mga pamamaraan sa komunikasyon. Sa Pilipinas, na may diverse linguistic landscape (mahigit 170 wika), ang mga EMS provider ay dapat maging handa na gumamit ng alternatibong mga pamamaraan sa komunikasyon, kabilang ang translation apps, visual aids, at tulong mula sa mga miyembro ng pamilya o bystander, habang pa rin nagsasagawa ng masusing at tumpak na assessment.`,
    keyPoints: [
      "Primary Survey: ABCDE (Airway, Breathing, Circulation, Disability, Exposure)—gamutin ang life threats muna",
      "Secondary Survey: head-to-toe exam, vital signs, SAMPLE history—lamang pagkatapos kumpleto ang primary survey",
      "SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events",
      "DCAP-BTLS: Deformities, Contusions, Abrasions, Punctures, Burns, Tenderness, Lacerations, Swelling",
      "OPQRST: Onset, Provocation, Quality, Radiation, Severity, Time—sistematikong pagsusuri sa sakit",
      "Vital signs: BP, HR, RR, SpO2, Temp, Pain—ang mga trend ay mas makahulugan kaysa sa isahang pagbasa",
      "Pediatric Assessment Triangle: Appearance, Work of Breathing, Circulation to Skin",
      "Iangkop ang assessment para sa geriatric atypical presentations at mga pasyenteng may komunikasyon na hadlang",
    ],
    outcomes: [
      "Magsagawa ng sistematikong primary survey (ABCDE)",
      "Magsagawa ng masusing secondary survey",
      "Iaplay ang mga kagamitang SAMPLE, OPQRST, DCAP-BTLS",
      "Iangkop ang assessment para sa mga espesyal na populasyon",
    ],
    whatYoullLearn: [
      "🫁 Primary Survey (ABCDE)",
      "🔍 Secondary Survey",
      "📝 SAMPLE & OPQRST",
      "🩺 Vital Signs",
      "👶 Mga Espesyal na Populasyon",
    ],
    quickNotes: {
      keyTerms: ["ABCDE", "SAMPLE", "OPQRST", "DCAP-BTLS", "AVPU", "GCS", "PAT"],
      protocols: [
        "Primary survey MUNA palagi",
        "SAMPLE para sa history",
        "DCAP-BTLS para sa trauma exam",
        "Trends > isahang pagbasa para sa vitals",
      ],
      commonMistakes: [
        "Nakakaligtaan ang primary survey",
        "Hindi sinusuri ang distal PSM",
        "Binabalewala ang atypical presentations sa matatanda",
      ],
      mnemonics: [
        "ABCDE = Airway, Breathing, Circulation, Disability, Exposure",
        "SAMPLE = Signs, Allergies, Meds, Past, Last intake, Events",
        "OPQRST = Onset, Provocation, Quality, Radiation, Severity, Time",
      ],
      summary: "Primary survey (ABCDE) → gamutin ang life threats → secondary survey. SAMPLE para sa history. OPQRST para sa sakit. DCAP-BTLS para sa trauma. Ang mga trend ay mas makahulugan kaysa sa isahang vital signs.",
    },
  },
  'chain-of-survival': {
    title: "Chain of Survival",
    shortDescription:
      "Ang AHA Chain of Survival — ang kritikal na pagkakasunod-sunod para sa pamamahala ng cardiac arrest.",
    content: `Ang Chain of Survival ay ang konseptuwal na balangkas ng American Heart Association (AHA) para sa pag-optimize ng kinalabasan mula sa out-of-hospital cardiac arrest (OHCA). Orihinal na isang 4-link chain na ipinakilala noong 1991, ito ay umunlad sa pamamagitan ng mga sunod-sunod na AHA guidelines—na lumawak sa 5 links noong 2010 at sa kasalukuyang 6-link In-Hospital at Out-of-Hospital Chains of Survival sa 2020/2025 AHA Guidelines. Bawat link ay kumakatawan sa isang kritikal na aksyon na dapat mangyari sa pagkakasunod-sunod, at ang lakas ng chain ay nakadepende sa pinakamahinang link nito. Sa konteksto ng EMS sa Pilipinas, kung saan ang survival rates sa cardiac arrest ay nananatiling makabuluhang mas mababa kaysa sa mga maunlad na bansa, ang pag-unawa at pagpapatibay sa bawat link ay isang usapin ng buhay at kamatayan.

Ang AHA 2025 Guidelines ay pinapanatili ang 6-link Out-of-Hospital Chain of Survival na itinatag noong 2020, na may na-update na ebidensya at pinakinis na mga rekomendasyon. Paghahambingin ang 2020 at 2025 na bersyon: LINK 1 — "Early Access and Notification" (2020) ay pinakinis noong 2025 upang bigyang-diin ang dispatcher-assisted CPR at mabilis na pagkilala sa cardiac arrest, na may mas malakas na ebidensya na sumusuporta sa papel ng emergency medical dispatchers (EMDs) sa paggabay sa bystander CPR. LINK 2 — "Early CPR with Emphasis on Chest Compressions" ay nananatiling pare-pareho, ngunit ang 2025 guidelines ay higit na nagpapatibay sa kritikal na kahalagahan ng pagsisimula ng chest compressions sa loob ng unang mga sandali, na may dispatcher coaching para sa mga hindi sanay na rescuer. Ang 2025 update ay nagbibigay ng karagdagang ebidensya na ang compression-only CPR ng bystander ay nakabubuo ng kinalabasan na katumbas ng conventional CPR para sa adult OHCA.

LINK 3 — "Early Defibrillation" ay patuloy na nagbibigay-diin na ang survival ay bumababa ng humigit-kumulang 7-10% sa bawat minutong naantala ang defibrillation. Ang 2025 guidelines ay nagpapatibay ng mga rekomendasyon para sa public access defibrillation (PAD) programs at nabanggit na sa setting ng Pilipinas, kung saan limitado ang availability ng AED sa mga pampublikong lugar, ang mga EMS provider ay dapat mag-prioritize ng mabilis na AED application sa pagdating. Ang paglalagay ng community AED sa mga mataong lugar (malls, transport hubs, government offices) ay isang pangunahing estratehiya. LINK 4 — "Advanced Resuscitation" (2020: "Effective Advanced Life Support") ay na-update noong 2025 na may pinakinis na rekomendasyon sa timing ng gamot—ang epinephrine ay dapat ibigay nang maaga hangga't maaari para sa non-shockable rhythms, at ang antiarrhythmic administration ay inirerekomenda pagkatapos ng pangalawang shock para sa shockable rhythms. Ang double-sequential defibrillation ay tinalakay bilang konsiderasyon para sa refractory VF.

LINK 5 — "Post-Cardiac Arrest Care" ang may pinakamahalagang mga update noong 2025. Ang guidelines ay ngayon ay nagbibigay-diin sa targeted temperature management (TTM) na may inirerekomendang saklaw na 32-37.5°C, na nagbibigay ng flexibility batay sa mga factor ng pasyente. Ang neuroprognostication ay dapat gawin nang hindi mas maaga sa 72 oras pagkatapos ng ROSC, gamit ang multimodal approach. Ang maagang cardiac catheterization ay inirerekomenda para sa mga pasyenteng may ST-elevation sa post-ROSC ECG. LINK 6 — "Recovery" ay idinagdag noong 2020 at nananatiling kritikal na bahagi noong 2025, na nagbibigay-diin na ang survival hanggang sa hospital discharge ay hindi ang endpoint. Ang 2025 guidelines ay nagpapatibay ng mga rekomendasyon para sa follow-up ng mga nakaligtas sa cardiac arrest, kabilang ang cognitive assessment, psychological support, at rehabilitation—kinikilala na maraming nakaligtas ang nahaharap sa mahahalagang pangmatagalang hamon kabilang ang mga problema sa memorya, anxiety, depression, at post-traumatic stress.

Para sa Philippine EMS system, ang pagpapatupad ng Chain of Survival ay nahaharap sa mga natatanging hamon. Ang community CPR training rates ay nananatiling mababa sa kabila ng RA 10871 na nagtatakda ng BLS sa mga paaralan. Ang availability ng AED sa mga pampublikong lugar ay lubhang limitado kumpara sa mga maunlad na bansa. Ang transport times patungo sa mga ospital na kayang magbigay ng post-cardiac arrest care (kabilang ang TTM at cardiac catheterization) ay maaaring mahaba. Gayunpaman, may pag-unlad: ang 911 emergency number ay unti-unting ipinapatupad sa buong bansa, ang AMATS ay nagpapabuti sa dispatch at koordinasyon, at ang TESDA NCII training ay gumagawa ng mas maraming kwalipikadong first responder. Ang pagpapatibay sa Chain of Survival sa Pilipinas ay nangangailangan ng systems approach—investimento sa public education, AED deployment, EMS workforce development, hospital capacity building, at survivor support programs—na lahat ay nagtatrabaho nang magkakasama bilang integrated na mga link sa isang chain na makakaligtas ng libo-libong buhay bawat taon.`,
    keyPoints: [
      "6-Link Chain (AHA 2020/2025): 1-Early Access, 2-Early CPR, 3-Early Defibrillation, 4-Advanced Resuscitation, 5-Post-Cardiac Arrest Care, 6-Recovery",
      "Link 1 (2025 update): Dispatcher-assisted CPR na may mas malakas na ebidensya para sa EMD-guided bystander intervention",
      "Link 2 (2025 update): Ang compression-only CPR ay katumbas ng conventional CPR para sa adult OHCA bystander response",
      "Link 3: Ang survival ay bumababa ng 7-10% kada minuto nang walang defibrillation—ang PAD programs ay kritikal",
      "Link 4 (2025 update): Maagang epinephrine para sa non-shockable rhythms; antiarrhythmics pagkatapos ng 2nd shock para sa VF",
      "Link 5 (2025 update): TTM range 32-37.5°C; neuroprognostication sa ≥72 oras gamit ang multimodal approach",
      "Link 6: Ang Recovery ay kabilangan ng cognitive assessment, psychological support, at rehabilitation para sa mga nakaligtas",
      "Mga hamon sa Pilipinas: mababang community CPR rates, limitadong AED access, mahabang transport sa definitive care",
    ],
    outcomes: [
      "Maalala ang lahat ng 6 links ng AHA 2025 Chain",
      "Ihambing ang AHA 2020 vs 2025 updates",
      "Maunawaan ang mga factor sa survival rate",
      "Matukoy ang mga hamong tukoy sa Pilipinas",
    ],
    whatYoullLearn: [
      "🔗 6 Links of Survival",
      "📊 2020 vs 2025 Updates",
      "⚡ Timing ng Defibrillation",
      "❄️ Saklaw ng TTM",
      "🇵🇭 Hamon & Solusyon sa PH",
    ],
    quickNotes: {
      keyTerms: ["Chain of Survival", "ROSC", "TTM", "AED", "PAD", "Dispatcher CPR"],
      protocols: [
        "Ang survival ay bumababa ng 7-10%/min nang walang defibrillation",
        "TTM: 32-37.5°C",
        "Neuroprognostication ≥72 oras",
        "Ang compression-only CPR ay OK para sa bystanders",
      ],
      commonMistakes: [
        "Pag-antala sa defibrillation",
        "Paggamit ng lumang 5-link chain",
        "Pagtigil sa ROSC (nakakaligtaan ang Recovery link)",
      ],
      mnemonics: [
        "6 Links: Early Access → Early CPR → Early Defib → Advanced Resuscitation → Post-Arrest Care → Recovery",
      ],
      summary: "6-link Chain: Access → CPR → Defibrillation → Advanced → Post-Arrest → Recovery. 7-10% survival drop kada minuto. TTM 32-37.5°C. Mga hamon sa PH: mababang CPR rates, limitadong AEDs.",
    },
  },
}
