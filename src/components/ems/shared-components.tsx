'use client'

import React from 'react'
import { useAppStore, type Section, BADGE_DEFINITIONS, getLevelFromXp, getXpForNextLevel } from '@/store/app-store'
import { acronyms } from '@/data/acronyms'
import { drugs } from '@/data/drugs'
import { questions } from '@/data/questions'
import { roadmapTopics } from '@/data/roadmap'
import {
  Search, ChevronRight, X, Trophy, Flame, Star, Zap,
  Home, BookOpen, BookText, Heart, ClipboardCheck, Settings,
  Target, Award, CheckCircle2, Sparkles, Shuffle, Pill,
  GraduationCap, Map, BookMarked, HelpCircle, FileQuestion,
  CreditCard
} from 'lucide-react'
import { allFlashcards } from '@/data/flashcards'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/use-translation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// ==================== BILINGUAL TOOLTIP ====================
/** Shows a tooltip with both English and Filipino translations on hover */
export function BilingualTooltip({ translationKey, children }: { translationKey: string; children: React.ReactNode }) {
  const { tBoth, language } = useTranslation()
  const both = tBoth(translationKey)

  // Don't show tooltip if both languages are the same
  if (both.en === both.fil) return <>{children}</>

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dashed border-muted-foreground/30">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          <div className="space-y-1">
            <p><span className="font-semibold text-primary">EN:</span> {both.en}</p>
            <p><span className="font-semibold text-ems-teal">FIL:</span> {both.fil}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ==================== BREADCRUMBS ====================
const sectionIcons: Record<Section, React.ReactNode> = {
  roadmap: <BookOpen className="w-3.5 h-3.5" />,
  study: <BookText className="w-3.5 h-3.5" />,
  visual: <Heart className="w-3.5 h-3.5" />,
  assessment: <ClipboardCheck className="w-3.5 h-3.5" />,
  settings: <Settings className="w-3.5 h-3.5" />,
}

const sectionLabels: Record<Section, string> = {
  roadmap: 'Learning Roadmap',
  study: 'Study & Review',
  visual: 'Visualization',
  assessment: 'Practice Assessment',
  settings: 'Settings',
}

const subLabels: Record<string, string> = {
  osh: 'OSH & Health',
  'life-on-the-line': 'Life on the Line',
  'first-aider': 'First Aider',
  'rules-law': 'Rules & Law',
  'action-plan': 'Action Plan',
  amats: 'AMATS',
  'assessment-procedure': 'Assessment & Procedure',
  'chain-of-survival': 'Chain of Survival',
  acronyms: 'Acronyms',
  definitions: 'Definition of Terms',
  drugs: 'Drug Reference',
  diagrams: 'Interactive SVG Diagrams',
  infographics: 'Infographic Gallery',
  quiz: 'Pre-Self Exam',
  simulation: 'Simulation',
  'pre-assessment': 'Pre-Assessment (Group)',
  flashcards: 'Flashcards',
  'daily-challenge': 'Daily Challenge',
  notes: 'Notes',
}

export function Breadcrumbs() {
  const { activeSection, activeSubSection } = useAppStore()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-hidden">
      <button
        onClick={() => useAppStore.getState().setActiveSection('roadmap')}
        className="flex items-center gap-1 hover:text-primary transition-colors flex-shrink-0"
      >
        <Home className="w-3 h-3" />
        <span className="hidden sm:inline">Home</span>
      </button>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="flex items-center gap-1 text-foreground font-medium truncate">
        {sectionIcons[activeSection]}
        {sectionLabels[activeSection]}
      </span>
      {activeSubSection && subLabels[activeSubSection] && (
        <>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="truncate text-muted-foreground">{subLabels[activeSubSection]}</span>
        </>
      )}
    </nav>
  )
}

