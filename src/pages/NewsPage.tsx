import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { PageHero } from '../components/blocks/PageHero'
import { NewsCard } from '../components/ui/NewsCard'
import { staggerChild, staggerParent } from '../components/ui/Reveal'
import { Container } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function NewsPage() {
  const { t, u } = useLang()
  const { content } = useContent()
  const r = routes.news
  const news = useMemo(() => content.news.filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date)), [content.news])
  const cats = useMemo(() => Array.from(new Map(news.map((n) => [n.category.pt, n.category])).values()), [news])
  const [cat, setCat] = useState<string | null>(null)
  const list = cat ? news.filter((n) => n.category.pt === cat) : news
  const [first, ...rest] = list

  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="hero-refining-hall" />
      <PageHero compact eyebrow={t(r.title)} title={t({ pt: 'Comunicados, actualidade e informação institucional.', en: 'Announcements, news and institutional information.' })} image="bullion-stack" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div role="group" aria-label={u('category')} className="flex flex-wrap gap-2">
            {[{ key: null as string | null, label: u('all') }, ...cats.map((c) => ({ key: c.pt, label: t(c) }))].map((c) => (
              <button key={c.key ?? 'all'} type="button" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}
                className={`border px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${cat === c.key ? 'border-forest bg-forest text-ivory' : 'border-ivory-300 text-charcoal-500 hover:border-forest hover:text-forest'}`}>
                {c.label}
              </button>
            ))}
          </div>
          {first && <div className="mt-14"><NewsCard item={first} large /></div>}
          <motion.ul key={cat ?? 'all'} variants={staggerParent} initial="hidden" animate="visible" className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((n) => <motion.li key={n.id} variants={staggerChild}><NewsCard item={n} /></motion.li>)}
          </motion.ul>
        </Container>
      </section>
    </>
  )
}
