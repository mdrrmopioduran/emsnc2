import { create } from 'zustand'

export type Section = 'home' | 'roadmap' | 'study' | 'visual' | 'assessment' | 'settings' | 'admin'
export type SubSection = string

export interface BadgeData {
  id: string
  title: string
  description: string
  icon: string
  category: 'progress' | 'quiz' | 'simulation' | 'streak' | 'special'
  unlockedAt?: string
}

export interface LearningGoal {
  id: string
  text: string
  targetDate: string
  completed: boolean
}

export interface Note {
  id: string
  title: string
  content: string
  category: 'General' | 'Clinical' | 'Assessment' | 'Operations' | 'Legal' | 'Personal'
  color: 'red' | 'amber' | 'teal' | 'navy' | 'purple'
  createdAt: string
  updatedAt: string
}

export type NotificationType = 'achievement' | 'milestone' | 'streak' | 'quiz' | 'focus' | 'general'

export interface AchievementNotification {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  type: NotificationType
  timestamp: number
}

export interface ProgressData {
  readTopics: string[]
  quizScores: { date: string; score: number; total: number; category: string }[]
  completedSimulations: string[]
  bookmarks: string[]
  completedChecklists: Record<string, boolean[]>
  // New gamification fields
  xp: number
  level: number
  streak: number
  lastStudyDate: string
  badges: string[]
  goals: LearningGoal[]
  timeSpent: Record<string, number> // topicId -> seconds
  diagnosticCompleted: boolean
  diagnosticScores: Record<string, number> // category -> percentage
  suggestedPath: string[]
  onboarded: boolean
  moduleQuizScores: Record<string, { score: number; total: number }> // topicId -> quiz result
  // UX improvement fields
  moduleProgress: Record<string, { sectionsCompleted: string[]; totalSections: number }> // topicId -> section tracking
  milestones: string[] // reached milestones like 'first-quiz', 'half-roadmap', etc.
  lastViewedTopic: string // which topic the user was last viewing
  favoriteAcronyms: string[] // acronyms the user has favorited
  focusSessionsToday: number
  focusMinutesToday: number
  lastFocusDate: string
  // Daily challenge
  dailyChallengeCompleted: string // today's date as ISO string when completed
  dailyChallengeStreak: number
  // Notes
  notes: Note[]
  // Study activity log for streak calendar
  studyActivityLog: Record<string, number> // YYYY-MM-DD -> activity count
  // Equipment reviewed
  equipmentReviewed: string[]
  // Notification history
  notificationHistory: AchievementNotification[]
}

export interface AISettings {
  provider: 'zai' | 'openai' | 'anthropic' | 'google' | 'custom'
  apiKey: string
  model: string
  customEndpoint: string
  systemPrompt: string
  temperature: number
  maxTokens: number
}

export interface AppSettings {
  theme: 'light' | 'dark'
  fontSize: 'small' | 'medium' | 'large'
  accentColor: 'navy' | 'teal' | 'red'
  highContrast: boolean
  textToSpeech: boolean
  ttsVoice: string
  ttsSpeed: number
  reducedMotion: boolean
  // UX improvement fields
  learningMode: 'learning' | 'quickReview'
  dailyGoalMinutes: number
  language: 'en' | 'fil'
  // AI Assistant settings
  ai: AISettings
}

interface AppState {
  // Navigation
  activeSection: Section
  activeSubSection: SubSection
  sidebarOpen: boolean
  searchOpen: boolean
  setActiveSection: (section: Section) => void
  setActiveSubSection: (sub: SubSection) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSearchOpen: (open: boolean) => void

