'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { useToast } from '@/hooks/use-toast'
import { competencyModules, type CompetencyModule } from '@/data/competencies'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Search, ArrowLeft, ChevronDown, ChevronUp, CheckCircle2,
  Lightbulb, BookOpen, ClipboardList, ImageIcon, Star,
  HelpCircle, CreditCard, PenTool, RotateCcw, Trophy,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SpeakerButton } from '@/components/ems/tts-button'
import { useTranslatedContent } from '@/hooks/use-translated-content'
import { useTranslation } from '@/hooks/use-translation'

// ==================== ANIMATION VARIANTS ====================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const tabContentVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

// ==================== CATEGORY ICONS & COLORS ====================

const CATEGORY_ICONS: Record<string, string> = {
  'Foundation': '🏛️',
  'Clinical': '🩺',
  'Operations': '⚙️',
}

// ==================== SUB-COMPONENTS ====================

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
      )}
      onClick={onClick}
    >
      <span>{CATEGORY_ICONS[label] || '📋'}</span>
      <span>{label}</span>
    </button>
  )
}

// ==================== MODULE GRID (Level 1) ====================

function ModuleGrid({
  onSelectModule,
}: {
  onSelectModule: (mod: CompetencyModule) => void
}) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const tc = useTranslatedContent()
  const { t } = useTranslation()

  const categories = useMemo(() => {
    const cats = new Set(competencyModules.map(m => m.category))
    return ['All', ...Array.from(cats)]
  }, [])

  const filtered = useMemo(() => {
    return competencyModules.filter(m => {
      if (search) {
        const s = search.toLowerCase()
        const translatedTitle = tc.getModuleTitle(m).toLowerCase()
        const translatedDesc = tc.getModuleDesc(m).toLowerCase()
        if (
          !m.title.toLowerCase().includes(s) &&
          !translatedTitle.includes(s) &&
          !m.shortTitle.toLowerCase().includes(s) &&
          !m.description.toLowerCase().includes(s) &&
          !translatedDesc.includes(s) &&
          !m.category.toLowerCase().includes(s)
        ) return false
      }
      if (activeCategory !== 'All' && m.category !== activeCategory) return false
      return true
    })
  }, [search, activeCategory, tc])

  return (
    <div className="overflow-hidden w-full space-y-4">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
          <h3 className="font-semibold text-lg text-foreground min-w-0 break-words">
            {t('comp.title')}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground break-words">
          {t('comp.subtitle')}
        </p>
      </div>

      {/* Search + Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('comp.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {t('comp.showing')} {filtered.length} {t('comp.of')} {competencyModules.length} {t('comp.modules')}
      </p>

      {/* Module Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory + search}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(mod => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onClick={() => onSelectModule(mod)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <h4 className="font-semibold text-foreground mb-1">{t('comp.noModules')}</h4>
          <p className="text-sm text-muted-foreground max-w-xs">
            {t('comp.tryAdjusting')}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-1.5"
            onClick={() => { setSearch(''); setActiveCategory('All') }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('common.clearFilters')}
          </Button>
        </div>
      )}
    </div>
  )
}

function ModuleCard({
  module,
  onClick,
}: {
  module: CompetencyModule
  onClick: () => void
}) {
  const { progress } = useAppStore()
  const tc = useTranslatedContent()
  const moduleProgress = progress.moduleProgress[module.id]
  const totalSections = 8 // 8 tabs
  const completedSections = moduleProgress?.sectionsCompleted?.length || 0
  const progressPercent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  return (
    <motion.div
      variants={cardVariants}
      layout
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer overflow-hidden border-l-4 hover:shadow-lg transition-shadow duration-200"
        style={{ borderLeftColor: module.color }}
        onClick={onClick}
      >
        <CardContent className="p-4 space-y-3">
          {/* Icon + Title */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: `${module.color}15` }}
            >
              {module.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <h4 className="font-semibold text-sm text-foreground leading-tight break-words min-w-0 flex-1">
                  {tc.getModuleTitle(module)}
                </h4>
                <SpeakerButton text={tc.getModuleDesc(module)} size="xs" className="flex-shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 break-words line-clamp-2">
                {tc.getModuleDesc(module)}
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-[10px] font-medium"
              style={{ borderColor: module.color, color: module.color }}
            >
              {module.category}
            </Badge>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Progress</span>
              <span className="text-[10px] font-medium" style={{ color: module.color }}>
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ==================== MODULE DETAIL (Level 2) ====================

function ModuleDetail({
  module,
  onBack,
}: {
  module: CompetencyModule
  onBack: () => void
}) {
  const { progress, addXp, updateModuleProgress } = useAppStore()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('reviewer-notes')
  const tc = useTranslatedContent()
  const { t } = useTranslation()

  const moduleTitle = tc.getModuleTitle(module)
  const moduleDesc = tc.getModuleDesc(module)
  const moduleNotes = tc.getModuleReviewerNotes(module)
  const moduleProcedures = tc.getModuleProcedures(module)
  const moduleVisuals = tc.getModuleVisuals(module)
  const moduleKeyPoints = tc.getModuleKeyPoints(module)
  const moduleAssessorQuestions = tc.getModuleAssessorQuestions(module)
  const moduleMemorizationTips = tc.getModuleMemorizationTips(module)
  const moduleFlashcards = tc.getModuleFlashcards(module)
  const moduleMiniQuiz = tc.getModuleMiniQuiz(module)

  const moduleProgress = progress.moduleProgress[module.id]
  const totalSections = 8
  const completedSections = moduleProgress?.sectionsCompleted?.length || 0
  const progressPercent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  const markSectionComplete = useCallback((sectionId: string) => {
    updateModuleProgress(module.id, sectionId)
    addXp(5)
    toast({
      title: 'Section Completed! +5 XP',
      description: `${sectionId} marked as complete`,
    })
  }, [module.id, updateModuleProgress, addXp, toast])

  return (
    <div className="overflow-hidden w-full space-y-4">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 min-w-0">
        <ArrowLeft className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{t('comp.backToModules')}</span>
      </Button>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className="overflow-hidden border-l-4"
          style={{ borderLeftColor: module.color }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-2 sm:gap-4">
              <div
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
                style={{ backgroundColor: `${module.color}15` }}
              >
                {module.icon}
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-base sm:text-lg text-foreground break-words">{moduleTitle}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 break-words">{moduleDesc}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-medium flex-shrink-0"
                    style={{ borderColor: module.color, color: module.color }}
                  >
                    {module.category}
                  </Badge>
                </div>
                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {completedSections}/{totalSections} {t('comp.sectionsCompleted')}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: module.color }}>
                      {progressPercent}%
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  >
                    <Progress value={progressPercent} className="h-2" />
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap scrollbar-none gap-0.5 h-auto p-1">
          <TabsTrigger value="reviewer-notes" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-ems-teal/15 data-[state=active]:text-ems-teal">
            <BookOpen className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.notes')}</span>
          </TabsTrigger>
          <TabsTrigger value="procedures" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-ems-amber/15 data-[state=active]:text-ems-amber">
            <ClipboardList className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.procedures')}</span>
          </TabsTrigger>
          <TabsTrigger value="visuals" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-purple-500/15 data-[state=active]:text-purple-600">
            <ImageIcon className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.visuals')}</span>
          </TabsTrigger>
          <TabsTrigger value="key-points" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-ems-navy/15 data-[state=active]:text-ems-navy">
            <Star className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.keyPoints')}</span>
          </TabsTrigger>
          <TabsTrigger value="assessor-questions" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-ems-red/15 data-[state=active]:text-ems-red">
            <HelpCircle className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.assessor')}</span>
          </TabsTrigger>
          <TabsTrigger value="memorization" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-orange-500/15 data-[state=active]:text-orange-600">
            <Lightbulb className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.tips')}</span>
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-rose-500/15 data-[state=active]:text-rose-600">
            <CreditCard className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.cards')}</span>
          </TabsTrigger>
          <TabsTrigger value="mini-quiz" className="text-xs px-1.5 sm:px-2 flex-shrink-0 gap-1 py-1.5 data-[state=active]:bg-green-500/15 data-[state=active]:text-green-600">
            <PenTool className="w-3 h-3" /> <span className="hidden sm:inline">{t('comp.quiz')}</span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <TabsContent value="reviewer-notes" forceMount={activeTab === 'reviewer-notes'}>
              <ReviewerNotesTab module={module} translatedNotes={moduleNotes} onComplete={() => markSectionComplete('reviewer-notes')} isCompleted={moduleProgress?.sectionsCompleted?.includes('reviewer-notes')} />
            </TabsContent>
            <TabsContent value="procedures" forceMount={activeTab === 'procedures'}>
              <ProceduresTab module={module} translatedProcedures={moduleProcedures} onComplete={() => markSectionComplete('procedures')} isCompleted={moduleProgress?.sectionsCompleted?.includes('procedures')} />
            </TabsContent>
            <TabsContent value="visuals" forceMount={activeTab === 'visuals'}>
              <VisualsTab module={module} translatedVisuals={moduleVisuals} onComplete={() => markSectionComplete('visuals')} isCompleted={moduleProgress?.sectionsCompleted?.includes('visuals')} />
            </TabsContent>
            <TabsContent value="key-points" forceMount={activeTab === 'key-points'}>
              <KeyPointsTab module={module} translatedKeyPoints={moduleKeyPoints} onComplete={() => markSectionComplete('key-points')} isCompleted={moduleProgress?.sectionsCompleted?.includes('key-points')} />
            </TabsContent>
            <TabsContent value="assessor-questions" forceMount={activeTab === 'assessor-questions'}>
              <AssessorQuestionsTab module={module} translatedAssessorQuestions={moduleAssessorQuestions} onComplete={() => markSectionComplete('assessor-questions')} isCompleted={moduleProgress?.sectionsCompleted?.includes('assessor-questions')} />
            </TabsContent>
            <TabsContent value="memorization" forceMount={activeTab === 'memorization'}>
              <MemorizationTipsTab module={module} translatedMemorizationTips={moduleMemorizationTips} onComplete={() => markSectionComplete('memorization')} isCompleted={moduleProgress?.sectionsCompleted?.includes('memorization')} />
            </TabsContent>
            <TabsContent value="flashcards" forceMount={activeTab === 'flashcards'}>
              <FlashcardsTab module={module} translatedFlashcards={moduleFlashcards} onComplete={() => markSectionComplete('flashcards')} isCompleted={moduleProgress?.sectionsCompleted?.includes('flashcards')} />
            </TabsContent>
            <TabsContent value="mini-quiz" forceMount={activeTab === 'mini-quiz'}>
              <MiniQuizTab module={module} translatedMiniQuiz={moduleMiniQuiz} onComplete={() => markSectionComplete('mini-quiz')} isCompleted={moduleProgress?.sectionsCompleted?.includes('mini-quiz')} />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

// ==================== TAB COMPONENTS ====================

function SectionCompleteButton({
  onComplete,
  isCompleted,
}: {
  onComplete: () => void
  isCompleted?: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="pt-4">
      {isCompleted ? (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{t('common.completed')}!</span>
        </div>
      ) : (
        <Button size="sm" onClick={onComplete} className="gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          {t('roadmap.markComplete')}
        </Button>
      )}
    </div>
  )
}

// 📖 Reviewer Notes Tab
function ReviewerNotesTab({
  module,
  translatedNotes,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedNotes: string
  onComplete: () => void
  isCompleted?: boolean
}) {
  const { t } = useTranslation()
  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-4 pt-2">
      <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: module.color }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: module.color }} />
              {t('comp.reviewerNotes')}
            </div>
            <SpeakerButton text={translatedNotes} size="sm" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80 leading-relaxed break-words whitespace-pre-line">
            {translatedNotes}
          </p>
        </CardContent>
      </Card>
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// 📋 Procedures Tab
function ProceduresTab({
  module,
  translatedProcedures,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedProcedures: CompetencyModule['procedures']
  onComplete: () => void
  isCompleted?: boolean
}) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0)

  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-3 pt-2">
      {translatedProcedures.map((proc, idx) => (
        <Card key={idx} className="overflow-hidden">
          <button
            className="w-full text-left p-4 flex items-center justify-between gap-2"
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: module.color }}
              >
                {idx + 1}
              </div>
              <span className="font-semibold text-sm text-foreground break-words min-w-0 flex-1">{proc.title}</span>
              <SpeakerButton text={proc.title + '. ' + proc.steps.join('. ')} size="xs" className="flex-shrink-0" />
            </div>
            {expandedIdx === idx ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
          </button>
          <AnimatePresence>
            {expandedIdx === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 pb-4 px-4 sm:px-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">{proc.steps.length} steps</span>
                    <SpeakerButton text={proc.steps.join('. ')} size="xs" />
                  </div>
                  <ol className="space-y-2">
                    {proc.steps.map((step, stepIdx) => (
                      <motion.li
                        key={stepIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: stepIdx * 0.05 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: module.color }}
                        >
                          {stepIdx + 1}
                        </span>
                        <span className="text-foreground/80 break-words min-w-0">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// 🖼️ Visual Illustrations Tab
function VisualsTab({
  module,
  translatedVisuals,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedVisuals: CompetencyModule['visualIllustrations']
  onComplete: () => void
  isCompleted?: boolean
}) {
  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-3 pt-2">
      {translatedVisuals.map((vis, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${module.color}15` }}
                >
                  <ImageIcon className="w-5 h-5" style={{ color: module.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-1.5">
                    <h4 className="font-semibold text-sm text-foreground mb-1 break-words">{vis.title}</h4>
                    <SpeakerButton text={vis.description} size="xs" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">{vis.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// ⭐ Key Points Tab
function KeyPointsTab({
  module,
  translatedKeyPoints,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedKeyPoints: string[]
  onComplete: () => void
  isCompleted?: boolean
}) {
  const { t } = useTranslation()
  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{t('comp.keyPoints')}</span>
        <SpeakerButton text={translatedKeyPoints.join('. ')} size="sm" />
      </div>
      {translatedKeyPoints.map((point, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50"
        >
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: module.color }} />
          <span className="text-sm text-foreground/80 break-words min-w-0">{point}</span>
        </motion.div>
      ))}
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// ❓ Assessor Questions Tab
function AssessorQuestionsTab({
  module,
  translatedAssessorQuestions,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedAssessorQuestions: string[]
  onComplete: () => void
  isCompleted?: boolean
}) {
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set())
  const { t } = useTranslation()

  const toggleReveal = (idx: number) => {
    setRevealedIdx(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-3 pt-2">
      <p className="text-xs text-muted-foreground">
        {t('comp.assessorHint')}
      </p>
      {translatedAssessorQuestions.map((question, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Card
            className="cursor-pointer overflow-hidden"
            onClick={() => toggleReveal(idx)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: module.color }}
                >
                  Q{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <p className="font-medium text-sm text-foreground break-words flex-1">{question}</p>
                    <SpeakerButton text={question} size="xs" />
                  </div>
                  <AnimatePresence>
                    {revealedIdx.has(idx) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-muted-foreground mt-2 italic break-words"
                      >
                        {t('comp.assessorFocus')}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <HelpCircle className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  revealedIdx.has(idx) ? 'text-primary' : 'text-muted-foreground'
                )} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// 💡 Memorization Tips Tab
function MemorizationTipsTab({
  module,
  translatedMemorizationTips,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedMemorizationTips: string[]
  onComplete: () => void
  isCompleted?: boolean
}) {
  const { t } = useTranslation()
  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{t('comp.memorizationTips')}</span>
        <SpeakerButton text={translatedMemorizationTips.join('. ')} size="sm" />
      </div>
      {translatedMemorizationTips.map((tip, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${module.color}15` }}
                >
                  <Lightbulb className="w-4 h-4" style={{ color: module.color }} />
                </div>
                <p className="text-sm text-foreground/80 break-words min-w-0">{tip}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// 🃏 Flashcards Tab
function FlashcardsTab({
  module,
  translatedFlashcards,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedFlashcards: CompetencyModule['flashcards']
  onComplete: () => void
  isCompleted?: boolean
}) {
  const [flippedIdx, setFlippedIdx] = useState<Set<number>>(new Set())
  const [currentCard, setCurrentCard] = useState(0)
  const { t } = useTranslation()

  const toggleFlip = (idx: number) => {
    setFlippedIdx(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const nextCard = () => {
    if (currentCard < translatedFlashcards.length - 1) {
      setCurrentCard(prev => prev + 1)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1)
    }
  }

  const isFlipped = flippedIdx.has(currentCard)

  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-4 pt-2">
      <p className="text-xs text-muted-foreground">
        {t('comp.flashcardInstruction')}
      </p>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{t('comp.cardOf')} {currentCard + 1} {t('comp.of')} {translatedFlashcards.length}</span>
        <div className="flex gap-1">
          {translatedFlashcards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentCard(idx)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                idx === currentCard ? '' : 'bg-muted-foreground/30'
              )}
              style={idx === currentCard ? { backgroundColor: module.color } : {}}
            />
          ))}
        </div>
      </div>

      {/* Flashcard with 3D flip */}
      <div
        className="perspective-[1000px] w-full cursor-pointer select-none"
        onClick={() => toggleFlip(currentCard)}
      >
        <motion.div
          className="relative w-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front */}
          <Card
            className="w-full overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              position: isFlipped ? 'absolute' : 'relative',
              top: 0,
              left: 0,
            }}
          >
            <CardContent className="p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
              <SpeakerButton text={translatedFlashcards[currentCard]?.front || ''} size="xs" className="absolute top-2 right-2" />
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4"
                style={{ backgroundColor: `${module.color}15` }}
              >
                {module.icon}
              </div>
              <p className="text-sm sm:text-lg font-semibold text-foreground text-center break-words min-w-0 w-full px-2">
                {translatedFlashcards[currentCard]?.front}
              </p>
              <p className="text-xs text-muted-foreground mt-3 sm:mt-4">{t('comp.tapToFlip')}</p>
            </CardContent>
          </Card>

          {/* Back */}
          <Card
            className="w-full overflow-hidden border-2"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: isFlipped ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              borderColor: module.color,
            }}
          >
            <CardContent className="p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] overflow-hidden">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4"
                style={{ backgroundColor: `${module.color}15` }}
              >
                💡
              </div>
              <p className="text-sm sm:text-lg font-semibold text-foreground text-center break-words min-w-0 w-full px-2">
                {translatedFlashcards[currentCard]?.back}
              </p>
              <p className="text-xs text-muted-foreground mt-3 sm:mt-4">{t('comp.tapToFlipBack')}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={prevCard}
          disabled={currentCard === 0}
        >
          {t('comp.previous')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextCard}
          disabled={currentCard === translatedFlashcards.length - 1}
        >
          {t('comp.next')}
        </Button>
      </div>

      <SectionCompleteButton onComplete={onComplete} isCompleted={isCompleted} />
    </motion.div>
  )
}

