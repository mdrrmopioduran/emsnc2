'use client'

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { acronyms } from '@/data/acronyms'
import { definitions } from '@/data/definitions'
import { drugs } from '@/data/drugs'
import {
  Search, Copy, BookOpen, Heart, AlertTriangle, CheckCircle2,
  Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Filter,
  Shuffle, X, ArrowRight, Pill, ShieldAlert, Beaker,
  Eye, EyeOff, GraduationCap, Zap, Scale, Stethoscope,
  ClipboardCheck, Globe, Building2, Truck, Lightbulb,
  RotateCcw, Star, StarOff, Trophy, Brain, Sparkles, BookText, Type,
  CreditCard, StickyNote
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { CompetenciesSection } from '@/components/ems/competencies-section'
import { AIAssistantSection } from '@/components/ems/ai-assistant'
import { FlashcardSection } from '@/components/ems/flashcard-section'
import { NotesSection } from '@/components/ems/notes-section'
import { SmartReviewSection } from '@/components/ems/smart-review-section'
import { useTranslation } from '@/hooks/use-translation'
import { InlineSpeakerButton } from '@/components/ems/tts-button'

// ==================== HELPERS ====================

/** Map category names to CSS variable colors for left borders */
const CATEGORY_COLORS: Record<string, string> = {
  philippines: 'var(--cat-foundation)',
  clinical: 'var(--cat-clinical)',
  assessment: 'var(--cat-assessment)',
  drugs: 'var(--cat-operations)',
  general: 'var(--cat-orientation)',
  legal: 'var(--cat-legal)',
  operations: 'var(--cat-coordination)',
}

/** Map category names to Lucide icon components */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  philippines: Building2,
  clinical: Stethoscope,
  assessment: ClipboardCheck,
  drugs: Pill,
  general: Globe,
  legal: Scale,
  operations: Truck,
}

/** Get the border color for a category */
function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'var(--primary)'
}

/** Get the icon component for a category */
function getCategoryIcon(category: string): React.ElementType {
  return CATEGORY_ICONS[category] || BookOpen
}

// ==================== MODE TOGGLE ====================
function ModeToggle() {
  const { settings, setLearningMode } = useAppStore()
  const mode = settings.learningMode
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Position the slider based on active mode
  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return
    const options = containerRef.current.querySelectorAll('[data-mode]')
    options.forEach((opt) => {
      const htmlOpt = opt as HTMLElement
      if (htmlOpt.dataset.mode === mode) {
        sliderRef.current!.style.left = htmlOpt.offsetLeft + 'px'
        sliderRef.current!.style.width = htmlOpt.offsetWidth + 'px'
      }
    })
  }, [mode])

  return (
    <div ref={containerRef} className="mode-toggle relative">
      <div ref={sliderRef} className="mode-toggle-slider" />
      <button
        data-mode="learning"
        className={cn('mode-toggle-option flex items-center gap-1.5', mode === 'learning' && 'active')}
        onClick={() => setLearningMode('learning')}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        <span>Learning</span>
      </button>
      <button
        data-mode="quickReview"
        className={cn('mode-toggle-option flex items-center gap-1.5', mode === 'quickReview' && 'active')}
        onClick={() => setLearningMode('quickReview')}
      >
        <Zap className="w-3.5 h-3.5" />
        <span>Quick Review</span>
      </button>
    </div>
  )
}

