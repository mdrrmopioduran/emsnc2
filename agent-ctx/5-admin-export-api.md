# Task ID: 5 — Admin Dashboard Data Export API

## Summary
Updated the `/api/admin/export` API route to match the exact requirements: renamed `model` query param to `type`, changed CSV options separator from `|` to `;`, and added support for `type=all` to export all three models at once.

## Files Modified

### 1. `/home/z/my-project/src/app/api/admin/export/route.ts`
Full rewrite of the export API handler:
- **Query parameter `type`** (replaces old `model`): supports `questions`, `acronyms`, `definitions`, `all`
- **Query parameter `format`**: supports `json`, `csv`
- **`type=all` + JSON**: Returns a single JSON object with keys `{ questions, acronyms, definitions }`, each containing the full cleaned record array
- **`type=all` + CSV**: Returns a single CSV file with section headers (`### QUESTIONS`, etc.) separating each model's data
- **CSV options field**: Converted from JSON array to semicolon-separated string (`Option A; Option B; Option C`)
- **JSON output**: Parses stored JSON string fields (e.g. `options`) back into proper JSON objects
- **Headers**: Proper `Content-Type` (`application/json` / `text/csv; charset=utf-8`) and `Content-Disposition` (`attachment; filename="ems-{type}-{timestamp}.{ext}"`)
- **Error handling**: 400 for invalid type/format, 500 for server errors with details

### 2. `/home/z/my-project/src/components/ems/admin-section.tsx`
Updated two `fetch()` calls from `?model=` to `?type=` to match the new API parameter name.

## API Usage Examples
```
GET /api/admin/export?type=questions&format=json    → Single model JSON
GET /api/admin/export?type=acronyms&format=csv      → Single model CSV
GET /api/admin/export?type=all&format=json          → All models in one JSON
GET /api/admin/export?type=all&format=csv           → All models in one CSV (sectioned)
GET /api/admin/export?type=definitions&format=json  → Single model JSON
```

## Verification
- ✅ `bun run lint` — 0 errors, 0 warnings
- ✅ Dev server compiles cleanly with HTTP 200
- ✅ No references to old `?model=` parameter remain
