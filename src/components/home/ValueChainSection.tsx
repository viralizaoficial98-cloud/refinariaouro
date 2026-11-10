import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

/** Cadeia de Valor Integrada (brochura, p. 2): quatro etapas com fotografias da brochura, metais e objectivo. */
export function ValueChainSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  const vc = content.brochure.valueChain
  return (
    <section className="relative overflow-hidden bg-forest-900 py-24 text-ivory sm:py-32 lg:py-40" aria-labelledby="value-chain-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow light>{t({ pt: 'Valorização dos recursos nacionais', en: 'Adding value to national resources' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="value-chain-title" light className="mt-8">{t(vc.title)}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-ivory/75">{t(vc.intro)}</p>
          </Reveal>
        </div>

        <motion.ol variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {vc.steps.map((s, i) => (
            <motion.li key={s.id} variants={staggerChild} className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal sm:aspect-[4/5]">
                <Picture id={s.image} alt={t(s.title)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent" />
                <span className="absolute left-6 top-6 font-display text-xl text-gold-light">{String(i + 1).padStart(2, '0')}</span>
                {i < vc.steps.length - 1 && <span aria-hidden className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-gold lg:block" />}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl text-ivory">{t(s.title)}</h3>
                  <span aria-hidden className="mt-4 block h-px w-10 bg-gold transition-all duration-700 ease-lux group-hover:w-20" />
                </div>
                <IllustrativeTag id={s.image} className="absolute right-4 top-6" />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ivory/70">{t(s.text)}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="mt-20 grid gap-12 border-t border-ivory/10 pt-14 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{t({ pt: 'Metais contemplados', en: 'Metals covered' })}</p></Reveal>
            <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }} className="mt-6">
              {vc.metals.map((m, i) => (
                <motion.li key={i} variants={staggerChild} className="group flex items-baseline gap-5 border-b border-ivory/10 py-4">
                  <span className={`h-2.5 w-2.5 shrink-0 rotate-45 ${i === 0 ? 'bg-gold' : i === 1 ? 'bg-ivory/80' : 'border border-gold-light'}`} aria-hidden />
                  <span className={`font-display text-3xl transition-transform duration-500 ease-lux group-hover:translate-x-1 ${i === 0 ? 'text-gold-light' : 'text-ivory'}`}>{t(m)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{t({ pt: 'Objectivo', en: 'Objective' })}</p>
            <p className="mt-6 font-display text-2xl leading-snug text-ivory sm:text-3xl">{t(vc.objective)}</p>
            <div className="mt-10 flex flex-wrap gap-8">
              <ButtonLink to={path('valueChain')}>{u('learnMore')}</ButtonLink>
              <Link to={`${path('valueChain')}#capacidade`} className="self-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-light underline-offset-8 hover:underline">{t({ pt: 'Capacidade de refinação', en: 'Refining capacity' })} →</Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
