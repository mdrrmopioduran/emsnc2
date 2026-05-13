'use client'

import React from 'react'
import { usePWA } from '@/hooks/use-pwa'
import { useTranslation } from '@/hooks/use-translation'
import { WifiOff, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * A subtle offline indicator banner that appears when the user goes offline.
 * Shows at the top of the page and auto-hides after a few seconds.
 */
export function OfflineIndicator() {
  const { isOnline } = usePWA()
  const { t } = useTranslation()
  const [dismissed, setDismissed] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const prevOnlineRef = React.useRef(true)

  // Show indicator when going offline, auto-dismiss when back online
  React.useEffect(() => {
    if (!isOnline && prevOnlineRef.current) {
      // Just went offline
      setDismissed(false)
      setVisible(true)
    } else if (isOnline && !prevOnlineRef.current) {
      // Just came back online
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
