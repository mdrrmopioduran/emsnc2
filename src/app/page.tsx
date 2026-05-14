'use client'

import React from 'react'
import { useAppStore, type Section } from '@/store/app-store'
import { Sidebar } from '@/components/ems/sidebar'
import { Header } from '@/components/ems/header'
import { RoadmapSection } from '@/components/ems/roadmap-section'
import { StudySection } from '@/components/ems/study-section'
import { VisualSection } from '@/components/ems/visual-section'
import { AssessmentSection } from '@/components/ems/assessment-section'
import { SettingsSection } from '@/components/ems/settings-section'
import { AdminSection } from '@/components/ems/admin-section'
import { GlobalSearch, OnboardingWalkthrough } from '@/components/ems/shared-components'
import { StartDialog } from '@/components/ems/start-dialog'
import { FloatingChatButton } from '@/components/ems/ai-assistant'
import { OfflineIndicator, UpdateBanner, LastSyncDisplay } from '@/components/ems/pwa-components'
import { AchievementToastWatcher } from '@/components/ems/achievement-toast-watcher'
import { AchievementNotifications } from '@/components/ems/achievement-notifications'
import { BookOpen, BookText, Heart, ClipboardCheck, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/use-translation'

const bottomNavKeys: { section: Section; labelKey: string; icon: React.ElementType }[] = [
  { section: 'roadmap', labelKey: 'nav.roadmap', icon: BookOpen },
  { section: 'study', labelKey: 'nav.study', icon: BookText },
  { section: 'visual', labelKey: 'nav.visual', icon: Heart },
  { section: 'assessment', labelKey: 'nav.assessment', icon: ClipboardCheck },
  { section: 'settings', labelKey: 'nav.settings', icon: Settings },
]

function FooterText() {
  const { t } = useTranslation()
  return <>{t('footer.text')}</>
}

function MobileBottomNav() {
  const { activeSection, setActiveSection, setSidebarOpen } = useAppStore()
  const { t } = useTranslation()

  return (
    <nav className="mobile-bottom-nav mobile-nav-frosted mobile-bottom-nav-enhanced md:hidden" aria-label="Mobile navigation">
      {bottomNavKeys.map(({ section, labelKey, icon: Icon }) => {
        const isActive = activeSection === section
        return (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section)
              setSidebarOpen(false)
            }}
            className={cn(
              'mobile-nav-item',
              isActive && 'active'
            )}
            aria-label={t(labelKey)}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={cn('w-5 h-5 mobile-nav-icon')} />
            <span className="mobile-nav-label">
              {t(labelKey).split(' ')[0]}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function SectionContent() {
  const { activeSection, activeSubSection } = useAppStore()

  switch (activeSection) {
    case 'roadmap':
      // Key by activeSubSection so RoadmapSection re-initializes and auto-expands
      // the correct topic card when navigating from sidebar
      return <RoadmapSection key={activeSubSection || 'roadmap'} />
    case 'study':
      return <StudySection />
    case 'visual':
      return <VisualSection />
    case 'assessment':
      return <AssessmentSection />
    case 'settings':
      return <SettingsSection />
    case 'admin':
      return <AdminSection />
    default:
      return <RoadmapSection />
  }
}

export default function HomePage() {
  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar — flex child on desktop, fixed overlay on mobile */}
      <Sidebar />

      {/* Main area — no margin-left needed, sidebar is a flex child on desktop */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Header — always visible at top */}
        <Header />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden" role="main">
          <div className="main-content-wrapper min-h-full flex flex-col">
            {/* Content */}
            <div className="flex-1 px-3 sm:px-4 md:px-5 pt-4 md:pt-6 pb-20 md:pb-6">
              <div className="max-w-4xl mx-auto w-full">
                <SectionContent />
              </div>
            </div>

            {/* Footer — sticks to bottom when content is short, scrolls with content when long */}
            <footer className="px-4 md:px-5 py-3 border-t border-border bg-card text-center" role="contentinfo">
              <div className="flex items-center justify-center gap-3">
                {/* Secret admin button — the copyright symbol before PIO DURAN */}
                <button
                  onClick={() => useAppStore.getState().setActiveSection('admin')}
                  className="text-xs text-muted-foreground hover:text-muted-foreground/80 transition-colors cursor-default select-none"
                  aria-hidden="true"
                  tabIndex={-1}
                  title=""
                >
                  ©
                </button>
                <p className="text-xs text-muted-foreground">
                  <FooterText />
                </p>
                <span className="text-border">|</span>
                <LastSyncDisplay />
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global overlay components */}
      <GlobalSearch />
      <StartDialog />
      <OfflineIndicator />
      <UpdateBanner />
      <FloatingChatButton />
      <AchievementNotifications />
      <AchievementToastWatcher />
    </div>
  )
}
