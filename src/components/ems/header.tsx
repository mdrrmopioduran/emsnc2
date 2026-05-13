'use client'

import React from 'react'
import { useAppStore, type Section, getLevelFromXp } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
// BilingualTooltip removed per user request
import Image from 'next/image'
import { Menu, Search, Zap, Flame, Play, ChevronRight, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

// Translation key maps for section/sub titles
const sectionTitleKeys: Record<Section, string> = {
  roadmap: 'nav.roadmap',
  study: 'nav.study',
  visual: 'nav.visual',
  assessment: 'nav.assessment',
  settings: 'nav.settings',
}

const subTitleKeys: Record<string, string> = {
  osh: 'sub.osh',
  'life-on-the-line': 'sub.life-on-the-line',
  'first-aider': 'sub.first-aider',
  'rules-law': 'sub.rules-law',
  'action-plan': 'sub.action-plan',
  amats: 'sub.amats',
  'assessment-procedure': 'sub.assessment-procedure',
  'chain-of-survival': 'sub.chain-of-survival',
  competencies: 'sub.competencies',
  acronyms: 'sub.acronyms',
  definitions: 'sub.definitions',
  drugs: 'sub.drugs',
  'ai-assistant': 'sub.ai-assistant',
  diagrams: 'sub.diagrams',
  equipment: 'sub.equipment',
  infographics: 'sub.infographics',
  quiz: 'sub.quiz',
  simulation: 'sub.simulation',
  'pre-assessment': 'sub.pre-assessment',
  roleplay: 'sub.roleplay',
}

export function Header() {
  const {
    activeSection,
    activeSubSection,
    toggleSidebar,
    progress,
    setSearchOpen,
    setActiveSection,
    setActiveSubSection,
    setSidebarOpen,
    setLastViewedTopic,
    settings,
    updateSettings,
  } = useAppStore()

  const { t, tBoth, language } = useTranslation()

  // Get translated title
  const title = activeSubSection
    ? (subTitleKeys[activeSubSection] ? t(subTitleKeys[activeSubSection]) : activeSubSection)
    : t(sectionTitleKeys[activeSection])

  const lastViewedTopic = progress.lastViewedTopic
  const lastViewedTitle = lastViewedTopic && subTitleKeys[lastViewedTopic]
    ? t(subTitleKeys[lastViewedTopic])
    : (lastViewedTopic || '')

  const handleResume = () => {
    if (!lastViewedTopic) return
    setActiveSection('roadmap')
    setActiveSubSection(lastViewedTopic)
    setSidebarOpen(false)
    setLastViewedTopic(lastViewedTopic)
  }

  const toggleLanguage = () => {
    updateSettings({ language: language === 'en' ? 'fil' : 'en' })
  }

  return (
    <div className="flex-shrink-0 z-20 no-print" role="banner">
      <header className="flex items-center gap-2 md:gap-3 px-3 md:px-6 h-14 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center bg-white">
            <Image
              src="/pio-duran-ems-logo.png"
              alt="PIO DURAN EMS NCII Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title & breadcrumbs */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm md:text-base font-semibold text-foreground truncate">
            {title}
          </h1>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[11px] text-muted-foreground overflow-hidden">
            <span className="hidden sm:inline">PIO DURAN EMS NCII</span>
            <span className="hidden sm:inline">›</span>
            <span className="text-foreground font-medium truncate">{t(sectionTitleKeys[activeSection])}</span>
            {activeSubSection && subTitleKeys[activeSubSection] && (
              <>
                <span>›</span>
                <span className="truncate">{t(subTitleKeys[activeSubSection])}</span>
              </>
            )}
          </nav>
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all border',
            language === 'fil'
              ? 'bg-ems-teal/10 border-ems-teal/30 text-ems-teal dark:bg-ems-teal/20'
              : 'bg-primary/10 border-primary/20 text-primary'
          )}
          title={`${tBoth('lang.en').en} / ${tBoth('lang.fil').fil}`}
          aria-label={`${t('lang.switch')}: ${language === 'en' ? tBoth('lang.fil').fil : tBoth('lang.en').en}`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'FIL'}</span>
          <span className="sm:hidden">{language === 'en' ? 'EN' : 'FL'}</span>
        </button>

        {/* Search button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Search (Ctrl+K)"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Streak */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50">
          <Flame className={cn('w-3.5 h-3.5', progress.streak > 0 ? 'text-orange-500' : 'text-muted-foreground')} />
          <span className={cn('text-[11px] font-bold', progress.streak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground')}>
            {progress.streak}
          </span>
        </div>

        {/* XP / Level */}
        <div className="hidden md:flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Lv.{getLevelFromXp(progress.xp)}
            </span>
          </div>
        </div>

        {/* Desktop badge */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium">EMS Reviewer</span>
        </div>
      </header>

      {/* Continue Learning mini-banner */}
      {lastViewedTopic && lastViewedTitle && (
        <div className="flex items-center gap-2 px-3 md:px-6 py-2 bg-primary/5 dark:bg-primary/10 border-b border-primary/20 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Play className="w-3 h-3 text-primary fill-primary" />
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {t('header.continue')} <span className="font-medium text-foreground">{lastViewedTitle}</span>
            </span>
          </div>
          <button
            onClick={handleResume}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex-shrink-0"
            aria-label={`${t('common.resume')} ${lastViewedTitle}`}
          >
            {t('common.resume')}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
