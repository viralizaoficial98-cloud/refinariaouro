import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { processSteps } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag } from '../ui/Typography'

/** Storytelling fotográfico vertical: imagem fixa que muda conforme a etapa activa. */
export function ProcessStory({ showHeader = true, showLink = true }: { showHeader?: boolean; showLink?: boolean }) {
  const { t, u } = useLang()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index)) }),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const step = processSteps[active]

  return (
    <section className="relative bg-forest-900 text-ivory" aria-labelledby="process-title">
      {showHeader && (
        <Container className="pb-10 pt-24 sm:pt-32 lg:pb-16 lg:pt-40">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal><Eyebrow light>{t({ pt: 'O Processo de Refinação', en: 'The Refining Process' })}</Eyebrow></Reveal>
              <Reveal delay={0.1}><Heading id="process-title" light className="mt-8">{t({ pt: 'Oito etapas. Um único princípio: rastreabilidade total.', en: 'Eight stages. One principle: full traceability.' })}</Heading></Reveal>
            </div>
            <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-ivory/70">{t({ pt: 'Do momento em que o material chega até à saída do lingote final, cada operação é controlada, registada e verificável.', en: 'From the moment material arrives until the final bar leaves, every operation is controlled, recorded and verifiable.' })}</p>
            </Reveal>
          </div>
        </Container>
      )}
      {!showHeader && <h2 id="process-title" className="sr-only">{t({ pt: 'Etapas do processo', en: 'Process stages' })}</h2>}

      <Container className="pb-24 sm:pb-32 lg:pb-40">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Imagem fixa (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step.id}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, clipPath: 'inset(0% 0% 100% 0%)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Picture id={step.image} alt={t(step.title)} sizes="50vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-8">
                <p className="font-display text-[7rem] leading-none text-gold/90">{String(active + 1).padStart(2, '0')}</p>
                <IllustrativeTag />
              </div>
              <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-ivory/10">
                <motion.div className="w-full bg-gold" animate={{ height: `${((active + 1) / processSteps.length) * 100}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
              </div>
            </div>
          </div>

          {/* Etapas */}
          <ol className="lg:col-span-5 lg:col-start-8">
            {processSteps.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                ref={(el) => { refs.current[i] = el }}
                data-index={i}
                className="scroll-mt-28 border-t border-ivory/10 py-12 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-16"
              >
                <div className="relative mb-8 aspect-[16/10] overflow-hidden lg:hidden">
                  <Picture id={s.image} alt={t(s.title)} sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                  <IllustrativeTag className="absolute bottom-3 right-3" />
                </div>
                <p className={`text-[0.68rem] font-semibold uppercase tracking-eyebrow transition-colors duration-500 ${active === i ? 'text-gold' : 'text-ivory/40'}`}>
                  {u('step')} {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className={`mt-4 font-display text-4xl leading-tight transition-colors duration-700 sm:text-5xl ${active === i ? 'text-ivory' : 'text-ivory/40 lg:text-ivory/35'}`}>{t(s.title)}</h3>
                <p className={`mt-5 max-w-lg text-lg leading-relaxed transition-colors duration-700 ${active === i ? 'text-ivory/80' : 'text-ivory/50 lg:text-ivory/30'}`}>{t(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
        {showLink && (
          <Reveal className="mt-8 flex lg:justify-end">
            <ButtonLink to={path('process')} variant="outlineLight">{u('learnProcess')}</ButtonLink>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
