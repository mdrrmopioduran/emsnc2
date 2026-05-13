'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// ── Skeleton Text ──
export function SkeletonText({ className }: { className?: string }) {
  return <div className={cn('skeleton skeleton-text', className)} />
}

// ── Skeleton Heading ──
export function SkeletonHeading({ className }: { className?: string }) {
  return <div className={cn('skeleton skeleton-heading', className)} />
}

// ── Skeleton Card ──
export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="skeleton-card">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'skeleton skeleton-line',
            i === lines - 1 && 'short',
            i === lines - 2 && lines > 2 && 'medium'
          )}
        />
      ))}
    </div>
  )
}

// ── Skeleton Avatar ──
export function SkeletonAvatar() {
  return <div className="skeleton skeleton-avatar" />
}

// ── Skeleton Chart ──
export function SkeletonChart() {
  return <div className="skeleton skeleton-chart" />
}

// ── Skeleton Grid ──
export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={3} />
      ))}
    </div>
  )
}

// ── Skeleton Stat Card (matches QuickStatCard layout) ──
export function SkeletonStatCard() {
  return (
    <div className="skeleton-stat-card">
      <div className="skeleton skeleton-stat-icon" />
      <div className="skeleton-stat-lines">
        <div className="skeleton skeleton-text w-24" />
        <div className="skeleton skeleton-heading w-16 mt-2" />
        <div className="skeleton skeleton-text w-32 mt-1" />
      </div>
    </div>
  )
}

// ── Skeleton Stat Grid (4 stat cards) ──
export function SkeletonStatGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonStatCard key={i} />
      ))}
    </div>
  )
}

// ── Skeleton Bar Chart (horizontal bars) ──
export function SkeletonBarChart({ rows = 4 }: { rows?: number }) {
  return (
    <div className="skeleton-bar-chart">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-bar-row">
          <div className="skeleton skeleton-bar-label" />
          <div
            className="skeleton skeleton-bar-fill"
            style={{ width: `${70 - i * 12}%` }}
          />
        </div>
      ))}
    </div>
  )
}

// ── Skeleton Flashcard (matches flashcard shape) ──
export function SkeletonFlashcard() {
  return (
    <div className="mx-auto">
      <div className="skeleton-flashcard" />
    </div>
  )
}

// ── Skeleton Challenge Intro (matches daily challenge start card) ──
export function SkeletonChallengeIntro() {
  return (
    <div className="skeleton-card">
      <div className="flex justify-center mb-4">
        <div className="skeleton w-14 h-14 rounded-2xl" />
      </div>
      <div className="skeleton skeleton-heading w-48 mx-auto mb-2" />
      <div className="skeleton skeleton-text w-64 mx-auto mb-4" />
      <div className="flex justify-center gap-4 mb-6">
        <div className="skeleton skeleton-text w-20" />
        <div className="skeleton skeleton-text w-20" />
      </div>
      <div className="skeleton skeleton-text w-full h-10 rounded-lg" />
    </div>
  )
}
