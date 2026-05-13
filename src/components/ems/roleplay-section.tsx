'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { roleplayScenarios, type RoleplayScenario, type DialogueLine } from '@/data/roleplay-scenarios'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Play, Clock, BookOpen, CheckCircle2, XCircle, ArrowRight,
  RotateCcw, ChevronDown, ChevronUp, Pause, SkipForward,
  AlertTriangle, Volume2, VolumeX, Eye, Lightbulb,
  MessageSquare, ClipboardList, X, Trophy, Timer, Zap,
  ChevronLeft, ListChecks, BookText, Activity
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

// ==================== TYPES ====================
type ViewMode = 'gallery' | 'simulation' | 'study' | 'review'
type PatientStatus = 'CRITICAL' | 'STABLE' | 'IMPROVING'

const SPEAKER_COLORS: Record<string, string> = {
  ASSESSOR: 'text-purple-600 dark:text-purple-400',
  TL: 'text-blue-700 dark:text-blue-400',
  DRIVER: 'text-green-600 dark:text-green-400',
  R1: 'text-teal-600 dark:text-teal-400',
  R2: 'text-orange-600 dark:text-orange-400',
  PATIENT: 'text-red-600 dark:text-red-400',
  NARRATOR: 'text-gray-500 dark:text-gray-400 italic',
}

const SPEAKER_BG: Record<string, string> = {
  ASSESSOR: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
  TL: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
  DRIVER: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
  R1: 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800',
  R2: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
  PATIENT: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
  NARRATOR: 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800',
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ==================== GALLERY VIEW ====================
function ScenarioGallery({ onSelect, onStudy, onReview }: {
  onSelect: (id: string) => void
  onStudy: (id: string) => void
  onReview: (id: string) => void
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Role-Playing Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Practice TESDA PIO DURAN EMS NCII competency scenarios with interactive dialogue scripts.
            Choose a scenario to simulate the full team response, study the script, or do a quick review.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {roleplayScenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            onStart={() => onSelect(scenario.id)}
            onStudy={() => onStudy(scenario.id)}
            onReview={() => onReview(scenario.id)}
          />
        ))}
      </div>
    </div>
  )
}

