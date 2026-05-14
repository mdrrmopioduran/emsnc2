'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAppStore } from '@/store/app-store'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Database,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Check,
  X,
  Loader2,
  BookOpen,
  HelpCircle,
  Pill,
  Shield,
  Activity,
  Stethoscope,
  ClipboardCheck,
  Users,
  Settings,
  Brain,
  Key,
  Server,
  Thermometer,
  Hash,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Info,
  Globe,
  Palette,
  Sparkles,
  Bot,
  Slider,
  Download,
  FileJson,
  FileSpreadsheet,
} from 'lucide-react'

// ==================== TYPES ====================
type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'json-array' | 'json-object' | 'color'

interface FieldConfig {
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  helperText?: string
  options?: { value: string; label: string }[]
  rows?: number
}

interface ModelConfig {
  model: string
  label: string
  icon: React.ReactNode
  fields: FieldConfig[]
  tableColumns: { key: string; label: string; truncate?: number; render?: (val: unknown, row: Record<string, unknown>) => React.ReactNode }[]
}

// ==================== EMS COLOR SCHEME ====================
const EMS = {
  navy: '#1E3A5F',
  red: '#E63946',
  teal: '#2EC4B6',
  amber: '#FFB703',
}

// ==================== MODEL URL SLUG MAPPING ====================
// Maps Prisma model names → API URL slugs
const MODEL_SLUGS: Record<string, string> = {
  roadmapTopic: 'roadmap',
  question: 'questions',
  acronym: 'acronyms',
  definition: 'definitions',
  drug: 'drugs',
  competencyModule: 'competencies',
  scenario: 'scenarios',
  emergencyScenario: 'emergency-scenarios',
  assessmentScene: 'assessment-scenes',
  roleplayScenario: 'roleplay-scenarios',
}

