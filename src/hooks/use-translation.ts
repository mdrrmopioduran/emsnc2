import { useAppStore } from '@/store/app-store'
import { translations, type Language, type TranslationKey } from '@/data/translations'

export function useTranslation() {
  const language = useAppStore((s) => s.settings.language) || 'en'

  function t(key: TranslationKey): string {
    return translations[key]?.[language as Language] || translations[key]?.en || key
  }

  function tBoth(key: TranslationKey): { en: string; fil: string } {
    return translations[key] || { en: key, fil: key }
  }

  return { t, tBoth, language }
}
