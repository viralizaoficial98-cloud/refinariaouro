import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { fallbackSrc } from '../content/images'

const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || window.location.origin

interface Props {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector<HTMLLinkElement>(sel)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    if (hreflang) el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

/** Metadados por página: título, descrição, canonical, Open Graph, Twitter e JSON-LD. */
export function Seo({ title, description, image = 'hero-molten-pour', type = 'website', noindex = false, jsonLd }: Props) {
  const { lang, t } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    const brand = t({ pt: 'Refinaria de Ouro de Angola', en: 'Angola Gold Refinery' })
    const full = title ? `${title} | ${brand}` : `${brand} — Grupo ENDIAMA`
    const url = SITE_URL + pathname
    const img = SITE_URL + fallbackSrc(image, 1280)
    document.title = full
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:locale', lang === 'pt' ? 'pt_AO' : 'en_GB')
    setMeta('property', 'og:site_name', brand)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)
    setLink('canonical', url)
    setLink('alternate', `${url}?lang=pt`, 'pt-AO')
    setLink('alternate', `${url}?lang=en`, 'en')

    const id = 'page-jsonld'
    document.getElementById(id)?.remove()
    if (jsonLd) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = id
      s.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
  }, [title, description, image, type, noindex, jsonLd, lang, pathname, t])

  return null
}
