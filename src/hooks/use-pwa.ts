'use client'

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react'

// ==================== Types ====================
interface CacheBreakdown {
  [cacheName: string]: number
}

interface StorageEstimate {
  usage: number
  quota: number
}

interface CacheSizeInfo {
  totalEntries: number
  breakdown: CacheBreakdown
  storageEstimate: StorageEstimate | null
}

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  updateAvailable: boolean
  lastSyncTime: number | null
  cacheSize: CacheSizeInfo | null
}

// ==================== Hook ====================
/**
 * Enhanced PWA hook for offline-first EMS NCII reviewer.
 *
 * Features:
 * - Service worker registration with auto-update checks
 * - Update available detection with UI notification support
 * - Install prompt handling
 * - Online/offline status tracking
 * - Cache size reporting
 * - Background sync triggering
 * - Last sync timestamp
 */
export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    updateAvailable: false,
    lastSyncTime: null,
    cacheSize: null,
  })

  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null)
  const waitingWorkerRef = useRef<ServiceWorker | null>(null)

  // Online status via useSyncExternalStore (React 18 compliant, no setState in effect)
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback)
      window.addEventListener('offline', callback)
      return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
      }
    },
    () => (typeof window !== 'undefined' ? navigator.onLine : true),
    () => true // server snapshot
  )

  // ==================== Service Worker Registration ====================
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        registrationRef.current = registration

        // Check for updates periodically (every 30 minutes)
        const updateInterval = setInterval(() => {
          registration.update().catch(() => {})
        }, 30 * 60 * 1000)

        // Listen for new service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version is available!
              console.log('[PWA] New version available')
              waitingWorkerRef.current = newWorker
              setState((prev) => ({ ...prev, updateAvailable: true }))
            }
          })
        })

        // Check if there's already a waiting worker
        if (registration.waiting) {
          waitingWorkerRef.current = registration.waiting
          setState((prev) => ({ ...prev, updateAvailable: true }))
        }

        // Listen for controller change (new SW took over)
        let refreshing = false
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true
            window.location.reload()
          }
        })

        // Load last sync time from localStorage
        const lastSync = localStorage.getItem('ems-last-sync')
        if (lastSync) {
          setState((prev) => ({ ...prev, lastSyncTime: parseInt(lastSync, 10) }))
        }

        console.log('[PWA] Service Worker registered')
      } catch (error) {
        console.warn('[PWA] Service Worker registration failed:', error)
      }
    }

    registerSW()
  }, [])

  // ==================== Listen for SW Messages ====================
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      if (!data?.type) return

      switch (data.type) {
        case 'SYNC_COMPLETE':
          const syncTime = data.timestamp || Date.now()
          localStorage.setItem('ems-last-sync', syncTime.toString())
          setState((prev) => ({ ...prev, lastSyncTime: syncTime }))
          console.log(`[PWA] Sync complete: ${data.dataType}`)
          break

        case 'CONTENT_UPDATED':
          console.log('[PWA] Content updated in background')
          break

        case 'PREFETCH_COMPLETE':
          console.log(`[PWA] Prefetch: ${data.succeeded}/${data.total} files cached`)
          break
      }
    }

    navigator.serviceWorker?.addEventListener('message', handleMessage)
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleMessage)
    }
  }, [])

  // ==================== Track online/offline for sync triggers ====================
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOnline = () => {
      // Came back online — request background sync
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.sync.register('sync-all').catch(() => {
            // Background sync not supported, data is already local
          })
        })
      }
      // Update last sync time
      const now = Date.now()
      localStorage.setItem('ems-last-sync', now.toString())
      setState((prev) => ({ ...prev, lastSyncTime: now }))
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [])

  // ==================== Update Management ====================

  /**
   * Apply the pending service worker update.
   * Sends SKIP_WAITING to the waiting worker, which triggers a controllerchange
   * event that reloads the page.
   */
  const applyUpdate = useCallback(() => {
    const waitingWorker = waitingWorkerRef.current
    if (waitingWorker) {
      console.log('[PWA] Applying update — sending SKIP_WAITING')
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  }, [])

  /**
   * Dismiss the update notification without applying.
   */
  const dismissUpdate = useCallback(() => {
    setState((prev) => ({ ...prev, updateAvailable: false }))
  }, [])

  // ==================== Install Prompt ====================
  const handleInstall = useCallback(async () => {
    const prompt = deferredPromptRef.current
    if (!prompt) return

    try {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice

      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt')
      }

      deferredPromptRef.current = null
      setState((prev) => ({ ...prev, isInstallable: false }))
    } catch (error) {
      console.warn('[PWA] Install prompt failed:', error)
    }
  }, [])

  // ==================== Check if already installed ====================
  const [isInstalledInitial] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
  })

  // ==================== Handle install prompt event ====================
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      deferredPromptRef.current = e as BeforeInstallPromptEvent
      setState((prev) => ({ ...prev, isInstallable: true }))
    }

    const handleAppInstalled = () => {
      deferredPromptRef.current = null
      setState((prev) => ({ ...prev, isInstallable: false, isInstalled: true }))
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // ==================== Cache Size Reporting ====================

  /**
   * Request cache size info from the service worker.
   */
  const refreshCacheSize = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return

    return new Promise<CacheSizeInfo>((resolve) => {
      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        if (event.data?.type === 'CACHE_SIZE') {
          const info: CacheSizeInfo = {
            totalEntries: event.data.totalEntries || 0,
            breakdown: event.data.breakdown || {},
            storageEstimate: event.data.storageEstimate || null,
          }
          setState((prev) => ({ ...prev, cacheSize: info }))
          resolve(info)
        }
      }

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_SIZE' },
        [messageChannel.port2]
      )

      // Timeout after 3 seconds
      setTimeout(() => resolve(null as unknown as CacheSizeInfo), 3000)
    })
  }, [])

  /**
   * Clear all caches (for settings/reset).
   */
  const clearAllCaches = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return

    return new Promise<void>((resolve) => {
      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = () => {
        setState((prev) => ({ ...prev, cacheSize: null }))
        resolve()
      }

      navigator.serviceWorker.controller.postMessage(
        { type: 'CLEAR_ALL_CACHES' },
        [messageChannel.port2]
      )

      setTimeout(() => resolve(), 3000)
    })
  }, [])

  /**
   * Prefetch specific media URLs for offline use.
   */
  const prefetchMedia = useCallback((urls: string[]) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return
    navigator.serviceWorker.controller.postMessage({
      type: 'PREFETCH_MEDIA',
      urls,
    })
  }, [])

  /**
   * Cache specific URLs on demand.
   */
  const cacheUrls = useCallback((urls: string[]) => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_URLS',
      urls,
    })
  }, [])

  /**
   * Request a background sync.
   */
  const requestSync = useCallback((tag: string = 'sync-all') => {
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return
    navigator.serviceWorker.controller.postMessage({
      type: 'REQUEST_SYNC',
      tag,
    })
  }, [])

  return {
    // Status
    ...state,
    isInstalled: state.isInstalled || isInstalledInitial,
    isOnline,

    // Actions
    installPrompt: state.isInstallable ? handleInstall : null,
    applyUpdate,
    dismissUpdate,
    refreshCacheSize,
    clearAllCaches,
    prefetchMedia,
    cacheUrls,
    requestSync,
  }
}

// ==================== BeforeInstallPromptEvent Type ====================
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
