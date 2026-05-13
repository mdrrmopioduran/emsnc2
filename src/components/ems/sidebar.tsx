'use client'

import React from 'react'
import { useAppStore, type Section, getLevelFromXp, getXpForNextLevel, BADGE_DEFINITIONS } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'

import Image from 'next/image'
import {
  BookOpen, BookText, Heart, ClipboardCheck, Settings,
  ChevronDown, ChevronRight, X, Zap, Flame,
  CheckCircle2, HardHat, Activity, Stethoscope, Scale,
  Siren, Users, FileSearch, Link2, LetterText,
  Pill, ScanEye, Brain, Monitor, FlaskConical,
  Trophy, Wrench, MessageSquare, Sparkles, CreditCard,
  CalendarDays, StickyNote
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ConnectionStatusBadge } from '@/components/ems/pwa-components'

interface NavItem {
  id: Section
  icon: React.ReactNode
  labelKey: string
  subItems: { id: string; labelKey: string; miniIcon: React.ReactNode }[]
}

const navItems: NavItem[] = [
  {
    id: 'roadmap',
    icon: <BookOpen className="w-5 h-5" />,
    labelKey: 'nav.roadmap',
    subItems: [
      { id: 'osh', labelKey: 'sub.osh', miniIcon: <HardHat className="w-3 h-3" /> },
      { id: 'life-on-the-line', labelKey: 'sub.life-on-the-line', miniIcon: <Activity className="w-3 h-3" /> },
      { id: 'first-aider', labelKey: 'sub.first-aider', miniIcon: <Stethoscope className="w-3 h-3" /> },
      { id: 'rules-law', labelKey: 'sub.rules-law', miniIcon: <Scale className="w-3 h-3" /> },
      { id: 'action-plan', labelKey: 'sub.action-plan', miniIcon: <Siren className="w-3 h-3" /> },
      { id: 'amats', labelKey: 'sub.amats', miniIcon: <Users className="w-3 h-3" /> },
      { id: 'assessment-procedure', labelKey: 'sub.assessment-procedure', miniIcon: <FileSearch className="w-3 h-3" /> },
      { id: 'chain-of-survival', labelKey: 'sub.chain-of-survival', miniIcon: <Link2 className="w-3 h-3" /> },
    ],
  },
  {
    id: 'study',
    icon: <BookText className="w-5 h-5" />,
    labelKey: 'nav.study',
    subItems: [
      { id: 'competencies', labelKey: 'sub.competencies', miniIcon: <Trophy className="w-3 h-3" /> },
      { id: 'acronyms', labelKey: 'sub.acronyms', miniIcon: <LetterText className="w-3 h-3" /> },
      { id: 'definitions', labelKey: 'sub.definitions', miniIcon: <ScanEye className="w-3 h-3" /> },
      { id: 'drugs', labelKey: 'sub.drugs', miniIcon: <Pill className="w-3 h-3" /> },
      { id: 'flashcards', labelKey: 'sub.flashcards', miniIcon: <CreditCard className="w-3 h-3" /> },
      { id: 'notes', labelKey: 'sub.notes', miniIcon: <StickyNote className="w-3 h-3" /> },
      { id: 'ai-assistant', labelKey: 'sub.ai-assistant', miniIcon: <Sparkles className="w-3 h-3" /> },
    ],
  },
  {
    id: 'visual',
    icon: <Heart className="w-5 h-5" />,
    labelKey: 'nav.visual',
    subItems: [
      { id: 'diagrams', labelKey: 'sub.diagrams', miniIcon: <Monitor className="w-3 h-3" /> },
      { id: 'equipment', labelKey: 'sub.equipment', miniIcon: <Wrench className="w-3 h-3" /> },
      { id: 'infographics', labelKey: 'sub.infographics', miniIcon: <Brain className="w-3 h-3" /> },
    ],
  },
  {
    id: 'assessment',
    icon: <ClipboardCheck className="w-5 h-5" />,
    labelKey: 'nav.assessment',
    subItems: [
      { id: 'quiz', labelKey: 'sub.quiz', miniIcon: <FlaskConical className="w-3 h-3" /> },
      { id: 'daily-challenge', labelKey: 'sub.daily-challenge', miniIcon: <CalendarDays className="w-3 h-3" /> },
      { id: 'simulation', labelKey: 'sub.simulation', miniIcon: <Activity className="w-3 h-3" /> },
      { id: 'pre-assessment', labelKey: 'sub.pre-assessment', miniIcon: <ClipboardCheck className="w-3 h-3" /> },
      { id: 'roleplay', labelKey: 'sub.roleplay', miniIcon: <MessageSquare className="w-3 h-3" /> },
    ],
  },
  {
    id: 'settings',
    icon: <Settings className="w-5 h-5" />,
    labelKey: 'nav.settings',
    subItems: [],
  },
]

