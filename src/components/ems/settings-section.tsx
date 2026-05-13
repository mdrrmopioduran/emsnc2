'use client'

import React from 'react'
import Image from 'next/image'
import { useAppStore, getLevelFromXp, getXpForNextLevel, BADGE_DEFINITIONS } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { usePWA } from '@/hooks/use-pwa'
import { CacheInfoCard, ConnectionStatusBadge, LastSyncDisplay } from '@/components/ems/pwa-components'
import {
  Sun, Moon, Type, Palette, BarChart3, Trash2, Download,
  Info, Shield, Eye, Volume2, AlertTriangle, BookOpen,
  ClipboardCheck, Heart, Zap, Flame, Award, Target, RotateCcw,
  Clock, GraduationCap, Rocket, Trophy, Star, Sparkles,
  CheckCircle2, Milestone, TrendingUp, WifiOff, Upload, HardDrive
} from 'lucide-react'
import { toast as sonnerToast } from 'sonner'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { roadmapTopics } from '@/data/roadmap'
import { BadgeDisplay, XPBar, GoalsTracker } from '@/components/ems/shared-components'
import { StudyStatsSection } from '@/components/ems/study-stats-section'
import { FocusTimerSection } from '@/components/ems/focus-timer-section'
import { ProgressWidget } from '@/components/ems/progress-widget'
import { AchievementHistory } from '@/components/ems/achievement-history'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { ChevronDown } from 'lucide-react'