// ==================== MODEL CONFIGURATIONS ====================
const MODEL_CONFIGS: ModelConfig[] = [
  {
    model: 'roadmapTopic',
    label: 'Roadmap Topics',
    icon: <BookOpen className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Topic title' },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'e.g. 📖 or icon name' },
      { key: 'order', label: 'Order', type: 'number', placeholder: '0' },
      { key: 'badge', label: 'Badge', type: 'text', placeholder: 'e.g. NEW, CRITICAL' },
      { key: 'shortDescription', label: 'Short Description', type: 'textarea', rows: 2 },
      { key: 'content', label: 'Content', type: 'textarea', rows: 8, placeholder: 'Full topic content (markdown supported)' },
      { key: 'keyPoints', label: 'Key Points', type: 'json-array', helperText: 'Enter as JSON array: ["point1", "point2"]' },
      { key: 'category', label: 'Category', type: 'select', options: [
        { value: 'foundation', label: 'Foundation' },
        { value: 'orientation', label: 'Orientation' },
        { value: 'core', label: 'Core' },
        { value: 'legal', label: 'Legal' },
        { value: 'operations', label: 'Operations' },
        { value: 'coordination', label: 'Coordination' },
        { value: 'clinical', label: 'Clinical' },
        { value: 'critical', label: 'Critical' },
      ] },
      { key: 'categoryColor', label: 'Category Color', type: 'color', placeholder: '#2EC4B6' },
      { key: 'difficulty', label: 'Difficulty', type: 'select', options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
      ] },
      { key: 'estimatedMinutes', label: 'Est. Minutes', type: 'number', placeholder: '5' },
      { key: 'xpReward', label: 'XP Reward', type: 'number', placeholder: '10' },
      { key: 'outcomes', label: 'Outcomes', type: 'json-array', helperText: 'Enter as JSON array: ["outcome1", "outcome2"]' },
      { key: 'whatYoullLearn', label: "What You'll Learn", type: 'json-array', helperText: 'Enter as JSON array: ["item1", "item2"]' },
      { key: 'quickNotes', label: 'Quick Notes', type: 'json-object', helperText: 'Enter as JSON object: {"key": "value"}' },
      { key: 'sections', label: 'Sections', type: 'json-array', helperText: 'Enter as JSON array of section objects' },
      { key: 'isCritical', label: 'Is Critical', type: 'boolean' },
    ],
    tableColumns: [
      { key: 'order', label: '#' },
      { key: 'title', label: 'Title', render: (_v: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          {row.icon ? <span className="text-sm">{String(row.icon)}</span> : null}
          <span className="font-medium truncate max-w-[200px] block">{String(row.title)}</span>
          {row.isCritical ? <Badge className="bg-red-500 text-[10px] px-1.5 py-0">Critical</Badge> : null}
        </div>
      )},
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px] capitalize">{String(val)}</Badge>
      )},
      { key: 'difficulty', label: 'Difficulty', render: (val: unknown) => {
        const colors: Record<string, string> = { beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
        return <Badge className={cn('text-[10px] capitalize', colors[String(val)] || '')}>{String(val)}</Badge>
      }},
      { key: 'estimatedMinutes', label: 'Min' },
      { key: 'xpReward', label: 'XP' },
    ],
  },
  {
    model: 'question',
    label: 'Questions',
    icon: <HelpCircle className="w-4 h-4" />,
    fields: [
      { key: 'question', label: 'Question', type: 'textarea', required: true, rows: 3, placeholder: 'Enter the question text' },
      { key: 'options', label: 'Options', type: 'json-array', required: true, helperText: 'Enter as JSON array: ["Option A", "Option B", "Option C", "Option D"]' },
      { key: 'correctAnswer', label: 'Correct Answer Index', type: 'number', required: true, placeholder: '0 (0-based index)' },
      { key: 'explanation', label: 'Explanation', type: 'textarea', rows: 3, placeholder: 'Explain the correct answer' },
      { key: 'category', label: 'Category', type: 'select', options: [
        { value: 'OSH', label: 'OSH' },
        { value: 'First Aid', label: 'First Aid' },
        { value: 'BLS-CPR', label: 'BLS/CPR' },
        { value: 'Patient Assessment', label: 'Patient Assessment' },
        { value: 'Trauma', label: 'Trauma' },
        { value: 'Medical Emergencies', label: 'Medical Emergencies' },
        { value: 'AMATS', label: 'AMATS' },
        { value: 'Ambulance Management', label: 'Ambulance Management' },
        { value: 'Radio Communication', label: 'Radio Communication' },
        { value: 'Legal-Ethical', label: 'Legal/Ethical' },
        { value: 'Drugs', label: 'Drugs' },
        { value: 'TESDA Standards', label: 'TESDA Standards' },
      ] },
    ],
    tableColumns: [
      { key: 'id', label: 'ID' },
      { key: 'question', label: 'Question', truncate: 60 },
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px]">{String(val)}</Badge>
      )},
      { key: 'correctAnswer', label: 'Answer' },
    ],
  },
  {
    model: 'acronym',
    label: 'Acronyms',
    icon: <BookOpen className="w-4 h-4" />,
    fields: [
      { key: 'acronym', label: 'Acronym', type: 'text', required: true, placeholder: 'e.g. CPR, BLS, AED' },
      { key: 'fullTerm', label: 'Full Term', type: 'text', required: true, placeholder: 'e.g. Cardiopulmonary Resuscitation' },
      { key: 'definition', label: 'Definition', type: 'textarea', rows: 3 },
      { key: 'category', label: 'Category', type: 'select', options: [
        { value: 'philippines', label: 'Philippines' },
        { value: 'clinical', label: 'Clinical' },
        { value: 'assessment', label: 'Assessment' },
        { value: 'general', label: 'General' },
        { value: 'drugs', label: 'Drugs' },
      ] },
    ],
    tableColumns: [
      { key: 'acronym', label: 'Acronym', render: (val: unknown) => (
        <span className="font-bold text-[#1E3A5F]">{String(val)}</span>
      )},
      { key: 'fullTerm', label: 'Full Term', truncate: 40 },
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px] capitalize">{String(val)}</Badge>
      )},
    ],
  },
  {
    model: 'definition',
    label: 'Definitions',
    icon: <BookOpen className="w-4 h-4" />,
    fields: [
      { key: 'term', label: 'Term', type: 'text', required: true, placeholder: 'Enter the term' },
      { key: 'definition', label: 'Definition', type: 'textarea', required: true, rows: 3, placeholder: 'Enter the definition' },
      { key: 'example', label: 'Example', type: 'textarea', rows: 2, placeholder: 'Usage example' },
      { key: 'category', label: 'Category', type: 'select', options: [
        { value: 'legal', label: 'Legal' },
        { value: 'clinical', label: 'Clinical' },
        { value: 'operations', label: 'Operations' },
        { value: 'assessment', label: 'Assessment' },
        { value: 'general', label: 'General' },
      ] },
    ],
    tableColumns: [
      { key: 'term', label: 'Term', render: (val: unknown) => (
        <span className="font-semibold">{String(val)}</span>
      )},
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px] capitalize">{String(val)}</Badge>
      )},
    ],
  },
  {
    model: 'drug',
    label: 'Drugs',
    icon: <Pill className="w-4 h-4" />,
    fields: [
      { key: 'genericName', label: 'Generic Name', type: 'text', required: true, placeholder: 'e.g. Epinephrine' },
      { key: 'brandNames', label: 'Brand Names', type: 'json-array', helperText: 'Enter as JSON array: ["BrandA", "BrandB"]' },
      { key: 'drugClass', label: 'Drug Class', type: 'text', placeholder: 'e.g. Vasopressor, Antiarrhythmic' },
      { key: 'indications', label: 'Indications', type: 'json-array', helperText: 'Enter as JSON array: ["indication1", "indication2"]' },
      { key: 'contraindications', label: 'Contraindications', type: 'json-array', helperText: 'Enter as JSON array: ["contra1", "contra2"]' },
      { key: 'adultDose', label: 'Adult Dose', type: 'text', placeholder: 'e.g. 1 mg IV push' },
      { key: 'pediatricDose', label: 'Pediatric Dose', type: 'text', placeholder: 'e.g. 0.01 mg/kg IV' },
      { key: 'route', label: 'Route', type: 'text', placeholder: 'e.g. IV, IO, IM' },
      { key: 'sideEffects', label: 'Side Effects', type: 'json-array', helperText: 'Enter as JSON array: ["effect1", "effect2"]' },
      { key: 'specialNotes', label: 'Special Notes', type: 'textarea', rows: 2 },
      { key: 'scope', label: 'Scope', type: 'select', options: [
        { value: 'BLS', label: 'BLS' },
        { value: 'ALS', label: 'ALS' },
        { value: 'Both', label: 'Both' },
      ] },
    ],
    tableColumns: [
      { key: 'genericName', label: 'Generic Name', render: (val: unknown) => (
        <span className="font-semibold">{String(val)}</span>
      )},
      { key: 'drugClass', label: 'Class', truncate: 25 },
      { key: 'scope', label: 'Scope', render: (val: unknown) => {
        const colors: Record<string, string> = { BLS: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', ALS: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', Both: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
        return <Badge className={cn('text-[10px]', colors[String(val)] || '')}>{String(val)}</Badge>
      }},
    ],
  },
  {
    model: 'competencyModule',
    label: 'Competencies',
    icon: <Shield className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Competency title' },
      { key: 'shortTitle', label: 'Short Title', type: 'text', placeholder: 'Abbreviated title' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'e.g. 🩺' },
      { key: 'color', label: 'Color', type: 'color', placeholder: '#2EC4B6' },
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Competency category' },
      { key: 'reviewerNotes', label: 'Reviewer Notes', type: 'textarea', rows: 4 },
      { key: 'procedures', label: 'Procedures', type: 'json-array', helperText: 'Enter as JSON array of {title, steps[]} objects' },
      { key: 'visualIllustrations', label: 'Visual Illustrations', type: 'json-array', helperText: 'Enter as JSON array of {title, description} objects' },
      { key: 'keyPoints', label: 'Key Points', type: 'json-array', helperText: 'Enter as JSON array: ["point1", "point2"]' },
      { key: 'assessorQuestions', label: 'Assessor Questions', type: 'json-array', helperText: 'Enter as JSON array: ["question1", "question2"]' },
      { key: 'memorizationTips', label: 'Memorization Tips', type: 'json-array', helperText: 'Enter as JSON array: ["tip1", "tip2"]' },
      { key: 'flashcards', label: 'Flashcards', type: 'json-array', helperText: 'Enter as JSON array of {front, back} objects' },
      { key: 'miniQuiz', label: 'Mini Quiz', type: 'json-array', helperText: 'Enter as JSON array of {question, options[], correctAnswer, explanation} objects' },
    ],
    tableColumns: [
      { key: 'title', label: 'Title', render: (val: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          {row.icon ? <span className="text-sm">{String(row.icon)}</span> : null}
          <span className="font-medium truncate max-w-[200px] block">{String(val)}</span>
        </div>
      )},
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px]">{String(val || '—')}</Badge>
      )},
    ],
  },
  {
    model: 'scenario',
    label: 'Scenarios',
    icon: <Activity className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Scenario title' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Scenario category' },
      { key: 'startStepId', label: 'Start Step ID', type: 'text', placeholder: 'e.g. step1' },
      { key: 'steps', label: 'Steps', type: 'json-object', helperText: 'Enter as JSON object: {"stepId": {title, description, options[]}}' },
    ],
    tableColumns: [
      { key: 'title', label: 'Title', render: (val: unknown) => (
        <span className="font-medium">{String(val)}</span>
      )},
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px]">{String(val || '—')}</Badge>
      )},
    ],
  },
  {
    model: 'emergencyScenario',
    label: 'Emergency Scenarios',
    icon: <Stethoscope className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Emergency scenario title' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Scenario subtitle' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'category', label: 'Category', type: 'text', placeholder: 'Category' },
      { key: 'difficulty', label: 'Difficulty', type: 'select', options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
      ] },
      { key: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g. 15 min' },
      { key: 'color', label: 'Color', type: 'color', placeholder: '#E63946' },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'e.g. 🚨' },
      { key: 'tags', label: 'Tags', type: 'json-array', helperText: 'Enter as JSON array: ["tag1", "tag2"]' },
      { key: 'objectives', label: 'Objectives', type: 'json-array', helperText: 'Enter as JSON array: ["obj1", "obj2"]' },
      { key: 'initialVitals', label: 'Initial Vitals', type: 'json-object', helperText: 'Enter as JSON object: {"hr": 120, "bp": "90/60"}' },
      { key: 'startStepId', label: 'Start Step ID', type: 'text' },
      { key: 'steps', label: 'Steps', type: 'json-object', helperText: 'Enter as JSON object of step definitions' },
    ],
    tableColumns: [
      { key: 'title', label: 'Title', render: (val: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          {row.icon ? <span className="text-sm">{String(row.icon)}</span> : null}
          <span className="font-medium truncate max-w-[180px] block">{String(val)}</span>
        </div>
      )},
      { key: 'difficulty', label: 'Difficulty', render: (val: unknown) => {
        const colors: Record<string, string> = { beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
        return <Badge className={cn('text-[10px] capitalize', colors[String(val)] || '')}>{String(val)}</Badge>
      }},
      { key: 'category', label: 'Category', render: (val: unknown) => (
        <Badge variant="outline" className="text-[10px]">{String(val || '—')}</Badge>
      )},
    ],
  },
  {
    model: 'assessmentScene',
    label: 'Assessment Scenes',
    icon: <ClipboardCheck className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Assessment scene title' },
      { key: 'overview', label: 'Overview', type: 'textarea', rows: 3 },
      { key: 'steps', label: 'Steps', type: 'json-array', helperText: 'Enter as JSON array of {id, description, isCritical, notes} objects' },
    ],
    tableColumns: [
      { key: 'title', label: 'Title', render: (val: unknown) => (
        <span className="font-medium">{String(val)}</span>
      )},
    ],
  },
  {
    model: 'roleplayScenario',
    label: 'Roleplay Scenarios',
    icon: <Users className="w-4 h-4" />,
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Roleplay scenario title' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Scenario subtitle' },
      { key: 'difficulty', label: 'Difficulty', type: 'select', options: [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' },
      ] },
      { key: 'duration', label: 'Duration (min)', type: 'number', placeholder: '15' },
      { key: 'patients', label: 'Patients', type: 'text', placeholder: 'Patient description' },
      { key: 'skills', label: 'Skills', type: 'json-array', helperText: 'Enter as JSON array: ["skill1", "skill2"]' },
      { key: 'color', label: 'Color', type: 'color', placeholder: '#2EC4B6' },
      { key: 'icon', label: 'Icon', type: 'text', placeholder: 'e.g. 🏥' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
      { key: 'patientDescription', label: 'Patient Description', type: 'textarea', rows: 2 },
      { key: 'phases', label: 'Phases', type: 'json-array', helperText: 'Enter as JSON array of ScenarioPhase objects' },
      { key: 'teamRoles', label: 'Team Roles', type: 'json-array', helperText: 'Enter as JSON array of role objects' },
      { key: 'vitalSigns', label: 'Vital Signs', type: 'json-array', helperText: 'Enter as JSON array of vital sign objects' },
      { key: 'glossary', label: 'Glossary', type: 'json-array', helperText: 'Enter as JSON array of glossary items' },
    ],
    tableColumns: [
      { key: 'title', label: 'Title', render: (val: unknown, row: Record<string, unknown>) => (
        <div className="flex items-center gap-2">
          {row.icon ? <span className="text-sm">{String(row.icon)}</span> : null}
          <span className="font-medium truncate max-w-[180px] block">{String(val)}</span>
        </div>
      )},
      { key: 'difficulty', label: 'Difficulty', render: (val: unknown) => {
        const colors: Record<string, string> = { Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
        return <Badge className={cn('text-[10px]', colors[String(val)] || '')}>{String(val)}</Badge>
      }},
      { key: 'duration', label: 'Duration', render: (val: unknown) => (
        <span className="text-xs text-muted-foreground">{String(val)} min</span>
      )},
    ],
  },
]

