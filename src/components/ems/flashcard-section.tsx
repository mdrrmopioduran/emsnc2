'use client'

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { acronyms } from '@/data/acronyms'
import { drugs } from '@/data/drugs'
import { allFlashcards, vitalSignsCards, emergencyProcedureCards, type FlashcardData } from '@/data/flashcards'
import {
  ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Shuffle,
  Layers, BookOpen, Trophy, Star, RotateCcw, Sparkles,
  CheckCircle2, XCircle, Clock, Zap, Eye, EyeOff,
  GraduationCap, Filter, Stethoscope, Pill, ClipboardCheck, Globe,
  Award, PartyPopper, RefreshCw, CreditCard, SkipForward, GripVertical
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

// ==================== TYPES ====================
type StudyMode = 'browse' | 'quiz' | 'spaced'
type CategoryFilter = 'all' | 'acronyms' | 'drugs' | 'assessment' | 'clinical' | 'general'

// ==================== HELPERS ====================

/** Convert acronym/drug data into FlashcardData */
function buildFlashcardDeck(): FlashcardData[] {
  const acronymCards: FlashcardData[] = acronyms.slice(0, 30).map((a) => ({
    id: `acr-${a.acronym}`,
    front: a.acronym,
    back: `${a.fullTerm}\n\n${a.definition}`,
    category: a.category === 'philippines' ? 'general' : a.category,
    difficulty: 'easy' as const,
  }))

  const drugCards: FlashcardData[] = drugs.map((d) => ({
    id: `drug-${d.id}`,
    front: d.genericName,
    back: `Class: ${d.drugClass}\nRoute: ${d.route}\nScope: ${d.scope}\n\nKey Indications:\n${d.indications.slice(0, 3).map((i) => `• ${i}`).join('\n')}\n\nDose: ${d.adultDose.split(';')[0]}`,
    category: 'drugs' as const,
    difficulty: (d.scope === 'ALS' ? 'hard' : 'medium') as FlashcardData['difficulty'],
  }))

  return [...allFlashcards, ...acronymCards, ...drugCards]
}

const CATEGORY_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  acronyms: { color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30', icon: BookOpen, label: 'Acronyms' },
  drugs: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: Pill, label: 'Drugs' },
  assessment: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: ClipboardCheck, label: 'Assessment' },
  clinical: { color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30', icon: Stethoscope, label: 'Clinical' },
  general: { color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30', icon: Globe, label: 'General' },
}

const DIFFICULTY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  easy: { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', label: 'Easy' },
  medium: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', label: 'Medium' },
  hard: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10', label: 'Hard' },
}

const CATEGORIES: { value: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: Filter },
  { value: 'acronyms', label: 'Acronyms', icon: BookOpen },
  { value: 'drugs', label: 'Drugs', icon: Pill },
  { value: 'assessment', label: 'Assessment', icon: ClipboardCheck },
  { value: 'clinical', label: 'Clinical', icon: Stethoscope },
  { value: 'general', label: 'General', icon: Globe },
]

const STUDY_MODES: { value: StudyMode; label: string; icon: React.ElementType; desc: string }[] = [
  { value: 'browse', label: 'Browse', icon: Eye, desc: 'Flip through cards' },
  { value: 'quiz', label: 'Quiz', icon: GraduationCap, desc: 'Self-assess' },
  { value: 'spaced', label: 'Spaced', icon: RotateCcw, desc: 'Wrong cards repeat' },
]

