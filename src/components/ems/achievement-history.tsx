'use client'

import React from 'react'
import { useAppStore, type AchievementNotification, type NotificationType } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Trash2, Sparkles } from 'lucide-react'

const TYPE_COLORS: Record<NotificationType, string> = {
  achievement: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  milestone: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
  streak: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800',
  quiz: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
  focus: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800',
  general: 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-700',
}

function getRelativeTime(timestamp: number, t: (key: string) => string): string {
  const now = Date.now()
  const diffMs = now - timestamp
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return t('achievement.minutesAgo').replace('{minutes}', String(diffMin))
  if (diffHour < 24) return t('achievement.hoursAgo').replace('{hours}', String(diffHour))
  return t('achievement.daysAgo').replace('{days}', String(diffDay))
}

/** Achievement History panel — shows chronological list of past notifications */
export function AchievementHistory() {
  const { progress, clearNotificationHistory } = useAppStore()
  const { t } = useTranslation()
  const [expanded, setExpanded] = React.useState(true)

  const history = progress.notificationHistory || []
  const displayItems = history.slice(0, 20)
  const remainingCount = history.length - 20

  return (
    <Card className="card-modern card-elevated">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/20 rounded-t-lg transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">{t('achievement.history')}</CardTitle>
            <p className="text-[10px] text-muted-foreground">
              {history.length} {history.length === 1 ? 'achievement' : 'achievements'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <Badge variant="outline" className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
              {history.length}
            </Badge>
          )}
          <svg
            className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', expanded ? 'rotate-0' : '-rotate-90')}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          {history.length === 0 ? (
            /* Empty state */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-950/20 flex items-center justify-center mx-auto mb-3 border border-amber-200/50 dark:border-amber-800/30">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-sm font-medium text-foreground/80">{t('achievement.empty')}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {useAppStore.getState().settings.language === 'fil'
                  ? t('achievement.emptyFil')
                  : t('achievement.empty')}
              </p>
            </div>
          ) : (
            <>
              {/* Notification list */}
              <div className="space-y-1.5 max-h-80 overflow-y-auto custom-scrollbar pr-1">
                {displayItems.map((notification) => (
                  <NotificationHistoryItem
                    key={notification.id}
                    notification={notification}
                    t={t}
                  />
                ))}
              </div>

              {/* "and X more..." indicator */}
              {remainingCount > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-3 pt-3 border-t border-border/50">
                  {useAppStore.getState().settings.language === 'fil'
                    ? t('achievement.andMore').replace('{count}', String(remainingCount))
                    : t('achievement.andMore').replace('{count}', String(remainingCount))}
                </p>
              )}

              {/* Clear all button */}
              <div className="mt-4 pt-3 border-t border-border/50 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-ems-red gap-1.5 h-7"
                  onClick={clearNotificationHistory}
                >
                  <Trash2 className="w-3 h-3" />
                  {t('achievement.clearAll')}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}

function NotificationHistoryItem({ notification, t }: { notification: AchievementNotification; t: (key: string) => string }) {
  const config = TYPE_COLORS[notification.type] || TYPE_COLORS.general
  const relativeTime = getRelativeTime(notification.timestamp, t)

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2.5 rounded-lg border transition-colors hover:bg-muted/30',
        config,
      )}
    >
      {/* Icon */}
      <span className="text-lg flex-shrink-0 w-8 h-8 rounded-lg bg-background/60 flex items-center justify-center border border-border/30">
        {notification.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-foreground truncate">{notification.title}</p>
          {notification.xpReward > 0 && (
            <span className="flex-shrink-0 text-[9px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded-full">
              +{notification.xpReward} XP
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{notification.description}</p>
      </div>

      {/* Relative time */}
      <span className="flex-shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">
        {relativeTime}
      </span>
    </div>
  )
}
