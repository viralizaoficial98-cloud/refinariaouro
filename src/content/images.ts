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
}

export const images = manifest as Record<string, ImageMeta>
export const imageIds = Object.keys(images)

/** Todas as fotografias actuais são ilustrativas (não retratam as instalações). */
export const isIllustrative = (id: string) => id in images

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
