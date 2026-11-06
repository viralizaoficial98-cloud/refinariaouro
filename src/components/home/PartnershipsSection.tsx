import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, IllustrativeTag } from '../ui/Typography'

export function PartnershipsSection() {
  const { t } = useLang()
  const c = homeText.partnerships
  const { ref, y } = useParallax<HTMLElement>(80)
  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="partners-title">
      <motion.div aria-hidden style={{ y }} className="absolute -inset-y-24 inset-x-0">
        <Picture id="hero-bars-macro" alt="" sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-900/95 via-forest-900/80 to-charcoal/40" />
      <Container className="relative py-28 sm:py-36 lg:py-48">
        <div className="max-w-3xl">
          <Reveal><Eyebrow light>{t(c.eyebrow)}</Eyebrow></Reveal>
          <Reveal delay={0.1}><h2 id="partners-title" className="mt-8 font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">{t(c.title)}</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">{t(c.text)}</p></Reveal>
          <Reveal delay={0.3} className="mt-12 flex flex-wrap gap-5">
            <ButtonLink to={path('partners')}>{t({ pt: 'Parceiros e Investidores', en: 'Partners and Investors' })}</ButtonLink>
            <ButtonLink to={path('careers')} variant="outlineLight">{t({ pt: 'Carreiras', en: 'Careers' })}</ButtonLink>
          </Reveal>
        </div>
        <IllustrativeTag className="absolute bottom-5 right-5 sm:right-8 lg:right-12" />
      </Container>
    </section>
  )
}
