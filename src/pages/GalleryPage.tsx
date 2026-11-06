import { useMemo, useState } from 'react'
import { PageHero } from '../components/blocks/PageHero'
import { GalleryMosaic } from '../components/ui/GalleryMosaic'
import { Container, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function GalleryPage() {
  const { t, u } = useLang()
  const { content } = useContent()
  const r = routes.gallery
  const cats = useMemo(() => Array.from(new Map(content.gallery.map((g) => [g.category.pt, g.category])).values()), [content.gallery])
  const [cat, setCat] = useState<string | null>(null)
  const items = cat ? content.gallery.filter((g) => g.category.pt === cat) : content.gallery
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="hero-bars-macro" />
      <PageHero compact eyebrow={t(r.title)} title={t({ pt: 'Imagens do universo dos metais preciosos.', en: 'Images from the world of precious metals.' })} image="hero-bars-macro" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-ivory py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div role="group" aria-label={u('category')} className="flex flex-wrap gap-2">
              {[{ key: null as string | null, label: u('all') }, ...cats.map((c) => ({ key: c.pt, label: t(c) }))].map((c) => (
                <button key={c.key ?? 'all'} type="button" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}
                  className={`border px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${cat === c.key ? 'border-forest bg-forest text-ivory' : 'border-ivory-300 text-charcoal-500 hover:border-forest hover:text-forest'}`}>
                  {c.label}
                </button>
              ))}
            </div>
            <PendingNote className="max-w-md">{u('galleryNote')}</PendingNote>
          </div>
          <div className="mt-12"><GalleryMosaic key={cat ?? 'all'} items={items} /></div>
        </Container>
      </section>
    </>
  )
}