// ==================== MILESTONE DEFINITIONS ====================
const MILESTONE_INFO: Record<string, { label: string; icon: string; color: string }> = {
  'first-topic': { label: 'First Topic Read', icon: '📖', color: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800' },
  'half-roadmap': { label: 'Halfway Through Roadmap', icon: '🏁', color: 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800' },
  'full-roadmap': { label: 'Roadmap Complete', icon: '🏆', color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800' },
  'first-quiz': { label: 'First Quiz Taken', icon: '📝', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' },
  'quiz-ace': { label: 'Quiz Ace (90%+)', icon: '⭐', color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800' },
  'quiz-veteran': { label: '5 Quizzes Completed', icon: '🧠', color: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800' },
  'first-simulation': { label: 'First Simulation', icon: '🦸', color: 'bg-teal-100 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800' },
  'simulation-veteran': { label: '5 Simulations Done', icon: '🎖️', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800' },
  'streak-3': { label: '3-Day Streak', icon: '🔥', color: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800' },
  'streak-7': { label: '7-Day Streak', icon: '🔥', color: 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800' },
  'streak-30': { label: '30-Day Streak', icon: '💎', color: 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800' },
  'bookworm': { label: '10 Bookmarks', icon: '📚', color: 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800' },
  'diagnostic-completed': { label: 'Diagnostic Done', icon: '🎯', color: 'bg-violet-100 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800' },
  'checklist-complete': { label: 'Full Checklist', icon: '✅', color: 'bg-lime-100 dark:bg-lime-900/30 border-lime-200 dark:border-lime-800' },
}

/** PWA Install card — shows install button if available, or installed status */
function PWAInstallCard() {
  const { isInstallable, isInstalled, isOnline, installPrompt } = usePWA()
  const { t } = useTranslation()
  const [installing, setInstalling] = React.useState(false)

  const handleInstall = async () => {
    if (!installPrompt) return
    setInstalling(true)
    try {
      await installPrompt()
      // Don't need to set installing false — the prompt will resolve
    } catch {
      // Ignore
    } finally {
      setInstalling(false)
    }
  }

  // Don't show if already installed and not installable
  if (isInstalled && !isInstallable) {
    return (
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> App Installation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-ems-teal">
            <Shield className="w-4 h-4" />
            <span className="font-medium">App is installed on your device</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Content is cached for offline access. The app updates automatically when you&apos;re online.
          </p>
          {!isOnline && (
            <div className="flex items-center gap-2 mt-2 text-xs text-ems-red">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Currently offline — using cached content</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Show install prompt if available
  if (isInstallable) {
    return (
      <Card className="card-modern border-ems-teal/20 bg-ems-teal/5">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-ems-teal" /> Install App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-foreground/80">
            Install this app on your device for quick access and offline learning.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleInstall}
              disabled={installing}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-ems-teal text-white font-bold text-sm hover:bg-ems-teal/90 transition-all shadow-lg shadow-ems-teal/25 disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {installing ? 'Installing...' : '📥 Install EMS NC II App'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>📖</span> Offline study
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>⚡</span> Faster access
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>📱</span> Home screen
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>🔄</span> Auto-updates
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Not installable (browser doesn't support it) — show info
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Download className="w-4 h-4" /> App Installation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          To install this app, open it in Chrome, Edge, or Safari and use the browser&apos;s &quot;Add to Home Screen&quot; option.
        </p>
        {!isOnline && (
          <div className="flex items-center gap-2 mt-2 text-xs text-ems-red">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Currently offline — using cached content</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== KEYBOARD SHORTCUTS DATA ====================
type ShortcutCategory = 'navigation' | 'studyTools' | 'general'

interface ShortcutItem {
  keys: string[]
  descriptionKey: string
  category: ShortcutCategory
}

const SHORTCUTS: ShortcutItem[] = [
  // Navigation
  { keys: ['Ctrl', 'K'], descriptionKey: 'shortcuts.openSearch', category: 'navigation' },
  { keys: ['Esc'], descriptionKey: 'shortcuts.closeDialog', category: 'navigation' },
  { keys: ['1'], descriptionKey: 'shortcuts.sectionRoadmap', category: 'navigation' },
  { keys: ['2'], descriptionKey: 'shortcuts.sectionStudy', category: 'navigation' },
  { keys: ['3'], descriptionKey: 'shortcuts.sectionVisual', category: 'navigation' },
  { keys: ['4'], descriptionKey: 'shortcuts.sectionAssessment', category: 'navigation' },
  { keys: ['5'], descriptionKey: 'shortcuts.sectionSettings', category: 'navigation' },
  { keys: ['H'], descriptionKey: 'shortcuts.toggleSidebar', category: 'navigation' },
  // Study Tools
  { keys: ['F'], descriptionKey: 'shortcuts.goToFlashcards', category: 'studyTools' },
  { keys: ['T'], descriptionKey: 'shortcuts.startFocusTimer', category: 'studyTools' },
  { keys: ['N'], descriptionKey: 'shortcuts.goToNotes', category: 'studyTools' },
  { keys: ['Q'], descriptionKey: 'shortcuts.startQuiz', category: 'studyTools' },
  // General
  { keys: ['D'], descriptionKey: 'shortcuts.toggleTheme', category: 'general' },
  { keys: ['?'], descriptionKey: 'shortcuts.showShortcuts', category: 'general' },
]

const CATEGORY_CONFIG: Record<ShortcutCategory, { labelKey: string; color: string; bgColor: string; borderColor: string }> = {
  navigation: {
    labelKey: 'shortcuts.navigation',
    color: 'text-teal-700 dark:text-teal-300',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    borderColor: 'border-teal-200 dark:border-teal-800',
  },
  studyTools: {
    labelKey: 'shortcuts.studyTools',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  general: {
    labelKey: 'shortcuts.general',
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-50 dark:bg-slate-900/30',
    borderColor: 'border-slate-200 dark:border-slate-700',
  },
}

/** Keyboard key badge component */
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center px-2 py-1 rounded bg-muted border border-border text-xs font-mono shadow-sm min-w-[28px] justify-center">
      {children}
    </kbd>
  )
}

/** Keyboard Shortcuts Panel — collapsible card showing all shortcuts */
function KeyboardShortcutsPanel({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const { t } = useTranslation()

  const categories: ShortcutCategory[] = ['navigation', 'studyTools', 'general']

  return (
    <Card className="card-modern card-elevated" data-shortcuts-panel>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/20 rounded-t-lg transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">⌨️</span>
          <CardTitle className="text-sm font-semibold">{t('shortcuts.title')}</CardTitle>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-muted-foreground transition-transform duration-200',
            expanded ? 'rotate-0' : '-rotate-90'
          )}
        />
      </button>

      {expanded && (
        <CardContent className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          <p className="text-xs text-muted-foreground mb-4">
            {t('shortcuts.subtitle')}
          </p>

          <div className="space-y-5">
            {categories.map((category) => {
              const config = CATEGORY_CONFIG[category]
              const items = SHORTCUTS.filter((s) => s.category === category)

              return (
                <div key={category}>
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <Badge
                      variant="outline"
                      className={cn('text-[10px] font-semibold px-2 py-0.5 border', config.borderColor, config.color, config.bgColor)}
                    >
                      {t(config.labelKey as Parameters<typeof t>[0])}
                    </Badge>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[10px] text-muted-foreground">{items.length}</span>
                  </div>

                  {/* Shortcut rows */}
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div
                        key={item.descriptionKey}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-muted/40 transition-colors"
                      >
                        <span className="text-xs text-foreground/80">
                          {t(item.descriptionKey as Parameters<typeof t>[0])}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {item.keys.map((key, i) => (
                            <React.Fragment key={i}>
                              {i > 0 && <span className="text-[10px] text-muted-foreground font-mono">+</span>}
                              <Kbd>{key}</Kbd>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer hint */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground text-center">
              💡 {t('shortcuts.subtitle')} — <Kbd>?</Kbd> {t('shortcuts.showShortcuts').toLowerCase()}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

/** Reusable collapsible settings group wrapper */
function SettingsGroup({
  icon,
  title,
  iconBg,
  defaultExpanded = true,
  children,
}: {
  icon: React.ReactNode
  title: string
  iconBg?: string
  defaultExpanded?: boolean
  children: React.ReactNode
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  return (
    <div className="settings-group">
      <button
        className="settings-group-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className={cn('settings-group-icon', iconBg || 'bg-primary/10 text-primary')}>
            {icon}
          </div>
          <span className="settings-group-title">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'settings-group-chevron',
            expanded && 'expanded'
          )}
        />
      </button>
      <div
        className={cn(
          'settings-group-content',
          expanded && 'expanded'
        )}
      >
        <div className="settings-group-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

export function SettingsSection() {
  const { settings, updateSettings, progress, resetProgress, setLearningMode, setDailyGoalMinutes, importProgress, importSettings } = useAppStore()
  const [shortcutsExpanded, setShortcutsExpanded] = React.useState(true)
  useKeyboardShortcuts()
  const { toast } = useToast()
  const { t } = useTranslation()

  const totalTopics = roadmapTopics.length
  const readTopics = progress.readTopics.length
  const totalQuizzes = progress.quizScores.length
  const avgScore = totalQuizzes > 0
    ? Math.round(progress.quizScores.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / totalQuizzes)
    : 0
  const totalSimulations = progress.completedSimulations.length
  const totalBookmarks = progress.bookmarks.length
  const xpInfo = getXpForNextLevel(progress.xp)

  // Calculate preparedness score
  const roadmapProgress = totalTopics > 0 ? readTopics / totalTopics : 0
  const quizReadiness = avgScore / 100
  const simProgress = Math.min(progress.completedSimulations.length / 5, 1)
  const diagnosticBonus = progress.diagnosticCompleted ? 0.1 : 0
  const preparednessScore = Math.round(
    (roadmapProgress * 0.35 + quizReadiness * 0.35 + simProgress * 0.2 + diagnosticBonus) * 100
  )

  const accentColors = [
    { id: 'navy' as const, label: 'Navy Blue', color: '#1E3A5F' },
    { id: 'teal' as const, label: 'Medical Teal', color: '#2EC4B6' },
    { id: 'red' as const, label: 'Emergency Red', color: '#E63946' },
  ]

  const fontSizes = [
    { id: 'small' as const, label: 'Small' },
    { id: 'medium' as const, label: 'Medium' },
    { id: 'large' as const, label: 'Large' },
  ]

  const dailyGoalOptions = [5, 15, 30, 60]

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [importFileName, setImportFileName] = React.useState<string>('')

  const handleExport = () => {
    const data = {
      progress,
      settings: { ...settings, ai: { ...settings.ai, apiKey: '' } },
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ems-reviewer-progress-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    sonnerToast.success(t('dataExport.exportSuccess'), { description: t('dataExport.exportDesc') })
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportFileName(file.name)
  }

  const handleImport = () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      sonnerToast.error(t('dataExport.importError'), { description: t('dataExport.selectFile') })
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string)
        // Validate structure
        if (!parsed.progress || !parsed.settings) {
          throw new Error('Invalid structure')
        }
        // Check required progress fields
        const requiredFields = ['readTopics', 'quizScores', 'completedSimulations', 'bookmarks', 'xp', 'level', 'badges']
        for (const field of requiredFields) {
          if (!(field in parsed.progress)) {
            throw new Error(`Missing field: ${field}`)
          }
        }
        // Import data
        importProgress(parsed.progress)
        importSettings(parsed.settings)
        sonnerToast.success(t('dataExport.importSuccess'), { description: t('dataExport.importSuccessDesc') })
        setImportFileName('')
        setTimeout(() => window.location.reload(), 1500)
      } catch {
        sonnerToast.error(t('dataExport.importError'), { description: t('dataExport.importErrorDesc') })
        setImportFileName('')
      }
    }
    reader.readAsText(file)
  }

  // Preparedness level label
  const getPreparednessLabel = (score: number) => {
    if (score >= 85) return { label: t('settings.examReady'), color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-950/20' }
    if (score >= 65) return { label: t('settings.almostThere'), color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' }
    if (score >= 40) return { label: t('common.inProgress'), color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' }
    return { label: t('settings.gettingStarted'), color: 'text-muted-foreground', bg: 'bg-muted/50' }
  }

  const prepInfo = getPreparednessLabel(preparednessScore)

  return (
    <div className="content-transition space-y-6">
      {/* Progress Widget */}
      <ProgressWidget />

      {/* XP & Gamification Summary */}
      <XPBar />

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="card-modern bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200/50 dark:border-amber-800/30">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{progress.xp}</p>
            <p className="text-xs text-muted-foreground">{t('roadmap.totalXp')}</p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <Star className="w-3 h-3 text-amber-500" />
              <p className="text-[10px] text-amber-500 font-medium">{t('settings.level')} {getLevelFromXp(progress.xp)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-modern bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200/50 dark:border-orange-800/30">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{progress.streak}</p>
            <p className="text-xs text-muted-foreground">{t('roadmap.dayStreak')}</p>
            <p className="text-[10px] text-orange-500 font-medium mt-1">Keep it going! 🔥</p>
          </CardContent>
        </Card>
        <Card className="card-modern bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200/50 dark:border-purple-800/30">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{progress.badges.length}/{BADGE_DEFINITIONS.length}</p>
            <p className="text-xs text-muted-foreground">{t('settings.badges')}</p>
            <p className="text-[10px] text-purple-500 font-medium mt-1">{BADGE_DEFINITIONS.length - progress.badges.length} {t('settings.toUnlock')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Preparedness Score */}
      <Card className="card-modern overflow-hidden">
        <CardContent className="p-0">
          <div className={cn('p-5', prepInfo.bg)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t('settings.preparednessScore')}</h3>
                  <p className="text-[10px] text-muted-foreground">{t('settings.estimatedReadiness')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('text-3xl font-bold', prepInfo.color)}>{preparednessScore}%</p>
                <Badge variant="outline" className={cn('text-[10px]', prepInfo.color, 'border-current/30')}>
                  {prepInfo.label}
                </Badge>
              </div>
            </div>
            <Progress value={preparednessScore} className="h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-ems-teal" />
          </div>
          <div className="grid grid-cols-3 gap-px bg-border">
            <div className="bg-card p-3 text-center">
              <p className="text-xs text-muted-foreground">Roadmap</p>
              <p className="text-sm font-bold">{Math.round(roadmapProgress * 100)}%</p>
              <p className="text-[10px] text-muted-foreground">35% weight</p>
            </div>
            <div className="bg-card p-3 text-center">
              <p className="text-xs text-muted-foreground">Quiz Avg</p>
              <p className="text-sm font-bold">{avgScore}%</p>
              <p className="text-[10px] text-muted-foreground">35% weight</p>
            </div>
            <div className="bg-card p-3 text-center">
              <p className="text-xs text-muted-foreground">Simulations</p>
              <p className="text-sm font-bold">{Math.round(simProgress * 100)}%</p>
              <p className="text-[10px] text-muted-foreground">30% weight</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <BadgeDisplay />

      {/* Study Statistics Dashboard */}
      <StudyStatsSection />

      {/* Milestones */}
      <Card className="card-modern">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              {t('settings.milestones')}
            </h3>
            <Badge variant="outline" className="text-[10px]">
              {progress.milestones.length} {t('settings.achieved')}
            </Badge>
          </div>

          {progress.milestones.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-2">
                <Milestone className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground">{t('settings.startStudying')}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{t('settings.readTopicQuizSim')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
              {progress.milestones.map((milestone) => {
                const info = MILESTONE_INFO[milestone]
                return (
                  <div
                    key={milestone}
                    className={cn(
                      'flex items-center gap-2 p-2.5 rounded-lg border milestone-celebrate',
                      info?.color || 'bg-muted/30 border-border'
                    )}
                  >
                    <span className="text-lg flex-shrink-0">{info?.icon || '🏆'}</span>
                    <span className="text-[11px] font-medium leading-tight">{info?.label || milestone}</span>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievement History */}
      <AchievementHistory />

      {/* Learning Goals */}
      <GoalsTracker />

      {/* Focus Timer */}
      <FocusTimerSection />

      {/* Personal — Learning Preferences */}
      <SettingsGroup
        icon={<GraduationCap className="w-4 h-4" />}
        title={t('settings.learningPreferences')}
        iconBg="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
      >
        {/* Learning Mode & Daily Goal */}
        <div className="space-y-5">
          {/* Learning Mode Toggle */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">{t('settings.learningMode')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.chooseStudyPace')}</p>
              </div>
            </div>
            <div className="mode-toggle bg-muted">
              <div
                className={cn(
                  'mode-toggle-slider',
                  settings.learningMode === 'quickReview' ? 'translate-x-full' : 'translate-x-0'
                )}
              />
              <button
                className={cn('mode-toggle-option', settings.learningMode === 'learning' && 'active')}
                onClick={() => setLearningMode('learning')}
              >
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                {t('study.learning')}
              </button>
              <button
                className={cn('mode-toggle-option', settings.learningMode === 'quickReview' && 'active')}
                onClick={() => setLearningMode('quickReview')}
              >
                <Rocket className="w-3.5 h-3.5 mr-1.5" />
                {t('study.quickReview')}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              {settings.learningMode === 'learning'
                ? t('mode.learningDesc')
                : t('mode.quickReviewDesc')}
            </p>
          </div>

          <Separator />

          {/* Daily Goal */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">{t('settings.dailyGoal')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.setDailyTarget')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {dailyGoalOptions.map((minutes) => (
                <button
                  key={minutes}
                  className={cn(
                    'relative flex flex-col items-center p-3 rounded-xl border-2 transition-all',
                    settings.dailyGoalMinutes === minutes
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
                  )}
                  onClick={() => setDailyGoalMinutes(minutes)}
                >
                  {settings.dailyGoalMinutes === minutes && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <span className="text-lg font-bold">{minutes}</span>
                  <span className="text-[10px] text-muted-foreground">min</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              💡 {t('settings.recommended')}
            </p>
          </div>
        </div>
      </SettingsGroup>

      {/* Preferences — Appearance */}
      <SettingsGroup
        icon={<Palette className="w-4 h-4" />}
        title={t('settings.appearance')}
        iconBg="bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400"
      >
        <div className="space-y-5">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <div>
                <p className="text-sm font-medium">{t('settings.theme')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.switchTheme')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              <Switch
                checked={settings.theme === 'dark'}
                onCheckedChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
              />
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>

          <Separator />

          {/* Font Size */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-4 h-4" />
              <p className="text-sm font-medium">{t('settings.fontSize')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    settings.fontSize === size.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                  onClick={() => updateSettings({ fontSize: size.id })}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Accent Color */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4" />
              <p className="text-sm font-medium">{t('settings.accentColor')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
                    settings.accentColor === color.id
                      ? 'ring-2 ring-offset-2 ring-primary bg-muted'
                      : 'bg-muted/50 hover:bg-muted'
                  )}
                  onClick={() => updateSettings({ accentColor: color.id })}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-border"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-xs font-medium">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SettingsGroup>

      {/* Data — Progress & Data */}
      <SettingsGroup
        icon={<BarChart3 className="w-4 h-4" />}
        title={t('settings.progressAndData')}
        iconBg="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
      >
        <div className="space-y-4">
          {/* Summary stats - enhanced with gradient backgrounds */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 text-center border border-primary/10">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold">{readTopics}/{totalTopics}</p>
              <p className="text-[10px] text-muted-foreground">{t('settings.topicsRead')}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/5 to-teal-500/10 text-center border border-teal-500/10">
              <ClipboardCheck className="w-5 h-5 mx-auto mb-1 text-ems-teal" />
              <p className="text-lg font-bold">{totalQuizzes}</p>
              <p className="text-[10px] text-muted-foreground">{t('settings.quizzesTaken')}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/5 to-red-500/10 text-center border border-red-500/10">
              <BarChart3 className="w-5 h-5 mx-auto mb-1 text-ems-red" />
              <p className="text-lg font-bold">{avgScore}%</p>
              <p className="text-[10px] text-muted-foreground">{t('settings.avgScore')}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 text-center border border-purple-500/10">
              <Heart className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <p className="text-lg font-bold">{totalSimulations}</p>
              <p className="text-[10px] text-muted-foreground">{t('settings.simulations')}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 text-center border border-amber-500/10 sm:col-span-1 col-span-2">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-amber-500" />
              <p className="text-lg font-bold">{totalBookmarks}</p>
              <p className="text-[10px] text-muted-foreground">{t('settings.bookmarks')}</p>
            </div>
          </div>

          <Separator />

          {/* XP Progress */}
          <div>
            <p className="text-sm font-medium mb-2">{t('settings.xpProgress')}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Progress value={xpInfo.progress * 100} className="h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-500" />
              </div>
              <span className="text-xs text-muted-foreground">{xpInfo.current}/{xpInfo.needed} XP</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {t('settings.level')} {getLevelFromXp(progress.xp)} → {t('settings.level')} {getLevelFromXp(progress.xp) + 1}
            </p>
          </div>

          <Separator />

          {/* Recent quiz scores */}
          {progress.quizScores.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">{t('settings.recentQuizScores')}</p>
              <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                {progress.quizScores.slice(-5).reverse().map((qs, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-muted/30">
                    <span>{qs.category}</span>
                    <span className={cn('font-semibold', (qs.score / qs.total) >= 0.7 ? 'text-green-500' : 'text-ems-red')}>
                      {qs.score}/{qs.total} ({Math.round((qs.score / qs.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
              <Download className="w-4 h-4" /> {t('settings.exportProgress')}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Trash2 className="w-4 h-4" /> {t('settings.resetAll')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-ems-red" />
                    {t('settings.resetConfirm')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('settings.resetWarning')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetProgress()
                      toast({ title: t('settings.progressReset'), description: t('settings.allDataCleared') })
                    }}
                    className="bg-ems-red hover:bg-ems-red/90"
                  >
                    {t('settings.resetEverything')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SettingsGroup>

      {/* Personal — Accessibility */}
      <SettingsGroup
        icon={<Eye className="w-4 h-4" />}
        title={t('settings.accessibility')}
        iconBg="bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400"
        defaultExpanded={false}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">{t('settings.highContrast')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.increasesContrast')}</p>
              </div>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => {
                updateSettings({ highContrast: checked })
                document.documentElement.classList.toggle('high-contrast', checked)
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">{t('settings.textToSpeech')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.readAloud')}</p>
              </div>
            </div>
            <Switch
              checked={settings.textToSpeech}
              onCheckedChange={(checked) => {
                updateSettings({ textToSpeech: checked })
                if (!checked) {
                  // Stop any playing audio
                  const audio = document.querySelector('audio')
                  if (audio) {
                    audio.pause()
                    audio.src = ''
                  }
                }
              }}
            />
          </div>

          {/* TTS Voice & Speed Options (only visible when TTS is enabled) */}
          {settings.textToSpeech && (
            <div className="ml-6 space-y-4 p-3 rounded-lg bg-muted/30 border border-border/50">
              {/* Voice Selection */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-3.5 h-3.5 text-ems-teal" />
                  <p className="text-xs font-semibold text-foreground">Voice</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'jam', label: 'James', desc: 'English Gentleman' },
                    { id: 'kazi', label: 'Kazi', desc: 'Clear Standard' },
                    { id: 'tongtong', label: 'Tongtong', desc: 'Warm & Friendly' },
                    { id: 'xiaochen', label: 'Xiaochen', desc: 'Professional' },
                  ].map((voice) => (
                    <button
                      key={voice.id}
                      className={cn(
                        'flex flex-col items-center p-2.5 rounded-lg border-2 transition-all text-center',
                        settings.ttsVoice === voice.id
                          ? 'border-ems-teal bg-ems-teal/5 shadow-sm'
                          : 'border-border bg-card hover:border-ems-teal/30'
                      )}
                      onClick={() => updateSettings({ ttsVoice: voice.id })}
                    >
                      <span className="text-xs font-semibold">{voice.label}</span>
                      <span className="text-[10px] text-muted-foreground">{voice.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <p className="text-xs font-semibold text-foreground">Speed</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {(settings.ttsSpeed ?? 1.0).toFixed(1)}x
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 0.7, label: 'Slow' },
                    { value: 1.0, label: 'Normal' },
                    { value: 1.3, label: 'Fast' },
                    { value: 1.6, label: 'Very Fast' },
                  ].map((speed) => (
                    <button
                      key={speed.value}
                      className={cn(
                        'flex flex-col items-center p-2 rounded-lg border-2 transition-all',
                        (settings.ttsSpeed ?? 1.0) === speed.value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20 shadow-sm'
                          : 'border-border bg-card hover:border-amber-500/30'
                      )}
                      onClick={() => updateSettings({ ttsSpeed: speed.value })}
                    >
                      <span className="text-xs font-semibold">{speed.label}</span>
                      <span className="text-[10px] text-muted-foreground">{speed.value}x</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 text-xs"
                onClick={() => {
                  const testText = 'Text to speech is working. This is a test of the emergency medical service learning platform.'
                  fetch('/api/tts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      text: testText,
                      voice: settings.ttsVoice || 'jam',
                      speed: settings.ttsSpeed ?? 1.0,
                    }),
                  })
                    .then(res => res.blob())
                    .then(blob => {
                      const url = URL.createObjectURL(blob)
                      const audio = new Audio(url)
                      audio.play()
                    })
                    .catch(err => console.error('TTS test error:', err))
                }}
              >
                <Volume2 className="w-3.5 h-3.5" />
                Test Voice
              </Button>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">{t('settings.reducedMotion')}</p>
                <p className="text-xs text-muted-foreground">{t('settings.minimizeAnimations')}</p>
              </div>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => {
                updateSettings({ reducedMotion: checked })
              }}
            />
          </div>
        </div>
      </SettingsGroup>

      {/* Keyboard Shortcuts */}
      <KeyboardShortcutsPanel expanded={shortcutsExpanded} onToggle={() => setShortcutsExpanded(!shortcutsExpanded)} />

      {/* PWA Install */}
      <PWAInstallCard />

      {/* Export / Import Progress */}
      <Card className="card-modern border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" /> {t('dataExport.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">{t('dataExport.description')}</p>
          <p className="text-[10px] text-muted-foreground">{t('dataExport.fileInfo')}</p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" /> {t('dataExport.exportBtn')}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleImportClick} className="gap-2" disabled={!importFileName}>
                  <Upload className="w-4 h-4" /> {t('dataExport.importBtn')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-500" />
                    {t('dataExport.importConfirmTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('dataExport.importConfirmDesc')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleImport} className="bg-primary hover:bg-primary/90">
                    {t('dataExport.importAction')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" /> {t('dataExport.resetBtn')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-ems-red" />
                    {t('dataExport.resetConfirmTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('dataExport.resetConfirmDesc')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      resetProgress()
                      sonnerToast.success(t('dataExport.resetSuccess'), { description: t('dataExport.resetSuccessDesc') })
                      setTimeout(() => window.location.reload(), 1500)
                    }}
                    className="bg-ems-red hover:bg-ems-red/90"
                  >
                    {t('dataExport.resetAction')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {importFileName && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-xs">
              <Upload className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{t('dataExport.fileName')}</span>
              <span className="font-medium truncate max-w-[200px]">{importFileName}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offline Storage Info */}
      <CacheInfoCard />

      {/* Connection Status */}
      <ConnectionStatusBadge />

      {/* About */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="w-4 h-4" /> {t('settings.about')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Image
              src="/pio-duran-ems-logo.png"
              alt="PIO DURAN EMS NCII Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="font-bold">PIO DURAN EMS NCII Reviewer</span>
            <Badge variant="outline" className="text-[10px]">v2.0.0</Badge>
          </div>

          <p className="text-sm text-foreground/80">
            This app is designed to help PIO DURAN EMS NCII TESDA candidates prepare for competency assessment.
            It covers essential topics including OSH, First Aid, BLS/CPR, Patient Assessment,
            Emergency Procedures, and Philippine EMS regulations.
          </p>

          <div className="p-3 rounded-lg bg-ems-red/5 border border-ems-red/10">
            <p className="text-xs text-foreground/70">
              <strong>Disclaimer:</strong> Content is for educational and review purposes only.
              Always refer to official TESDA and DOH guidelines. This app does not replace
              formal training or medical direction.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">Reference Sources:</p>
            <ul className="text-xs text-foreground/60 space-y-0.5">
              <li>• TESDA Training Regulations for PIO DURAN EMS NCII</li>
              <li>• AHA Guidelines for CPR and Emergency Cardiovascular Care (2025)</li>
              <li>• Department of Health (DOH) Philippines — Circulars & Memoranda</li>
              <li>• Republic Act 10932 (Universal Health Care Act)</li>
              <li>• Republic Act 10871 (Basic Life Support for Students Act)</li>
              <li>• NDRRMC Guidelines for Emergency Response</li>
              <li>• Philippine Red Cross — First Aid Manual</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
