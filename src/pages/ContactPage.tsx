import { PageHero } from '../components/blocks/PageHero'
import { ContactDetails } from '../components/ui/ContactDetails'
import { ContactForm } from '../components/ui/ContactForm'
import { Reveal } from '../components/ui/Reveal'
import { Container, Eyebrow, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

export default function ContactPage() {
  const { t } = useLang()
  const { content } = useContent()
  const r = routes.contact
  const mapReady = content.contact.address.status === 'confirmado' && content.contact.mapEmbedUrl
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="luanda-bay" />
      <PageHero compact eyebrow={t(r.title)} title={t({ pt: 'Estamos ao seu dispor.', en: 'We are at your service.' })} intro={t({ pt: 'Informações institucionais, parcerias, fornecimento, carreiras ou imprensa.', en: 'Institutional information, partnerships, supply, careers or press.' })} image="luanda-bay" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><Eyebrow>{t({ pt: 'Contactos oficiais', en: 'Official contacts' })}</Eyebrow></Reveal>
            <Reveal delay={0.1} className="mt-8"><ContactDetails buttons /></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <h2 className="font-display text-4xl text-forest sm:text-5xl">{t({ pt: 'Envie-nos uma mensagem', en: 'Send us a message' })}</h2>
            <div className="mt-10"><ContactForm /></div>
          </Reveal>
        </Container>
      </section>
      <section className="bg-ivory py-16" aria-label={t({ pt: 'Localização', en: 'Location' })}>
        <Container>
          {mapReady ? (
            <iframe title={t({ pt: 'Mapa de localização', en: 'Location map' })} src={content.contact.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[28rem] w-full border-0 grayscale" />
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">{t({ pt: 'Localização', en: 'Location' })}</p>
                <p className="mt-4 font-display text-3xl leading-snug text-forest sm:text-4xl">{t(content.contact.address.value)}</p>
                <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">{t(content.brochure.tagline)}</p>
              </div>
              <PendingNote className="max-w-xl lg:col-span-5">{t({ pt: 'O mapa de localização será apresentado após confirmação oficial da morada das instalações.', en: 'The location map will be shown once the facility address is officially confirmed.' })}</PendingNote>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
