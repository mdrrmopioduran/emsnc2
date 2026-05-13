'use client'

import React from 'react'
import Image from 'next/image'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { usePWA } from '@/hooks/use-pwa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Download,
  ChevronRight,
  WifiOff,
  Sparkles,
  BookOpen,
  Brain,
  BarChart3,
  Wifi,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Start Dialog — Welcome modal shown on first launch.
 * Features: App logo & title, language toggle, Install App button, offline notice,
 * skip/close, floating animations, Lucide feature icons, improved typography.
 */
export function StartDialog() {
  const { progress, settings, updateSettings, setOnboarded } = useAppStore()
  const { t, language } = useTranslation()
  const { isInstallable, isInstalled, isOnline, installPrompt } = usePWA()
  const [step, setStep] = React.useState(0)
  const [installing, setInstalling] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  // Animate in after mount
  React.useEffect(() => {
    // Defer to next frame so the initial render has visible=false
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Don't show if already onboarded
  if (progress.onboarded) return null

  const toggleLanguage = () => {
    updateSettings({ language: language === 'en' ? 'fil' : 'en' })
  }

  const handleInstall = async () => {
    if (!installPrompt) return
    setInstalling(true)
    try {
      await installPrompt()
    } finally {
      setInstalling(false)
    }
  }

  const handleGetStarted = () => {
    setOnboarded()
  }

  const handleSkip = () => {
    setOnboarded()
  }

  const features = [
    { icon: BookOpen, text: language === 'en' ? 'Study Materials' : 'Materiales sa Pag-aaral' },
    { icon: Brain, text: language === 'en' ? 'Practice Quizzes' : 'Pagsusulit' },
    { icon: BarChart3, text: language === 'en' ? 'Track Progress' : 'Subaybayan ang Progreso' },
    { icon: Wifi, text: language === 'en' ? 'Works Offline' : 'Gumagana Offline' },
  ]

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4',
        'transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Card
        className={cn(
          'w-full max-w-md overflow-hidden relative',
          'transition-all duration-300 ease-out',
          visible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        )}
      >
        {/* ── Skip / Close button (top-right) ── */}
        <button
          onClick={handleSkip}
          aria-label={language === 'en' ? 'Close dialog' : 'Isara ang dialog'}
          className={cn(
            'absolute top-3 right-3 z-10',
            'flex items-center justify-center',
            'w-8 h-8 rounded-full',
            'bg-white/10 backdrop-blur-sm border border-white/20',
            'text-white/70 hover:text-white hover:bg-white/20',
            'transition-all duration-200'
          )}
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Hero gradient header ── */}
        <div className="relative bg-gradient-to-br from-ems-navy via-ems-navy/95 to-ems-navy/90 px-5 sm:px-6 pt-8 pb-6 text-center overflow-hidden">
          {/* Decorative circles with floating animation */}
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-ems-teal/10 rounded-full -translate-y-1/2 translate-x-1/2 float-slow"
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 bg-ems-red/10 rounded-full translate-y-1/2 -translate-x-1/2 float-medium"
          />
          <div
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-ems-teal/5 rounded-full -translate-x-1/2 -translate-y-1/2 float-slow"
          />

          {/* Logo */}
          <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl shadow-ems-teal/20 mb-4">
            <Image
              src="/pio-duran-ems-logo.png"
              alt="PIO DURAN EMS NCII Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Title — 24px bold */}
          <h1 className="text-[24px] leading-tight font-bold text-white mb-1">
            PIO DURAN EMS NCII
          </h1>
          {/* Subtitle — smaller, lighter */}
          <p className="text-sm font-medium text-ems-teal/80">
            EMS Reviewer
          </p>
        </div>

        <CardContent className="p-4 sm:p-6 space-y-5 relative">
          {/* ── Subtle background pattern via CSS gradient ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Step 0: Welcome + Language + Install */}
          {step === 0 && (
            <div className="relative space-y-5">
              {/* Welcome message */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-ems-teal" />
                  <h2 className="text-lg font-bold">{t('onboarding.welcome')}</h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {language === 'en'
                    ? 'Train anytime, anywhere — even offline.'
                    : 'Mag-aral kahit saan, kahit kailan — kahit offline.'}
                </p>
              </div>

              {/* ── Language pill toggle ── */}
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    'inline-flex items-center rounded-full p-1',
                    'bg-muted/70 border border-border/50'
                  )}
                  role="radiogroup"
                  aria-label="Select language"
                >
                  {(['en', 'fil'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        if (lang !== language) toggleLanguage()
                      }}
                      role="radio"
                      aria-checked={lang === language}
                      className={cn(
                        'relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200',
                        lang === language
                          ? 'bg-ems-teal text-white shadow-md shadow-ems-teal/25'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {lang === 'en' ? 'EN' : 'FIL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Online / Offline indicator ── */}
              <div
                className={cn(
                  'flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg',
                  isOnline
                    ? 'bg-ems-teal/10 text-ems-teal'
                    : 'bg-ems-red/10 text-ems-red'
                )}
              >
                {isOnline ? (
                  <>
                    {/* Pulsing green dot */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ems-teal opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ems-teal" />
                    </span>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>
                      {language === 'en'
                        ? 'Online — Live updates & full access'
                        : 'Online — Live updates at buong access'}
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>
                      {language === 'en'
                        ? 'Offline — cached content available'
                        : 'Offline — available ang cached na nilalaman'}
                    </span>
                  </>
                )}
              </div>

              {/* ── Install App button ── */}
              {isInstallable && !isInstalled && (
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all',
                    'bg-ems-teal text-white hover:bg-ems-teal/90 shadow-lg shadow-ems-teal/25',
                    installing && 'opacity-60 cursor-not-allowed'
                  )}
                >
                  <Download className="w-4 h-4" />
                  {installing
                    ? language === 'en'
                      ? 'Installing...'
                      : 'Nagi-install...'
                    : language === 'en'
                      ? 'Install EMS NC II App'
                      : 'I-install ang EMS NC II App'}
                </button>
              )}

              {/* Already installed notice */}
              {isInstalled && (
                <div className="flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg bg-ems-teal/10 text-ems-teal">
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {language === 'en' ? 'App installed!' : 'Naka-install na ang app!'}
                  </span>
                </div>
              )}

              {/* ── Feature grid with Lucide icons ── */}
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 text-xs"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-ems-teal/10 text-ems-teal shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium leading-tight">{feature.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* ── Get Started button ── */}
              <Button
                onClick={handleGetStarted}
                className={cn(
                  'w-full bg-ems-navy hover:bg-ems-navy/90 text-white',
                  'py-3 text-sm font-bold rounded-xl',
                  'transition-all duration-200 hover:shadow-lg hover:shadow-ems-navy/25'
                )}
              >
                {language === 'en' ? 'Get Started' : 'Magsimula'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              {/* ── Skip for now link ── */}
              <div className="text-center">
                <button
                  onClick={handleSkip}
                  className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors duration-200"
                >
                  {language === 'en' ? 'Skip for now' : 'Laktawan muna'}
                </button>
              </div>
            </div>
          )}
        </CardContent>


      </Card>
    </div>
  )
}
