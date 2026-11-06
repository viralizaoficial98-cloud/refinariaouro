import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '../content/types'
import { ui, type UiKey } from './ui'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  /** Traduz um valor bilingue; recorre ao português se a tradução estiver vazia. */
  t: (value: L | undefined) => string
  u: (key: UiKey) => string
}

const Ctx = createContext<LangCtx | null>(null)
const STORAGE_KEY = 'roa-lang'

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'en' || fromUrl === 'pt') return fromUrl
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'pt') return stored
  } catch { /* armazenamento indisponível */ }
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-AO' : 'en'
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignorar */ }
  }, [])

  const value = useMemo<LangCtx>(() => ({
    lang,
    setLang,
    t: (v) => (v ? v[lang] || v.pt : ''),
    u: (k) => ui[lang][k],
  }), [lang, setLang])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang fora do LanguageProvider')
  return ctx
}
