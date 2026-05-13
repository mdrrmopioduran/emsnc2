'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, SkipForward, Clock, Zap, Timer } from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────
type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

interface TimerConfig {
  label: string
  minutes: number
  color: string
  ringColor: string
  bgColor: string
  glowColor: string
}

interface GlobalTimerState {
  isRunning: boolean
  mode: TimerMode
  focusDuration: number
  remainingSeconds: number
  sessionCount: number
}

// ─── Constants ──────────────────────────────────────────────────────
const FOCUS_DURATIONS = [15, 25, 30, 45, 60]

const TIMER_CONFIGS: Record<TimerMode, TimerConfig> = {
  focus: {
    label: 'focus.focus',
    minutes: 25,
    color: 'text-teal-500',
    ringColor: '#2EC4B6',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    glowColor: 'shadow-teal-500/30',
  },
  shortBreak: {
    label: 'focus.shortBreak',
    minutes: 5,
    color: 'text-amber-500',
    ringColor: '#F59E0B',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    glowColor: 'shadow-amber-500/30',
  },
  longBreak: {
    label: 'focus.longBreak',
    minutes: 15,
    color: 'text-green-500',
    ringColor: '#22C55E',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    glowColor: 'shadow-green-500/30',
  },
}

const MOTIVATIONAL_QUOTES = [
  'Every second counts in an emergency — and in your training.',
  'Stay focused. Lives will depend on your knowledge.',
  'Consistency beats intensity. Keep showing up.',
  'The EMS professional who studies today saves lives tomorrow.',
  'Small daily improvements lead to staggering long-term results.',
  'Your future patients are counting on your dedication.',
  'Knowledge is your most important tool — sharpen it daily.',
  'A calm mind in practice leads to a calm mind in emergencies.',
  'The difference between ordinary and extraordinary is practice.',
  'Train hard, respond easy. Your study matters.',
]

const XP_PER_FOCUS_SESSION = 20

// ─── Web Audio Chime ────────────────────────────────────────────────
function playCompletionChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18)
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.18 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.8)
      osc.start(ctx.currentTime + i * 0.18)
      osc.stop(ctx.currentTime + i * 0.18 + 0.8)
    })
  } catch {
    // Silently fail if audio isn't available
  }
}

// ─── Format helpers ─────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function formatMinutes(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes}m`
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

// ─── Module-level timer state management ────────────────────────────
// This persists across component unmounts (e.g. section navigation)
function createInitialTimerState(): GlobalTimerState {
  return { isRunning: false, mode: 'focus', focusDuration: 25, remainingSeconds: 25 * 60, sessionCount: 0 }
}

let _timerState: GlobalTimerState = createInitialTimerState()

function readGlobalState(): GlobalTimerState {
  return _timerState
}

function writeGlobalState(partial: Partial<GlobalTimerState>): void {
  _timerState = { ..._timerState, ...partial }
}

// Listeners for header integration
type TimerListener = () => void
const timerListeners: Set<TimerListener> = new Set()

function notifyTimerListeners() {
  timerListeners.forEach(l => l())
}

export function subscribeToTimer(listener: TimerListener) {
  timerListeners.add(listener)
  return () => { timerListeners.delete(listener) }
}

export function getGlobalTimerState(): GlobalTimerState {
  return readGlobalState()
}

