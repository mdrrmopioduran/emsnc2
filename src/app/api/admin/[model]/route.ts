import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

// Model name mapping: URL param → Prisma delegate
const MODEL_MAP: Record<string, keyof typeof db> = {
  'roadmap': 'roadmapTopic',
  'questions': 'question',
  'acronyms': 'acronym',
  'definitions': 'definition',
  'drugs': 'drug',
  'competencies': 'competencyModule',
  'scenarios': 'scenario',
  'emergency-scenarios': 'emergencyScenario',
  'assessment-scenes': 'assessmentScene',
  'roleplay-scenarios': 'roleplayScenario',
}

// Searchable fields per model (for text search)
const SEARCH_FIELDS: Record<string, string[]> = {
  roadmapTopic: ['title', 'shortDescription', 'category'],
  question: ['question', 'category'],
  acronym: ['acronym', 'fullTerm', 'category'],
  definition: ['term', 'category'],
  drug: ['genericName', 'drugClass', 'scope'],
  competencyModule: ['title', 'shortTitle', 'category'],
  scenario: ['title', 'category'],
  emergencyScenario: ['title', 'subtitle', 'category'],
  assessmentScene: ['title'],
  roleplayScenario: ['title', 'subtitle', 'category'],
}

// ID field per model
const ID_FIELD: Record<string, string> = {
  roadmapTopic: 'id',
  question: 'id',
  acronym: 'id',
  definition: 'id',
  drug: 'id',
  competencyModule: 'id',
  scenario: 'id',
  emergencyScenario: 'id',
  assessmentScene: 'id',
  roleplayScenario: 'id',
}

// Default ordering per model
const DEFAULT_ORDER: Record<string, Record<string, string>> = {
  roadmapTopic: { order: 'asc' },
  question: { id: 'asc' },
  acronym: { acronym: 'asc' },
  definition: { term: 'asc' },
  drug: { genericName: 'asc' },
  competencyModule: { title: 'asc' },
  scenario: { title: 'asc' },
  emergencyScenario: { title: 'asc' },
  assessmentScene: { title: 'asc' },
  roleplayScenario: { title: 'asc' },
}

function getModelDelegate(modelKey: string) {
  const delegate = db[MODEL_MAP[modelKey]]
  if (!delegate) return null
  return delegate as {
    findMany: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'findMany'>) => Promise<unknown[]>
    findUnique: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'findUnique'>) => Promise<unknown | null>
    findFirst: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'findFirst'>) => Promise<unknown | null>
    create: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'create'>) => Promise<unknown>
    update: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'update'>) => Promise<unknown>
    delete: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'delete'>) => Promise<unknown>
    count: (args?: Prisma.Args<typeof db, 'roadmapTopic', 'count'>) => Promise<number>
  }
}

function getPrismaModelName(modelKey: string): string {
  return MODEL_MAP[modelKey] || modelKey
}

// GET — List records with optional search and pagination
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    const { model } = await params
    const delegate = getModelDelegate(model)
    if (!delegate) {
      return NextResponse.json(
        { error: `Invalid model: "${model}". Valid models: ${Object.keys(MODEL_MAP).join(', ')}` },
        { status: 400 }
      )
    }

    const prismaModel = getPrismaModelName(model)
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const skip = (page - 1) * limit

    // Build where clause for search
    let where: Record<string, unknown> = {}
    if (search) {
      const searchFields = SEARCH_FIELDS[prismaModel] || []
      if (searchFields.length > 0) {
        where.OR = searchFields.map((field) => ({
          [field]: { contains: search },
        }))
      }
    }

    // Build order clause
    const orderBy = DEFAULT_ORDER[prismaModel] || {}

    const [records, total] = await Promise.all([
      delegate.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      delegate.count({ where }),
    ])

    return NextResponse.json({
      data: records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[Admin API] GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch records', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// POST — Create a new record
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    const { model } = await params
    const delegate = getModelDelegate(model)
    if (!delegate) {
      return NextResponse.json(
        { error: `Invalid model: "${model}". Valid models: ${Object.keys(MODEL_MAP).join(', ')}` },
        { status: 400 }
      )
    }

    const body = await request.json()

    const record = await delegate.create({
      data: body,
    })

    return NextResponse.json({ data: record }, { status: 201 })
  } catch (error) {
    console.error('[Admin API] POST error:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A record with this unique field already exists', details: error.meta },
          { status: 409 }
        )
      }
      if (error.code === 'P2012') {
        return NextResponse.json(
          { error: 'Missing required field', details: error.meta },
          { status: 422 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Failed to create record', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// PUT — Update an existing record by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    const { model } = await params
    const delegate = getModelDelegate(model)
    if (!delegate) {
      return NextResponse.json(
        { error: `Invalid model: "${model}". Valid models: ${Object.keys(MODEL_MAP).join(', ')}` },
        { status: 400 }
      )
    }

    const body = await request.json()
    const prismaModel = getPrismaModelName(model)
    const idField = ID_FIELD[prismaModel] || 'id'
    const id = body[idField]

    if (!id) {
      return NextResponse.json(
        { error: `Missing "${idField}" field in request body` },
        { status: 400 }
      )
    }

    // Remove id from update data
    const { [idField]: _id, ...updateData } = body

    const record = await delegate.update({
      where: { [idField]: id },
      data: updateData,
    })

    return NextResponse.json({ data: record })
  } catch (error) {
    console.error('[Admin API] PUT error:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Record not found' },
          { status: 404 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Failed to update record', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE — Delete a record by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  try {
    const { model } = await params
    const delegate = getModelDelegate(model)
    if (!delegate) {
      return NextResponse.json(
        { error: `Invalid model: "${model}". Valid models: ${Object.keys(MODEL_MAP).join(', ')}` },
        { status: 400 }
      )
    }

    const body = await request.json()
    const prismaModel = getPrismaModelName(model)
    const idField = ID_FIELD[prismaModel] || 'id'
    const id = body[idField]

    if (!id) {
      return NextResponse.json(
        { error: `Missing "${idField}" field in request body` },
        { status: 400 }
      )
    }

    const record = await delegate.delete({
      where: { [idField]: id },
    })

    return NextResponse.json({ data: record })
  } catch (error) {
    console.error('[Admin API] DELETE error:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Record not found' },
          { status: 404 }
        )
      }
    }
    return NextResponse.json(
      { error: 'Failed to delete record', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
