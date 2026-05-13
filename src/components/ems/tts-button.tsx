'use client'

import React from 'react'
import { Volume2, VolumeX, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTTS } from '@/hooks/use-tts'

/**
 * A reusable speaker button for Text-to-Speech.
 * Only shows when TTS is enabled in settings.
 * Displays loading spinner while generating, and stop icon while playing.
 */
export function SpeakerButton({
  text,
  className,
  size = 'sm',
}: {
  text: string
  className?: string
  size?: 'xs' | 'sm' | 'md'
}) {
  const { isPlaying, isLoading, currentText, toggle, ttsEnabled } = useTTS()

  // Don't render if TTS is not enabled
  if (!ttsEnabled) return null

  const isThisPlaying = isPlaying && currentText === text
  const isThisLoading = isLoading && currentText === text

  const sizeClasses = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-7 h-7 p-1.5',
    md: 'w-8 h-8 p-2',
  }

  const iconSize = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggle(text)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation()
          e.preventDefault()
          toggle(text)
        }
      }}
      className={cn(
        'rounded-md transition-all flex items-center justify-center flex-shrink-0 cursor-pointer',
        sizeClasses[size],
        isThisPlaying
          ? 'bg-ems-teal/20 text-ems-teal hover:bg-ems-teal/30'
          : isThisLoading
            ? 'bg-primary/10 text-primary'
            : 'bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10',
        className
      )}
      title={isThisPlaying ? 'Stop reading' : isThisLoading ? 'Generating audio...' : 'Read aloud'}
      aria-label={isThisPlaying ? 'Stop reading aloud' : 'Read text aloud'}
    >
      {isThisLoading ? (
        <Loader2 className={cn(iconSize[size], 'animate-spin')} />
      ) : isThisPlaying ? (
        <VolumeX className={iconSize[size]} />
      ) : (
        <Volume2 className={iconSize[size]} />
      )}
    </span>
  )
}

/**
 * A compact inline TTS button for lists/cards.
 * Only shows when TTS is enabled.
 */
export function InlineSpeakerButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return <SpeakerButton text={text} size="xs" className={className} />
}
