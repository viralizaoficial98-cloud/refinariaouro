import manifest from './image-manifest.json'

export interface ImageMeta {
  width: number
  height: number
  widths: number[]
  author: string
  license: string
  licenseUrl?: string
  source: string
  client?: boolean
  /** Fotografia oficial (não ilustrativa). */
  official?: boolean
  /** Fotografia extraída da brochura institucional da Refinaria. */
  brochure?: boolean
}

export const images = manifest as Record<string, ImageMeta>
export const imageIds = Object.keys(images)

/** Fotografias ilustrativas: todas excepto as oficiais (ex.: retrato do CEO). */
export const isIllustrative = (id: string) => id in images && !images[id].official && !images[id].brochure
export const isBrochure = (id: string) => !!images[id]?.brochure

export function srcSet(id: string, format: 'avif' | 'webp') {
  const m = images[id]
  if (!m) return ''
  return m.widths.map((w) => `/images/${id}-${w}.${format} ${w}w`).join(', ')
}

export function fallbackSrc(id: string, preferred = 1280) {
  const m = images[id]
  if (!m) return ''
  const w = m.widths.find((x) => x >= preferred) ?? m.widths[m.widths.length - 1]
  return `/images/${id}-${w}.webp`
}
