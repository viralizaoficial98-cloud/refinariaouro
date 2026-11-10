import { motion } from 'framer-motion'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { GoldList, MediaRow } from '../components/blocks/MediaRow'
import { useParallax } from '../hooks/useParallax'
import { Picture } from '../components/ui/Picture'
import { MaskReveal, Reveal } from '../components/ui/Reveal'
import { ButtonLink, Container, IllustrativeTag, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { path, routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

/** Tecnologias e Técnicas de Refinação (brochura, p. 5). */
export default function TechnologiesPage() {
  const { t } = useLang()
  const { content } = useContent()
  const tech = content.brochure.techniques
  const r = routes.technologies
  const { ref, y } = useParallax<HTMLDivElement>(50)
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="brochure-electrolysis" />
      <PageHero eyebrow={t(r.title)} title={t(tech.title)} intro={t(tech.intro)} image="brochure-electrolysis" crumbs={[{ label: t(r.title) }]} />
      <section className="bg-ivory pt-20 sm:pt-28">
        <Container>
          <Reveal><p className="max-w-5xl font-display text-3xl leading-[1.25] text-forest sm:text-4xl lg:text-[2.8rem]">{t({ pt: 'Dois sistemas complementares de refinação do ouro e da prata, com flexibilidade operacional consoante a natureza e o grau de pureza da matéria-prima.', en: 'Two complementary gold and silver refining systems, with operational flexibility according to the nature and purity of the raw material.' })}</p></Reveal>
          <Reveal delay={0.2}><span aria-hidden className="mt-10 block h-px w-24 bg-gold" /></Reveal>
        </Container>
      </section>
      {tech.items.map((it, i) => (
        <MediaRow key={it.id} id={it.id} index={i + 1} eyebrow={{ pt: 'Técnica de refinação', en: 'Refining technique' }} title={it.title} text={it.text} image={it.image} reverse={i % 2 === 1} tone={i % 2 ? 'white' : 'ivory'}>
          <Reveal delay={0.18}><p className="mt-10 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t({ pt: 'Benefícios', en: 'Benefits' })}</p></Reveal>
          <GoldList items={it.benefits} />
        </MediaRow>
      ))}

      <section id="fine-gold" className="relative scroll-mt-24 overflow-hidden bg-forest-900 text-ivory" aria-labelledby="fine-gold-t">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(212,175,55,0.22),transparent_60%)]" />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:py-36">
          <div className="lg:col-span-6">
            <Reveal><p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{t({ pt: 'Qualidade e versatilidade', en: 'Quality and versatility' })}</p></Reveal>
            <Reveal delay={0.1}><h2 id="fine-gold-t" className="mt-8 font-display text-6xl text-gold-light sm:text-7xl lg:text-8xl">{t(tech.fineGold.title)}</h2></Reveal>
            <Reveal delay={0.15}><p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">{t(tech.fineGold.text)}</p></Reveal>
            <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-6">
              <ButtonLink to={path('contrastaria')}>{t({ pt: 'Contrastaria e Certificação', en: 'Assay Office and Certification' })}</ButtonLink>
              <ButtonLink to={path('process')} variant="outlineLight">{t({ pt: 'Processo de Refinação', en: 'Refining Process' })}</ButtonLink>
            </Reveal>
          </div>
          <div ref={ref} className="relative h-80 sm:h-[28rem] lg:col-span-6 lg:h-[34rem]">
            <MaskReveal className="absolute inset-0">
              <motion.div style={{ y }} className="absolute inset-0">
                <Picture id={tech.fineGold.image} alt={t({ pt: 'Barras de ouro fino', en: 'Fine gold bars' })} sizes="(min-width: 1024px) 45vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]" />
              </motion.div>
            </MaskReveal>
            <IllustrativeTag id={tech.fineGold.image} className="absolute bottom-0 right-0" />
          </div>
        </Container>
      </section>
      <section className="bg-ivory py-14">
        <Container><Reveal><PendingNote className="max-w-3xl">{t({ pt: 'Descrição institucional das técnicas, conforme a brochura da Refinaria. Por razões de segurança, não são publicados parâmetros nem procedimentos operacionais.', en: 'Institutional description of the techniques, as set out in the Refinery’s brochure. For safety reasons, operating parameters and procedures are not published.' })}</PendingNote></Reveal></Container>
      </section>
      <RelatedLinks />
    </>
  )
}
