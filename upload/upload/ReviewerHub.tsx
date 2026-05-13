'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Clock,
  Star,
  ListChecks,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { COMPETENCIES } from '@/data/ems-constants';
import { getProgress, markModuleCompleted } from '@/lib/storage/local-storage';

const COMPETENCY_CONTENT: Record<string, CompetencyContent> = {
  bls: {
    overview: 'Basic Life Support (BLS) is the foundation of emergency medical care. It includes skills for maintaining circulation, airway, and breathing in emergency situations.',
    keyPoints: [
      'Scene safety is always the first priority',
      'Follow DRABC: Danger, Response, Airway, Breathing, Circulation',
      'Call for help early - activate emergency response',
      'Begin CPR within 10 seconds of identifying cardiac arrest',
      'Minimize interruptions to chest compressions',
      'Allow chest recoil after each compression',
    ],
    procedures: [
      {
        title: 'Scene Size-Up',
        steps: [
          'Approach scene cautiously',
          'Check for hazards (fire, traffic, electrical, violence)',
          'Determine number of patients',
          'Call for additional resources if needed',
          'Put on PPE before patient contact',
        ],
      },
      {
        title: 'Primary Survey (DRABC)',
        steps: [
          'D - Check for Danger',
          'R - Check for Response (tap and shout)',
          'A - Open Airway (head-tilt chin-lift)',
          'B - Check Breathing (look, listen, feel for 10 seconds)',
          'C - Check Circulation (carotid pulse for 10 seconds)',
        ],
      },
      {
        title: 'CPR Initiation',
        steps: [
          'Place patient on hard surface on their back',
          'Position hands at center of chest',
          'Push hard and fast (100-120/min)',
          'Compress at least 2 inches deep',
          'Allow full chest recoil',
          'Minimize interruptions',
        ],
      },
      {
        title: 'AED Use',
        steps: [
          'Turn on AED',
          'Attach pads to patient\'s bare chest',
          'Follow voice prompts',
          'Clear patient during analysis',
          'Clear patient before shock delivery',
          'Resume CPR immediately after shock if no pulse',
        ],
      },
    ],
    assessorQuestions: [
      'What is your first action on arriving at a scene?',
      'Explain the DRABC assessment sequence',
      'What are the proper compression depth and rate?',
      'When do you apply AED pads?',
      'What do you do if AED says "no shock advised"?',
    ],
    tips: [
      'Remember "Stayin\' Alive" beat for compression rate (100-120/min)',
      'Count compressions out loud to maintain rate',
      'Use two-rescuer technique if available for better CPR quality',
      'Always check scene safety before approaching any patient',
    ],
  },
  cpr: {
    overview: 'Cardiopulmonary Resuscitation (CPR) is an emergency procedure that combines chest compressions with artificial ventilation to manually preserve intact brain function.',
    keyPoints: [
      'CPR ratio for adults: 30 compressions to 2 breaths',
      'CPR ratio for children: 30 compressions to 2 breaths',
      'CPR ratio for infants: 30 compressions to 2 breaths',
      'Compression rate: 100-120 per minute for all ages',
      'Compression depth: At least 2 inches for adults, 1.5 inches for children',
      'Allow complete chest recoil between compressions',
      'Minimize interruptions to compressions',
    ],
    procedures: [
      {
        title: 'Adult CPR',
        steps: [
          'Ensure scene is safe',
          'Check responsiveness',
          'Call for help/activate emergency response',
          'Check breathing and pulse simultaneously (no more than 10 seconds)',
          'If no breathing/pulse: Begin 30 chest compressions',
          'Open airway, give 2 rescue breaths',
          'Continue 30:2 cycles until help arrives/AED available',
        ],
      },
      {
        title: 'Child CPR (1 year to puberty)',
        steps: [
          'Ensure scene safety',
          'Check responsiveness',
          'Call for help',
          'Check breathing and pulse (brachial for children)',
          'If no breathing/pulse: Give 5 rescue breaths',
          'Begin 30 chest compressions (use one or two hands)',
          'Give 2 rescue breaths',
          'Continue 30:2 cycles',
        ],
      },
      {
        title: 'Infant CPR (under 1 year)',
        steps: [
          'Ensure scene safety',
          'Check responsiveness (tap foot)',
          'Shout for help',
          'Check breathing and pulse (brachial)',
          'If no breathing/pulse: Give 5 rescue breaths',
          'Begin 30 chest compressions using 2 fingers',
          'Give 2 rescue breaths',
          'Continue 30:2 cycles',
        ],
      },
    ],
    assessorQuestions: [
      'What is the CPR ratio for adults?',
      'What is the CPR ratio for children and infants?',
      'How do you check responsiveness in an infant?',
      'Where do you check pulse in an adult vs child vs infant?',
      'What is the difference between adult and child compression depth?',
    ],
    tips: [
      'For infants: Use two fingers in center of chest, just below nipple line',
      'For children: Use one or two hands as needed to achieve adequate depth',
      'For adults: Use both hands, interlocked, heel of hand on center of chest',
      'Let chest fully recoil between compressions',
      'Count compressions out loud: "One and two and three and..."',
    ],
  },
  assessment: {
    overview: 'Patient Assessment is a systematic approach to evaluating a patient\'s condition. It includes primary survey (life threats) and secondary survey (detailed exam).',
    keyPoints: [
      'Primary survey identifies and treats immediate life threats',
      'Secondary survey is a head-to-toe examination',
      'SAMPLE history provides crucial medical background',
      'OPQRST characterizes pain complaints',
      'Vital signs establish baseline and monitor changes',
      'Reassessment detects changes in patient condition',
    ],
    procedures: [
      {
        title: 'SAMPLE History',
        steps: [
          'S - Signs and Symptoms: What do you see? What does patient feel?',
          'A - Allergies: Any medication or environmental allergies?',
          'M - Medications: Current prescriptions, OTC, herbal supplements?',
          'P - Past Medical History: Chronic conditions, surgeries, hospitalizations?',
          'L - Last Oral Intake: When did they last eat or drink?',
          'E - Events: What happened? How did it happen?',
        ],
      },
      {
        title: 'OPQRST Pain Assessment',
        steps: [
          'O - Onset: When did it start? Sudden or gradual?',
          'P - Provocation: What makes it better or worse?',
          'Q - Quality: Describe the sensation (sharp, dull, burning, crushing)?',
          'R - Region/Radiation: Where is it? Does it spread?',
          'S - Severity: Pain scale 1-10?',
          'T - Time: How long has it lasted? Constant or intermittent?',
        ],
      },
      {
        title: 'Vital Signs Measurement',
        steps: [
          'Blood Pressure: Use appropriate cuff size, patient at rest',
          'Heart Rate: Palpate radial or carotid for 30 seconds',
          'Respiratory Rate: Observe chest rise for 30 seconds',
          'SpO2: Apply pulse oximeter, note reading',
          'Temperature: Use appropriate method (oral, tympanic, temporal)',
          'Pain Scale: Ask patient to rate 0-10',
          'Capillary Refill: Press nail bed, note return time',
          'Skin Condition: Note color, temperature, moisture',
        ],
      },
    ],
    assessorQuestions: [
      'What does SAMPLE stand for?',
      'What does OPQRST stand for?',
      'What are normal vital sign ranges for adults?',
      'Why is reassessment important?',
      'When do you perform secondary survey?',
    ],
    tips: [
      'Take SAMPLE history from patient if conscious, bystanders/family if not',
      'Use OPQRST for any pain complaint',
      'Measure vital signs at least every 5 minutes for unstable patients',
      'Document everything - you can\'t remember later',
      'Compare vital signs to baseline to detect changes',
    ],
  },
  trauma: {
    overview: 'Trauma Management involves assessment and treatment of physical injuries. Priority is to prevent further harm and manage life threats.',
    keyPoints: [
      'C-spine precautions until injury is ruled out',
      'Control life-threatening hemorrhage first',
      'Airway takes priority over bleeding control if compromised',
      'Rapid trauma assessment using XABC approach',
      'Treat shock early - prevent before it develops',
      'Consider mechanism of injury when assessing',
    ],
    procedures: [
      {
        title: 'Hemorrhage Control',
        steps: [
          'Apply direct pressure to wound',
          'Elevate injured extremity if possible',
          'Use pressure points if direct pressure ineffective',
          'Apply tourniquet for life-threatening extremity bleeding',
          'Document tourniquet time',
          'Pack wound if needed',
        ],
      },
      {
        title: 'Fracture Management',
        steps: [
          'Assess distal CSM before and after splinting',
          'Immobilize joint above and below fracture',
          'Splint in position found unless dangerous',
          'Pad splint to prevent pressure points',
          'Check CSM after splinting',
          'Secure splint properly',
        ],
      },
      {
        title: 'Shock Management',
        steps: [
          'Lay patient supine',
          'Control any bleeding',
          'Maintain airway',
          'Provide oxygen if indicated',
          'Keep patient warm (prevent hypothermia)',
          'Elevate legs 12 inches if no spinal injury',
          'Do not give anything by mouth',
        ],
      },
    ],
    assessorQuestions: [
      'What are the priorities in trauma management?',
      'When do you apply tourniquet?',
      'How do you assess circulation distal to injury?',
      'What are the stages of shock?',
      'When is C-spine immobilization required?',
    ],
    tips: [
      'Remember MARCH: Massive hemorrhage, Airway, Respiration, Circulation, Hypothermia/Head injury',
      'Always assume C-spine injury with significant mechanism',
      'Time is critical in trauma - rapid assessment and treatment',
      'Reassess frequently - trauma patients can deteriorate quickly',
    ],
  },
  medical: {
    overview: 'Medical Emergencies include conditions like cardiac, respiratory, neurological, diabetic, and other non-traumatic emergencies.',
    keyPoints: [
      'Differentiate cardiac vs respiratory distress',
      'Consider diabetic emergencies in altered mental status',
      'Use FAST assessment for stroke symptoms',
      'Chest pain = cardiac until proven otherwise',
      'Asthma/COPD = bronchodilator first',
      'Anaphylaxis = epinephrine immediately',
    ],
    procedures: [
      {
        title: 'Cardiac Emergency',
        steps: [
          'Assess chest pain characteristics',
          'Obtain SAMPLE and OPQRST',
          'Administer oxygen if SpO2 < 94%',
          'Monitor vital signs continuously',
          'Consider nitroglycerin if BP adequate and no contraindications',
          'Prepare for possible cardiac arrest',
        ],
      },
      {
        title: 'Stroke Assessment (FAST)',
        steps: [
          'F - Face: Ask to smile - one side drooping?',
          'A - Arms: Raise both arms - one drifting downward?',
          'S - Speech: Repeat phrase - slurred or strange?',
          'T - Time: Note time symptoms started - critical for treatment',
          'Activate stroke alert if FAST positive',
          'Transport to stroke-capable facility',
        ],
      },
      {
        title: 'Diabetic Emergency',
        steps: [
          'Check blood glucose immediately',
          'If hypoglycemic (<70 mg/dL) and able to swallow: Give oral glucose',
          'If hypoglycemic and unable to swallow: Administer glucagon IM',
          'If hyperglycemic (>300 mg/dL): Fluids only, transport',
          'Recheck glucose every 15 minutes',
          'Monitor for changes in level of consciousness',
        ],
      },
    ],
    assessorQuestions: [
      'What is the FAST assessment?',
      'How do you differentiate diabetic hyper vs hypoglycemia?',
      'What are contraindications for nitroglycerin?',
      'When do you suspect stroke vs cardiac?',
      'What is the treatment for anaphylaxis?',
    ],
    tips: [
      'Time is brain: Every minute counts in stroke',
      'Never assume altered mental status is due to drugs/alcohol - medical first',
      'Chest pain in elderly may present as atypical symptoms',
      'Diabetic patients can have hypoglycemia unawareness',
    ],
  },
  oxygen: {
    overview: 'Oxygen Therapy involves administering supplemental oxygen to patients with hypoxia or respiratory distress.',
    keyPoints: [
      'Normal SpO2: 95-100% on room air',
      'Hypoxia: SpO2 < 90% requires oxygen therapy',
      'COPD patients: May be hypoxic drive - monitor carefully',
      'High-flow devices: NRB, Venturi mask for precise concentrations',
      'Low-flow devices: Nasal cannula for long-term use',
      'Humidify oxygen for long-term administration',
    ],
    procedures: [
      {
        title: 'Oxygen Administration',
        steps: [
          'Select appropriate device based on patient condition',
          'Set prescribed flow rate',
          'Check device fit and seal',
          'Confirm oxygen delivery by checking flow meter',
          'Monitor SpO2 continuously',
          'Adjust flow as needed based on readings',
        ],
      },
      {
        title: 'Nasal Cannula Use',
        steps: [
          'Set flow 1-6 LPM',
          '1 LPM = 24%, each additional LPM adds 4%',
          'Prongs should point downward',
          'Tubing secured behind ears',
          'Check for skin breakdown on nares',
        ],
      },
      {
        title: 'Non-Rebreather Mask',
        steps: [
          'Set flow 12-15 LPM',
          'Ensure reservoir bag remains inflated',
          'Tight seal required for high concentration',
          'Delivers 90-95% oxygen with proper fit',
          'Monitor for CO2 retention in COPD patients',
        ],
      },
    ],
    assessorQuestions: [
      'What are the normal SpO2 ranges?',
      'What oxygen concentration does nasal cannula deliver at 2 LPM?',
      'What is the maximum flow for nasal cannula?',
      'When should you use NRB vs nasal cannula?',
      'What are the risks of oxygen therapy?',
    ],
    tips: [
      'Never withhold oxygen from hypoxic patient due to COPD concerns',
      'Check for smoking/vigorous heat sources near oxygen',
      'Oxygen supports combustion - keep away from flames',
      'Monitor patients on high-flow oxygen for CO2 retention',
    ],
  },
};

