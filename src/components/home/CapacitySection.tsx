import { motion } from 'framer-motion'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import type { BrochureContent } from '../../content/brochure'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, PendingNote } from '../ui/Typography'

/** Bloco reutilizável do indicador de capacidade (homepage e página Cadeia de Valor). */
export function CapacityShowcase({ capacity, headingId, showLink = true }: { capacity: BrochureContent['capacity']; headingId: string; showLink?: boolean }) {
  const { t, u } = useLang()
  return (
    <Container>
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow light>{t({ pt: 'Capacidade da Refinaria', en: 'Refinery Capacity' })}</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 id={headingId} className="mt-10 font-display leading-[0.85] text-gold-light">
              <span className="block text-[6.5rem] font-medium tracking-[-0.03em] sm:text-[9rem] lg:text-[11rem]">{capacity.value}<span className="ml-3 align-top text-[0.32em] tracking-normal">kg</span></span>
              <span className="mt-4 block text-3xl text-ivory sm:text-4xl">{t({ pt: 'de ouro por dia', en: 'of gold per day' })}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}><p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/75">{t(capacity.intro)}</p></Reveal>
        </div>
        <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="grid grid-cols-3 items-end gap-3 sm:gap-6 lg:col-span-7">
          {capacity.scales.map((s, i) => (
            <motion.li key={i} variants={staggerChild} className="group text-center">
              <div className="relative flex items-end justify-center" style={{ height: `${6 + i * 2.5}rem` }}>
                <span aria-hidden className="absolute inset-x-4 bottom-0 h-6 rounded-[50%] bg-gold/25 blur-xl transition-opacity duration-700 group-hover:opacity-100 sm:opacity-60" />
                <Picture id={s.image} alt={t(s.label)} sizes="(min-width: 1024px) 20vw, 33vw" className="relative block h-full w-full" imgClassName="h-full w-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-lux group-hover:-translate-y-1.5 group-hover:scale-[1.04]" />
              </div>
              <p className="mt-6 border-t border-gold/40 pt-4 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory/80 sm:text-[0.68rem]">{t(s.label)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="mt-16 grid gap-10 border-t border-ivory/10 pt-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7"><p className="font-display text-2xl leading-snug text-ivory sm:text-3xl">{t(capacity.impact)}</p></Reveal>
        <Reveal delay={0.1} className="space-y-8 lg:col-span-4 lg:col-start-9">
          {capacity.status !== 'confirmado' && <PendingNote light>{t({ pt: 'Indicador declarado na brochura institucional, sujeito a confirmação da sua actualidade antes da publicação definitiva.', en: 'Figure stated in the corporate brochure, subject to confirmation that it is current before final publication.' })}</PendingNote>}
          {showLink && <ButtonLink to={`${path('valueChain')}#capacidade`} variant="outlineLight">{u('learnMore')}</ButtonLink>}
        </Reveal>
      </div>
    </Container>
  )
}

export function CapacitySection() {
  const { content } = useContent()
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 lg:py-40" aria-labelledby="capacity-title">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,175,55,0.16),transparent_60%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(7,91,33,0.45),transparent_55%)]" />
      <div className="relative"><CapacityShowcase capacity={content.brochure.capacity} headingId="capacity-title" /></div>
    </section>
  )
}
