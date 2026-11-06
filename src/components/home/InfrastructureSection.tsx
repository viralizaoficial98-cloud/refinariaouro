import { motion } from 'framer-motion'
import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag, PendingNote } from '../ui/Typography'

export function InfrastructureSection() {
  const { t } = useLang()
  const c = homeText.infrastructure
  const big = useParallax<HTMLDivElement>(60)
  const small = useParallax<HTMLDivElement>(-50)
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32 lg:py-44" aria-labelledby="infra-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal><Eyebrow light>{t(c.eyebrow)}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="infra-title" light className="mt-8">{t(c.title)}</Heading></Reveal>
          </div>
        </div>
        <div className="relative mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12">
          <div ref={big.ref} className="relative lg:col-span-8">
            <MaskReveal className="relative aspect-[16/10] overflow-hidden">
              <motion.div style={{ y: big.y }} className="absolute -inset-y-16 inset-x-0">
                <Picture id="hero-refining-hall" alt={t({ pt: 'Nave industrial de refinação', en: 'Industrial refining hall' })} sizes="(min-width: 1024px) 66vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
              </motion.div>
              <IllustrativeTag className="absolute bottom-4 right-4" />
            </MaskReveal>
          </div>
          <div ref={small.ref} className="relative lg:col-span-4">
            <motion.div style={{ y: small.y }} className="lg:mt-40">
              <MaskReveal className="relative aspect-[3/4] overflow-hidden">
                <Picture id="induction-melting" alt={t({ pt: 'Fusão de metal em forno de indução', en: 'Metal melting in an induction furnace' })} sizes="(min-width: 1024px) 33vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                <IllustrativeTag className="absolute bottom-4 right-4" />
              </MaskReveal>
            </motion.div>
          </div>
          {/* Texto em camadas sobre a fotografia */}
          <Reveal delay={0.2} className="relative z-10 bg-forest p-8 sm:p-12 lg:absolute lg:-bottom-16 lg:left-[38%] lg:w-[34rem]">
            <ul className="space-y-8">
              {c.layers.map((l, i) => (
                <li key={i} className="grid grid-cols-[6.5rem_1fr] gap-4">
                  <span className="pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-light">{t(l.label)}</span>
                  <p className="leading-relaxed text-ivory/80">{t(l.text)}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-8 lg:mt-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><PendingNote light>{t(c.note)}</PendingNote></Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:text-right"><ButtonLink to={path('infrastructure')} variant="outlineLight">{t({ pt: 'Explorar a infraestrutura', en: 'Explore the infrastructure' })}</ButtonLink></Reveal>
        </div>
      </Container>
    </section>
  )
}
