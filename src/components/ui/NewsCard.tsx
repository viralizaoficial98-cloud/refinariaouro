import { Link } from 'react-router-dom'
import type { NewsItem } from '../../content/types'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from './Picture'

export function formatDate(iso: string, lang: 'pt' | 'en') {
  if (!iso) return ''
  return new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'pt' ? 'pt-AO' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function NewsCard({ item, large = false }: { item: NewsItem; large?: boolean }) {
  const { t, u, lang } = useLang()
  return (
    <article className="group relative h-full">
      <Link to={`${path('news')}/${item.slug}`} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
        <div className={`relative overflow-hidden bg-charcoal ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <Picture id={item.image} alt="" sizes={large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, 85vw'} className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105" />
          <span className="absolute left-0 top-0 bg-gold px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-charcoal">{t(item.category)}</span>
        </div>
        <div className="flex flex-1 flex-col pt-6">
          <p className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
            <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
            {item.sample && <span className="border border-gold/50 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{u('sample')}</span>}
          </p>
          <h3 className={`mt-3 font-display leading-snug text-forest transition-colors duration-500 group-hover:text-emerald ${large ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{t(item.title)}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-charcoal-500">{t(item.excerpt)}</p>
          <span className="mt-auto pt-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-forest">
            {u('readMore')} <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
