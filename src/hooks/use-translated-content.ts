'use client'

import { useAppStore } from '@/store/app-store'
import { roadmapTopics, type RoadmapTopic } from '@/data/roadmap'
import { roadmapFil, type RoadmapTopicFil } from '@/data/roadmap-fil'
import { competencyModules, type CompetencyModule } from '@/data/competencies'
import { competenciesFil, type CompetencyModuleFil } from '@/data/competencies-fil'

/**
 * Returns the Filipino translation for a roadmap topic if available,
 * otherwise falls back to the English content.
 */
function getRoadmapFil(topicId: string): RoadmapTopicFil | null {
  return roadmapFil[topicId] || null
}

/**
 * Returns the Filipino translation for a competency module if available,
 * otherwise falls back to the English content.
 */
function getCompetencyFil(moduleId: string): CompetencyModuleFil | null {
  return competenciesFil[moduleId] || null
}

/**
 * Hook that provides translated content based on the current language setting.
 * Returns helpers to get the appropriate language content for roadmap topics
 * and competency modules.
 */
export function useTranslatedContent() {
  const language = useAppStore((s) => s.settings.language) || 'en'
  const isFil = language === 'fil'

  /**
   * Get the translated title for a roadmap topic
   */
  function getTopicTitle(topic: RoadmapTopic): string {
    if (!isFil) return topic.title
    return getRoadmapFil(topic.id)?.title || topic.title
  }

  /**
   * Get the translated short description for a roadmap topic
   */
  function getTopicShortDesc(topic: RoadmapTopic): string {
    if (!isFil) return topic.shortDescription
    return getRoadmapFil(topic.id)?.shortDescription || topic.shortDescription
  }

  /**
   * Get the translated full content for a roadmap topic
   */
  function getTopicContent(topic: RoadmapTopic): string {
    if (!isFil) return topic.content
    return getRoadmapFil(topic.id)?.content || topic.content
  }

  /**
   * Get the translated key points for a roadmap topic
   */
  function getTopicKeyPoints(topic: RoadmapTopic): string[] {
    if (!isFil) return topic.keyPoints
    return getRoadmapFil(topic.id)?.keyPoints || topic.keyPoints
  }

  /**
   * Get the translated outcomes for a roadmap topic
   */
  function getTopicOutcomes(topic: RoadmapTopic): string[] {
    if (!isFil) return topic.outcomes
    return getRoadmapFil(topic.id)?.outcomes || topic.outcomes
  }

  /**
   * Get the translated "what you'll learn" items for a roadmap topic
   */
  function getTopicWhatYoullLearn(topic: RoadmapTopic): string[] {
    if (!isFil) return topic.whatYoullLearn
    return getRoadmapFil(topic.id)?.whatYoullLearn || topic.whatYoullLearn
  }

  /**
   * Get the translated quick notes for a roadmap topic
   */
  function getTopicQuickNotes(topic: RoadmapTopic): RoadmapTopic['quickNotes'] {
    if (!isFil) return topic.quickNotes
    const fil = getRoadmapFil(topic.id)
    return fil?.quickNotes || topic.quickNotes
  }

  // ─── Competency Module translations ─────────────────────

  /**
   * Get the translated title for a competency module
   */
  function getModuleTitle(mod: CompetencyModule): string {
    if (!isFil) return mod.title
    return getCompetencyFil(mod.id)?.title || mod.title
  }

  /**
   * Get the translated description for a competency module
   */
  function getModuleDesc(mod: CompetencyModule): string {
    if (!isFil) return mod.description
    return getCompetencyFil(mod.id)?.description || mod.description
  }

  /**
   * Get the translated reviewer notes for a competency module
   */
  function getModuleReviewerNotes(mod: CompetencyModule): string {
    if (!isFil) return mod.reviewerNotes
    return getCompetencyFil(mod.id)?.reviewerNotes || mod.reviewerNotes
  }

  /**
   * Get the translated procedures for a competency module
   */
  function getModuleProcedures(mod: CompetencyModule): CompetencyModule['procedures'] {
    if (!isFil) return mod.procedures
    const fil = getCompetencyFil(mod.id)
    return fil?.procedures || mod.procedures
  }

  /**
   * Get the translated visual illustrations for a competency module
   */
  function getModuleVisuals(mod: CompetencyModule): CompetencyModule['visualIllustrations'] {
    if (!isFil) return mod.visualIllustrations
    const fil = getCompetencyFil(mod.id)
    return fil?.visualIllustrations || mod.visualIllustrations
  }

  /**
   * Get the translated key points for a competency module
   */
  function getModuleKeyPoints(mod: CompetencyModule): string[] {
    if (!isFil) return mod.keyPoints
    return getCompetencyFil(mod.id)?.keyPoints || mod.keyPoints
  }

  /**
   * Get the translated assessor questions for a competency module
   */
  function getModuleAssessorQuestions(mod: CompetencyModule): string[] {
    if (!isFil) return mod.assessorQuestions
    return getCompetencyFil(mod.id)?.assessorQuestions || mod.assessorQuestions
  }

  /**
   * Get the translated memorization tips for a competency module
   */
  function getModuleMemorizationTips(mod: CompetencyModule): string[] {
    if (!isFil) return mod.memorizationTips
    return getCompetencyFil(mod.id)?.memorizationTips || mod.memorizationTips
  }

  /**
   * Get the translated flashcards for a competency module
   */
  function getModuleFlashcards(mod: CompetencyModule): CompetencyModule['flashcards'] {
    if (!isFil) return mod.flashcards
    const fil = getCompetencyFil(mod.id)
    return fil?.flashcards || mod.flashcards
  }

  /**
   * Get the translated mini quiz for a competency module
   */
  function getModuleMiniQuiz(mod: CompetencyModule): CompetencyModule['miniQuiz'] {
    if (!isFil) return mod.miniQuiz
    const fil = getCompetencyFil(mod.id)
    return fil?.miniQuiz || mod.miniQuiz
  }

  return {
    language,
    isFil,
    // Roadmap topic helpers
    getTopicTitle,
    getTopicShortDesc,
    getTopicContent,
    getTopicKeyPoints,
    getTopicOutcomes,
    getTopicWhatYoullLearn,
    getTopicQuickNotes,
    // Competency module helpers
    getModuleTitle,
    getModuleDesc,
    getModuleReviewerNotes,
    getModuleProcedures,
    getModuleVisuals,
    getModuleKeyPoints,
    getModuleAssessorQuestions,
    getModuleMemorizationTips,
    getModuleFlashcards,
    getModuleMiniQuiz,
  }
}
