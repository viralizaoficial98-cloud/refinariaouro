import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

/** «Nossos Serviços» — os três serviços principais da brochura institucional (p. 4). */
export function ServicesSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  const featured = content.services.filter((s) => s.featured)
  const list = featured.length ? featured : content.services.slice(0, 3)
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="services-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t({ pt: 'Nossos Serviços', en: 'Our Services' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="services-title" className="mt-8">{t({ pt: 'Competências ao serviço do valor do ouro.', en: 'Expertise in service of gold’s value.' })}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-charcoal-700">{t(content.brochure.servicesNote)}</p>
          </Reveal>
        </div>

        <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-24 lg:gap-8">
          {list.map((s, i) => (
            <motion.li key={s.id} variants={staggerChild}>
              <Link to={`${path('services')}#${s.id}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <Picture id={s.image} alt={t(s.title)} sizes="(min-width: 768px) 33vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.07]" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
                  <IllustrativeTag id={s.image} className="absolute bottom-3 right-3" />
                  {s.status === 'a-confirmar' && <span className="absolute left-3 top-3 bg-charcoal/60 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ivory/85 backdrop-blur">{u('pending')}</span>}
                </div>
                <div className="flex items-baseline gap-4 pt-7">
                  <span className="font-display text-4xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-[1.7rem] leading-tight text-forest sm:text-3xl">{t(s.title)}</h3>
                </div>
                <span aria-hidden className="mt-5 block h-px w-10 bg-gold transition-all duration-700 ease-lux group-hover:w-24" />
                <p className="mt-5 leading-relaxed text-charcoal-700">{t(s.summary)}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-forest">{u('learnMore')}<span aria-hidden className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal className="mt-16 flex flex-wrap items-center gap-8"><ButtonLink to={path('services')} variant="outline">{u('allServices')}</ButtonLink></Reveal>
      </Container>
    </section>
  )
}
