import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { routeList, path } from '../../content/routes'
import { useContent } from '../../content/ContentContext'
import { useLang } from '../../i18n/LanguageContext'
import { useDialog } from '../../hooks/useDialog'
import { processSteps } from '../../content/home'

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, u } = useLang()
  const { content } = useContent()
  const ref = useDialog<HTMLDivElement>(open, onClose)
  const [q, setQ] = useState('')

  const index = useMemo(() => {
    const pageText: Record<string, string> = {}
    for (const [key, p] of Object.entries(content.pages)) pageText[key] = [t(p.title), t(p.intro)].join(' ')
    return [
      ...routeList.map((r) => ({ to: r.path, title: t(r.title), text: `${t(r.description)} ${pageText[r.key] ?? ''}`, kind: t({ pt: 'Página', en: 'Page' }) })),
      ...content.news.filter((n) => n.published).map((n) => ({ to: `${path('news')}/${n.slug}`, title: t(n.title), text: t(n.excerpt), kind: t(n.category) })),
      ...content.services.map((s) => ({ to: `${path('services')}#${s.id}`, title: t(s.title), text: t(s.summary), kind: t({ pt: 'Serviço', en: 'Service' }) })),
      ...processSteps.map((s) => ({ to: `${path('process')}#${s.id}`, title: t(s.title), text: t(s.text), kind: t({ pt: 'Processo', en: 'Process' }) })),
      ...content.faq.map((f) => ({ to: path('faq'), title: t(f.q), text: t(f.a), kind: 'FAQ' })),
    ]
  }, [content, t])

  const results = useMemo(() => {
    const terms = norm(q.trim()).split(/\s+/).filter(Boolean)
    if (q.trim().length < 2) return []
    return index
      .map((r) => {
        const title = norm(r.title), text = norm(r.text)
        const score = terms.reduce((s, term) => s + (title.includes(term) ? 3 : 0) + (text.includes(term) ? 1 : 0), 0)
        const all = terms.every((term) => title.includes(term) || text.includes(term))
        return { ...r, score: all ? score : 0 }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
  }, [q, index])

  const close = () => { setQ(''); onClose() }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={u('search')}
          className="fixed inset-0 z-[70] overflow-y-auto bg-charcoal/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-20">
            <div className="flex justify-end">
              <button type="button" onClick={close} className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                {u('close')} <span aria-hidden>×</span>
              </button>
            </div>
            <label htmlFor="site-search" className="sr-only">{u('search')}</label>
            <input
              id="site-search"
              data-autofocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={u('searchPlaceholder')}
              autoComplete="off"
              className="mt-8 w-full border-0 border-b border-ivory/30 bg-transparent pb-5 font-display text-4xl text-ivory placeholder:text-ivory/30 focus:border-gold focus:outline-none focus:ring-0 sm:text-6xl"
            />
            <div aria-live="polite" className="mt-8">
              {q.trim().length < 2 ? (
                <p className="text-sm text-ivory/50">{u('searchHint')}</p>
              ) : results.length === 0 ? (
                <p className="text-sm text-ivory/60">{u('searchEmpty')}</p>
              ) : (
                <ul className="divide-y divide-ivory/10">
                  {results.map((r, i) => (
                    <motion.li key={r.to + r.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <Link to={r.to} onClick={close} className="group block py-5 focus-visible:outline-none">
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold">{r.kind}</span>
                        <span className="mt-1 block font-display text-2xl text-ivory transition-colors group-hover:text-gold-light group-focus-visible:text-gold-light">{r.title}</span>
                        <span className="mt-1 line-clamp-2 block text-sm text-ivory/55">{r.text}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