// ==================== HELPER: TRUNCATE TEXT ====================
function truncateText(text: string, maxLen: number): string {
  if (!text) return '—'
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
}

// ==================== HELPER: PARSE JSON FIELD VALUE ====================
function parseJsonValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

// ==================== DATA TABLE COMPONENT ====================
function DataTable({
  config,
  data,
  totalCount,
  page,
  limit,
  search,
  onPageChange,
  onSearchChange,
  onEdit,
  onDelete,
  loading,
}: {
  config: ModelConfig
  data: Record<string, unknown>[]
  totalCount: number
  page: number
  limit: number
  search: string
  onPageChange: (p: number) => void
  onSearchChange: (s: string) => void
  onEdit: (row: Record<string, unknown>) => void
  onDelete: (row: Record<string, unknown>) => void
  loading: boolean
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit))

  return (
    <div className="space-y-4">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${config.label.toLowerCase()}...`}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {totalCount} record{totalCount !== 1 ? 's' : ''} total
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Database className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No records found</p>
              <p className="text-xs mt-1">
                {search ? 'Try adjusting your search query' : `Add your first ${config.label.toLowerCase().replace(/s$/, '')} or seed the database`}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  {config.tableColumns.map((col) => (
                    <TableHead key={col.key} className="text-xs font-semibold">
                      {col.label}
                    </TableHead>
                  ))}
                  <TableHead className="text-xs font-semibold text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={String(row.id || idx)} className="group">
                    {config.tableColumns.map((col) => (
                      <TableCell key={col.key} className="text-sm py-2.5">
                        {col.render ? (
                          col.render(row[col.key], row)
                        ) : col.truncate ? (
                          <span title={String(row[col.key] || '')}>
                            {truncateText(String(row[col.key] || ''), col.truncate)}
                          </span>
                        ) : (
                          String(row[col.key] ?? '—')
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right py-2.5">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    'h-8 w-8 p-0 text-xs',
                    pageNum === page && 'bg-[#1E3A5F] hover:bg-[#1E3A5F]/90'
                  )}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== FORM FIELD COMPONENT ====================
function FormField({
  field,
  value,
  onChange,
  error,
}: {
  field: FieldConfig
  value: unknown
  onChange: (key: string, val: unknown) => void
  error?: string
}) {
  const stringValue = value === null || value === undefined
    ? ''
    : typeof value === 'boolean'
      ? ''
      : String(value)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.key} className={cn('text-xs font-medium', field.required && "after:content-['*'] after:text-red-500 after:ml-0.5")}>
        {field.label}
      </Label>

      {field.type === 'text' && (
        <Input
          id={field.key}
          value={stringValue}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className="h-9 text-sm"
        />
      )}

      {field.type === 'textarea' && (
        <Textarea
          id={field.key}
          value={stringValue}
          onChange={(e) => onChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 3}
          className="text-sm resize-y"
        />
      )}

      {field.type === 'number' && (
        <Input
          id={field.key}
          type="number"
          value={stringValue}
          onChange={(e) => onChange(field.key, e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={field.placeholder}
          className="h-9 text-sm"
        />
      )}

      {field.type === 'boolean' && (
        <div className="flex items-center gap-2">
          <Switch
            id={field.key}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(field.key, checked)}
          />
          <Label htmlFor={field.key} className="text-xs text-muted-foreground">
            {value ? 'Yes' : 'No'}
          </Label>
        </div>
      )}

      {field.type === 'select' && (
        <Select
          value={stringValue || undefined}
          onValueChange={(val) => onChange(field.key, val)}
        >
          <SelectTrigger className="h-9 text-sm w-full">
            <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {field.type === 'json-array' && (
        <div>
          <Textarea
            id={field.key}
            value={stringValue}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.helperText || 'Enter as JSON array: ["item1", "item2"]'}
            rows={3}
            className="text-sm font-mono resize-y"
          />
          {field.helperText && (
            <p className="text-[10px] text-muted-foreground mt-1">{field.helperText}</p>
          )}
        </div>
      )}

      {field.type === 'json-object' && (
        <div>
          <Textarea
            id={field.key}
            value={stringValue}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.helperText || 'Enter as JSON object: {"key": "value"}'}
            rows={4}
            className="text-sm font-mono resize-y"
          />
          {field.helperText && (
            <p className="text-[10px] text-muted-foreground mt-1">{field.helperText}</p>
          )}
        </div>
      )}

      {field.type === 'color' && (
        <div className="flex items-center gap-2">
          <Input
            id={field.key}
            value={stringValue}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder || '#2EC4B6'}
            className="h-9 text-sm flex-1"
          />
          {stringValue && (
            <div
              className="w-9 h-9 rounded-md border flex-shrink-0"
              style={{ backgroundColor: stringValue }}
            />
          )}
        </div>
      )}

      {error && (
        <p className="text-[10px] text-red-500 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  )
}

// ==================== ADD/EDIT DIALOG ====================
function RecordDialogContent({
  config,
  record,
  open,
  onOpenChange,
  onSave,
  saving,
}: {
  config: ModelConfig
  record: Record<string, unknown> | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
}) {
  const isEditing = record !== null

  // Compute initial form data — this runs once on mount (via key remount)
  function computeInitialData(): Record<string, unknown> {
    const initial: Record<string, unknown> = {}
    config.fields.forEach((field) => {
      if (record) {
        const rawVal = record[field.key]
        if (field.type === 'json-array' || field.type === 'json-object') {
          initial[field.key] = parseJsonValue(rawVal)
        } else {
          initial[field.key] = rawVal ?? ''
        }
      } else {
        switch (field.type) {
          case 'boolean':
            initial[field.key] = false
            break
          case 'number':
            initial[field.key] = ''
            break
          case 'json-array':
            initial[field.key] = '[]'
            break
          case 'json-object':
            initial[field.key] = '{}'
            break
          default:
            initial[field.key] = ''
        }
      }
    })
    return initial
  }

  const [formData, setFormData] = useState<Record<string, unknown>>(computeInitialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback((key: string, val: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const handleSave = () => {
    // Validate required fields
    const newErrors: Record<string, string> = {}
    config.fields.forEach((field) => {
      if (field.required) {
        const val = formData[field.key]
        if (val === '' || val === null || val === undefined) {
          newErrors[field.key] = `${field.label} is required`
        }
      }
      // Validate JSON fields
      if ((field.type === 'json-array' || field.type === 'json-object') && formData[field.key]) {
        const strVal = String(formData[field.key]).trim()
        if (strVal && strVal !== '[]' && strVal !== '{}') {
          try {
            JSON.parse(strVal)
          } catch {
            newErrors[field.key] = 'Invalid JSON format'
          }
        }
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Build the save data — parse JSON fields back to strings
    const saveData: Record<string, unknown> = {}
    if (isEditing && record) {
      saveData.id = record.id
    }
    config.fields.forEach((field) => {
      let val = formData[field.key]
      if (field.type === 'number' && val !== '' && val !== undefined) {
        val = Number(val)
      } else if (field.type === 'boolean') {
        val = Boolean(val)
      } else if (field.type === 'json-array' || field.type === 'json-object') {
        // Keep as string — the API will handle it
        // But validate it's proper JSON
        const strVal = String(val).trim()
        if (strVal) {
          try {
            // Parse and re-stringify to normalize
            val = JSON.stringify(JSON.parse(strVal))
          } catch {
            // If not valid JSON, try comma-separated for arrays
            if (field.type === 'json-array') {
              const items = strVal.split(',').map((s: string) => s.trim()).filter(Boolean)
              val = JSON.stringify(items)
            }
          }
        } else {
          val = field.type === 'json-array' ? '[]' : '{}'
        }
      }
      saveData[field.key] = val
    })

    onSave(saveData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <><Pencil className="w-4 h-4" /> Edit {config.label.slice(0, -1)}</>
            ) : (
              <><Plus className="w-4 h-4" /> Add {config.label.slice(0, -1)}</>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => (
              <div
                key={field.key}
                className={cn(
                  (field.type === 'textarea' || field.type === 'json-array' || field.type === 'json-object')
                    ? 'sm:col-span-2'
                    : ''
                )}
              >
                <FormField
                  field={field}
                  value={formData[field.key]}
                  onChange={handleChange}
                  error={errors[field.key]}
                />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/30">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1E3A5F] hover:bg-[#1E3A5F]/90"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Saving...</>
            ) : (
              <><Check className="w-4 h-4 mr-1" /> {isEditing ? 'Update' : 'Create'}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Wrapper that forces remount via key when the record changes
function RecordDialog(props: {
  config: ModelConfig
  record: Record<string, unknown> | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: Record<string, unknown>) => void
  saving: boolean
}) {
  // Use record id as key to force full remount when editing different records
  const dialogKey = props.record
    ? `edit-${String(props.record.id)}`
    : `new-${props.config.model}`
  return <RecordDialogContent key={dialogKey} {...props} />
}

// ==================== DELETE CONFIRMATION DIALOG ====================
function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  recordTitle,
  deleting,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  recordTitle: string
  deleting: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this record? This action cannot be undone.
          </p>
          {recordTitle && (
            <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50">
              <p className="text-sm font-medium text-red-700 dark:text-red-400 break-words">
                {truncateText(recordTitle, 100)}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Deleting...</>
            ) : (
              <><Trash2 className="w-4 h-4 mr-1" /> Delete</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ==================== EXPORT ROW COMPONENT ====================
function ExportDataRow({
  dataType,
  icon,
  title,
  color,
}: {
  dataType: string
  icon: React.ReactNode
  title: string
  color: string
}) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format: 'json' | 'csv') => {
    setExporting(true)
    try {
      const res = await fetch(`/api/admin/export?model=${dataType}&format=${format}`)
      if (!res.ok) throw new Error('Failed to export')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const timestamp = new Date().toISOString().split('T')[0]
      a.download = `ems-${dataType}-${timestamp}.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success(`${title} exported as ${format.toUpperCase()} successfully`)
    } catch {
      toast.error(`Failed to export ${title.toLowerCase()}`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className={cn('p-4 rounded-xl border', color)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-[10px] text-muted-foreground">All records from database</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-8 text-xs"
            onClick={() => handleExport('json')}
            disabled={exporting}
          >
            <FileJson className="w-3.5 h-3.5" />
            JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-8 text-xs"
            onClick={() => handleExport('csv')}
            disabled={exporting}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            CSV
          </Button>
        </div>
      </div>
      {exporting && (
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" /> Preparing download...
        </div>
      )}
    </div>
  )
}

// ==================== EXPORT ALL BUTTON COMPONENT ====================
function ExportAllButton() {
  const [exporting, setExporting] = useState(false)

  const handleExportAll = async () => {
    setExporting(true)
    try {
      const types = ['questions', 'acronyms', 'definitions'] as const
      for (const type of types) {
        for (const fmt of ['json', 'csv'] as const) {
          const res = await fetch(`/api/admin/export?model=${type}&format=${fmt}`)
          if (!res.ok) continue
          const blob = await res.blob()
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          const timestamp = new Date().toISOString().split('T')[0]
          a.download = `ems-${type}-${timestamp}.${fmt}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          // Small delay between downloads
          await new Promise((r) => setTimeout(r, 200))
        }
      }
      toast.success('All data exported successfully (6 files)')
    } catch {
      toast.error('Some exports failed. Please try individual downloads.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <Button
      className="gap-2 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90"
      size="sm"
      disabled={exporting}
      onClick={handleExportAll}
    >
      {exporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {exporting ? 'Exporting...' : 'Download All (JSON + CSV)'}
    </Button>
  )
}

// ==================== TAB CONTENT COMPONENT ====================
function ModelTabContent({ config }: { config: ModelConfig }) {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [editingRecord, setEditingRecord] = useState<Record<string, unknown> | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deletingRecord, setDeletingRecord] = useState<Record<string, unknown> | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const limit = 20

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
      })
      const res = await fetch(`/api/admin/${MODEL_SLUGS[config.model] || config.model}?${params}`)
      if (!res.ok) throw new Error('Failed to fetch data')
      const result = await res.json()
      setData(result.data || [])
      setTotalCount(result.total || 0)
    } catch (err) {
      console.error('Fetch error:', err)
      toast.error(`Failed to load ${config.label.toLowerCase()}`)
      setData([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }, [config.model, page, search, limit])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const handleAdd = () => {
    setEditingRecord(null)
    setShowAddEdit(true)
  }

  const handleEdit = (row: Record<string, unknown>) => {
    setEditingRecord(row)
    setShowAddEdit(true)
  }

  const handleDelete = (row: Record<string, unknown>) => {
    setDeletingRecord(row)
    setShowDelete(true)
  }

  const handleSave = async (saveData: Record<string, unknown>) => {
    setSaving(true)
    try {
      const isEditing = !!saveData.id
      const res = await fetch(`/api/admin/${MODEL_SLUGS[config.model] || config.model}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to save record')
      }
      toast.success(isEditing ? 'Record updated successfully' : 'Record created successfully')
      setShowAddEdit(false)
      fetchData()
    } catch (err) {
      console.error('Save error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save record')
    } finally {
      setSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingRecord?.id) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/${MODEL_SLUGS[config.model] || config.model}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deletingRecord.id }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to delete record')
      }
      toast.success('Record deleted successfully')
      setShowDelete(false)
      setDeletingRecord(null)
      fetchData()
    } catch (err) {
      console.error('Delete error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete record')
    } finally {
      setDeleting(false)
    }
  }

  const getRecordTitle = (record: Record<string, unknown>): string => {
    return String(record.title || record.genericName || record.acronym || record.term || record.question || record.id || '')
  }

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAdd}
            size="sm"
            className="gap-1.5 bg-[#1E3A5F] hover:bg-[#1E3A5F]/90"
          >
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={cn('w-3.5 h-3.5', loading && 'animate-spin')} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        config={config}
        data={data}
        totalCount={totalCount}
        page={page}
        limit={limit}
        search={search}
        onPageChange={setPage}
        onSearchChange={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Add/Edit Dialog */}
      <RecordDialog
        config={config}
        record={editingRecord}
        open={showAddEdit}
        onOpenChange={setShowAddEdit}
        onSave={handleSave}
        saving={saving}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onConfirm={handleConfirmDelete}
        recordTitle={getRecordTitle(deletingRecord || {})}
        deleting={deleting}
      />
    </div>
  )
}