  // Progress
  progress: ProgressData
  markTopicRead: (topicId: string) => void
  addQuizScore: (score: number, total: number, category: string) => void
  addCompletedSimulation: (id: string) => void
  toggleBookmark: (term: string) => void
  updateChecklist: (sceneId: string, index: number, checked: boolean) => void
  addXp: (amount: number) => void
  updateTimeSpent: (topicId: string, seconds: number) => void
  setDiagnosticScores: (scores: Record<string, number>) => void
  setOnboarded: () => void
  addModuleQuizScore: (topicId: string, score: number, total: number) => void
  addGoal: (text: string, targetDate: string) => void
  toggleGoal: (id: string) => void
  removeGoal: (id: string) => void
  unlockBadge: (badgeId: string) => void
  // UX improvement actions
  setLearningMode: (mode: 'learning' | 'quickReview') => void
  setDailyGoalMinutes: (minutes: number) => void
  updateModuleProgress: (topicId: string, sectionId: string) => void
  setLastViewedTopic: (topicId: string) => void
  addMilestone: (milestone: string) => void
  toggleFavoriteAcronym: (acronym: string) => void
  addFocusSession: (minutes: number) => void
  completeDailyChallenge: () => void
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'content' | 'category' | 'color'>>) => void
  deleteNote: (id: string) => void
  addStudyActivity: () => void
  markEquipmentReviewed: (id: string) => void
  // Notifications
  notifications: AchievementNotification[]
  addNotification: (notification: Omit<AchievementNotification, 'id' | 'timestamp'>) => void
  dismissNotification: (id: string) => void
  getRecentNotifications: () => AchievementNotification[]
  clearNotificationHistory: () => void

  // Settings
  settings: AppSettings
  updateSettings: (partial: Partial<AppSettings>) => void
  resetProgress: () => void
  importProgress: (progress: ProgressData) => void
  importSettings: (settings: AppSettings) => void
}

const defaultProgress: ProgressData = {
  readTopics: [],
  quizScores: [],
  completedSimulations: [],
  bookmarks: [],
  completedChecklists: {},
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: '',
  badges: [],
  goals: [],
  timeSpent: {},
  diagnosticCompleted: false,
  diagnosticScores: {},
  suggestedPath: [],
  onboarded: false,
  moduleQuizScores: {},
  moduleProgress: {},
  milestones: [],
  lastViewedTopic: '',
  favoriteAcronyms: [],
  focusSessionsToday: 0,
  focusMinutesToday: 0,
  lastFocusDate: '',
  dailyChallengeCompleted: '',
  dailyChallengeStreak: 0,
  notes: [],
  studyActivityLog: {},
  equipmentReviewed: [],
  notificationHistory: [],
}

const defaultAISettings: AISettings = {
  provider: 'zai',
  apiKey: '',
  model: '',
  customEndpoint: '',
  systemPrompt: '',
  temperature: 0.7,
  maxTokens: 1024,
}

const defaultSettings: AppSettings = {
  theme: 'light',
  fontSize: 'medium',
  accentColor: 'navy',
  highContrast: false,
  textToSpeech: false,
  ttsVoice: 'jam',
  ttsSpeed: 1.0,
  reducedMotion: false,
  learningMode: 'learning',
  dailyGoalMinutes: 15,
  language: 'en',
  ai: defaultAISettings,
}

// Badge definitions
export const BADGE_DEFINITIONS: BadgeData[] = [
  { id: 'first-step', title: 'First Step', description: 'Read your first topic', icon: '👣', category: 'progress' },
  { id: 'halfway', title: 'Halfway There', description: 'Complete 4 of 8 roadmap topics', icon: '🏁', category: 'progress' },
  { id: 'roadmap-complete', title: 'Roadmap Master', description: 'Complete all 8 roadmap topics', icon: '🏆', category: 'progress' },
  { id: 'quiz-novice', title: 'Quiz Novice', description: 'Complete your first quiz', icon: '📝', category: 'quiz' },
  { id: 'quiz-ace', title: 'Quiz Ace', description: 'Score 90%+ on a quiz', icon: '⭐', category: 'quiz' },
  { id: 'quiz-master', title: 'Quiz Master', description: 'Complete 5 quizzes', icon: '🧠', category: 'quiz' },
  { id: 'sim-hero', title: 'Scenario Hero', description: 'Complete your first simulation', icon: '🦸', category: 'simulation' },
  { id: 'sim-veteran', title: 'Scenario Veteran', description: 'Complete 5 simulations', icon: '🎖️', category: 'simulation' },
  { id: 'streak-3', title: '3-Day Streak', description: 'Study 3 days in a row', icon: '🔥', category: 'streak' },
  { id: 'streak-7', title: '7-Day Streak', description: 'Study 7 days in a row', icon: '🔥', category: 'streak' },
  { id: 'streak-30', title: '30-Day Streak', description: 'Study 30 days in a row', icon: '💎', category: 'streak' },
  { id: 'bookworm', title: 'Bookworm', description: 'Bookmark 10 terms', icon: '📚', category: 'special' },
  { id: 'drug-expert', title: 'Drug Expert', description: 'Review all drug cards', icon: '💊', category: 'special' },
  { id: 'diagnostic-done', title: 'Self-Aware', description: 'Complete the diagnostic assessment', icon: '🎯', category: 'special' },
  { id: 'full-checklist', title: 'Assessment Ready', description: 'Complete a full assessment checklist', icon: '✅', category: 'special' },
  { id: 'focus-4', title: 'Focus Champion', description: 'Complete 4 focus sessions in one day', icon: '⏱️', category: 'special' },
]

