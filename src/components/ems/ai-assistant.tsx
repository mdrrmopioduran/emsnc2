'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, type AISettings } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Bot, Send, Sparkles, Trash2, MessageCircle, X,
  Heart, Activity, Stethoscope, Scale, Siren, Link2,
  BookOpen, Lightbulb, RotateCcw, ChevronDown, Loader2,
  Brain, Zap, Copy, Check, Settings, Eye, EyeOff, Key,
  Server, Thermometer, Hash, AlertTriangle, Info, Save
} from 'lucide-react'

// ==================== Types ====================
interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface SuggestedPrompt {
  id: string
  icon: React.ReactNode
  text: string
  textFil: string
  category: string
}

// ==================== Provider Info ====================
const AI_PROVIDERS = [
  {
    id: 'zai' as const,
    name: 'Z.ai (Default)',
    description: 'Built-in AI, no API key needed',
    icon: '🤖',
    requiresKey: false,
    defaultModel: '',
    models: [],
  },
  {
    id: 'openai' as const,
    name: 'OpenAI',
    description: 'GPT-4o, GPT-4o-mini, GPT-3.5',
    icon: '⚡',
    requiresKey: true,
    defaultModel: 'gpt-4o-mini',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  },
  {
    id: 'anthropic' as const,
    name: 'Anthropic',
    description: 'Claude Sonnet, Haiku, Opus',
    icon: '🧠',
    requiresKey: true,
    defaultModel: 'claude-sonnet-4-20250514',
    models: ['claude-sonnet-4-20250514', 'claude-haiku-4-20250514', 'claude-opus-4-20250514'],
  },
  {
    id: 'google' as const,
    name: 'Google AI',
    description: 'Gemini Flash, Pro',
    icon: '✨',
    requiresKey: true,
    defaultModel: 'gemini-2.0-flash',
    models: ['gemini-2.0-flash', 'gemini-2.0-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
  },
  {
    id: 'custom' as const,
    name: 'Custom API',
    description: 'OpenAI-compatible endpoint',
    icon: '🔗',
    requiresKey: false,
    defaultModel: '',
    models: [],
  },
]

const DEFAULT_SYSTEM_PROMPT = `You are MANNY COLLINS, an expert study assistant for the PIO DURAN EMS NCII (Emergency Medical Service National Certificate II) TESDA certification program in the Philippines.

Your role:
- Help students prepare for the TESDA EMS NCII competency assessment
- Explain EMS concepts, procedures, and protocols clearly and accurately
- Provide study tips, mnemonics, and memory aids for EMS topics
- Answer questions about patient assessment, BLS/CPR, airway management, trauma care, medical emergencies, ambulance operations, and Philippine EMS regulations
- Support bilingual conversation in English and Filipino/Tagalog when the user speaks in Filipino

Guidelines:
- Be encouraging, supportive, and educational
- Use simple, clear language appropriate for students
- When explaining procedures, use step-by-step format
- Include practical tips and common mistakes to avoid
- Reference Philippine EMS context when relevant
- If you're unsure about something, say so honestly
- Keep responses concise but comprehensive
- Use emojis sparingly for visual emphasis (🫀🩺💊⚡🚑)
- Format important terms in **bold**`

// ==================== Suggested Prompts ====================
const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'cpr-steps',
    icon: <Heart className="w-3.5 h-3.5" />,
    text: 'What are the steps of high-quality CPR?',
    textFil: 'Ano ang mga hakbang ng high-quality CPR?',
    category: 'BLS',
  },
  {
    id: 'primary-survey',
    icon: <Stethoscope className="w-3.5 h-3.5" />,
    text: 'Explain the primary survey (ABCDE approach)',
    textFil: 'Ipalwanag ang primary survey (ABCDE approach)',
    category: 'Assessment',
  },
  {
    id: 'chain-of-survival',
    icon: <Link2 className="w-3.5 h-3.5" />,
    text: 'What is the AHA 2025 Chain of Survival?',
    textFil: 'Ano ang AHA 2025 Chain of Survival?',
    category: 'BLS',
  },
  {
    id: 'airway-management',
    icon: <Activity className="w-3.5 h-3.5" />,
    text: 'How do I manage a patient\'s airway?',
    textFil: 'Paano mamahalan ang airway ng pasyente?',
    category: 'Airway',
  },
  {
    id: 'legal-ems',
    icon: <Scale className="w-3.5 h-3.5" />,
    text: 'What are the legal aspects of EMS in the Philippines?',
    textFil: 'Ano ang mga legal na aspeto ng EMS sa Pilipinas?',
    category: 'Legal',
  },
  {
    id: 'trauma-assessment',
    icon: <Siren className="w-3.5 h-3.5" />,
    text: 'How do I perform a trauma assessment?',
    textFil: 'Paano magsagawa ng trauma assessment?',
    category: 'Trauma',
  },
  {
    id: 'study-tips',
    icon: <Lightbulb className="w-3.5 h-3.5" />,
    text: 'Give me study tips for the EMS NCII exam',
    textFil: 'Bigyan mo ako ng study tips para sa EMS NCII exam',
    category: 'Study',
  },
  {
    id: 'tesda-competencies',
    icon: <BookOpen className="w-3.5 h-3.5" />,
    text: 'What are the TESDA EMS NCII core competencies?',
    textFil: 'Ano ang mga core competency ng TESDA EMS NCII?',
    category: 'TESDA',
  },
]