// ==================== CONFETTI ANIMATION ====================
function ConfettiCelebration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#ems-teal', '#ems-amber', '#ems-red', '#ems-navy', '#10b981', '#f59e0b', '#8b5cf6'][i % 7],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// ==================== SESSION STATS ====================
function SessionStats({
  studied,
  correct,
  incorrect,
  xpEarned,
  startTime,
  totalCards,
  mastered,
}: {
  studied: number
  correct: number
  incorrect: number
  xpEarned: number
  startTime: number
  totalCards: number
  mastered: number
}) {
  const elapsed = Math.floor((Date.now() - startTime) / 1000)
  const pace = studied > 0 ? elapsed / studied : 0
  const remaining = Math.max(0, Math.round((totalCards - studied) * pace))

  const formatTime = (s: number) => {
    if (s < 60) return `${s}s`
    const m = Math.floor(s / 60)
    return `${m}m`
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
        <Layers className="w-3.5 h-3.5 text-ems-teal" />
        <div>
          <p className="text-xs text-muted-foreground">Studied</p>
          <p className="text-sm font-bold">{studied}/{totalCards}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
        <div>
          <p className="text-xs text-muted-foreground">Correct</p>
          <p className="text-sm font-bold text-green-600">{correct}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
        <XCircle className="w-3.5 h-3.5 text-red-500" />
        <div>
          <p className="text-xs text-muted-foreground">Incorrect</p>
          <p className="text-sm font-bold text-red-600">{incorrect}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        <div>
          <p className="text-xs text-muted-foreground">XP Earned</p>
          <p className="text-sm font-bold text-amber-600">+{xpEarned}</p>
        </div>
      </div>
      {pace > 0 && studied < totalCards && (
        <div className="col-span-2 sm:col-span-4 flex items-center gap-2 p-2 rounded-lg bg-muted/50">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            ~{formatTime(remaining)} remaining ({formatTime(Math.round(pace))}/card)
          </p>
        </div>
      )}
      {mastered > 0 && (
        <div className="col-span-2 sm:col-span-4 flex items-center gap-2 p-2 rounded-lg bg-ems-teal/5 border border-ems-teal/20">
          <Star className="w-3.5 h-3.5 text-ems-teal fill-ems-teal" />
          <p className="text-xs text-ems-teal font-medium">{mastered} card{mastered !== 1 ? 's' : ''} mastered this session</p>
        </div>
      )}
    </div>
  )
}

