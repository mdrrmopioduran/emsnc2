'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { roadmapTopics } from '@/data/roadmap'
import {
  CheckCircle2, ChevronDown, ChevronUp, Clock, BookOpen, Sparkles,
  Star, Zap, Flame, Award, Lock, Play, Eye, Bookmark, BookmarkCheck,
  ArrowRight, Target, AlertTriangle, Lightbulb, RotateCcw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ModuleQuiz, DiagnosticAssessment } from '@/components/ems/shared-components'
import { SpeakerButton } from '@/components/ems/tts-button'
import { useTranslatedContent } from '@/hooks/use-translated-content'

// Animated progress counter
function AnimatedCounter({ target, duration = 800 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (current === target) return
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + step
        if (next >= target) {
          clearInterval(timer)
          return target
        }
        return next
      })
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{Math.round(current)}</span>
}

// Time tracker hook
function useTimeTracker(topicId: string, isActive: boolean) {
  const { updateTimeSpent } = useAppStore()
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now()
    } else if (startTimeRef.current) {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      if (elapsed > 0) {
        updateTimeSpent(topicId, elapsed)
      }
      startTimeRef.current = 0
    }
  }, [isActive, topicId, updateTimeSpent])

  useEffect(() => {
    return () => {
      if (startTimeRef.current) {
        const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
        if (elapsed > 0) {
          updateTimeSpent(topicId, elapsed)
        }
      }
    }
  }, [topicId, updateTimeSpent])
}

// Difficulty badge component
function DifficultyBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const { t } = useTranslation()
  const config = {
    beginner: { label: t('diff.beginner'), color: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' },
    intermediate: { label: t('diff.intermediate'), color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' },
    advanced: { label: t('diff.advanced'), color: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' },
  }
  const c = config[difficulty]
  return <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', c.color)}>{c.label}</span>
}

// Mini progress bar component
function MiniProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ems-teal to-ems-teal/70 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground font-medium">{pct}%</span>
    </div>
  )
}