function ScenarioCard({ scenario, onStart, onStudy, onReview }: {
  scenario: RoleplayScenario
  onStart: () => void
  onStudy: () => void
  onReview: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const borderStyle = { borderTopWidth: '4px', borderTopColor: scenario.color }

  return (
    <Card
      className={cn(
        'transition-all duration-200 overflow-hidden',
        hovered ? 'shadow-lg -translate-y-1' : 'shadow-sm'
      )}
      style={borderStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{scenario.icon}</span>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{scenario.title}</h3>
              <p className="text-xs text-muted-foreground">{scenario.subtitle}</p>
            </div>
          </div>
          <Badge className={cn('text-[10px] px-2', DIFFICULTY_STYLES[scenario.difficulty])}>
            {scenario.difficulty}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{scenario.description}</p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{scenario.duration} min</span>
          <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{scenario.patients}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {scenario.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-[10px] px-1.5 py-0">
              {skill}
            </Badge>
          ))}
          {scenario.skills.length > 3 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              +{scenario.skills.length - 3} more
            </Badge>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 text-xs h-8" onClick={onStart}>
            <Play className="w-3 h-3 mr-1" /> Start Simulation
          </Button>
          <Button size="sm" variant="outline" className="text-xs h-8" onClick={onStudy}>
            <BookOpen className="w-3 h-3 mr-1" /> Study
          </Button>
          <Button size="sm" variant="ghost" className="text-xs h-8" onClick={onReview}>
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== SIMULATION MODE ====================
function SimulationMode({ scenario, onBack }: {
  scenario: RoleplayScenario
  onBack: () => void
}) {
  const { addXp, addCompletedSimulation } = useAppStore()
  const { toast } = useToast()
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [isAssessmentMode, setIsAssessmentMode] = useState(false)
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState(scenario.duration * 60)
  const [scores, setScores] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 })
  const [questionDialog, setQuestionDialog] = useState<{ question: string; acceptableAnswer: string; phaseIdx: number } | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswerResult, setShowAnswerResult] = useState<'correct' | 'wrong' | null>(null)
  const [rolesExpanded, setRolesExpanded] = useState<Record<string, boolean>>({})
  const [completed, setCompleted] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentPhase = scenario.phases[currentPhaseIdx]
  const totalLines = currentPhase.dialogue.length
  const progressPercent = totalLines > 0 ? (visibleLines / totalLines) * 100 : 0

  const patientStatus = useMemo((): PatientStatus => {
    if (currentPhaseIdx === 0) return 'CRITICAL'
    if (currentPhaseIdx === scenario.phases.length - 1) return 'IMPROVING'
    return 'STABLE'
  }, [currentPhaseIdx, scenario.phases.length])

  const statusColor = useMemo(() => {
    switch (patientStatus) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10'
      case 'STABLE': return 'text-yellow-500 bg-yellow-500/10'
      case 'IMPROVING': return 'text-green-500 bg-green-500/10'
    }
  }, [patientStatus])

  // Timer
  useEffect(() => {
    if (!isPaused && !completed) {
      timerRef.current = setInterval(() => {
        if (isAssessmentMode) {
          setAssessmentTimeLeft((t) => {
            if (t <= 1) {
              clearInterval(timerRef.current!)
              setCompleted(true)
              return 0
            }
            return t - 1
          })
        }
        setElapsed((e) => e + 1)
      }, 1000)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, completed, isAssessmentMode])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLines])

  const nextLine = useCallback(() => {
    if (visibleLines < totalLines) {
      setVisibleLines((v) => v + 1)
    }
  }, [visibleLines, totalLines])

  const prevLine = useCallback(() => {
    if (visibleLines > 0) {
      setVisibleLines((v) => v - 1)
    }
  }, [visibleLines])

  const nextPhase = useCallback(() => {
    if (currentPhaseIdx < scenario.phases.length - 1) {
      setCurrentPhaseIdx((i) => i + 1)
      setVisibleLines(0)
      // Random assessment question on phase change
      if (isAssessmentMode && currentPhase.assessorQuestions.length > 0) {
        const q = currentPhase.assessorQuestions[Math.floor(Math.random() * currentPhase.assessorQuestions.length)]
        setQuestionDialog({ question: q.question, acceptableAnswer: q.acceptableAnswer, phaseIdx: currentPhaseIdx })
      }
    } else {
      setCompleted(true)
      addCompletedSimulation(scenario.id)
      addXp(40)
      toast({ title: 'Scenario Complete!', description: `${scenario.title} — simulation finished` })
    }
  }, [currentPhaseIdx, scenario, isAssessmentMode, currentPhase, addCompletedSimulation, addXp, toast])

  const handleRestart = useCallback(() => {
    setCurrentPhaseIdx(0)
    setVisibleLines(0)
    setElapsed(0)
    setIsPaused(false)
    setScores({ correct: 0, wrong: 0 })
    setAssessmentTimeLeft(scenario.duration * 60)
    setCompleted(false)
    setIsAssessmentMode(false)
    setQuestionDialog(null)
  }, [scenario.duration])

  const handleAssessmentAnswer = useCallback(() => {
    if (!questionDialog || !userAnswer.trim()) return
    const isCorrect = userAnswer.toLowerCase().includes(
      questionDialog.acceptableAnswer.toLowerCase().split(' ').slice(0, 3).join(' ')
    )
    setShowAnswerResult(isCorrect ? 'correct' : 'wrong')
    setScores((s) => isCorrect ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 })
    setTimeout(() => {
      setShowAnswerResult(null)
      setQuestionDialog(null)
      setUserAnswer('')
    }, 2000)
  }, [questionDialog, userAnswer])

  // Completed screen
  if (completed) {
    const totalQ = scores.correct + scores.wrong
    const pct = totalQ > 0 ? Math.round((scores.correct / totalQ) * 100) : 100
    return (
      <div className="space-y-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className={cn('w-12 h-12 mx-auto mb-3', pct >= 70 ? 'text-yellow-500' : 'text-muted-foreground')} />
            <h2 className="text-xl font-bold mb-1">Simulation Complete!</h2>
            <p className="text-sm text-muted-foreground mb-3">{scenario.title}</p>
            <div className={cn('text-3xl font-bold', pct >= 70 ? 'text-green-500' : 'text-red-500')}>
              {isAssessmentMode ? `${pct}%` : formatTimer(elapsed)}
            </div>
            <p className="text-sm text-muted-foreground">
              {isAssessmentMode ? `${scores.correct}/${totalQ} correct answers` : `Completed in ${formatTimer(elapsed)}`}
            </p>
            <Badge className={cn('mt-2', pct >= 70 || !isAssessmentMode ? 'bg-green-500' : 'bg-red-500')}>
              {pct >= 70 || !isAssessmentMode ? 'PASS' : 'NEEDS IMPROVEMENT'}
            </Badge>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRestart} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-1" /> Retry
          </Button>
          <Button onClick={onBack} className="flex-1">Back to Gallery</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Status Bar */}
      <div className="sticky top-0 z-10 bg-gray-900 dark:bg-gray-950 text-white rounded-lg p-3 shadow-lg">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{scenario.icon}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{scenario.title}</h3>
              <p className="text-xs text-gray-400 truncate">Phase: {currentPhase.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={cn('px-2 py-1 rounded text-xs font-bold', statusColor)}>
              {patientStatus}
            </div>
            <div className="flex items-center gap-1 text-sm font-mono">
              <Timer className="w-4 h-4" />
              {isAssessmentMode ? formatTimer(assessmentTimeLeft) : formatTimer(elapsed)}
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 h-7 w-7 p-0" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 h-7 w-7 p-0" onClick={() => setVoiceEnabled(!voiceEnabled)}>
              {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </Button>
            <Button variant="ghost" size="sm" className={cn('text-white hover:bg-gray-700 h-7 px-2 text-xs', isAssessmentMode && 'bg-amber-600')} onClick={() => setIsAssessmentMode(!isAssessmentMode)}>
              <Zap className="w-3 h-3 mr-1" /> Assess
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 h-7 px-2 text-xs" onClick={nextPhase}>
              <SkipForward className="w-3 h-3 mr-1" /> Next Phase
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 h-7 px-2 text-xs" onClick={onBack}>
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Progress value={progressPercent} className="flex-1 h-1.5 bg-gray-700" />
          <span className="text-[10px] text-gray-400">{visibleLines}/{totalLines}</span>
          {isAssessmentMode && (
            <span className="text-[10px] text-amber-400 ml-2">
              {scores.correct}✓ {scores.wrong}✗
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Team Roles Panel */}
        <div className="lg:w-64 flex-shrink-0">
          <Card>
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-xs font-semibold flex items-center gap-1">
                <ListChecks className="w-3 h-3" /> Team Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-1">
              {scenario.teamRoles.map((tr) => (
                <div key={tr.role} className="border rounded-md overflow-hidden">
                  <button
                    className="w-full flex items-center gap-2 p-2 text-left hover:bg-muted/50 transition-colors"
                    onClick={() => setRolesExpanded((r) => ({ ...r, [tr.role]: !r[tr.role] }))}
                  >
                    <span>{tr.emoji}</span>
                    <span className="text-xs font-medium flex-1">{tr.role}</span>
                    {rolesExpanded[tr.role] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  {rolesExpanded[tr.role] && (
                    <div className="px-2 pb-2 text-xs text-muted-foreground space-y-0.5">
                      {tr.responsibilities.map((r, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dialogue Panel */}
        <div className="flex-1 min-w-0">
          <Card>
            <CardHeader className="p-3 pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{currentPhase.title}</CardTitle>
                <span className="text-[10px] text-muted-foreground">Phase {currentPhaseIdx + 1}/{scenario.phases.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">{currentPhase.description}</p>
            </CardHeader>
            <CardContent className="p-3 pt-1">
              <div
                ref={scrollRef}
                className="max-h-[400px] overflow-y-auto custom-scrollbar space-y-2 mb-3"
              >
                {currentPhase.dialogue.slice(0, visibleLines).map((line, idx) => (
                  <DialogueLineItem key={idx} line={line} />
                ))}
                {visibleLines === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <Play className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    Click &quot;Next Line&quot; to begin the simulation
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 border-t pt-3">
                <Button variant="outline" size="sm" onClick={prevLine} disabled={visibleLines === 0}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={nextLine} disabled={visibleLines >= totalLines} className="flex-1">
                  <ArrowRight className="w-4 h-4 mr-1" /> Next Line
                </Button>
                <Button variant="outline" size="sm" onClick={nextPhase}>
                  <SkipForward className="w-4 h-4 mr-1" /> Phase
                </Button>
                <Button variant="outline" size="sm" onClick={handleRestart}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Actions */}
      {visibleLines >= totalLines && currentPhase.keyActions.length > 0 && (
        <Card>
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" /> Key Actions for This Phase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {currentPhase.keyActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2 text-xs p-1.5 rounded bg-green-50 dark:bg-green-950/20">
                  <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Question Dialog */}
      <Dialog open={questionDialog !== null} onOpenChange={() => setQuestionDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Zap className="w-5 h-5 text-amber-500" />
              Assessor Question
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm">{questionDialog?.question}</p>
            <Input
              placeholder="Type your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAssessmentAnswer() }}
            />
            {showAnswerResult && (
              <div className={cn(
                'p-3 rounded-lg text-sm',
                showAnswerResult === 'correct'
                  ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
              )}>
                <p className="font-semibold text-xs">
                  {showAnswerResult === 'correct' ? '✓ Acceptable!' : '✗ Needs Improvement'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Key points: {questionDialog?.acceptableAnswer}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button size="sm" onClick={handleAssessmentAnswer} disabled={!userAnswer.trim() || showAnswerResult !== null}>
              Submit Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DialogueLineItem({ line }: { line: DialogueLine }) {
  if (line.isAction && line.speaker === 'NARRATOR') {
    return (
      <div className={cn(
        'p-2 rounded-lg border text-xs italic',
        SPEAKER_BG.NARRATOR,
        line.isCritical && 'ring-2 ring-amber-400/50'
      )}>
        <span className={cn('font-semibold', SPEAKER_COLORS.NARRATOR)}>Stage Direction: </span>
        <span className="text-muted-foreground">{line.text}</span>
      </div>
    )
  }

  if (line.isAction) {
    return (
      <div className="px-3 py-1 text-xs italic text-muted-foreground border-l-2 border-gray-300 dark:border-gray-600">
        {line.text}
      </div>
    )
  }

  const speakerLabel = line.role ? `${line.speaker} (${line.role})` : line.speaker

  return (
    <div className={cn(
      'p-2.5 rounded-lg border',
      SPEAKER_BG[line.speaker] || 'bg-muted border-border',
      line.isCritical && 'ring-2 ring-amber-400/50 border-amber-300 dark:border-amber-700'
    )}>
      <div className="flex items-center gap-2 mb-0.5">
        <span className={cn('text-xs font-bold', SPEAKER_COLORS[line.speaker] || 'text-foreground')}>
          {speakerLabel}
        </span>
        {line.isCritical && (
          <Badge className="bg-amber-500 text-[10px] px-1 py-0 text-white">CRITICAL</Badge>
        )}
      </div>
      <p className="text-sm">{line.text}</p>
    </div>
  )
}

// ==================== STUDY SCRIPT MODE ====================
function StudyScriptMode({ scenario, onBack }: {
  scenario: RoleplayScenario
  onBack: () => void
}) {
  const [activePhase, setActivePhase] = useState(scenario.phases[0]?.id || '')
  const [glossaryOpen, setGlossaryOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <span className="text-lg">{scenario.icon}</span>
          <div>
            <h3 className="font-semibold text-sm">{scenario.title}</h3>
            <p className="text-xs text-muted-foreground">{scenario.subtitle}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setGlossaryOpen(!glossaryOpen)}>
          <BookText className="w-4 h-4 mr-1" /> Glossary
        </Button>
      </div>

      {/* Patient Description */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold mb-1">Patient Information</p>
              <p className="text-xs text-muted-foreground">{scenario.patientDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Phase Tabs / Navigation */}
        <div className="lg:w-56 flex-shrink-0">
          <Card>
            <CardContent className="p-2 space-y-1">
              {scenario.phases.map((phase, idx) => (
                <button
                  key={phase.id}
                  className={cn(
                    'w-full text-left p-2 rounded-md text-xs transition-colors',
                    activePhase === phase.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  )}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <span className="font-semibold">Phase {String.fromCharCode(65 + idx)}:</span> {phase.title}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Script Content */}
        <div className="flex-1 min-w-0">
          {scenario.phases.filter((p) => p.id === activePhase).map((phase) => (
            <Card key={phase.id}>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm">{phase.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{phase.description}</p>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {phase.dialogue.map((line, idx) => (
                  <DialogueLineItem key={idx} line={line} />
                ))}

                <Separator className="my-3" />

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" /> Assessor Questions & Answers
                  </h4>
                  {phase.assessorQuestions.map((aq, i) => (
                    <div key={i} className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs font-semibold">Q: {aq.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">A: {aq.acceptableAnswer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Glossary Sidebar */}
        {glossaryOpen && (
          <div className="lg:w-56 flex-shrink-0">
            <Card>
              <CardHeader className="p-3 pb-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-semibold">Glossary</CardTitle>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => setGlossaryOpen(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                {scenario.glossary.map((g, i) => (
                  <div key={i}>
                    <p className="text-xs font-semibold text-primary">{g.term}</p>
                    <p className="text-[11px] text-muted-foreground">{g.definition}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== QUICK REVIEW MODE ====================
function QuickReviewMode({ scenario, onBack }: {
  scenario: RoleplayScenario
  onBack: () => void
}) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(scenario.phases[0]?.id || null)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <span className="text-lg">{scenario.icon}</span>
          <div>
            <h3 className="font-semibold text-sm">{scenario.title}</h3>
            <p className="text-xs text-muted-foreground">Quick Review</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={DIFFICULTY_STYLES[scenario.difficulty]}>{scenario.difficulty}</Badge>
          <Badge variant="outline" className="text-xs"><Clock className="w-3 h-3 mr-1" />{scenario.duration} min</Badge>
        </div>
      </div>

      {/* Patient Summary */}
      <Card>
        <CardContent className="p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h4 className="text-xs font-semibold mb-1">Patient</h4>
              <p className="text-xs text-muted-foreground">{scenario.patientDescription}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-1">Skills Assessed</h4>
              <div className="flex flex-wrap gap-1">
                {scenario.skills.map((s) => (
                  <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Summaries */}
      {scenario.phases.map((phase, idx) => (
        <Card key={phase.id}>
          <button
            className="w-full text-left"
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          >
            <CardHeader className="p-3 pb-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold">
                  Phase {String.fromCharCode(65 + idx)}: {phase.title}
                </CardTitle>
                {expandedPhase === phase.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </CardHeader>
          </button>
          {expandedPhase === phase.id && (
            <CardContent className="p-3 pt-0 space-y-3">
              <p className="text-xs text-muted-foreground">{phase.description}</p>

              {/* Key Actions Checklist */}
              <div>
                <h5 className="text-xs font-semibold flex items-center gap-1 mb-1">
                  <ClipboardList className="w-3 h-3" /> Key Actions
                </h5>
                <div className="space-y-1">
                  {phase.keyActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs p-1.5 rounded bg-green-50 dark:bg-green-950/20">
                      <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Decision Points */}
              <div>
                <h5 className="text-xs font-semibold flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" /> Critical Decisions
                </h5>
                <div className="space-y-1">
                  {phase.assessorQuestions.map((aq, i) => (
                    <div key={i} className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/20 text-xs">
                      <span className="font-semibold">Q: </span>{aq.question}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {/* Vital Signs Table */}
      <Card>
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-xs font-semibold flex items-center gap-1">
            <Activity className="w-3 h-3" /> Vital Signs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-1.5 font-semibold">Time</th>
                  <th className="text-left p-1.5 font-semibold">BP</th>
                  <th className="text-left p-1.5 font-semibold">Pulse</th>
                  <th className="text-left p-1.5 font-semibold">Resp</th>
                  <th className="text-left p-1.5 font-semibold">SpO2</th>
                  <th className="text-left p-1.5 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {scenario.vitalSigns.map((vs, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-1.5 font-medium">{vs.time}</td>
                    <td className="p-1.5">{vs.bp}</td>
                    <td className="p-1.5">{vs.pulse}</td>
                    <td className="p-1.5">{vs.resp}</td>
                    <td className="p-1.5">{vs.spo2}</td>
                    <td className="p-1.5 text-muted-foreground">{vs.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Glossary */}
      <Card>
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-xs font-semibold flex items-center gap-1">
            <BookOpen className="w-3 h-3" /> Key Terms
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scenario.glossary.map((g, i) => (
              <div key={i} className="p-2 rounded bg-muted/50">
                <p className="text-xs font-semibold text-primary">{g.term}</p>
                <p className="text-[11px] text-muted-foreground">{g.definition}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ==================== MAIN EXPORT ====================
export function RoleplaySection() {
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null)

  const selectedScenario = useMemo(
    () => roleplayScenarios.find((s) => s.id === selectedScenarioId) || null,
    [selectedScenarioId]
  )

  const handleSelect = useCallback((id: string) => {
    setSelectedScenarioId(id)
    setViewMode('simulation')
  }, [])

  const handleStudy = useCallback((id: string) => {
    setSelectedScenarioId(id)
    setViewMode('study')
  }, [])

  const handleReview = useCallback((id: string) => {
    setSelectedScenarioId(id)
    setViewMode('review')
  }, [])

  const handleBack = useCallback(() => {
    setViewMode('gallery')
    setSelectedScenarioId(null)
  }, [])

  if (viewMode === 'simulation' && selectedScenario) {
    return <SimulationMode scenario={selectedScenario} onBack={handleBack} />
  }

  if (viewMode === 'study' && selectedScenario) {
    return <StudyScriptMode scenario={selectedScenario} onBack={handleBack} />
  }

  if (viewMode === 'review' && selectedScenario) {
    return <QuickReviewMode scenario={selectedScenario} onBack={handleBack} />
  }

  return <ScenarioGallery onSelect={handleSelect} onStudy={handleStudy} onReview={handleReview} />
}
