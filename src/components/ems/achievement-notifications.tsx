'use client'

import React from 'react'
import { useAppStore, type AchievementNotification, type NotificationType } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const TYPE_CONFIG: Record<NotificationType, { accentBorder: string; accentGlow: string; bgGradient: string }> = {
  achievement: {
    accentBorder: 'border-l-amber-500',
    accentGlow: 'shadow-amber-500/20',
    bgGradient: 'from-amber-500/5 to-yellow-500/5 dark:from-amber-500/10 dark:to-yellow-500/10',
  },
  milestone: {
    accentBorder: 'border-l-emerald-500',
    accentGlow: 'shadow-emerald-500/20',
    bgGradient: 'from-emerald-500/5 to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10',
  },
  streak: {
    accentBorder: 'border-l-teal-500',
    accentGlow: 'shadow-teal-500/20',
    bgGradient: 'from-teal-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:to-cyan-500/10',
  },
  quiz: {
    accentBorder: 'border-l-purple-500',
    accentGlow: 'shadow-purple-500/20',
    bgGradient: 'from-purple-500/5 to-violet-500/5 dark:from-purple-500/10 dark:to-violet-500/10',
  },
  focus: {
    accentBorder: 'border-l-sky-500',
    accentGlow: 'shadow-sky-500/20',
    bgGradient: 'from-sky-500/5 to-blue-500/5 dark:from-sky-500/10 dark:to-blue-500/10',
  },
  general: {
    accentBorder: 'border-l-slate-400 dark:border-l-slate-500',
    accentGlow: 'shadow-slate-400/10',
    bgGradient: 'from-slate-500/5 to-gray-500/5 dark:from-slate-500/10 dark:to-gray-500/10',
  },
}

/** A single notification card with progress bar animation */
function NotificationCard({ notification, onDismiss }: { notification: AchievementNotification; onDismiss: () => void }) {
  const { t } = useTranslation()
  const [progress, setProgress] = React.useState(100)
  const [isExiting, setIsExiting] = React.useState(false)
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.general

  // Animate progress bar from 100% to 0% over 5 seconds
  React.useEffect(() => {
    if (reducedMotion) {
      setProgress(0)
      return
    }
    setProgress(100)
    const startTime = Date.now()
    const duration = 5000

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)
      if (remaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }, 50)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [reducedMotion])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss()
    }, reducedMotion ? 0 : 300)
  }

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-3.5 rounded-xl border-l-4 shadow-lg',
        'bg-card/80 backdrop-blur-xl border border-border/60',
        'max-w-sm w-full',
        config.accentBorder,
        config.accentGlow,
        // Slide-in animation
        reducedMotion ? '' : 'animate-notification-slide-in',
        // Slide-out animation
        isExiting && (reducedMotion ? '' : 'animate-notification-slide-out'),
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-background to-muted/80 flex items-center justify-center text-xl border border-border/40 shadow-sm">
        {notification.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground truncate">{notification.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{notification.description}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
            aria-label={t('achievement.dismiss')}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* XP badge + progress bar */}
        <div className="mt-2 flex items-center gap-2">
          {notification.xpReward > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              +{notification.xpReward} XP
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-0.5 rounded-full bg-muted/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/80 to-ems-teal/80 transition-[width] ease-linear"
            style={{ width: `${progress}%`, transitionDuration: reducedMotion ? '0ms' : '50ms' }}
          />
        </div>
      </div>
    </div>
  )
}

/** Fixed notification stack — renders in top-right (desktop) / bottom-right (mobile) */
export function AchievementNotifications() {
  const notifications = useAppStore((s) => s.notifications)
  const dismissNotification = useAppStore((s) => s.dismissNotification)
  const reducedMotion = useAppStore((s) => s.settings.reducedMotion)

  if (notifications.length === 0) return null

  return (
    <div
      className={cn(
        'fixed z-[9999] flex flex-col gap-2.5 pointer-events-none',
        // Desktop: top-right
        'top-4 right-4 md:top-20 md:right-6',
        // Mobile: bottom-right above nav
        'bottom-20 md:bottom-auto',
      )}
      aria-label="Achievement notifications"
    >
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationCard
            notification={notification}
            onDismiss={() => dismissNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  )
}
