import { useEffect, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './language'

const LANGUAGE_STORAGE_KEY = 'language-preference'

function getBrowserLanguage(): Language {
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Language | null>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return savedLanguage === 'pt' || savedLanguage === 'en' ? savedLanguage : null
  })
  const [browserLanguage, setBrowserLanguage] = useState(getBrowserLanguage)
  const language = preference ?? browserLanguage

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = 'Paulo Rabelo | Full Stack and AI Engineer'

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = language === 'pt'
        ? 'Paulo Rabelo — Full Stack and AI Engineer desenvolvendo aplicações completas e soluções com IA usando TypeScript, React, Node.js e Python.'
        : 'Paulo Rabelo — Full Stack and AI Engineer building end-to-end applications and AI-powered solutions with TypeScript, React, Node.js, and Python.'
    }
  }, [language])

  useEffect(() => {
    if (preference) return

    const handleLanguageChange = () => setBrowserLanguage(getBrowserLanguage())
    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [preference])

  const toggleLanguage = () => {
    const nextLanguage = language === 'pt' ? 'en' : 'pt'
    setPreference(nextLanguage)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