// ==================== APP SETTINGS TAB ====================
const AI_PROVIDERS_ADMIN = [
  { id: 'zai' as const, name: 'Z.ai (Default)', icon: '🤖', requiresKey: false, defaultModel: '', models: [] },
  { id: 'openai' as const, name: 'OpenAI', icon: '⚡', requiresKey: true, defaultModel: 'gpt-4o-mini', models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  { id: 'anthropic' as const, name: 'Anthropic', icon: '🧠', requiresKey: true, defaultModel: 'claude-sonnet-4-20250514', models: ['claude-sonnet-4-20250514', 'claude-haiku-4-20250514', 'claude-opus-4-20250514'] },
  { id: 'google' as const, name: 'Google AI', icon: '✨', requiresKey: true, defaultModel: 'gemini-2.0-flash', models: ['gemini-2.0-flash', 'gemini-2.0-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'] },
  { id: 'custom' as const, name: 'Custom API', icon: '🔗', requiresKey: false, defaultModel: '', models: [] },
]

function AppSettingsTab() {
  const { settings, updateSettings, progress, resetProgress } = useAppStore()
  const [localAI, setLocalAI] = useState({ ...settings.ai })
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState('ai')

  const currentProvider = AI_PROVIDERS_ADMIN.find(p => p.id === localAI.provider)

  const handleSaveAI = () => {
    updateSettings({ ai: { ...localAI } })
    setSaved(true)
    toast.success('AI settings saved successfully')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleResetAI = () => {
    setLocalAI({
      provider: 'zai',
      apiKey: '',
      model: '',
      customEndpoint: '',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 1024,
    })
    updateSettings({
      ai: {
        provider: 'zai',
        apiKey: '',
        model: '',
        customEndpoint: '',
        systemPrompt: '',
        temperature: 0.7,
        maxTokens: 1024,
      },
    })
    toast.success('AI settings reset to defaults')
  }

  return (
    <div className="space-y-6">
      {/* Settings sub-tabs */}
      <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="ai" className="text-xs gap-1.5">
            <Brain className="w-3.5 h-3.5" /> AI Assistant
          </TabsTrigger>
          <TabsTrigger value="app" className="text-xs gap-1.5">
            <Settings className="w-3.5 h-3.5" /> App Settings
          </TabsTrigger>
          <TabsTrigger value="data" className="text-xs gap-1.5">
            <Database className="w-3.5 h-3.5" /> Data Management
          </TabsTrigger>
        </TabsList>

        {/* AI Settings Tab */}
        <TabsContent value="ai" className="space-y-6 mt-4">
          {/* Provider Selection */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-ems-teal" /> AI Provider
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AI_PROVIDERS_ADMIN.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => {
                      const newAI = { ...localAI, provider: provider.id }
                      if (provider.id !== localAI.provider) {
                        newAI.model = provider.defaultModel
                      }
                      setLocalAI(newAI)
                    }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                      localAI.provider === provider.id
                        ? 'border-ems-teal bg-ems-teal/5 shadow-sm'
                        : 'border-border hover:border-ems-teal/30'
                    )}
                  >
                    <span className="text-2xl">{provider.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{provider.name}</p>
                      <p className="text-[10px] text-muted-foreground">{provider.requiresKey ? 'API key required' : 'No key needed'}</p>
                    </div>
                    {localAI.provider === provider.id && (
                      <Check className="w-4 h-4 text-ems-teal flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          {currentProvider?.requiresKey && (
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Key className="w-4 h-4" /> API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">API Key</Label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? 'text' : 'password'}
                      value={localAI.apiKey}
                      onChange={(e) => setLocalAI({ ...localAI, apiKey: e.target.value })}
                      placeholder="sk-... or your API key"
                      className="pr-10 font-mono"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    Stored locally only. Never sent to our servers.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Custom Endpoint */}
          {localAI.provider === 'custom' && (
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Server className="w-4 h-4" /> Custom Endpoint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Endpoint URL</Label>
                  <Input
                    value={localAI.customEndpoint}
                    onChange={(e) => setLocalAI({ ...localAI, customEndpoint: e.target.value })}
                    placeholder="https://your-api.com/v1/chat/completions"
                    className="font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">Must support OpenAI-compatible chat completions format.</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">API Key (optional)</Label>
                  <Input
                    type="password"
                    value={localAI.apiKey}
                    onChange={(e) => setLocalAI({ ...localAI, apiKey: e.target.value })}
                    placeholder="Bearer token (optional)"
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Model & Parameters */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Brain className="w-4 h-4" /> Model & Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Model Selection */}
              {currentProvider && (currentProvider.models.length > 0 || localAI.provider === 'custom') && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Model</Label>
                  {currentProvider.models.length > 0 ? (
                    <Select
                      value={localAI.model || currentProvider.defaultModel}
                      onValueChange={(val) => setLocalAI({ ...localAI, model: val })}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currentProvider.models.map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={localAI.model}
                      onChange={(e) => setLocalAI({ ...localAI, model: e.target.value })}
                      placeholder="Model name"
                    />
                  )}
                </div>
              )}

              {/* Temperature */}
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" /> Temperature
                  </span>
                  <span className="font-mono text-muted-foreground">{localAI.temperature.toFixed(1)}</span>
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground w-12">Precise</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={localAI.temperature}
                    onChange={(e) => setLocalAI({ ...localAI, temperature: parseFloat(e.target.value) })}
                    className="flex-1 accent-ems-teal"
                  />
                  <span className="text-[10px] text-muted-foreground w-12 text-right">Creative</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> Max Tokens
                </Label>
                <Select
                  value={String(localAI.maxTokens)}
                  onValueChange={(val) => setLocalAI({ ...localAI, maxTokens: Number(val) })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="256">256 (Short)</SelectItem>
                    <SelectItem value="512">512 (Medium)</SelectItem>
                    <SelectItem value="1024">1024 (Default)</SelectItem>
                    <SelectItem value="2048">2048 (Long)</SelectItem>
                    <SelectItem value="4096">4096 (Very Long)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* System Prompt */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Bot className="w-4 h-4" /> System Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={localAI.systemPrompt}
                onChange={(e) => setLocalAI({ ...localAI, systemPrompt: e.target.value })}
                placeholder="Leave empty to use the default MANNY COLLINS system prompt..."
                rows={8}
                className="text-xs font-mono resize-y"
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" />
                Custom system prompt. If empty, the default MANNY COLLINS prompt will be used.
              </p>
            </CardContent>
          </Card>

          {/* Save / Reset Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveAI}
              className={cn(
                'gap-2',
                saved ? 'bg-green-600 hover:bg-green-600' : 'bg-ems-teal hover:bg-ems-teal/90 text-white'
              )}
            >
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save AI Settings</>}
            </Button>
            <Button variant="outline" onClick={handleResetAI} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Reset to Defaults
            </Button>
          </div>

          {/* Current Config Summary */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Current AI Configuration</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">Provider</p>
                  <p className="text-xs font-semibold">{AI_PROVIDERS_ADMIN.find(p => p.id === localAI.provider)?.icon} {AI_PROVIDERS_ADMIN.find(p => p.id === localAI.provider)?.name}</p>
                </div>
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">Model</p>
                  <p className="text-xs font-semibold font-mono">{localAI.model || (localAI.provider === 'zai' ? 'Default' : 'Not set')}</p>
                </div>
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">API Key</p>
                  <p className="text-xs font-semibold font-mono">
                    {localAI.provider === 'zai' ? 'Not needed' : localAI.apiKey ? `${localAI.apiKey.slice(0, 8)}...` : '❌ Not set'}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">Temperature</p>
                  <p className="text-xs font-semibold font-mono">{localAI.temperature}</p>
                </div>
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">Max Tokens</p>
                  <p className="text-xs font-semibold font-mono">{localAI.maxTokens}</p>
                </div>
                <div className="p-2 rounded-lg bg-background border">
                  <p className="text-[10px] text-muted-foreground">Custom Prompt</p>
                  <p className="text-xs font-semibold">{localAI.systemPrompt ? '✅ Custom' : 'Default'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* App Settings Tab */}
        <TabsContent value="app" className="space-y-6 mt-4">
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="w-4 h-4" /> Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(val) => updateSettings({ theme: val as 'light' | 'dark' })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">☀️ Light</SelectItem>
                      <SelectItem value="dark">🌙 Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(val) => updateSettings({ language: val as 'en' | 'fil' })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="fil">🇵🇭 Filipino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Font Size</Label>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(val) => updateSettings({ fontSize: val as 'small' | 'medium' | 'large' })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Accent Color</Label>
                  <Select
                    value={settings.accentColor}
                    onValueChange={(val) => updateSettings({ accentColor: val as 'navy' | 'teal' | 'red' })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="navy">🫐 Navy</SelectItem>
                      <SelectItem value="teal">🩺 Teal</SelectItem>
                      <SelectItem value="red">🚑 Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-xs font-medium">High Contrast Mode</p>
                  <p className="text-[10px] text-muted-foreground">Increases contrast for better readability</p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-xs font-medium">Reduced Motion</p>
                  <p className="text-[10px] text-muted-foreground">Minimize animations</p>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" /> Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Learning Mode</Label>
                <Select
                  value={settings.learningMode}
                  onValueChange={(val) => updateSettings({ learningMode: val as 'learning' | 'quickReview' })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learning">🎓 Learning (Full content)</SelectItem>
                    <SelectItem value="quickReview">🚀 Quick Review (Condensed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Daily Goal (minutes)</Label>
                <Select
                  value={String(settings.dailyGoalMinutes)}
                  onValueChange={(val) => updateSettings({ dailyGoalMinutes: Number(val) })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-xs font-medium">Text-to-Speech</p>
                  <p className="text-[10px] text-muted-foreground">Read content aloud</p>
                </div>
                <Switch
                  checked={settings.textToSpeech}
                  onCheckedChange={(checked) => updateSettings({ textToSpeech: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-6 mt-4">
          {/* Export Center Card */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Download className="w-4 h-4 text-ems-teal" /> Export Data Center
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Download all questions, acronyms, and definitions in JSON or CSV format.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ExportDataRow
                dataType="questions"
                icon={<HelpCircle className="w-4 h-4" />}
                title="Questions"
                color="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50"
              />
              <ExportDataRow
                dataType="acronyms"
                icon={<BookOpen className="w-4 h-4" />}
                title="Acronyms"
                color="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50"
              />
              <ExportDataRow
                dataType="definitions"
                icon={<BookOpen className="w-4 h-4" />}
                title="Definitions"
                color="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
              />

              {/* Download All button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <ExportAllButton />
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="w-4 h-4" /> User Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-bold">{progress.xp}</p>
                  <p className="text-[10px] text-muted-foreground">Total XP</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-bold">{progress.readTopics.length}</p>
                  <p className="text-[10px] text-muted-foreground">Topics Read</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-bold">{progress.quizScores.length}</p>
                  <p className="text-[10px] text-muted-foreground">Quizzes Taken</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <p className="text-lg font-bold">{progress.badges.length}</p>
                  <p className="text-[10px] text-muted-foreground">Badges Earned</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50">
                <p className="text-sm font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Danger Zone
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reset all user progress. This cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3 gap-2"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
                      resetProgress()
                      toast.success('All progress has been reset')
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" /> Reset All Progress
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="w-4 h-4" /> Storage Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Settings Storage</span>
                  <span className="font-mono">ems-settings</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress Storage</span>
                  <span className="font-mono">ems-progress</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Provider</span>
                  <span className="font-mono">{settings.ai.provider}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Key Set</span>
                  <span className="font-mono">{settings.ai.apiKey ? '✅ Yes' : '❌ No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ==================== MAIN ADMIN SECTION ====================
export function AdminSection() {
  const [activeTab, setActiveTab] = useState('roadmapTopic')
  const [seeding, setSeeding] = useState(false)

  const handleSeed = async () => {
    setSeeding(true)
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to seed database')
      }
      const result = await res.json()
      toast.success(result.message || 'Database seeded successfully')
      // Force refresh current tab data by toggling
      setActiveTab((prev) => {
        // Small trick to re-mount the tab content
        setTimeout(() => setActiveTab(prev), 50)
        return ''
      })
    } catch (err) {
      console.error('Seed error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to seed database')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: EMS.navy }}
          >
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: EMS.navy }}>
              Admin Dashboard
            </h2>
            <p className="text-xs text-muted-foreground">
              Manage training platform data — add, edit, or remove records
            </p>
          </div>
        </div>

        <Button
          onClick={handleSeed}
          disabled={seeding}
          className="gap-2"
          style={{ backgroundColor: EMS.teal, color: '#fff' }}
          onMouseOver={(e) => { (e.currentTarget.style.backgroundColor = '#28b0a3') }}
          onMouseOut={(e) => { (e.currentTarget.style.backgroundColor = EMS.teal) }}
        >
          {seeding ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Seeding...</>
          ) : (
            <><Database className="w-4 h-4" /> Seed Database</>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => useAppStore.getState().setActiveSection('roadmap')}
        >
          ← Back to App
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {MODEL_CONFIGS.slice(0, 5).map((cfg) => (
          <Card
            key={cfg.model}
            className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
            style={{ borderLeftColor: EMS.teal }}
            onClick={() => setActiveTab(cfg.model)}
          >
            <CardContent className="p-3 flex items-center gap-2">
              <div className="text-muted-foreground">{cfg.icon}</div>
              <span className="text-xs font-medium">{cfg.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-2 overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-1 gap-0.5 flex-wrap">
                {MODEL_CONFIGS.map((cfg) => (
                  <TabsTrigger
                    key={cfg.model}
                    value={cfg.model}
                    className="text-xs gap-1.5 px-2.5 py-1.5 data-[state=active]:bg-[#1E3A5F] data-[state=active]:text-white rounded-md"
                  >
                    {cfg.icon}
                    <span className="hidden sm:inline">{cfg.label}</span>
                    <span className="sm:hidden">{cfg.label.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
                <TabsTrigger
                  value="app-settings"
                  className="text-xs gap-1.5 px-2.5 py-1.5 data-[state=active]:bg-ems-teal data-[state=active]:text-white rounded-md"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">App Settings</span>
                  <span className="sm:hidden">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {MODEL_CONFIGS.map((cfg) => (
              <TabsContent key={cfg.model} value={cfg.model} className="p-4 sm:p-6">
                {activeTab === cfg.model ? (
                  <ModelTabContent config={cfg} />
                ) : null}
              </TabsContent>
            ))}
            <TabsContent value="app-settings" className="p-4 sm:p-6">
              {activeTab === 'app-settings' ? (
                <AppSettingsTab />
              ) : null}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminSection
