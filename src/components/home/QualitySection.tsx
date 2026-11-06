import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag, PendingNote } from '../ui/Typography'

export function QualitySection() {
  const { t } = useLang()
  const c = homeText.quality
  const { ref, y } = useParallax<HTMLDivElement>(40)
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="quality-title">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div ref={ref} className="relative lg:col-span-5">
          <MaskReveal direction="left" className="relative aspect-[3/4] overflow-hidden">
            <motion.div style={{ y }} className="absolute -inset-y-12 inset-x-0">
              <Picture id="laboratory-analyst" alt={t({ pt: 'Analista em laboratório', en: 'Analyst in a laboratory' })} sizes="(min-width: 1024px) 40vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
            </motion.div>
            <IllustrativeTag className="absolute bottom-4 right-4" />
          </MaskReveal>
          <MaskReveal className="absolute -bottom-12 -right-4 hidden aspect-square w-1/2 overflow-hidden border-[10px] border-white sm:block lg:-right-16">
            <Picture id="fire-assay-furnace" alt={t({ pt: 'Copelas numa mufla de ensaio', en: 'Cupels in an assay muffle' })} sizes="25vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
          </MaskReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><Eyebrow>{t(c.eyebrow)}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="quality-title" className="mt-8">{t(c.title)}</Heading></Reveal>
          <ol className="mt-14 space-y-0">
            {c.items.map((it, i) => (
              <Reveal as="li" key={i} delay={0.1 + i * 0.08} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ivory-300 py-7 last:border-b">
                <span className="font-display text-2xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-2xl text-forest transition-transform duration-500 ease-lux group-hover:translate-x-1">{t(it.title)}</h3>
                  <p className="mt-2 leading-relaxed text-charcoal-500">{t(it.text)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10"><PendingNote>{t(c.note)}</PendingNote></Reveal>
          <Reveal className="mt-10"><ButtonLink to={path('quality')} variant="ghost">{t({ pt: 'Qualidade e Laboratórios', en: 'Quality and Laboratories' })}</ButtonLink></Reveal>
        </div>
      </Container>
    </section>
  )
}
