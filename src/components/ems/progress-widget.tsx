'use client'

import React, { useMemo } from 'react'
import { useAppStore, getLevelFromXp } from '@/store/app-store'
import { roadmapTopics } from '@/data/roadmap'
import {
  TrendingUp, Target, BookOpen, ClipboardCheck, Brain,
  CreditCard, Clock, Flame, Trophy, Zap, AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from '@/hooks/use-translation'

export function ProgressWidget() {
  const { progress } = useAppStore()
  const { t } = useTranslation()

  // Overall completion: topics read, quizzes, simulations, flashcards
  const overallPct = useMemo(() => {
    const topicPct = Math.min(progress.readTopics.length / Math.max(roadmapTopics.length, 1), 1) * 0.35
    const quizPct = Math.min(progress.quizScores.length / 5, 1) * 0.25
    const simPct = Math.min(progress.completedSimulations.length / 5, 1) * 0.2
    const diagnosticPct = (progress.diagnosticCompleted ? 1 : 0) * 0.1
    const flashcardPct = 0.1 // placeholder for flashcard progress
    return Math.round((topicPct + quizPct + simPct + diagnosticPct + flashcardPct) * 100)
  }, [progress])

  // Exam readiness score
  const readiness = useMemo(() => {
    const avgQuizScore = progress.quizScores.length > 0
      ? progress.quizScores.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / progress.quizScores.length
      : 0
    const topicProgress = progress.readTopics.length / Math.max(roadmapTopics.length, 1)
    const simProgress = Math.min(progress.completedSimulations.length / 5, 1)
    const diagnosticBonus = progress.diagnosticCompleted ? 0.1 : 0

    return Math.round((topicProgress * 0.35 + (avgQuizScore / 100) * 0.35 + simProgress * 0.2 + diagnosticBonus) * 100)
  }, [progress])

  // Focus areas: weakest quiz categories
  const focusAreas = useMemo(() => {
    const catScores: Record<string, { total: number; correct: number; count: number }> = {}
    progress.quizScores.forEach((qs) => {
      if (!catScores[qs.category]) catScores[qs.category] = { total: 0, correct: 0, count: 0 }
      catScores[qs.category].total += qs.total
      catScores[qs.category].correct += qs.score
      catScores[qs.category].count += 1
    })

    return Object.entries(catScores)
      .map(([cat, data]) => ({
        category: cat,
        avg: Math.round((data.correct / data.total) * 100),
        attempts: data.count,
      }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 3)
  }, [progress])

  // Recent activity (last 5 meaningful events)
  const recentActivity = useMemo(() => {
    const events: { label: string; time: string; icon: string; color: string }[] = []

    if (progress.dailyChallengeCompleted) {
      events.push({ label: 'Daily challenge completed', time: progress.dailyChallengeCompleted, icon: '🎯', color: 'text-amber-500' })
    }
    progress.quizScores.slice(-3).reverse().forEach((qs) => {
      const pct = Math.round((qs.score / qs.total) * 100)
      events.push({ label: `Quiz: ${qs.category} (${pct}%)`, time: qs.date, icon: '📝', color: pct >= 70 ? 'text-green-500' : 'text-ems-red' })
    })
    progress.completedSimulations.slice(-2).reverse().forEach((id) => {
      events.push({ label: `Scenario completed: ${id}`, time: new Date().toISOString(), icon: '🦸', color: 'text-ems-teal' })
    })
    progress.readTopics.slice(-2).reverse().forEach((topicId) => {
      const topic = roadmapTopics.find(t => t.id === topicId)
      events.push({ label: `Topic read: ${topic?.title || topicId}`, time: progress.lastStudyDate || new Date().toISOString(), icon: '📖', color: 'text-primary' })
    })

    return events.slice(0, 5)
  }, [progress])

  const readinessLabel = readiness >= 85
    ? { text: t('progress.ready'), color: 'text-green-500', bg: 'bg-green-500' }
    : readiness >= 60
      ? { text: t('progress.almostReady'), color: 'text-amber-500', bg: 'bg-amber-500' }
      : readiness >= 30
        ? { text: t('progress.needsWork'), color: 'text-orange-500', bg: 'bg-orange-500' }
        : { text: t('progress.notStarted'), color: 'text-muted-foreground', bg: 'bg-muted-foreground' }

  const circumference = 2 * Math.PI * 42
  const strokeDashoffset = circumference - (overallPct / 100) * circumference

  const formatRelativeTime = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    if (diffMins < 1) return 'now'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return `${Math.floor(diffDays / 7)}w`
  }

  return (
    <Card className="card-modern overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-ems-teal" />
            <h3 className="font-semibold text-sm">{t('progress.overallProgress')}</h3>
          </div>

          <div className="flex items-center gap-6">
            {/* Circular progress ring */}
            <div className="relative flex-shrink-0">
              <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--ems-teal, #2EC4B6)" />
                    <stop offset="100%" stopColor="var(--ems-amber, #F59E0B)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{overallPct}%</span>
                <span className="text-[9px] text-muted-foreground">Complete</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-2.5">
              {/* Exam Readiness */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{t('progress.examReadiness')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', readinessLabel.bg)}
                      style={{ width: `${readiness}%`, opacity: 0.8 }}
                    />
                  </div>
                  <span className={cn('text-xs font-bold w-8 text-right', readinessLabel.color)}>{readiness}%</span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/30">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs">{progress.readTopics.length}/{roadmapTopics.length}</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/30">
                  <ClipboardCheck className="w-3.5 h-3.5 text-ems-teal" />
                  <span className="text-xs">{progress.quizScores.length} {t('settings.quizzesTaken').toLowerCase().replace('taken', '').trim()}</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/30">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-xs">{progress.streak}d</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-muted/30">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs">Lv.{getLevelFromXp(progress.xp)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        {focusAreas.length > 0 && (
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-semibold">{t('progress.focusAreas')}</span>
            </div>
            <div className="space-y-1.5">
              {focusAreas.map((area, i) => (
                <div key={area.category} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-3">{i + 1}.</span>
                  <span className="text-xs flex-1 truncate">{area.category}</span>
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        area.avg >= 70 ? 'bg-green-500' : area.avg >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${area.avg}%` }}
                    />
                  </div>
                  <span className={cn(
                    'text-[10px] font-bold w-7 text-right',
                    area.avg >= 70 ? 'text-green-500' : area.avg >= 50 ? 'text-amber-500' : 'text-red-500'
                  )}>
                    {area.avg}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold">{t('progress.recentActivity')}</span>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-xs text-muted-foreground">{t('progress.noActivity')}</p>
          ) : (
            <div className="space-y-1.5">
              {recentActivity.map((event, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs flex-shrink-0">{event.icon}</span>
                  <span className="text-xs text-muted-foreground flex-1 truncate">{event.label}</span>
                  <span className="text-[10px] text-muted-foreground/60 flex-shrink-0">{formatRelativeTime(event.time)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
