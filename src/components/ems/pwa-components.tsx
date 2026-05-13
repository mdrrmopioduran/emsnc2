'use client'

import React from 'react'
import { usePWA } from '@/hooks/use-pwa'
import { useTranslation } from '@/hooks/use-translation'
import {
  WifiOff, Wifi, Download, RefreshCw, X, Database,
  Clock, HardDrive, CheckCircle2, AlertCircle, ArrowDownCircle,
  CloudOff, Cloud, Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// ==================== Offline Indicator ====================
/**
 * Enhanced offline indicator banner.
 * Shows at top of page when offline, with cached content availability notice.
 */
export function OfflineIndicator() {
  const { isOnline } = usePWA()
  const { t } = useTranslation()
  const [dismissed, setDismissed] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const prevOnlineRef = React.useRef(true)

  React.useEffect(() => {
    if (!isOnline && prevOnlineRef.current) {
      setDismissed(false)
      setVisible(true)
    } else if (isOnline && !prevOnlineRef.current) {
      setVisible(false)
    }
    prevOnlineRef.current = isOnline
  }, [isOnline])

  if (isOnline || dismissed || !visible) return null

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[90] flex items-center justify-center gap-2',
        'py-2 px-4 bg-ems-red/95 text-white text-xs font-medium',
        'animate-in slide-in-from-top-2 duration-300',
        'md:ml-[240px] lg:ml-[260px]'
      )}
    >
      <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        {t('offline.message') !== 'offline.message'
          ? t('offline.message')
          : 'You are offline. Continue learning with cached materials.'}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-2 p-0.5 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

// ==================== Update Banner ====================
/**
 * Shows a banner when a new service worker version is available.
 * Offers "Update" and "Dismiss" buttons.
 */
