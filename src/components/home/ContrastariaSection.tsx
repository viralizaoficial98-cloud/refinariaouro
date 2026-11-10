import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag, PendingNote } from '../ui/Typography'

/** Contrastaria, certificação e rastreabilidade (brochura, p. 6–7) — resumo para a homepage. */
export function ContrastariaSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  const c = content.brochure.contrastaria
  const trace = c.blocks.find((b) => b.id === 'rastreabilidade')
  const { ref, y } = useParallax<HTMLDivElement>(50)
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="contrastaria-title">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div ref={ref} className="relative order-2 lg:order-1 lg:col-span-5">
          <MaskReveal className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden bg-forest-900 lg:max-w-none">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.35),transparent_65%)]" />
            <motion.div style={{ y }} className="absolute inset-x-10 -inset-y-4 sm:inset-x-16">
              <Picture id="brochure-fine-gold-bar" alt={t({ pt: 'Barra de ouro fino 999,9', en: 'Fine gold bar 999.9' })} sizes="(min-width: 1024px) 40vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]" />
            </motion.div>
            <IllustrativeTag id="brochure-fine-gold-bar" className="absolute bottom-4 right-4" />
          </MaskReveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Reveal><Eyebrow>{t({ pt: 'Contrastaria e Certificação', en: 'Assay Office and Certification' })}</Eyebrow></Reveal>
          <Reveal delay={0.1}><Heading id="contrastaria-title" className="mt-8">{t(c.title)}</Heading></Reveal>
          <Reveal delay={0.15}><p className="mt-8 text-lg leading-relaxed text-charcoal-700">{t(c.intro)}</p></Reveal>
          {trace?.items && (
            <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-10">
              {trace.items.map((it, i) => (
                <motion.li key={i} variants={staggerChild} className="flex gap-4 border-t border-ivory-300 py-4 text-charcoal-700 last:border-b">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-gold" />{t(it)}
                </motion.li>
              ))}
            </motion.ul>
          )}
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {c.blocks.map((b) => (
              <Link key={b.id} to={`${path('contrastaria')}#${b.id}`} className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-forest underline-offset-8 transition-colors hover:text-gold-deep hover:underline">{t(b.title)}</Link>
            ))}
          </Reveal>
          <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-8">
            <ButtonLink to={path('contrastaria')} variant="outline">{u('learnMore')}</ButtonLink>
          </Reveal>
          {c.status !== 'confirmado' && <Reveal delay={0.2}><PendingNote className="mt-10">{t({ pt: 'Serviços e certificações descritos na brochura institucional, sujeitos a validação institucional e regulamentar antes da publicação definitiva.', en: 'Services and certifications described in the corporate brochure, subject to institutional and regulatory validation before final publication.' })}</PendingNote></Reveal>}
        </div>
      </Container>
      <Reveal className="mt-20 border-y border-gold/30 py-8 lg:mt-28">
        <p className="px-5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-deep sm:text-sm">{t(content.brochure.tagline)}</p>
      </Reveal>
    </section>
  )
}
