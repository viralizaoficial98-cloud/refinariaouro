import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

/** Resumo das técnicas de refinação (brochura, p. 5) com ligação à página de detalhe. */
export function TechnologiesSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  const tech = content.brochure.techniques
  const { ref, y } = useParallax<HTMLDivElement>(40)
  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="tech-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>{t({ pt: 'Técnicas de Refinação', en: 'Refining Techniques' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="tech-title" className="mt-8">{t({ pt: 'Dois sistemas complementares. Um padrão de pureza.', en: 'Two complementary systems. One standard of purity.' })}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-charcoal-700">{t(tech.intro)}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2">
          {tech.items.map((it, i) => (
            <Reveal key={it.id} delay={i * 0.12}>
              <Link to={`${path('technologies')}#${it.id}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
                  <Picture id={it.image} alt={t(it.title)} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.05]" />
                  <IllustrativeTag id={it.image} className="absolute bottom-4 right-4" />
                </div>
                <div className="flex items-start gap-6 border-b border-ivory-300 py-8">
                  <span className="font-display text-2xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-forest sm:text-4xl">{t(it.title)}</h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-charcoal-700">{t(it.benefits[0])}</p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-forest">{u('learnMore')}<span aria-hidden className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden bg-forest-900 text-ivory lg:mt-28">
          <div className="grid items-center lg:grid-cols-12">
            <div className="relative z-10 p-8 sm:p-12 lg:col-span-6 lg:p-16">
              <Reveal><p className="font-display text-5xl text-gold-light sm:text-6xl">{t(tech.fineGold.title)}</p></Reveal>
              <Reveal delay={0.1}><p className="mt-6 text-lg leading-relaxed text-ivory/75">{t(tech.fineGold.text)}</p></Reveal>
              <Reveal delay={0.2} className="mt-10"><ButtonLink to={path('technologies')}>{t({ pt: 'Tecnologias de Refinação', en: 'Refining Technologies' })}</ButtonLink></Reveal>
            </div>
            <div ref={ref} className="relative h-72 sm:h-96 lg:col-span-6 lg:h-full lg:min-h-[30rem]">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_55%_55%,rgba(212,175,55,0.28),transparent_62%)]" />
              <MaskReveal className="absolute inset-0">
                <motion.div style={{ y }} className="absolute inset-6 lg:inset-12">
                  <Picture id={tech.fineGold.image} alt={t({ pt: 'Barras de ouro fino', en: 'Fine gold bars' })} sizes="(min-width: 1024px) 45vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]" />
                </motion.div>
              </MaskReveal>
              <IllustrativeTag id={tech.fineGold.image} className="absolute bottom-4 right-4" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
