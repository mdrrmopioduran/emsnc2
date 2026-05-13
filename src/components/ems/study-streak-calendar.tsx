'use client'

import React, { useMemo, useState } from 'react'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, Trophy, CalendarDays, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Constants ──────────────────────────────────────────────────────────────────

const TOTAL_WEEKS = 12
const TOTAL_DAYS = TOTAL_WEEKS * 7 // 84 days
const DAY_LABELS = ['', 'M', '', 'W', '', 'F', ''] // Index 0=Sun, 1=Mon, etc.

function getColorClass(count: number): string {
  if (count === 0) return 'bg-muted/40 dark:bg-muted/20'
  if (count <= 2) return 'bg-teal-200 dark:bg-teal-900/50'
  if (count <= 4) return 'bg-teal-400 dark:bg-teal-700'
  return 'bg-teal-600 dark:bg-teal-500'
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

function DayTooltip({
  dateKey,
  count,
  isToday,
  children,
}: {
  dateKey: string
  count: number
  isToday: boolean
  children: React.ReactNode
}) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  const formattedDate = useMemo(() => {
    const d = new Date(dateKey + 'T00:00:00')
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }, [dateKey])

  const label = useMemo(() => {
    if (count === 0) return `${t('streak.noActivity')} — ${formattedDate}`
    const activityWord = count === 1 ? t('streak.activity') : t('streak.activities')
    return `${count} ${activityWord} ${t('streak.onDate')} ${formattedDate}`
  }, [count, formattedDate, t])

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-popover text-popover-foreground text-[11px] font-medium rounded-lg shadow-lg border border-border whitespace-nowrap z-50 pointer-events-none">
          <span>{label}</span>
          {isToday && (
            <span className="ml-1.5 text-teal-600 dark:text-teal-400 font-bold">
              ({t('streak.today')})
            </span>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-popover" />
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export function StudyStreakCalendar() {
  const studyActivityLog = useAppStore((s) => s.progress.studyActivityLog)
  const { t } = useTranslation()

  // Build the grid data: 7 rows (Sun-Sat) × 12 columns (weeks)
  const { grid, monthLabels, stats } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Start from (TOTAL_DAYS - 1) days ago, aligned to Sunday
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - (TOTAL_DAYS - 1))
    // Align to previous Sunday
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - dayOfWeek)

    // Build 2D grid: grid[week][dayOfWeek]
    const gridData: { dateKey: string; count: number; isFuture: boolean; isToday: boolean }[][] = []
    let currentWeek: typeof gridData[0] = []

    // Track which months we've seen for labels
    const monthStarts: { label: string; weekIndex: number }[] = []
    let lastMonth = -1

    for (let i = 0; i < TOTAL_DAYS; i++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + i)

      const dateKey = d.toISOString().split('T')[0]
      const isFuture = d > today
      const isToday = d.getTime() === today.getTime()
      const count = studyActivityLog[dateKey] || 0

      // Track month label
      const month = d.getMonth()
      if (month !== lastMonth) {
        monthStarts.push({
          label: d.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: Math.floor(i / 7),
        })
        lastMonth = month
      }

      currentWeek.push({ dateKey, count, isFuture, isToday })

      if (currentWeek.length === 7) {
        gridData.push(currentWeek)
        currentWeek = []
      }
    }

    // Calculate stats from studyActivityLog
    const allDates = Object.entries(studyActivityLog).filter(([, count]) => count > 0)
    const sortedDates = allDates
      .map(([dateKey]) => dateKey)
      .sort()

    // Calculate current streak
    let currentStreak = 0
    const todayKey = today.toISOString().split('T')[0]
    const yesterdayKey = new Date(today.getTime() - 86400000)
      .toISOString()
      .split('T')[0]

    // Check if today or yesterday has activity
    if (studyActivityLog[todayKey] > 0) {
      currentStreak = 1
      // Walk backwards from yesterday
      let checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - 1)
      while (true) {
        const key = checkDate.toISOString().split('T')[0]
        if (studyActivityLog[key] > 0) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    } else if (studyActivityLog[yesterdayKey] > 0) {
      currentStreak = 1
      let checkDate = new Date(yesterdayKey)
      checkDate.setDate(checkDate.getDate() - 1)
      while (true) {
        const key = checkDate.toISOString().split('T')[0]
        if (studyActivityLog[key] > 0) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else {
          break
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 0
    for (const [dateKey] of sortedDates) {
      tempStreak++
      if (tempStreak > longestStreak) longestStreak = tempStreak

      // Check if next date is consecutive
      const currentDate = new Date(dateKey + 'T00:00:00')
      const nextDate = new Date(currentDate)
      nextDate.setDate(nextDate.getDate() + 1)
      const nextKey = nextDate.toISOString().split('T')[0]

      const nextEntry = sortedDates.find((d) => d === nextKey)
      if (!nextEntry) {
        tempStreak = 0
      }
    }

    const totalActivities = Object.values(studyActivityLog).reduce(
      (sum, c) => sum + c,
      0
    )

    return {
      grid: gridData,
      monthLabels: monthStarts,
      stats: {
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        totalStudyDays: allDates.length,
        totalActivities,
      },
    }
  }, [studyActivityLog])

  return (
    <Card className="card-enhanced-hover border-0 shadow-sm bg-white/80 dark:bg-white/5 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10">
              <Flame className="w-4 h-4 text-teal-500" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                {t('streak.title')}
              </CardTitle>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {t('streak.subtitle')}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] font-normal text-muted-foreground"
          >
            {t('streak.last12Weeks')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* ── Stats Summary ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200/50 dark:border-orange-800/30">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500/15 shrink-0">
              <Flame className="w-4.5 h-4.5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400 leading-tight">
                {stats.currentStreak}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground truncate">
                {t('streak.currentStreak')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/15 shrink-0">
              <Trophy className="w-4.5 h-4.5 text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400 leading-tight">
                {stats.longestStreak}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground truncate">
                {t('streak.longestStreak')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/30 dark:to-teal-900/20 border border-teal-200/50 dark:border-teal-800/30">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500/15 shrink-0">
              <CalendarDays className="w-4.5 h-4.5 text-teal-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400 leading-tight">
                {stats.totalStudyDays}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground truncate">
                {t('streak.totalStudyDays')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/15 shrink-0">
              <Zap className="w-4.5 h-4.5 text-emerald-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
                {stats.totalActivities}
              </p>
              <p className="text-[10px] font-medium text-muted-foreground truncate">
                {t('streak.totalActivities')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Heatmap Calendar ────────────────────────────────────── */}
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="min-w-[540px]">
            {/* Month labels */}
            <div className="flex ml-8 mb-1.5" style={{ gap: '2px' }}>
              {monthLabels.map((ml, i) => {
                const nextMonth =
                  monthLabels[i + 1]?.weekIndex ?? TOTAL_WEEKS
                const span = nextMonth - ml.weekIndex
                return (
                  <div
                    key={`${ml.label}-${i}`}
                    className="text-[10px] font-medium text-muted-foreground"
                    style={{
                      width: `${span * 14 + (span - 1) * 2}px`,
                    }}
                  >
                    {ml.label}
                  </div>
                )
              })}
            </div>

            {/* Grid */}
            <div className="flex" style={{ gap: '2px' }}>
              {/* Day labels column */}
              <div className="flex flex-col shrink-0" style={{ gap: '2px', width: '28px' }}>
                {DAY_LABELS.map((label, i) => (
                  <div
                    key={i}
                    className="h-[12px] flex items-center justify-end pr-1"
                  >
                    {label && (
                      <span className="text-[10px] text-muted-foreground leading-none">
                        {label}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Weeks columns */}
              {grid.map((week, weekIdx) => (
                <div
                  key={weekIdx}
                  className="flex flex-col"
                  style={{ gap: '2px' }}
                >
                  {week.map((day) => {
                    if (day.isFuture) {
                      return (
                        <div
                          key={day.dateKey}
                          className="w-[12px] h-[12px] rounded-sm"
                        />
                      )
                    }

                    return (
                      <DayTooltip
                        key={day.dateKey}
                        dateKey={day.dateKey}
                        count={day.count}
                        isToday={day.isToday}
                      >
                        <div
                          className={cn(
                            'w-[12px] h-[12px] rounded-sm transition-transform duration-150 cursor-default',
                            getColorClass(day.count),
                            day.count > 0 &&
                              'hover:scale-[1.4] hover:shadow-md hover:z-10',
                            day.isToday &&
                              'ring-1 ring-teal-500 ring-offset-1 ring-offset-background'
                          )}
                        />
                      </DayTooltip>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Legend ───────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-[10px] text-muted-foreground">
            {t('streak.less')}
          </span>
          <div className="flex gap-1">
            {[0, 1, 3, 5].map((level) => (
              <div
                key={level}
                className={cn('w-[12px] h-[12px] rounded-sm', getColorClass(level))}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">
            {t('streak.more')}
          </span>
        </div>

        {/* ── Empty State ─────────────────────────────────────────── */}
        {stats.totalStudyDays === 0 && (
          <div className="text-center mt-4 pt-4 border-t border-muted/40">
            <p className="text-xs text-muted-foreground">
              {t('streak.noDataYet')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