// ==================== XP BAR ====================
export function XPBar({ compact = false }: { compact?: boolean }) {
  const { progress } = useAppStore()
  const xpInfo = getXpForNextLevel(progress.xp)

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Lv.{getLevelFromXp(progress.xp)}</span>
        </div>
        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden progress-bar-modern">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 progress-bar-success"
            style={{ width: `${xpInfo.progress * 100}%` }}
          />
        </div>
        <span className="text-caption">{xpInfo.current}/{xpInfo.needed}</span>
      </div>
    )
  }

  return (
    <Card className="border-amber-200 dark:border-amber-800/50 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 card-unified">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="stat-icon-wrap w-8 h-8 rounded-lg" style={{ background: 'rgba(245,158,11,1)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-card-title text-amber-700 dark:text-amber-300">Level {getLevelFromXp(progress.xp)}</p>
              <p className="text-caption text-amber-600/70 dark:text-amber-400/70">{progress.xp} Total XP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-stat-label text-amber-600 dark:text-amber-400">{xpInfo.current}/{xpInfo.needed} XP</p>
            <p className="text-caption text-amber-600/60 dark:text-amber-400/60">to Level {getLevelFromXp(progress.xp) + 1}</p>
          </div>
        </div>
        <Progress value={xpInfo.progress * 100} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-500 progress-bar-modern" />
      </CardContent>
    </Card>
  )
}

// ==================== STREAK INDICATOR ====================
export function StreakIndicator() {
  const { progress } = useAppStore()

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50">
      <Flame className={cn('w-4 h-4', progress.streak > 0 ? 'text-orange-500' : 'text-muted-foreground')} />
      <span className={cn('text-xs font-bold', progress.streak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground')}>
        {progress.streak} day{progress.streak !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

// ==================== BADGE DISPLAY ====================
export function BadgeDisplay() {
  const { progress } = useAppStore()
  const [showAll, setShowAll] = React.useState(false)

  const unlockedBadges = BADGE_DEFINITIONS.filter(b => progress.badges.includes(b.id))
  const lockedBadges = BADGE_DEFINITIONS.filter(b => !progress.badges.includes(b.id))

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Badges Earned
          </h3>
          <Badge variant="outline" className="text-[10px]">
            {unlockedBadges.length}/{BADGE_DEFINITIONS.length}
          </Badge>
        </div>

        {/* Unlocked badges grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="stat-card-modern card-stats flex flex-col items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40"
              title={`${badge.title}: ${badge.description}`}
            >
              <div className="stat-icon-wrap w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <span className="text-xl">{badge.icon}</span>
              </div>
              <span className="text-stat-label text-amber-700 dark:text-amber-300 leading-tight mt-1">{badge.title}</span>
            </div>
          ))}

          {/* Show locked badges */}
          {showAll && lockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center p-2 rounded-lg bg-muted/30 border border-border opacity-50"
              title={`Locked: ${badge.description}`}
            >
              <span className="text-2xl mb-1 grayscale">🔒</span>
              <span className="text-[10px] font-medium text-center text-muted-foreground leading-tight">{badge.title}</span>
            </div>
          ))}
        </div>

        {!showAll && lockedBadges.length > 0 && (
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs" onClick={() => setShowAll(true)}>
            Show All ({lockedBadges.length} locked)
          </Button>
        )}
        {showAll && (
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs" onClick={() => setShowAll(false)}>
            Show Earned Only
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== READ TIME TRACKER ====================
export function ReadTimeTracker({ topicId, estimatedMinutes }: { topicId: string; estimatedMinutes: number }) {
  const { progress } = useAppStore()
  const timeSpent = progress.timeSpent[topicId] || 0
  const minutesSpent = Math.round(timeSpent / 60)
  const isCompleted = progress.readTopics.includes(topicId)

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>~{estimatedMinutes} min read</span>
      </div>
      {minutesSpent > 0 && (
        <div className="flex items-center gap-1">
          <TimerIcon className="w-3 h-3" />
          <span>{minutesSpent} min spent</span>
        </div>
      )}
      {isCompleted && (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle2 className="w-3 h-3" />
          <span>Completed</span>
        </div>
      )}
    </div>
  )
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TimerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3L2 6" /><path d="M22 6l-3-3" /><path d="M12 2v3" />
    </svg>
  )
}

// ==================== GLOBAL SEARCH ====================
export function GlobalSearch() {
  const { searchOpen, setSearchOpen, setActiveSection, setActiveSubSection } = useAppStore()
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const searchResults = React.useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const results: { section: Section; sub: string; label: string; type: string; icon?: React.ReactNode }[] = []

    // Search sections
    const sectionMap: Section[] = ['roadmap', 'study', 'visual', 'assessment', 'settings']
    sectionMap.forEach(s => {
      if (sectionLabels[s].toLowerCase().includes(q)) {
        results.push({ section: s, sub: '', label: sectionLabels[s], type: 'Section' })
      }
    })

    // Search flashcards
    allFlashcards.forEach(fc => {
      if (
        fc.front.toLowerCase().includes(q) ||
        fc.back.toLowerCase().includes(q)
      ) {
        results.push({
          section: 'study' as Section,
          sub: 'flashcards',
          label: fc.front,
          type: 'Flashcard',
        })
      }
    })

    // Search sub-sections
    Object.entries(subLabels).forEach(([id, label]) => {
      if (label.toLowerCase().includes(q)) {
        let section: Section = 'roadmap'
        if (['acronyms', 'definitions', 'drugs', 'flashcards', 'notes'].includes(id)) section = 'study'
        else if (['diagrams', 'infographics'].includes(id)) section = 'visual'
        else if (['quiz', 'simulation', 'pre-assessment', 'daily-challenge'].includes(id)) section = 'assessment'
        results.push({ section, sub: id, label, type: 'Page' })
      }
    })

    // Search acronyms
    acronyms.forEach(a => {
      if (
        a.acronym.toLowerCase().includes(q) ||
        a.fullTerm.toLowerCase().includes(q) ||
        a.definition.toLowerCase().includes(q)
      ) {
        results.push({
          section: 'study' as Section,
          sub: 'acronyms',
          label: `${a.acronym} — ${a.fullTerm}`,
          type: 'Acronym',
        })
      }
    })

    // Search drugs
    drugs.forEach(d => {
      if (
        d.genericName.toLowerCase().includes(q) ||
        d.brandNames.some(b => b.toLowerCase().includes(q)) ||
        d.indications.some(i => i.toLowerCase().includes(q))
      ) {
        results.push({
          section: 'study' as Section,
          sub: 'drugs',
          label: `${d.genericName} (${d.drugClass})`,
          type: 'Drug',
        })
      }
    })

    // Search questions
    questions.forEach(qItem => {
      if (
        qItem.question.toLowerCase().includes(q) ||
        qItem.options.some(o => o.toLowerCase().includes(q))
      ) {
        results.push({
          section: 'assessment' as Section,
          sub: 'quiz',
          label: qItem.question.length > 80 ? qItem.question.substring(0, 80) + '…' : qItem.question,
          type: 'Question',
        })
      }
    })

    // Search roadmap topics
    roadmapTopics.forEach(topic => {
      if (
        topic.title.toLowerCase().includes(q) ||
        topic.shortDescription.toLowerCase().includes(q)
      ) {
        results.push({
          section: 'roadmap' as Section,
          sub: topic.id,
          label: topic.title,
          type: 'Topic',
        })
      }
    })

    return results.slice(0, 12)
  }, [query])

  React.useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    if (!searchOpen) setQuery('')
  }, [searchOpen])

  // Keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [searchOpen, setSearchOpen])

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="sm:max-w-md p-0 gap-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Global Search</DialogTitle>
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="flex-1 py-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-mono">
            ESC
          </kbd>
        </div>
        {query.trim() && (
          <div className="max-h-[50vh] sm:max-h-72 overflow-y-auto custom-scrollbar p-2">
            {searchResults.length > 0 ? (
              searchResults.map((result, i) => (
                <button
                  key={`${result.type}-${i}`}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    setActiveSection(result.section)
                    if (result.sub) setActiveSubSection(result.sub)
                    setSearchOpen(false)
                  }}
                >
                  <div className="w-7 h-7 rounded-md bg-muted/60 flex items-center justify-center flex-shrink-0">
                    {result.icon || <Search className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{result.label}</p>
                    <p className="text-[10px] text-muted-foreground">{result.type} · {sectionLabels[result.section]}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs mt-1">Try searching for acronyms, drugs, or topics</p>
              </div>
            )}
          </div>
        )}
        {!query.trim() && (
          <div className="max-h-[50vh] sm:max-h-72 overflow-y-auto custom-scrollbar">
            <div className="p-4 text-center text-sm text-muted-foreground pb-2">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Start typing to search</p>
              <p className="text-xs mt-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Ctrl+K</kbd> to open search
              </p>
            </div>
            <div className="border-t border-border px-2 pb-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-3 pb-2">Quick Links</p>
              <div className="space-y-0.5">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => { setActiveSection('assessment'); setActiveSubSection('quiz'); setSearchOpen(false) }}
                >
                  <div className="w-7 h-7 rounded-md bg-ems-amber/10 flex items-center justify-center flex-shrink-0">
                    <Shuffle className="w-3.5 h-3.5 text-ems-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Random Quiz</p>
                    <p className="text-[10px] text-muted-foreground">Practice exam questions</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => { setActiveSection('study'); setActiveSubSection('acronyms'); setSearchOpen(false) }}
                >
                  <div className="w-7 h-7 rounded-md bg-ems-teal/10 flex items-center justify-center flex-shrink-0">
                    <BookMarked className="w-3.5 h-3.5 text-ems-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Acronyms</p>
                    <p className="text-[10px] text-muted-foreground">{acronyms.length} EMS abbreviations</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => { setActiveSection('study'); setActiveSubSection('drugs'); setSearchOpen(false) }}
                >
                  <div className="w-7 h-7 rounded-md bg-ems-red/10 flex items-center justify-center flex-shrink-0">
                    <Pill className="w-3.5 h-3.5 text-ems-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Drug Reference</p>
                    <p className="text-[10px] text-muted-foreground">{drugs.length} medications &amp; protocols</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => { setActiveSection('roadmap'); setSearchOpen(false) }}
                >
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Map className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Learning Roadmap</p>
                    <p className="text-[10px] text-muted-foreground">{roadmapTopics.length} study topics</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => { setActiveSection('visual'); setSearchOpen(false) }}
                >
                  <div className="w-7 h-7 rounded-md bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Interactive Diagrams</p>
                    <p className="text-[10px] text-muted-foreground">Anatomy, heart, airway, pulse, brain</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ==================== ONBOARDING ====================
