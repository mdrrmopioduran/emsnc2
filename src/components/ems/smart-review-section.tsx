'use client'

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useAppStore } from '@/store/app-store'
import { questions } from '@/data/questions'
import { roadmapTopics } from '@/data/roadmap'
import {
  Brain, AlertTriangle, BookOpen, RotateCcw, Target, Zap,
  Clock, ChevronRight, CheckCircle2, XCircle, ArrowRight,
  ArrowLeft, Trophy, BarChart3, Play, Lightbulb, Star,
  TrendingDown, Eye, CreditCard
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
type Priority = 'high' | 'medium' | 'low'
type ActionType = 'quiz' | 'study' | 'flashcards'

interface ReviewItem {
  id: string
  priority: Priority
  category: string
  title: string
  description: string
  actionLabel: string
  actionType: ActionType
  actionTarget: string
  estimatedMinutes: number
  icon: React.ReactNode
}

interface ReviewSession {
  questions: typeof questions
  currentIndex: number
  answers: (number | null)[]
  showResult: boolean
  selectedAnswer: number | null
  complete: boolean
  startTime: number
  beforeScores: Record<string, number>
}

// ==================== CONSTANTS ====================
const ROADMAP_TOPIC_IDS = roadmapTopics.map(t => t.id)

const PRIORITY_CONFIG: Record<Priority, { color: string; bg: string; border: string; label: string }> = {
  high: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800', label: 'High' },
  medium: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800', label: 'Medium' },
  low: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-200 dark:border-green-800', label: 'Low' },
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'OSH': <AlertTriangle className="w-4 h-4" />,
  'First Aid': <Zap className="w-4 h-4" />,
  'BLS/CPR': <Target className="w-4 h-4" />,
  'Patient Assessment': <Brain className="w-4 h-4" />,
  'Trauma': <AlertTriangle className="w-4 h-4" />,
  'Medical Emergencies': <AlertTriangle className="w-4 h-4" />,
  'AMATS': <BarChart3 className="w-4 h-4" />,
  'Ambulance Management': <Clock className="w-4 h-4" />,
  'Radio Communication': <Zap className="w-4 h-4" />,
  'Legal/Ethical': <BookOpen className="w-4 h-4" />,
  'Drugs': <Star className="w-4 h-4" />,
  'TESDA Standards': <BookOpen className="w-4 h-4" />,
}

// ==================== HELPER ====================
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ==================== SMART REVIEW SECTION ====================
export function SmartReviewSection() {
  const { progress, setActiveSubSection, setActiveSection, addQuizScore, addXp } = useAppStore()
  const { t } = useTranslation()
  const { toast } = useToast()
  const [session, setSession] = useState<ReviewSession | null>(null)
  const [afterScores, setAfterScores] = useState<Record<string, number>>({})
  const [xpEarned, setXpEarned] = useState(0)

  // ── Compute review items ──
  const reviewItems = useMemo<ReviewItem[]>(() => {
    const items: ReviewItem[] = []
    const { quizScores, readTopics } = progress

    // 1. Analyze quiz scores per category — weak if avg < 70%
    const categoryScores: Record<string, { total: number; count: number }> = {}
    quizScores.forEach(qs => {
      if (!categoryScores[qs.category]) categoryScores[qs.category] = { total: 0, count: 0 }
      categoryScores[qs.category].total += (qs.score / qs.total) * 100
      categoryScores[qs.category].count += 1
    })

    Object.entries(categoryScores).forEach(([category, { total, count }]) => {
      const avg = total / count
      const questionCount = questions.filter(q => q.category === category).length
      if (avg < 70) {
        items.push({
          id: `quiz-weak-${category}`,
          priority: avg < 50 ? 'high' : 'medium',
          category,
          title: t('smart.reviewCategory', { category }),
          description: t('smart.scoredAverage', { score: Math.round(avg), count: questionCount }),
          actionLabel: t('smart.startQuiz'),
          actionType: 'quiz',
          actionTarget: category,
          estimatedMinutes: Math.ceil(questionCount * 0.5),
          icon: CATEGORY_ICONS[category] || <AlertTriangle className="w-4 h-4" />,
        })
      } else if (avg < 85) {
        items.push({
          id: `quiz-improve-${category}`,
          priority: 'low',
          category,
          title: t('smart.strengthenCategory', { category }),
          description: t('smart.scoredAverageImprove', { score: Math.round(avg) }),
          actionLabel: t('smart.practiceQuestions'),
          actionType: 'quiz',
          actionTarget: category,
          estimatedMinutes: Math.ceil(questionCount * 0.3),
          icon: CATEGORY_ICONS[category] || <BarChart3 className="w-4 h-4" />,
        })
      }
    })

    // 2. Unread topics
    ROADMAP_TOPIC_IDS.forEach(topicId => {
      if (!readTopics.includes(topicId)) {
        const topic = roadmapTopics.find(rt => rt.id === topicId)
        if (topic) {
          items.push({
            id: `unread-${topicId}`,
            priority: 'medium',
            category: t('smart.topic'),
            title: t('smart.studyTopic', { topic: topic.title }),
            description: t('smart.topicNotRead'),
            actionLabel: t('smart.studyTopicBtn'),
            actionType: 'study',
            actionTarget: topicId,
            estimatedMinutes: 15,
            icon: <Eye className="w-4 h-4" />,
          })
        }
      }
    })

    // 3. No quiz scores at all
    if (quizScores.length === 0) {
      items.push({
        id: 'no-quizzes',
        priority: 'high',
        category: t('smart.overview'),
        title: t('smart.noQuizzesTaken'),
        description: t('smart.takeQuizToIdentify'),
        actionLabel: t('smart.startSmartReview'),
        actionType: 'quiz',
        actionTarget: 'all',
        estimatedMinutes: 15,
        icon: <Play className="w-4 h-4" />,
      })
    }

    // 4. Strong categories — spaced repetition
    Object.entries(categoryScores).forEach(([category, { total, count }]) => {
      const avg = total / count
      if (avg >= 85 && count >= 2) {
        items.push({
          id: `quiz-strong-${category}`,
          priority: 'low',
          category,
          title: t('smart.maintainCategory', { category }),
          description: t('smart.scoredHigh', { score: Math.round(avg) }),
          actionLabel: t('smart.quickReview'),
          actionType: 'quiz',
          actionTarget: category,
          estimatedMinutes: 5,
          icon: <Star className="w-4 h-4" />,
        })
      }
    })

    // Sort: high → medium → low
    const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
    items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    return items
  }, [progress, t])

  // ── Generate smart review quiz ──
  const startSmartReview = useCallback(() => {
    const weakCategories: string[] = []
    const strongCategories: string[] = []

    const categoryScores: Record<string, { total: number; count: number }> = {}
    progress.quizScores.forEach(qs => {
      if (!categoryScores[qs.category]) categoryScores[qs.category] = { total: 0, count: 0 }
      categoryScores[qs.category].total += (qs.score / qs.total) * 100
      categoryScores[qs.category].count += 1
    })

    const beforeScores: Record<string, number> = {}
    Object.entries(categoryScores).forEach(([category, { total, count }]) => {
      const avg = total / count
      beforeScores[category] = Math.round(avg)
      if (avg < 70) weakCategories.push(category)
      else strongCategories.push(category)
    })

    let pool: typeof questions = []

    // 3 questions from each weak category
    weakCategories.forEach(cat => {
      const catQuestions = shuffleArray(questions.filter(q => q.category === cat)).slice(0, 3)
      pool.push(...catQuestions)
    })

    // 2 questions from strong categories (spaced repetition)
    const shuffledStrong = shuffleArray(strongCategories)
    shuffledStrong.slice(0, 3).forEach(cat => {
      const catQuestions = shuffleArray(questions.filter(q => q.category === cat)).slice(0, 2)
      pool.push(...catQuestions)
    })

    // If pool is too small, fill with random
    if (pool.length < 5) {
      const remaining = shuffleArray(questions.filter(q => !pool.some(p => p.id === q.id)))
      pool.push(...remaining.slice(0, 10 - pool.length))
    }

    const finalPool = shuffleArray(pool).slice(0, Math.min(15, pool.length))

    setSession({
      questions: finalPool,
      currentIndex: 0,
      answers: new Array(finalPool.length).fill(null),
      showResult: false,
      selectedAnswer: null,
      complete: false,
      startTime: Date.now(),
      beforeScores,
    })
    setXpEarned(0)
    setAfterScores({})
  }, [progress.quizScores])

  // ── Action handlers ──
  const handleAction = useCallback((item: ReviewItem) => {
    if (item.actionType === 'study') {
      setActiveSection('roadmap')
      setActiveSubSection(item.actionTarget)
      return
    }
    if (item.actionType === 'flashcards') {
      setActiveSection('study')
      setActiveSubSection('flashcards')
      return
    }
    // Quiz — start smart review session
    startSmartReview()
  }, [setActiveSection, setActiveSubSection, startSmartReview])

  // ── Quiz session logic ──
  const handleSelectAnswer = useCallback((idx: number) => {
    if (!session || session.showResult) return
    const newAnswers = [...session.answers]
    newAnswers[session.currentIndex] = idx
    setSession(prev => prev ? {
      ...prev,
      selectedAnswer: idx,
      answers: newAnswers,
      showResult: true,
    } : prev)
  }, [session])

  const handleFinishQuiz = useCallback(() => {
    if (!session) return
    const after: Record<string, number> = {}
    const categoryCorrect: Record<string, { correct: number; total: number }> = {}

    session.questions.forEach((q, i) => {
      if (!categoryCorrect[q.category]) categoryCorrect[q.category] = { correct: 0, total: 0 }
      categoryCorrect[q.category].total++
      if (session.answers[i] === q.correctAnswer) categoryCorrect[q.category].correct++
    })

    Object.entries(categoryCorrect).forEach(([cat, { correct, total }]) => {
      after[cat] = total > 0 ? Math.round((correct / total) * 100) : 0
    })

    const totalCorrect = session.questions.reduce((c, q, i) => c + (session.answers[i] === q.correctAnswer ? 1 : 0), 0)
    const xp = totalCorrect * 10
    addXp(xp)
    setXpEarned(xp)
    addQuizScore(totalCorrect, session.questions.length, 'Smart Review')
    setAfterScores(after)
    setSession(prev => prev ? { ...prev, complete: true } : prev)

    toast({
      title: t('smart.reviewComplete'),
      description: `${t('common.score')}: ${totalCorrect}/${session.questions.length}`,
    })
  }, [session, addQuizScore, addXp, toast, t])

  const handleNext = useCallback(() => {
    if (!session) return
    if (session.currentIndex < session.questions.length - 1) {
      const nextAnswer = session.answers[session.currentIndex + 1]
      setSession(prev => prev ? {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: nextAnswer,
        showResult: nextAnswer !== null,
      } : prev)
    } else {
      handleFinishQuiz()
    }
  }, [session, handleFinishQuiz])

  const handlePrev = useCallback(() => {
    if (!session || session.currentIndex === 0) return
    setSession(prev => {
      if (!prev || prev.currentIndex === 0) return prev
      const prevAnswer = prev.answers[prev.currentIndex - 1]
      return {
        ...prev,
        currentIndex: prev.currentIndex - 1,
        selectedAnswer: prevAnswer,
        showResult: prevAnswer !== null,
      }
    })
  }, [session])

  const exitSession = useCallback(() => {
    setSession(null)
    setAfterScores({})
    setXpEarned(0)
  }, [])

  // ═══════════════════════════════════════════
  // ── Review Complete Summary ──
  // ═══════════════════════════════════════════
  if (session?.complete) {
    const totalCorrect = session.questions.reduce((c, q, i) => c + (session.answers[i] === q.correctAnswer ? 1 : 0), 0)
    const scorePercent = Math.round((totalCorrect / session.questions.length) * 100)
    const timeTaken = Math.round((Date.now() - session.startTime) / 1000)
    const mins = Math.floor(timeTaken / 60)
    const secs = timeTaken % 60

    const categoryBreakdown: Record<string, { correct: number; total: number }> = {}
    session.questions.forEach((q, i) => {
      if (!categoryBreakdown[q.category]) categoryBreakdown[q.category] = { correct: 0, total: 0 }
      categoryBreakdown[q.category].total++
      if (session.answers[i] === q.correctAnswer) categoryBreakdown[q.category].correct++
    })

    return (
      <div className="content-transition space-y-6">
        <Card className="text-center">
          <CardContent className="p-6 sm:p-8">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-ems-teal/20 dark:from-teal-900/30 dark:to-ems-teal/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className={cn('w-10 h-10', scorePercent >= 70 ? 'text-yellow-500' : 'text-muted-foreground')} />
              </div>
              <h2 className="text-xl font-bold mb-1">{t('smart.reviewComplete')}</h2>
              <p className="text-sm text-muted-foreground mb-4">{totalCorrect} / {session.questions.length} ({scorePercent}%)</p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{mins}:{String(secs).padStart(2, '0')}</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" />+{xpEarned} XP</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Before / After Comparison */}
        {Object.keys(session.beforeScores).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-ems-teal" />
                {t('smart.beforeAfterComparison')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(session.beforeScores).map(([cat, before]) => {
                const after = afterScores[cat]
                const improved = after !== undefined && after > before
                const declined = after !== undefined && after < before
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium truncate flex-1">{cat}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-muted-foreground">{before}%</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className={cn('font-semibold', improved ? 'text-green-600' : declined ? 'text-red-600' : 'text-foreground')}>
                          {after !== undefined ? after : '–'}%
                        </span>
                        {improved && <span className="text-green-500 text-[10px]">▲</span>}
                        {declined && <span className="text-red-500 text-[10px]">▼</span>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Progress value={before} className="flex-1 h-1.5 opacity-50" />
                      <Progress value={after || 0} className={cn('flex-1 h-1.5', improved && '[&>div]:bg-green-500', declined && '[&>div]:bg-red-500')} />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t('smart.sessionBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(categoryBreakdown).map(([cat, data]) => {
              const pct = Math.round((data.correct / data.total) * 100)
              return (
                <div key={cat} className="flex items-center gap-2">
                  <span className="text-xs font-medium w-32 sm:w-40 truncate flex-shrink-0">{cat}</span>
                  <Progress value={pct} className="flex-1 h-2 min-w-0" />
                  <span className="text-[10px] text-muted-foreground w-16 text-right flex-shrink-0">
                    {data.correct}/{data.total} ({pct}%)
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={exitSession} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-1" /> {t('smart.backToReview')}
          </Button>
          <Button onClick={startSmartReview} className="flex-1">
            <Play className="w-4 h-4 mr-1" /> {t('smart.reviewAgain')}
          </Button>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════
  // ── Active Review Session (Quiz Mode) ──
  // ═══════════════════════════════════════════
  if (session && !session.complete) {
    const current = session.questions[session.currentIndex]
    const answeredCount = session.answers.filter(a => a !== null).length

    return (
      <div className="content-transition space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Progress value={(answeredCount / session.questions.length) * 100} className="flex-1 h-2" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">{answeredCount}/{session.questions.length}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={exitSession}>
            <XCircle className="w-4 h-4 mr-1" /> {t('common.exitQuiz')}
          </Button>
        </div>

        <Card className="card-modern">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="text-[10px]">{current.category}</Badge>
              <span className="text-xs text-muted-foreground">
                {t('smart.questionOf', { current: session.currentIndex + 1, total: session.questions.length })}
              </span>
            </div>
            <h3 className="font-semibold text-sm md:text-base mb-4 break-words">{current.question}</h3>
            <div className="space-y-2">
              {current.options.map((option, idx) => {
                const isSelected = session.selectedAnswer === idx
                const isCorrect = idx === current.correctAnswer
                let optionClass = 'quiz-option quiz-option-glow border-2 rounded-lg p-3'
                if (session.showResult) {
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
                        session.showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                        session.showResult && isSelected && !isCorrect && 'border-ems-red bg-ems-red text-white'
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm text-left break-words min-w-0">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            {session.showResult && (
              <div className={cn(
                'mt-4 p-3 rounded-lg content-transition',
                session.selectedAnswer === current.correctAnswer
                  ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
              )}>
                <p className="text-sm font-semibold mb-1">
                  {session.selectedAnswer === current.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  {t('smart.correctAnswer')}: {current.options[current.correctAnswer]}
                </p>
                <p className="text-xs text-foreground/70">{current.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={session.currentIndex === 0}>
            <ArrowLeft className="w-4 h-4 mr-1" /> {t('common.back')}
          </Button>
          {session.showResult ? (
            session.currentIndex < session.questions.length - 1 ? (
              <Button size="sm" onClick={handleNext}>
                {t('common.next')} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={handleFinishQuiz}>
                {t('smart.finishReview')} <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            )
          ) : null}
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════
  // ── Main Review Dashboard ──
  // ═══════════════════════════════════════════
  const highCount = reviewItems.filter(i => i.priority === 'high').length
  const mediumCount = reviewItems.filter(i => i.priority === 'medium').length
  const lowCount = reviewItems.filter(i => i.priority === 'low').length
  const hasItems = reviewItems.length > 0

  return (
    <div className="content-transition space-y-6">
      {/* Header Card */}
      <Card className="card-modern overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-ems-teal/5 to-purple-500/5 pointer-events-none" />
        <CardHeader className="relative">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5 text-ems-teal" />
                {t('smart.title')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{t('smart.subtitle')}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-ems-teal/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-ems-teal" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {hasItems ? (
            <>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">{highCount}</p>
                  <p className="text-[10px] text-muted-foreground">{t('smart.highPriority')}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{mediumCount}</p>
                  <p className="text-[10px] text-muted-foreground">{t('smart.mediumPriority')}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{lowCount}</p>
                  <p className="text-[10px] text-muted-foreground">{t('smart.lowPriority')}</p>
                </div>
              </div>
              <Button className="w-full gap-2" onClick={startSmartReview}>
                <Play className="w-4 h-4" />
                {t('smart.startSmartReview')}
              </Button>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-green-600">{t('smart.allCaughtUp')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('smart.allCaughtUpDesc')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Items */}
      {hasItems && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-ems-teal" />
            {t('smart.recommendedActions')}
          </h3>
          <AnimatePresence>
            {reviewItems.map((item, i) => {
              const config = PRIORITY_CONFIG[item.priority]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Card className={cn('card-modern hover:card-enhanced-hover transition-all overflow-hidden', config.border)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', config.bg)}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge className={cn('text-[10px]', config.bg, config.color)} variant="outline">
                              {config.label}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {item.category}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-sm mb-0.5 break-words">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2 break-words">{item.description}</p>
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />~{item.estimatedMinutes} {t('smart.min')}
                            </span>
                            <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => handleAction(item)}>
                              {item.actionLabel}
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Empty state for new users */}
      {progress.quizScores.length === 0 && progress.readTopics.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold mb-1">{t('smart.getStarted')}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">{t('smart.getStartedDesc')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