/** Calculate individual sub-item progress (0–100) */
function getSubItemProgress(
  sectionId: Section,
  subId: string,
  progress: ReturnType<typeof useAppStore.getState>['progress']
): number {
  if (sectionId === 'roadmap') {
    if (progress.readTopics.includes(subId)) return 100
    const mp = progress.moduleProgress[subId]
    if (mp && mp.totalSections > 0) {
      return Math.round((mp.sectionsCompleted.length / mp.totalSections) * 100)
    }
    return 0
  }
  if (sectionId === 'assessment') {
    if (subId === 'quiz') return progress.quizScores.length > 0 ? 100 : 0
    if (subId === 'simulation') return progress.completedSimulations.length > 0 ? 100 : 0
    if (subId === 'pre-assessment') {
      const checklists = Object.values(progress.completedChecklists)
      return checklists.some(c => c && c.length > 0 && c.every(Boolean)) ? 100 : 0
    }
    if (subId === 'roleplay') return progress.completedSimulations.length > 0 ? 100 : 0
  }
  return 0
}

/** Calculate overall section progress (0–100) */
function getSectionProgress(
  sectionId: Section,
  subItems: NavItem['subItems'],
  progress: ReturnType<typeof useAppStore.getState>['progress']
): number {
  if (subItems.length === 0) return 0
  const total = subItems.reduce((sum, sub) => sum + getSubItemProgress(sectionId, sub.id, progress), 0)
  return Math.round(total / subItems.length)
}

