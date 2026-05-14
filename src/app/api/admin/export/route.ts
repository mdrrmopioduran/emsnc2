import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ExportType = 'questions' | 'acronyms' | 'definitions' | 'all'
type ExportFormat = 'json' | 'csv'

interface ExportColumn {
  key: string
  label: string
  /** Optional transformer applied when building CSV rows */
  transform?: (val: unknown) => string
}

// ---------------------------------------------------------------------------
// Column definitions per model
// ---------------------------------------------------------------------------

const EXPORT_COLUMNS: Record<Exclude<ExportType, 'all'>, ExportColumn[]> = {
  questions: [
    { key: 'id', label: 'ID' },
    { key: 'question', label: 'Question' },
    {
      key: 'options',
      label: 'Options',
      transform: (val: unknown) => {
        try {
          const parsed = typeof val === 'string' ? JSON.parse(val) : val
          return Array.isArray(parsed) ? parsed.join('; ') : String(val)
        } catch {
          return String(val)
        }
      },
    },
    { key: 'correctAnswer', label: 'Correct Answer' },
    { key: 'explanation', label: 'Explanation' },
    { key: 'category', label: 'Category' },
  ],
  acronyms: [
    { key: 'acronym', label: 'Acronym' },
    { key: 'fullTerm', label: 'Full Term' },
    { key: 'definition', label: 'Definition' },
    { key: 'category', label: 'Category' },
  ],
  definitions: [
    { key: 'term', label: 'Term' },
    { key: 'definition', label: 'Definition' },
    { key: 'example', label: 'Example' },
    { key: 'category', label: 'Category' },
  ],
}

const VALID_TYPES: ExportType[] = ['questions', 'acronyms', 'definitions', 'all']
const VALID_FORMATS: ExportFormat[] = ['json', 'csv']
const ALL_MODELS: Exclude<ExportType, 'all'>[] = ['questions', 'acronyms', 'definitions']

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Escape a value for use inside a CSV field */
function escapeCSV(value: string): string {
  if (value === undefined || value === null) return '""'
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

/** Convert an array of records + column defs into a CSV string */
function toCSV(records: Record<string, unknown>[], columns: ExportColumn[]): string {
  const header = columns.map((col) => escapeCSV(col.label)).join(',')
  const rows = records.map((record) =>
    columns
      .map((col) => {
        const rawVal = record[col.key]
        const value = col.transform ? col.transform(rawVal) : String(rawVal ?? '')
        return escapeCSV(value)
      })
      .join(','),
  )
  return [header, ...rows].join('\n')
}

/** Fetch all records for a single model */
async function fetchRecords(model: Exclude<ExportType, 'all'>): Promise<Record<string, unknown>[]> {
  switch (model) {
    case 'questions':
      return (await db.question.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
    case 'acronyms':
      return (await db.acronym.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
    case 'definitions':
      return (await db.definition.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
  }
}

/**
 * Clean a record for JSON output — parse stored JSON strings back into objects
 * (e.g. the `options` field on questions is stored as a JSON string).
 */
function cleanForJSON(
  records: Record<string, unknown>[],
  columns: ExportColumn[],
): Record<string, unknown>[] {
  return records.map((record) => {
    const cleaned: Record<string, unknown> = {}
    for (const col of columns) {
      const rawVal = record[col.key]
      if (typeof rawVal === 'string' && (rawVal.startsWith('[') || rawVal.startsWith('{'))) {
        try {
          cleaned[col.key] = JSON.parse(rawVal)
        } catch {
          cleaned[col.key] = rawVal
        }
      } else {
        cleaned[col.key] = rawVal
      }
    }
    return cleaned
  })
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as ExportType | null
    const format = (searchParams.get('format') ?? 'json') as ExportFormat

    // --- Validate `type` ---
    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Supported: ${VALID_TYPES.join(', ')}` },
        { status: 400 },
      )
    }

    // --- Validate `format` ---
    if (!VALID_FORMATS.includes(format)) {
      return NextResponse.json(
        { error: `Invalid format. Supported: ${VALID_FORMATS.join(', ')}` },
        { status: 400 },
      )
    }

    const timestamp = new Date().toISOString().split('T')[0]

    // -----------------------------------------------------------------------
    // Single-model export
    // -----------------------------------------------------------------------
    if (type !== 'all') {
      const records = await fetchRecords(type)
      const columns = EXPORT_COLUMNS[type]

      if (format === 'json') {
        const body = JSON.stringify(cleanForJSON(records, columns), null, 2)
        return new NextResponse(body, {
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="ems-${type}-${timestamp}.json"`,
          },
        })
      }

      // CSV
      const csv = toCSV(records, columns)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="ems-${type}-${timestamp}.csv"`,
        },
      })
    }

    // -----------------------------------------------------------------------
    // "all" — export every model at once
    // -----------------------------------------------------------------------

    // Fetch all models in parallel
    const allRecords = await Promise.all(
      ALL_MODELS.map(async (model) => ({
        model,
        records: await fetchRecords(model),
        columns: EXPORT_COLUMNS[model],
      })),
    )

    if (format === 'json') {
      const body: Record<string, unknown> = {}
      for (const { model, records, columns } of allRecords) {
        body[model] = cleanForJSON(records, columns)
      }
      return new NextResponse(JSON.stringify(body, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="ems-all-${timestamp}.json"`,
        },
      })
    }

    // CSV "all" — sections separated by blank lines with a header row per section
    const sections = allRecords.map(
      ({ model, records, columns }) => `### ${model.toUpperCase()}\n${toCSV(records, columns)}`,
    )
    const csv = sections.join('\n\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ems-all-${timestamp}.csv"`,
      },
    })
  } catch (error) {
    console.error('[Export API] GET error:', error)
    return NextResponse.json(
      {
        error: 'Failed to export data',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
