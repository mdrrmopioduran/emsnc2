# Task 7 - Header & Layout Updater

## Summary
Updated the header component with mobile breadcrumbs and a Continue Learning mini-banner, and added a mobile bottom navigation bar to the page layout.

## Changes Made

### src/components/ems/header.tsx
- **Mobile breadcrumbs**: Removed `hidden md:block` wrapper so breadcrumbs now display on both mobile and desktop. On mobile: shows `section › subsection`. On sm+: shows `EMS NCII › section › subsection`.
- **Continue Learning banner**: Added a mini-banner below the header that appears when `progress.lastViewedTopic` is set. Shows a Play icon, the topic name, and a "Resume" button. Clicking Resume navigates to the roadmap section with that topic as activeSubSection and closes the sidebar.
- **Sticky container**: Wrapped header + banner in a single sticky div for proper stacking behavior.
- **Preserved elements**: Search button, streak indicator, XP/level badge, TESDA badge all kept intact.

### src/app/page.tsx
- **MobileBottomNav component**: New component with 5 navigation items (Roadmap/BookOpen, Study/BookText, Visual/Heart, Assessment/ClipboardCheck, Settings/Settings).
- **Active state**: Active section highlighted with `text-primary` + `font-semibold`.
- **CSS class**: Uses `mobile-bottom-nav` which is already defined in globals.css with `env(safe-area-inset-bottom)` and `@media (min-width: 768px) { display: none }`.
- **Click handler**: Sets activeSection and calls setSidebarOpen(false).
- **Bottom padding**: Main content area uses `pb-16 md:pb-6` to account for bottom nav on mobile.
- **Accessibility**: Added aria-label and aria-current attributes.

## Lint & Build Status
- ✅ Lint passes cleanly
- ✅ Dev server compiles successfully