export function OnboardingWalkthrough() {
  const { progress, setOnboarded } = useAppStore()
  const [step, setStep] = React.useState(0)
  const { t } = useTranslation()

  if (progress.onboarded) return null

  const steps = [
    {
      title: t('onboarding.welcome'),
      description: t('onboarding.welcomeDesc'),
      icon: <Sparkles className="w-12 h-12 text-ems-teal" />,
    },
    {
      title: t('onboarding.trackProgress'),
      description: t('onboarding.trackDesc'),
      icon: <Zap className="w-12 h-12 text-amber-500" />,
    },
    {
      title: t('onboarding.learnYourWay'),
      description: t('onboarding.learnDesc'),
      icon: <Target className="w-12 h-12 text-primary" />,
    },
    {
      title: t('onboarding.ready'),
      description: t('onboarding.readyDesc'),
      icon: <Trophy className="w-12 h-12 text-ems-red" />,
    },
  ]

  const current = steps[step]

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <Card className="w-full max-w-md content-transition">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">{current.icon}</div>
          <h2 className="text-xl font-bold mb-2">{current.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{current.description}</p>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <button
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === step ? 'bg-primary w-6' : i < step ? 'bg-ems-teal' : 'bg-muted-foreground/30'
                )}
                onClick={() => setStep(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                {t('common.back')}
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)} className="flex-1 bg-ems-teal hover:bg-ems-teal/90">
                {t('onboarding.next')}
              </Button>
            ) : (
              <Button onClick={() => setOnboarded()} className="flex-1 bg-ems-teal hover:bg-ems-teal/90">
                {t('onboarding.getStarted')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== MODULE QUIZ (KNOWLEDGE CHECK) ====================
export function ModuleQuiz({ topicId, topicTitle }: { topicId: string; topicTitle: string }) {
  const { progress, addModuleQuizScore } = useAppStore()
  const [started, setStarted] = React.useState(false)
  const [currentQ, setCurrentQ] = React.useState(0)
  const [selected, setSelected] = React.useState<number | null>(null)
  const [showResult, setShowResult] = React.useState(false)
  const [correct, setCorrect] = React.useState(0)
  const [finished, setFinished] = React.useState(false)
  const { t } = useTranslation()

  // Quick 3-question knowledge check based on topic
  const questions = React.useMemo(() => {
    const qBank: Record<string, { q: string; options: string[]; answer: number; explanation: string }[]> = {
      'osh': [
        { q: 'What is the first action you should take at every EMS scene before patient contact?', options: ['Check breathing', 'Body Substance Isolation (BSI)', 'Call for help', 'Check pulse'], answer: 1, explanation: 'BSI is always your first action at every scene to protect yourself from bloodborne and airborne pathogens.' },
        { q: 'Which Philippine law strengthens compliance with OSH standards?', options: ['RA 10871', 'RA 11058', 'RA 10971', 'RA 5181'], answer: 1, explanation: 'RA 11058, also known as the OSH Law, strengthens compliance with OSH standards and imposes penalties on non-compliant employers.' },
        { q: 'What type of respirator should be used when TB is suspected?', options: ['Surgical mask', 'N95 respirator', 'Cloth mask', 'Half-face respirator'], answer: 1, explanation: 'N95 respirators are required when airborne pathogens like tuberculosis are suspected.' },
      ],
      'first-aider': [
        { q: 'What is the correct order of the primary survey?', options: ['ABCDE', 'SAMPLE', 'DCAP-BTLS', 'OPQRST'], answer: 0, explanation: 'The primary survey follows ABCDE: Airway, Breathing, Circulation, Disability, Exposure.' },
        { q: 'For life-threatening extremity bleeding, when should a tourniquet be applied?', options: ['As a last resort only', 'After direct pressure fails', 'Immediately for life-threatening bleeding', 'Never apply a tourniquet'], answer: 2, explanation: 'Current guidelines state tourniquets should be applied immediately for life-threatening extremity bleeding — they are not a last resort.' },
        { q: 'How long should you cool a burn with running water?', options: ['5 minutes', '10-20 minutes', '30 minutes', '1 hour'], answer: 1, explanation: 'Burns should be cooled with clean running water for at least 10-20 minutes. Never use ice.' },
      ],
      'chain-of-survival': [
        { q: 'How many links are in the AHA 2025 Chain of Survival?', options: ['4', '5', '6', '7'], answer: 2, explanation: 'The AHA 2025 Chain of Survival has 6 links, with Recovery added as the 6th link.' },
        { q: 'Survival decreases by approximately what percentage per minute without defibrillation?', options: ['3-5%', '7-10%', '12-15%', '20%'], answer: 1, explanation: 'Survival decreases by approximately 7-10% for every minute defibrillation is delayed.' },
        { q: 'What is the recommended TTM (Targeted Temperature Management) range per AHA 2025?', options: ['32-34°C', '32-36°C', '32-37.5°C', '35-37°C'], answer: 2, explanation: 'AHA 2025 recommends TTM range of 32-37.5°C, providing flexibility based on patient factors.' },
      ],
    }

    // Default fallback questions for topics without specific quiz
    const defaultQs = [
      { q: `This is a knowledge check for "${topicTitle}". Have you read and understood the material?`, options: ['Yes, I understand it well', 'Partially, I need to review', 'Not yet, I will re-read', 'I skipped it'], answer: 0, explanation: 'Regular review of study materials is essential for retention and competency.' },
    ]

    return qBank[topicId] || defaultQs
  }, [topicId, topicTitle])

  const existingScore = progress.moduleQuizScores[topicId]

  if (!started) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t('quiz.knowledgeCheck')}</h4>
              <p className="text-xs text-muted-foreground">{questions.length} {t('quiz.quickQuestions')}</p>
            </div>
          </div>
          {existingScore && (
            <p className="text-xs text-muted-foreground mb-2">
              Previous score: {existingScore.score}/{existingScore.total} — retake to improve!
            </p>
          )}
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => {
              setStarted(true)
              setCurrentQ(0)
              setSelected(null)
              setShowResult(false)
              setCorrect(0)
              setFinished(false)
            }}
          >
            <Sparkles className="w-4 h-4 mr-1" /> {t('quiz.takeQuiz')} (+15 XP)
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (finished) {
    const total = questions.length
    const pct = Math.round((correct / total) * 100)
    return (
      <Card className={cn('border-2', pct >= 70 ? 'border-green-300 dark:border-green-700' : 'border-amber-300 dark:border-amber-700')}>
        <CardContent className="p-4 text-center">
          <div className="text-3xl mb-2">{pct >= 70 ? '🎉' : '💪'}</div>
          <h4 className="font-bold text-sm mb-1">
            {pct >= 70 ? t('quiz.greatJob') : t('quiz.keepStudying')}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {correct}/{total} correct ({pct}%)
          </p>
          <Badge className={pct >= 70 ? 'bg-green-500' : 'bg-amber-500'}>
            +{XP_PER_ACTION.MODULE_QUIZ} XP earned
          </Badge>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setStarted(false)}>
              {t('quiz.done')}
            </Button>
            <Button size="sm" className="flex-1" onClick={() => {
              setCurrentQ(0)
              setSelected(null)
              setShowResult(false)
              setCorrect(0)
              setFinished(false)
            }}>
              {t('quiz.retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const q = questions[currentQ]
  return (
    <Card className="border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-[10px]">Q{currentQ + 1}/{questions.length}</Badge>
          <span className="text-xs text-muted-foreground">+15 XP</span>
        </div>
        <p className="text-sm font-medium mb-3">{q.q}</p>
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx
            const isCorrect = idx === q.answer
            return (
              <button
                key={idx}
                className={cn(
                  'w-full text-left p-2.5 rounded-lg border-2 text-sm transition-all',
                  showResult && isCorrect && 'border-green-500 bg-green-50 dark:bg-green-950/30',
                  showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 dark:bg-red-950/30',
                  !showResult && isSelected && 'border-primary bg-primary/5',
                  !showResult && !isSelected && 'border-border hover:border-primary/50'
                )}
                onClick={() => {
                  if (showResult) return
                  setSelected(idx)
                }}
                disabled={showResult}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {!showResult && selected !== null && (
          <Button size="sm" className="w-full mt-3" onClick={() => {
            setShowResult(true)
            if (selected === q.answer) setCorrect(c => c + 1)
          }}>
            Check Answer
          </Button>
        )}
        {showResult && (
          <div className="mt-3 space-y-2 content-transition">
            <p className="text-xs text-muted-foreground p-2 rounded bg-muted/50">{q.explanation}</p>
            <Button size="sm" className="w-full" onClick={() => {
              if (currentQ < questions.length - 1) {
                setCurrentQ(c => c + 1)
                setSelected(null)
                setShowResult(false)
              } else {
                const finalCorrect = correct + (selected === q.answer ? 1 : 0)
                addModuleQuizScore(topicId, finalCorrect, questions.length)
                setFinished(true)
              }
            }}>
              {currentQ < questions.length - 1 ? t('common.next') : t('quiz.seeResults')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ==================== DIAGNOSTIC ASSESSMENT ====================
export function DiagnosticAssessment() {
  const { progress, setDiagnosticScores, setActiveSection, setActiveSubSection } = useAppStore()
  const [started, setStarted] = React.useState(false)
  const [currentCat, setCurrentCat] = React.useState(0)
  const [scores, setScores] = React.useState<Record<string, number>>({})
  const { t } = useTranslation()

  if (progress.diagnosticCompleted) {
    return (
      <Card className="border-ems-teal/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-ems-teal" />
            <h3 className="font-semibold text-sm">{t('diagnostic.results')}</h3>
          </div>
          <div className="space-y-2 mb-3">
            {Object.entries(progress.diagnosticScores).map(([cat, pct]) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="text-xs w-24 sm:w-28 truncate">{cat}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-8">{pct}%</span>
              </div>
            ))}
          </div>
          {progress.suggestedPath.length > 0 && (
            <Button size="sm" variant="outline" className="w-full" onClick={() => {
              setActiveSection('roadmap')
              setActiveSubSection(progress.suggestedPath[0])
            }}>
              {t('diagnostic.startPath')}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  const categories = ['OSH', 'First Aid', 'BLS/CPR', 'Patient Assessment', 'Legal/Ethical']
  const selfAssessLevels = [
    { label: t('diagnostic.notFamiliar'), value: 20 },
    { label: t('diagnostic.basicKnowledge'), value: 40 },
    { label: t('diagnostic.moderateUnderstanding'), value: 60 },
    { label: t('diagnostic.goodUnderstanding'), value: 80 },
    { label: t('diagnostic.veryConfident'), value: 95 },
  ]

  if (!started) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-ems-teal/5 overflow-hidden">
        <CardContent className="p-5 text-center">
          <Target className="w-10 h-10 mx-auto text-primary mb-3" />
          <h3 className="font-bold text-base mb-2 break-words">{t('diagnostic.title')}</h3>
          <p className="text-sm text-muted-foreground mb-4 break-words">
            {t('diagnostic.desc')}
          </p>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setStarted(true)}>
            {t('diagnostic.startAssessment')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const cat = categories[currentCat]

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-[10px]">Question {currentCat + 1} of {categories.length}</Badge>
          <Progress value={((currentCat) / categories.length) * 100} className="w-24 h-1.5" />
        </div>
        <h3 className="font-semibold text-sm mb-4 break-words">{t('diagnostic.confidence')} <span className="text-primary">{cat}</span>?</h3>
        <div className="space-y-2">
          {selfAssessLevels.map((level) => (
            <button
              key={level.value}
              className={cn(
                'w-full text-left p-3 rounded-lg border-2 text-sm transition-all',
                scores[cat] === level.value
                  ? 'border-primary bg-primary/5 font-medium'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setScores({ ...scores, [cat]: level.value })}
            >
              {level.label}
            </button>
          ))}
        </div>
        <Button
          className="w-full mt-4 bg-primary hover:bg-primary/90"
          disabled={scores[cat] === undefined}
          onClick={() => {
            if (currentCat < categories.length - 1) {
              setCurrentCat(c => c + 1)
            } else {
              setDiagnosticScores(scores)
              setStarted(false)
            }
          }}
        >
          {currentCat < categories.length - 1 ? t('common.next') : t('diagnostic.seeMyPath')}
        </Button>
      </CardContent>
    </Card>
  )
}

// ==================== GOALS TRACKER ====================
export function GoalsTracker() {
  const { progress, addGoal, toggleGoal, removeGoal } = useAppStore()
  const [newGoal, setNewGoal] = React.useState('')
  const [showInput, setShowInput] = React.useState(false)
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            {t('settings.learningGoals')}
          </h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowInput(!showInput)}>
            + Add Goal
          </Button>
        </div>

        {showInput && (
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="Enter a learning goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newGoal.trim()) {
                  addGoal(newGoal.trim(), new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0])
                  setNewGoal('')
                  setShowInput(false)
                }
              }}
            />
            <Button size="sm" onClick={() => {
              if (newGoal.trim()) {
                addGoal(newGoal.trim(), new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0])
                setNewGoal('')
                setShowInput(false)
              }
            }}>
              Add
            </Button>
          </div>
        )}

        {progress.goals.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Set your first learning goal to stay on track!
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {progress.goals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                <button onClick={() => toggleGoal(goal.id)} className="flex-shrink-0 p-2 -m-2">
                  {goal.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                  )}
                </button>
                <span className={cn('text-sm flex-1', goal.completed && 'line-through text-muted-foreground')}>
                  {goal.text}
                </span>
                <button onClick={() => removeGoal(goal.id)} className="p-2 hover:bg-muted rounded">
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
