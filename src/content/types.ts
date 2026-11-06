import type { L } from './routes'
export type { L, Lang, RouteKey } from './routes'

/** Estado editorial de um dado ou serviço. Só 'confirmado' é apresentado como facto. */
export type Verification = 'confirmado' | 'a-confirmar'

export interface Slide {
  id: string
  image: string
  eyebrow: L
  title: L
  subtitle: L
  cta: { label: L; to: string }
}

export interface NewsItem {
  id: string
  slug: string
  /** Data ISO (AAAA-MM-DD). */
  date: string
  category: L
  title: L
  excerpt: L
  body: L[]
  image: string
  published: boolean
  /** Conteúdo exemplificativo que aguarda substituição por comunicado oficial. */
  sample: boolean
}

export interface Service {
  id: string
  title: L
  summary: L
  details: L[]
  image: string
  status: Verification
}

export interface DocumentItem {
  id: string
  title: L
  category: L
  description: L
  /** URL do ficheiro quando publicado. Vazio = documento ainda não disponível. */
  url: string
  date: string
  status: Verification
}

export interface ContactInfo {
  phones: { label: L; value: string; status: Verification }[]
  emails: { label: L; value: string; status: Verification }[]
  address: { value: L; status: Verification }
  hours: { value: L; status: Verification }
  /** URL de incorporação de mapa (só quando a morada estiver confirmada). */
  mapEmbedUrl: string
  social: { label: string; url: string }[]
}

export interface GalleryItem {
  id: string
  image: string
  caption: L
  category: L
  span?: 'tall' | 'wide' | 'large'
}

export interface Job {
  id: string
  title: L
  area: L
  location: L
  type: L
  open: boolean
}

export interface FaqItem {
  q: L
  a: L
}

export interface NavItem {
  label: L
  to: string
  children?: { label: L; to: string; description?: L }[]
}

/** Bloco de página interna: estrutura editorial genérica gerida pelo CMS. */
export type Block =
  | { type: 'lead'; text: L }
  | { type: 'split'; id?: string; eyebrow?: L; title: L; body: L[]; image: string; reverse?: boolean; caption?: L }
  | { type: 'pillars'; eyebrow?: L; title: L; intro?: L; items: { title: L; text: L }[]; tone?: 'light' | 'dark' }
  | { type: 'quote'; text: L; attribution?: L }
  | { type: 'banner'; image: string; title: L; text: L }
  | { type: 'list'; eyebrow?: L; title: L; items: L[] }
  | { type: 'notice'; text: L }
  | { type: 'cta'; title: L; text: L; label: L; to: string }

export interface PageContent {
  eyebrow: L
  title: L
  intro: L
  heroImage: string
  blocks: Block[]
}
