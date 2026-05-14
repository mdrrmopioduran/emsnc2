'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { questions } from '@/data/questions'
import {
  Shuffle, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  Trophy, Clock, Filter, Zap, Target, BookOpen,
  GraduationCap, RotateCcw, ChevronRight, Eye, Play,
  ClipboardCheck, Server, Truck, Users, Shield, Key
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/hooks/use-translation'
import { motion, AnimatePresence } from 'framer-motion'

// ==================== TYPES ====================
type QuizDifficulty = 'all' | 'easy' | 'medium' | 'hard'
type QuizMode = 'practice' | 'exam'

interface QuizConfig {
  categories: string[]
  difficulty: QuizDifficulty
  questionCount: number
  mode: QuizMode
}

interface ActiveQuiz {
  questions: typeof questions
  currentIndex: number
  answers: (number | null)[]
  showResult: boolean
  selectedAnswer: number | null
  complete: boolean
  startTime: number
  config: QuizConfig
}

// ==================== CONSTANTS ====================
const ALL_CATEGORIES = [...new Set(questions.map(q => q.category))].sort()
const QUESTION_COUNTS = [5, 10, 15, 20, 25]
const DIFFICULTY_OPTIONS: { value: QuizDifficulty; label: string; labelFil: string }[] = [
  { value: 'all', label: 'All Levels', labelFil: 'Lahat ng Antas' },
  { value: 'easy', label: 'Easy', labelFil: 'Madali' },
  { value: 'medium', label: 'Medium', labelFil: 'Katamtaman' },
  { value: 'hard', label: 'Hard', labelFil: 'Mahirap' },
]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'OHS': <Target className="w-4 h-4" />,
  'FA': <Zap className="w-4 h-4" />,
  'BLS': <Target className="w-4 h-4" />,
  'Assessment': <GraduationCap className="w-4 h-4" />,
  'Trauma': <Shuffle className="w-4 h-4" />,
  'Med Emerg': <Zap className="w-4 h-4" />,
  'AMATS': <BookOpen className="w-4 h-4" />,
  'Amb Mgmt': <Clock className="w-4 h-4" />,
  'Comms': <Zap className="w-4 h-4" />,
  'Legal': <BookOpen className="w-4 h-4" />,
  'Drugs': <Target className="w-4 h-4" />,
  'TESDA Standards': <BookOpen className="w-4 h-4" />,
  'PH Care': <ClipboardCheck className="w-4 h-4" />,
  'LSE': <Server className="w-4 h-4" />,
  'Driving': <Truck className="w-4 h-4" />,
  'Transport': <Users className="w-4 h-4" />,
  'Scene': <Shield className="w-4 h-4" />,
  'Extrication': <Key className="w-4 h-4" />,
}

// ==================== HELPERS ====================
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Simple difficulty estimator based on question text patterns
function estimateDifficulty(q: typeof questions[0]): 'easy' | 'medium' | 'hard' {
  // We use a deterministic hash of the question ID to assign difficulty
  // This creates a stable, reproducible classification
  const hash = ((q.id * 2654435761) >>> 0) % 100
  if (hash < 30) return 'easy'
  if (hash < 70) return 'medium'
  return 'hard'
}

