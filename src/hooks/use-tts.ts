'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useAppStore } from '@/store/app-store'

interface TTSState {
  isPlaying: boolean
  isLoading: boolean
  currentText: string | null
  error: string | null
}

/**
 * Hook for Text-to-Speech functionality.
 * Primary: Uses the z-ai-web-dev-sdk TTS API route on the backend.
 * Fallback: Uses browser's built-in SpeechSynthesis API.
 * Only works when TTS is enabled in settings.
 */
export function useTTS() {
  const { settings } = useAppStore()
  const ttsEnabled = settings.textToSpeech
  const ttsSpeed = settings.ttsSpeed ?? 1.0
  const ttsVoice = settings.ttsVoice ?? 'jam'

  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isLoading: false,
    currentText: null,
    error: null,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (abortRef.current) {
        abortRef.current.abort()
      }
      if (utteranceRef.current && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  /**
   * Clean text for TTS - remove emojis, special chars that might cause issues
   */
  const cleanTextForTTS = useCallback((text: string): string => {
    return text
      .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // emoticons
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // misc symbols
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // transport & map
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '') // flags
      .replace(/[\u{2600}-\u{26FF}]/gu, '')   // misc symbols
      .replace(/[\u{2700}-\u{27BF}]/gu, '')   // dingbats
      .replace(/[•→←↑↓✓✗★☆]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }, [])

  /**
   * Fallback: Use browser's built-in SpeechSynthesis API
   */
  const speakWithBrowser = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setState({ isPlaying: false, isLoading: false, currentText: null, error: 'Speech not supported in this browser' })
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utteranceRef.current = utterance

    // Map speed: API uses 0.5-2.0, browser SpeechSynthesis rate is also 0.5-2.0
    utterance.rate = Math.max(0.5, Math.min(2.0, ttsSpeed))

    // Try to find an English voice
    const voices = window.speechSynthesis.getVoices()
    const englishVoice = voices.find(v => v.lang.startsWith('en'))
    if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onstart = () => {
      setState({ isPlaying: true, isLoading: false, currentText: text, error: null })
    }

    utterance.onend = () => {
      setState({ isPlaying: false, isLoading: false, currentText: null, error: null })
      utteranceRef.current = null
    }

    utterance.onerror = (event) => {
      if (event.error === 'canceled') return
      console.error('Browser TTS Error:', event.error)
      setState({ isPlaying: false, isLoading: false, currentText: null, error: `Speech error: ${event.error}` })
      utteranceRef.current = null
    }

    window.speechSynthesis.speak(utterance)
    setState({ isPlaying: false, isLoading: true, currentText: text, error: null })
  }, [ttsSpeed])

  /**
   * Primary: Use the backend TTS API with z-ai-web-dev-sdk
   */
  const speakWithAPI = useCallback(async (text: string) => {
    const controller = new AbortController()
    abortRef.current = controller

    setState({ isPlaying: false, isLoading: true, currentText: text, error: null })

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: ttsVoice,
          speed: ttsSpeed,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'TTS request failed' }))
        throw new Error(errorData.error || 'TTS request failed')
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentText: null }))
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      audio.onerror = () => {
        setState(prev => ({ ...prev, isPlaying: false, isLoading: false, error: 'Audio playback failed' }))
        URL.revokeObjectURL(audioUrl)
        audioRef.current = null
      }

      await audio.play()
      setState({ isPlaying: true, isLoading: false, currentText: text, error: null })
    } catch (err: any) {
      if (err.name === 'AbortError') return // cancelled, ignore
      console.error('API TTS Error, falling back to browser TTS:', err)
      // Fallback to browser TTS
      speakWithBrowser(text)
    }
  }, [ttsVoice, ttsSpeed, speakWithBrowser])

  const speak = useCallback(async (text: string) => {
    if (!ttsEnabled) return

    // Stop any currently playing audio/speech
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (abortRef.current) {
      abortRef.current.abort()
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    const cleanedText = cleanTextForTTS(text)
    if (!cleanedText) return

    // Try API TTS first, fallback to browser TTS on failure
    await speakWithAPI(cleanedText)
  }, [ttsEnabled, speakWithAPI, cleanTextForTTS])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (abortRef.current) {
      abortRef.current.abort()
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    if (utteranceRef.current) {
      utteranceRef.current = null
    }
    setState({ isPlaying: false, isLoading: false, currentText: null, error: null })
  }, [])

  const toggle = useCallback((text: string) => {
    if (state.isPlaying && state.currentText === text) {
      stop()
    } else {
      speak(text)
    }
  }, [state.isPlaying, state.currentText, speak, stop])

  return {
    ...state,
    speak,
    stop,
    toggle,
    ttsEnabled,
  }
}