interface CompetencyContent {
  overview: string;
  keyPoints: string[];
  procedures: { title: string; steps: string[] }[];
  assessorQuestions: string[];
  tips: string[];
}

export function ReviewerHub() {
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'procedures' | 'questions' | 'tips'>('overview');

  const progress = getProgress();
  const modulesCompleted = progress?.modulesCompleted || [];

  const filteredCompetencies = COMPETENCIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentContent = selectedCompetency ? COMPETENCY_CONTENT[selectedCompetency] : null;
  const competencyProgress = selectedCompetency ? progress?.competencies[selectedCompetency] : null;

  const handleMarkComplete = () => {
    if (selectedCompetency && !modulesCompleted.includes(selectedCompetency)) {
      markModuleCompleted(selectedCompetency);
      setSelectedCompetency(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">EMS Reviewer Hub</h1>
        <p className="text-muted-foreground">
          Comprehensive study materials for TESDA EMS NCII
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search competencies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Competency Grid or Content */}
      <AnimatePresence mode="wait">
        {!selectedCompetency ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCompetencies.map((competency) => {
              const Icon = competency.icon;
              const isCompleted = modulesCompleted.includes(competency.id);
              const competencyProgress = progress?.competencies[competency.id];

              return (
                <motion.div
                  key={competency.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: COMPETENCIES.indexOf(competency) * 0.05 }}
                >
                  <Card
                    className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                    onClick={() => setSelectedCompetency(competency.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`h-12 w-12 rounded-lg ${competency.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <CardTitle className="mt-3">{competency.name}</CardTitle>
                      <CardDescription>{competency.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{competency.code}</Badge>
                          {competencyProgress && (
                            <Progress
                              value={competencyProgress.mastery}
                              className="w-24 h-2"
                            />
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button
              variant="ghost"
              onClick={() => setSelectedCompetency(null)}
              className="mb-4"
            >
              ← Back to Competencies
            </Button>

            {currentContent && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">
                        {COMPETENCIES.find(c => c.id === selectedCompetency)?.name}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {currentContent.overview}
                      </CardDescription>
                    </div>
                    {modulesCompleted.includes(selectedCompetency) && (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="procedures">
                        <ListChecks className="mr-1 h-4 w-4" />
                        Procedures
                      </TabsTrigger>
                      <TabsTrigger value="questions">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        Questions
                      </TabsTrigger>
                      <TabsTrigger value="tips">
                        <Star className="mr-1 h-4 w-4" />
                        Tips
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                          <ul className="space-y-2">
                            {currentContent.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex gap-2">
                                <CheckCircle2 className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                                <span className="text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {competencyProgress && (
                          <Card className="bg-muted/50">
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">Your Progress</p>
                                  <p className="text-2xl font-bold">{competencyProgress.mastery}%</p>
                                </div>
                                <Badge variant="outline">
                                  {competencyProgress.modulesCompleted}/{competencyProgress.totalModules} modules
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="procedures" className="mt-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-6">
                          {currentContent.procedures.map((procedure, idx) => (
                            <Card key={idx}>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  {idx + 1}. {procedure.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ol className="space-y-3">
                                  {procedure.steps.map((step, stepIdx) => (
                                    <li key={stepIdx} className="flex gap-3">
                                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                                        {stepIdx + 1}
                                      </div>
                                      <span className="text-sm">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="questions" className="mt-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-3">
                          {currentContent.assessorQuestions.map((question, idx) => (
                            <Card key={idx} className="border-l-4 border-l-orange-500">
                              <CardContent className="pt-4">
                                <div className="flex gap-2">
                                  <Badge variant="outline">Q{idx + 1}</Badge>
                                  <p className="text-sm">{question}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="tips" className="mt-6">
                      <div className="space-y-3">
                        {currentContent.tips.map((tip, idx) => (
                          <Card key={idx} className="bg-yellow-50 dark:bg-yellow-950">
                            <CardContent className="pt-4">
                              <div className="flex gap-3">
                                <Star className="mt-0.5 h-5 w-5 text-yellow-600 flex-shrink-0 fill-yellow-500" />
                                <p className="text-sm">{tip}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  {!modulesCompleted.includes(selectedCompetency) && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        size="lg"
                        onClick={handleMarkComplete}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        Mark Module as Complete
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