// ─── Focus Timer Section Component ──────────────────────────────────
export function FocusTimerSection() {
  const { t } = useTranslation()
  const { progress, addFocusSession, settings } = useAppStore()
  const reducedMotion = settings.reducedMotion

  const [isRunning, setIsRunning] = useState(() => readGlobalState().isRunning)
  const [mode, setMode] = useState<TimerMode>(() => readGlobalState().mode)
  const [focusDuration, setFocusDuration] = useState(() => readGlobalState().focusDuration)
  const [remainingSeconds, setRemainingSeconds] = useState(() => readGlobalState().remainingSeconds)
  const [sessionCount, setSessionCount] = useState(() => readGlobalState().sessionCount)
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
  )
  const [showCompleteMsg, setShowCompleteMsg] = useState<string | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const config = TIMER_CONFIGS[mode]
  const totalSeconds = mode === 'focus'
    ? focusDuration * 60
    : config.minutes * 60
  const progressPercent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100

  // Read today's stats
  const today = new Date().toISOString().split('T')[0]
  const isToday = progress.lastFocusDate === today
  const sessionsToday = isToday ? progress.focusSessionsToday : 0
  const minutesToday = isToday ? progress.focusMinutesToday : 0
  const focusXpToday = sessionsToday * XP_PER_FOCUS_SESSION

  // ─── Timer tick logic ───────────────────────────────────────────
  const tick = useCallback(() => {
    setRemainingSeconds(prev => {
      if (prev <= 1) {
        const gs = readGlobalState()
        const currentMode = gs.mode

        playCompletionChime()

        if (currentMode === 'focus') {
          const dur = gs.focusDuration
          addFocusSession(dur)
          const newSession = gs.sessionCount + 1
          setSessionCount(newSession)

          setShowCompleteMsg(t('focus.focusComplete'))
          setTimeout(() => setShowCompleteMsg(null), 3000)

          setQuoteIndex(qi => (qi + 1) % MOTIVATIONAL_QUOTES.length)

          const nextMode: TimerMode = newSession % 4 === 0 ? 'longBreak' : 'shortBreak'
          writeGlobalState({ sessionCount: newSession, mode: nextMode, isRunning: false, remainingSeconds: TIMER_CONFIGS[nextMode].minutes * 60 })
          setIsRunning(false)
          setMode(nextMode)
          notifyTimerListeners()

          return TIMER_CONFIGS[nextMode].minutes * 60
        } else {
          setShowCompleteMsg(t('focus.breakComplete'))
          setTimeout(() => setShowCompleteMsg(null), 3000)

          writeGlobalState({ mode: 'focus', isRunning: false, remainingSeconds: gs.focusDuration * 60 })
          setIsRunning(false)
          setMode('focus')
          notifyTimerListeners()

          return gs.focusDuration * 60
        }
      }
      writeGlobalState({ remainingSeconds: prev - 1 })
      return prev - 1
    })
  }, [addFocusSession, t])

  // ─── Interval management ────────────────────────────────────────
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, tick])

  // ─── Actions ────────────────────────────────────────────────────
  const handlePlayPause = () => {
    const next = !isRunning
    setIsRunning(next)
    writeGlobalState({ isRunning: next })
    notifyTimerListeners()
  }

  const handleReset = () => {
    setIsRunning(false)
    const secs = mode === 'focus' ? focusDuration * 60 : config.minutes * 60
    setRemainingSeconds(secs)
    writeGlobalState({ isRunning: false, remainingSeconds: secs })
    notifyTimerListeners()
  }

  const handleSkip = () => {
    setIsRunning(false)

    if (mode === 'focus') {
      const nextMode: TimerMode = (sessionCount + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
      setMode(nextMode)
      const secs = TIMER_CONFIGS[nextMode].minutes * 60
      setRemainingSeconds(secs)
      writeGlobalState({ isRunning: false, mode: nextMode, remainingSeconds: secs })
    } else {
      setMode('focus')
      const secs = focusDuration * 60
      setRemainingSeconds(secs)
      writeGlobalState({ isRunning: false, mode: 'focus', remainingSeconds: secs })
    }
    notifyTimerListeners()
  }

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    const secs = newMode === 'focus' ? focusDuration * 60 : TIMER_CONFIGS[newMode].minutes * 60
    setRemainingSeconds(secs)
    writeGlobalState({ isRunning: false, mode: newMode, remainingSeconds: secs })
    notifyTimerListeners()
  }

  const handleFocusDurationChange = (mins: number) => {
    setFocusDuration(mins)
    if (mode === 'focus') {
      setIsRunning(false)
      const secs = mins * 60
      setRemainingSeconds(secs)
      writeGlobalState({ isRunning: false, focusDuration: mins, remainingSeconds: secs })
      notifyTimerListeners()
    } else {
      writeGlobalState({ focusDuration: mins })
    }
  }

  // ─── Compute ring gradient ──────────────────────────────────────
  const ringGradient = `conic-gradient(${config.ringColor} ${progressPercent * 3.6}deg, var(--muted) 0deg)`

  return (
    <Card className="card-modern overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Timer className="w-4 h-4 text-ems-teal" />
          {t('focus.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* ── Mode Selector ── */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
          {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all',
                mode === m
                  ? cn(config.bgColor, config.color, 'shadow-sm')
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t(TIMER_CONFIGS[m].label)}
            </button>
          ))}
        </div>

        {/* ── Focus Duration Selector (only in focus mode) ── */}
        {mode === 'focus' && (
          <div className="space-y-2">
            <p className="text-[11px] text-muted-foreground font-medium">{t('focus.focusDuration')}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {FOCUS_DURATIONS.map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleFocusDurationChange(mins)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                    focusDuration === mins
                      ? 'border-ems-teal bg-ems-teal/10 text-ems-teal shadow-sm'
                      : 'border-border bg-card text-muted-foreground hover:border-ems-teal/30'
                  )}
                >
                  {mins}{t('focus.minutes')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Timer Display ── */}
        <div className="flex flex-col items-center py-4">
          {/* Session counter */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] text-muted-foreground font-medium">
              {t('focus.sessionOf').replace('{current}', String((sessionCount % 4) || 4)).replace('{total}', '4')}
            </span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    i < (sessionCount % 4)
                      ? config.color.replace('text-', 'bg-')
                      : 'bg-muted'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Circular timer ring */}
          <div
            className={cn(
              'relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-shadow duration-500',
              isRunning && !reducedMotion && `shadow-[0_0_40px_8px] ${config.glowColor}`
            )}
            style={{
              background: ringGradient,
              transition: reducedMotion ? 'none' : undefined,
            }}
          >
            <div className="absolute inset-[6px] rounded-full bg-card flex flex-col items-center justify-center">
              {isRunning && !reducedMotion && (
                <div
                  className={cn(
                    'absolute inset-0 rounded-full opacity-20 animate-pulse',
                    config.color.replace('text-', 'bg-')
                  )}
                />
              )}
              <span className={cn('text-4xl sm:text-5xl font-bold tabular-nums tracking-tight relative z-10', config.color)}>
                {formatTime(remainingSeconds)}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 relative z-10">
                {t(config.label)}
              </span>
            </div>
          </div>

          {/* Completion message */}
          {showCompleteMsg && (
            <div className={cn(
              'mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-center animate-in fade-in slide-in-from-bottom-2 duration-300',
              config.bgColor, config.color
            )}>
              {showCompleteMsg}
            </div>
          )}
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
            aria-label={t('focus.reset')}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handlePlayPause}
            className={cn(
              'p-5 rounded-2xl text-white font-semibold transition-all shadow-lg hover:shadow-xl',
              `bg-gradient-to-br ${mode === 'focus' ? 'from-teal-500 to-teal-600' : mode === 'shortBreak' ? 'from-amber-500 to-amber-600' : 'from-green-500 to-green-600'}`,
              `hover:${mode === 'focus' ? 'from-teal-600 to-teal-700' : mode === 'shortBreak' ? 'from-amber-600 to-amber-700' : 'from-green-600 to-green-700'}`,
              isRunning && !reducedMotion && 'scale-105'
            )}
            aria-label={isRunning ? t('focus.pause') : t('focus.start')}
          >
            {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
          </button>

          <button
            onClick={handleSkip}
            className="p-3 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
            aria-label={t('focus.skip')}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* ── Motivational Quote ── */}
        <div className="text-center py-2 px-4">
          <p className="text-[11px] text-muted-foreground italic leading-relaxed">
            &ldquo;{MOTIVATIONAL_QUOTES[quoteIndex]}&rdquo;
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-2">
          <div className={cn('p-3 rounded-xl text-center', config.bgColor)}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className={cn('text-lg font-bold', config.color)}>
              {minutesToday > 0 ? formatMinutes(minutesToday) : '0m'}
            </p>
            <p className="text-[10px] text-muted-foreground">{t('focus.todayFocusTime')}</p>
          </div>

          <div className="p-3 rounded-xl text-center bg-muted/30">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Timer className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground">{sessionsToday}</p>
            <p className="text-[10px] text-muted-foreground">{t('focus.sessionsCompleted')}</p>
          </div>

          <div className="p-3 rounded-xl text-center bg-amber-50 dark:bg-amber-950/20">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-lg font-bold text-amber-500">+{focusXpToday}</p>
            <p className="text-[10px] text-muted-foreground">{t('focus.xpEarned')}</p>
          </div>
        </div>

        {sessionsToday === 0 && (
          <div className="text-center py-2">
            <p className="text-[11px] text-muted-foreground">{t('focus.noSessions')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
