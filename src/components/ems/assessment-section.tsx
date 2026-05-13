'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { questions } from '@/data/questions'
import { scenarios } from '@/data/scenarios'
import { assessmentScenes } from '@/data/assessment-scenes'
import {
  Play, Clock, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  RotateCcw, Trophy, AlertTriangle, ChevronDown, ChevronUp,
  Timer, ClipboardCheck, AlertOctagon, FileText, Flag,
  Shield, Heart, Stethoscope, Scale, Activity, Users,
  Pill, BookOpen, Sparkles, Target, Zap, Eye,
  MessageSquare, X, GraduationCap, Siren, ClipboardList,
  CalendarDays
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { RoleplaySection } from '@/components/ems/roleplay-section'
import { EmergencySimulation } from '@/components/ems/emergency-simulation'
import { SpeakerButton } from '@/components/ems/tts-button'
import { DailyChallengeSection } from '@/components/ems/daily-challenge-section'

// ==================== CATEGORY ICONS MAP ====================
const categoryIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'OSH': { icon: <Shield className="w-4 h-4" />, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  'First Aid': { icon: <Heart className="w-4 h-4" />, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  'BLS/CPR': { icon: <Activity className="w-4 h-4" />, color: 'text-ems-red dark:text-ems-red', bg: 'bg-red-100 dark:bg-red-900/30' },
  'Patient Assessment': { icon: <Stethoscope className="w-4 h-4" />, color: 'text-ems-teal dark:text-ems-teal', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  'Trauma': { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  'Medical Emergencies': { icon: <Heart className="w-4 h-4" />, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  'AMATS': { icon: <Users className="w-4 h-4" />, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  'Ambulance Management': { icon: <Siren className="w-4 h-4" />, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/30' },
  'Radio Communication': { icon: <MessageSquare className="w-4 h-4" />, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  'Legal/Ethical': { icon: <Scale className="w-4 h-4" />, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  'Drugs': { icon: <Pill className="w-4 h-4" />, color: 'text-green-500 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  'TESDA Standards': { icon: <BookOpen className="w-4 h-4" />, color: 'text-primary', bg: 'bg-primary/10' },
}

const categoryWhatYoullLearn: Record<string, string[]> = {
  'OSH': ['BSI & Standard Precautions', 'PPE selection & doffing', 'Occupational health laws (RA 11058)', 'Exposure management protocols'],
  'First Aid': ['Bleeding control & tourniquets', 'Burn management', 'Splinting & fracture care', 'Wound management principles'],
  'BLS/CPR': ['Compression technique & rate', 'AED operation', 'Rescue breathing', 'Choking management'],
  'Patient Assessment': ['ABCDE primary survey', 'SAMPLE & OPQRST history', 'GCS & AVPU scoring', 'Head-to-toe examination'],
  'Trauma': ['Hemorrhage control', 'Chest injury management', 'Spinal motion restriction', 'Shock recognition & treatment'],
  'Medical Emergencies': ['Stroke recognition (FAST)', 'Anaphylaxis management', 'Diabetic emergencies', 'Cardiac arrest protocols'],
  'AMATS': ['MCI triage & START', 'Incident Command System', 'Scene size-up & safety', 'Hazardous material zones'],
  'Ambulance Management': ['Patient transport & positioning', 'Emergency vehicle driving', 'Stretcher & lift operations', 'Ambulance inspection & maintenance'],
  'Radio Communication': ['Radio protocols & 10-codes', 'SBAR & closed-loop comms', 'PCR documentation', 'Crew resource management'],
  'Legal/Ethical': ['Consent & refusal laws', 'Documentation requirements', 'Scope of practice', 'Patient rights & confidentiality'],
  'Drugs': ['Medication routes & dosages', 'Epinephrine administration', 'Nitroglycerin protocols', 'Drug storage & handling'],
  'TESDA Standards': ['Competency assessment criteria', 'Training regulations', 'Certification requirements', 'Practical exam preparation'],
}

// ==================== QUIZ ENGINE ====================
type QuizMode = 'timed' | 'practice' | 'category' | 'diagnostic'

// Helper: Fisher-Yates shuffle for true randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function QuizEngine() {
  const { addQuizScore } = useAppStore()
  const { toast } = useToast()
  const [mode, setMode] = useState<QuizMode | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [quizQuestions, setQuizQuestions] = useState<typeof questions>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const categoryScrollRef = useRef<HTMLDivElement>(null)

  const handleCategoryScroll = useCallback(() => {
    // Scroll handler for category indicators (can be used for scroll arrows)
  }, [])

  const categories = useMemo(() => [...new Set(questions.map((q) => q.category))], [])

  const startQuiz = useCallback((quizMode: QuizMode, customPool?: typeof questions) => {
    let pool = customPool || questions
    if (!customPool && selectedCategory !== 'all') {
      pool = pool.filter((q) => q.category === selectedCategory)
    }
    // Fisher-Yates shuffle for true randomization
    const shuffled = shuffleArray(pool)
    const count = quizMode === 'timed' ? 60 : quizMode === 'category' ? 20 : quizMode === 'diagnostic' ? 30 : 10
    const selected = shuffled.slice(0, Math.min(count, shuffled.length))

    setQuizQuestions(selected)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers(new Array(selected.length).fill(null))
    setQuizComplete(false)
    setMode(quizMode)

    if (quizMode === 'timed') {
      setTimeLeft(60 * 60) // 60 minutes
    } else if (quizMode === 'diagnostic') {
      setTimeLeft(30 * 60) // 30 minutes for diagnostic
    }
  }, [selectedCategory])

  // Timer
  useEffect(() => {
    if ((mode === 'timed' || mode === 'diagnostic') && timeLeft > 0 && !quizComplete) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            handleFinishQuiz()
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [mode, timeLeft, quizComplete])

  const handleSelectAnswer = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = idx
    setAnswers(newAnswers)
    // Show result immediately in ALL modes after selecting an answer
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      const nextAnswer = answers[currentIndex + 1]
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(nextAnswer)
      // Show result if the next question was already answered
      setShowResult(nextAnswer !== null)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevAnswer = answers[currentIndex - 1]
      setCurrentIndex((i) => i - 1)
      setSelectedAnswer(prevAnswer)
      // Show result if the previous question was already answered
      setShowResult(prevAnswer !== null)
    }
  }

  const handleFinishQuiz = useCallback(() => {
    setQuizComplete(true)
    if (timerRef.current) clearInterval(timerRef.current)
    let correct = 0
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++
    })
    addQuizScore(correct, quizQuestions.length, selectedCategory)
    toast({
      title: 'Quiz Complete!',
      description: `Score: ${correct}/${quizQuestions.length} (${Math.round((correct / quizQuestions.length) * 100)}%)`,
    })
  }, [quizQuestions, answers, addQuizScore, selectedCategory, toast])

  // Setup screen
  if (!mode) {
    return (
      <div className="quiz-state-enter space-y-6 overflow-x-hidden w-full max-w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">PIO DURAN EMS NCII Self-Assessment Quiz</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{questions.length} competency-based questions across {categories.length} categories</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category selector with visual icons - horizontal scroll on mobile */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Select Category</h3>
              <div className="relative">
                {/* Fade edges for scroll indication on mobile */}
                <div className="absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none sm:hidden" />
                <div className="absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none sm:hidden" />
                <div
                  ref={categoryScrollRef}
                  onScroll={handleCategoryScroll}
                  className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 flex-nowrap -mx-1 px-1 category-scroll"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--color-border) transparent',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <button
                    className={cn(
                      'px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[36px]',
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                    onClick={() => setSelectedCategory('all')}
                  >
                    <Sparkles className="w-3 h-3" />
                    All ({questions.length})
                  </button>
                  {categories.map((cat) => {
                    const catInfo = categoryIcons[cat]
                    const catCount = questions.filter(q => q.category === cat).length
                    return (
                      <button
                        key={cat}
                        className={cn(
                          'px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[36px]',
                          selectedCategory === cat
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        )}
                        onClick={() => {
                          setSelectedCategory(cat)
                          // On mobile, scroll the selected category into view
                          if (categoryScrollRef.current) {
                            const btn = categoryScrollRef.current.querySelector(`[data-cat="${cat}"]`)
                            btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
                          }
                        }}
                        data-cat={cat}
                      >
                        {catInfo ? <span className={selectedCategory === cat ? '' : catInfo.color}>{catInfo.icon}</span> : null}
                        {cat} <span className="text-[10px] opacity-70">({catCount})</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <Separator />

            {/* Mode selection with card-modern */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Choose Quiz Mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card
                  className="card-modern cursor-pointer hover:border-primary transition-all"
                  onClick={() => startQuiz('timed')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-ems-red" />
                    </div>
                    <h4 className="font-semibold text-sm">Timed Mode</h4>
                    <p className="text-xs text-muted-foreground mt-1">60 questions / 60 minutes</p>
                    <p className="text-xs text-muted-foreground">Random order, simulates exam</p>
                  </CardContent>
                </Card>
                <Card
                  className="card-modern cursor-pointer hover:border-primary transition-all"
                  onClick={() => startQuiz('practice')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-6 h-6 text-ems-teal" />
                    </div>
                    <h4 className="font-semibold text-sm">Practice Mode</h4>
                    <p className="text-xs text-muted-foreground mt-1">10 random questions</p>
                    <p className="text-xs text-muted-foreground">See answer after each Q</p>
                  </CardContent>
                </Card>
                <Card
                  className="card-modern cursor-pointer hover:border-primary transition-all"
                  onClick={() => startQuiz('category')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Flag className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm">Category Mode</h4>
                    <p className="text-xs text-muted-foreground mt-1">20 random questions per category</p>
                    <p className="text-xs text-muted-foreground">Focus on weak areas</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* What you'll learn preview */}
            {selectedCategory !== 'all' && categoryWhatYoullLearn[selectedCategory] && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-ems-teal/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">What you&apos;ll learn</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {categoryWhatYoullLearn[selectedCategory].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-ems-teal flex-shrink-0" />
                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedCategory === 'all' && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-ems-teal/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">What you&apos;ll learn</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {['Comprehensive exam preparation', 'All PIO DURAN EMS NCII competency areas', 'Test-taking strategies', 'Identify knowledge gaps'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-ems-teal flex-shrink-0" />
                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz complete
  if (quizComplete) {
    let correct = 0
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
    quizQuestions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { correct: 0, total: 0 }
      categoryBreakdown[q.category].total++
      if (answers[i] === q.correctAnswer) {
        correct++
        categoryBreakdown[q.category].correct++
      }
    })
    const scorePercent = Math.round((correct / quizQuestions.length) * 100)

    return (
      <div className="quiz-state-enter space-y-6 overflow-x-hidden w-full max-w-full">
        <Card className="text-center">
          <CardContent className="p-6 sm:p-8">
            <div
              className="score-ring w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4"
              style={{ '--score-pct': scorePercent, '--score-color': scorePercent >= 70 ? '#22C55E' : '#E63946'} as React.CSSProperties}
            >
              <div className="score-ring-inner">
                <Trophy className={cn('w-8 h-8 sm:w-10 sm:h-10', scorePercent >= 70 ? 'text-yellow-500' : 'text-muted-foreground')} />
                <span className={cn('text-2xl sm:text-3xl font-bold leading-none', scorePercent >= 70 ? 'text-green-500' : 'text-ems-red')}>
                  {scorePercent}%
                </span>
                <Badge className={cn('mt-0.5 text-[10px]', scorePercent >= 70 ? 'bg-green-500' : 'bg-ems-red')}>
                  {scorePercent >= 70 ? '✓ PASS' : '✗ NEEDS IMPROVEMENT'}
                </Badge>
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-1">Quiz Complete!</h2>
            <p className="text-sm text-muted-foreground">
              {correct} out of {quizQuestions.length} correct
            </p>
          </CardContent>
        </Card>

        {/* Category breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Score by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(categoryBreakdown).map(([cat, data]) => {
              const pct = Math.round((data.correct / data.total) * 100)
              const catInfo = categoryIcons[cat]
              return (
                <div key={cat} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                  {catInfo && (
                    <span className={cn('flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md flex-shrink-0', catInfo.bg, catInfo.color)}>
                      {catInfo.icon}
                    </span>
                  )}
                  <span className="text-xs font-medium w-20 sm:w-36 truncate flex-shrink-0">{cat}</span>
                  <Progress value={pct} className="flex-1 h-2 min-w-0" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground w-12 sm:w-16 text-right flex-shrink-0">
                    {data.correct}/{data.total} ({pct}%)
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Review answers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Review Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {quizQuestions.map((q, i) => {
              const isCorrect = answers[i] === q.correctAnswer
              return (
                <div key={q.id} className={cn('p-3 rounded-lg border overflow-hidden', isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800' : 'border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800')}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium break-words">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-red-600 mt-1 break-words">
                          Your answer: {answers[i] !== null ? q.options[answers[i]!] : 'Not answered'}
                        </p>
                      )}
                      <p className="text-xs text-green-600 mt-0.5 break-words">
                        Correct: {q.options[q.correctAnswer]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 break-words">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Button onClick={() => setMode(null)} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" /> Take Another Quiz
        </Button>
      </div>
    )
  }

  // Active quiz
  const current = quizQuestions[currentIndex]
  const answeredCount = answers.filter((a) => a !== null).length
  const currentCatInfo = categoryIcons[current.category]

  return (
    <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
      {/* Progress bar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Progress value={(answeredCount / quizQuestions.length) * 100} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {answeredCount}/{quizQuestions.length}
          </span>
        </div>
        {(mode === 'timed' || mode === 'diagnostic') && (
          <div className={cn('flex items-center gap-1 text-sm font-mono', timeLeft < 300 ? 'text-ems-red' : 'text-foreground')}>
            <Timer className="w-4 h-4 flex-shrink-0" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {currentCatInfo && (
              <span className={cn('flex items-center justify-center w-5 h-5 rounded flex-shrink-0', currentCatInfo.bg, currentCatInfo.color)}>
                {currentCatInfo.icon}
              </span>
            )}
            <Badge variant="outline" className="text-[10px]">{current.category}</Badge>
            <span className="text-xs text-muted-foreground">
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <h3 className="font-semibold text-sm md:text-base break-words flex-1">{current.question}</h3>
            <SpeakerButton text={`${current.question} ${current.options.map((o, i) => `${String.fromCharCode(65 + i)}: ${o}`).join(', ')}`} size="sm" />
          </div>

          {/* Options */}
          <div className="space-y-2">
            {current.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isCorrect = idx === current.correctAnswer
              let optionClass = 'quiz-option quiz-option-glow border-2 rounded-lg p-3'
              if (showResult) {
                if (isCorrect) optionClass += ' correct'
                else if (isSelected && !isCorrect) optionClass += ' incorrect'
              } else if (isSelected) {
                optionClass += ' selected'
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleSelectAnswer(idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0',
                      isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                      showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                      showResult && isSelected && !isCorrect && 'border-ems-red bg-ems-red text-white'
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm text-left break-words min-w-0">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation (all modes) */}
          {showResult && (
            <div className={cn(
              'mt-4 p-3 rounded-lg content-transition',
              selectedAnswer === current.correctAnswer
                ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
            )}>
              <p className="text-sm font-semibold mb-1">
                {selectedAnswer === current.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              {selectedAnswer !== current.correctAnswer && selectedAnswer !== null && (
                <p className="text-xs text-red-600 dark:text-red-400 mb-1">
                  Your answer: {current.options[selectedAnswer]}
                </p>
              )}
              <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                Correct answer: {current.options[current.correctAnswer]}
              </p>
              <p className="text-xs text-foreground/70">{current.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        {showResult ? (
          currentIndex < quizQuestions.length - 1 ? (
            <Button size="sm" onClick={handleNext}>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleFinishQuiz}>
              Finish <CheckCircle2 className="w-4 h-4 ml-1" />
            </Button>
          )
        ) : (mode === 'timed' || mode === 'diagnostic') ? (
          <Button size="sm" onClick={handleFinishQuiz} variant="destructive">
            Finish Quiz
          </Button>
        ) : null}
      </div>
    </div>
  )
}

// ==================== SIMULATION ENGINE ====================
export function SimulationEngine() {
  const { addCompletedSimulation, progress } = useAppStore()
  const { toast } = useToast()
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [currentStepId, setCurrentStepId] = useState<string>('')
  const [pathHistory, setPathHistory] = useState<{ stepId: string; choiceText: string; isCorrect: boolean; feedback: string }[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; feedback: string; choiceText: string } | null>(null)
  const [simulationComplete, setSimulationComplete] = useState(false)

  const startScenario = (id: string) => {
    const scenario = scenarios.find((s) => s.id === id)
    if (!scenario) return
    setActiveScenario(id)
    setCurrentStepId(scenario.startStepId)
    setPathHistory([])
    setShowFeedback(false)
    setLastFeedback(null)
    setSimulationComplete(false)
  }

  const scenario = activeScenario ? scenarios.find((s) => s.id === activeScenario) : null

  const handleChoice = (choice: { text: string; nextStepId: string; isCorrect: boolean; feedback: string }) => {
    setLastFeedback({ isCorrect: choice.isCorrect, feedback: choice.feedback, choiceText: choice.text })
    setPathHistory((h) => [...h, { stepId: currentStepId, choiceText: choice.text, isCorrect: choice.isCorrect, feedback: choice.feedback }])
    setShowFeedback(true)

    // Check if next step is "end"
    if (choice.nextStepId === 'end' || (scenario && !scenario.steps[choice.nextStepId])) {
      setTimeout(() => {
        setSimulationComplete(true)
        addCompletedSimulation(activeScenario!)
        toast({ title: 'Scenario Complete!', description: scenario?.title })
      }, 1500)
    } else {
      setTimeout(() => {
        setCurrentStepId(choice.nextStepId)
        setShowFeedback(false)
      }, 2000)
    }
  }

  const resetSimulation = () => {
    setActiveScenario(null)
    setCurrentStepId('')
    setPathHistory([])
    setShowFeedback(false)
    setLastFeedback(null)
    setSimulationComplete(false)
  }

  // Scenario selection
  if (!scenario) {
    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Scenario Simulation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Step-by-step interactive simulations. Make choices at each decision point and get immediate feedback.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scenarios.map((s) => {
            const isCompleted = progress.completedSimulations.includes(s.id)
            return (
              <Card
                key={s.id}
                className="card-modern cursor-pointer hover:border-primary transition-all"
                onClick={() => startScenario(s.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[10px]">{s.category}</Badge>
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-ems-teal" />
                    )}
                  </div>
                  <h4 className="font-semibold text-sm">{s.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const currentStep = scenario.steps[currentStepId]
  const correctChoices = pathHistory.filter((p) => p.isCorrect).length
  const totalChoices = pathHistory.length

  // Simulation complete
  if (simulationComplete) {
    const scorePercent = totalChoices > 0 ? Math.round((correctChoices / totalChoices) * 100) : 0

    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className={cn('w-12 h-12 mx-auto mb-3', scorePercent >= 80 ? 'text-yellow-500' : 'text-muted-foreground')} />
            <h2 className="text-xl font-bold mb-2">Scenario Complete!</h2>
            <p className="text-muted-foreground text-sm">{scenario.title}</p>
            <div className={cn('text-3xl font-bold mt-3', scorePercent >= 80 ? 'text-green-500' : 'text-ems-red')}>
              {scorePercent}%
            </div>
            <p className="text-sm text-muted-foreground">
              {correctChoices} of {totalChoices} correct decisions
            </p>
          </CardContent>
        </Card>

        {/* Path summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Decision Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {pathHistory.map((p, i) => (
              <div key={i} className={cn('flex items-start gap-2 p-2 rounded text-sm overflow-hidden', p.isCorrect ? 'bg-green-50 dark:bg-green-950/30' : 'bg-red-50 dark:bg-red-950/30')}>
                {p.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-xs break-words">{p.choiceText}</p>
                  <p className="text-xs text-muted-foreground break-words">{p.feedback}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => startScenario(activeScenario!)} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-1" /> Retry
          </Button>
          <Button onClick={resetSimulation} className="flex-1">
            All Scenarios
          </Button>
        </div>
      </div>
    )
  }

  // Active simulation
  return (
    <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm break-words">{scenario.title}</h3>
          <p className="text-xs text-muted-foreground">
            Decision {pathHistory.length + 1} • {correctChoices}/{totalChoices} correct
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={resetSimulation} className="flex-shrink-0">
          Exit
        </Button>
      </div>

      {/* Current step */}
      {currentStep && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-2 mb-4">
              <p className="text-sm leading-relaxed flex-1">{currentStep.text}</p>
              <SpeakerButton text={currentStep.text} size="sm" />
            </div>

            {!showFeedback ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2">What do you do?</p>
                {currentStep.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-3 rounded-lg border-2 border-border hover:border-primary hover:bg-muted/50 transition-all text-sm"
                    onClick={() => handleChoice(choice)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full border border-primary flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="break-words min-w-0">{choice.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className={cn(
                'p-4 rounded-lg content-transition',
                lastFeedback?.isCorrect
                  ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
              )}>
                <div className="flex items-center gap-2 mb-1">
                  {lastFeedback?.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-sm">
                    {lastFeedback?.isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-sm text-foreground/70 break-words">{lastFeedback?.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-1 justify-center">
        {pathHistory.map((p, i) => (
          <div
            key={i}
            className={cn(
              'w-2.5 h-2.5 rounded-full',
              p.isCorrect ? 'bg-green-500' : 'bg-red-500'
            )}
          />
        ))}
        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  )
}

// ==================== PRE-ASSESSMENT ====================
export function PreAssessmentPanel() {
  const { progress, updateChecklist } = useAppStore()
  const { toast } = useToast()
  const [activeScene, setActiveScene] = useState<string | null>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1)
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [timerRunning])

  const scene = activeScene ? assessmentScenes.find((s) => s.id === activeScene) : null

  const getCheckState = (sceneId: string, index: number): boolean => {
    return progress.completedChecklists[sceneId]?.[index] || false
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  // Scene selection
  if (!scene) {
    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Step-by-Step Assessment Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Guides you through the actual group assessment process for TESDA PIO DURAN EMS NCII competency evaluation.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-ems-red/10 border border-ems-red/20">
              <AlertOctagon className="w-4 h-4 text-ems-red flex-shrink-0" />
              <p className="text-xs text-foreground/80">
                Steps marked in <span className="text-ems-red font-bold">red</span> are critical — missing them results in automatic failure.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {assessmentScenes.map((s) => {
            const completedSteps = (progress.completedChecklists[s.id] || []).filter(Boolean).length
            const totalSteps = s.steps.length
            const pct = Math.round((completedSteps / totalSteps) * 100)

            return (
              <Card
                key={s.id}
                className="card-modern cursor-pointer hover:border-primary transition-all"
                onClick={() => {
                  setActiveScene(s.id)
                  setTimeElapsed(0)
                  setTimerRunning(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[10px]">Scene {assessmentScenes.indexOf(s) + 1}</Badge>
                    <span className="text-xs text-muted-foreground">{pct}%</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{s.title}</h4>
                  <Progress value={pct} className="h-1.5 mb-1" />
                  <p className="text-xs text-muted-foreground">{completedSteps}/{totalSteps} steps completed</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // Active scene
  const completedSteps = (progress.completedChecklists[scene.id] || []).filter(Boolean).length
  const totalSteps = scene.steps.length
  const pct = Math.round((completedSteps / totalSteps) * 100)

  return (
    <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-semibold text-base break-words">{scene.title}</h3>
          <p className="text-sm text-muted-foreground break-words">{scene.overview}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setActiveScene(null)}>
          Back to Scenes
        </Button>
      </div>

      {/* Timer & Progress */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant={timerRunning ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setTimerRunning(!timerRunning)}
          >
            <Timer className="w-4 h-4 mr-1" />
            {timerRunning ? 'Stop' : 'Start'} Timer
          </Button>
          <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Progress value={pct} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">{completedSteps}/{totalSteps}</span>
        </div>
      </div>

      {/* Steps checklist */}
      <Card>
        <CardContent className="p-4 space-y-2">
          {scene.steps.map((step, index) => {
            const isChecked = getCheckState(scene.id, index)
            return (
              <div
                key={step.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg transition-all',
                  step.isCritical && !isChecked && 'bg-ems-red/5 border border-ems-red/20',
                  step.isCritical && isChecked && 'bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-800',
                  !step.isCritical && isChecked && 'bg-muted/50',
                  !step.isCritical && !isChecked && 'bg-card border border-border'
                )}
              >
                <button
                  className="mt-0.5 flex-shrink-0"
                  onClick={() => {
                    updateChecklist(scene.id, index, !isChecked)
                    if (!isChecked) {
                      toast({ title: step.isCritical ? '✓ Critical step completed!' : '✓ Step completed', description: step.description.slice(0, 50) + '...' })
                    }
                  }}
                >
                  {isChecked ? (
                    <CheckCircle2 className={cn('w-5 h-5', step.isCritical ? 'text-green-500' : 'text-ems-teal')} />
                  ) : (
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2',
                      step.isCritical ? 'border-ems-red' : 'border-muted-foreground/30'
                    )} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{step.id}.</span>
                    <p className={cn('text-sm break-words flex-1 min-w-0', isChecked && 'line-through text-muted-foreground')}>
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <SpeakerButton text={step.description} size="xs" />
                      {step.isCritical && (
                        <Badge className="bg-ems-red text-[10px] px-1.5 py-0">CRITICAL</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Reset button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          scene.steps.forEach((_, i) => updateChecklist(scene.id, i, false))
          setTimeElapsed(0)
          setTimerRunning(false)
        }}
      >
        <RotateCcw className="w-4 h-4 mr-1" /> Reset Checklist
      </Button>
    </div>
  )
}

// ==================== DIAGNOSTIC PRE-ASSESSMENT (ENHANCED) ====================
export function DiagnosticPreAssessment() {
  const { progress, setDiagnosticScores, setActiveSection, setActiveSubSection } = useAppStore()
  const { toast } = useToast()
  const [isRunning, setIsRunning] = useState(false)
  const [diagQuestions, setDiagQuestions] = useState<typeof questions>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [isComplete, setIsComplete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const categories = useMemo(() => [...new Set(questions.map((q) => q.category))], [])

  const startDiagnostic = useCallback(() => {
    // Select random questions from each category (proportional)
    const perCategory = Math.max(2, Math.floor(30 / categories.length))
    let selected: typeof questions = []
    
    for (const cat of categories) {
      const catQuestions = questions.filter((q) => q.category === cat)
      const shuffled = shuffleArray(catQuestions)
      selected = [...selected, ...shuffled.slice(0, perCategory)]
    }
    
    // Fill remaining with random questions if under 30
    if (selected.length < 30) {
      const remaining = questions.filter((q) => !selected.includes(q))
      const shuffledRemaining = shuffleArray(remaining)
      selected = [...selected, ...shuffledRemaining.slice(0, 30 - selected.length)]
    }
    
    // Final shuffle
    selected = shuffleArray(selected).slice(0, 30)
    
    setDiagQuestions(selected)
    setAnswers(new Array(selected.length).fill(null))
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(30 * 60)
    setIsComplete(false)
    setIsRunning(true)
  }, [categories])

  // Timer
  useEffect(() => {
    if (isRunning && timeLeft > 0 && !isComplete) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            finishDiagnostic()
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [isRunning, timeLeft, isComplete])

  const finishDiagnostic = useCallback(() => {
    setIsComplete(true)
    if (timerRef.current) clearInterval(timerRef.current)
    
    // Calculate per-category scores
    const catScores: Record<string, { correct: number; total: number }> = {}
    diagQuestions.forEach((q, i) => {
      if (!catScores[q.category]) catScores[q.category] = { correct: 0, total: 0 }
      catScores[q.category].total++
      if (answers[i] === q.correctAnswer) catScores[q.category].correct++
    })
    
    const diagnosticScores: Record<string, number> = {}
    const suggestedPath: string[] = []
    
    for (const [cat, data] of Object.entries(catScores)) {
      const pct = Math.round((data.correct / data.total) * 100)
      diagnosticScores[cat] = pct
      if (pct < 70) suggestedPath.push(cat)
    }
    
    setDiagnosticScores(diagnosticScores)
    // XP is added by setDiagnosticScores internally
    
    const totalCorrect = Object.values(catScores).reduce((sum, d) => sum + d.correct, 0)
    const totalQuestions = diagQuestions.length
    toast({
      title: 'Diagnostic Complete!',
      description: `Score: ${totalCorrect}/${totalQuestions} (${Math.round((totalCorrect / totalQuestions) * 100)}%)`,
    })
  }, [diagQuestions, answers, setDiagnosticScores, toast])

  const handleSelectAnswer = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = idx
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < diagQuestions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(answers[currentIndex + 1])
      setShowResult(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setSelectedAnswer(answers[currentIndex - 1])
      setShowResult(false)
    }
  }

  // Show completed diagnostic results
  if (progress.diagnosticCompleted && !isRunning) {
    const avgScore = Object.values(progress.diagnosticScores).length > 0
      ? Math.round(Object.values(progress.diagnosticScores).reduce((a, b) => a + b, 0) / Object.values(progress.diagnosticScores).length)
      : 0

    return (
      <Card className="border-ems-teal/30 card-modern">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-ems-teal/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-ems-teal" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm">Diagnostic Results</h3>
              <p className="text-xs text-muted-foreground">Average: {avgScore}%</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto flex-shrink-0"
              onClick={startDiagnostic}
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Retake
            </Button>
          </div>
          <div className="space-y-2 mb-3">
            {Object.entries(progress.diagnosticScores).sort(([,a],[,b]) => a - b).map(([cat, pct]) => {
              const catInfo = categoryIcons[cat]
              return (
                <div key={cat} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  {catInfo && (
                    <span className={cn('flex items-center justify-center w-5 h-5 rounded flex-shrink-0', catInfo.bg, catInfo.color)}>
                      {catInfo.icon}
                    </span>
                  )}
                  <span className="text-xs w-20 sm:w-28 truncate flex-shrink-0">{cat}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden min-w-0">
                    <div
                      className={cn('h-full rounded-full transition-all', pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={cn('text-[10px] font-medium w-8 flex-shrink-0', pct >= 70 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600')}>{pct}%</span>
                </div>
              )
            })}
          </div>
          {progress.suggestedPath.length > 0 && (
            <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">Focus areas for improvement:</p>
              <div className="flex flex-wrap gap-1.5">
                {progress.suggestedPath.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-[10px]">{cat}</Badge>
                ))}
              </div>
            </div>
          )}
          {progress.suggestedPath.length > 0 && (
            <Button size="sm" variant="outline" className="w-full mt-3" onClick={() => {
              setActiveSection('roadmap')
              setActiveSubSection(progress.suggestedPath[0])
            }}>
              Start Your Personalized Path
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  // Diagnostic quiz in progress
  if (isRunning && !isComplete) {
    const current = diagQuestions[currentIndex]
    const answeredCount = answers.filter((a) => a !== null).length
    const currentCatInfo = categoryIcons[current?.category]

    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-ems-teal/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Target className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm">Diagnostic Assessment</h3>
                  <p className="text-xs text-muted-foreground">30 random questions from {questions.length} total</p>
                </div>
              </div>
              <div className={cn('flex items-center gap-1 text-sm font-mono flex-shrink-0', timeLeft < 300 ? 'text-ems-red' : 'text-foreground')}>
                <Timer className="w-4 h-4" />
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 sm:gap-3">
          <Progress value={(answeredCount / diagQuestions.length) * 100} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">{answeredCount}/{diagQuestions.length}</span>
        </div>

        {current && (
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {currentCatInfo && (
                  <span className={cn('flex items-center justify-center w-5 h-5 rounded flex-shrink-0', currentCatInfo.bg, currentCatInfo.color)}>
                    {currentCatInfo.icon}
                  </span>
                )}
                <Badge variant="outline" className="text-[10px]">{current.category}</Badge>
                <span className="text-xs text-muted-foreground">Q{currentIndex + 1} of {diagQuestions.length}</span>
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-4 break-words">{current.question}</h3>
              <div className="space-y-2">
                {current.options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx
                  return (
                    <button
                      key={idx}
                      className={cn(
                        'quiz-option border-2 rounded-lg p-3 w-full text-left',
                        isSelected && 'selected'
                      )}
                      onClick={() => handleSelectAnswer(idx)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0',
                          isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm break-words min-w-0">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          <Button size="sm" onClick={finishDiagnostic} variant="destructive">
            Finish
          </Button>
          {currentIndex < diagQuestions.length - 1 ? (
            <Button size="sm" onClick={handleNext}>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={finishDiagnostic}>
              Finish <CheckCircle2 className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  // Diagnostic complete - show results inline
  if (isComplete) {
    let correct = 0
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
    diagQuestions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { correct: 0, total: 0 }
      categoryBreakdown[q.category].total++
      if (answers[i] === q.correctAnswer) {
        correct++
        categoryBreakdown[q.category].correct++
      }
    })
    const scorePercent = Math.round((correct / diagQuestions.length) * 100)

    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className={cn('w-14 h-14 mx-auto mb-3', scorePercent >= 70 ? 'text-yellow-500' : 'text-muted-foreground')} />
            <h2 className="text-xl font-bold mb-1">Diagnostic Complete!</h2>
            <div className={cn('text-4xl font-bold mb-2', scorePercent >= 70 ? 'text-green-500' : 'text-ems-red')}>
              {scorePercent}%
            </div>
            <p className="text-sm text-muted-foreground">{correct} out of {diagQuestions.length} correct</p>
            <Badge className={cn('mt-2', scorePercent >= 70 ? 'bg-green-500' : 'bg-amber-500')}>
              {scorePercent >= 70 ? 'STRONG FOUNDATION' : 'NEEDS STUDY'}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">XP earned for completing diagnostic</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Score by Category</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(categoryBreakdown).sort(([,a],[,b]) => (a.correct/a.total) - (b.correct/b.total)).map(([cat, data]) => {
              const pct = Math.round((data.correct / data.total) * 100)
              const catInfo = categoryIcons[cat]
              return (
                <div key={cat} className="flex items-center gap-1.5 sm:gap-3 min-w-0">
                  {catInfo && (
                    <span className={cn('flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-md flex-shrink-0', catInfo.bg, catInfo.color)}>
                      {catInfo.icon}
                    </span>
                  )}
                  <span className="text-xs font-medium w-20 sm:w-32 truncate flex-shrink-0">{cat}</span>
                  <Progress value={pct} className="flex-1 h-2 min-w-0" />
                  <span className={cn('text-[10px] sm:text-xs font-medium w-12 sm:w-16 text-right flex-shrink-0', pct >= 70 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600')}>
                    {data.correct}/{data.total} ({pct}%)
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setIsRunning(false); setIsComplete(false) }} className="flex-1">
            Close
          </Button>
          <Button onClick={startDiagnostic} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-1" /> Retake
          </Button>
        </div>
      </div>
    )
  }

  // Default: show diagnostic CTA card
  return (
    <Card className="card-modern border-primary/20 bg-gradient-to-br from-primary/5 to-ems-teal/5 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-ems-teal/20 flex items-center justify-center mb-4 relative">
            <Target className="w-10 h-10 text-primary" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-ems-teal/20 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-ems-teal" />
            </div>
          </div>
          <h3 className="font-bold text-lg mb-1">Diagnostic Pre-Assessment</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Discover your strengths and weaknesses with {questions.length} competency-based questions.
          </p>
        </div>

        <div className="space-y-2.5 mb-5">
          {[
            { icon: <Target className="w-4 h-4" />, text: '30 random questions across all categories', color: 'text-red-500' },
            { icon: <Sparkles className="w-4 h-4" />, text: 'Personalized study path recommendations', color: 'text-purple-500' },
            { icon: <Clock className="w-4 h-4" />, text: '30-minute timed assessment', color: 'text-amber-500' },
            { icon: <Zap className="w-4 h-4" />, text: 'Earn XP upon completion', color: 'text-ems-teal' },
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background/60">
              <span className={benefit.color}>{benefit.icon}</span>
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-base py-5"
          onClick={startDiagnostic}
        >
          <Play className="w-5 h-5 mr-2" /> Start Diagnostic
        </Button>
      </CardContent>
    </Card>
  )
}

// ==================== ROLE-PLAY BANNER ====================
function RoleplayBanner({ onDismiss, onStart }: { onDismiss: () => void; onStart: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-ems-teal/10 via-primary/10 to-ems-teal/5 border border-ems-teal/20 dark:from-ems-teal/20 dark:via-primary/20 dark:to-ems-teal/10">
      <div className="absolute inset-0 bg-gradient-to-r from-ems-teal/5 to-transparent pointer-events-none" />
      <div className="relative p-4 sm:p-5">
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 rounded-full hover:bg-muted/80 transition-colors"
          aria-label="Dismiss role-play banner"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-start gap-3 sm:gap-4 pr-6 sm:pr-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-ems-teal/30 to-primary/30 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-ems-teal" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-sm sm:text-base mb-1">Role-Playing Simulation</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
              Practice real TESDA EMS NCII competency scenarios with interactive team dialogue scripts
            </p>
            <Button
              size="sm"
              onClick={onStart}
              className="bg-gradient-to-r from-ems-teal to-primary hover:from-ems-teal/90 hover:to-primary/90 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Start Role-Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== ASSESSMENT SECTION ====================
export function AssessmentSection() {
  const { activeSubSection, setActiveSubSection, progress } = useAppStore()
  const [showRoleplayBanner, setShowRoleplayBanner] = useState(true)

  return (
    <div className="content-transition space-y-6">
      {/* Diagnostic Pre-Assessment - shown if not completed */}
      {!progress.diagnosticCompleted && <DiagnosticPreAssessment />}

      {/* Prominent Role-Play Banner - shown on initial load */}
      {showRoleplayBanner && activeSubSection !== 'roleplay' && (
        <RoleplayBanner
          onDismiss={() => setShowRoleplayBanner(false)}
          onStart={() => {
            setActiveSubSection('roleplay')
            setShowRoleplayBanner(false)
          }}
        />
      )}

      <Tabs
        value={activeSubSection || 'quiz'}
        onValueChange={(v) => setActiveSubSection(v)}
      >
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap scrollbar-none">
          <TabsTrigger value="quiz" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-amber/15 data-[state=active]:text-ems-amber"><GraduationCap className="w-3.5 h-3.5" />Exam</TabsTrigger>
          <TabsTrigger value="daily-challenge" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-600"><CalendarDays className="w-3.5 h-3.5" />Daily Challenge</TabsTrigger>
          <TabsTrigger value="simulation" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-red/15 data-[state=active]:text-ems-red"><Siren className="w-3.5 h-3.5" />Scenarios</TabsTrigger>
          <TabsTrigger value="pre-assessment" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-navy/15 data-[state=active]:text-ems-navy"><ClipboardList className="w-3.5 h-3.5" />Pre-Test</TabsTrigger>
          <TabsTrigger value="roleplay" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-teal/15 data-[state=active]:text-ems-teal font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            Roleplay
          </TabsTrigger>
        </TabsList>
        <TabsContent value="quiz">
          <QuizEngine />
        </TabsContent>
        <TabsContent value="daily-challenge">
          <DailyChallengeSection />
        </TabsContent>
        <TabsContent value="simulation">
          <EmergencySimulation />
        </TabsContent>
        <TabsContent value="pre-assessment">
          <PreAssessmentPanel />
        </TabsContent>
        <TabsContent value="roleplay">
          <RoleplaySection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
