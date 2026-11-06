import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { Reveal } from '../components/ui/Reveal'
import { Container, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function DocumentsPage() {
  const { t, u } = useLang()
  const { content } = useContent()
  const r = routes.documents
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="archive-laboratory" />
      <PageHero compact eyebrow={t(r.title)} title={t({ pt: 'Políticas, relatórios e publicações institucionais.', en: 'Policies, reports and institutional publications.' })} image="ingot-display" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <PendingNote className="max-w-3xl">{t({ pt: 'Os documentos são disponibilizados para descarga apenas após aprovação institucional. Os itens assinalados encontram-se em preparação.', en: 'Documents are made available for download only after institutional approval. Marked items are in preparation.' })}</PendingNote>
          <ul className="mt-14 border-t border-ivory-300">
            {content.documents.map((d, i) => {
              const available = d.status === 'confirmado' && d.url
              return (
                <Reveal as="li" key={d.id} delay={i * 0.05} className="group grid gap-4 border-b border-ivory-300 py-8 sm:grid-cols-12 sm:items-center">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-deep sm:col-span-2">{t(d.category)}</span>
                  <div className="sm:col-span-7">
                    <h2 className="font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1 sm:text-3xl">{t(d.title)}</h2>
                    <p className="mt-1 text-sm text-charcoal-500">{t(d.description)}</p>
                  </div>
                  <div className="sm:col-span-3 sm:text-right">
                    {available ? (
                      <a href={d.url} download className="inline-flex items-center gap-2 border border-forest px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-forest transition-colors hover:bg-forest hover:text-ivory">{u('download')} <span aria-hidden>↓</span></a>
                    ) : (
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-charcoal-400">{u('documentsPending')}</span>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
