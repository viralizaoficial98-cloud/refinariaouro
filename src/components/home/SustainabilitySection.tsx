import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

export function SustainabilitySection() {
  const { t } = useLang()
  const c = homeText.sustainability
  const { ref, y } = useParallax<HTMLElement>(90)
  return (
    <section ref={ref} className="relative overflow-hidden bg-forest text-ivory" aria-labelledby="sust-title">
      <motion.div aria-hidden style={{ y }} className="absolute -inset-y-28 inset-x-0 opacity-30">
        <Picture id="luanda-bay" alt="" sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-forest via-forest/85 to-forest-900" />
      <Container className="relative py-24 sm:py-32 lg:py-44">
        <div className="max-w-3xl">
          <Reveal><Eyebrow light>{t(c.eyebrow)}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="sust-title" light className="mt-8">{t(c.title)}</Heading></Reveal>
        </div>
        <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mt-20 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
          {c.items.map((it, i) => (
            <motion.li key={i} variants={staggerChild} className="group relative bg-forest/95 p-8 transition-colors duration-700 hover:bg-forest-700 lg:min-h-[19rem]">
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-hover:scale-x-100" />
              <span className="text-xs font-semibold text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 font-display text-3xl">{t(it.title)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">{t(it.text)}</p>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            <ButtonLink to={path('sustainability')} variant="outlineLight">{t({ pt: 'Sustentabilidade e ESG', en: 'Sustainability and ESG' })}</ButtonLink>
            <ButtonLink to={path('hse')} variant="outlineLight">{t({ pt: 'Saúde, Segurança e Ambiente', en: 'Health, Safety and Environment' })}</ButtonLink>
          </div>
          <p className="text-xs text-ivory/50">{t({ pt: 'Textos institucionais sujeitos a aprovação.', en: 'Institutional texts subject to approval.' })}</p>
        </Reveal>
        <IllustrativeTag className="absolute bottom-4 right-5 sm:right-8 lg:right-12" />
      </Container>
    </section>
  )
}
