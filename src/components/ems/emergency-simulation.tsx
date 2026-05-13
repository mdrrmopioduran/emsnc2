'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/store/app-store'
import { emergencyScenarios, EmergencyScenario, ScenarioStep, ScenarioChoice } from '@/data/emergency-scenarios'
import {
  ChevronRight, ChevronLeft, RotateCcw, Trophy, Heart, Activity,
  AlertTriangle, CheckCircle2, XCircle, Clock, ArrowRight, Zap,
  Thermometer, Droplets, Wind, Shield, Star, Lock, Unlock,
  PlayCircle, BookOpen, Sparkles, Info, X, ArrowLeft, Stethoscope
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { SpeakerButton } from '@/components/ems/tts-button'

// ==================== ANIMATION VARIANTS ====================
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
}

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.07 }
  }
}

const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

// ==================== DIFFICULTY CONFIG ====================
const difficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', stars: 1 },
  intermediate: { label: 'Intermediate', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', stars: 2 },
  advanced: { label: 'Advanced', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', stars: 3 },
}

// ==================== VITAL SIGNS PANEL ====================
function VitalSignsPanel({ vitals, color }: { vitals: { hr: number; bp: string; rr: number; spo2: number; status: string }; color: string }) {
  if (!vitals) return null
  const getStatusColor = (status: string) => {
    const s = status.toUpperCase()
    if (s.includes('ARREST') || s.includes('CRITICAL') || s.includes('DETERIORATING') || s.includes('ISCHEMIA')) return 'text-red-500'
    if (s.includes('UNSTABLE') || s.includes('SHOCK') || s.includes('HYPO') || s.includes('HEMORRHAG') || s.includes('DELAYED') || s.includes('RISK') || s.includes('UNSUPPORTED') || s.includes('TENSION') || s.includes('INADEQUATE')) return 'text-amber-500'
    if (s.includes('IMPROVING') || s.includes('STABLE') || s.includes('ROSC') || s.includes('COOLING') || s.includes('SPLINTED')) return 'text-emerald-500'
    if (s.includes('TRANSPORT') || s.includes('ARRIVAL')) return 'text-blue-500'
    return 'text-muted-foreground'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-border/50 overflow-hidden"
    >
      <div className="px-3 py-2 flex items-center gap-2 border-b border-border/30" style={{ background: `linear-gradient(90deg, ${color}15, ${color}05)` }}>
        <Activity className="w-3.5 h-3.5" style={{ color }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>Patient Status</span>
        <SpeakerButton text={`Heart rate ${vitals.hr}, Blood pressure ${vitals.bp}, Respiratory rate ${vitals.rr}, Oxygen saturation ${vitals.spo2}%, Status: ${vitals.status}`} size="xs" className="ml-auto" />
      </div>
      <div className="p-3 space-y-2.5 bg-card">
        <div className="text-center py-1.5 rounded-lg" style={{ background: `${color}08` }}>
          <p className={cn('text-xs font-bold tracking-wider', getStatusColor(vitals.status))}>{vitals.status}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <VitalItem icon={<Heart className="w-3 h-3 text-red-400" />} label="HR" value={vitals.hr > 0 ? `${vitals.hr}` : '—'} alert={vitals.hr > 120 || vitals.hr === 0} />
          <VitalItem icon={<Droplets className="w-3 h-3 text-blue-400" />} label="BP" value={vitals.bp} alert={vitals.bp.includes('Unobtainable') || vitals.bp.includes('Palpable')} />
          <VitalItem icon={<Wind className="w-3 h-3 text-cyan-400" />} label="RR" value={vitals.rr > 0 ? `${vitals.rr}` : '—'} alert={vitals.rr > 28 || vitals.rr === 0} />
          <VitalItem icon={<Activity className="w-3 h-3 text-emerald-400" />} label="SpO₂" value={vitals.spo2 > 0 ? `${vitals.spo2}%` : '—'} alert={vitals.spo2 < 90 && vitals.spo2 > 0} />
        </div>
      </div>
    </motion.div>
  )
}

function VitalItem({ icon, label, value, alert }: { icon: React.ReactNode; label: string; value: string; alert: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-muted/30">
      {icon}
      <span className="text-[9px] text-muted-foreground font-medium">{label}</span>
      <span className={cn('text-xs font-bold ml-auto tabular-nums', alert ? 'text-red-500' : 'text-foreground')}>{value}</span>
    </div>
  )
}

// ==================== SCENARIO CARD (Gallery) ====================
function ScenarioCard({ scenario, isCompleted, onSelect, index }: {
  scenario: EmergencyScenario
  isCompleted: boolean
  onSelect: () => void
  index: number
}) {
  const diff = difficultyConfig[scenario.difficulty]
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer overflow-hidden border-border/40 hover:border-primary/30 transition-all duration-300 group h-full"
        onClick={onSelect}
      >
        <CardContent className="p-0">
          {/* Gradient header */}
          <div
            className="relative h-24 flex items-end p-3 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${scenario.color}30, ${scenario.color}10)` }}
          >
            {/* Icon */}
            <span className="absolute top-2 right-3 text-3xl opacity-40 group-hover:opacity-70 transition-opacity group-hover:scale-110 transform duration-300">
              {scenario.icon}
            </span>
            {/* Completed badge */}
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 left-2"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}
            {/* Title */}
            <div className="relative z-10 flex-1 min-w-0">
              <h3 className="font-bold text-sm leading-tight">{scenario.title}</h3>
              <p className="text-[10px] text-muted-foreground font-medium">{scenario.subtitle}</p>
            </div>
            <SpeakerButton text={`${scenario.title}. ${scenario.description}`} size="xs" className="relative z-10 flex-shrink-0" />
          </div>

          {/* Body */}
          <div className="p-3 space-y-2">
            {/* Tags row */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="outline" className={cn('text-[9px] px-1.5 py-0', diff.color, diff.bg, diff.border)}>
                {diff.label}
              </Badge>
              <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" /> {scenario.duration}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              {scenario.description}
            </p>

            {/* Objectives preview */}
            <div className="flex flex-wrap gap-1">
              {scenario.objectives.slice(0, 3).map((obj, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                  {obj}
                </span>
              ))}
              {scenario.objectives.length > 3 && (
                <span className="text-[9px] text-muted-foreground">+{scenario.objectives.length - 3}</span>
              )}
            </div>

            {/* Start button */}
            <Button
              size="sm"
              className="w-full h-7 text-[11px] gap-1.5 mt-1"
              style={{ backgroundColor: scenario.color }}
              onClick={(e) => { e.stopPropagation(); onSelect() }}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              {isCompleted ? 'Replay' : 'Start Simulation'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ==================== CHOICE BUTTON ====================
function ChoiceButton({ choice, index, onSelect, disabled, showResult, wasSelected }: {
  choice: ScenarioChoice
  index: number
  onSelect: () => void
  disabled: boolean
  showResult: boolean
  wasSelected: boolean
}) {
  const letter = String.fromCharCode(65 + index)
  const isCorrect = choice.isCorrect

  let borderColor = 'border-border/60 hover:border-primary/40'
  let bgColor = 'bg-card'
  if (showResult && wasSelected) {
    borderColor = isCorrect ? 'border-emerald-500/60' : 'border-red-500/60'
    bgColor = isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-red-50 dark:bg-red-950/20'
  } else if (showResult && !wasSelected && isCorrect) {
    borderColor = 'border-emerald-500/40'
    bgColor = 'bg-emerald-50/50 dark:bg-emerald-950/10'
  }

  return (
    <motion.button
      variants={staggerItem}
      whileHover={!disabled ? { scale: 1.01, x: 4 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      className={cn(
        'w-full text-left p-3 rounded-xl border-2 transition-all duration-200 flex items-start gap-3',
        borderColor, bgColor,
        !disabled && 'cursor-pointer',
        disabled && 'opacity-70 cursor-default'
      )}
      onClick={onSelect}
      disabled={disabled}
    >
      {/* Letter badge */}
      <div className={cn(
        'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-colors',
        showResult && wasSelected
          ? isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          : showResult && isCorrect ? 'bg-emerald-500/20 text-emerald-600'
          : 'bg-primary/10 text-primary'
      )}>
        {showResult && wasSelected ? (
          isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />
        ) : showResult && isCorrect ? (
          <CheckCircle2 className="w-3.5 h-3.5" />
        ) : letter}
      </div>

      {/* Choice text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm leading-relaxed break-words">{choice.text}</p>
      </div>
    </motion.button>
  )
}

// ==================== FEEDBACK PANEL ====================
function FeedbackPanel({ choice, onContinue }: { choice: ScenarioChoice; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'rounded-xl border-2 overflow-hidden',
        choice.isCorrect
          ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/20'
          : 'border-red-500/40 bg-red-50 dark:bg-red-950/20'
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center gap-2 px-4 py-2.5',
        choice.isCorrect
          ? 'bg-emerald-500/10 border-b border-emerald-500/20'
          : 'bg-red-500/10 border-b border-red-500/20'
      )}>
        {choice.isCorrect ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        ) : (
          <XCircle className="w-4 h-4 text-red-500" />
        )}
        <span className={cn('text-sm font-bold', choice.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
          {choice.isCorrect ? 'Correct Decision!' : 'Incorrect Decision'}
        </span>
        <SpeakerButton text={choice.feedback} size="xs" className="ml-1" />
        <Sparkles className={cn('w-3.5 h-3.5 ml-auto', choice.isCorrect ? 'text-emerald-500' : 'text-red-500')} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <p className="text-sm leading-relaxed break-words">{choice.feedback}</p>

        {/* Consequence warning */}
        {choice.consequence && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed break-words">{choice.consequence}</p>
          </motion.div>
        )}

        {/* Continue button */}
        <div className="flex justify-end pt-1">
          <Button
            size="sm"
            className={cn('gap-1.5 text-xs h-8', choice.isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700')}
            onClick={onContinue}
          >
            Continue <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// ==================== COMPLETION SCREEN ====================
function CompletionScreen({ scenario, pathHistory, onRetry, onBack }: {
  scenario: EmergencyScenario
  pathHistory: { stepId: string; choiceText: string; isCorrect: boolean; feedback: string }[]
  onRetry: () => void
  onBack: () => void
}) {
  const correctCount = pathHistory.filter(p => p.isCorrect).length
  const totalCount = pathHistory.length
  const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  const getGrade = () => {
    if (scorePercent >= 90) return { label: 'Outstanding', emoji: '🏆', color: 'text-yellow-500' }
    if (scorePercent >= 80) return { label: 'Excellent', emoji: '⭐', color: 'text-emerald-500' }
    if (scorePercent >= 60) return { label: 'Good Effort', emoji: '👍', color: 'text-blue-500' }
    if (scorePercent >= 40) return { label: 'Needs Practice', emoji: '📚', color: 'text-amber-500' }
    return { label: 'Keep Learning', emoji: '💪', color: 'text-red-500' }
  }

  const grade = getGrade()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 overflow-x-hidden w-full max-w-full"
    >
      {/* Score card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Card className="overflow-hidden border-border/40">
          <div
            className="h-2"
            style={{ background: `linear-gradient(90deg, ${scenario.color}, ${scenario.color}60)` }}
          />
          <CardContent className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 300 }}
              className="text-5xl mb-3"
            >
              {grade.emoji}
            </motion.div>
            <h2 className="text-xl font-bold mb-1">{grade.label}!</h2>
            <p className="text-sm text-muted-foreground mb-4">{scenario.title} — Simulation Complete</p>

            {/* Score ring */}
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/20" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={scenario.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - scorePercent / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: scenario.color }}>{scorePercent}%</span>
                <span className="text-[10px] text-muted-foreground">Score</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{correctCount}</span> of <span className="font-semibold text-foreground">{totalCount}</span> correct decisions
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Decision Summary */}
      <Card className="border-border/40">
        <div className="px-4 py-2.5 border-b border-border/30 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold">Decision Summary</span>
          <SpeakerButton text={pathHistory.map((p, i) => `Decision ${i + 1}: ${p.choiceText}. ${p.isCorrect ? 'Correct' : 'Incorrect'}. ${p.feedback}`).join('. ')} size="sm" className="ml-1" />
          <span className="text-[10px] text-muted-foreground ml-auto">{pathHistory.length} decisions made</span>
        </div>
        <CardContent className="p-3 max-h-64 overflow-y-auto custom-scrollbar">
          <div className="space-y-1.5">
            {pathHistory.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'flex items-start gap-2 p-2.5 rounded-lg text-xs',
                  p.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-red-50 dark:bg-red-950/20'
                )}
              >
                {p.isCorrect ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-medium leading-tight">{p.choiceText}</p>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{p.feedback}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Learning Points */}
      {scenario.steps && Object.values(scenario.steps).some(s => s.keyLearning) && (
        <Card className="border-border/40">
          <div className="px-4 py-2.5 border-b border-border/30 flex items-center gap-2" style={{ background: `${scenario.color}08` }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: scenario.color }} />
            <span className="text-xs font-semibold" style={{ color: scenario.color }}>Key Learning Points</span>
          </div>
          <CardContent className="p-3">
            <ul className="space-y-1.5">
              {Object.values(scenario.steps).filter(s => s.keyLearning).flatMap(s => s.keyLearning || []).map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex items-start gap-2 text-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: scenario.color }} />
                  <span className="leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRetry} className="flex-1 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Retry
        </Button>
        <Button onClick={onBack} className="flex-1 gap-1.5" style={{ backgroundColor: scenario.color }}>
          All Scenarios <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}

// ==================== MAIN COMPONENT ====================
export function EmergencySimulation() {
  const { addCompletedSimulation, addXp, progress } = useAppStore()
  const { toast } = useToast()

  // State
  const [activeScenario, setActiveScenario] = useState<EmergencyScenario | null>(null)
  const [currentStepId, setCurrentStepId] = useState('')
  const [pathHistory, setPathHistory] = useState<{ stepId: string; choiceText: string; isCorrect: boolean; feedback: string }[]>([])
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentChoice, setCurrentChoice] = useState<ScenarioChoice | null>(null)
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Get unique categories
  const categories = ['All', ...new Set(emergencyScenarios.map(s => s.category))]

  // Filter scenarios
  const filteredScenarios = emergencyScenarios.filter(s => {
    const matchesCategory = filterCategory === 'All' || s.category === filterCategory
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Start scenario
  const startScenario = useCallback((scenario: EmergencyScenario) => {
    setActiveScenario(scenario)
    setCurrentStepId(scenario.startStepId)
    setPathHistory([])
    setSelectedChoiceIdx(null)
    setShowFeedback(false)
    setCurrentChoice(null)
    setSimulationComplete(false)
  }, [])

  // Handle choice selection
  const handleChoice = useCallback((choice: ScenarioChoice, idx: number) => {
    if (showFeedback) return

    setSelectedChoiceIdx(idx)
    setCurrentChoice(choice)
    setShowFeedback(true)
    setPathHistory(prev => [...prev, {
      stepId: currentStepId,
      choiceText: choice.text,
      isCorrect: choice.isCorrect,
      feedback: choice.feedback
    }])
  }, [showFeedback, currentStepId])

  // Continue to next step
  const handleContinue = useCallback(() => {
    if (!currentChoice || !activeScenario) return

    const nextStepId = currentChoice.nextStepId
    const nextStep = activeScenario.steps[nextStepId]

    if (!nextStep || nextStep.isEnd) {
      // Simulation complete
      setSimulationComplete(true)
      addCompletedSimulation(activeScenario.id)
      addXp(currentChoice.isCorrect ? 30 : 10)
      toast({
        title: `${activeScenario.icon} Scenario Complete!`,
        description: `${activeScenario.title} — ${currentChoice.isCorrect ? 'Great work!' : 'Keep practicing!'}`
      })
    } else {
      // Go to next step
      setCurrentStepId(nextStepId)
      setSelectedChoiceIdx(null)
      setShowFeedback(false)
      setCurrentChoice(null)
    }
  }, [currentChoice, activeScenario, addCompletedSimulation, addXp, toast])

  // Reset
  const resetSimulation = useCallback(() => {
    setActiveScenario(null)
    setCurrentStepId('')
    setPathHistory([])
    setSelectedChoiceIdx(null)
    setShowFeedback(false)
    setCurrentChoice(null)
    setSimulationComplete(false)
  }, [])

  // Current step data
  const currentStep = activeScenario?.steps[currentStepId]
  const correctCount = pathHistory.filter(p => p.isCorrect).length
  const totalCount = pathHistory.length
  const progressPercent = currentStep ? Math.min(100, ((totalCount + 1) / Object.keys(activeScenario?.steps || {}).length) * 100) : 0

  // ==================== GALLERY VIEW ====================
  if (!activeScenario) {
    return (
      <div className="space-y-4 overflow-x-hidden w-full max-w-full">
        {/* Header */}
        <motion.div {...fadeIn}>
          <Card className="overflow-hidden border-border/40">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/10 to-amber-500/10">
                  <Shield className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h2 className="font-bold text-base">Emergency Scenario Simulations</h2>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Interactive branching scenarios that change based on your decisions. Make critical choices and see the consequences in real-time.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { label: 'Scenarios', value: emergencyScenarios.length, icon: <BookOpen className="w-3 h-3" /> },
                  { label: 'Completed', value: emergencyScenarios.filter(s => progress.completedSimulations.includes(s.id)).length, icon: <CheckCircle2 className="w-3 h-3" /> },
                  { label: 'Categories', value: categories.length - 1, icon: <Zap className="w-3 h-3" /> },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/30">
                    <span className="text-muted-foreground">{stat.icon}</span>
                    <span className="text-xs font-bold">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and filter */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scenarios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-border/60 bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 mt-2 custom-scrollbar flex-nowrap">
            {categories.map(cat => (
              <button
                key={cat}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all border flex-shrink-0',
                  filterCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border/40 hover:border-border/60'
                )}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scenario Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {filteredScenarios.map((scenario, idx) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isCompleted={progress.completedSimulations.includes(scenario.id)}
              onSelect={() => startScenario(scenario)}
              index={idx}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredScenarios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No scenarios match your search</p>
          </div>
        )}
      </div>
    )
  }

  // ==================== COMPLETION VIEW ====================
  if (simulationComplete) {
    return (
      <CompletionScreen
        scenario={activeScenario}
        pathHistory={pathHistory}
        onRetry={() => startScenario(activeScenario)}
        onBack={resetSimulation}
      />
    )
  }

  // ==================== ACTIVE SIMULATION VIEW ====================
  return (
    <div className="space-y-3 overflow-x-hidden w-full max-w-full">
      {/* Top bar: scenario info + progress */}
      <motion.div {...fadeIn} key={`header-${activeScenario.id}`}>
        <Card className="overflow-hidden border-border/40">
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${activeScenario.color}, ${activeScenario.color}60)` }} />
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  className="p-1 rounded-md hover:bg-muted/50 transition-colors"
                  onClick={resetSimulation}
                >
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="text-lg flex-shrink-0">{activeScenario.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm leading-tight truncate">{activeScenario.title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    Decision {totalCount + 1} • {correctCount}/{totalCount} correct
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn('text-[9px] px-1.5 py-0', difficultyConfig[activeScenario.difficulty].color, difficultyConfig[activeScenario.difficulty].bg)}>
                  {difficultyConfig[activeScenario.difficulty].label}
                </Badge>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <Progress value={progressPercent} className="h-1.5" style={{ ['--progress-color' as string]: activeScenario.color } as React.CSSProperties} />
              <div className="flex items-center gap-0.5 justify-center">
                {pathHistory.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn('w-2 h-2 rounded-full', p.isCorrect ? 'bg-emerald-500' : 'bg-red-500')}
                  />
                ))}
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main content: narrative + vitals */}
      {currentStep && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-full">
          {/* Narrative & choices */}
          <div className="md:col-span-2 space-y-3 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-3"
              >
                {/* Narrative card */}
                <Card className="border-border/40 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg" style={{ background: `${activeScenario.color}15` }}>
                        <Info className="w-3.5 h-3.5" style={{ color: activeScenario.color }} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Scenario</span>
                      <SpeakerButton text={currentStep.narrative} size="sm" className="ml-auto" />
                    </div>

                    <p className="text-sm leading-relaxed mb-3 break-words">{currentStep.narrative}</p>

                    {/* Clinical findings */}
                    {currentStep.clinicalFindings && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.2 }}
                        className="p-3 rounded-lg border border-border/40 bg-muted/20"
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <StethoscopeIcon className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Clinical Findings</span>
                          <SpeakerButton text={currentStep.clinicalFindings || ''} size="xs" className="ml-auto" />
                        </div>
                        <p className="text-xs leading-relaxed text-foreground/80 break-words">{currentStep.clinicalFindings}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Choices or feedback */}
                {!showFeedback ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 px-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-semibold">What do you do?</span>
                    </div>
                    {currentStep.choices.map((choice, idx) => (
                      <ChoiceButton
                        key={idx}
                        choice={choice}
                        index={idx}
                        onSelect={() => handleChoice(choice, idx)}
                        disabled={false}
                        showResult={false}
                        wasSelected={false}
                      />
                    ))}
                  </motion.div>
                ) : (
                  currentChoice && (
                    <div className="space-y-2">
                      {/* Show all choices with result highlighting */}
                      <div className="space-y-2">
                        {currentStep.choices.map((choice, idx) => (
                          <ChoiceButton
                            key={idx}
                            choice={choice}
                            index={idx}
                            onSelect={() => {}}
                            disabled={true}
                            showResult={true}
                            wasSelected={idx === selectedChoiceIdx}
                          />
                        ))}
                      </div>
                      <FeedbackPanel choice={currentChoice} onContinue={handleContinue} />
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar: Vital signs */}
          <div className="space-y-3 min-w-0">
            {currentStep.vitalSigns && (
              <VitalSignsPanel vitals={currentStep.vitalSigns} color={activeScenario.color} />
            )}

            {/* Scenario objectives */}
            <Card className="border-border/40 overflow-hidden">
              <div className="px-3 py-2 border-b border-border/30 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Objectives</span>
              </div>
              <CardContent className="p-3">
                <ul className="space-y-1.5">
                  {activeScenario.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: activeScenario.color }} />
                      <span className="leading-relaxed text-muted-foreground">{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {activeScenario.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== HELPER ICONS ====================
function StethoscopeIcon({ className }: { className?: string }) {
  return <Stethoscope className={className} />
}

function Target({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
}
