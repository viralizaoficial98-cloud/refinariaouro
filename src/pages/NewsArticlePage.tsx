import { Link, useParams } from 'react-router-dom'
import { PageHero } from '../components/blocks/PageHero'
import { formatDate, NewsCard } from '../components/ui/NewsCard'
import { Reveal } from '../components/ui/Reveal'
import { Container, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes, path } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'
import NotFoundPage from './NotFoundPage'

export default function NewsArticlePage() {
  const { slug } = useParams()
  const { t, u, lang } = useLang()
  const { content } = useContent()
  const item = content.news.find((n) => n.slug === slug && n.published)
  if (!item) return <NotFoundPage />
  const others = content.news.filter((n) => n.published && n.id !== item.id).slice(0, 3)
  return (
    <>
      <Seo title={t(item.title)} description={t(item.excerpt)} image={item.image} type="article"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'NewsArticle', headline: t(item.title), datePublished: item.date, inLanguage: lang === 'pt' ? 'pt-AO' : 'en' }} />
      <PageHero compact eyebrow={t(item.category)} title={t(item.title)} image={item.image} crumbs={[{ label: t(routes.news.title), to: path('news') }, { label: t(item.category) }]} />
      <article className="bg-white py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">{u('published')}</p>
            <p className="mt-2 font-display text-2xl text-forest"><time dateTime={item.date}>{formatDate(item.date, lang)}</time></p>
            {item.sample && <PendingNote className="mt-8">{t({ pt: 'Conteúdo exemplificativo a substituir por comunicado oficial.', en: 'Sample content to be replaced by an official announcement.' })}</PendingNote>}
          </aside>
          <div className="lg:col-span-7">
            <Reveal><p className="font-display text-3xl leading-snug text-forest">{t(item.excerpt)}</p></Reveal>
            {item.body.map((p, i) => <Reveal key={i} delay={0.05 * i}><p className="mt-7 text-lg leading-relaxed text-charcoal-700">{t(p)}</p></Reveal>)}
            <Link to={path('news')} className="mt-14 inline-block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest underline decoration-gold underline-offset-8">← {u('backToNews')}</Link>
          </div>
        </Container>
      </article>
      {others.length > 0 && (
        <section className="bg-ivory py-20">
          <Container>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{others.map((n) => <li key={n.id}><NewsCard item={n} /></li>)}</ul>
          </Container>
        </section>
      )}
    </>
  )
}