// 📝 Mini Quiz Tab
function MiniQuizTab({
  module,
  translatedMiniQuiz,
  onComplete,
  isCompleted,
}: {
  module: CompetencyModule
  translatedMiniQuiz: CompetencyModule['miniQuiz']
  onComplete: () => void
  isCompleted?: boolean
}) {
  const { addModuleQuizScore, addXp } = useAppStore()
  const { toast } = useToast()
  const { t } = useTranslation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const quiz = translatedMiniQuiz
  const totalQuestions = quiz.length

  const handleAnswerSelect = (idx: number) => {
    if (isRevealed) return
    setSelectedAnswer(idx)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return
    setIsRevealed(true)
    if (selectedAnswer === quiz[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setIsRevealed(false)
    } else {
      // Quiz complete
      setQuizComplete(true)
      const finalScore = selectedAnswer === quiz[currentQuestion].correctAnswer ? score + 1 : score
      addModuleQuizScore(module.id, finalScore, totalQuestions)
      addXp(finalScore * 3)
      toast({
        title: 'Quiz Complete!',
        description: `You scored ${finalScore}/${totalQuestions} and earned ${finalScore * 3} XP!`,
      })
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsRevealed(false)
    setScore(0)
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100)
    return (
      <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-4 pt-2">
        <Card className="overflow-hidden text-center">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Trophy className="w-16 h-16 mx-auto" style={{ color: module.color }} />
            </motion.div>
            <h3 className="text-xl font-bold text-foreground">{t('comp.quizComplete')}</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold" style={{ color: module.color }}>
                {score}/{totalQuestions}
              </p>
              <p className="text-muted-foreground">
                {percentage >= 80 ? t('comp.excellent') :
                 percentage >= 60 ? t('comp.goodJob') :
                 t('comp.keepStudying')}
              </p>
            </div>
            <Progress value={percentage} className="h-3" />
            <p className="text-sm text-muted-foreground">+{score * 3} {t('comp.xpEarned')}</p>
            <div className="flex gap-2 justify-center pt-2">
              <Button variant="outline" onClick={handleReset} className="gap-1.5">
                <RotateCcw className="w-4 h-4" />
                {t('comp.retryQuiz')}
              </Button>
              {!isCompleted && (
                <Button onClick={onComplete} className="gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('comp.markComplete')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const currentQ = quiz[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correctAnswer

  return (
    <motion.div variants={fadeInScale} initial="hidden" animate="visible" className="space-y-4 pt-2">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentQuestion + 1} {t('comp.of')} {totalQuestions}
        </span>
        <span className="font-medium" style={{ color: module.color }}>
          {t('comp.score')}: {score}
        </span>
      </div>
      <Progress value={((currentQuestion) / totalQuestions) * 100} className="h-1.5" />

      {/* Question */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex items-start gap-2">
            <h4 className="font-semibold text-foreground break-words flex-1 min-w-0">{currentQ.question}</h4>
            <SpeakerButton text={currentQ.question} size="xs" />
          </div>

          {/* Options */}
          <div className="space-y-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isCorrectOption = idx === currentQ.correctAnswer
              let optionStyle = 'border-muted bg-muted/30 hover:bg-muted/60'

              if (isRevealed) {
                if (isCorrectOption) {
                  optionStyle = 'border-green-500 bg-green-50 dark:bg-green-950/30'
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = 'border-red-500 bg-red-50 dark:bg-red-950/30'
                } else {
                  optionStyle = 'border-muted bg-muted/20 opacity-60'
                }
              } else if (isSelected) {
                optionStyle = 'border-primary bg-primary/10'
              }

              return (
                <motion.button
                  key={idx}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border-2 transition-all break-words',
                    optionStyle,
                    !isRevealed && 'cursor-pointer'
                  )}
                  onClick={() => handleAnswerSelect(idx)}
                  whileTap={!isRevealed ? { scale: 0.98 } : undefined}
                  disabled={isRevealed}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border-2',
                      isSelected ? 'border-current' : 'border-muted-foreground/30'
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm text-foreground min-w-0 flex-1 break-words">{option}</span>
                    {isRevealed && isCorrectOption && (
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 ml-auto" />
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation (after reveal) */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'p-3 rounded-lg text-sm break-words',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                    : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                )}
              >
                <p className="font-semibold mb-1">
                  {isCorrect ? t('comp.correct') : t('comp.incorrect')}
                </p>
                <div className="flex items-start gap-2">
                  <p className="flex-1">{currentQ.explanation}</p>
                  <SpeakerButton text={currentQ.explanation} size="xs" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            {!isRevealed ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className="gap-1.5"
              >
                {t('comp.checkAnswer')}
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="gap-1.5">
                {currentQuestion < totalQuestions - 1 ? t('comp.nextQuestion') : t('comp.finishQuiz')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ==================== MAIN COMPONENT ====================

export function CompetenciesSection() {
  const [selectedModule, setSelectedModule] = useState<CompetencyModule | null>(null)

  return (
    <div className="overflow-hidden w-full">
      <AnimatePresence mode="wait">
        {selectedModule ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ModuleDetail
              module={selectedModule}
              onBack={() => setSelectedModule(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ModuleGrid onSelectModule={setSelectedModule} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
