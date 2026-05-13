'use client'

import React from 'react'
import { useAppStore, getLevelFromXp, BADGE_DEFINITIONS } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'

/**
 * Watches progress state for badge unlocks, level-ups, and streak milestones,
 * then fires celebratory notifications via the Zustand store notification system.
 * Uses refs to track previously notified state so each event fires exactly once.
 */
export function AchievementToastWatcher() {
  const { progress, addNotification } = useAppStore()
  const { t } = useTranslation()

  // Track what we've already notified about to avoid duplicates
  const notifiedBadgesRef = React.useRef<Set<string>>(new Set(progress.badges))
  const notifiedLevelRef = React.useRef<number>(getLevelFromXp(progress.xp))
  const notifiedStreaksRef = React.useRef<Set<number>>(new Set())
  const notifiedFirstQuizPassRef = React.useRef(false)
  const notifiedFlashcardRef = React.useRef(false)
  const notifiedDailyChallengeRef = React.useRef(false)
  const notifiedQuizPerfectRef = React.useRef(false)
  const notifiedTopicsReadRef = React.useRef<Set<number>>(new Set())
  const notifiedFocusChampRef = React.useRef(false)

  React.useEffect(() => {
    // ── Badge unlock notifications ──
    const newBadges = progress.badges.filter((id) => !notifiedBadgesRef.current.has(id))
    for (const badgeId of newBadges) {
      const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId)
      if (!badge) continue
      notifiedBadgesRef.current.add(badgeId)

      addNotification({
        title: t('achievement.badgeUnlocked'),
        description: t('achievement.newBadgeDesc').replace('{title}', badge.title).replace('{description}', badge.description),
        icon: badge.icon,
        xpReward: 0,
        type: 'achievement',
      })
    }

    // ── Level-up notifications ──
    const currentLevel = getLevelFromXp(progress.xp)
    if (currentLevel > notifiedLevelRef.current && notifiedLevelRef.current > 0) {
      notifiedLevelRef.current = currentLevel

      addNotification({
        title: t('achievement.levelUp'),
        description: t('achievement.levelUpDesc').replace('{level}', String(currentLevel)),
        icon: '🎉',
        xpReward: 0,
        type: 'achievement',
      })
    } else if (currentLevel > 0) {
      notifiedLevelRef.current = currentLevel
    }

    // ── Daily challenge streak milestone notifications ──
    const streakMilestones = [3, 7, 14, 30]
    for (const milestone of streakMilestones) {
      if (progress.dailyChallengeStreak >= milestone && !notifiedStreaksRef.current.has(milestone)) {
        notifiedStreaksRef.current.add(milestone)
        addNotification({
          title: t('achievement.streakMilestone'),
          description: t('achievement.streakMilestoneDesc').replace('{count}', String(milestone)),
          icon: '🔥',
          xpReward: 0,
          type: 'streak',
        })
      }
    }

    // ── Daily challenge completed ──
    if (progress.dailyChallengeCompleted && !notifiedDailyChallengeRef.current) {
      const today = new Date().toISOString().split('T')[0]
      if (progress.dailyChallengeCompleted.startsWith(today)) {
        notifiedDailyChallengeRef.current = true
        addNotification({
          title: t('achievement.dailyChallengeComplete'),
          description: t('achievement.dailyChallengeCompleteDesc'),
          icon: '🎯',
          xpReward: 50,
          type: 'milestone',
        })
      }
    }

    // ── Quiz score >= 90% (notified per quiz) ──
    if (progress.quizScores.length > 0) {
      const latestQuiz = progress.quizScores[progress.quizScores.length - 1]
      const pct = latestQuiz.score / latestQuiz.total
      const quizId = `${latestQuiz.date}-${latestQuiz.category}`

      if (pct >= 1.0 && !notifiedQuizPerfectRef.current) {
        notifiedQuizPerfectRef.current = true
        addNotification({
          title: t('achievement.quizPerfect'),
          description: t('achievement.quizPerfectDesc'),
          icon: '🌟',
          xpReward: 50,
          type: 'quiz',
        })
      } else if (pct >= 0.9 && pct < 1.0) {
        addNotification({
          title: t('achievement.quizHighScore'),
          description: t('achievement.quizHighScoreDesc'),
          icon: '⭐',
          xpReward: 30,
          type: 'quiz',
        })
      }
    }

    // ── First quiz score >= 70% ──
    if (!notifiedFirstQuizPassRef.current && progress.quizScores.length > 0) {
      const hasPassingScore = progress.quizScores.some((q) => (q.score / q.total) >= 0.7)
      if (hasPassingScore) {
        notifiedFirstQuizPassRef.current = true
        addNotification({
          title: t('achievement.firstQuizPass'),
          description: t('achievement.firstQuizPassDesc'),
          icon: '📝',
          xpReward: 0,
          type: 'quiz',
        })
      }
    }

    // ── First flashcard session ──
    if (!notifiedFlashcardRef.current && Object.keys(progress.moduleQuizScores).length > 0) {
      notifiedFlashcardRef.current = true
      addNotification({
        title: t('achievement.flashcardComplete'),
        description: t('achievement.flashcardCompleteDesc'),
        icon: '🃏',
        xpReward: 10,
        type: 'general',
      })
    }

    // ── 10 topics read ──
    const topicsCount = progress.readTopics.length
    if (topicsCount >= 10 && !notifiedTopicsReadRef.current.has(10)) {
      notifiedTopicsReadRef.current.add(10)
      addNotification({
        title: t('achievement.topicsRead'),
        description: t('achievement.topicsReadDesc'),
        icon: '📚',
        xpReward: 25,
        type: 'milestone',
      })
    }

    // ── Focus champion: 4 sessions in a day ──
    if (progress.focusSessionsToday >= 4 && !notifiedFocusChampRef.current) {
      notifiedFocusChampRef.current = true
      addNotification({
        title: t('achievement.focusChampion'),
        description: t('achievement.focusChampionDesc'),
        icon: '⏱️',
        xpReward: 0,
        type: 'focus',
      })
    }
  }, [progress, t, addNotification])

  return null // This is a headless watcher component
}
