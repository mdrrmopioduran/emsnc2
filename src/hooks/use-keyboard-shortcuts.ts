'use client'

import { useEffect, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'

/**
 * Checks whether the user is currently typing in an input, textarea, or contentEditable element.
 */
function isTypingInInput(): boolean {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName.toLowerCase()
  if (tag === 'input' || tag === 'textarea') return true
  if (tag === 'select') return true
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

/**
 * Global keyboard shortcuts for the PIO DURAN EMS NCII Reviewer app.
 *
 * Shortcuts are only active when the user is NOT typing in an input/textarea/contentEditable.
 * Ctrl+K (search) is handled separately in GlobalSearch component.
 *
 * Navigation:
 *   1          → Roadmap
 *   2          → Study & Review
 *   3          → Visualization
 *   4          → Assessment
 *   5          → Settings
 *   H          → Toggle sidebar
 *   Escape     → Close any open dialog/modal (handled by the search component)
 *
 * Study Tools:
 *   F          → Go to Flashcards
 *   T          → Go to Focus Timer (Settings section)
 *   N          → Go to Notes
 *   Q          → Go to Quiz (Assessment section)
 *
 * General:
 *   D          → Toggle dark/light mode
 *   ? or /     → Scroll to keyboard shortcuts panel
 */
export function useKeyboardShortcuts() {
  const setActiveSection = useAppStore((s) => s.setActiveSection)
  const setActiveSubSection = useAppStore((s) => s.setActiveSubSection)
  const toggleSidebar = useAppStore((s) => s.toggleSidebar)
  const updateSettings = useAppStore((s) => s.updateSettings)
  const theme = useAppStore((s) => s.settings.theme)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip if user is typing in an input/textarea
    if (isTypingInInput()) return

    // Skip if Ctrl/Meta is held (except for specific combos we handle)
    const isModifier = e.ctrlKey || e.metaKey || e.altKey

    // Don't interfere with browser shortcuts (Ctrl+K handled by GlobalSearch)
    if (isModifier) return

    const key = e.key.toLowerCase()

    switch (key) {
      // ─── Navigation ─────────────────────────────────────────
      case '1':
        e.preventDefault()
        setActiveSection('roadmap')
        break
      case '2':
        e.preventDefault()
        setActiveSection('study')
        break
      case '3':
        e.preventDefault()
        setActiveSection('visual')
        break
      case '4':
        e.preventDefault()
        setActiveSection('assessment')
        break
      case '5':
        e.preventDefault()
        setActiveSection('settings')
        break
      case 'h':
        e.preventDefault()
        toggleSidebar()
        break

      // ─── Study Tools ─────────────────────────────────────────
      case 'f':
        e.preventDefault()
        setActiveSection('study')
        // Small delay to ensure section is set before navigating to sub
        setTimeout(() => setActiveSubSection('flashcards'), 0)
        break
      case 't':
        e.preventDefault()
        setActiveSection('settings')
        // Focus timer is inside the settings section — scroll there after navigation
        setTimeout(() => {
          const timerEl = document.querySelector('[data-focus-timer]')
          if (timerEl) timerEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
        break
      case 'n':
        e.preventDefault()
        setActiveSection('study')
        setTimeout(() => setActiveSubSection('notes'), 0)
        break
      case 'q':
        e.preventDefault()
        setActiveSection('assessment')
        setTimeout(() => setActiveSubSection('quiz'), 0)
        break

      // ─── General ────────────────────────────────────────────
      case 'd':
        e.preventDefault()
        updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })
        break

      case '?':
      case '/':
        e.preventDefault()
        // Navigate to settings and scroll to shortcuts panel
        setActiveSection('settings')
        setTimeout(() => {
          const shortcutsEl = document.querySelector('[data-shortcuts-panel]')
          if (shortcutsEl) {
            shortcutsEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
        break

      default:
        break
    }
  }, [setActiveSection, setActiveSubSection, toggleSidebar, updateSettings, theme])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
