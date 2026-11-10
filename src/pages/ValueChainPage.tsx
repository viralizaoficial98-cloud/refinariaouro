import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/blocks/PageHero'
import { RelatedLinks } from '../components/blocks/RelatedLinks'
import { MediaRow } from '../components/blocks/MediaRow'
import { CapacityShowcase } from '../components/home/CapacitySection'
import { Picture } from '../components/ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../components/ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../components/ui/Typography'
import { useContent } from '../content/ContentContext'
import { path, routes } from '../content/routes'
import { useLang } from '../i18n/LanguageContext'
import { Seo } from '../seo/Seo'

/** Cadeia de Valor Integrada e Capacidade de Refinação (brochura, p. 1, 2 e 4). */
export default function ValueChainPage() {
  const { t } = useLang()
  const { content } = useContent()
  const b = content.brochure
  const vc = b.valueChain
  const r = routes.valueChain
  const featured = content.services.filter((s) => s.featured)
  return (
    <>
      <Seo title={t(r.title)} description={t(r.description)} image="brochure-precious-metals" />
      <PageHero eyebrow={t(vc.title)} title={t(b.slogan)} intro={t(vc.intro)} image="brochure-precious-metals" crumbs={[{ label: t(r.title) }]} />

      <section className="bg-ivory py-20 sm:py-28 lg:py-36" aria-labelledby="presentation-t">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>{t({ pt: 'Apresentação institucional', en: 'Corporate profile' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="presentation-t" className="mt-8 !text-4xl sm:!text-5xl">{t({ pt: 'A primeira unidade do género no país.', en: 'The first facility of its kind in the country.' })}</Heading></Reveal>
            <Reveal delay={0.15} className="relative mt-12 hidden aspect-[2/3] max-w-sm overflow-hidden lg:block">
              <Picture id="brochure-cover-refinery" alt={t({ pt: 'Técnicos numa linha de fundição de barras de ouro', en: 'Technicians on a gold-bar casting line' })} sizes="30vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux hover:scale-[1.04]" />
              <IllustrativeTag id="brochure-cover-refinery" className="absolute bottom-4 right-4" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {b.presentation.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.06}>
                <p className={`text-lg leading-relaxed text-charcoal-700 ${i ? 'mt-7' : 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold-deep'}`}>{t(p)}</p>
              </Reveal>
            ))}
            <Reveal delay={0.4} className="mt-12 border-t border-gold/40 pt-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t({ pt: 'Valorização dos recursos minerais angolanos', en: 'Adding value to Angola’s mineral resources' })}</p>
              <ul className="mt-6 grid gap-3 text-charcoal-700 sm:grid-cols-2">
                {[
                  { pt: 'Desenvolvimento da cadeia de valor nacional', en: 'Development of the national value chain' },
                  { pt: 'Transformação e comercialização de metais preciosos', en: 'Processing and marketing of precious metals' },
                  { pt: 'Redução da dependência de refinação no exterior', en: 'Reduced dependence on refining abroad' },
                  { pt: 'Fortalecimento da indústria nacional', en: 'A stronger national industry' },
                ].map((x, i) => <li key={i} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-gold" />{t(x)}</li>)}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="etapas" className="scroll-mt-24 bg-forest-900 py-20 text-ivory sm:py-28 lg:py-36" aria-labelledby="steps-t">
        <Container>
          <Reveal><Eyebrow light>{t({ pt: 'Quatro etapas', en: 'Four stages' })}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="steps-t" light className="mt-8">{t(vc.title)}</Heading></Reveal>
          <motion.ol variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vc.steps.map((s, i) => (
              <motion.li key={s.id} id={`etapa-${s.id}`} variants={staggerChild} className="group">
                <div className="relative aspect-square overflow-hidden bg-charcoal">
                  <Picture id={s.image} alt={t(s.title)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-transparent" />
                  <span className="absolute bottom-5 left-5 font-display text-5xl text-gold-light">{String(i + 1).padStart(2, '0')}</span>
                  <IllustrativeTag id={s.image} className="absolute right-4 top-4" />
                </div>
                <h3 className="mt-6 font-display text-3xl">{t(s.title)}</h3>
                <span aria-hidden className="mt-4 block h-px w-10 bg-gold transition-all duration-700 ease-lux group-hover:w-20" />
                <p className="mt-4 leading-relaxed text-ivory/70">{t(s.text)}</p>
              </motion.li>
            ))}
          </motion.ol>
          <div className="mt-20 grid gap-12 border-t border-ivory/10 pt-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{t({ pt: 'Metais contemplados', en: 'Metals covered' })}</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {vc.metals.map((m, i) => <li key={i} className={`border px-5 py-3 font-display text-2xl ${i === 0 ? 'border-gold bg-gold text-charcoal' : 'border-ivory/30 text-ivory'}`}>{t(m)}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{t({ pt: 'Objectivo', en: 'Objective' })}</p>
              <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{t(vc.objective)}</p>
              <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-light">{t(b.tagline)}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="capacidade" className="relative scroll-mt-24 overflow-hidden bg-charcoal py-20 text-ivory sm:py-28 lg:py-36" aria-labelledby="capacity-page-title">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,175,55,0.16),transparent_60%)]" />
        <div className="relative"><CapacityShowcase capacity={b.capacity} headingId="capacity-page-title" showLink={false} /></div>
      </section>

      <MediaRow id="servicos" eyebrow={{ pt: 'Nossos Serviços', en: 'Our Services' }} title={{ pt: 'Da amostra à barra de ouro e prata.', en: 'From sample to gold and silver bar.' }} text={b.servicesNote} image="brochure-gold-pour" imagePosition="70% 85%" tone="white">
        <ul className="mt-8">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.id} delay={0.2 + i * 0.05} className="border-t border-ivory-300 last:border-b">
              <Link to={`${path('services')}#${s.id}`} className="group flex items-baseline gap-5 py-5">
                <span className="font-display text-xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1">{t(s.title)}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-8">
          <ButtonLink to={path('technologies')} variant="outline">{t({ pt: 'Tecnologias de Refinação', en: 'Refining Technologies' })}</ButtonLink>
          <ButtonLink to={path('contrastaria')} variant="ghost">{t({ pt: 'Contrastaria', en: 'Assay Office' })}</ButtonLink>
        </Reveal>
      </MediaRow>
      <RelatedLinks />
    </>
  )
}
