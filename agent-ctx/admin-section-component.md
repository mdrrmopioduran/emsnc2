# Admin Section Component - Work Record

## Task
Create the admin dashboard component for the EMS NCII Training Platform at `src/components/ems/admin-section.tsx`.

## What was done
- Created a comprehensive 1304-line admin dashboard component with:
  - Header with "Admin Dashboard" title and Seed Database button
  - Tab navigation for 10 data modules (Roadmap Topics, Questions, Acronyms, Definitions, Drugs, Competencies, Scenarios, Emergency Scenarios, Assessment Scenes, Roleplay Scenarios)
  - Each tab has a data table/list view with search, pagination (20/page), Add New, Edit, Delete
  - Dynamic form generation in Add/Edit dialog based on model field configs
  - JSON array/object fields with helper text for proper format
  - Select dropdowns for category/difficulty/scope fields
  - Delete confirmation dialog
  - API calls to `/api/admin/[model]` for CRUD operations and `/api/admin/seed` for seeding
  - Toast notifications via sonner
  - Loading states with spinners
  - Empty state messages
  - Responsive design for mobile and desktop
  - EMS color scheme (Navy #1E3A5F, Red #E63946, Teal #2EC4B6, Amber #FFB703)

## Technical decisions
- Used `key` prop on RecordDialog wrapper to force remount when switching between records, avoiding the need for useEffect to reset form state (which would trigger lint errors)
- Used RecordDialogContent as the inner component and RecordDialog as the wrapper with key
- All table column render functions properly handle `unknown` types by using ternary operators instead of `&&` short-circuit to avoid ReactNode type issues

## Files created/modified
- `src/components/ems/admin-section.tsx` - New file (1304 lines)

## Verification
- ESLint: passes with no errors
- TypeScript: no errors in admin-section.tsx
- Dev server: running and responding with 200
