# Task 4-a: TTS Speaker Buttons for Study Section

## Summary
Added InlineSpeakerButton components to all three Study Section panels (AcronymsPanel, DefinitionsPanel, DrugReferencePanel) in both Learning and Quick Review modes.

## Files Modified
- `/home/z/my-project/src/components/ems/study-section.tsx` - Added import and 6 InlineSpeakerButton instances
- `/home/z/my-project/worklog.md` - Appended work log entry

## Changes Detail

### Import Added
```typescript
import { InlineSpeakerButton } from '@/components/ems/tts-button'
```

### AcronymsPanel (2 buttons)
- **Quick Review Mode** (line ~485): InlineSpeakerButton in action buttons row, text=`${item.acronym}: ${item.fullTerm}. ${item.definition}`
- **Learning Mode** (line ~595): InlineSpeakerButton in action buttons row, text=`${item.acronym}: ${item.fullTerm}. ${item.definition}`

### DefinitionsPanel (2 buttons)
- **Quick Review Mode** (line ~745): InlineSpeakerButton in header row, text=`${item.term}. ${item.definition}`
- **Learning Mode** (line ~812): InlineSpeakerButton next to term name, text=`${item.term}. ${item.definition}`

### DrugReferencePanel (2 buttons)
- **Quick Review Mode** (line ~966): InlineSpeakerButton in badges row, text=`${drug.genericName}. ${drug.drugClass}. Indications: ${drug.indications.join(', ')}`
- **Learning Mode** (line ~1036): InlineSpeakerButton in action buttons row, text=`${drug.genericName}. ${drug.drugClass}. Indications: ${drug.indications.join(', ')}`

## Verification
- Lint check passes (no errors)
- Dev server compiles successfully
- All InlineSpeakerButton instances only render when TTS is enabled in settings
- InlineSpeakerButton handles stopPropagation internally
