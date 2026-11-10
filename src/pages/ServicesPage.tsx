import { motion } from 'framer-motion'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { useParallax } from '../hooks/useParallax'
import { Picture } from '../components/ui/Picture'
import { MaskReveal, Reveal } from '../components/ui/Reveal'
import { ButtonLink, Container, IllustrativeTag, PendingNote, StatusBadge } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { routes, path } from '../content/routes'
import type { Service } from '../content/types'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

function ServiceRow({ s, i }: { s: Service; i: number }) {
  const { t, u } = useLang()
  const { ref, y } = useParallax<HTMLDivElement>(35)
  const reverse = i % 2 === 1
  return (
    <section id={s.id} className={`scroll-mt-24 py-16 sm:py-24 ${reverse ? 'bg-white' : 'bg-ivory'}`} aria-labelledby={`${s.id}-t`}>
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div ref={ref} className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <MaskReveal direction={reverse ? 'up' : 'left'} className="relative aspect-[4/3] overflow-hidden">
            <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
              <Picture id={s.image} alt={t(s.title)} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
            </motion.div>
            <IllustrativeTag id={s.image} className="absolute bottom-4 right-4" />
          </MaskReveal>
        </div>
        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
          <Reveal className="flex items-center gap-4">
            <span className="font-display text-2xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
            {s.status === 'a-confirmar' && <StatusBadge>{u('pendingService')}</StatusBadge>}
          </Reveal>
          <Reveal delay={0.1}><h2 id={`${s.id}-t`} className="mt-6 font-display text-4xl leading-tight text-forest sm:text-5xl">{t(s.title)}</h2></Reveal>
          <Reveal delay={0.15}><p className="mt-6 text-lg leading-relaxed text-charcoal-700">{t(s.summary)}</p></Reveal>
          <ul className="mt-8">
            {s.details.map((d, j) => (
              <Reveal as="li" key={j} delay={0.2 + j * 0.05} className="flex gap-4 border-t border-ivory-300 py-4 text-charcoal-700 last:border-b">
                <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-gold" />{t(d)}
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default function ServicesPage() {
  const { t } = useLang()
  const { content } = useContent()
  const r = routes.services
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="fire-assay-furnace" />
      <PageHero eyebrow={t(r.title)} title={t({ pt: 'Competências técnicas ao serviço da cadeia de valor do ouro.', en: 'Technical expertise serving the gold value chain.' })} intro={t({ pt: 'Três serviços principais — análise, refinação e purificação, e contrastaria — complementados por áreas de competência técnica.', en: 'Three core services — analysis, refining and purification, and assay office — complemented by areas of technical expertise.' })} image="fire-assay-furnace" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-ivory pt-16">
        <Container><Reveal><PendingNote className="max-w-3xl">{t({ pt: 'Os serviços 01 a 03 são os serviços principais apresentados na brochura institucional da Refinaria. As áreas seguintes descrevem o âmbito complementar previsto e não devem ser entendidas como serviço comercial efectivamente disponibilizado até confirmação institucional. A contrastaria e a emissão de certificados estão sujeitas a validação regulamentar.', en: 'Services 01 to 03 are the core services presented in the Refinery’s corporate brochure. The following areas describe the planned complementary scope and should not be understood as commercially available services until institutional confirmation. The assay office and the issue of certificates are subject to regulatory validation.' })}</PendingNote></Reveal></Container>
      </section>
      {content.services.map((s, i) => <ServiceRow key={s.id} s={s} i={i} />)}
      <section className="bg-forest-900 py-20 text-ivory">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-xl font-display text-3xl">{t({ pt: 'Tem uma necessidade técnica específica?', en: 'Do you have a specific technical need?' })}</p>
          <ButtonLink to={`${path('contact')}?assunto=servicos`}>{t({ pt: 'Fale connosco', en: 'Talk to us' })}</ButtonLink>
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