export function Sidebar() {
  const { activeSection, activeSubSection, sidebarOpen, setActiveSection, setActiveSubSection, setSidebarOpen, progress } =
    useAppStore()
  const { t } = useTranslation()
  const [expandedItems, setExpandedItems] = React.useState<Set<Section>>(new Set(['roadmap']))

  const toggleExpanded = (id: Section) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSectionClick = (item: NavItem) => {
    if (item.subItems.length > 0) {
      toggleExpanded(item.id)
      if (activeSection !== item.id) {
        setActiveSection(item.id)
        setActiveSubSection(item.subItems[0].id)
      }
    } else {
      setActiveSection(item.id)
      setActiveSubSection('')
    }
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleSubClick = (section: Section, subId: string) => {
    setActiveSection(section)
    setActiveSubSection(subId)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const xpInfo = getXpForNextLevel(progress.xp)
  const badgeCount = progress.badges.length
  const totalBadges = BADGE_DEFINITIONS.length

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[270px] flex flex-col sidebar-transition',
          'bg-sidebar text-sidebar-foreground sidebar-gradient-overlay',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:z-30'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg shadow-ems-teal/20 bg-white">
            <Image
              src="/pio-duran-ems-logo.png"
              alt="PIO DURAN EMS NCII Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white truncate leading-tight">PIO DURAN EMS NCII</h2>
            <span className="text-[10px] font-semibold text-ems-teal">
              EMS Reviewer
            </span>
          </div>
          {/* Badge count pill */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20" title={`${badgeCount} of ${totalBadges} badges earned`}>
            <Trophy className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-300">{badgeCount}/{totalBadges}</span>
          </div>
          <button
            className="md:hidden p-1 rounded hover:bg-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── XP Summary Bar ── */}
        <div className="px-4 py-2.5 border-b border-sidebar-border/50 bg-sidebar-accent/30">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold text-amber-300">Level {getLevelFromXp(progress.xp)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className={cn('w-3.5 h-3.5', progress.streak > 0 ? 'text-orange-400' : 'text-sidebar-foreground/30')} />
              <span className={cn('text-[11px] font-bold', progress.streak > 0 ? 'text-orange-300' : 'text-sidebar-foreground/30')}>
                {progress.streak}d
              </span>
            </div>
            <span className="text-[10px] text-sidebar-foreground/50">
              {progress.xp} XP
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-sidebar-border/50 overflow-hidden progress-bar-animated xp-shimmer-bar">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700"
              style={{ width: `${xpInfo.progress * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-sidebar-foreground/40">{xpInfo.current}/{xpInfo.needed} {t('other.toNext')}</span>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-2 px-3">
          <ul className="space-y-0.5" role="list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              const isExpanded = expandedItems.has(item.id)
              const sectionPct = getSectionProgress(item.id, item.subItems, progress)

              return (
                <li key={item.id}>
                  {/* Section header button */}
                  <button
                    onClick={() => handleSectionClick(item)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:translate-x-[2px]',
                      isActive
                        ? 'bg-sidebar-accent text-white sidebar-item-active sidebar-active-glow'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white'
                    )}
                    aria-expanded={isExpanded}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={cn(
                      'transition-colors duration-200',
                      isActive ? 'text-ems-teal' : 'text-sidebar-foreground/50'
                    )}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left font-bold text-amber-400">{t(item.labelKey)}</span>
                    {sectionPct > 0 && (
                      <span className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[32px] text-center',
                        sectionPct === 100
                          ? 'bg-ems-teal/30 text-ems-teal'
                          : sectionPct >= 50
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-sidebar-accent text-sidebar-foreground/50'
                      )}>
                        {sectionPct}%
                      </span>
                    )}
                    {item.subItems.length > 0 && (
                      <span className="text-sidebar-foreground/40 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>

                  {/* Mini progress bar under section header */}
                  {item.subItems.length > 0 && sectionPct > 0 && (
                    <div className="mx-3 mt-0.5 mb-1 h-[2px] rounded-full bg-sidebar-border/40 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-700',
                          sectionPct === 100
                            ? 'bg-ems-teal'
                            : sectionPct >= 50
                              ? 'bg-amber-400'
                              : 'bg-sidebar-foreground/30'
                        )}
                        style={{ width: `${sectionPct}%` }}
                      />
                    </div>
                  )}

                  {/* Sub-items with smooth collapse */}
                  {item.subItems.length > 0 && (
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? `${item.subItems.length * 44}px` : '0px',
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      <ul className="mt-0.5 ml-5 space-y-px min-w-0" role="list">
                        {item.subItems.map((sub) => {
                          const isSubActive = activeSection === item.id && activeSubSection === sub.id
                          const isCompleted = getSubItemProgress(item.id, sub.id, progress) === 100
                          const subPct = getSubItemProgress(item.id, sub.id, progress)

                          return (
                            <li key={sub.id} className="min-w-0">
                              <button
                                onClick={() => handleSubClick(item.id, sub.id)}
                                className={cn(
                                  'w-full text-left px-3 py-2.5 rounded-md text-[11px] transition-all duration-200 flex items-center gap-2 group min-w-0',
                                  isSubActive
                                    ? 'bg-ems-teal/20 text-ems-teal font-semibold sidebar-item-active'
                                    : 'text-sidebar-foreground/45 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground/80'
                                )}
                              >
                                {/* Status indicator */}
                                {isCompleted ? (
                                  <CheckCircle2 className="w-3 h-3 text-ems-teal flex-shrink-0" />
                                ) : (
                                  <span className={cn(
                                    'flex-shrink-0 transition-colors duration-200',
                                    isSubActive ? 'text-ems-teal' : 'text-sidebar-foreground/30 group-hover:text-sidebar-foreground/50'
                                  )}>
                                    {sub.miniIcon}
                                  </span>
                                )}

                                <span className="truncate flex-1">{t(sub.labelKey)}</span>

                                {/* Per-item progress badge or thin bar */}
                                {!isCompleted && subPct > 0 && item.id === 'roadmap' && (
                                  <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-ems-teal/15 text-ems-teal/80 flex-shrink-0">
                                    {subPct}%
                                  </span>
                                )}
                              </button>

                              {/* Thin progress bar under each roadmap sub-item when partially done */}
                              {!isCompleted && subPct > 0 && subPct < 100 && item.id === 'roadmap' && (
                                <div className="mx-2.5 mt-px mb-1 h-[1.5px] rounded-full bg-sidebar-border/30 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-ems-teal/50 transition-all duration-700"
                                    style={{ width: `${subPct}%` }}
                                  />
                                </div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Footer ── */}
        <div className="px-3 py-2.5 border-t border-sidebar-border space-y-2 relative">
          {/* Decorative heartbeat line */}
          <div className="sidebar-heartbeat-line absolute inset-x-0 top-0 h-[1px] opacity-15 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 270 1">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                points="0,0.5 40,0.5 60,0.5 80,0.1 90,0.9 100,0.2 110,0.5 120,0.5 160,0.5 180,0.5 200,0.1 210,0.9 220,0.2 230,0.5 240,0.5 270,0.5"
              />
            </svg>
          </div>
          <ConnectionStatusBadge />
          <div className="flex items-center justify-center gap-2">
            <p className="text-[10px] text-sidebar-foreground/40 text-center">{t('footer.text')}</p>
            {/* Secret admin button */}
            <button
              onClick={() => {
                setActiveSection('admin' as Section)
                if (window.innerWidth < 768) setSidebarOpen(false)
              }}
              className="text-[8px] text-sidebar-foreground/15 hover:text-sidebar-foreground/40 transition-colors cursor-default select-none"
              aria-hidden="true"
              tabIndex={-1}
              title=""
            >
              ©
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
