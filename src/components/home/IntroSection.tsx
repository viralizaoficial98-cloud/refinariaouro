import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

export function IntroSection() {
  const { t, u } = useLang()
  const { ref, y } = useParallax<HTMLDivElement>(50)
  const c = homeText.intro
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-44" aria-labelledby="intro-title">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>{t(c.eyebrow)}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="intro-title" className="mt-8">{t(c.title)}</Heading></Reveal>
          {c.body.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}>
              <p className={`mt-7 text-lg leading-relaxed text-charcoal-700 ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold-deep' : ''}`}>{t(p)}</p>
            </Reveal>
          ))}
          <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-8">
            <ButtonLink to={path('about')} variant="outline">{t({ pt: 'Sobre Nós', en: 'About Us' })}</ButtonLink>
            <ButtonLink to={path('mission')} variant="ghost">{t({ pt: 'Missão e Valores', en: 'Mission and Values' })}</ButtonLink>
          </Reveal>
        </div>
        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <MaskReveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
              <Picture id="bullion-stack" alt={t({ pt: 'Barras de ouro empilhadas', en: 'Stacked gold bars' })} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
            </motion.div>
            <IllustrativeTag className="absolute bottom-4 right-4" />
          </MaskReveal>
          <Reveal delay={0.3} className="absolute -bottom-10 -left-4 hidden max-w-[17rem] bg-forest p-8 text-ivory shadow-2xl sm:block lg:-left-16">
            <p className="font-display text-3xl leading-tight">{t({ pt: 'Rigor. Rastreabilidade. Responsabilidade.', en: 'Rigour. Traceability. Responsibility.' })}</p>
            <span aria-hidden className="mt-6 block h-px w-12 bg-gold" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold-light">{u('discover')}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