export const XP_PER_ACTION = {
  READ_TOPIC: 25,
  QUIZ_COMPLETE: 30,
  QUIZ_PERFECT: 50,
  SIMULATION_COMPLETE: 40,
  BOOKMARK: 5,
  DAILY_LOGIN: 10,
  MODULE_QUIZ: 15,
}

export function getLevelFromXp(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function getXpForNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const level = getLevelFromXp(xp)
  const currentLevelXp = (level - 1) * 100
  const xpInLevel = xp - currentLevelXp
  return { current: xpInLevel, needed: 100, progress: xpInLevel / 100 }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

function checkStreak(lastStudyDate: string): { streak: number; lastDate: string } {
  const today = new Date().toISOString().split('T')[0]
  if (lastStudyDate === today) return { streak: 0, lastDate: today }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (lastStudyDate === yesterday) {
    return { streak: 1, lastDate: today }
  }
  // Streak broken - reset to 1 for today
  return { streak: 1, lastDate: today }
}

function checkAndUnlockBadges(progress: ProgressData): { newBadges: string[]; newMilestones: string[] } {
  const newBadges: string[] = []
  const newMilestones: string[] = []
  const badges = progress.badges
  const milestones = progress.milestones

  const unlock = (id: string, milestone?: string) => {
    if (!badges.includes(id)) newBadges.push(id)
    if (milestone && !milestones.includes(milestone)) newMilestones.push(milestone)
  }

  if (progress.readTopics.length >= 1) unlock('first-step', 'first-topic')
  if (progress.readTopics.length >= 4) unlock('halfway', 'half-roadmap')
  if (progress.readTopics.length >= 8) unlock('roadmap-complete', 'full-roadmap')
  if (progress.quizScores.length >= 1) unlock('quiz-novice', 'first-quiz')
  if (progress.quizScores.some(q => (q.score / q.total) >= 0.9)) unlock('quiz-ace', 'quiz-ace')
  if (progress.quizScores.length >= 5) unlock('quiz-master', 'quiz-veteran')
  if (progress.completedSimulations.length >= 1) unlock('sim-hero', 'first-simulation')
  if (progress.completedSimulations.length >= 5) unlock('sim-veteran', 'simulation-veteran')
  if (progress.streak >= 3) unlock('streak-3', 'streak-3')
  if (progress.streak >= 7) unlock('streak-7', 'streak-7')
  if (progress.streak >= 30) unlock('streak-30', 'streak-30')
  if (progress.bookmarks.length >= 10) unlock('bookworm', 'bookworm')
  if (progress.diagnosticCompleted) unlock('diagnostic-done', 'diagnostic-completed')

  // Check if any checklist is fully completed
  const fullChecklist = Object.entries(progress.completedChecklists).some(([_sceneId, checks]) => {
    const scene = checks
    return scene && scene.length > 0 && scene.every(c => c === true)
  })
  if (fullChecklist) unlock('full-checklist', 'checklist-complete')
  if (progress.focusSessionsToday >= 4) unlock('focus-4', 'focus-champion')

  return { newBadges, newMilestones }
}

export const useAppStore = create<AppState>((set, get) => ({
  activeSection: 'home',
  activeSubSection: '',
  sidebarOpen: false,
  searchOpen: false,

  setActiveSection: (section) => {
    set({ activeSection: section, activeSubSection: '' })
  },
  setActiveSubSection: (sub) => {
    set({ activeSubSection: sub })
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSearchOpen: (open) => set({ searchOpen: open }),

  progress: defaultProgress,

  markTopicRead: (topicId) => {
    const p = get().progress
    if (p.readTopics.includes(topicId)) return
    const today = new Date().toISOString().split('T')[0]
    const { streak: streakAdd } = checkStreak(p.lastStudyDate)
    const newStreak = p.lastStudyDate === today ? p.streak : p.streak + streakAdd
    const newXp = p.xp + XP_PER_ACTION.READ_TOPIC

    const updated = {
      ...p,
      readTopics: [...p.readTopics, topicId],
      xp: newXp,
      level: getLevelFromXp(newXp),
      streak: newStreak,
      lastStudyDate: today,
    }
    // Check badges
    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    // Track study activity
    const log = { ...updated.studyActivityLog }
    log[today] = (log[today] || 0) + 1
    updated.studyActivityLog = log

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addQuizScore: (score, total, category) => {
    const p = get().progress
    const isPerfect = score === total
    const xpGain = XP_PER_ACTION.QUIZ_COMPLETE + (isPerfect ? XP_PER_ACTION.QUIZ_PERFECT : 0)
    const newXp = p.xp + xpGain
    const today = new Date().toISOString().split('T')[0]
    const { streak: streakAdd } = checkStreak(p.lastStudyDate)
    const newStreak = p.lastStudyDate === today ? p.streak : p.streak + streakAdd

    const updated = {
      ...p,
      quizScores: [...p.quizScores, { date: new Date().toISOString(), score, total, category }],
      xp: newXp,
      level: getLevelFromXp(newXp),
      streak: newStreak,
      lastStudyDate: today,
    }
    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    // Track study activity
    const quizLog = { ...updated.studyActivityLog }
    quizLog[today] = (quizLog[today] || 0) + 1
    updated.studyActivityLog = quizLog

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addCompletedSimulation: (id) => {
    const p = get().progress
    if (p.completedSimulations.includes(id)) return
    const newXp = p.xp + XP_PER_ACTION.SIMULATION_COMPLETE
    const today = new Date().toISOString().split('T')[0]
    const { streak: streakAdd } = checkStreak(p.lastStudyDate)
    const newStreak = p.lastStudyDate === today ? p.streak : p.streak + streakAdd

    const updated = {
      ...p,
      completedSimulations: [...p.completedSimulations, id],
      xp: newXp,
      level: getLevelFromXp(newXp),
      streak: newStreak,
      lastStudyDate: today,
    }
    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    // Track study activity
    const simLog = { ...updated.studyActivityLog }
    simLog[today] = (simLog[today] || 0) + 1
    updated.studyActivityLog = simLog

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  toggleBookmark: (term) => {
    const p = get().progress
    const isAdding = !p.bookmarks.includes(term)
    const bookmarks = isAdding
      ? [...p.bookmarks, term]
      : p.bookmarks.filter((b) => b !== term)
    const newXp = isAdding ? p.xp + XP_PER_ACTION.BOOKMARK : p.xp
    const updated = { ...p, bookmarks, xp: newXp, level: getLevelFromXp(newXp) }

    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  updateChecklist: (sceneId, index, checked) => {
    const p = get().progress
    const checks = [...(p.completedChecklists[sceneId] || [])]
    checks[index] = checked
    const updated = {
      ...p,
      completedChecklists: { ...p.completedChecklists, [sceneId]: checks },
    }
    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addXp: (amount) => {
    const p = get().progress
    const newXp = p.xp + amount
    const updated = { ...p, xp: newXp, level: getLevelFromXp(newXp) }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  updateTimeSpent: (topicId, seconds) => {
    const p = get().progress
    const updated = {
      ...p,
      timeSpent: { ...p.timeSpent, [topicId]: (p.timeSpent[topicId] || 0) + seconds },
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  setDiagnosticScores: (scores) => {
    const p = get().progress
    const categories = Object.keys(scores)
    const weakCategories = categories.filter(c => scores[c] < 60).sort((a, b) => scores[a] - scores[b])
    const strongCategories = categories.filter(c => scores[c] >= 60).sort((a, b) => scores[a] - scores[b])

    // Build suggested path: weak categories first, then strong
    const topicMapping: Record<string, string> = {
      'OHS': 'osh',
      'FA': 'first-aider',
      'BLS': 'chain-of-survival',
      'Assessment': 'assessment-procedure',
      'Trauma': 'action-plan',
      'Med Emerg': 'chain-of-survival',
      'AMATS': 'amats',
      'Legal': 'rules-law',
      'Drugs': 'assessment-procedure',
      'TESDA Standards': 'life-on-the-line',
    }

    const suggestedPath = [
      ...weakCategories.map(c => topicMapping[c] || c),
      ...strongCategories.map(c => topicMapping[c] || c),
    ].filter((v, i, a) => a.indexOf(v) === i)

    const updated = {
      ...p,
      diagnosticCompleted: true,
      diagnosticScores: scores,
      suggestedPath,
      xp: p.xp + XP_PER_ACTION.DAILY_LOGIN,
      level: getLevelFromXp(p.xp + XP_PER_ACTION.DAILY_LOGIN),
    }
    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  setOnboarded: () => {
    const p = get().progress
    const updated = { ...p, onboarded: true }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addModuleQuizScore: (topicId, score, total) => {
    const p = get().progress
    const newXp = p.xp + XP_PER_ACTION.MODULE_QUIZ
    const updated = {
      ...p,
      moduleQuizScores: { ...p.moduleQuizScores, [topicId]: { score, total } },
      xp: newXp,
      level: getLevelFromXp(newXp),
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addGoal: (text, targetDate) => {
    const p = get().progress
    const goal: LearningGoal = { id: Date.now().toString(), text, targetDate, completed: false }
    const updated = { ...p, goals: [...p.goals, goal] }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  toggleGoal: (id) => {
    const p = get().progress
    const updated = {
      ...p,
      goals: p.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g),
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  removeGoal: (id) => {
    const p = get().progress
    const updated = { ...p, goals: p.goals.filter(g => g.id !== id) }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  unlockBadge: (badgeId) => {
    const p = get().progress
    if (p.badges.includes(badgeId)) return
    const updated = { ...p, badges: [...p.badges, badgeId] }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  setLearningMode: (mode) => {
    const updated = { ...get().settings, learningMode: mode }
    saveToStorage('ems-settings', updated)
    set({ settings: updated })
  },

  setDailyGoalMinutes: (minutes) => {
    const updated = { ...get().settings, dailyGoalMinutes: minutes }
    saveToStorage('ems-settings', updated)
    set({ settings: updated })
  },

  updateModuleProgress: (topicId, sectionId) => {
    const p = get().progress
    const existing = p.moduleProgress[topicId] || { sectionsCompleted: [], totalSections: 0 }
    if (existing.sectionsCompleted.includes(sectionId)) return
    const updatedModule = {
      sectionsCompleted: [...existing.sectionsCompleted, sectionId],
      totalSections: existing.totalSections,
    }
    const updated = {
      ...p,
      moduleProgress: { ...p.moduleProgress, [topicId]: updatedModule },
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  setLastViewedTopic: (topicId) => {
    const p = get().progress
    const updated = { ...p, lastViewedTopic: topicId }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addMilestone: (milestone) => {
    const p = get().progress
    if (p.milestones.includes(milestone)) return
    const updated = { ...p, milestones: [...p.milestones, milestone] }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  toggleFavoriteAcronym: (acronym) => {
    const p = get().progress
    const isFav = p.favoriteAcronyms.includes(acronym)
    const updated = {
      ...p,
      favoriteAcronyms: isFav
        ? p.favoriteAcronyms.filter((a) => a !== acronym)
        : [...p.favoriteAcronyms, acronym],
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addFocusSession: (minutes) => {
    const p = get().progress
    const today = new Date().toISOString().split('T')[0]
    // Reset counters if it's a new day
    const isNewDay = p.lastFocusDate !== today
    const sessions = isNewDay ? 1 : (p.focusSessionsToday || 0) + 1
    const totalMinutes = isNewDay ? minutes : (p.focusMinutesToday || 0) + minutes
    const xpGain = 20
    const newXp = p.xp + xpGain

    const updated = {
      ...p,
      focusSessionsToday: sessions,
      focusMinutesToday: totalMinutes,
      lastFocusDate: today,
      xp: newXp,
      level: getLevelFromXp(newXp),
    }

    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    // Track study activity
    const focusLog = { ...updated.studyActivityLog }
    focusLog[today] = (focusLog[today] || 0) + 1
    updated.studyActivityLog = focusLog

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  completeDailyChallenge: () => {
    const p = get().progress
    const today = new Date().toISOString().split('T')[0]
    if (p.dailyChallengeCompleted === today) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const newStreak = p.dailyChallengeCompleted === yesterday ? (p.dailyChallengeStreak || 0) + 1 : 1
    const xpGain = 50
    const newXp = p.xp + xpGain
    const todayISO = new Date().toISOString()

    const updated = {
      ...p,
      dailyChallengeCompleted: todayISO,
      dailyChallengeStreak: newStreak,
      xp: newXp,
      level: getLevelFromXp(newXp),
      streak: newStreak > p.streak ? newStreak : p.streak,
      lastStudyDate: today,
    }

    const { newBadges, newMilestones } = checkAndUnlockBadges(updated)
    if (newBadges.length > 0) updated.badges = [...updated.badges, ...newBadges]
    if (newMilestones.length > 0) updated.milestones = [...updated.milestones, ...newMilestones]

    // Track study activity
    const dcLog = { ...updated.studyActivityLog }
    dcLog[today] = (dcLog[today] || 0) + 1
    updated.studyActivityLog = dcLog

    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addNote: (note) => {
    const p = get().progress
    if (p.notes.length >= 50) return
    const newNote: Note = {
      ...note,
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = { ...p, notes: [newNote, ...p.notes] }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  updateNote: (id, updates) => {
    const p = get().progress
    const updated = {
      ...p,
      notes: p.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n),
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  deleteNote: (id) => {
    const p = get().progress
    const updated = { ...p, notes: p.notes.filter(n => n.id !== id) }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  addStudyActivity: () => {
    const p = get().progress
    const today = new Date().toISOString().split('T')[0]
    const log = { ...p.studyActivityLog }
    log[today] = (log[today] || 0) + 1
    const updated = { ...p, studyActivityLog: log }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  markEquipmentReviewed: (id) => {
    const p = get().progress
    if (p.equipmentReviewed.includes(id)) return
    const updated = {
      ...p,
      equipmentReviewed: [...p.equipmentReviewed, id],
      xp: p.xp + 5,
      level: getLevelFromXp(p.xp + 5),
    }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  notifications: [],

  addNotification: (notification) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    const full: AchievementNotification = {
      ...notification,
      id,
      timestamp: Date.now(),
    }
    // Add to active notification queue (max 5 visible)
    const current = get().notifications
    const updated = [full, ...current].slice(0, 5)
    set({ notifications: updated })

    // Persist to history (max 50)
    const p = get().progress
    const history = [full, ...(p.notificationHistory || [])].slice(0, 50)
    const updatedProgress = { ...p, notificationHistory: history }
    saveToStorage('ems-progress', updatedProgress)
    set({ progress: updatedProgress })

    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().dismissNotification(id)
    }, 5500)
  },

  dismissNotification: (id) => {
    const current = get().notifications
    set({ notifications: current.filter(n => n.id !== id) })
  },

  getRecentNotifications: () => {
    return get().progress.notificationHistory?.slice(0, 5) || []
  },

  clearNotificationHistory: () => {
    const p = get().progress
    const updated = { ...p, notificationHistory: [] }
    saveToStorage('ems-progress', updated)
    set({ progress: updated })
  },

  settings: defaultSettings,
  updateSettings: (partial) => {
    const updated = { ...get().settings, ...partial }
    saveToStorage('ems-settings', updated)
    set({ settings: updated })
    if (partial.theme !== undefined) {
      document.documentElement.classList.toggle('dark', partial.theme === 'dark')
    }
    if (partial.fontSize !== undefined) {
      document.documentElement.setAttribute('data-font-size', partial.fontSize)
    }
    if (partial.reducedMotion !== undefined) {
      document.documentElement.classList.toggle('reduce-motion', partial.reducedMotion)
    }
  },
  resetProgress: () => {
    saveToStorage('ems-progress', defaultProgress)
    set({ progress: defaultProgress })
  },
  importProgress: (importedProgress) => {
    const migrated: ProgressData = { ...defaultProgress, ...importedProgress }
    saveToStorage('ems-progress', migrated)
    set({ progress: migrated })
  },
  importSettings: (importedSettings) => {
    const migrated: AppSettings = {
      ...defaultSettings,
      ...importedSettings,
      ai: { ...defaultAISettings, ...(importedSettings.ai || {}) },
    }
    saveToStorage('ems-settings', migrated)
    set({ settings: migrated })
    if (migrated.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.setAttribute('data-font-size', migrated.fontSize)
    document.documentElement.classList.toggle('reduce-motion', migrated.reducedMotion)
  },
}))

// Hydrate from localStorage on client
if (typeof window !== 'undefined') {
  const storedProgress = loadFromStorage<ProgressData>('ems-progress', defaultProgress)
  const storedSettings = loadFromStorage<AppSettings>('ems-settings', defaultSettings)

  // Migrate old data that doesn't have new fields
  const migratedProgress: ProgressData = {
    ...defaultProgress,
    ...storedProgress,
    xp: storedProgress.xp || 0,
    level: storedProgress.level || 1,
    streak: storedProgress.streak || 0,
    lastStudyDate: storedProgress.lastStudyDate || '',
    badges: storedProgress.badges || [],
    goals: storedProgress.goals || [],
    timeSpent: storedProgress.timeSpent || {},
    diagnosticCompleted: storedProgress.diagnosticCompleted || false,
    diagnosticScores: storedProgress.diagnosticScores || {},
    suggestedPath: storedProgress.suggestedPath || [],
    onboarded: storedProgress.onboarded || false,
    moduleQuizScores: storedProgress.moduleQuizScores || {},
    moduleProgress: storedProgress.moduleProgress || {},
    milestones: storedProgress.milestones || [],
    lastViewedTopic: storedProgress.lastViewedTopic || '',
    favoriteAcronyms: storedProgress.favoriteAcronyms || [],
    focusSessionsToday: storedProgress.focusSessionsToday || 0,
    focusMinutesToday: storedProgress.focusMinutesToday || 0,
    lastFocusDate: storedProgress.lastFocusDate || '',
    dailyChallengeCompleted: storedProgress.dailyChallengeCompleted || '',
    dailyChallengeStreak: storedProgress.dailyChallengeStreak || 0,
    notes: storedProgress.notes || [],
    studyActivityLog: storedProgress.studyActivityLog || {},
    equipmentReviewed: storedProgress.equipmentReviewed || [],
    notificationHistory: storedProgress.notificationHistory || [],
  }

  const migratedSettings: AppSettings = {
    ...defaultSettings,
    ...storedSettings,
    learningMode: storedSettings.learningMode || 'learning',
    dailyGoalMinutes: storedSettings.dailyGoalMinutes || 15,
    language: storedSettings.language || 'en',
    ttsVoice: storedSettings.ttsVoice || 'jam',
    ttsSpeed: storedSettings.ttsSpeed ?? 1.0,
    ai: {
      ...defaultAISettings,
      ...(storedSettings.ai || {}),
    },
  }

  useAppStore.setState({
    progress: migratedProgress,
    settings: migratedSettings,
  })

  if (migratedSettings.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
  document.documentElement.setAttribute('data-font-size', migratedSettings.fontSize)
  if (migratedSettings.reducedMotion) {
    document.documentElement.classList.add('reduce-motion')
  }

  // Check daily login streak
  const today = new Date().toISOString().split('T')[0]
  if (migratedProgress.lastStudyDate !== today) {
    const { streak: streakAdd } = checkStreak(migratedProgress.lastStudyDate)
    if (streakAdd > 0) {
      const newStreak = migratedProgress.streak + streakAdd
      const updatedProgress = { ...migratedProgress, streak: newStreak, lastStudyDate: today }
      saveToStorage('ems-progress', updatedProgress)
      useAppStore.setState({ progress: updatedProgress })
    }
  }
}
