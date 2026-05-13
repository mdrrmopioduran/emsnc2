'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { questions } from '@/data/questions'
import {
  CalendarDays, Flame, Zap, CheckCircle2, XCircle, Clock,
  Trophy, ArrowRight, RotateCcw, Sparkles, Timer
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkeletonChallengeIntro } from '@/components/ui/skeleton-loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/hooks/use-translation'

// Seeded random based on date string
function seededRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  let state = Math.abs(hash) || 1
  return () => {
    state = (state * 1664525 + 1013904223) & 0x7fffffff
    return state / 0x7fffffff
  }
}

function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const diff = midnight.getTime() - now.getTime()
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function DailyChallengeSection() {
  const { progress, completeDailyChallenge } = useAppStore()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [])

  const today = new Date().toISOString().split('T')[0]
  const isCompletedToday = progress.dailyChallengeCompleted.startsWith(today)

  // Select 5 random questions based on today's date
  const dailyQuestions = useMemo(() => {
    const rand = seededRandom(today)
    const shuffled = [...questions].sort(() => rand() - 0.5)
    return shuffled.slice(0, 5)
  }, [today])

  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [challengeDone, setChallengeDone] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight())

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectAnswer = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = idx
    setAnswers(newAnswers)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < dailyQuestions.length - 1) {
      const nextAnswer = answers[currentIndex + 1]
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(nextAnswer)
      setShowResult(nextAnswer !== null)
    } else {
      // Finish challenge
      setChallengeDone(true)
      completeDailyChallenge()
      const correct = dailyQuestions.reduce((acc, q, i) => {
        return acc + (answers[i] === q.correctAnswer ? 1 : 0)
      }, 0)
      toast({
        title: t('daily.completed'),
        description: `${correct}/${dailyQuestions.length} — ${t('daily.xpReward')}`,
      })
    }
  }

  const startChallenge = useCallback(() => {
    setStarted(true)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setAnswers(new Array(dailyQuestions.length).fill(null))
    setChallengeDone(false)
  }, [dailyQuestions.length])

  // Skeleton loading state (after all hooks)
  if (loading) {
    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <SkeletonChallengeIntro />
      </div>
    )
  }

  // If already completed today, show results screen
  if (isCompletedToday && !started) {
    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="card-modern border-ems-teal/20 bg-gradient-to-br from-ems-teal/5 to-transparent challenge-accent-bar">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-ems-teal/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-ems-teal" />
            </div>
            <h3 className="text-lg font-bold text-ems-teal mb-1">{t('daily.alreadyDone')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('daily.xpReward')}</p>

            {/* Streak */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="w-5 h-5 text-orange-500 streak-flame-icon" />
              <span className="text-sm font-semibold">{progress.dailyChallengeStreak || 0} {t('daily.streak')}</span>
            </div>

            {/* Countdown to next */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{t('daily.nextIn')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold font-mono">
                <span className="bg-card px-3 py-1.5 rounded-lg border border-border">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-card px-3 py-1.5 rounded-lg border border-border">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-card px-3 py-1.5 rounded-lg border border-border">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Challenge done screen
  if (challengeDone) {
    let correct = 0
    dailyQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++
    })
    const scorePercent = Math.round((correct / dailyQuestions.length) * 100)
    const isPerfect = correct === dailyQuestions.length

    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="card-modern text-center border-2 border-ems-teal/30">
          <CardContent className="p-6 sm:p-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className={cn('w-8 h-8', isPerfect ? 'text-amber-500' : 'text-ems-teal')} />
            </div>
            <h3 className="text-xl font-bold mb-2">
              {isPerfect ? t('daily.perfect') : t('daily.greatJob')}
            </h3>
            <div className={cn('text-4xl font-bold mb-2', scorePercent >= 80 ? 'text-green-500' : scorePercent >= 60 ? 'text-amber-500' : 'text-ems-red')}>
              {scorePercent}%
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {correct}/{dailyQuestions.length} {t('common.correct')}
            </p>
            <Badge className="bg-ems-teal text-white">{t('daily.xpReward')}</Badge>
          </CardContent>
        </Card>

        {/* Review answers */}
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="text-sm">{t('daily.score')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dailyQuestions.map((q, i) => {
              const isCorrect = answers[i] === q.correctAnswer
              return (
                <div key={q.id} className={cn(
                  'p-3 rounded-lg border text-sm',
                  isCorrect
                    ? 'border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800'
                    : 'border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800'
                )}>
                  <div className="flex items-start gap-2">
                    {isCorrect
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    }
                    <div className="min-w-0">
                      <p className="font-medium break-words">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-red-600 mt-0.5 break-words">Your: {answers[i] !== null ? q.options[answers[i]!] : '—'}</p>
                      )}
                      <p className="text-xs text-green-600 break-words">Correct: {q.options[q.correctAnswer]}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Start screen
  if (!started) {
    return (
      <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
        <Card className="card-modern border-amber-200/50 dark:border-amber-800/30 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20 challenge-accent-bar">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold mb-1">{t('daily.title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('daily.subtitle')}</p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold">{t('daily.xpReward')}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 streak-flame-icon" />
                <span className="text-xs font-semibold">{progress.dailyChallengeStreak || 0} {t('daily.streak')}</span>
              </div>
            </div>

            <Button
              onClick={startChallenge}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('daily.start')}
            </Button>

            {/* Countdown */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Timer className="w-3.5 h-3.5" />
              <span>{t('daily.nextIn')}: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Active challenge
  const current = dailyQuestions[currentIndex]
  const answeredCount = answers.filter((a) => a !== null).length

  return (
    <div className="content-transition space-y-4 overflow-x-hidden w-full max-w-full">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Progress value={(answeredCount / dailyQuestions.length) * 100} className="flex-1 h-2" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {answeredCount}/{dailyQuestions.length}
          </span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CalendarDays className="w-3 h-3 mr-1" />
          {t('daily.title')}
        </Badge>
      </div>

      {/* Question */}
      <Card className="card-modern">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-[10px]">{current.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {t('daily.questionOf').replace('{current}', String(currentIndex + 1)).replace('{total}', String(dailyQuestions.length))}
            </span>
          </div>
          <h3 className="font-semibold text-sm md:text-base mb-4 break-words">{current.question}</h3>

          <div className="space-y-2">
            {current.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isCorrect = idx === current.correctAnswer

              return (
                <button
                  key={idx}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border-2 transition-all text-sm',
                    showResult && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-950/30',
                    showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-950/30',
                    !showResult && isSelected && 'border-primary bg-primary/5',
                    !showResult && !isSelected && 'border-border hover:border-primary/50'
                  )}
                  onClick={() => handleSelectAnswer(idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0',
                      showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                      showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500 text-white',
                      !showResult && isSelected && 'border-primary bg-primary text-primary-foreground',
                      !showResult && !isSelected && 'border-border'
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="break-words min-w-0">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className={cn(
              'mt-4 p-3 rounded-lg text-sm',
              selectedAnswer === current.correctAnswer
                ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
            )}>
              <p className="font-semibold text-xs mb-0.5">
                {selectedAnswer === current.correctAnswer ? '✓ ' + t('common.correct') : '✗ ' + t('common.incorrect')}
              </p>
              <p className="text-xs text-muted-foreground break-words">{current.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        {showResult && (
          <Button size="sm" onClick={handleNext}>
            {currentIndex < dailyQuestions.length - 1 ? (
              <><span>{t('common.next')}</span> <ArrowRight className="w-4 h-4 ml-1" /></>
            ) : (
              <><CheckCircle2 className="w-4 h-4 mr-1" /> {t('common.finish')}</>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
