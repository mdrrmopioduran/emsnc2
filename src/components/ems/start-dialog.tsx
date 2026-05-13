'use client'

import React from 'react'
import Image from 'next/image'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { usePWA } from '@/hooks/use-pwa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Globe, Download, ChevronRight, Wifi, WifiOff, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Start Dialog — Welcome modal shown on first launch.
 * Features: App logo & title, language toggle, Install App button, offline notice.
 */
export function StartDialog() {
  const { progress, settings, updateSettings, setOnboarded } = useAppStore()
  const { t, language } = useTranslation()
  const { isInstallable, isInstalled, isOnline, installPrompt } = usePWA()
  const [step, setStep] = React.useState(0)
  const [installing, setInstalling] = React.useState(false)

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

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden">
        {/* Hero gradient header */}
        <div className="relative bg-gradient-to-br from-ems-navy via-ems-navy/95 to-ems-navy/90 px-6 pt-8 pb-6 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-ems-teal/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-ems-red/10 rounded-full translate-y-1/2 -translate-x-1/2" />

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

          {/* Title */}
          <h1 className="text-xl font-bold text-white mb-1">PIO DURAN EMS NCII</h1>
          <p className="text-sm font-semibold text-ems-teal">EMS Reviewer</p>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Step 0: Welcome + Language + Install */}
          {step === 0 && (
            <>
              {/* Welcome message */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-ems-teal" />
                  <h2 className="text-lg font-bold">{t('onboarding.welcome')}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'en'
                    ? 'Train anytime, anywhere — even offline.'
                    : 'Mag-aral kahit saan, kahit kailan — kahit offline.'}
                </p>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center justify-center gap-3">
                <span className={cn('text-sm font-medium', language === 'en' ? 'text-primary' : 'text-muted-foreground')}>
                  English
                </span>
                <button
                  onClick={toggleLanguage}
                  className="relative w-12 h-6 rounded-full bg-muted transition-colors hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  role="switch"
                  aria-checked={language === 'fil'}
                  aria-label="Toggle language"
                >
                  <span
                    className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200',
                      language === 'fil' ? 'left-6 bg-ems-teal' : 'left-0.5'
                    )}
                  />
                </button>
                <span className={cn('text-sm font-medium', language === 'fil' ? 'text-ems-teal' : 'text-muted-foreground')}>
                  Filipino
                </span>
              </div>

              {/* Offline/Online indicator */}
              <div className={cn(
                'flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg',
                isOnline
                  ? 'bg-ems-teal/10 text-ems-teal'
                  : 'bg-ems-red/10 text-ems-red'
              )}>
                {isOnline ? (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Online — full access' : 'Online — buong access'}</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Offline — cached content available' : 'Offline — available ang cached na nilalaman'}</span>
                  </>
                )}
              </div>

              {/* Install App button — only shown if installable */}
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
                    ? (language === 'en' ? 'Installing...' : 'Nagi-install...')
                    : (language === 'en' ? '📥 Install EMS NC II App' : '📥 I-install ang EMS NC II App')
                  }
                </button>
              )}

              {/* Already installed notice */}
              {isInstalled && (
                <div className="flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-lg bg-ems-teal/10 text-ems-teal">
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'App installed!' : 'Naka-install na ang app!'}</span>
                </div>
              )}

              {/* Features preview */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '📖', text: language === 'en' ? 'Study Materials' : 'Materiales sa Pag-aaral' },
                  { icon: '🧠', text: language === 'en' ? 'Practice Quizzes' : 'Pagsusulit' },
                  { icon: '📊', text: language === 'en' ? 'Track Progress' : 'Subaybayan ang Progreso' },
                  { icon: '📡', text: language === 'en' ? 'Works Offline' : 'Gumagana Offline' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 text-xs">
                    <span className="text-base">{feature.icon}</span>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Get Started button */}
              <Button
                onClick={handleGetStarted}
                className="w-full bg-ems-navy hover:bg-ems-navy/90 text-white py-3 text-sm font-bold rounded-xl"
              >
                {language === 'en' ? 'Get Started' : 'Magsimula'}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
