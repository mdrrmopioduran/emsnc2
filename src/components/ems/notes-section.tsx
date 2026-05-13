'use client'

import React, { useState, useMemo } from 'react'
import { useAppStore, type Note } from '@/store/app-store'
import {
  Search, Plus, Pencil, Trash2, StickyNote, FileText,
  ChevronDown, AlertCircle, CheckCircle2, Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from '@/hooks/use-translation'

const CATEGORIES = ['General', 'Clinical', 'Assessment', 'Operations', 'Legal', 'Personal'] as const

const COLOR_MAP: Record<Note['color'], { dot: string; ring: string; bg: string }> = {
  red: { dot: 'bg-red-500', ring: 'ring-red-200 dark:ring-red-800', bg: 'bg-red-50 dark:bg-red-950/30' },
  amber: { dot: 'bg-amber-500', ring: 'ring-amber-200 dark:ring-amber-800', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  teal: { dot: 'bg-teal-500', ring: 'ring-teal-200 dark:ring-teal-800', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  navy: { dot: 'bg-blue-800 dark:bg-blue-400', ring: 'ring-blue-200 dark:ring-blue-800', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  purple: { dot: 'bg-purple-500', ring: 'ring-purple-200 dark:ring-purple-800', bg: 'bg-purple-50 dark:bg-purple-950/30' },
}

const COLORS: Note['color'][] = ['red', 'amber', 'teal', 'navy', 'purple']

export function NotesSection() {
  const { progress, addNote, updateNote, deleteNote } = useAppStore()
  const { toast } = useToast()
  const { t } = useTranslation()
  const notes = progress.notes

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formCategory, setFormCategory] = useState<Note['category']>('General')
  const [formColor, setFormColor] = useState<Note['color']>('teal')

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (categoryFilter !== 'all' && note.category !== categoryFilter) return false
      if (search) {
        const s = search.toLowerCase()
        return note.title.toLowerCase().includes(s) || note.content.toLowerCase().includes(s)
      }
      return true
    })
  }, [notes, categoryFilter, search])

  const openNewDialog = () => {
    setEditingNote(null)
    setFormTitle('')
    setFormContent('')
    setFormCategory('General')
    setFormColor('teal')
    setDialogOpen(true)
  }

  const openEditDialog = (note: Note) => {
    setEditingNote(note)
    setFormTitle(note.title)
    setFormContent(note.content)
    setFormCategory(note.category)
    setFormColor(note.color)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formTitle.trim()) return
    if (editingNote) {
      updateNote(editingNote.id, {
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formCategory,
        color: formColor,
      })
      toast({ title: t('notes.updated') })
    } else {
      if (notes.length >= 50) {
        toast({ title: t('notes.maxReached'), variant: 'destructive' })
        return
      }
      addNote({ title: formTitle.trim(), content: formContent.trim(), category: formCategory, color: formColor })
      toast({ title: t('notes.created') })
    }
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteNote(id)
    toast({ title: t('notes.deleted') })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="content-transition space-y-4">
      {/* Header with search and new button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('notes.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openNewDialog} className="gap-1.5 bg-ems-teal hover:bg-ems-teal/90 text-white" disabled={notes.length >= 50}>
          <Plus className="w-4 h-4" />
          <span className="text-sm">{t('notes.newNote')}</span>
        </Button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-muted-foreground mr-1">{t('common.filter')}:</span>
        <button
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium transition-all',
            categoryFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
          onClick={() => setCategoryFilter('all')}
        >
          {t('notes.all')} ({notes.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = notes.filter(n => n.category === cat).length
          if (count === 0) return null
          return (
            <button
              key={cat}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all',
                categoryFilter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Note count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {t('notes.noteCount').replace('{count}', String(notes.length))}
        </p>
      </div>

      {/* Notes list */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <StickyNote className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">{t('notes.noNotes')}</h4>
          <p className="text-sm text-muted-foreground max-w-xs">{t('notes.noNotesDesc')}</p>
          {search && (
            <Button variant="outline" size="sm" className="mt-3 gap-1.5" onClick={() => { setSearch(''); setCategoryFilter('all') }}>
              {t('common.clearFilters')}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredNotes.map((note) => {
            const colorInfo = COLOR_MAP[note.color]
            return (
              <Card key={note.id} className="card-modern group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', colorInfo.dot)} />
                      <h4 className="font-semibold text-sm truncate">{note.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => openEditDialog(note)}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors"
                        title={t('notes.editNote')}
                      >
                        <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" title={t('notes.deleteConfirm')}>
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('notes.deleteConfirm')}</AlertDialogTitle>
                            <AlertDialogDescription>{note.title}</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(note.id)} className="bg-ems-red hover:bg-ems-red/90">
                              {t('notes.deleteConfirm')}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {note.content && (
                    <p className="text-xs text-muted-foreground line-clamp-3 break-words mb-3">{note.content}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{note.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(note.updatedAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* New/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingNote ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingNote ? t('notes.editNote') : t('notes.newNote')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder={t('notes.titlePlaceholder')}
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div>
              <Textarea
                placeholder={t('notes.contentPlaceholder')}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                rows={5}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Select value={formCategory} onValueChange={(v) => setFormCategory(v as Note['category'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{t('sub.definitions').split(' ')[0]}:</span>
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      'w-6 h-6 rounded-full transition-all border-2',
                      COLOR_MAP[color].dot,
                      formColor === color ? 'ring-2 ring-offset-2 ' + COLOR_MAP[color].ring : 'border-transparent hover:scale-110'
                    )}
                    onClick={() => setFormColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t('common.cancel')}</Button>
            <Button onClick={handleSave} disabled={!formTitle.trim()} className="bg-ems-teal hover:bg-ems-teal/90 text-white">
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
