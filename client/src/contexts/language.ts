import { createContext } from 'react'

export type Language = 'en' | 'pt'

export interface LanguageContextValue {
  language: Language
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
