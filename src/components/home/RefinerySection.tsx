import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading } from '../ui/Typography'

export function RefinerySection() {
  const { t } = useLang()
  const c = homeText.refinery
  return (
    <section className="relative bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="refinery-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t(c.eyebrow)}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="refinery-title" className="mt-8">{t(c.title)}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-charcoal-700">{t(c.contribution)}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px bg-ivory-300 lg:mt-28 lg:grid-cols-2">
          {[{ label: { pt: 'Visão', en: 'Vision' }, text: c.vision }, { label: { pt: 'Missão', en: 'Mission' }, text: c.mission }].map((b, i) => (
            <Reveal key={i} delay={i * 0.12} className="group relative bg-white p-8 sm:p-12 lg:p-16">
              <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-lux group-hover:w-full" />
              <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t(b.label)}</p>
              <p className="mt-6 font-display text-2xl leading-snug text-forest sm:text-3xl">{t(b.text)}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal><p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-charcoal-500">{t({ pt: 'Valores', en: 'Values' })}</p></Reveal>
          <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mt-8 grid grid-cols-2 border-t border-ivory-300 sm:grid-cols-3 lg:grid-cols-6">
            {c.values.map((v, i) => (
              <motion.li key={i} variants={staggerChild} className="group border-b border-ivory-300 py-8 pr-4 transition-colors duration-500 sm:border-r sm:px-6 sm:first:pl-0 [&:nth-child(6)]:border-r-0">
                <span className="block text-xs font-semibold text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-3 block font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1 lg:text-[1.7rem]">{t(v)}</span>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal className="mt-14 flex flex-wrap gap-8">
            <ButtonLink to={path('mission')} variant="ghost">{t({ pt: 'Missão, Visão e Valores', en: 'Mission, Vision and Values' })}</ButtonLink>
            <ButtonLink to={path('governance')} variant="ghost">{t({ pt: 'Governança', en: 'Governance' })}</ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
