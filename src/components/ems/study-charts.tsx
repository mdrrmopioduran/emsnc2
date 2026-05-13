'use client'

import React, { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, Target, Zap, PieChart as PieIcon, TrendingUp } from 'lucide-react'
import { useAppStore, type ProgressData } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'

// ── Color constants ──────────────────────────────────────────────────────────
const TEAL = '#2EC4B6'
const TEAL_LIGHT = '#99E2DB'
const TEAL_DARK = '#1A9E93'
const AMBER = '#F59E0B'
const AMBER_LIGHT = '#FCD34D'
const PURPLE = '#8B5CF6'
const PURPLE_LIGHT = '#C4B5FD'
const RED = '#EF4444'
const RED_LIGHT = '#FCA5A5'
const NAVY = '#1E3A5F'

// ── Shared tooltip style ─────────────────────────────────────────────────────
const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'hsl(var(--foreground))',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  itemStyle: {
    padding: '2px 0',
  },
  labelStyle: {
    color: 'hsl(var(--muted-foreground))',
    fontWeight: 600,
    marginBottom: '4px',
  },
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function dateKey(date: Date): string {
  return date.toISOString().split('T')[0]
}

function formatDateShort(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const RADAR_CATEGORIES = [
  'OSH',
  'First Aid',
  'BLS/CPR',
  'Patient Assessment',
  'Trauma',
  'Legal/Ethical',
  'Communications',
]

const RADAR_CATEGORY_MAP: Record<string, string> = {
  'OSH': 'OSH',
  'First Aid': 'First Aid',
  'BLS/CPR': 'BLS/CPR',
  'Patient Assessment': 'Patient Assessment',
  'Trauma': 'Trauma',
  'Medical Emergencies': 'Patient Assessment',
  'Legal/Ethical': 'Legal/Ethical',
  'Radio Communication': 'Communications',
  'Ambulance Management': 'Operations',
  'AMATS': 'Operations',
  'Operations': 'Operations',
  'Communications': 'Communications',
}

const PIE_COLORS = [TEAL, AMBER, PURPLE, RED]

// ── Chart Card Wrapper ───────────────────────────────────────────────────────

function ChartCard({
  icon: Icon,
  title,
  badge,
  badgeVariant = 'outline',
  children,
}: {
  icon: React.ElementType
  title: string
  badge?: string
  badgeVariant?: 'outline' | 'default'
  children: React.ReactNode
}) {
  return (
    <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2EC4B6]/10">
              <Icon className="w-4 h-4 text-[#2EC4B6]" />
            </div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>
          {badge && (
            <Badge variant={badgeVariant} className="text-xs font-normal text-muted-foreground">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}

function EmptyChartState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Activity className="w-10 h-10 text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

// ── 1. Weekly Study Activity Area Chart ─────────────────────────────────────

function useWeeklyActivityData(progress: ProgressData) {
  return useMemo(() => {
    const today = new Date()
    const data = []

    for (let i = 27; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = dateKey(d)

      // Count quizzes on this day
      const quizzesDone = progress.quizScores.filter(
        (q) => dateKey(new Date(q.date)) === key
      ).length

      // Get activity log count (general activities)
      const activityCount = progress.studyActivityLog[key] || 0

      // Flashcards studied — approximate from activity count minus quizzes
      const flashcards = Math.max(0, activityCount - quizzesDone)

      // Focus minutes from focus data
      const focusMin =
        progress.lastFocusDate === key ? progress.focusMinutesToday : 0

      data.push({
        date: formatDateShort(d),
        quizzes: quizzesDone,
        flashcards,
        focusMinutes: Math.round(focusMin),
      })
    }

    return data
  }, [progress.quizScores, progress.studyActivityLog, progress.focusMinutesToday, progress.lastFocusDate])
}

function WeeklyActivityChart({ progress }: { progress: ProgressData }) {
  const { t } = useTranslation()
  const data = useWeeklyActivityData(progress)

  const hasData = data.some((d) => d.quizzes > 0 || d.flashcards > 0 || d.focusMinutes > 0)

  if (!hasData) {
    return (
      <ChartCard icon={Activity} title={t('charts.weeklyActivity')} badge={t('charts.weeklyActivityDesc')}>
        <EmptyChartState message={t('charts.noActivityYet')} />
      </ChartCard>
    )
  }

  return (
    <ChartCard icon={Activity} title={t('charts.weeklyActivity')} badge={t('charts.weeklyActivityDesc')}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="quizGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={TEAL} stopOpacity={0.3} />
              <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="flashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={AMBER} stopOpacity={0.3} />
              <stop offset="100%" stopColor={AMBER} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PURPLE} stopOpacity={0.3} />
              <stop offset="100%" stopColor={PURPLE} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
            interval={6}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip {...tooltipStyle} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            type="monotone"
            dataKey="quizzes"
            name={t('charts.quizzes')}
            stroke={TEAL}
            strokeWidth={2}
            fill="url(#quizGradient)"
          />
          <Area
            type="monotone"
            dataKey="flashcards"
            name={t('charts.flashcards')}
            stroke={AMBER}
            strokeWidth={2}
            fill="url(#flashGradient)"
          />
          <Area
            type="monotone"
            dataKey="focusMinutes"
            name={t('charts.focusTime')}
            stroke={PURPLE}
            strokeWidth={2}
            fill="url(#focusGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

// ── 2. Category Performance Radar Chart ─────────────────────────────────────

function useCategoryData(progress: ProgressData) {
  return useMemo(() => {
    const categoryScores: Record<string, number[]> = {}

    progress.quizScores.forEach((q) => {
      const pct = (q.score / q.total) * 100
      const mapped = RADAR_CATEGORY_MAP[q.category] || q.category
      if (!categoryScores[mapped]) categoryScores[mapped] = []
      categoryScores[mapped].push(pct)
    })

    return RADAR_CATEGORIES.map((cat) => {
      const scores = categoryScores[cat]
      if (!scores || scores.length === 0) return { category: cat, score: 0 }
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      return { category: cat, score: Math.round(avg) }
    })
  }, [progress.quizScores])
}

function CategoryRadarChart({ progress }: { progress: ProgressData }) {
  const { t } = useTranslation()
  const data = useCategoryData(progress)

  const hasData = data.some((d) => d.score > 0)

  if (!hasData) {
    return (
      <ChartCard icon={Target} title={t('charts.categoryPerformance')} badge={t('charts.categoryPerformanceDesc')}>
        <EmptyChartState message={t('charts.noActivityYet')} />
      </ChartCard>
    )
  }

  return (
    <ChartCard icon={Target} title={t('charts.categoryPerformance')} badge={t('charts.categoryPerformanceDesc')}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
            tickCount={5}
          />
          <Radar
            name={t('charts.score')}
            dataKey="score"
            stroke={TEAL}
            strokeWidth={2}
            fill={TEAL}
            fillOpacity={0.2}
          />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} iconType="circle" iconSize={8} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

// ── 3. XP Progress Bar Chart ────────────────────────────────────────────────

function useXpPerDayData(progress: ProgressData) {
  return useMemo(() => {
    const today = new Date()
    const xpPerDay: Record<string, number> = {}

    // Calculate XP from quiz scores per day
    progress.quizScores.forEach((q) => {
      const key = dateKey(new Date(q.date))
      const isPerfect = q.score === q.total
      xpPerDay[key] = (xpPerDay[key] || 0) + (isPerfect ? 80 : 30)
    })

    const data = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = dateKey(d)
      data.push({
        date: formatDateShort(d),
        xp: xpPerDay[key] || 0,
      })
    }

    return data
  }, [progress.quizScores])
}

function XpBarChart({ progress }: { progress: ProgressData }) {
  const { t } = useTranslation()
  const data = useXpPerDayData(progress)

  const hasData = data.some((d) => d.xp > 0)
  const levelUpThreshold = 100 - (progress.xp % 100)

  if (!hasData) {
    return (
      <ChartCard icon={Zap} title={t('charts.xpProgress')} badge={t('charts.xpProgressDesc')}>
        <EmptyChartState message={t('charts.noActivityYet')} />
      </ChartCard>
    )
  }

  const getBarColor = (xp: number) => {
    if (xp >= 80) return TEAL_DARK
    if (xp >= 50) return TEAL
    return TEAL_LIGHT
  }

  return (
    <ChartCard icon={Zap} title={t('charts.xpProgress')} badge={t('charts.xpProgressDesc')}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip {...tooltipStyle} />
          <ReferenceLine
            y={levelUpThreshold}
            stroke={AMBER}
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: t('charts.levelUpThreshold'),
              position: 'right',
              fill: AMBER,
              fontSize: 10,
            }}
          />
          <Bar dataKey="xp" name={t('charts.xpEarned')} radius={[4, 4, 0, 0]} maxBarSize={32}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.xp)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

// ── 4. Quiz Score Distribution Pie Chart ──────────────────────────────────────

function useScoreDistribution(progress: ProgressData) {
  return useMemo(() => {
    const categories = { excellent: 0, good: 0, fair: 0, needsWork: 0 }

    progress.quizScores.forEach((q) => {
      const pct = (q.score / q.total) * 100
      if (pct >= 90) categories.excellent++
      else if (pct >= 70) categories.good++
      else if (pct >= 50) categories.fair++
      else categories.needsWork++
    })

    return [
      { name: 'Excellent', value: categories.excellent, fill: PIE_COLORS[0] },
      { name: 'Good', value: categories.good, fill: PIE_COLORS[1] },
      { name: 'Fair', value: categories.fair, fill: PIE_COLORS[2] },
      { name: 'Needs Work', value: categories.needsWork, fill: PIE_COLORS[3] },
    ]
  }, [progress.quizScores])
}

function ScorePieChart({ progress }: { progress: ProgressData }) {
  const { t } = useTranslation()
  const data = useScoreDistribution(progress)
  const totalQuizzes = progress.quizScores.length

  const hasData = totalQuizzes > 0

  if (!hasData) {
    return (
      <ChartCard icon={PieIcon} title={t('charts.quizScoreDistribution')} badge={t('charts.quizScoreDistributionDesc')}>
        <EmptyChartState message={t('charts.noQuizData')} />
      </ChartCard>
    )
  }

  // Custom label mapping
  const labelMap: Record<string, string> = {
    Excellent: t('charts.excellent'),
    Good: t('charts.good'),
    Fair: t('charts.fair'),
    'Needs Work': t('charts.needsWork'),
  }

  return (
    <ChartCard icon={PieIcon} title={t('charts.quizScoreDistribution')} badge={t('charts.quizScoreDistributionDesc')}>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              {...tooltipStyle}
              formatter={(value: number, name: string) => [value, labelMap[name] || name]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-foreground">{totalQuizzes}</span>
          <span className="text-xs text-muted-foreground">{t('charts.totalQuizzes')}</span>
        </div>
      </div>
      {/* Custom legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
        {data
          .filter((d) => d.value > 0)
          .map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.fill }} />
              <span className="text-xs text-muted-foreground">
                {labelMap[d.name]} ({d.value})
              </span>
            </div>
          ))}
      </div>
    </ChartCard>
  )
}

// ── Main Export: StudyCharts ────────────────────────────────────────────────

export function StudyCharts() {
  const progress = useAppStore((s) => s.progress)

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-[#2EC4B6]" />
        <div>
          <h3 className="text-lg font-bold text-foreground">Data Visualization</h3>
          <p className="text-xs text-muted-foreground">Visual insights into your study progress</p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart progress={progress} />
        <CategoryRadarChart progress={progress} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <XpBarChart progress={progress} />
        <ScorePieChart progress={progress} />
      </div>
    </div>
  )
}
