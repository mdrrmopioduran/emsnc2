# Task 2 - Store Updater Agent Work Record

## Task
Update the Zustand store at `/home/z/my-project/src/store/app-store.ts` with UX improvement features.

## Changes Made

### Type Definitions
1. **AppSettings** — Added `learningMode: 'learning' | 'quickReview'` (default: 'learning') and `dailyGoalMinutes: number` (default: 15)
2. **ProgressData** — Added `moduleProgress: Record<string, { sectionsCompleted: string[]; totalSections: number }>`, `milestones: string[]`, and `lastViewedTopic: string`
3. **AppState** — Added 5 new action signatures: `setLearningMode`, `setDailyGoalMinutes`, `updateModuleProgress`, `setLastViewedTopic`, `addMilestone`

### Defaults
4. **defaultProgress** — Added `moduleProgress: {}`, `milestones: []`, `lastViewedTopic: ''`
5. **defaultSettings** — Added `learningMode: 'learning'`, `dailyGoalMinutes: 15`

### Badge/Milestone Logic
6. **checkAndUnlockBadges** — Return type changed from `string[]` to `{ newBadges: string[]; newMilestones: string[] }`. Each badge unlock now also sets a corresponding milestone (e.g., 'first-topic', 'half-roadmap', 'first-quiz', 'quiz-ace', 'quiz-veteran', 'first-simulation', 'simulation-veteran', 'streak-3', 'streak-7', 'streak-30', 'bookworm', 'diagnostic-completed', 'checklist-complete')
7. All existing action handlers that call `checkAndUnlockBadges` now destructure and apply `newMilestones`

### New Store Actions
8. **setLearningMode** — Updates `settings.learningMode` with localStorage persistence
9. **setDailyGoalMinutes** — Updates `settings.dailyGoalMinutes` with localStorage persistence
10. **updateModuleProgress** — Adds section to topic's `moduleProgress`, deduplicates, with localStorage persistence
11. **setLastViewedTopic** — Updates `progress.lastViewedTopic` with localStorage persistence
12. **addMilestone** — Appends milestone to `progress.milestones`, deduplicates, with localStorage persistence

### Migration
13. **Hydration/migration** — Added defaults for `moduleProgress`, `milestones`, `lastViewedTopic`, `learningMode`, and `dailyGoalMinutes` to handle existing localStorage data missing these fields

### Fixes
14. Fixed unused `_sceneId` variable in `checkAndUnlockBadges` (renamed from `sceneId`)

## Verification
- `bun run lint` passes cleanly
- All existing functionality preserved
