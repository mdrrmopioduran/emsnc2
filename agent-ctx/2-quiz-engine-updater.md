# Task 2: Update quiz engine to show correct answer & explanation after choosing in ALL modes

## Agent: full-stack-developer

## Summary
Updated the QuizEngine component in `/home/z/my-project/src/components/ems/assessment-section.tsx` to show correct answer and explanation after selecting an answer in ALL quiz modes (timed, practice, category, diagnostic), not just practice mode.

## Changes Made

### 1. `handleSelectAnswer` (line 125-133)
- Removed mode-specific guard: `if (showResult && mode !== 'timed' && mode !== 'diagnostic') return` → `if (showResult) return`
- Changed `setShowResult(true)` from practice-only to all modes
- Removed auto-advance logic that was practice-specific

### 2. `handleNext` (line 135-143)
- Changed `setShowResult(mode === 'practice')` to `setShowResult(nextAnswer !== null)`
- Now shows result when navigating to a previously answered question in ANY mode

### 3. `handlePrev` (line 145-153)
- Same change as handleNext: shows result for previously answered questions in all modes

### 4. Explanation section (line 476-497)
- Removed `mode === 'practice'` condition from the rendering guard
- Enhanced explanation box to show:
  - ✓ Correct! / ✗ Incorrect header
  - "Your answer: [option text]" (shown in red when incorrect)
  - "Correct answer: [option text]" (always shown in green)
  - Full explanation text

### 5. Navigation section (line 501-522)
- After result is shown: displays "Next" button (or "Finish" on last question) for ALL modes
- Before result: only shows "Finish Quiz" for timed/diagnostic modes
- Removed mode-specific "Check Answer" button since answer selection now auto-reveals result

## Verification
- ESLint passes clean with no errors
- Dev server compiles successfully
- All quiz modes now have consistent answer feedback behavior