// ==================== IMPROVED EMPTY STATE ====================
function EmptyState({
  emoji,
  title,
  description,
  onClear,
}: {
  emoji: string
  title: string
  description: string
  onClear?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="text-5xl mb-3">{emoji}</div>
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      {onClear && (
        <Button variant="outline" size="sm" className="mt-4 gap-1.5" onClick={onClear}>
          <RotateCcw className="w-3.5 h-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  )
}

// ==================== FILTER CHIP ====================
function FilterChip({
  label,
  active,
  onClick,
  icon: Icon,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ElementType
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="w-3 h-3" />}
      <span className="capitalize">{label}</span>
    </button>
  )
}

// ==================== ACRONYMS ====================
export function AcronymsPanel() {
  const { settings, progress, toggleFavoriteAcronym } = useAppStore()
  const isQuickReview = settings.learningMode === 'quickReview'
  const favoriteAcronyms = progress.favoriteAcronyms
  const { t } = useTranslation()

  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [quizMode, setQuizMode] = useState(false)
  const [quizCurrent, setQuizCurrent] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState('')
  const [quizRevealed, setQuizRevealed] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quizTotal, setQuizTotal] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<typeof acronyms>([])

  // Quick Review state: track which cards are flipped
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [categoryExpanded, setCategoryExpanded] = useState(false)

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const categories = ['all', 'philippines', 'clinical', 'assessment', 'drugs', 'general'] as const

  // Filter and sort: favorites first, then alphabetical
  const filtered = useMemo(() => {
    return acronyms
      .filter((a) => {
        if (search) {
          const s = search.toLowerCase()
          if (!a.acronym.toLowerCase().includes(s) && !a.fullTerm.toLowerCase().includes(s) && !a.definition.toLowerCase().includes(s)) return false
        }
        if (activeLetter && !a.acronym.toUpperCase().startsWith(activeLetter)) return false
        if (activeCategory !== 'all' && a.category !== activeCategory) return false
        return true
      })
      .sort((a, b) => {
        // Favorites always at top
        const aFav = favoriteAcronyms.includes(a.acronym) ? 0 : 1
        const bFav = favoriteAcronyms.includes(b.acronym) ? 0 : 1
        if (aFav !== bFav) return aFav - bFav
        return a.acronym.localeCompare(b.acronym)
      })
  }, [search, activeLetter, activeCategory, favoriteAcronyms])

  const toggleFlip = useCallback((acronym: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev)
      if (next.has(acronym)) next.delete(acronym)
      else next.add(acronym)
      return next
    })
  }, [])

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text)
      toast({ title: 'Copied!', description: `"${text}" copied to clipboard` })
    },
    [toast]
  )

  const handleToggleFavorite = useCallback((acronym: string) => {
    const isFav = favoriteAcronyms.includes(acronym)
    toggleFavoriteAcronym(acronym)
    toast({
      title: isFav ? t('common.removedFromFavorites') : t('common.addedToFavorites'),
      description: isFav ? `${acronym} removed from favorites` : `${acronym} ${t('study.willAppearAtTop')}`,
    })
  }, [favoriteAcronyms, toggleFavoriteAcronym, toast, t])

  const startQuiz = useCallback(() => {
    const shuffled = [...acronyms].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuizQuestions(shuffled)
    setQuizCurrent(0)
    setQuizScore(0)
    setQuizTotal(0)
    setQuizAnswer('')
    setQuizRevealed(false)
    setQuizMode(true)
  }, [])

  const checkQuizAnswer = useCallback(() => {
    setQuizRevealed(true)
    setQuizTotal((t) => t + 1)
    const current = quizQuestions[quizCurrent]
    const correct = current.fullTerm.toLowerCase().includes(quizAnswer.toLowerCase().trim())
    if (correct) setQuizScore((s) => s + 1)
  }, [quizCurrent, quizQuestions, quizAnswer])

  const nextQuizQuestion = useCallback(() => {
    if (quizCurrent < quizQuestions.length - 1) {
      setQuizCurrent((c) => c + 1)
      setQuizAnswer('')
      setQuizRevealed(false)
    } else {
      setQuizMode(false)
      toast({
        title: t('quiz.quizComplete'),
        description: `${t('common.score')}: ${quizScore}/${quizTotal}`,
      })
    }
  }, [quizCurrent, quizQuestions.length, quizScore, quizTotal, toast, t])

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02, duration: 0.25, ease: 'easeOut' },
    }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  }

  if (quizMode && quizQuestions.length > 0) {
    const current = quizQuestions[quizCurrent]
    const isCorrect = current.fullTerm.toLowerCase().includes(quizAnswer.toLowerCase().trim())

    return (
      <div className="content-transition space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{t('common.quizMode')}</h3>
          <Button variant="ghost" size="sm" onClick={() => setQuizMode(false)}>
            <X className="w-4 h-4 mr-1" /> {t('common.exitQuiz')}
          </Button>
        </div>
        <Card className="card-modern">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Question {quizCurrent + 1} of {quizQuestions.length}
            </p>
            <motion.div
              key={quizCurrent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="inline-block px-6 py-3 rounded-xl bg-primary/10 border-2 border-primary/20 mb-4"
            >
              <span className="text-4xl font-extrabold text-primary tracking-wide">{current.acronym}</span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-4">{t('assessment.whatDoesThisStandFor')}</p>
            <Input
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              placeholder="Type the full term..."
              className="text-center mb-4"
              disabled={quizRevealed}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!quizRevealed) checkQuizAnswer()
                  else nextQuizQuestion()
                }
              }}
            />
            {!quizRevealed ? (
              <Button onClick={checkQuizAnswer} disabled={!quizAnswer.trim()}>
                {t('common.checkAnswer')}
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className={cn('p-3 rounded-lg', isCorrect ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950')}>
                  <p className={cn('font-semibold', isCorrect ? 'text-green-600' : 'text-red-600')}>
                    {isCorrect ? `✓ ${t('common.correct')}` : `✗ ${t('common.incorrect')}`}
                  </p>
                  <p className="text-sm mt-1">
                    <strong className="text-primary">{current.acronym}</strong> = {current.fullTerm}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{current.definition}</p>
                </div>
                <Button onClick={nextQuizQuestion}>
                  {quizCurrent < quizQuestions.length - 1 ? t('common.next') : t('common.finish')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            )}
            <div className="mt-4 text-sm text-muted-foreground">
              {t('common.score')}: {quizScore}/{quizTotal}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="content-transition space-y-4">
      {/* Search & Quiz */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('study.searchAcronyms')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={startQuiz} variant="outline" className="gap-2">
          <Shuffle className="w-4 h-4" /> {t('common.quiz')}
        </Button>
      </div>

      {/* Category filter chips - auto minimize when active */}
      <div className="flex items-center gap-2 flex-wrap">
        <motion.div layout className="flex flex-wrap gap-2">
          {categories
            .filter((cat) => {
              // When a category is active (not 'all'), minimize to show only active + 'all'
              if (activeCategory !== 'all' && !categoryExpanded) {
                return cat === 'all' || cat === activeCategory
              }
              return true
            })
            .map((cat) => {
              const CatIcon = cat === 'all' ? Filter : getCategoryIcon(cat)
              return (
                <FilterChip
                  key={cat}
                  label={cat === 'all' ? t('common.all') : t('category.' + cat)}
                  active={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat)
                    if (cat !== activeCategory) setCategoryExpanded(false)
                  }}
                  icon={CatIcon}
                />
              )
            })}
        </motion.div>
        {activeCategory !== 'all' && (
          <button
            onClick={() => setCategoryExpanded(!categoryExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted"
          >
            {categoryExpanded ? (
              <><ChevronUp className="w-3 h-3" /> {t('common.less')}</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> {t('common.more')}</>
            )}
          </button>
        )}
      </div>

      {/* Alphabet quick-jump */}
      <div className="flex flex-wrap gap-1">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={cn(
              'alpha-tab text-xs min-w-[28px] min-h-[28px] sm:min-w-[32px] sm:min-h-[32px]',
              activeLetter === letter && 'active'
            )}
            onClick={() => setActiveLetter(activeLetter === letter ? '' : letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('study.showing')} {filtered.length} {t('study.of')} {acronyms.length} {t('study.acronyms')}
        </p>
        {favoriteAcronyms.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium">{favoriteAcronyms.length} {t('common.favorites')}</span>
          </div>
        )}
      </div>

      {/* Acronym list */}
      <div className="space-y-2 max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-1">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const isFlipped = flippedCards.has(item.acronym)
            const isFavorite = favoriteAcronyms.includes(item.acronym)
            const catColor = getCategoryColor(item.category)
            const CatIcon = getCategoryIcon(item.category)

            // Quick Review Mode: flashcard style
            if (isQuickReview) {
              return (
                <motion.div
                  key={item.acronym}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  className={cn(
                    'knowledge-block card-modern cursor-pointer',
                    isFlipped && 'border-primary/30',
                    isFavorite && 'ring-1 ring-amber-400/40 bg-amber-50/30 dark:bg-amber-950/10'
                  )}
                  style={{ borderLeftWidth: '4px', borderLeftColor: catColor }}
                  onClick={() => toggleFlip(item.acronym)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${catColor} 15%, transparent)` }}
                    >
                      <CatIcon className="w-4 h-4" style={{ color: catColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        'font-extrabold text-base px-2 py-0.5 rounded-md',
                        'bg-primary/10 text-primary'
                      )}>
                        {item.acronym}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 flex-wrap justify-end">
                      <InlineSpeakerButton text={`${item.acronym}: ${item.fullTerm}. ${item.definition}`} />
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                        style={{ borderColor: catColor, color: catColor }}
                      >
                        {item.category}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleFavorite(item.acronym)
                        }}
                        className={cn(
                          'p-1.5 rounded-md transition-colors',
                          isFavorite
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-muted-foreground hover:text-amber-500'
                        )}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={cn('w-4 h-4', isFavorite && 'fill-amber-500')} />
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFlip(item.acronym)
                        }}
                      >
                        {isFlipped ? (
                          <><EyeOff className="w-3.5 h-3.5" /> Hide</>
                        ) : (
                          <><Eye className="w-3.5 h-3.5" /> Flip</>
                        )}
                      </Button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isFlipped && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="font-medium text-sm text-foreground">{item.fullTerm}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.definition}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            }

            // Learning Mode: full details with knowledge blocks
            return (
              <motion.div
                key={item.acronym}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ scale: 1.008, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                className={cn(
                  'knowledge-block card-modern',
                  isFavorite && 'ring-1 ring-amber-400/40 bg-amber-50/30 dark:bg-amber-950/10'
                )}
                style={{ borderLeftWidth: '4px', borderLeftColor: catColor }}
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${catColor} 15%, transparent)` }}
                  >
                    <CatIcon className="w-4 h-4" style={{ color: catColor }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className={cn(
                      'font-extrabold text-sm md:text-base px-2 py-0.5 rounded-md',
                      'bg-primary/10 text-primary inline-block'
                    )}>
                      {item.acronym}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] capitalize"
                      style={{ borderColor: catColor, color: catColor }}
                    >
                      {item.category}
                    </Badge>
                    {isFavorite && (
                      <Badge className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-0 gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Favorite
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium text-sm text-foreground break-words">{item.fullTerm}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 break-words">{item.definition}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <InlineSpeakerButton text={`${item.acronym}: ${item.fullTerm}. ${item.definition}`} />
                  <button
                    onClick={() => handleToggleFavorite(item.acronym)}
                    className={cn(
                      'p-2.5 rounded hover:bg-muted transition-colors',
                      isFavorite
                        ? 'text-amber-500 hover:text-amber-600'
                        : 'text-muted-foreground hover:text-amber-500'
                    )}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={cn('w-4 h-4', isFavorite && 'fill-amber-500')} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(`${item.acronym}: ${item.fullTerm}`)}
                    className="p-2.5 rounded hover:bg-muted transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        {filtered.length === 0 && (
          <EmptyState
            emoji="🔍"
            title={t('study.noAcronyms')}
            description="Try adjusting your search or letter filter to find what you're looking for."
            onClear={() => { setSearch(''); setActiveLetter(''); setActiveCategory('all') }}
          />
        )}
      </div>
    </div>
  )
}

// ==================== DEFINITIONS ====================
export function DefinitionsPanel() {
  const { progress, toggleBookmark, settings } = useAppStore()
  const isQuickReview = settings.learningMode === 'quickReview'
  const { t } = useTranslation()

  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const categories = ['all', 'legal', 'clinical', 'operations', 'assessment', 'general'] as const

  const filtered = definitions
    .filter((d) => {
      if (search) {
        const s = search.toLowerCase()
        if (!d.term.toLowerCase().includes(s) && !d.definition.toLowerCase().includes(s)) return false
      }
      if (activeLetter && !d.term.toUpperCase().startsWith(activeLetter)) return false
      if (activeCategory !== 'all' && d.category !== activeCategory) return false
      return true
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  const toggleExpanded = useCallback((term: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev)
      if (next.has(term)) next.delete(term)
      else next.add(term)
      return next
    })
  }, [])

  return (
    <div className="content-transition space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t('study.searchTerms')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const CatIcon = cat === 'all' ? Filter : getCategoryIcon(cat)
          return (
            <FilterChip
              key={cat}
              label={cat === 'all' ? t('common.all') : t('category.' + cat)}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              icon={CatIcon}
            />
          )
        })}
      </div>

      {/* Alphabet quick-jump */}
      <div className="flex flex-wrap gap-1">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={cn('alpha-tab text-xs min-w-[28px] min-h-[28px] sm:min-w-[32px] sm:min-h-[32px]', activeLetter === letter && 'active')}
            onClick={() => setActiveLetter(activeLetter === letter ? '' : letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {t('study.showing')} {filtered.length} {t('study.of')} {definitions.length} {t('study.terms')}
      </p>

      {/* Terms list */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-1">
        {filtered.map((item) => {
          const isBookmarked = progress.bookmarks.includes(item.term)
          const isExpanded = expandedTerms.has(item.term)
          const catColor = getCategoryColor(item.category)
          const CatIcon = getCategoryIcon(item.category)

          // Quick Review Mode: term name only, expand for details
          if (isQuickReview) {
            return (
              <Card
                key={item.term}
                className="card-modern overflow-hidden"
              >
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-4 flex items-center gap-3"
                    onClick={() => toggleExpanded(item.term)}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in srgb, ${catColor} 15%, transparent)` }}
                    >
                      <CatIcon className="w-4 h-4" style={{ color: catColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm text-foreground break-words">{item.term}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 flex-wrap justify-end">
                      <InlineSpeakerButton text={`${item.term}. ${item.definition}`} />
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                        style={{ borderColor: catColor, color: catColor }}
                      >
                        {item.category}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 content-transition ml-4 pl-4" style={{ borderLeftWidth: '4px', borderLeftColor: catColor }}>
                      <p className="text-sm text-foreground/80 break-words">{item.definition}</p>
                      <p className="text-xs text-muted-foreground mt-2 italic break-words">
                        <strong>Example:</strong> {item.example}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(item.term)
                            toast({
                              title: isBookmarked ? t('study.bookmarkRemoved') : t('study.bookmarked'),
                              description: item.term,
                            })
                          }}
                          className="p-1.5 rounded hover:bg-muted transition-colors inline-flex items-center gap-1 text-xs"
                        >
                          {isBookmarked ? (
                            <><BookmarkCheck className="w-3.5 h-3.5 text-ems-teal" /> Saved</>
                          ) : (
                            <><Bookmark className="w-3.5 h-3.5 text-muted-foreground" /> Save</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          }

          // Learning Mode: full definition with knowledge block styling
          return (
            <Card
              key={item.term}
              className="card-modern overflow-hidden"
            >
              <CardContent className="p-4">
                <div
                  className="flex items-start justify-between gap-2"
                  style={{ borderLeftWidth: '4px', borderLeftColor: catColor, paddingLeft: '12px' }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap min-w-0">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `color-mix(in srgb, ${catColor} 15%, transparent)` }}
                      >
                        <CatIcon className="w-3 h-3" style={{ color: catColor }} />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground break-words">{item.term}</h4>
                      <InlineSpeakerButton text={`${item.term}. ${item.definition}`} />
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                        style={{ borderColor: catColor, color: catColor }}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80 break-words">{item.definition}</p>
                    <p className="text-xs text-muted-foreground mt-2 italic break-words">
                      <strong>Example:</strong> {item.example}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      toggleBookmark(item.term)
                      toast({
                        title: isBookmarked ? t('study.bookmarkRemoved') : t('study.bookmarked'),
                        description: item.term,
                      })
                    }}
                    className="p-1.5 rounded hover:bg-muted transition-colors flex-shrink-0"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-ems-teal" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && (
          <EmptyState
            emoji="📖"
            title={t('study.noTerms')}
            description="Try a different search term or category filter. You can also browse by letter using the alphabet above."
            onClear={() => { setSearch(''); setActiveCategory('all'); setActiveLetter('') }}
          />
        )}
      </div>
    </div>
  )
}

// ==================== DRUG REFERENCE ====================
export function DrugReferencePanel() {
  const { settings } = useAppStore()
  const isQuickReview = settings.learningMode === 'quickReview'
  const { t } = useTranslation()

  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterScope, setFilterScope] = useState<string>('all')
  const [filterRoute, setFilterRoute] = useState<string>('all')

  const routes = ['all', ...Array.from(new Set(drugs.map((d) => d.route)))]

  const filtered = drugs
    .filter((d) => {
      if (search) {
        const s = search.toLowerCase()
        if (!d.genericName.toLowerCase().includes(s) && !d.brandNames.some((b) => b.toLowerCase().includes(s)) && !d.drugClass.toLowerCase().includes(s)) return false
      }
      if (filterScope !== 'all' && d.scope !== filterScope && d.scope !== 'Both') return false
      if (filterRoute !== 'all' && d.route !== filterRoute) return false
      return true
    })

  return (
    <div className="content-transition space-y-4">
      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-3 rounded-lg bg-ems-red/10 border border-ems-red/20">
        <AlertTriangle className="w-5 h-5 text-ems-red flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80">
          <strong>{t('study.disclaimer')}</strong>
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t('study.searchDrugs')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground">{t('study.scope')}:</span>
          {['all', 'BLS', 'ALS'].map((scope) => (
            <FilterChip
              key={scope}
              label={scope === 'all' ? 'All' : scope}
              active={filterScope === scope}
              onClick={() => setFilterScope(scope)}
              icon={scope === 'BLS' ? ShieldAlert : scope === 'ALS' ? Beaker : Filter}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xs font-medium text-muted-foreground">{t('study.route')}:</span>
          <select
            value={filterRoute}
            onChange={(e) => setFilterRoute(e.target.value)}
            className="text-xs rounded-full border border-input bg-background px-3 py-1.5 font-medium w-full sm:w-auto"
          >
            {routes.map((r) => (
              <option key={r} value={r}>
                {r === 'all' ? t('study.allRoutes') : r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {t('study.showing')} {filtered.length} {t('study.of')} {drugs.length} {t('study.drugs')}
      </p>

      {/* Drug cards */}
      <div className="space-y-3 max-h-[calc(100vh-320px)] sm:max-h-[calc(100vh-450px)] overflow-y-auto custom-scrollbar pr-1">
        {filtered.map((drug) => {
          const isExpanded = expandedId === drug.id
          const scopeColor = drug.scope === 'BLS' ? 'text-ems-teal' : drug.scope === 'ALS' ? 'text-ems-red' : 'text-primary'
          const scopeBg = drug.scope === 'BLS' ? 'bg-ems-teal/10' : drug.scope === 'ALS' ? 'bg-ems-red/10' : 'bg-primary/10'
          const borderColor = drug.scope === 'BLS' ? 'var(--cat-foundation)' : drug.scope === 'ALS' ? 'var(--cat-critical)' : 'var(--primary)'

          // Quick Review Mode: drug name + key info only, expand for details
          if (isQuickReview) {
            return (
              <Card key={drug.id} className="card-modern overflow-hidden">
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-4"
                    onClick={() => setExpandedId(isExpanded ? null : drug.id)}
                    style={{ borderLeftWidth: '4px', borderLeftColor: borderColor, paddingLeft: '16px' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', scopeBg)}>
                          <Pill className={cn('w-4 h-4', scopeColor)} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm break-words">{drug.genericName}</h4>
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 flex-wrap">
                            <InlineSpeakerButton text={`${drug.genericName}. ${drug.drugClass}. Indications: ${drug.indications.join(', ')}`} />
                            <Badge variant="outline" className="text-[10px]">{drug.drugClass}</Badge>
                            <Badge variant="outline" className={cn('text-[10px]', scopeColor)}>
                              {drug.scope}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{drug.route}</span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 content-transition space-y-3" style={{ paddingLeft: '20px' }}>
                      <div className="border-t border-border pt-4" />
                      <InfoRow icon={<ShieldAlert className="w-4 h-4 text-ems-red" />} label={t('study.indications')} items={drug.indications} />
                      <InfoRow icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} label={t('study.contraindications')} items={drug.contraindications} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs font-semibold text-foreground mb-1">{t('study.adultDose')}</p>
                          <p className="text-sm text-foreground/70">{drug.adultDose}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs font-semibold text-foreground mb-1">{t('study.pediatricDose')}</p>
                          <p className="text-sm text-foreground/70">{drug.pediatricDose}</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs font-semibold text-foreground mb-1">{t('study.route')}</p>
                        <p className="text-sm text-foreground/70">{drug.route}</p>
                      </div>
                      <InfoRow icon={<Beaker className="w-4 h-4 text-purple-500" />} label={t('study.sideEffects')} items={drug.sideEffects} />
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <p className="text-xs font-semibold text-primary mb-1">{t('study.specialNotes')}</p>
                        <p className="text-sm text-foreground/70">{drug.specialNotes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          }

          // Learning Mode: full card with knowledge block styling
          return (
            <Card key={drug.id} className="card-modern overflow-hidden">
              <CardContent className="p-4">
                <button
                  className="w-full text-left"
                  onClick={() => setExpandedId(isExpanded ? null : drug.id)}
                  style={{ borderLeftWidth: '4px', borderLeftColor: borderColor, paddingLeft: '12px' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', scopeBg)}>
                        <Pill className={cn('w-4 h-4', scopeColor)} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm break-words">{drug.genericName}</h4>
                        <p className="text-xs text-muted-foreground break-words">
                          {drug.brandNames.join(', ')} • {drug.drugClass}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 flex-wrap justify-end">
                      <InlineSpeakerButton text={`${drug.genericName}. ${drug.drugClass}. Indications: ${drug.indications.join(', ')}`} />
                      <Badge variant="outline" className={cn('text-[10px]', scopeColor)}>
                        {drug.scope}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border content-transition space-y-3">
                    <InfoRow icon={<ShieldAlert className="w-4 h-4 text-ems-red" />} label={t('study.indications')} items={drug.indications} />
                    <InfoRow icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} label={t('study.contraindications')} items={drug.contraindications} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs font-semibold text-foreground mb-1">{t('study.adultDose')}</p>
                        <p className="text-sm text-foreground/70">{drug.adultDose}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs font-semibold text-foreground mb-1">{t('study.pediatricDose')}</p>
                        <p className="text-sm text-foreground/70">{drug.pediatricDose}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs font-semibold text-foreground mb-1">{t('study.route')}</p>
                      <p className="text-sm text-foreground/70">{drug.route}</p>
                    </div>
                    <InfoRow icon={<Beaker className="w-4 h-4 text-purple-500" />} label={t('study.sideEffects')} items={drug.sideEffects} />
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">{t('study.specialNotes')}</p>
                      <p className="text-sm text-foreground/70">{drug.specialNotes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && (
          <EmptyState
            emoji="💊"
            title={t('study.noDrugs')}
            description="Try adjusting your search or scope/route filters. Remember to always verify drug information with your local protocols."
            onClear={() => { setSearch(''); setFilterScope('all'); setFilterRoute('all') }}
          />
        )}
      </div>
    </div>
  )
}

function InfoRow({ icon, label, items }: { icon: React.ReactNode; label: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
      <ul className="space-y-1 ml-6">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ==================== STUDY SECTION (TABS) ====================
export function StudySection() {
  const { activeSubSection, setActiveSubSection } = useAppStore()
  const { t } = useTranslation()

  return (
    <div className="content-transition space-y-4">
      {/* Mode Toggle at the top */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-foreground">{t('study.materials')}</h3>
        <ModeToggle />
      </div>

      <Tabs
        value={activeSubSection || 'acronyms'}
        onValueChange={(v) => setActiveSubSection(v)}
      >
        <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap scrollbar-none">
          <TabsTrigger value="competencies" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-ems-amber/15 data-[state=active]:text-ems-amber"><Trophy className="w-3.5 h-3.5" />{t('sub.competencies')}</TabsTrigger>
          <TabsTrigger value="acronyms" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-ems-teal/15 data-[state=active]:text-ems-teal"><BookText className="w-3.5 h-3.5" />{t('sub.acronyms')}</TabsTrigger>
          <TabsTrigger value="definitions" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-ems-navy/15 data-[state=active]:text-ems-navy"><Type className="w-3.5 h-3.5" />{t('sub.definitions')}</TabsTrigger>
          <TabsTrigger value="drugs" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-ems-red/15 data-[state=active]:text-ems-red"><Pill className="w-3.5 h-3.5" />{t('sub.drugs')}</TabsTrigger>
          <TabsTrigger value="smart-review" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-teal-500/15 data-[state=active]:text-teal-600"><Brain className="w-3.5 h-3.5" />{t('sub.smart-review')}</TabsTrigger>
          <TabsTrigger value="flashcards" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-teal-500/15 data-[state=active]:text-teal-600"><CreditCard className="w-3.5 h-3.5" />{t('sub.flashcards')}</TabsTrigger>
          <TabsTrigger value="notes" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-600"><StickyNote className="w-3.5 h-3.5" />{t('sub.notes')}</TabsTrigger>
          <TabsTrigger value="ai-assistant" className="text-xs sm:text-sm flex-shrink-0 gap-1 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-600"><Sparkles className="w-3.5 h-3.5" />{t('sub.ai-assistant')}</TabsTrigger>
        </TabsList>
        <TabsContent value="competencies">
          <CompetenciesSection />
        </TabsContent>
        <TabsContent value="acronyms">
          <AcronymsPanel />
        </TabsContent>
        <TabsContent value="definitions">
          <DefinitionsPanel />
        </TabsContent>
        <TabsContent value="drugs">
          <DrugReferencePanel />
        </TabsContent>
        <TabsContent value="smart-review">
          <SmartReviewSection />
        </TabsContent>
        <TabsContent value="flashcards">
          <FlashcardSection />
        </TabsContent>
        <TabsContent value="notes">
          <NotesSection />
        </TabsContent>
        <TabsContent value="ai-assistant">
          <AIAssistantSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
