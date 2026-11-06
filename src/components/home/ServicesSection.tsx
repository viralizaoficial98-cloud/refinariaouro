import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, PendingNote } from '../ui/Typography'

export function ServicesSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="services-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t({ pt: 'Serviços e Soluções', en: 'Services and Solutions' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="services-title" className="mt-8">{t({ pt: 'Competências ao serviço do valor do ouro.', en: 'Expertise in service of gold’s value.' })}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <PendingNote>{t({ pt: 'Áreas de competência previstas. A disponibilização efectiva de cada serviço está sujeita a confirmação institucional.', en: 'Planned areas of expertise. The effective provision of each service is subject to institutional confirmation.' })}</PendingNote>
          </Reveal>
        </div>

        <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {content.services.map((s, i) => (
            <motion.li key={s.id} variants={staggerChild}>
              <Link to={`${path('services')}#${s.id}`} className="group relative block aspect-[4/5] overflow-hidden bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
                <Picture id={s.image} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/5 transition-opacity duration-700 group-hover:from-forest-900" />
                <div className="absolute inset-0 flex flex-col justify-between p-7 text-ivory sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-xl text-gold-light">{String(i + 1).padStart(2, '0')}</span>
                    {s.status === 'a-confirmar' && <span className="border border-ivory/30 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ivory/75">{u('pending')}</span>}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl leading-tight sm:text-[2.1rem]">{t(s.title)}</h3>
                    <p className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-700 ease-lux group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">{t(s.summary)}</p>
                    <span aria-hidden className="mt-6 block h-px w-10 bg-gold transition-all duration-700 ease-lux group-hover:w-24" />
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal className="mt-14"><ButtonLink to={path('services')} variant="outline">{u('allServices')}</ButtonLink></Reveal>
      </Container>
    </section>
  )
}
