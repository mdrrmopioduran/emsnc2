# Task 5: Competencies Section Bilingual Support & TTS Integration

## Summary
Updated `/src/components/ems/competencies-section.tsx` to use `useTranslatedContent` and `useTranslation` hooks for full bilingual (English/Filipino) support, and added comprehensive TTS buttons.

## Files Modified
1. **`/src/data/translations.ts`** — Added 40+ new `comp.*` translation keys for competencies section UI labels (both English and Filipino)
2. **`/src/components/ems/competencies-section.tsx`** — Major refactor to integrate bilingual hooks and add TTS buttons

## Key Changes

### ModuleGrid
- Added `tc = useTranslatedContent()` and `{ t } = useTranslation()`
- All UI text now uses `t()` translation keys
- Search filter now also searches in translated title/description

### ModuleCard
- Added `tc = useTranslatedContent()`
- `module.title` → `tc.getModuleTitle(module)`, `module.description` → `tc.getModuleDesc(module)`
- Added SpeakerButton next to title reading the short description

### ModuleDetail
- Added `tc` and `{ t }` hooks
- Extracts all translated content at top (moduleTitle, moduleDesc, moduleNotes, etc.)
- Passes translated content as props to each tab component
- All UI labels translated

### SectionCompleteButton
- Added `{ t } = useTranslation()`
- "Section completed!" → `t('common.completed')!`
- "Mark as Complete" → `t('roadmap.markComplete')`

### All Tab Components (ReviewerNotesTab, ProceduresTab, VisualsTab, KeyPointsTab, AssessorQuestionsTab, MemorizationTipsTab, FlashcardsTab, MiniQuizTab)
- Each receives translated content via props instead of using `module.*` directly
- Each uses `useTranslation()` for UI labels
- All hardcoded English replaced with translation keys

### New TTS Buttons
- **ModuleCard**: SpeakerButton next to title (reads description)
- **ProceduresTab**: TTS button for reading all steps when expanded
- **VisualsTab**: SpeakerButton next to each visual description
- **MiniQuizTab**: SpeakerButton on explanation text when revealed

## Verification
- `bun run lint` passes with no errors
- Dev server compiles successfully
