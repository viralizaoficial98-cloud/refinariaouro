import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ContactInfo, DocumentItem, FaqItem, GalleryItem, Job, NewsItem, PageContent, Service, Slide } from './types'
import { initialContact, initialDocuments, initialFaq, initialGallery, initialJobs, initialServices, initialSlides } from './site'
import { initialNews } from './news'
import { initialPages, type PageKey } from './pages'

export interface SiteContent {
  slides: Slide[]
  news: NewsItem[]
  services: Service[]
  documents: DocumentItem[]
  gallery: GalleryItem[]
  jobs: Job[]
  faq: FaqItem[]
  contact: ContactInfo
  pages: Record<PageKey, PageContent>
}

export const initialContent: SiteContent = {
  slides: initialSlides,
  news: initialNews,
  services: initialServices,
  documents: initialDocuments,
  gallery: initialGallery,
  jobs: initialJobs,
  faq: initialFaq,
  contact: initialContact,
  pages: initialPages,
}

interface ContentCtx {
  content: SiteContent
  /** Actualização em memória (modo demonstração do CMS). Não persiste. */
  update: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void
  reset: () => void
}

const Ctx = createContext<ContentCtx | null>(null)

/**
 * Fonte única de conteúdo para o site público e para o backoffice.
 * Sem backend configurado, as alterações vivem apenas em memória nesta sessão.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialContent)
  const value = useMemo<ContentCtx>(() => ({
    content,
    update: (key, v) => setContent((c) => ({ ...c, [key]: v })),
    reset: () => setContent(initialContent),
  }), [content])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useContent fora do ContentProvider')
  return ctx
}
