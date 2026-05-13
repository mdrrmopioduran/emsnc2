import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Import static data
import { roadmapTopics } from '@/data/roadmap'
import { questions } from '@/data/questions'
import { acronyms } from '@/data/acronyms'
import { definitions } from '@/data/definitions'
import { drugs } from '@/data/drugs'
import { competencyModules } from '@/data/competencies'
import { scenarios } from '@/data/scenarios'
import { emergencyScenarios } from '@/data/emergency-scenarios'
import { assessmentScenes } from '@/data/assessment-scenes'
import { roleplayScenarios } from '@/data/roleplay-scenarios'

// GET — Return record counts for each model
export async function GET() {
  try {
    const [
      roadmapCount,
      questionCount,
      acronymCount,
      definitionCount,
      drugCount,
      competencyCount,
      scenarioCount,
      emergencyScenarioCount,
      assessmentSceneCount,
      roleplayScenarioCount,
    ] = await Promise.all([
      db.roadmapTopic.count(),
      db.question.count(),
      db.acronym.count(),
      db.definition.count(),
      db.drug.count(),
      db.competencyModule.count(),
      db.scenario.count(),
      db.emergencyScenario.count(),
      db.assessmentScene.count(),
      db.roleplayScenario.count(),
    ])

    return NextResponse.json({
      counts: {
        roadmap: roadmapCount,
        questions: questionCount,
        acronyms: acronymCount,
        definitions: definitionCount,
        drugs: drugCount,
        competencies: competencyCount,
        scenarios: scenarioCount,
        'emergency-scenarios': emergencyScenarioCount,
        'assessment-scenes': assessmentSceneCount,
        'roleplay-scenarios': roleplayScenarioCount,
      },
    })
  } catch (error) {
    console.error('[Seed API] GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch counts', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// POST — Seed the database from static TypeScript data files
export async function POST() {
  try {
    const results: Record<string, number> = {}

    // 1. Seed Roadmap Topics
    await db.roadmapTopic.deleteMany()
    for (const topic of roadmapTopics) {
      await db.roadmapTopic.create({
        data: {
          id: topic.id,
          order: topic.order,
          icon: topic.icon,
          title: topic.title,
          badge: topic.badge,
          badgeClass: topic.badgeClass,
          shortDescription: topic.shortDescription,
          content: topic.content,
          keyPoints: JSON.stringify(topic.keyPoints),
          category: topic.category,
          categoryColor: topic.categoryColor,
          difficulty: topic.difficulty,
          estimatedMinutes: topic.estimatedMinutes,
          xpReward: topic.xpReward,
          outcomes: JSON.stringify(topic.outcomes),
          whatYoullLearn: JSON.stringify(topic.whatYoullLearn),
          quickNotes: JSON.stringify(topic.quickNotes),
          sections: JSON.stringify(topic.sections),
          isCritical: topic.isCritical,
        },
      })
    }
    results.roadmap = roadmapTopics.length

    // 2. Seed Questions
    await db.question.deleteMany()
    for (const q of questions) {
      await db.question.create({
        data: {
          id: q.id,
          question: q.question,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          category: q.category,
        },
      })
    }
    results.questions = questions.length

    // 3. Seed Acronyms
    await db.acronym.deleteMany()
    for (const a of acronyms) {
      await db.acronym.create({
        data: {
          acronym: a.acronym,
          fullTerm: a.fullTerm,
          definition: a.definition,
          category: a.category,
        },
      })
    }
    results.acronyms = acronyms.length

    // 4. Seed Definitions
    await db.definition.deleteMany()
    for (const d of definitions) {
      await db.definition.create({
        data: {
          term: d.term,
          definition: d.definition,
          example: d.example,
          category: d.category,
        },
      })
    }
    results.definitions = definitions.length

    // 5. Seed Drugs
    await db.drug.deleteMany()
    for (const d of drugs) {
      await db.drug.create({
        data: {
          id: d.id,
          genericName: d.genericName,
          brandNames: JSON.stringify(d.brandNames),
          drugClass: d.drugClass,
          indications: JSON.stringify(d.indications),
          contraindications: JSON.stringify(d.contraindications),
          adultDose: d.adultDose,
          pediatricDose: d.pediatricDose,
          route: d.route,
          sideEffects: JSON.stringify(d.sideEffects),
          specialNotes: d.specialNotes,
          scope: d.scope,
        },
      })
    }
    results.drugs = drugs.length

    // 6. Seed Competency Modules
    await db.competencyModule.deleteMany()
    for (const c of competencyModules) {
      await db.competencyModule.create({
        data: {
          id: c.id,
          title: c.title,
          shortTitle: c.shortTitle,
          description: c.description,
          icon: c.icon,
          color: c.color,
          category: c.category,
          reviewerNotes: c.reviewerNotes,
          procedures: JSON.stringify(c.procedures),
          visualIllustrations: JSON.stringify(c.visualIllustrations),
          keyPoints: JSON.stringify(c.keyPoints),
          assessorQuestions: JSON.stringify(c.assessorQuestions),
          memorizationTips: JSON.stringify(c.memorizationTips),
          flashcards: JSON.stringify(c.flashcards),
          miniQuiz: JSON.stringify(c.miniQuiz),
        },
      })
    }
    results.competencies = competencyModules.length

    // 7. Seed Scenarios
    await db.scenario.deleteMany()
    for (const s of scenarios) {
      await db.scenario.create({
        data: {
          id: s.id,
          title: s.title,
          description: s.description,
          category: s.category,
          startStepId: s.startStepId,
          steps: JSON.stringify(s.steps),
        },
      })
    }
    results.scenarios = scenarios.length

    // 8. Seed Emergency Scenarios
    await db.emergencyScenario.deleteMany()
    for (const e of emergencyScenarios) {
      await db.emergencyScenario.create({
        data: {
          id: e.id,
          title: e.title,
          subtitle: e.subtitle,
          description: e.description,
          category: e.category,
          difficulty: e.difficulty,
          duration: e.duration,
          color: e.color,
          icon: e.icon,
          tags: JSON.stringify(e.tags),
          objectives: JSON.stringify(e.objectives),
          initialVitals: JSON.stringify(e.initialVitals),
          startStepId: e.startStepId,
          steps: JSON.stringify(e.steps),
        },
      })
    }
    results['emergency-scenarios'] = emergencyScenarios.length

    // 9. Seed Assessment Scenes
    await db.assessmentScene.deleteMany()
    for (const a of assessmentScenes) {
      await db.assessmentScene.create({
        data: {
          id: a.id,
          title: a.title,
          overview: a.overview,
          steps: JSON.stringify(a.steps),
        },
      })
    }
    results['assessment-scenes'] = assessmentScenes.length

    // 10. Seed Roleplay Scenarios
    await db.roleplayScenario.deleteMany()
    for (const r of roleplayScenarios) {
      await db.roleplayScenario.create({
        data: {
          id: r.id,
          title: r.title,
          subtitle: r.subtitle,
          difficulty: r.difficulty,
          duration: r.duration,
          patients: r.patients,
          skills: JSON.stringify(r.skills),
          color: r.color,
          icon: r.icon,
          description: r.description,
          patientDescription: r.patientDescription,
          phases: JSON.stringify(r.phases),
          teamRoles: JSON.stringify(r.teamRoles),
          vitalSigns: JSON.stringify(r.vitalSigns),
          glossary: JSON.stringify(r.glossary),
        },
      })
    }
    results['roleplay-scenarios'] = roleplayScenarios.length

    return NextResponse.json({
      message: 'Database seeded successfully',
      seeded: results,
    })
  } catch (error) {
    console.error('[Seed API] POST error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// DELETE — Clear all data from all models
export async function DELETE() {
  try {
    const results: Record<string, number> = {}

    // Delete in reverse dependency order (though these models have no relations)
    const deleteOperations = [
      { key: 'roleplay-scenarios', fn: () => db.roleplayScenario.deleteMany() },
      { key: 'assessment-scenes', fn: () => db.assessmentScene.deleteMany() },
      { key: 'emergency-scenarios', fn: () => db.emergencyScenario.deleteMany() },
      { key: 'scenarios', fn: () => db.scenario.deleteMany() },
      { key: 'competencies', fn: () => db.competencyModule.deleteMany() },
      { key: 'drugs', fn: () => db.drug.deleteMany() },
      { key: 'definitions', fn: () => db.definition.deleteMany() },
      { key: 'acronyms', fn: () => db.acronym.deleteMany() },
      { key: 'questions', fn: () => db.question.deleteMany() },
      { key: 'roadmap', fn: () => db.roadmapTopic.deleteMany() },
    ]

    for (const op of deleteOperations) {
      const result = await op.fn()
      results[op.key] = result.count
    }

    return NextResponse.json({
      message: 'All data cleared successfully',
      deleted: results,
    })
  } catch (error) {
    console.error('[Seed API] DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to clear data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
