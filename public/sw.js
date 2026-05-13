/// <reference lib="webworker" />

// ============================================================
// PIO DURAN EMS NCII — Enhanced Service Worker v3
// Offline-First PWA for low-connectivity environments
// ============================================================

const CACHE_VERSION = 'v3'
const STATIC_CACHE = `ems-static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `ems-dynamic-${CACHE_VERSION}`
const MEDIA_CACHE = `ems-media-${CACHE_VERSION}`
const API_CACHE = `ems-api-${CACHE_VERSION}`

// Cache limits
const MAX_DYNAMIC_ENTRIES = 200
const MAX_API_ENTRIES = 100
const MAX_MEDIA_ENTRIES = 150
const MAX_CACHE_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

// ==================== Pre-cache Manifest ====================
const PRECACHE_ASSETS = [
  // Core app shell
  '/',
  '/manifest.json',
  '/offline.html',
  '/offline-media.html',

  // Branding
  '/pio-duran-ems-logo.png',
  '/logo.svg',

  // PWA icons
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',

  // Equipment images
  '/equipment/equipment_p1_img1.png',
  '/equipment/equipment_p1_img2.png',
  '/equipment/equipment_p1_img3.png',
  '/equipment/equipment_p1_img4.png',
  '/equipment/equipment_p2_img1.png',
  '/equipment/equipment_p2_img2.png',
  '/equipment/equipment_p2_img3.png',
  '/equipment/equipment_p2_img4.png',
  '/equipment/equipment_p3_img1.png',
  '/equipment/equipment_p3_img2.png',
  '/equipment/equipment_p3_img3.png',
  '/equipment/equipment_p3_img4.png',
  '/equipment/equipment_p4_img1.png',
  '/equipment/equipment_p4_img2.png',

  // Infographic images
  '/infographics/aha_2025_cpr_flowchart_1.jpg',
  '/infographics/aed_operation_steps_1.jpg',
  '/infographics/airway_management_infographic_2.jpg',
  '/infographics/chain_of_survival_infographic_1.jpg',
  '/infographics/ems_primary_secondary_survey_infographic_1.jpg',
  '/infographics/immobilization_splinting_infographic_2.jpg',
  '/infographics/patient_assessment_flowchart_1.jpg',
  '/infographics/start_triage_flowchart_1.jpg',
  '/infographics/trauma_assessment_flowchart_2.jpg',
]

// Routes matched by prefix for cache-first strategy
const CACHE_FIRST_PREFIXES = [
  '/equipment/',
  '/icons/',
  '/infographics/',
]

// File extensions that trigger cache-first strategy
const CACHE_FIRST_EXTENSIONS = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|avif|webm|mp3|wav)$/

// API routes that should be cached (network-first with cache fallback)
const CACHEABLE_API_PREFIXES = ['/api/chat']

// ==================== Utility Functions ====================

/**
 * Trim a cache to a maximum number of entries, removing oldest first.
 */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  if (keys.length <= maxEntries) return

  // Delete oldest entries (first in = first out)
  const deleteCount = keys.length - maxEntries
  await Promise.all(keys.slice(0, deleteCount).map((key) => cache.delete(key)))
  console.log(`[SW] Trimmed ${deleteCount} entries from ${cacheName}`)
}

/**
 * Remove expired entries from a cache based on age.
 */
async function removeExpiredEntries(cacheName, maxAgeMs) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  const now = Date.now()
  let removed = 0

  for (const request of keys) {
    const response = await cache.match(request)
    if (!response) continue

    const dateHeader = response.headers.get('sw-cache-time')
    if (dateHeader) {
      const cacheTime = parseInt(dateHeader, 10)
      if (now - cacheTime > maxAgeMs) {
        await cache.delete(request)
        removed++
      }
    }
  }

  if (removed > 0) {
    console.log(`[SW] Removed ${removed} expired entries from ${cacheName}`)
  }
}

/**
 * Store a response in cache with a timestamp header for expiration tracking.
 */
async function cacheWithTimestamp(cacheName, request, response) {
  const cache = await caches.open(cacheName)
  // Clone and add custom header
  const headers = new Headers(response.headers)
  headers.set('sw-cache-time', Date.now().toString())

  const body = await response.arrayBuffer()
  const timestampedResponse = new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })

  await cache.put(request, timestampedResponse)
}

/**
 * Check if a URL belongs to the same origin.
 */
function isSameOrigin(url) {
  return url.origin === self.location.origin
}

// ==================== Install Event ====================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v3...')

  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE)
      console.log('[SW] Pre-caching static assets...')

      // Cache assets individually to prevent one failure from blocking the rest
      const results = await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            await cache.add(url)
            return { url, ok: true }
          } catch (err) {
            console.warn(`[SW] Failed to cache: ${url}`, err.message)
            return { url, ok: false }
          }
        })
      )

      const succeeded = results.filter((r) => r.status === 'fulfilled' && r.value.ok).length
      const failed = results.length - succeeded
      console.log(`[SW] Pre-cached ${succeeded}/${results.length} assets (${failed} failed)`)

      // Activate immediately
      self.skipWaiting()
    })()
  )
})

// ==================== Activate Event ====================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v3...')

  event.waitUntil(
    (async () => {
      // Clean up old caches from previous versions
      const cacheNames = await caches.keys()
      const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, MEDIA_CACHE, API_CACHE]

      await Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map(async (name) => {
            console.log(`[SW] Deleting old cache: ${name}`)
            await caches.delete(name)
          })
      )

      // Also clean expired entries in current caches
      await Promise.all([
        removeExpiredEntries(DYNAMIC_CACHE, MAX_CACHE_AGE_MS),
        removeExpiredEntries(API_CACHE, MAX_CACHE_AGE_MS),
      ])

      // Take control of all clients immediately
      await self.clients.claim()
      console.log('[SW] Service worker v3 activated and claiming clients')
    })()
  )
})

// ==================== Fetch Event ====================
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip non-http requests (chrome-extension, etc.)
  if (!url.protocol.startsWith('http')) return

  // Skip Next.js hot reload and dev-related requests
  if (url.pathname.startsWith('/_next/') && url.pathname.includes('hmr')) return
  if (url.pathname.startsWith('/__next')) return

  // Route the request to the appropriate strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request, url))
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request))
  } else if (isCacheFirstAsset(url)) {
    event.respondWith(handleCacheFirstRequest(request, url))
  } else {
    event.respondWith(handleNetworkFirstRequest(request))
  }
})

// ==================== Fetch Strategy: Navigation (Network First) ====================
async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      // Cache successful page response
      const cache = await caches.open(DYNAMIC_CACHE)
      await cacheWithTimestamp(DYNAMIC_CACHE, request, response.clone())
    }
    return response
  } catch (error) {
    // Network failed — try cache
    const cached = await caches.match(request)
    if (cached) return cached

    // No cache — show offline page
    const offlinePage = await caches.match('/offline.html')
    if (offlinePage) return offlinePage

    // Ultimate fallback
    return new Response(
      '<html><body style="font-family:sans-serif;text-align:center;padding:2rem;"><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}

// ==================== Fetch Strategy: Static Assets (Cache First + Background Revalidate) ====================
async function handleCacheFirstRequest(request, url) {
  const cacheName = isMediaAsset(url) ? MEDIA_CACHE : STATIC_CACHE

  const cached = await caches.match(request)
  if (cached) {
    // Return cached immediately, then update in background (stale-while-revalidate)
    revalidateInBackground(request, cacheName)
    return cached
  }

  // Not in cache — fetch from network
  try {
    const response = await fetch(request)
    if (response.ok) {
      await cacheWithTimestamp(cacheName, request, response.clone())
      // Trim cache if it's too large
      await trimCache(cacheName, cacheName === MEDIA_CACHE ? MAX_MEDIA_ENTRIES : MAX_DYNAMIC_ENTRIES)
    }
    return response
  } catch (error) {
    // Network failed for image — return transparent SVG placeholder
    if (isImageAsset(url)) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
        '<rect fill="#f0f0f0" width="200" height="200"/>' +
        '<text x="100" y="100" text-anchor="middle" dominant-baseline="middle" fill="#999" font-size="12">Image unavailable offline</text>' +
        '</svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      )
    }

    // For audio files, return empty audio response
    if (isAudioAsset(url)) {
      return new Response('', {
        status: 503,
        statusText: 'Audio unavailable offline',
        headers: { 'Content-Type': 'audio/wav' },
      })
    }

    return new Response('', { status: 408, statusText: 'Offline' })
  }
}

// ==================== Fetch Strategy: API (Network First with Cache Fallback) ====================
async function handleApiRequest(request, url) {
  // Only cache specific API routes
  const isCacheable = CACHEABLE_API_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))

  try {
    const response = await fetch(request)
    if (response.ok && isCacheable) {
      await cacheWithTimestamp(API_CACHE, request, response.clone())
      await trimCache(API_CACHE, MAX_API_ENTRIES)
    }
    return response
  } catch (error) {
    // Network failed — try cache for cacheable API routes
    if (isCacheable) {
      const cached = await caches.match(request)
      if (cached) return cached
    }

    // Return offline JSON response
    return new Response(
      JSON.stringify({
        success: false,
        error: 'You are offline. This feature requires an internet connection.',
        offline: true,
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// ==================== Fetch Strategy: Default (Network First) ====================
async function handleNetworkFirstRequest(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      await cacheWithTimestamp(DYNAMIC_CACHE, request, response.clone())
      await trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_ENTRIES)
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached

    return new Response('', { status: 408, statusText: 'Offline' })
  }
}

// ==================== Background Revalidation ====================
async function revalidateInBackground(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      await cacheWithTimestamp(cacheName, request, response)
    }
  } catch {
    // Silently fail — the cached version is still valid
  }
}

// ==================== Asset Type Helpers ====================
function isCacheFirstAsset(url) {
  return CACHE_FIRST_EXTENSIONS.test(url.pathname) ||
    CACHE_FIRST_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
}

function isMediaAsset(url) {
  return url.pathname.startsWith('/infographics/') ||
    url.pathname.startsWith('/equipment/') ||
    /\.(jpg|jpeg|png|gif|webp|avif|webm|mp3|wav)$/i.test(url.pathname)
}

function isImageAsset(url) {
  return /\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/i.test(url.pathname)
}

function isAudioAsset(url) {
  return /\.(mp3|wav|ogg|webm)$/i.test(url.pathname)
}

// ==================== Background Sync ====================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)

  if (event.tag === 'sync-progress') {
    event.waitUntil(syncOfflineData('progress'))
  } else if (event.tag === 'sync-exam-history') {
    event.waitUntil(syncOfflineData('exam-history'))
  } else if (event.tag === 'sync-statistics') {
    event.waitUntil(syncOfflineData('statistics'))
  } else if (event.tag === 'sync-all') {
    event.waitUntil(Promise.all([
      syncOfflineData('progress'),
      syncOfflineData('exam-history'),
      syncOfflineData('statistics'),
    ]))
  }
})

/**
 * Sync offline data by notifying all clients to push their pending changes.
 * Since our app uses localStorage/Zustand persistence, the data is already local.
 * This is primarily for future server-side sync integration.
 */
async function syncOfflineData(dataType) {
  try {
    const clients = await self.clients.matchAll({ type: 'window' })
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        dataType,
        timestamp: Date.now(),
      })
    })
    console.log(`[SW] Synced offline data: ${dataType}`)
  } catch (error) {
    console.warn(`[SW] Sync failed for ${dataType}:`, error)
  }
}

// ==================== Periodic Background Sync ====================
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateCacheContent())
  }
})

/**
 * Update cached content in the background when connectivity allows.
 */
async function updateCacheContent() {
  console.log('[SW] Periodic content update check...')

  try {
    // Re-validate key static assets
    const cache = await caches.open(STATIC_CACHE)
    const keyAssets = ['/manifest.json', '/pio-duran-ems-logo.png']

    await Promise.allSettled(
      keyAssets.map(async (url) => {
        try {
          const response = await fetch(url)
          if (response.ok) {
            await cacheWithTimestamp(STATIC_CACHE, url, response)
          }
        } catch {
          // Silently skip — we still have the cached version
        }
      })
    )

    // Notify clients that content has been updated
    const clients = await self.clients.matchAll({ type: 'window' })
    clients.forEach((client) => {
      client.postMessage({
        type: 'CONTENT_UPDATED',
        timestamp: Date.now(),
      })
    })

    console.log('[SW] Periodic content update complete')
  } catch (error) {
    console.warn('[SW] Periodic content update failed:', error)
  }
}

// ==================== Message Handlers ====================
self.addEventListener('message', (event) => {
  const data = event.data

  if (!data || !data.type) return

  switch (data.type) {
    case 'SKIP_WAITING':
      console.log('[SW] Skip waiting requested')
      self.skipWaiting()
      break

    case 'CACHE_URLS':
      if (data.urls && Array.isArray(data.urls)) {
        cacheUrlsOnDemand(data.urls)
      }
      break

    case 'GET_CACHE_SIZE':
      getCacheSize().then((size) => {
        event.ports[0]?.postMessage({ type: 'CACHE_SIZE', ...size })
      })
      break

    case 'CLEAR_ALL_CACHES':
      clearAllCaches().then(() => {
        event.ports[0]?.postMessage({ type: 'CACHES_CLEARED' })
      })
      break

    case 'PREFETCH_MEDIA':
      if (data.urls && Array.isArray(data.urls)) {
        prefetchMedia(data.urls)
      }
      break

    case 'REQUEST_SYNC':
      requestBackgroundSync(data.tag || 'sync-all')
      break

    default:
      break
  }
})

// ==================== On-Demand Caching ====================
async function cacheUrlsOnDemand(urls) {
  const cache = await caches.open(DYNAMIC_CACHE)
  console.log(`[SW] On-demand caching ${urls.length} URLs`)

  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          await cacheWithTimestamp(DYNAMIC_CACHE, url, response)
        }
      } catch {
        // Skip failed requests
      }
    })
  )

  await trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_ENTRIES)
}

// ==================== Media Prefetching ====================
async function prefetchMedia(urls) {
  const cache = await caches.open(MEDIA_CACHE)
  console.log(`[SW] Prefetching ${urls.length} media files`)

  let succeeded = 0
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          await cacheWithTimestamp(MEDIA_CACHE, url, response)
          succeeded++
        }
      } catch {
        // Skip failed
      }
    })
  )

  await trimCache(MEDIA_CACHE, MAX_MEDIA_ENTRIES)
  console.log(`[SW] Prefetched ${succeeded}/${urls.length} media files`)

  // Notify clients about prefetch progress
  const clients = await self.clients.matchAll({ type: 'window' })
  clients.forEach((client) => {
    client.postMessage({
      type: 'PREFETCH_COMPLETE',
      total: urls.length,
      succeeded,
      timestamp: Date.now(),
    })
  })
}

// ==================== Cache Size Reporting ====================
async function getCacheSize() {
  const cacheNames = [STATIC_CACHE, DYNAMIC_CACHE, MEDIA_CACHE, API_CACHE]
  let totalEntries = 0
  const breakdown = {}

  for (const name of cacheNames) {
    const cache = await caches.open(name)
    const keys = await cache.keys()
    breakdown[name] = keys.length
    totalEntries += keys.length
  }

  // Estimate storage usage if available
  let storageEstimate = null
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate()
      storageEstimate = {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
      }
    } catch {
      // Not available
    }
  }

  return { totalEntries, breakdown, storageEstimate }
}

// ==================== Cache Clearing ====================
async function clearAllCaches() {
  const cacheNames = await caches.keys()
  await Promise.all(cacheNames.map((name) => caches.delete(name)))
  console.log('[SW] All caches cleared')
}

// ==================== Background Sync Request ====================
async function requestBackgroundSync(tag) {
  try {
    const registration = await self.registration
    await registration.sync.register(tag)
    console.log(`[SW] Background sync registered: ${tag}`)
  } catch (error) {
    console.warn('[SW] Background sync not supported or failed:', error)
    // Fallback: try to sync immediately
    await syncOfflineData(tag.replace('sync-', ''))
  }
}

// ==================== Push Notification (Future) ====================
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  const title = data.title || 'EMS NCII Update'
  const options = {
    body: data.body || 'New content is available.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data?.url || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus existing window or open new one
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus()
        }
      }
      return self.clients.openWindow(url)
    })
  )
})
