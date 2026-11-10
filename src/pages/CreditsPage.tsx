import { PageHero } from '../components/blocks/PageHero'
import { Picture } from '../components/ui/Picture'
import { Container, PendingNote } from '../components/ui/Typography'
import { images } from '../content/images'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function CreditsPage() {
  const { t } = useLang()
  const r = routes.credits
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} />
      <PageHero compact eyebrow={t(r.title)} title={t(r.title)} image="archive-assay" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <PendingNote className="max-w-3xl">{t({ pt: 'As fotografias deste portal são ilustrativas e não retratam as instalações da Refinaria de Ouro de Angola, com excepção do retrato oficial do Director Geral. Abaixo indicam-se autoria, licença e origem.', en: 'Photographs on this portal are illustrative and do not depict the Angola Gold Refinery’s facilities, except for the Director General’s official portrait. Authorship, licence and source are listed below.' })}</PendingNote>
          <ul className="mt-12 grid gap-px bg-ivory-300 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(images).map(([id, m]) => (
              <li key={id} className="flex gap-5 bg-white p-5">
                <Picture id={id} alt="" sizes="96px" className="block h-20 w-24 shrink-0 overflow-hidden" imgClassName="h-full w-full object-cover" />
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-forest">{m.author}</p>
                  <p className="mt-1 text-charcoal-500">{m.licenseUrl ? <a href={m.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-2">{m.license}</a> : m.license}</p>
                  {m.source && <a href={m.source} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-xs text-charcoal-400 underline">Wikimedia Commons</a>}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
