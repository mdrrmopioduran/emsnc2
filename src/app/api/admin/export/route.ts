import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Supported export models with their CSV column definitions
type ExportModel = 'questions' | 'acronyms' | 'definitions'

interface ExportColumn {
  key: string
  label: string
  transform?: (val: unknown) => string
}

const EXPORT_COLUMNS: Record<ExportModel, ExportColumn[]> = {
  questions: [
    { key: 'id', label: 'ID' },
    { key: 'question', label: 'Question' },
    {
      key: 'options',
      label: 'Options',
      transform: (val: unknown) => {
        try {
          const parsed = typeof val === 'string' ? JSON.parse(val) : val
          return Array.isArray(parsed) ? parsed.join(' | ') : String(val)
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

// Escape CSV field value
function escapeCSV(value: string): string {
  if (!value) return '""'
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}

// Convert records to CSV string
function toCSV(records: Record<string, unknown>[], columns: ExportColumn[]): string {
  const header = columns.map((col) => escapeCSV(col.label)).join(',')
  const rows = records.map((record) =>
    columns
      .map((col) => {
        const rawVal = record[col.key]
        const value = col.transform ? col.transform(rawVal) : String(rawVal ?? '')
        return escapeCSV(value)
      })
      .join(',')
  )
  return [header, ...rows].join('\n')
}

// Fetch all records for a given model using explicit Prisma calls
async function fetchRecords(model: ExportModel): Promise<Record<string, unknown>[]> {
  switch (model) {
    case 'questions':
      return (await db.question.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
    case 'acronyms':
      return (await db.acronym.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
    case 'definitions':
      return (await db.definition.findMany({ orderBy: { id: 'asc' } })) as unknown as Record<string, unknown>[]
    default:
      return []
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const model = searchParams.get('model') as ExportModel | null
    const format = searchParams.get('format') || 'json'

    if (!model || !EXPORT_COLUMNS[model]) {
      return NextResponse.json(
        { error: 'Invalid model. Supported: questions, acronyms, definitions' },
        { status: 400 }
      )
    }

    if (format !== 'json' && format !== 'csv') {
      return NextResponse.json(
        { error: 'Invalid format. Supported: json, csv' },
        { status: 400 }
      )
    }

    const records = await fetchRecords(model)
    const columns = EXPORT_COLUMNS[model]

    const timestamp = new Date().toISOString().split('T')[0]

    if (format === 'json') {
      // For JSON, parse JSON string fields into actual objects
      const cleanRecords = records.map((record) => {
        const cleaned: Record<string, unknown> = {}
        columns.forEach((col) => {
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
        })
        return cleaned
      })

      const json = JSON.stringify(cleanRecords, null, 2)
      return new NextResponse(json, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="ems-${model}-${timestamp}.json"`,
        },
      })
    }

    // CSV format
    const csv = toCSV(records, columns)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="ems-${model}-${timestamp}.csv"`,
      },
    })
  } catch (error) {
    console.error('[Export API] GET error:', error)
    return NextResponse.json(
      {
        error: 'Failed to export data',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
