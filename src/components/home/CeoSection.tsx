import { motion } from 'framer-motion'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow } from '../ui/Typography'

/** Apresentação do CEO (Liderança Executiva) — primeira secção após o slideshow. */
export function CeoSection() {
  const { t } = useLang()
  const { content } = useContent()
  const c = content.leadership
  const { ref, y } = useParallax<HTMLDivElement>(24)
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="ceo-title">
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[38%] bg-forest-900 lg:block" />
      <div aria-hidden className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Fotografia */}
        <div ref={ref} className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative">
            <span aria-hidden className="absolute -right-4 -top-4 hidden h-full w-full border border-gold/60 sm:block lg:-right-6 lg:-top-6" />
            <MaskReveal className="group relative aspect-[4/5] overflow-hidden bg-white shadow-[0_40px_80px_-30px_rgba(3,39,15,0.55)]">
              <motion.div style={{ y }} className="absolute -inset-y-6 inset-x-0">
                <Picture
                  id={c.image}
                  alt={`${c.name}, ${t(c.role)}`}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.035]"
                />
              </motion.div>
            </MaskReveal>
            <Reveal delay={0.4} className="absolute -bottom-6 left-6 right-6 bg-forest px-6 py-5 text-ivory shadow-xl sm:left-auto sm:right-8 sm:max-w-[18rem]">
              <p className="font-display text-2xl leading-tight">{c.name}</p>
              <span aria-hidden className="mt-3 block h-px w-10 bg-gold" />
              <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold-light">{t(c.role)}</p>
            </Reveal>
          </div>
        </div>

        {/* Texto */}
        <div className="pt-6 lg:col-span-6 lg:col-start-7 lg:pt-0">
          <Reveal><Eyebrow>{t({ pt: 'Direcção Executiva', en: 'Executive Management' })}</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 id="ceo-title" className="mt-8 font-display text-4xl font-medium leading-[1.08] text-forest text-balance sm:text-5xl lg:text-[3.3rem]">{t(c.headline)}</h2>
          </Reveal>
          <Reveal delay={0.16}><p className="mt-8 font-display text-3xl leading-tight text-gold-deep sm:text-4xl">{c.name}</p></Reveal>
          <Reveal delay={0.2}><p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-charcoal-500">{t(c.role)}</p></Reveal>
          <Reveal delay={0.22}><span aria-hidden className="mt-8 block h-px w-16 bg-gold" /></Reveal>
          <div className="mt-8 space-y-5">
            {c.bio.slice(0, 3).map((p, i) => (
              <Reveal key={i} delay={0.24 + i * 0.08}>
                <p className={`leading-relaxed text-charcoal-700 ${i === 0 ? 'text-lg sm:text-xl' : 'text-base'}`}>{t(p)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.5} className="mt-12 flex flex-wrap items-center gap-8">
            <ButtonLink to={path('ceo')}>{t({ pt: 'Conhecer o CEO', en: 'Meet the CEO' })}</ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