// ==================== MAIN COMPONENT ====================
export function FlashcardSection() {
  const { settings, progress, addXp } = useAppStore()
  const { toast } = useToast()
  const reducedMotion = settings.reducedMotion

  // Session state
  const [studyMode, setStudyMode] = useState<StudyMode>('browse')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [flipped, setFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mastered, setMastered] = useState<Set<string>>(new Set())
  const [shuffled, setShuffled] = useState(false)

  // Quiz mode state
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [cardsStudied, setCardsStudied] = useState(0)
  const [startTime] = useState(Date.now())
  const [showCelebration, setShowCelebration] = useState(false)

  // Spaced repetition: wrong cards reappear every 5 cards
  const [wrongCards, setWrongCards] = useState<string[]>([])
  const [spacedQueue, setSpacedQueue] = useState<FlashcardData[]>([])
  const [seenSinceLastWrong, setSeenSinceLastWrong] = useState(0)

  // Touch/swipe support
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Build the deck
  const fullDeck = useMemo(() => buildFlashcardDeck(), [])

  const filteredDeck = useMemo(() => {
    let deck = categoryFilter === 'all' ? [...fullDeck] : fullDeck.filter((c) => c.category === categoryFilter)
    // Remove mastered cards
    deck = deck.filter((c) => !mastered.has(c.id))
    return deck
  }, [fullDeck, categoryFilter, mastered])

  // Spaced repetition deck logic
  const activeDeck = useMemo(() => {
    if (studyMode === 'spaced' && spacedQueue.length > 0) {
      return [...spacedQueue]
    }
    return filteredDeck
  }, [studyMode, filteredDeck, spacedQueue])

  const currentCard = activeDeck[currentIndex]
  const totalActive = activeDeck.length
  const progressPct = totalActive > 0 ? ((currentIndex + 1) / totalActive) * 100 : 0
  const isLastCard = currentIndex >= totalActive - 1

  // Check for completion
  useEffect(() => {
    if (totalActive === 0 && cardsStudied > 0 && !showCelebration) {
      setShowCelebration(true)
    }
  }, [totalActive, cardsStudied, showCelebration])

  // Navigate to next card with spaced repetition logic
  const goNext = useCallback(() => {
    if (!currentCard) return

    // Mark as studied
    const alreadyStudied = cardsStudied
    setCardsStudied((c) => c + 1)

    // Earn XP for studying
    const xpGain = 5
    setXpEarned((x) => x + xpGain)
    addXp(xpGain)

    if (flipped && studyMode === 'browse') {
      // In browse mode with card flipped, just advance
    }

    setFlipped(false)

    // Check if we need to insert wrong cards (spaced repetition)
    if (studyMode === 'spaced' && wrongCards.length > 0) {
      const newSeen = seenSinceLastWrong + 1
      setSeenSinceLastWrong(newSeen)
      if (newSeen >= 5) {
        // Insert wrong card at current position
        const wrongCard = fullDeck.find((c) => c.id === wrongCards[0])
        if (wrongCard) {
          setSpacedQueue((prev) => {
            const withoutFirst = wrongCards.slice(1)
            setWrongCards(withoutFirst)
            const newQueue = [...activeDeck.slice(currentIndex + 1), wrongCard, ...prev.slice(currentIndex + 1)]
            return newQueue
          })
          setSeenSinceLastWrong(0)
        }
      }
    }

    // Advance index
    if (currentIndex < totalActive - 1) {
      setCurrentIndex((i) => i + 1)
    }
  }, [currentCard, currentIndex, totalActive, flipped, studyMode, addXp, seenSinceLastWrong, wrongCards, fullDeck, activeDeck, cardsStudied])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setFlipped(false)
    }
  }, [currentIndex])

  // Quiz handlers
  const handleCorrect = useCallback(() => {
    setCorrect((c) => c + 1)
    setXpEarned((x) => x + 10)
    addXp(10)
    goNext()
  }, [addXp, goNext])

  const handleIncorrect = useCallback(() => {
    if (!currentCard) return
    setIncorrect((c) => c + 1)
    if (studyMode === 'spaced') {
      setWrongCards((prev) => [...prev, currentCard.id])
    }
    goNext()
  }, [currentCard, addXp, goNext, studyMode])

  const handleMastered = useCallback(() => {
    if (!currentCard) return
    setMastered((prev) => new Set([...prev, currentCard.id]))
    setCardsStudied((c) => c + 1)
    setXpEarned((x) => x + 10)
    addXp(10)
    setFlipped(false)
    if (currentIndex >= totalActive - 1) {
      // Will trigger celebration
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }, [currentCard, currentIndex, totalActive, addXp])

  const handleShuffle = useCallback(() => {
    if (!reducedMotion) {
      // Shuffle the deck
      const shuffledArr = [...activeDeck].sort(() => Math.random() - 0.5)
      setSpacedQueue(shuffledArr)
    }
    setCurrentIndex(0)
    setFlipped(false)
    setShuffled(true)
    toast({ title: 'Shuffled!', description: 'Cards have been randomized' })
  }, [activeDeck, reducedMotion, toast])

  const handleReset = useCallback(() => {
    setMastered(new Set())
    setCorrect(0)
    setIncorrect(0)
    setXpEarned(0)
    setCardsStudied(0)
    setCurrentIndex(0)
    setFlipped(false)
    setWrongCards([])
    setSpacedQueue([])
    setSeenSinceLastWrong(0)
    setShowCelebration(false)
    setShuffled(false)
    toast({ title: 'Session Reset', description: 'Starting fresh!' })
  }, [toast])

  // Touch handlers for swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }, [goNext, goPrev])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (flipped && studyMode === 'browse') goNext(); else setFlipped(true) }
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Enter' && !flipped) setFlipped(true)
      if (studyMode === 'quiz' && flipped) {
        if (e.key === '1') handleCorrect()
        if (e.key === '2') handleIncorrect()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flipped, studyMode, goNext, goPrev, handleCorrect, handleIncorrect])

  const catConfig = currentCard ? CATEGORY_CONFIG[currentCard.category] : CATEGORY_CONFIG.general
  const diffConfig = currentCard ? DIFFICULTY_CONFIG[currentCard.difficulty] : DIFFICULTY_CONFIG.easy

  // ==================== CELEBRATION SCREEN ====================
  if (showCelebration) {
    return (
      <div className="relative content-transition">
        <ConfettiCelebration />
        <Card className="card-modern card-shine max-w-md mx-auto text-center p-8">
          <CardContent className="space-y-4">
            <div className="text-6xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-foreground">Session Complete!</h3>
            <p className="text-sm text-muted-foreground">You&apos;ve completed all the cards in this session.</p>
            <SessionStats
              studied={cardsStudied}
              correct={correct}
              incorrect={incorrect}
              xpEarned={xpEarned}
              startTime={startTime}
              totalCards={filteredDeck.length + mastered.size}
              mastered={mastered.size}
            />
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1 gap-2" onClick={handleReset}>
                <RefreshCw className="w-4 h-4" />
                Study Again
              </Button>
              <Button className="flex-1 gap-2" onClick={() => setShowCelebration(false)}>
                <Sparkles className="w-4 h-4" />
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ==================== EMPTY STATE ====================
  if (totalActive === 0 && cardsStudied === 0) {
    return (
      <div className="content-transition space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-ems-teal" />
            Flashcards
          </h3>
        </div>
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📚</div>
          <h4 className="font-semibold text-foreground mb-1">No cards available</h4>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Try changing the category filter or resetting mastered cards.
          </p>
          <Button variant="outline" className="mt-4 gap-2" onClick={handleReset}>
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    )
  }

  // ==================== MAIN UI ====================
  return (
    <div className="content-transition space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-ems-teal" />
          Flashcards
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1 text-xs h-7" onClick={handleShuffle}>
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 text-red-500 hover:text-red-600" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Study Mode Selector */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/60">
        {STUDY_MODES.map((mode) => {
          const Icon = mode.icon
          const active = studyMode === mode.value
          return (
            <button
              key={mode.value}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                active
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => { setStudyMode(mode.value); setFlipped(false) }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{mode.label}</span>
              <span className="sm:hidden">{mode.label}</span>
            </button>
          )
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const CatIcon = cat.icon
          const active = categoryFilter === cat.value
          return (
            <button
              key={cat.value}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all',
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              onClick={() => {
                setCategoryFilter(cat.value)
                setCurrentIndex(0)
                setFlipped(false)
              }}
            >
              <CatIcon className="w-3 h-3" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{currentIndex + 1} / {totalActive}</span>
          <span>{totalActive - currentIndex - 1} remaining</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-ems-teal to-ems-teal/70"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Session Stats (compact) */}
      {(cardsStudied > 0 || correct > 0 || incorrect > 0) && (
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-ems-teal/5">
            <Layers className="w-3 h-3 text-ems-teal" />
            <span className="text-xs font-semibold text-ems-teal">{cardsStudied}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-green-500/5">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span className="text-xs font-semibold text-green-600">{correct}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-red-500/5">
            <XCircle className="w-3 h-3 text-red-500" />
            <span className="text-xs font-semibold text-red-600">{incorrect}</span>
          </div>
        </div>
      )}

      {/* Flashcard */}
      {currentCard && (
        <div
          className="relative mx-auto w-full max-w-[500px]"
          style={{ perspective: '1200px' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={reducedMotion ? { opacity: 0 } : { rotateY: -15, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { rotateY: 15, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: 'easeInOut' }}
              className={cn(
                'relative w-full cursor-pointer',
                reducedMotion ? '' : 'transition-transform duration-500',
              )}
              style={{
                transformStyle: 'preserve-3d',
                transform: !reducedMotion && flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
              onClick={() => !flipped && setFlipped(true)}
            >
              {/* Front of card */}
              <div
                className="w-full min-h-[280px] sm:min-h-[320px] rounded-2xl border-2 p-6 flex flex-col items-center justify-center text-center shadow-lg"
                style={{
                  backfaceVisibility: 'hidden',
                  borderColor: `var(--tw-gradient-stops, ${catConfig.border.replace('border-', 'border-')})`,
                  background: `linear-gradient(135deg, hsl(var(--card)) 0%, ${catConfig.bg} 100%)`,
                }}
              >
                {/* Category badge and difficulty */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={cn('text-[10px] font-medium', catConfig.color, catConfig.border)}>
                    {catConfig.label}
                  </Badge>
                  <Badge variant="outline" className={cn('text-[10px] font-medium', diffConfig.color)}>
                    {diffConfig.label}
                  </Badge>
                </div>

                {/* Term */}
                <h4 className={cn('text-2xl sm:text-3xl font-bold mb-3 leading-tight', catConfig.color)}>
                  {currentCard.front}
                </h4>

                {/* Category icon */}
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mt-2', catConfig.bg)}>
                  {(() => {
                    const Icon = catConfig.icon
                    return <Icon className={cn('w-6 h-6', catConfig.color)} />
                  })()}
                </div>

                {/* Tap hint (first card) */}
                {cardsStudied === 0 && !flipped && (
                  <p className="text-[11px] text-muted-foreground mt-4 animate-pulse">
                    Tap to flip • Swipe to navigate
                  </p>
                )}
                {cardsStudied === 0 && flipped && (
                  <p className="text-[11px] text-muted-foreground mt-4">
                    {studyMode === 'quiz' ? 'Did you know this? 👆' : 'Swipe or use arrows to continue'}
                  </p>
                )}
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 w-full min-h-[280px] sm:min-h-[320px] rounded-2xl border-2 p-6 flex flex-col overflow-y-auto custom-scrollbar shadow-lg"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderColor: catConfig.border.replace('border-', 'border-'),
                  background: `linear-gradient(135deg, ${catConfig.bg} 0%, hsl(var(--card)) 100%)`,
                }}
              >
                {/* Back header */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-[10px]">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Answer
                  </Badge>
                  <button
                    className="p-1 rounded-md hover:bg-muted/80 transition-colors"
                    onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
                  >
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Definition content */}
                <div className="flex-1 flex flex-col">
                  <h5 className="text-sm font-semibold text-foreground mb-2">{currentCard.front}</h5>
                  <div className="text-sm text-foreground/85 whitespace-pre-line leading-relaxed flex-1">
                    {currentCard.back.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.startsWith('•') || line.startsWith('-') ? (
                          <span className="flex items-start gap-1.5 my-0.5">
                            <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                            {line.replace(/^[•-]\s*/, '')}
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                        {i < currentCard.back.split('\n').length - 1 && !line.startsWith('•') && !line.startsWith('-') && '\n'}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quiz mode action buttons */}
                {(studyMode === 'quiz' || studyMode === 'spaced') && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/20 transition-all active:scale-95"
                      onClick={(e) => { e.stopPropagation(); handleIncorrect() }}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-xs font-semibold">Didn&apos;t Know</span>
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 hover:bg-green-500/20 transition-all active:scale-95"
                      onClick={(e) => { e.stopPropagation(); handleCorrect() }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-semibold">Knew It</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom overlay buttons (browse mode, after flip) */}
          {studyMode === 'browse' && flipped && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mt-4"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-xs"
                onClick={handleMastered}
              >
                <Star className="w-3.5 h-3.5" />
                Mastered
              </Button>
            </motion.div>
          )}
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          disabled={currentIndex === 0}
          onClick={goPrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <span className="text-xs text-muted-foreground font-mono min-w-[60px] text-center">
          {currentIndex + 1}/{totalActive}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          disabled={isLastCard && totalActive > 0}
          onClick={studyMode === 'browse' ? (flipped ? goNext : () => setFlipped(true)) : goNext}
        >
          {studyMode === 'browse' && !flipped ? (
            <Eye className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mark as Mastered button (browse mode) */}
      {studyMode === 'browse' && currentCard && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-amber-500 hover:text-amber-600"
            onClick={handleMastered}
          >
            <Star className="w-3.5 h-3.5" />
            Mark as Mastered
          </Button>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground/50 hidden sm:block">
          ← → Navigate • Space/Enter Flip • {studyMode === 'quiz' ? '1 Correct • 2 Incorrect' : 'M Master'}
        </p>
      </div>

      {/* Expanded Session Stats */}
      {cardsStudied > 3 && (
        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Session Stats
            </p>
            <SessionStats
              studied={cardsStudied}
              correct={correct}
              incorrect={incorrect}
              xpEarned={xpEarned}
              startTime={startTime}
              totalCards={filteredDeck.length + mastered.size}
              mastered={mastered.size}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