// ==================== Markdown-like Renderer ====================
function renderMessageContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []

  lines.forEach((line, i) => {
    const key = `line-${i}`

    const renderBold = (text: string, lineKey: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${lineKey}-b-${j}`} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
        }
        return <span key={`${lineKey}-t-${j}`}>{part}</span>
      })
    }

    if (line.trim() === '') {
      elements.push(<div key={key} className="h-2" />)
    } else if (line.trim().startsWith('• ') || line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const text = line.trim().replace(/^[•\-*]\s*/, '')
      elements.push(
        <div key={key} className="flex gap-2 ml-1">
          <span className="text-ems-teal mt-0.5 flex-shrink-0">•</span>
          <span className="flex-1">{renderBold(text, key)}</span>
        </div>
      )
    } else if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s*(.*)/)
      if (match) {
        elements.push(
          <div key={key} className="flex gap-2 ml-1">
            <span className="text-primary font-semibold min-w-[20px] flex-shrink-0">{match[1]}.</span>
            <span className="flex-1">{renderBold(match[2], key)}</span>
          </div>
        )
      }
    } else if (line.trim().startsWith('# ')) {
      elements.push(<h3 key={key} className="font-bold text-base mt-1">{renderBold(line.trim().slice(2), key)}</h3>)
    } else if (line.trim().startsWith('## ')) {
      elements.push(<h4 key={key} className="font-bold text-sm mt-1">{renderBold(line.trim().slice(3), key)}</h4>)
    } else {
      elements.push(<p key={key} className="leading-relaxed">{renderBold(line, key)}</p>)
    }
  })

  return <div className="space-y-0.5">{elements}</div>
}

// ==================== AI Settings Panel ====================
function AISettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useAppStore()
  const [localAI, setLocalAI] = useState<AISettings>({ ...settings.ai })
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)

  const currentProvider = AI_PROVIDERS.find(p => p.id === localAI.provider)

  const handleSave = () => {
    updateSettings({ ai: { ...localAI } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setLocalAI({
      provider: 'zai',
      apiKey: '',
      model: '',
      customEndpoint: '',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 1024,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 z-10 bg-card rounded-xl overflow-y-auto custom-scrollbar"
    >
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-ems-teal" />
            <h3 className="font-bold text-sm">AI Assistant Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs gap-1"
              onClick={handleReset}
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Provider Selection */}
        <div className="space-y-2">
          <Label className="text-xs font-medium flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5" /> AI Provider
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {AI_PROVIDERS.map((provider) => (
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
                  'flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left',
                  localAI.provider === provider.id
                    ? 'border-ems-teal bg-ems-teal/5 shadow-sm'
                    : 'border-border hover:border-ems-teal/30'
                )}
              >
                <span className="text-xl">{provider.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{provider.name}</p>
                  <p className="text-[10px] text-muted-foreground">{provider.description}</p>
                </div>
                {localAI.provider === provider.id && (
                  <Check className="w-4 h-4 text-ems-teal flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* API Key (for providers that need it) */}
        {currentProvider?.requiresKey && (
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> API Key
            </Label>
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={localAI.apiKey}
                onChange={(e) => setLocalAI({ ...localAI, apiKey: e.target.value })}
                placeholder="sk-... or your API key"
                className="pr-10 h-9 text-sm font-mono"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
              >
                {showApiKey ? <EyeOff className="w-3.5 h-3.5 text-muted-foreground" /> : <Eye className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
        )}

        {/* Custom Endpoint */}
        {localAI.provider === 'custom' && (
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" /> Custom Endpoint URL
            </Label>
            <Input
              value={localAI.customEndpoint}
              onChange={(e) => setLocalAI({ ...localAI, customEndpoint: e.target.value })}
              placeholder="https://your-api.com/v1/chat/completions"
              className="h-9 text-sm font-mono"
            />
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              Must be OpenAI-compatible chat completions format.
            </p>

            {/* API Key for custom endpoint (optional) */}
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> API Key (optional)
            </Label>
            <Input
              type={showApiKey ? 'text' : 'password'}
              value={localAI.apiKey}
              onChange={(e) => setLocalAI({ ...localAI, apiKey: e.target.value })}
              placeholder="Bearer token (optional)"
              className="h-9 text-sm font-mono"
            />
          </div>
        )}

        {/* Model Selection */}
        {currentProvider && (currentProvider.models.length > 0 || localAI.provider === 'custom') && (
          <div className="space-y-2">
            <Label className="text-xs font-medium flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" /> Model
            </Label>
            {currentProvider.models.length > 0 ? (
              <Select
                value={localAI.model || currentProvider.defaultModel}
                onValueChange={(val) => setLocalAI({ ...localAI, model: val })}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentProvider.models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={localAI.model}
                onChange={(e) => setLocalAI({ ...localAI, model: e.target.value })}
                placeholder="Model name (e.g., my-model-v1)"
                className="h-9 text-sm"
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
            <span className="text-muted-foreground font-mono">{localAI.temperature.toFixed(1)}</span>
          </Label>
          <Slider
            value={[localAI.temperature]}
            onValueChange={([val]) => setLocalAI({ ...localAI, temperature: val })}
            min={0}
            max={1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Precise (0)</span>
            <span>Creative (1)</span>
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
            <SelectTrigger className="h-9 text-sm">
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

        {/* System Prompt */}
        <div className="space-y-2">
          <Label className="text-xs font-medium flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" /> System Prompt
          </Label>
          <Textarea
            value={localAI.systemPrompt}
            onChange={(e) => setLocalAI({ ...localAI, systemPrompt: e.target.value })}
            placeholder={DEFAULT_SYSTEM_PROMPT.slice(0, 200) + '...'}
            rows={6}
            className="text-xs font-mono resize-y"
          />
          <p className="text-[10px] text-muted-foreground">
            Leave empty to use the default MANNY COLLINS system prompt.
          </p>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className={cn(
            'w-full gap-2',
            saved ? 'bg-green-600 hover:bg-green-600' : 'bg-ems-teal hover:bg-ems-teal/90'
          )}
        >
          {saved ? (
            <><Check className="w-4 h-4" /> Saved!</>
          ) : (
            <><Save className="w-4 h-4" /> Save Settings</>
          )}
        </Button>

        {/* Current Config Summary */}
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-3">
            <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Current Configuration</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Provider:</span>
                <Badge variant="outline" className="text-[10px]">
                  {AI_PROVIDERS.find(p => p.id === localAI.provider)?.icon}{' '}
                  {AI_PROVIDERS.find(p => p.id === localAI.provider)?.name}
                </Badge>
              </div>
              {localAI.model && (
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-mono text-[10px]">{localAI.model}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">API Key:</span>
                <span className="font-mono text-[10px]">
                  {localAI.provider === 'zai' ? 'Not needed' : localAI.apiKey ? `${localAI.apiKey.slice(0, 8)}...` : 'Not set'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Temperature:</span>
                <span className="font-mono text-[10px]">{localAI.temperature}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Max Tokens:</span>
                <span className="font-mono text-[10px]">{localAI.maxTokens}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

// ==================== Main Component ====================
export function AIAssistantSection() {
  const { settings, addXp } = useAppStore()
  const { t, language } = useTranslation()
  const isFil = language === 'fil'

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const sessionIdRef = useRef(Date.now().toString())

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !showSettings) {
      inputRef.current.focus()
    }
  }, [showSettings])

  // Send message
  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }))

      // Build AI config from settings
      const aiConfig = {
        provider: settings.ai.provider,
        apiKey: settings.ai.apiKey,
        model: settings.ai.model,
        customEndpoint: settings.ai.customEndpoint,
        systemPrompt: settings.ai.systemPrompt,
        temperature: settings.ai.temperature,
        maxTokens: settings.ai.maxTokens,
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          sessionId: sessionIdRef.current,
          aiConfig,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get response')
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
      addXp(5)
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: isFil
          ? 'Pasensya na, may nangyaring error. Subukan muli sa ibang pagkakataon. 🔄'
          : 'Sorry, I encountered an error. Please try again. 🔄',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }, [messages, isLoading, addXp, isFil, settings.ai])

  // Clear conversation
  const clearConversation = useCallback(() => {
    setMessages([])
    setShowSuggestions(true)
    sessionIdRef.current = Date.now().toString()
  }, [])

  // Copy message to clipboard
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback
    }
  }, [])

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // Provider badge info
  const currentProvider = AI_PROVIDERS.find(p => p.id === settings.ai.provider)

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ems-teal to-ems-teal/70 flex items-center justify-center shadow-lg shadow-ems-teal/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {t('ai.title')}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {t('ai.subtitle')}
              </p>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 gap-0.5">
                {currentProvider?.icon} {currentProvider?.name}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <Badge variant="outline" className="text-[10px] gap-1">
              <MessageCircle className="w-3 h-3" />
              {messages.length}
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px] gap-1 bg-ems-teal/10 text-ems-teal border-ems-teal/20">
            <Zap className="w-3 h-3" />
            +5 XP
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              'h-8 w-8 p-0',
              showSettings ? 'text-ems-teal bg-ems-teal/10' : 'text-muted-foreground'
            )}
            title="AI Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearConversation}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t('common.clear')}
            </Button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border/60 shadow-sm relative">
        {/* AI Settings Panel (overlay) */}
        <AnimatePresence>
          {showSettings && (
            <AISettingsPanel onClose={() => setShowSettings(false)} />
          )}
        </AnimatePresence>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 scroll-smooth"
          style={{ scrollbarGutter: 'stable' }}
        >
          <div className="space-y-4">
            {/* Welcome message when no conversation */}
            {messages.length === 0 && showSuggestions && (
              <div className="space-y-4">
                {/* AI Welcome */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ems-teal to-ems-teal/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-xl rounded-tl-sm p-4 max-w-[85%]">
                    <p className="text-sm leading-relaxed">
                      {isFil
                        ? 'Kamusta! 👋 Ako si MANNY COLLINS — tanong mo, sagot ko! Handa kitang tulungan sa pag-aaral para sa TESDA EMS NCII certification. Magtanong ka lang tungkol sa anumang paksa sa EMS — mula sa CPR hanggang sa patient assessment, legal na aspeto, at higit pa!'
                        : 'Hello! 👋 I\'m MANNY COLLINS — tanong mo, sagot ko! I\'m here to help you study for the TESDA EMS NCII certification. Ask me anything about EMS topics — from CPR to patient assessment, legal aspects, and more!'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {isFil
                        ? '💡 Pumili ng tanong sa ibaba o mag-type ng sarili mong tanong.'
                        : '💡 Pick a question below or type your own question.'}
                    </p>
                  </div>
                </motion.div>

                {/* Suggested Prompts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                  {suggestedPrompts.map((prompt, i) => (
                    <motion.button
                      key={prompt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      onClick={() => sendMessage(isFil ? prompt.textFil : prompt.text)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/60 bg-card hover:bg-muted/50 hover:border-ems-teal/30 transition-all text-left group"
                    >
                      <span className="text-ems-teal group-hover:scale-110 transition-transform">
                        {prompt.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-snug text-foreground/90 line-clamp-2">
                          {isFil ? prompt.textFil : prompt.text}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 flex-shrink-0">
                        {prompt.category}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex gap-3',
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  )}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ems-teal to-ems-teal/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-foreground">You</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={cn(
                      'relative group max-w-[85%] rounded-xl p-3 text-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted/50 text-foreground rounded-tl-sm'
                    )}
                  >
                    <div className={cn(
                      msg.role === 'user' ? 'text-primary-foreground/90' : ''
                    )}>
                      {renderMessageContent(msg.content)}
                    </div>

                    {/* Copy button for assistant messages */}
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
                        title="Copy"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-ems-teal" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ems-teal to-ems-teal/70 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted/50 rounded-xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-ems-teal animate-spin" />
                    <span className="text-xs text-muted-foreground">
                      {isFil ? 'Nag-iisip...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border/60 bg-card/80">
          {/* Quick re-suggest button when conversation exists */}
          {messages.length > 0 && (
            <div className="mb-2">
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-ems-teal transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                {isFil ? 'Mga mungkahing tanong' : 'Suggested questions'}
                <ChevronDown className={cn(
                  'w-3 h-3 transition-transform',
                  showSuggestions && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {suggestedPrompts.slice(0, 4).map((prompt) => (
                        <button
                          key={prompt.id}
                          onClick={() => sendMessage(isFil ? prompt.textFil : prompt.text)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg border border-border/50 bg-background hover:bg-muted/50 hover:border-ems-teal/30 transition-all text-[10px]"
                        >
                          <span className="text-ems-teal">{prompt.icon}</span>
                          <span className="max-w-[140px] truncate">
                            {isFil ? prompt.textFil : prompt.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isFil
                  ? 'Magtanong tungkol sa EMS... (Enter para ipadala)'
                  : 'Ask about EMS... (Enter to send)'}
                className="w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ems-teal/30 focus:border-ems-teal/50 placeholder:text-muted-foreground/50 min-h-[42px] max-h-[120px]"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="h-[42px] px-4 rounded-xl bg-ems-teal hover:bg-ems-teal/90 text-white gap-1.5"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-1.5 text-center">
            {isFil
              ? 'Ang AI na ito ay tumutulong sa pag-aaral. Palaging suriin ang mga sagot sa iyong modules.'
              : 'This AI assists with studying. Always verify answers against your modules.'}
          </p>
        </div>
      </Card>
    </div>
  )
}

// ==================== Floating Chat Button (Draggable & Closeable) ====================
export function FloatingChatButton() {
  const { setActiveSection, setActiveSubSection } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // Drag state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number; moved: boolean } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleOpen = () => {
    setActiveSection('study')
    setActiveSubSection('ai-assistant')
    setIsOpen(false)
  }

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    dragRef.current = { startX, startY, posX: position.x, posY: position.y, moved: false }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.moved = true
    }
    setPosition({
      x: dragRef.current.posX + dx,
      y: dragRef.current.posY + dy,
    })
  }

  const handlePointerUp = () => {
    const wasDragged = dragRef.current?.moved
    dragRef.current = null
    // Only toggle open on click (not drag)
    if (!wasDragged) {
      setIsOpen(!isOpen)
    }
  }

  // Restore hidden button
  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 px-3 py-2 rounded-full bg-gradient-to-br from-ems-teal/80 to-ems-teal/60 text-white shadow-lg shadow-ems-teal/20 flex items-center gap-1.5 text-[11px] font-medium hover:shadow-xl hover:shadow-ems-teal/30 transition-all"
        aria-label="Show AI Assistant"
      >
        <Brain className="w-4 h-4" />
        <span className="hidden sm:inline">AI</span>
      </button>
    )
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed z-50 bg-card border border-border rounded-xl shadow-2xl shadow-ems-teal/10 p-4 w-72"
            style={{
              bottom: `calc(5rem + 56px + ${position.y}px)`,
              right: `calc(1rem + ${-position.x}px)`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ems-teal to-ems-teal/70 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">MANNY COLLINS</p>
                  <p className="text-[10px] text-muted-foreground">Tanong Mo, Sagot Ko</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsHidden(true)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Hide assistant"
                  title="Hide button"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Ask me anything about EMS NCII — CPR, patient assessment, protocols, and more!
            </p>
            <Button
              onClick={handleOpen}
              className="w-full bg-ems-teal hover:bg-ems-teal/90 text-white gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Open AI Assistant
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-20 md:bottom-6 right-4 z-40" style={{ transform: `translate(${-position.x}px, ${-position.y}px)` }}>
        {/* Close button to hide the floating icon */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsHidden(true)
          }}
          className="absolute -top-1.5 -right-1.5 z-50 w-5 h-5 rounded-full bg-white dark:bg-card border border-border shadow-sm flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/50 hover:border-red-300 transition-all"
          aria-label="Close AI button"
        >
          <X className="w-3 h-3 text-muted-foreground hover:text-red-500" />
        </button>
        <motion.button
          ref={buttonRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-ems-teal to-ems-teal/80 text-white shadow-lg shadow-ems-teal/30 flex items-center justify-center hover:scale-110 transition-transform touch-none select-none cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="AI Study Assistant (draggable)"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Brain className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </>
  )
}
