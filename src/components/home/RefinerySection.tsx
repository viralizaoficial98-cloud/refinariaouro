import { motion } from 'framer-motion'
import { useContent } from '../../content/ContentContext'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

/** Missão, Visão e Valores — conteúdo da brochura institucional (p. 3). */
export function RefinerySection() {
  const { t } = useLang()
  const { content } = useContent()
  const c = homeText.refinery
  const b = content.brochure
  const { ref, y } = useParallax<HTMLDivElement>(40)
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
          {[{ label: { pt: 'Missão', en: 'Mission' }, text: b.mission }, { label: { pt: 'Visão', en: 'Vision' }, text: [b.vision] }].map((blk, i) => (
            <Reveal key={i} delay={i * 0.12} className="group relative bg-white p-8 sm:p-12 lg:p-16">
              <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-lux group-hover:w-full" />
              <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t(blk.label)}</p>
              <p className="mt-6 font-display text-2xl leading-snug text-forest sm:text-3xl">{t(blk.text[0])}</p>
              {blk.text.slice(1).map((p, j) => <p key={j} className="mt-5 text-lg leading-relaxed text-charcoal-700">{t(p)}</p>)}
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div ref={ref} className="relative lg:col-span-4">
            <MaskReveal className="relative aspect-[4/5] overflow-hidden bg-ivory lg:sticky lg:top-28">
              <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
                <Picture id="brochure-laboratory-professional" alt={t({ pt: 'Profissional de bata no laboratório da Refinaria', en: 'Professional in a lab coat at the Refinery laboratory' })} sizes="(min-width: 1024px) 33vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover object-[30%_75%] transition-transform duration-[1400ms] ease-lux hover:scale-[1.03]" />
              </motion.div>
              <IllustrativeTag id="brochure-laboratory-professional" light={false} className="absolute bottom-4 left-4" />
            </MaskReveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal><p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-charcoal-500">{t({ pt: 'Os nossos valores', en: 'Our values' })}</p></Reveal>
            <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} className="mt-8 grid border-t border-ivory-300 sm:grid-cols-2 lg:grid-cols-3">
              {b.values.map((v, i) => (
                <motion.li key={i} variants={staggerChild} className="group relative border-b border-ivory-300 py-8 pr-6 sm:px-6 sm:[&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pl-6 lg:[&:nth-child(3n+1)]:pl-0">
                  <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-lux group-hover:w-full" />
                  <span className="block text-xs font-semibold text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-3 block font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1 lg:text-[1.7rem]">{t(v.title)}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-charcoal-500">{t(v.text)}</span>
                </motion.li>
              ))}
            </motion.ul>
            <Reveal className="mt-14 flex flex-wrap gap-8">
              <ButtonLink to={path('mission')} variant="ghost">{t({ pt: 'Missão, Visão e Valores', en: 'Mission, Vision and Values' })}</ButtonLink>
              <ButtonLink to={path('governance')} variant="ghost">{t({ pt: 'Governança', en: 'Governance' })}</ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