export function UpdateBanner() {
  const { updateAvailable, applyUpdate, dismissUpdate } = usePWA()
  const [updating, setUpdating] = React.useState(false)

  if (!updateAvailable) return null

  const handleUpdate = async () => {
    setUpdating(true)
    try {
      await applyUpdate()
      // The page will reload automatically via controllerchange event
    } catch {
      setUpdating(false)
    }
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[91] flex items-center justify-between gap-3',
        'py-2 px-4 bg-ems-teal text-white text-xs font-medium',
        'animate-in slide-in-from-top-2 duration-300',
        'md:ml-[240px] lg:ml-[260px]'
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <ArrowDownCircle className="w-4 h-4 flex-shrink-0 animate-bounce" />
        <span className="truncate">
          A new version is available! Update to get the latest content and improvements.
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleUpdate}
          disabled={updating}
          className={cn(
            'flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all',
            'bg-white text-ems-teal hover:bg-white/90',
            updating && 'opacity-60 cursor-not-allowed'
          )}
        >
          <RefreshCw className={cn('w-3 h-3', updating && 'animate-spin')} />
          {updating ? 'Updating...' : 'Update Now'}
        </button>
        <button
          onClick={dismissUpdate}
          className="p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss update"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ==================== Connection Status Badge ====================
/**
 * Small badge showing online/offline status and last sync time.
 * Designed for sidebar or settings display.
 */
export function ConnectionStatusBadge() {
  const { isOnline, lastSyncTime } = usePWA()
  const { language } = useTranslation()

  const formatTime = (ts: number | null) => {
    if (!ts) return language === 'fil' ? 'Hindi pa nag-sync' : 'Never synced'
    const diff = Date.now() - ts
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return language === 'fil' ? 'Ngayon lang' : 'Just now'
    if (mins < 60) return language === 'fil' ? `${mins} min ang nakalipas` : `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return language === 'fil' ? `${hours} oras ang nakalipas` : `${hours}h ago`
    const days = Math.floor(hours / 24)
    return language === 'fil' ? `${days} araw ang nakalipas` : `${days}d ago`
  }

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-lg text-xs',
      isOnline
        ? 'bg-ems-teal/10 text-ems-teal'
        : 'bg-ems-red/10 text-ems-red'
    )}>
      {isOnline ? (
        <Cloud className="w-3.5 h-3.5" />
      ) : (
        <CloudOff className="w-3.5 h-3.5" />
      )}
      <span className="font-medium">
        {isOnline
          ? (language === 'fil' ? 'Online' : 'Online')
          : (language === 'fil' ? 'Offline' : 'Offline')}
      </span>
      <span className="text-muted-foreground">•</span>
      <span className="text-muted-foreground truncate">
        {formatTime(lastSyncTime)}
      </span>
    </div>
  )
}

// ==================== Cache Info Card ====================
/**
 * Card showing cache statistics and storage usage.
 * For settings page or about section.
 */
export function CacheInfoCard() {
  const { cacheSize, refreshCacheSize, clearAllCaches, isOnline } = usePWA()
  const { language } = useTranslation()
  const [clearing, setClearing] = React.useState(false)
  const isFil = language === 'fil'

  React.useEffect(() => {
    refreshCacheSize()
  }, [refreshCacheSize])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const totalUsage = cacheSize?.storageEstimate?.usage || 0
  const totalQuota = cacheSize?.storageEstimate?.quota || 0
  const usagePercent = totalQuota > 0 ? Math.round((totalUsage / totalQuota) * 100) : 0

  const handleClear = async () => {
    setClearing(true)
    try {
      await clearAllCaches()
      await refreshCacheSize()
    } finally {
      setClearing(false)
    }
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-ems-teal" />
            <span className="text-sm font-semibold">
              {isFil ? 'Offline na Storage' : 'Offline Storage'}
            </span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              'text-[10px] gap-1',
              isOnline
                ? 'bg-ems-teal/10 text-ems-teal border-ems-teal/20'
                : 'bg-ems-red/10 text-ems-red border-ems-red/20'
            )}
          >
            {isOnline ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
            {isOnline ? (isFil ? 'Online' : 'Online') : (isFil ? 'Offline' : 'Offline')}
          </Badge>
        </div>

        {/* Cache entries breakdown */}
        {cacheSize && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{isFil ? 'Naka-cache na mga item' : 'Cached items'}</span>
              <span className="font-medium">{cacheSize.totalEntries}</span>
            </div>
            {Object.entries(cacheSize.breakdown).map(([name, count]) => {
              const label = name
                .replace('ems-', '')
                .replace(/-v\d+$/, '')
                .replace('-', ' ')
              return (
                <div key={name} className="flex items-center justify-between text-[11px] pl-3">
                  <span className="text-muted-foreground capitalize">{label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Storage usage */}
        {cacheSize?.storageEstimate && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{isFil ? 'Ginagamit na storage' : 'Storage used'}</span>
              <span className="font-medium">
                {formatBytes(totalUsage)}
                {totalQuota > 0 && ` / ${formatBytes(totalQuota)}`}
              </span>
            </div>
            {totalQuota > 0 && (
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    usagePercent > 80 ? 'bg-ems-red' : usagePercent > 50 ? 'bg-ems-amber' : 'bg-ems-teal'
                  )}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Available offline badge */}
        <div className="flex items-center gap-2 py-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-ems-teal" />
          <span className="text-xs text-muted-foreground">
            {isFil
              ? 'Available offline: Mga aralin, quiz, acronyms, at simulation'
              : 'Available offline: Lessons, quizzes, acronyms, and simulations'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refreshCacheSize()}
            className="h-7 text-[11px] gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            {isFil ? 'I-refresh' : 'Refresh'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={clearing}
            className="h-7 text-[11px] gap-1.5 text-ems-red hover:text-ems-red border-ems-red/20 hover:bg-ems-red/10"
          >
            <Trash2 className="w-3 h-3" />
            {clearing
              ? (isFil ? 'Naglilinis...' : 'Clearing...')
              : (isFil ? 'I-clear ang Cache' : 'Clear Cache')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== Available Offline Badge ====================
/**
 * Small badge to show "Available Offline" status on content items.
 */
export function AvailableOfflineBadge({ className }: { className?: string }) {
  const { language } = useTranslation()
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[9px] gap-1 bg-ems-teal/10 text-ems-teal border-ems-teal/20',
        className
      )}
    >
      <Download className="w-2.5 h-2.5" />
      {language === 'fil' ? 'Offline' : 'Offline'}
    </Badge>
  )
}

// ==================== Last Sync Display ====================
/**
 * Shows last sync timestamp, useful for footer or settings.
 */
export function LastSyncDisplay({ className }: { className?: string }) {
  const { lastSyncTime, isOnline, requestSync } = usePWA()
  const { language } = useTranslation()
  const isFil = language === 'fil'

  const formatTime = (ts: number | null) => {
    if (!ts) return isFil ? 'Hindi pa nag-sync' : 'Never synced'
    const date = new Date(ts)
    return date.toLocaleTimeString(isFil ? 'fil-PH' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={cn('flex items-center gap-2 text-[11px] text-muted-foreground', className)}>
      <Clock className="w-3 h-3" />
      <span>
        {isFil ? 'Huling sync' : 'Last sync'}: {formatTime(lastSyncTime)}
      </span>
      {isOnline && (
        <button
          onClick={() => requestSync()}
          className="p-0.5 rounded hover:bg-muted transition-colors"
          aria-label="Sync now"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}