// ==================== CUSTOM QUIZ SECTION ====================
export function CustomQuizSection() {
  const { addQuizScore, addXp } = useAppStore()
  const { t } = useTranslation()
  const { toast } = useToast()

  // Builder state
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<QuizConfig>({
    categories: [],
    difficulty: 'all',
    questionCount: 10,
    mode: 'practice',
  })
  const [quiz, setQuiz] = useState<ActiveQuiz | null>(null)

  // ── Step 1: Category selection ──
  const toggleCategory = useCallback((cat: string) => {
    setConfig(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }))
  }, [])

  const selectAllCategories = useCallback(() => {
    setConfig(prev => ({ ...prev, categories: [...ALL_CATEGORIES] }))
  }, [])

  const clearCategories = useCallback(() => {
    setConfig(prev => ({ ...prev, categories: [] }))
  }, [])

  // ── Filter available questions ──
  const availablePool = useMemo(() => {
    let pool = [...questions]
    if (config.categories.length > 0) {
      pool = pool.filter(q => config.categories.includes(q.category))
    }
    if (config.difficulty !== 'all') {
      pool = pool.filter(q => estimateDifficulty(q) === config.difficulty)
    }
    return pool
  }, [config.categories, config.difficulty])

  const canGenerate = config.categories.length > 0 && availablePool.length > 0

  // ── Generate Quiz ──
  const generateQuiz = useCallback(() => {
    const count = Math.min(config.questionCount, availablePool.length)
    const selected = shuffleArray(availablePool).slice(0, count)
    if (selected.length === 0) return

    setQuiz({
      questions: selected,
      currentIndex: 0,
      answers: new Array(selected.length).fill(null),
      showResult: false,
      selectedAnswer: null,
      complete: false,
      startTime: Date.now(),
      config: { ...config },
    })
  }, [config, availablePool])

  // ── Quiz Logic ──
  const handleSelectAnswer = useCallback((idx: number) => {
    if (!quiz || quiz.showResult) return
    const newAnswers = [...quiz.answers]
    newAnswers[quiz.currentIndex] = idx
    setQuiz(prev => prev ? { ...prev, selectedAnswer: idx, answers: newAnswers, showResult: true } : prev)
  }, [quiz])

  const handleNext = useCallback(() => {
    if (!quiz) return
    if (quiz.currentIndex < quiz.questions.length - 1) {
      // In exam mode, auto-advance
      if (quiz.config.mode === 'exam') {
        const newAnswers = [...quiz.answers]
        if (newAnswers[quiz.currentIndex] === null) newAnswers[quiz.currentIndex] = -1
        setQuiz(prev => {
          if (!prev || prev.currentIndex >= prev.questions.length - 1) return prev
          const nextAnswer = newAnswers[prev.currentIndex + 1]
          return {
            ...prev,
            currentIndex: prev.currentIndex + 1,
            answers: newAnswers,
            selectedAnswer: nextAnswer,
            showResult: false,
          }
        })
      } else {
        setQuiz(prev => {
          if (!prev || prev.currentIndex >= prev.questions.length - 1) return prev
          const nextAnswer = prev.answers[prev.currentIndex + 1]
          return {
            ...prev,
            currentIndex: prev.currentIndex + 1,
            selectedAnswer: nextAnswer,
            showResult: nextAnswer !== null && nextAnswer !== -1,
          }
        })
      }
    } else {
      // Finish
      const timeTaken = Math.round((Date.now() - quiz.startTime) / 1000)
      let correct = 0
      const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
      quiz.questions.forEach((q, i) => {
        const ans = quiz.answers[i]
        const isCorrect = ans === q.correctAnswer
        if (isCorrect) correct++
        if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { correct: 0, total: 0 }
        categoryBreakdown[q.category].total++
        if (isCorrect) categoryBreakdown[q.category].correct++
      })

      const xp = quiz.questions.length * 10
      addXp(xp)

      const catStr = quiz.config.categories.length === ALL_CATEGORIES.length
        ? 'all'
        : quiz.config.categories.join(', ')
      addQuizScore(correct, quiz.questions.length, catStr)

      setQuiz(prev => prev ? { ...prev, complete: true } : prev)

      toast({
        title: t('quiz.quizComplete'),
        description: `${t('common.score')}: ${correct}/${quiz.questions.length} (+${xp} XP)`,
      })
    }
  }, [quiz, addQuizScore, addXp, toast, t])

  const handlePrev = useCallback(() => {
    if (!quiz || quiz.currentIndex === 0) return
    setQuiz(prev => {
      if (!prev || prev.currentIndex === 0) return prev
      const prevAnswer = prev.answers[prev.currentIndex - 1]
      const showRes = prev.config.mode === 'practice' ? prevAnswer !== null && prevAnswer !== -1 : false
      return {
        ...prev,
        currentIndex: prev.currentIndex - 1,
        selectedAnswer: prevAnswer,
        showResult: showRes,
      }
    })
  }, [quiz])

  const finishQuiz = useCallback(() => {
    // Mark remaining unanswered as -1 and finish
    if (!quiz) return
    const newAnswers = [...quiz.answers]
    newAnswers[quiz.currentIndex] = newAnswers[quiz.currentIndex] ?? -1
    setQuiz(prev => prev ? { ...prev, answers: newAnswers } : prev)
    // Trigger finish on next render
    setTimeout(() => {
      setQuiz(prev => {
        if (!prev) return prev
        let correct = 0
        prev.questions.forEach((q, i) => {
          if (prev.answers[i] === q.correctAnswer) correct++
        })
        const xp = prev.questions.length * 10
        addXp(xp)
        const catStr = prev.config.categories.length === ALL_CATEGORIES.length
          ? 'all'
          : prev.config.categories.join(', ')
        addQuizScore(correct, prev.questions.length, catStr)
        toast({
          title: t('quiz.quizComplete'),
          description: `${t('common.score')}: ${correct}/${prev.questions.length} (+${xp} XP)`,
        })
        return { ...prev, complete: true }
      })
    }, 0)
  }, [quiz, addQuizScore, addXp, toast, t])

  const resetQuiz = useCallback(() => {
    setQuiz(null)
    setStep(0)
    setConfig(prev => ({ ...prev, categories: [] }))
  }, [])

  // ═══════════════════════════════════════════
  // ── RESULTS SCREEN ──
  // ═══════════════════════════════════════════
  if (quiz?.complete) {
    const totalCorrect = quiz.questions.reduce((c, q, i) => c + (quiz.answers[i] === q.correctAnswer ? 1 : 0), 0)
    const scorePercent = Math.round((totalCorrect / quiz.questions.length) * 100)
    const timeTaken = Math.round((Date.now() - quiz.startTime) / 1000)
    const mins = Math.floor(timeTaken / 60)
    const secs = timeTaken % 60
    const xp = quiz.questions.length * 10

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
    quiz.questions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { correct: 0, total: 0 }
      categoryBreakdown[q.category].total++
      if (quiz.answers[i] === q.correctAnswer) categoryBreakdown[q.category].correct++
    })

    return (
      <div className="content-transition space-y-6">
        <Card className="text-center">
          <CardContent className="p-6 sm:p-8">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 score-ring" style={{
                '--score-pct': scorePercent,
                '--score-color': scorePercent >= 70 ? '#22C55E' : '#E63946',
              } as React.CSSProperties}>
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
              <h2 className="text-lg font-semibold mb-1">{t('custom.resultsTitle')}</h2>
              <p className="text-sm text-muted-foreground">
                {totalCorrect} / {quiz.questions.length} {t('common.correct').toLowerCase()}
              </p>
              <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{mins}:{String(secs).padStart(2, '0')}</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" />+{xp} XP</span>
                <Badge variant="outline" className="text-[10px]">
                  {quiz.config.mode === 'practice' ? t('custom.practiceMode') : t('custom.examMode')}
                </Badge>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Score by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t('custom.scoreByCategory')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(categoryBreakdown).map(([cat, data]) => {
              const pct = Math.round((data.correct / data.total) * 100)
              const catIcon = CATEGORY_ICONS[cat]
              return (
                <div key={cat} className="flex items-center gap-2 min-w-0">
                  <span className="flex-shrink-0 text-muted-foreground">{catIcon}</span>
                  <span className="text-xs font-medium w-28 sm:w-36 truncate flex-shrink-0">{cat}</span>
                  <Progress value={pct} className="flex-1 h-2 min-w-0" />
                  <span className="text-[10px] text-muted-foreground w-14 sm:w-16 text-right flex-shrink-0">
                    {data.correct}/{data.total} ({pct}%)
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Review Answers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t('custom.reviewAnswers')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
            {quiz.questions.map((q, i) => {
              const isCorrect = quiz.answers[i] === q.correctAnswer
              return (
                <div key={q.id} className={cn(
                  'p-3 rounded-lg border overflow-hidden',
                  isCorrect
                    ? 'border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800'
                    : 'border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800'
                )}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline" className="text-[9px]">{q.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">#{i + 1}</span>
                      </div>
                      <p className="text-sm font-medium break-words">{q.question}</p>
                      {!isCorrect && quiz.answers[i] !== null && quiz.answers[i] !== -1 && (
                        <p className="text-xs text-red-600 mt-1 break-words">
                          {t('custom.yourAnswer')}: {q.options[quiz.answers[i]!]}
                        </p>
                      )}
                      {!isCorrect && (quiz.answers[i] === null || quiz.answers[i] === -1) && (
                        <p className="text-xs text-red-600 mt-1 break-words">{t('custom.notAnswered')}</p>
                      )}
                      <p className="text-xs text-green-600 mt-0.5 break-words">
                        {t('custom.correctAnswer')}: {q.options[q.correctAnswer]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 break-words">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={resetQuiz} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-1" /> {t('custom.newQuiz')}
          </Button>
          <Button onClick={() => { setQuiz(null); setStep(0) }} className="flex-1">
            <Shuffle className="w-4 h-4 mr-1" /> {t('custom.changeSettings')}
          </Button>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════
  // ── ACTIVE QUIZ ──
  // ═══════════════════════════════════════════
  if (quiz && !quiz.complete) {
    const current = quiz.questions[quiz.currentIndex]
    const answeredCount = quiz.answers.filter(a => a !== null && a !== -1).length

    return (
      <div className="content-transition space-y-4">
        {/* Progress bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Progress value={(answeredCount / quiz.questions.length) * 100} className="flex-1 h-2" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">{answeredCount}/{quiz.questions.length}</span>
          </div>
          <Badge variant="outline" className="text-[10px] gap-1">
            <Clock className="w-3 h-3" />
            {(() => {
              const elapsed = Math.round((Date.now() - quiz.startTime) / 1000)
              return `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`
            })()}
          </Badge>
          <Button variant="ghost" size="sm" onClick={resetQuiz}>
            <XCircle className="w-4 h-4" />
          </Button>
        </div>

        {/* Question Card */}
        <Card className="card-modern">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-[10px]">{current.category}</Badge>
              <span className="text-xs text-muted-foreground">
                {t('custom.question')} {quiz.currentIndex + 1} {t('quiz.of')} {quiz.questions.length}
              </span>
              {quiz.config.mode === 'practice' && (
                <Badge variant="outline" className="text-[10px] bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                  {t('custom.practiceMode')}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-sm md:text-base mb-4 break-words">{current.question}</h3>

            <div className="space-y-2">
              {current.options.map((option, idx) => {
                const isSelected = quiz.selectedAnswer === idx
                const isCorrect = idx === current.correctAnswer
                let optionClass = 'quiz-option quiz-option-glow border-2 rounded-lg p-3'
                if (quiz.showResult) {
                  if (isCorrect) optionClass += ' correct'
                  else if (isSelected && !isCorrect) optionClass += ' incorrect'
                } else if (isSelected) {
                  optionClass += ' selected'
                }
                return (
                  <button key={idx} className={optionClass} onClick={() => handleSelectAnswer(idx)}>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0',
                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border',
                        quiz.showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                        quiz.showResult && isSelected && !isCorrect && 'border-ems-red bg-ems-red text-white'
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm text-left break-words min-w-0">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation (practice mode only) */}
            {quiz.showResult && quiz.config.mode === 'practice' && (
              <div className={cn(
                'mt-4 p-3 rounded-lg content-transition',
                quiz.selectedAnswer === current.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
              )}>
                <p className="text-sm font-semibold mb-1">
                  {quiz.selectedAnswer === current.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  {t('custom.correctAnswer')}: {current.options[current.correctAnswer]}
                </p>
                <p className="text-xs text-foreground/70">{current.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={quiz.currentIndex === 0}>
            <ArrowLeft className="w-4 h-4 mr-1" /> {t('common.back')}
          </Button>
          {quiz.config.mode === 'practice' ? (
            quiz.showResult ? (
              quiz.currentIndex < quiz.questions.length - 1 ? (
                <Button size="sm" onClick={handleNext}>
                  {t('common.next')} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => {
                  // Finish
                  const timeTaken = Date.now() - quiz.startTime
                  let correct = 0
                  quiz.questions.forEach((q, i) => {
                    if (quiz.answers[i] === q.correctAnswer) correct++
                  })
                  const xp = quiz.questions.length * 10
                  addXp(xp)
                  const catStr = quiz.config.categories.length === ALL_CATEGORIES.length ? 'all' : quiz.config.categories.join(', ')
                  addQuizScore(correct, quiz.questions.length, catStr)
                  setQuiz(prev => prev ? { ...prev, complete: true } : prev)
                  toast({
                    title: t('quiz.quizComplete'),
                    description: `${t('common.score')}: ${correct}/${quiz.questions.length} (+${xp} XP)`,
                  })
                }}>
                  {t('common.finish')} <CheckCircle2 className="w-4 h-4 ml-1" />
                </Button>
              )
            ) : null
          ) : (
            <Button size="sm" onClick={handleNext}>
              {quiz.currentIndex < quiz.questions.length - 1 ? (
                <>{t('common.next')} <ArrowRight className="w-4 h-4 ml-1" /></>
              ) : (
                <>{t('common.finish')} <CheckCircle2 className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          )}
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════
  // ── BUILDER UI ──
  // ═══════════════════════════════════════════

  // Step indicators
  const stepLabels = [
    t('custom.step1Title'),
    t('custom.step2Title'),
    t('custom.step3Title'),
    t('custom.step4Title'),
  ]

  return (
    <div className="content-transition space-y-6">
      {/* Header */}
      <Card className="card-modern overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ems-teal/5 to-amber-500/5 pointer-events-none" />
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-ems-teal" />
                {t('custom.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{t('custom.subtitle')}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-ems-teal/10 flex items-center justify-center flex-shrink-0">
              <Shuffle className="w-6 h-6 text-ems-teal" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step indicator */}
      <div className="flex items-center gap-1 px-1">
        {stepLabels.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors',
                i <= step ? 'bg-ems-teal text-white' : 'bg-muted text-muted-foreground'
              )}>
                {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn(
                'text-[10px] hidden sm:block truncate',
                i === step ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={cn('flex-1 h-0.5 min-w-[8px] mx-1', i < step ? 'bg-ems-teal' : 'bg-muted')} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Choose Categories */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Card className="card-modern">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{t('custom.step1Title')}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs h-7" onClick={selectAllCategories}>
                      {t('common.all')}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearCategories}>
                      {t('custom.clear')}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map(cat => {
                    const isActive = config.categories.includes(cat)
                    const catCount = questions.filter(q => q.category === cat).length
                    return (
                      <button
                        key={cat}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                          isActive
                            ? 'bg-ems-teal/10 border-ems-teal/30 text-ems-teal'
                            : 'bg-muted/50 border-transparent text-muted-foreground hover:border-border'
                        )}
                        onClick={() => toggleCategory(cat)}
                      >
                        <span className="text-[10px]">{CATEGORY_ICONS[cat]}</span>
                        {cat}
                        <span className="text-[10px] opacity-60">({catCount})</span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {config.categories.length > 0
                    ? t('custom.categoriesSelected', { count: config.categories.length })
                    : t('custom.selectAtLeastOne')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 1: Difficulty */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Card className="card-modern">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm">{t('custom.step2Title')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={cn(
                        'p-3 rounded-lg border-2 text-center transition-all',
                        config.difficulty === opt.value
                          ? 'border-ems-teal bg-ems-teal/5'
                          : 'border-transparent bg-muted/50 hover:border-border'
                      )}
                      onClick={() => setConfig(prev => ({ ...prev, difficulty: opt.value }))}
                    >
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {opt.value === 'all' ? availablePool.length : questions.filter(q => estimateDifficulty(q) === opt.value).length} {t('custom.questions')}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Number of questions */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Card className="card-modern">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm">{t('custom.step3Title')}</h3>
                <p className="text-xs text-muted-foreground">
                  {t('custom.available')}: {availablePool.length} {t('custom.questions')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUESTION_COUNTS.map(count => (
                    <button
                      key={count}
                      disabled={count > availablePool.length}
                      className={cn(
                        'w-14 h-14 rounded-lg border-2 text-center transition-all flex flex-col items-center justify-center',
                        config.questionCount === count
                          ? 'border-ems-teal bg-ems-teal/5'
                          : count > availablePool.length
                            ? 'border-transparent bg-muted/30 text-muted-foreground/40 cursor-not-allowed'
                            : 'border-transparent bg-muted/50 hover:border-border'
                      )}
                      onClick={() => setConfig(prev => ({ ...prev, questionCount: count }))}
                    >
                      <span className="font-bold text-lg">{count}</span>
                      <span className="text-[9px] text-muted-foreground">{t('custom.questions')}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Mode */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Card className="card-modern">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold text-sm">{t('custom.step4Title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    className={cn(
                      'p-4 rounded-lg border-2 text-left transition-all',
                      config.mode === 'practice' ? 'border-ems-teal bg-ems-teal/5' : 'border-transparent bg-muted/50 hover:border-border'
                    )}
                    onClick={() => setConfig(prev => ({ ...prev, mode: 'practice' }))}
                  >
                    <Eye className="w-6 h-6 text-ems-teal mb-2" />
                    <h4 className="font-semibold text-sm">{t('custom.practiceMode')}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t('custom.practiceModeDesc')}</p>
                  </button>
                  <button
                    className={cn(
                      'p-4 rounded-lg border-2 text-left transition-all',
                      config.mode === 'exam' ? 'border-ems-teal bg-ems-teal/5' : 'border-transparent bg-muted/50 hover:border-border'
                    )}
                    onClick={() => setConfig(prev => ({ ...prev, mode: 'exam' }))}
                  >
                    <GraduationCap className="w-6 h-6 text-ems-teal mb-2" />
                    <h4 className="font-semibold text-sm">{t('custom.examMode')}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{t('custom.examModeDesc')}</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> {t('common.back')}
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={step === 0 && config.categories.length === 0}>
            {t('common.next')} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={generateQuiz} disabled={!canGenerate} className="gap-2">
            <Play className="w-4 h-4" />
            {t('custom.generateQuiz')}
            <span className="text-xs opacity-70">({Math.min(config.questionCount, availablePool.length)} {t('custom.questions')})</span>
          </Button>
        )}
      </div>
    </div>
  )
}
