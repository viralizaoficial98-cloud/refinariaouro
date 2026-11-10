import { motion } from 'framer-motion'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { GoldList, MediaRow } from '../components/blocks/MediaRow'
import { useParallax } from '../hooks/useParallax'
import { Picture } from '../components/ui/Picture'
import { MaskReveal, Reveal, staggerChild, staggerParent } from '../components/ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag, PendingNote } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { path, routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

/** Contrastaria, Vantagens e Impacto, Ensaio, Certificação, Rastreabilidade e Hallmarking (brochura, p. 6–7). */
export default function ContrastariaPage() {
  const { t } = useLang()
  const { content } = useContent()
  const b = content.brochure
  const c = b.contrastaria
  const r = routes.contrastaria
  const { ref, y } = useParallax<HTMLDivElement>(50)
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="brochure-contrastaria-die" />
      <PageHero eyebrow={t(r.title)} title={t(c.title)} intro={t({ pt: 'Verificação, ensaio e certificação oficial dos metais preciosos processados, com garantia de título.', en: 'Verification, assaying and official certification of the precious metals processed, with a guarantee of fineness.' })} image="brochure-contrastaria-die" crumbs={[{ label: t(r.title) }]} />

      <MediaRow id="contrastaria" eyebrow={{ pt: 'Contrastaria', en: 'Assay office' }} title={{ pt: 'Garantia do título dos metais preciosos.', en: 'Guaranteeing the fineness of precious metals.' }} text={c.intro} image="brochure-analysis-loupe">
        <GoldList items={[
          { pt: 'Verificação e ensaio de metais preciosos', en: 'Verification and assaying of precious metals' },
          { pt: 'Certificação de pureza', en: 'Purity certification' },
          { pt: 'Garantia do título dos metais', en: 'Guarantee of metal fineness' },
          { pt: 'Transparência dos processos', en: 'Transparent processes' },
          { pt: 'Valorização económica do ouro nacional', en: 'Economic value for national gold' },
        ]} />
      </MediaRow>

      <section id="vantagens" className="relative scroll-mt-24 overflow-hidden bg-forest-900 py-20 text-ivory sm:py-28 lg:py-36" aria-labelledby="impact-t">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(212,175,55,0.18),transparent_55%)]" />
        <Container className="relative grid gap-16 lg:grid-cols-12">
          <div ref={ref} className="relative order-2 h-96 sm:h-[30rem] lg:order-1 lg:col-span-4 lg:h-auto">
            <MaskReveal className="absolute inset-0">
              <motion.div style={{ y }} className="absolute inset-0">
                <Picture id="brochure-fine-gold-bar" alt={t({ pt: 'Barra de ouro fino 999,9', en: 'Fine gold bar 999.9' })} sizes="(min-width: 1024px) 30vw, 80vw" className="block h-full w-full" imgClassName="h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]" />
              </motion.div>
            </MaskReveal>
            <IllustrativeTag id="brochure-fine-gold-bar" className="absolute bottom-0 right-0" />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <Reveal><Eyebrow light>{t({ pt: 'Impacto nacional', en: 'National impact' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="impact-t" light className="mt-8">{t(c.impactTitle)}</Heading></Reveal>
            <motion.ol variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-12 grid gap-px bg-ivory/10 sm:grid-cols-2">
              {c.impact.map((it, i) => (
                <motion.li key={i} variants={staggerChild} className="group relative bg-forest-900 p-7">
                  <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-lux group-hover:w-full" />
                  <span className="text-xs font-semibold text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-4 leading-relaxed text-ivory/85">{t(it)}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </Container>
      </section>

      {c.blocks.map((blk, i) => (
        <MediaRow key={blk.id} id={blk.id} index={i + 1} title={blk.title} text={blk.text} image={blk.image} reverse={i % 2 === 0} tone={i % 2 ? 'ivory' : 'white'} cutout={blk.image === 'brochure-fine-gold-bar'}>
          {blk.items && <GoldList items={blk.items} />}
        </MediaRow>
      ))}

      <section className="bg-ivory pb-20 pt-6 sm:pb-28">
        <Container>
          <Reveal className="border-y border-gold/40 py-10 text-center">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-gold-deep sm:text-base">{t(b.tagline)}</p>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center">
            {c.status !== 'confirmado' && <Reveal className="lg:col-span-7"><PendingNote>{t({ pt: 'Conteúdo da brochura institucional. As referências a certificação, marcação oficial e emissão de certificados descrevem o âmbito institucional do serviço e estão sujeitas a validação regulamentar antes da publicação definitiva. O portal não emite certificados nem documentos oficiais.', en: 'Content from the corporate brochure. References to certification, official hallmarking and the issue of certificates describe the institutional scope of the service and are subject to regulatory validation before final publication. The portal does not issue certificates or official documents.' })}</PendingNote></Reveal>}
            <Reveal delay={0.1} className="flex flex-wrap gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <ButtonLink to={`${path('contact')}?assunto=servicos`}>{t({ pt: 'Fale connosco', en: 'Talk to us' })}</ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>
      <RelatedLinks />
    </>
  )
}
