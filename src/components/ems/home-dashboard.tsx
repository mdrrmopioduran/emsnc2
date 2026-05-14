'use client'

import React from 'react'
import { useAppStore, getLevelFromXp, getXpForNextLevel, BADGE_DEFINITIONS } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { Card } from '@/components/ui/card'
import { roadmapTopics } from '@/data/roadmap'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  ClipboardCheck,
  Flame,
  Trophy,
  Zap,
  CalendarDays,
  CheckCircle2,
  Play,
  ArrowRight,
  CreditCard,
  Timer,
  LetterText,
  Pill,
  FlaskConical,
  Sparkles,
  Target,
} from 'lucide-react'

export function HomeDashboard() {
  const {
    progress,
    setActiveSection,
    setActiveSubSection,
    setSidebarOpen,
  } = useAppStore()

  const { t } = useTranslation()

  // Time-based greeting
  const hour = new Date().getHours()
  const greetingKey = hour < 12 ? 'home.goodMorning' : hour < 17 ? 'home.goodAfternoon' : 'home.goodEvening'
  const greeting = `${t(greetingKey)}, ${t('home.greeting')}!`

  // Level / XP info
  const level = getLevelFromXp(progress.xp)
  const xpInfo = getXpForNextLevel(progress.xp)

  // Stats
  const topicsRead = progress.readTopics.length
  const totalTopics = roadmapTopics.length
  const quizzesTaken = progress.quizScores.length
  const streak = progress.streak
  const badgesEarned = progress.badges.length
  const totalBadges = BADGE_DEFINITIONS.length

  // Daily challenge check
  const todayStr = new Date().toISOString().split('T')[0]
  const challengeDoneToday = progress.dailyChallengeCompleted?.startsWith(todayStr)

  // Last viewed topic
  const lastViewedTopic = progress.lastViewedTopic
  const lastTopic = lastViewedTopic ? roadmapTopics.find((tp) => tp.id === lastViewedTopic) : null

  const navigateTo = (section: 'roadmap' | 'study' | 'visual' | 'assessment' | 'settings' | 'admin', sub = '') => {
    setActiveSection(section)
    if (sub) setActiveSubSection(sub)
    setSidebarOpen(false)
  }

  // Quick action items
  const quickActions = [
    {
      icon: <FlaskConical className="w-5 h-5" />,
      label: t('home.startQuiz'),
      section: 'assessment' as const,
      sub: 'quiz',
      bg: 'bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400',
      hover: 'hover:bg-teal-100 dark:hover:bg-teal-950/60',
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: t('home.flashcards'),
      section: 'study' as const,
      sub: 'flashcards',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-950/60',
    },
    {
      icon: <Timer className="w-5 h-5" />,
      label: t('home.focusTimer'),
      section: 'settings' as const,
      sub: '',
      bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
      hover: 'hover:bg-amber-100 dark:hover:bg-amber-950/60',
    },
    {
      icon: <LetterText className="w-5 h-5" />,
      label: t('home.acronyms'),
      section: 'study' as const,
      sub: 'acronyms',
      bg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
      hover: 'hover:bg-rose-100 dark:hover:bg-rose-950/60',
    },
    {
      icon: <Pill className="w-5 h-5" />,
      label: t('home.drugReference'),
      section: 'study' as const,
      sub: 'drugs',
      bg: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
      hover: 'hover:bg-cyan-100 dark:hover:bg-cyan-950/60',
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: t('home.startChallenge'),
      section: 'assessment' as const,
      sub: 'daily-challenge',
      bg: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
      hover: 'hover:bg-orange-100 dark:hover:bg-orange-950/60',
    },
  ]

  // Stat cards
  const statCards = [
    {
      value: `${topicsRead}/${totalTopics}`,
      label: t('home.topicsRead'),
      icon: <BookOpen className="w-5 h-5" />,
      bg: 'bg-teal-500',
      ring: 'ring-teal-100 dark:ring-teal-900/50',
    },
    {
      value: quizzesTaken.toString(),
      label: t('home.quizzesTaken'),
      icon: <ClipboardCheck className="w-5 h-5" />,
      bg: 'bg-slate-700',
      ring: 'ring-slate-200 dark:ring-slate-800/50',
    },
    {
      value: streak.toString(),
      label: t('home.studyStreak'),
      icon: <Flame className="w-5 h-5" />,
      bg: 'bg-orange-500',
      ring: 'ring-orange-100 dark:ring-orange-900/50',
    },
    {
      value: `${badgesEarned}/${totalBadges}`,
      label: t('home.badgesEarned'),
      icon: <Trophy className="w-5 h-5" />,
      bg: 'bg-amber-500',
      ring: 'ring-amber-100 dark:ring-amber-900/50',
    },
  ]

  return (
    <div className="space-y-5">
      {/* ─── Welcome Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-800 dark:via-teal-800 dark:to-emerald-900 p-5 md:p-6 text-white shadow-lg">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-emerald-100 text-sm font-medium">{t(greetingKey)}</p>
              <h2 className="text-xl md:text-2xl font-bold mt-0.5 text-white">
                {t('home.greeting')}
              </h2>
              {/* Level & XP Progress */}
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-sm font-bold backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Level {level}
                </span>
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/30 text-sm font-bold backdrop-blur-sm">
                    <Flame className="w-3.5 h-3.5 text-orange-300" />
                    {streak} {t('home.daysStreak')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-emerald-100 mb-1.5">
              <span>{xpInfo.current} XP</span>
              <span>{xpInfo.needed} XP {t('other.toNext')}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-400 transition-all duration-700 ease-out"
                style={{ width: `${xpInfo.progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quick Stats Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((stat) => (
          <Card key={stat.label} className="py-4 px-4 gap-3 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm', stat.bg)}>
                {stat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg md:text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground font-medium truncate">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ─── Daily Challenge Banner ─── */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className={cn(
          'p-4 md:p-5',
          challengeDoneToday
            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30'
            : 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30'
        )}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
              challengeDoneToday
                ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                : 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
            )}>
              {challengeDoneToday ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <CalendarDays className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">
                {challengeDoneToday ? t('home.challengeDone') : t('home.dailyChallenge')}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {!challengeDoneToday && (
                  <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40 px-2 py-0.5 rounded-full">
                    +50 XP
                  </span>
                )}
                {challengeDoneToday && progress.dailyChallengeStreak > 0 && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    {progress.dailyChallengeStreak} {t('home.challengeStreak')}
                  </span>
                )}
              </div>
            </div>
            {!challengeDoneToday && (
              <button
                onClick={() => navigateTo('assessment', 'daily-challenge')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                {t('home.startChallenge')}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* ─── Quick Actions Grid ─── */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{t('home.quickActions')}</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigateTo(action.section, action.sub)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl transition-all duration-200 border border-border/50 hover:border-border hover:shadow-md active:scale-[0.97]',
                action.bg,
                action.hover,
              )}
            >
              {action.icon}
              <span className="text-[11px] md:text-xs font-semibold text-foreground text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Continue Learning ─── */}
      {lastTopic && (
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="p-4 md:p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <Play className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{t('home.continueLearning')}</p>
                  <p className="text-sm font-semibold text-foreground truncate">{lastTopic.title}</p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('roadmap', lastTopic.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors shadow-sm flex-shrink-0"
              >
                {t('home.resumeLesson')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
