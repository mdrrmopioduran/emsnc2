'use client'
import React, { useMemo } from 'react'
import { useAppStore, BADGE_DEFINITIONS, getLevelFromXp } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Target,
  Flame,
  Clock,
  Trophy,
  Award,
  BookOpen,
  TrendingUp,
  Calendar,
  Zap,
  Brain,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { roadmapTopics } from '@/data/roadmap'

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatSeconds(sec: number): string {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`
  const h = Math.floor(m / 60)
  const rm = m % 60
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`
}

function getScoreColor(pct: number) {
  if (pct >= 70) return 'bg-emerald-500 text-white'
  if (pct >= 50) return 'bg-amber-500 text-white'
  return 'bg-red-500 text-white'
}

function getScoreRing(pct: number) {
  if (pct >= 70) return 'text-emerald-500'
  if (pct >= 50) return 'text-amber-500'
  return 'text-red-500'
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getDayKey(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toISOString().split('T')[0] // YYYY-MM-DD
}

function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr).getDay()
}

// ── Sub-components ───────────────────────────────────────────────────────────

function QuickStatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  sub?: string
  color: string
}) {
  return (
    <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
      <CardContent className="p-5 flex items-start gap-4">
        <div
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl shrink-0',
            color
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
          {sub && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function StudyTimeChart({
  timeSpent,
}: {
  timeSpent: Record<string, number>
}) {
  const entries = useMemo(() => {
    return Object.entries(timeSpent)
      .filter(([, sec]) => sec > 0)
      .map(([topicId, sec]) => {
        const topic = roadmapTopics.find((t) => t.id === topicId)
        return {
          id: topicId,
          title: topic?.title ?? topicId,
          icon: topic?.icon ?? '📘',
          seconds: sec,
        }
      })
      .sort((a, b) => b.seconds - a.seconds)
  }, [timeSpent])

  const maxSeconds = Math.max(...entries.map((e) => e.seconds), 1)

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">
          No study time recorded yet.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Start reading topics to track your time here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const pct = (entry.seconds / maxSeconds) * 100
        return (
          <div key={entry.id} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground truncate flex items-center gap-1.5">
                <span className="text-base">{entry.icon}</span>
                {entry.title}
              </span>
              <span className="text-xs font-semibold text-muted-foreground ml-2 shrink-0">
                {formatSeconds(entry.seconds)}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted/60 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.max(pct, 4)}%`,
                  background:
                    'linear-gradient(90deg, #2EC4B6 0%, #1E3A5F 100%)',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function QuizPerformanceList({
  quizScores,
}: {
  quizScores: { date: string; score: number; total: number; category: string }[]
}) {
  const sorted = useMemo(() => {
    return [...quizScores]
      .map((q) => ({ ...q, pct: Math.round((q.score / q.total) * 100) }))
      .reverse()
  }, [quizScores])

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Target className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">No quiz attempts yet.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Complete quizzes to see your performance history.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
      {sorted.map((q, i) => {
        const date = new Date(q.date)
        const dateStr = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        return (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
          >
            <div className="shrink-0">
              <div
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-lg text-sm font-bold',
                  getScoreColor(q.pct)
                )}
              >
                {q.pct}%
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {q.category}
              </p>
              <p className="text-xs text-muted-foreground">
                {q.score}/{q.total} correct &middot; {dateStr}
              </p>
            </div>
            {q.pct >= 90 && (
              <TrendingUp className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            {q.pct >= 70 && q.pct < 90 && (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            )}
            {q.pct < 50 && (
              <Target className="w-4 h-4 text-red-400 shrink-0" />
            )}
          </div>
        )
      })}
    </div>
  )
}

function WeeklyHeatmap({
  quizScores,
  readTopics,
}: {
  quizScores: { date: string; score: number; total: number; category: string }[]
  readTopics: string[]
}) {
  // Collect all unique dates from quizScores (readTopics don't have dates, so we only use quiz dates)
  const activityMap = useMemo(() => {
    const map: Record<string, number> = {}
    quizScores.forEach((q) => {
      const day = getDayKey(q.date)
      map[day] = (map[day] || 0) + 1
    })
    return map
  }, [quizScores])

  // Get the last 7 days (today + 6 days back)
  const days = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() - (6 - i))
      return {
        dayOfWeek: d.getDay(),
        dateKey: d.toISOString().split('T')[0],
        label: DAY_LABELS[d.getDay()],
        shortDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: activityMap[d.toISOString().split('T')[0]] || 0,
        isToday: d.toISOString().split('T')[0] === new Date().toISOString().split('T')[0],
      }
    })
  }, [activityMap])

  const maxCount = Math.max(...days.map((d) => d.count), 1)

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((d, i) => (
          <div key={i} className="text-center">
            <p
              className={cn(
                'text-xs font-medium mb-2',
                d.isToday ? 'text-[#2EC4B6] font-bold' : 'text-muted-foreground'
              )}
            >
              {d.label}
            </p>
            <div
              className={cn(
                'relative mx-auto w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-300 border-2',
                d.isToday ? 'border-[#2EC4B6]/50' : 'border-transparent',
                d.count === 0
                  ? 'bg-muted/40'
                  : d.count <= maxCount * 0.33
                    ? 'bg-[#2EC4B6]/20'
                    : d.count <= maxCount * 0.66
                      ? 'bg-[#2EC4B6]/40'
                      : 'bg-[#2EC4B6]/70'
              )}
            >
              {d.count > 0 ? (
                <Zap
                  className={cn(
                    'w-4 h-4',
                    d.count >= 2 ? 'text-white' : 'text-[#2EC4B6]'
                  )}
                />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
              )}
              {d.count > 1 && (
                <span className="text-[10px] font-bold text-white mt-0.5">
                  {d.count}
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-1.5">
              {d.shortDate}
            </p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-xs text-muted-foreground">Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded bg-muted/40" />
          <div className="w-4 h-4 rounded bg-[#2EC4B6]/20" />
          <div className="w-4 h-4 rounded bg-[#2EC4B6]/40" />
          <div className="w-4 h-4 rounded bg-[#2EC4B6]/70" />
        </div>
        <span className="text-xs text-muted-foreground">More</span>
      </div>

      {quizScores.length === 0 && (
        <p className="text-center text-xs text-muted-foreground/60 mt-3">
          Activity shows quiz completions over the last 7 days.
        </p>
      )}
    </div>
  )
}

function AchievementShowcase({ unlockedIds }: { unlockedIds: string[] }) {
  const categories = ['progress', 'quiz', 'simulation', 'streak', 'special'] as const
  const categoryLabels: Record<string, string> = {
    progress: 'Progress',
    quiz: 'Quizzes',
    simulation: 'Simulations',
    streak: 'Streaks',
    special: 'Special',
  }

  return (
    <div className="space-y-5">
      {categories.map((cat) => {
        const badges = BADGE_DEFINITIONS.filter((b) => b.category === cat)
        if (badges.length === 0) return null
        return (
          <div key={cat}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {categoryLabels[cat]}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {badges.map((badge) => {
                const unlocked = unlockedIds.includes(badge.id)
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      'relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300',
                      unlocked
                        ? 'border-[#2EC4B6]/30 bg-[#2EC4B6]/5 hover:border-[#2EC4B6]/50 hover:bg-[#2EC4B6]/10'
                        : 'border-muted bg-muted/30 opacity-50'
                    )}
                  >
                    {unlocked ? (
                      <div className="text-2xl mb-1.5">{badge.icon}</div>
                    ) : (
                      <div className="relative text-2xl mb-1.5 grayscale">
                        {badge.icon}
                        <Lock className="absolute -bottom-0.5 -right-1 w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    <p
                      className={cn(
                        'text-xs font-semibold leading-tight',
                        unlocked ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {badge.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-0.5 leading-tight line-clamp-2">
                      {badge.description}
                    </p>
                    {unlocked && (
                      <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-[#2EC4B6]" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export function StudyStatsSection() {
  const progress = useAppStore((s) => s.progress)

  // Derived stats
  const totalStudyTime = useMemo(() => {
    return Object.values(progress.timeSpent).reduce((a, b) => a + b, 0)
  }, [progress.timeSpent])

  const quizzesCompleted = progress.quizScores.length

  const averageScore = useMemo(() => {
    if (progress.quizScores.length === 0) return 0
    const sum = progress.quizScores.reduce(
      (a, q) => a + (q.score / q.total) * 100,
      0
    )
    return Math.round(sum / progress.quizScores.length)
  }, [progress.quizScores])

  const bestStreak = progress.streak

  const totalBadges = BADGE_DEFINITIONS.length
  const unlockedBadges = progress.badges.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold shimmer-text mb-2">
          Study Statistics
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl">
          Track your learning journey with detailed insights into your study
          time, quiz performance, weekly activity, and achievements.
        </p>
      </div>

      {/* ── Quick Stats Summary ───────────────────────────────────────── */}
      <section aria-label="Quick stats summary">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <QuickStatCard
            icon={Clock}
            label="Total Study Time"
            value={formatSeconds(totalStudyTime)}
            sub={
              Object.keys(progress.timeSpent).length > 0
                ? `${Object.keys(progress.timeSpent).length} topics studied`
                : 'Start studying to track time'
            }
            color="bg-gradient-to-br from-[#2EC4B6] to-[#1a9e93]"
          />
          <QuickStatCard
            icon={Target}
            label="Quizzes Completed"
            value={quizzesCompleted}
            sub={
              quizzesCompleted > 0
                ? `Average: ${averageScore}%`
                : 'Take your first quiz'
            }
            color="bg-gradient-to-br from-[#1E3A5F] to-[#142a45]"
          />
          <QuickStatCard
            icon={Flame}
            label="Best Streak"
            value={`${bestStreak} day${bestStreak !== 1 ? 's' : ''}`}
            sub={
              bestStreak >= 7
                ? 'Amazing consistency!'
                : bestStreak >= 3
                  ? 'Keep going!'
                  : 'Study daily to build streak'
            }
            color="bg-gradient-to-br from-[#E63946] to-[#c12d38]"
          />
          <QuickStatCard
            icon={Award}
            label="Badges Earned"
            value={`${unlockedBadges}/${totalBadges}`}
            sub={
              unlockedBadges === totalBadges
                ? 'All badges unlocked!'
                : `${totalBadges - unlockedBadges} remaining`
            }
            color="bg-gradient-to-br from-amber-500 to-amber-600"
          />
        </div>
      </section>

      {/* ── Charts Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Time Chart */}
        <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2EC4B6]/10">
                  <BarChart3 className="w-4 h-4 text-[#2EC4B6]" />
                </div>
                <CardTitle className="text-base font-semibold">
                  Study Time by Topic
                </CardTitle>
              </div>
              <Badge
                variant="outline"
                className="text-xs font-normal text-muted-foreground"
              >
                {formatSeconds(totalStudyTime)} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <StudyTimeChart timeSpent={progress.timeSpent} />
          </CardContent>
        </Card>

        {/* Quiz Performance */}
        <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1E3A5F]/10">
                  <Brain className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <CardTitle className="text-base font-semibold">
                  Quiz Performance
                </CardTitle>
              </div>
              {quizzesCompleted > 0 && (
                <Badge
                  className={cn('text-xs font-bold', getScoreColor(averageScore))}
                >
                  Avg {averageScore}%
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <QuizPerformanceList quizScores={progress.quizScores} />
          </CardContent>
        </Card>
      </div>

      {/* ── Weekly Activity Heatmap ───────────────────────────────────── */}
      <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2EC4B6]/10">
                <Calendar className="w-4 h-4 text-[#2EC4B6]" />
              </div>
              <CardTitle className="text-base font-semibold">
                Weekly Activity
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              Last 7 days
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <WeeklyHeatmap
            quizScores={progress.quizScores}
            readTopics={progress.readTopics}
          />
        </CardContent>
      </Card>

      {/* ── Achievement Showcase ──────────────────────────────────────── */}
      <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <CardTitle className="text-base font-semibold">
                Achievements
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-normal text-muted-foreground"
            >
              {unlockedBadges}/{totalBadges} unlocked
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <AchievementShowcase unlockedIds={progress.badges} />
        </CardContent>
      </Card>

      {/* ── Level & XP ────────────────────────────────────────────────── */}
      <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1E3A5F]/10">
              <Zap className="w-4 h-4 text-[#1E3A5F]" />
            </div>
            <CardTitle className="text-base font-semibold">
              Level & Experience
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2EC4B6] to-[#1E3A5F] text-white text-2xl font-bold shadow-lg">
                {getLevelFromXp(progress.xp)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Level {getLevelFromXp(progress.xp)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {progress.xp} total XP
                </p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">
                  Progress to Level {getLevelFromXp(progress.xp) + 1}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {progress.xp % 100}/100 XP
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted/60 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(progress.xp % 100)}%`,
                    background:
                      'linear-gradient(90deg, #2EC4B6 0%, #1E3A5F 100%)',
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                {100 - (progress.xp % 100)} XP needed for next level
              </p>
            </div>
          </div>

          {/* XP breakdown hints */}
          <div className="mt-5 pt-4 border-t border-muted/60">
            <p className="text-xs font-medium text-muted-foreground mb-2.5">
              How to earn XP
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Read Topic', value: '+25 XP' },
                { icon: <Target className="w-3.5 h-3.5" />, label: 'Quiz Complete', value: '+30 XP' },
                { icon: <Trophy className="w-3.5 h-3.5" />, label: 'Perfect Quiz', value: '+50 XP' },
                { icon: <Zap className="w-3.5 h-3.5" />, label: 'Simulation', value: '+40 XP' },
                { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Module Quiz', value: '+15 XP' },
                { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Daily Login', value: '+10 XP' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2"
                >
                  <span className="text-[#2EC4B6]">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  <span className="font-semibold text-foreground text-[10px]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