// Quick Review Card (flashcard-style)
function QuickReviewCard({ topic }: { topic: typeof roadmapTopics[0] }) {
  const [flipped, setFlipped] = useState(false)
  const { t } = useTranslation()
  const { getTopicTitle, getTopicQuickNotes } = useTranslatedContent()
  const qn = getTopicQuickNotes(topic)
  const title = getTopicTitle(topic)

  return (
    <div className="flashcard overflow-hidden" onClick={() => setFlipped(!flipped)}>
      <div className={cn('flashcard-inner min-h-[180px] sm:min-h-[200px]', flipped && 'flipped')}>
        {/* Front */}
        <div className="flashcard-front p-4 sm:p-5 rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
          <div className="flex items-center gap-2 mb-3 min-w-0">
            <span className="text-2xl flex-shrink-0">{topic.icon}</span>
            <h3 className="font-bold text-sm sm:text-base break-words min-w-0">{title}</h3>
          </div>
          <div className="flex items-start gap-2 mb-4 min-w-0">
            <p className="text-xs sm:text-sm text-muted-foreground flex-1 break-words min-w-0">{qn.summary}</p>
            <SpeakerButton text={qn.summary} size="xs" />
          </div>
          <div className="flex items-center gap-2 text-xs text-primary">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-medium">{t('roadmap.tapToFlip')}</span>
          </div>
        </div>
        {/* Back */}
        <div className="flashcard-back p-4 sm:p-5 rounded-xl border-2 border-ems-teal/30 bg-card overflow-hidden">
          <h4 className="font-bold text-sm mb-2 text-ems-teal">{t('roadmap.keyTerms')}</h4>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {qn.keyTerms.map((term) => (
              <Badge key={term} variant="outline" className="text-[10px] border-ems-teal/30 text-ems-teal">{term}</Badge>
            ))}
          </div>
          <h4 className="font-bold text-sm mb-1 text-amber-600">{t('roadmap.mnemonics')}</h4>
          <ul className="space-y-1 mb-2">
            {qn.mnemonics.map((m, i) => (
              <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />{m}
              </li>
            ))}
          </ul>
          <h4 className="font-bold text-sm mb-1 text-ems-red">{t('roadmap.commonMistakes')}</h4>
          <ul className="space-y-1">
            {qn.commonMistakes.map((m, i) => (
              <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 text-ems-red flex-shrink-0 mt-0.5" />{m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Knowledge Block component for visual learning
function KnowledgeBlock({ icon, title, items, color }: { icon: React.ReactNode; title: string; items: string[]; color: string }) {
  return (
    <div className="knowledge-block">
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', color)}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-sm mb-1">{title}</p>
        <ul className="space-y-0.5">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-foreground/70">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function RoadmapSection() {
  const { progress, markTopicRead, activeSubSection, settings, setLastViewedTopic } = useAppStore()
  const { t } = useTranslation()
  const [expandedId, setExpandedId] = useState<string | null>(activeSubSection || null)
  const isQuickReview = settings.learningMode === 'quickReview'
  const topicRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Track last viewed topic on initial load and when expandedId changes
  useEffect(() => {
    if (expandedId) {
      setLastViewedTopic(expandedId)
      // Scroll to the expanded card after a brief delay to allow expansion animation
      const timer = setTimeout(() => {
        const el = topicRefs.current[expandedId]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [expandedId, setLastViewedTopic])

  const totalTopics = roadmapTopics.length
  const completedCount = progress.readTopics.length
  const progressPercent = Math.round((completedCount / totalTopics) * 100)
  const preparednessScore = Math.min(100, Math.round(
    (completedCount * 8) +
    (progress.quizScores.filter(q => (q.score / q.total) >= 0.7).length * 5) +
    (progress.completedSimulations.length * 4) +
    (progress.streak * 2)
  ))

  // Continue Learning: find first incomplete topic
  const continueTopic = roadmapTopics.find(t => !progress.readTopics.includes(t.id))
  const tc = useTranslatedContent()

  // Suggested path ordering
  const displayTopics = progress.suggestedPath.length > 0
    ? [
        ...progress.suggestedPath
          .map(id => roadmapTopics.find(t => t.id === id))
          .filter(Boolean) as typeof roadmapTopics,
        ...roadmapTopics.filter(t => !progress.suggestedPath.includes(t.id))
      ]
    : roadmapTopics

  const handleToggle = (topicId: string) => {
    setExpandedId(expandedId === topicId ? null : topicId)
  }

  return (
    <div className="content-transition space-y-6 overflow-x-hidden w-full max-w-full">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="mode-toggle">
          <div
            className={cn(
              'mode-toggle-slider',
              isQuickReview ? 'left-1/2' : 'left-[3px]'
            )}
            style={{ width: 'calc(50% - 3px)' }}
          />
          <button
            className={cn('mode-toggle-option', !isQuickReview && 'active')}
            onClick={() => useAppStore.getState().updateSettings({ learningMode: 'learning' })}
          >
            {t('roadmap.learningMode')}
          </button>
          <button
            className={cn('mode-toggle-option', isQuickReview && 'active')}
            onClick={() => useAppStore.getState().updateSettings({ learningMode: 'quickReview' })}
          >
            {t('roadmap.quickReviewMode')}
          </button>
        </div>

        {/* Streak & Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50">
            <Flame className={cn('w-4 h-4', progress.streak > 0 ? 'text-orange-500 streak-fire' : 'text-muted-foreground')} />
            <span className={cn('text-xs font-bold', progress.streak > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground')}>
              {progress.streak}d
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{progress.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Continue Learning Banner */}
      {continueTopic && !isQuickReview && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-ems-teal/5 card-modern">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{t('roadmap.continueWhere')}</p>
                  <p className="text-sm font-bold text-foreground truncate">{continueTopic ? tc.getTopicTitle(continueTopic) : ''}</p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-ems-teal hover:bg-ems-teal/90 shadow-sm shadow-ems-teal/20 flex-shrink-0"
                onClick={() => handleToggle(continueTopic.id)}
              >
                {t('common.resume')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Overview - Enhanced */}
      <Card className="border-l-4 border-l-ems-teal overflow-hidden card-modern">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">{t('roadmap.progress')}</h2>
              <p className="text-sm text-muted-foreground">
                <AnimatedCounter target={completedCount} /> of {totalTopics} {t('roadmap.modulesCompleted')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {progressPercent === 100 ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-xs">🏆 {t('roadmap.complete')}</Badge>
              ) : (
                <Badge variant="outline" className="text-ems-teal border-ems-teal text-sm font-bold">
                  <AnimatedCounter target={progressPercent} />%
                </Badge>
              )}
            </div>
          </div>
          <Progress value={progressPercent} className="h-3 progress-bar-animated [&>div]:bg-gradient-to-r [&>div]:from-ems-teal [&>div]:to-ems-teal/70 [&>div]:transition-all [&>div]:duration-700" />

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">{progress.xp}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">{t('roadmap.totalXp')}</p>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-orange-50/50 dark:bg-orange-950/20 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                <span className="text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">{progress.streak}d</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">{t('roadmap.dayStreak')}</p>
            </div>
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-green-50/50 dark:bg-green-950/20 text-center">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">{preparednessScore}%</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">{t('roadmap.prepared')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Assessment */}
      <DiagnosticAssessment />

      {/* Suggested path indicator */}
      {progress.suggestedPath.length > 0 && progress.diagnosticCompleted && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/10">
          <Star className="w-4 h-4 text-primary" />
          <p className="text-xs text-foreground/70">
            <span className="font-semibold text-primary">{t('roadmap.personalizedPath')}</span>
          </p>
        </div>
      )}

      {/* Quick Review Mode */}
      {isQuickReview ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <RotateCcw className="w-4 h-4 text-ems-teal" />
            <h3 className="font-bold text-sm text-foreground">{t('roadmap.quickReviewMode')} — {t('roadmap.tapToFlip')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayTopics.map((topic) => (
              <QuickReviewCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      ) : (
        /* Timeline - Visual Progress Journey */
        <div className="relative pl-4 sm:pl-10 md:pl-12">
          {/* Timeline line - animated gradient */}
          <div
            className="absolute left-[8px] sm:left-[21px] md:left-[25px] top-4 bottom-4 w-1 rounded-full"
            style={{
              background: `linear-gradient(to bottom, #2EC4B6 ${progressPercent}%, #DEE2E6 ${progressPercent}%)`,
              transition: 'background 0.7s ease',
            }}
          />

          {/* Topic cards */}
          <div className="space-y-5">
            {displayTopics.map((topic, index) => {
              const isCompleted = progress.readTopics.includes(topic.id)
              const isExpanded = expandedId === topic.id
              const isSuggested = progress.suggestedPath.length > 0 && progress.suggestedPath.indexOf(topic.id) < 3 && !isCompleted
              const moduleProgress = progress.moduleProgress[topic.id]
              const sectionsCompleted = moduleProgress?.sectionsCompleted.length || 0
              const totalSections = topic.sections.length
              const isBookmarked = progress.bookmarks.includes(topic.id)

              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isCompleted={isCompleted}
                  isExpanded={isExpanded}
                  isSuggested={isSuggested}
                  isBookmarked={isBookmarked}
                  sectionsCompleted={sectionsCompleted}
                  totalSections={totalSections}
                  index={index}
                  onToggle={() => handleToggle(topic.id)}
                  onMarkRead={() => markTopicRead(topic.id)}
                  cardRef={(el) => { topicRefs.current[topic.id] = el }}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

interface TopicCardProps {
  topic: typeof roadmapTopics[0]
  isCompleted: boolean
  isExpanded: boolean
  isSuggested: boolean
  isBookmarked: boolean
  sectionsCompleted: number
  totalSections: number
  index: number
  onToggle: () => void
  onMarkRead: () => void
  cardRef?: (el: HTMLDivElement | null) => void
}

function TopicCard({ topic, isCompleted, isExpanded, isSuggested, isBookmarked, sectionsCompleted, totalSections, onToggle, onMarkRead, cardRef }: TopicCardProps) {
  const { progress, toggleBookmark } = useAppStore()
  const { t } = useTranslation()
  const tc = useTranslatedContent()
  const timeSpent = progress.timeSpent[topic.id] || 0
  const minutesSpent = Math.round(timeSpent / 60)
  const hasModuleQuiz = ['osh', 'first-aider', 'chain-of-survival'].includes(topic.id)

  // Translated content
  const topicTitle = tc.getTopicTitle(topic)
  const topicShortDesc = tc.getTopicShortDesc(topic)
  const topicContent = tc.getTopicContent(topic)
  const topicKeyPoints = tc.getTopicKeyPoints(topic)
  const topicOutcomes = tc.getTopicOutcomes(topic)
  const topicWhatYoullLearn = tc.getTopicWhatYoullLearn(topic)
  const topicQuickNotes = tc.getTopicQuickNotes(topic)

  useTimeTracker(topic.id, isExpanded)

  // Status logic
  const isInProgress = sectionsCompleted > 0 && !isCompleted
  const statusLabel = isCompleted ? t('common.completed') : isInProgress ? t('common.inProgress') : isSuggested ? t('common.recommended') : topic.isCritical ? t('common.criticalSkill') : ''
  const statusIcon = isCompleted ? '✅' : isInProgress ? '⏳' : isSuggested ? '🔥' : topic.isCritical ? '🚑' : ''
  const statusColor = isCompleted ? 'text-green-600 bg-green-50 dark:bg-green-950/30' : isInProgress ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' : isSuggested ? 'text-ems-red bg-ems-red/5' : topic.isCritical ? 'text-ems-red bg-ems-red/5' : ''

  return (
    <div className="relative" ref={cardRef}>
      {/* Timeline node - Enhanced */}
      <div
        className={cn(
          'absolute left-[-12px] sm:left-[-26px] md:left-[-30px] top-6 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-[3px] z-10 flex items-center justify-center transition-all duration-500',
          isCompleted
            ? 'bg-ems-teal border-ems-teal scale-110 status-dot-active'
            : isInProgress
              ? 'bg-primary border-primary scale-105 status-dot-active'
              : isSuggested
                ? 'bg-card border-ems-red'
                : 'bg-card border-muted-foreground/30'
        )}
      >
        {isCompleted && <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />}
        {isInProgress && <div className="w-2 h-2 rounded-full bg-white" />}
        {!isCompleted && !isInProgress && isSuggested && (
          <Sparkles className="w-3 h-3 text-ems-red" />
        )}
      </div>

      {/* Connector line segment */}
      {isCompleted && (
        <div className="absolute left-[-8px] sm:left-[-22px] md:left-[-24px] top-[52px] bottom-[-20px] w-1 bg-ems-teal/20 z-0" />
      )}

      {/* Card - Modern Redesign */}
      <Card
        className={cn(
          'card-modern cursor-pointer group overflow-hidden',
          isCompleted && 'border-ems-teal/20 bg-gradient-to-br from-ems-teal/5 to-transparent',
          isExpanded && 'card-active-glow',
          isSuggested && !isCompleted && 'border-ems-red/20',
          topic.isCritical && !isCompleted && !isSuggested && 'border-ems-red/10'
        )}
        onClick={onToggle}
      >
        {/* Category color strip */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: topic.categoryColor }}
        />

        <CardContent className="p-5 md:p-6">
          {/* Header Row */}
          <div className="flex items-start gap-4">
            {/* Topic icon with category-colored background */}
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all shadow-sm',
                isExpanded && 'scale-110'
              )}
              style={{ backgroundColor: topic.categoryColor + '18' }}
            >
              {topic.icon}
            </div>

            <div className="flex-1 min-w-0">
              {/* Badges row */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0 mb-1.5">
                <Badge
                  className="text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold min-w-0 break-words"
                  style={{ backgroundColor: topic.categoryColor, color: 'white' }}
                >
                  {topic.badge}
                </Badge>
                <DifficultyBadge difficulty={topic.difficulty} />
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                  <Clock className="w-3 h-3 flex-shrink-0" /> {topic.estimatedMinutes}min
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-semibold whitespace-nowrap">
                  <Zap className="w-3 h-3 flex-shrink-0" /> +{topic.xpReward}XP
                </span>

                {/* Status label */}
                {statusLabel && (
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', statusColor)}>
                    {statusIcon} {statusLabel}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-foreground text-base md:text-lg leading-tight break-words">{topicTitle}</h3>
              <div className="flex items-start gap-1 mt-1">
                <SpeakerButton text={topicShortDesc} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed break-words">
                {topicShortDesc}
              </p>
            </div>
          </div>

          {/* "What You'll Learn" Preview */}
          {!isExpanded && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topicWhatYoullLearn.slice(0, 4).map((item, i) => (
                <div key={i} className="knowledge-block !p-2.5 !gap-2">
                  <span className="text-xs text-foreground/70 break-words">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mini Progress Bar */}
          {!isExpanded && (isInProgress || isCompleted) && (
            <div className="mt-3 flex items-center gap-3">
              <MiniProgressBar completed={isCompleted ? totalSections : sectionsCompleted} total={totalSections} />
              <span className="text-[10px] text-muted-foreground">
                {isCompleted ? totalSections : sectionsCompleted}/{totalSections} {t('roadmap.sections')}
              </span>
              {minutesSpent > 0 && (
                <span className="text-[10px] text-primary font-medium">{minutesSpent} {t('roadmap.minSpent')}</span>
              )}
            </div>
          )}

          {/* CTA Row */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-semibold text-primary hover:text-primary"
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
            >
              {isExpanded ? (
                <><ChevronUp className="w-4 h-4 mr-1" /> {t('roadmap.collapse')}</>
              ) : isCompleted ? (
                <><Eye className="w-4 h-4 mr-1" /> {t('roadmap.reviewNotes')}</>
              ) : isInProgress ? (
                <><Play className="w-4 h-4 mr-1" /> {t('roadmap.continueLesson')}</>
              ) : (
                <><Play className="w-4 h-4 mr-1" /> {t('roadmap.startLesson')}</>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleBookmark(topic.title)
                }}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-ems-teal" />
                ) : (
                  <Bookmark className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </div>
          </div>

          {/* Expanded content */}
          {isExpanded && (
            <div className="mt-5 pt-5 border-t border-border content-transition space-y-5">
              {/* TTS Read Full Lesson */}
              <div className="flex items-center gap-2">
                <SpeakerButton text={topicContent} size="sm" />
                <span className="text-xs text-muted-foreground">{t('roadmap.readFullLesson')}</span>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-ems-teal" /> {t('roadmap.learningOutcomes')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topicOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-ems-teal/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ems-teal flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground/80">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Knowledge Blocks */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> {t('roadmap.keyTopics')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topicWhatYoullLearn.map((item, i) => (
                    <div key={i} className="knowledge-block !p-2.5 !gap-2">
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson Content */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> {t('roadmap.fullLesson')}
                </h4>
                <div className="prose prose-sm max-w-none">
                  {topicContent.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-sm text-foreground/80 mb-3 leading-relaxed break-words">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Key Points - enhanced */}
              {topicKeyPoints.length > 0 && (
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" /> {t('roadmap.keyPoints')}
                    </h4>
                    <SpeakerButton text={topicKeyPoints.join('. ')} size="xs" />
                  </div>
                  <ul className="space-y-2">
                    {topicKeyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span
                          className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: topic.categoryColor + '18', color: topic.categoryColor }}
                        >
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Notes - expandable */}
              <div>
                <details className="group">
                  <summary className="font-semibold text-sm cursor-pointer flex items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    {t('roadmap.quickReviewNotes')}
                    <ChevronDown className="w-4 h-4 ml-auto transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-2 space-y-3 p-3">
                    <div>
                      <h5 className="text-xs font-bold text-ems-teal mb-1">{t('roadmap.keyTerms')}</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {topicQuickNotes.keyTerms.map((term) => (
                          <Badge key={term} variant="outline" className="text-[10px]">{term}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-green-600 mb-1">{t('roadmap.importantProtocols')}</h5>
                      <ul className="space-y-1">
                        {topicQuickNotes.protocols.map((p, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-amber-600 mb-1">{t('roadmap.mnemonics')}</h5>
                      <ul className="space-y-1">
                        {topicQuickNotes.mnemonics.map((m, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                            <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-ems-red mb-1">{t('roadmap.commonMistakes')}</h5>
                      <ul className="space-y-1">
                        {topicQuickNotes.commonMistakes.map((m, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-ems-red flex-shrink-0 mt-0.5" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-xs font-bold text-primary">{t('roadmap.summary')}</h5>
                        <SpeakerButton text={topicQuickNotes.summary} size="xs" />
                      </div>
                      <p className="text-xs text-foreground/70">{topicQuickNotes.summary}</p>
                    </div>
                  </div>
                </details>
              </div>

              {/* Chain of Survival special content */}
              {topic.id === 'chain-of-survival' && <ChainOfSurvivalDiagram />}

              {/* Module Quiz */}
              {hasModuleQuiz && (
                <div>
                  <ModuleQuiz topicId={topic.id} topicTitle={topic.title} />
                </div>
              )}

              {/* Mark as Complete - enhanced CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                  <Zap className="w-3 h-3" /> +{topic.xpReward} {t('roadmap.xpOnCompletion')}
                </span>
                <Button
                  variant={isCompleted ? 'outline' : 'default'}
                  size="sm"
                  className={cn(
                    isCompleted
                      ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30'
                      : 'bg-ems-teal hover:bg-ems-teal/90 shadow-sm shadow-ems-teal/20'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkRead()
                  }}
                >
                  {isCompleted ? (
                    <><CheckCircle2 className="w-4 h-4 mr-1" /> {t('common.completed')}</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4 mr-1" /> {t('roadmap.markComplete')}</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ChainOfSurvivalDiagram() {
  const [activeLink, setActiveLink] = useState<number | null>(null)
  const { t } = useTranslation()

  const links = [
    { num: 1, title: t('chain.recognition'), color: '#E63946', desc: 'Early recognition of cardiac arrest and activation of emergency response' },
    { num: 2, title: t('chain.highQualityCpr'), color: '#1E3A5F', desc: 'Immediate high-quality cardiopulmonary resuscitation with minimal interruptions' },
    { num: 3, title: t('chain.defibrillation'), color: '#2EC4B6', desc: 'Rapid defibrillation with AED within minutes of collapse' },
    { num: 4, title: t('chain.advancedResus'), color: '#845EC2', desc: 'Advanced life support with airway management and medications' },
    { num: 5, title: t('chain.postCardiac'), color: '#F4A261', desc: 'Integrated post-cardiac arrest care including targeted temperature management' },
    { num: 6, title: t('chain.recovery'), color: '#0081CF', desc: 'Survivor recovery and rehabilitation (NEW in AHA 2025)' },
  ]

  const aha2020vs2025 = [
    { aspect: 'Number of Links', aha2020: '5 links', aha2025: '6 links' },
    { aspect: 'Recovery Link', aha2020: 'Not included', aha2025: 'Added as 6th link' },
    { aspect: 'CPR Emphasis', aha2020: 'High-quality CPR', aha2025: 'High-quality CPR + dispatcher-assisted CPR' },
    { aspect: 'Technology', aha2020: 'AED use', aha2025: 'AED + smart device alerts' },
    { aspect: 'Post-Arrest', aha2020: 'Hospital care', aha2025: 'Integrated care pathway + rehab' },
    { aspect: 'Recovery Focus', aha2020: 'Not specified', aha2025: 'Structured recovery & follow-up' },
  ]

  return (
    <div className="mt-6 space-y-6 overflow-hidden w-full">
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-ems-red/20 flex items-center justify-center text-ems-red text-xs font-bold">⚡</span>
          {t('roadmap.interactiveChain')}
        </h4>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-3">
          {links.map((link) => (
            <button
              key={link.num}
              className={cn(
                'chain-link rounded-xl p-3 text-center border-2 transition-all card-modern',
                activeLink === link.num ? 'border-primary shadow-lg' : 'border-transparent'
              )}
              style={{ backgroundColor: link.color + '15' }}
              onClick={() => setActiveLink(activeLink === link.num ? null : link.num)}
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: link.color }}
              >
                {link.num}
              </div>
              <p className="text-xs font-semibold" style={{ color: link.color }}>{link.title}</p>
              {link.num < 6 && (
                <span className="text-lg text-muted-foreground block sm:hidden">↓</span>
              )}
            </button>
          ))}
        </div>

        {activeLink !== null && (
          <div className="mt-3 p-3 rounded-lg bg-muted/70 content-transition">
            {(() => {
              const link = links[activeLink - 1]
              return (
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-sm" style={{ color: link.color }}>
                      Link {link.num}: {link.title}
                    </h5>
                    <SpeakerButton text={`Link ${link.num}: ${link.title}. ${link.desc}`} size="xs" />
                  </div>
                  <p className="text-sm text-foreground/70 mt-1">{link.desc}</p>
                </div>
              )
            })()}
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold text-sm mb-3">{t('roadmap.comparison')}</h4>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-0 sm:min-w-[500px] text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-3 py-2 text-left font-semibold">{t('roadmap.aspect')}</th>
                <th className="px-3 py-2 text-left font-semibold text-primary">AHA 2020</th>
                <th className="px-3 py-2 text-left font-semibold text-ems-teal">AHA 2025</th>
              </tr>
            </thead>
            <tbody>
              {aha2020vs2025.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                  <td className="px-3 py-2 font-medium">{row.aspect}</td>
                  <td className="px-3 py-2 text-foreground/70">{row.aha2020}</td>
                  <td className="px-3 py-2 text-foreground/70">{row.aha2025}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
