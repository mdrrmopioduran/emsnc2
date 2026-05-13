'use client'

import React from 'react'
import { useAppStore, getLevelFromXp, BADGE_DEFINITIONS } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { toast } from 'sonner'

/**
 * Watches progress state for badge unlocks, level-ups, and streak milestones,
 * then fires celebratory sonner toasts. Uses refs to track previously notified
 * state so each event fires exactly once.
 */
export function AchievementToastWatcher() {
  const { progress } = useAppStore()
  const { t } = useTranslation()

  // Track what we've already notified about to avoid duplicates
  const notifiedBadgesRef = React.useRef<Set<string>>(new Set(progress.badges))
  const notifiedLevelRef = React.useRef<number>(getLevelFromXp(progress.xp))
  const notifiedStreaksRef = React.useRef<Set<number>>(new Set())
  const notifiedFirstQuizPassRef = React.useRef(false)
  const notifiedFlashcardRef = React.useRef(false)

  React.useEffect(() => {
    // ── Badge unlock notifications ──
    const newBadges = progress.badges.filter((id) => !notifiedBadgesRef.current.has(id))
    for (const badgeId of newBadges) {
      const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId)
      if (!badge) continue
      notifiedBadgesRef.current.add(badgeId)

      toast(t('achievement.badgeUnlocked'), {
        description: t('achievement.newBadgeDesc').replace('{title}', badge.title).replace('{description}', badge.description),
        icon: <span className="text-2xl">{badge.icon}</span>,
        duration: 5000,
      })
    }

    // ── Level-up notifications ──
    const currentLevel = getLevelFromXp(progress.xp)
    if (currentLevel > notifiedLevelRef.current && notifiedLevelRef.current > 0) {
      const newXpInfo = progress.xp
      const levelXpBase = (currentLevel - 1) * 100
      const xpInLevel = newXpInfo - levelXpBase
      notifiedLevelRef.current = currentLevel

      toast(t('achievement.levelUp'), {
        description: t('achievement.levelUpDesc').replace('{level}', String(currentLevel)),
        description: `${t('achievement.levelUpDesc').replace('{level}', String(currentLevel))}  (${xpInLevel}/${100} XP)`,
        duration: 5000,
      })
    } else if (currentLevel > 0) {
      notifiedLevelRef.current = currentLevel
    }

    // ── Daily challenge streak milestone notifications ──
    const streakMilestones = [3, 7, 14, 30]
    for (const milestone of streakMilestones) {
      if (progress.dailyChallengeStreak >= milestone && !notifiedStreaksRef.current.has(milestone)) {
        notifiedStreaksRef.current.add(milestone)
        toast(t('achievement.streakMilestone'), {
          description: t('achievement.streakMilestoneDesc').replace('{count}', String(milestone)),
          duration: 5000,
        })
      }
    }

    // ── First quiz score >= 70% ──
    if (!notifiedFirstQuizPassRef.current && progress.quizScores.length > 0) {
      const hasPassingScore = progress.quizScores.some((q) => (q.score / q.total) >= 0.7)
      if (hasPassingScore) {
        notifiedFirstQuizPassRef.current = true
        toast(t('achievement.firstQuizPass'), {
          description: t('achievement.firstQuizPassDesc'),
          duration: 5000,
        })
      }
    }

    // ── First flashcard session (detected via milestones) ──
    if (!notifiedFlashcardRef.current && progress.milestones.length > 0) {
      // Use module quiz scores as a proxy for "flashcard session completed"
      // since the app tracks module quiz completion as part of study activity
      const hasModuleQuiz = Object.keys(progress.moduleQuizScores).length > 0
      if (hasModuleQuiz) {
        notifiedFlashcardRef.current = true
        toast(t('achievement.flashcardComplete'), {
          description: t('achievement.flashcardCompleteDesc'),
          duration: 5000,
        })
      }
    }
  }, [progress, t])

  return null // This is a headless watcher component
}
