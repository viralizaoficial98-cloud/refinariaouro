import { AnimatePresence, motion, useMotionValue, useReducedMotion, type MotionValue } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../content/ContentContext'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'

const DURATION = 6500
const FADE = 1.6
const ease = [0.22, 1, 0.36, 1] as const

function Indicator({ active, progress, label, onClick, index }: { active: boolean; progress: MotionValue<number>; label: string; onClick: () => void; index: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'true' : undefined}
      className="group flex w-full flex-col items-start gap-3 py-3 text-left focus-visible:outline-none"
    >
      <span className={`text-[0.65rem] font-semibold tracking-[0.24em] transition-colors duration-500 ${active ? 'text-gold-light' : 'text-ivory/50 group-hover:text-ivory/80'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="relative block h-px w-full bg-ivory/25 group-focus-visible:bg-gold">
        <motion.span className="absolute inset-0 origin-left bg-gold" style={{ scaleX: active ? progress : 0 }} />
      </span>
    </button>
  )
}

export function HeroSlider() {
  const { content } = useContent()
  const { t, u } = useLang()
  const slides = content.slides
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [inView, setInView] = useState(true)
  const progress = useMotionValue(0)
  const ref = useRef<HTMLElement>(null)
  const count = slides.length
  const paused = userPaused || hovered || hidden || !inView || !!reduce

  const go = useCallback((i: number) => {
    progress.set(0)
    setIndex(((i % count) + count) % count)
  }, [count, progress])

  // Temporizador baseado em rAF: respeita pausas sem perder o progresso.
  useEffect(() => {
    if (paused || count < 2) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / DURATION
      last = now
      if (next >= 1) { go(index + 1); return }
      progress.set(next)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused, index, go, progress, count])

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => { document.removeEventListener('visibilitychange', onVis); io.disconnect() }
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
  }

  const slide = slides[index]
  if (!slide) return null
  const words = t(slide.title).split(' ')

  return (
    <motion.section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={t({ pt: 'Destaques', en: 'Highlights' })}
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory"
      style={{ touchAction: 'pan-y' }}
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onPanEnd={(_, info) => {
        if (Math.abs(info.offset.x) < 50 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
        go(info.offset.x < 0 ? index + 1 : index - 1)
      }}
    >
      {/* Camadas fotográficas */}
      {slides.map((s, i) => {
        const active = i === index
        return (
          <motion.div
            key={s.id}
            aria-hidden={!active}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0, zIndex: active ? 2 : 1 }}
            transition={{ opacity: { duration: reduce ? 0.2 : FADE, ease: 'easeInOut' }, zIndex: { duration: 0 } }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ scale: active && !reduce ? 1.12 : 1.02 }}
              transition={active ? { duration: (DURATION + FADE * 1000) / 1000 + 1, ease: 'linear' } : { duration: 0, delay: FADE }}
              style={{ transformOrigin: i % 2 === 0 ? '60% 40%' : '35% 60%' }}
            >
              <Picture id={s.image} alt={active ? t(s.title) : ''} priority={i === 0} sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Overlays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-charcoal/10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] bg-forest-900/20 mix-blend-multiply" />

      {/* Texto */}
      <div className="relative z-[4] mx-auto flex min-h-[100svh] max-w-site flex-col justify-center px-5 pb-32 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-40 lg:pt-44 [@media(max-height:820px)]:pb-28">
        <div aria-live={paused ? 'polite' : 'off'} className="max-w-[56rem]">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial="hidden" animate="visible" exit="exit">
              <motion.p
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease, delay: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.4 } } }}
                className="flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-light sm:text-[0.72rem]"
              >
                <span aria-hidden className="h-px w-12 bg-gold" />
                {t(slide.eyebrow)}
              </motion.p>
              <h1 className="mt-6 font-display text-[2.4rem] font-medium leading-[1.02] tracking-[-0.015em] text-ivory min-[400px]:text-[2.7rem] sm:text-6xl lg:text-[5.6rem] xl:text-[6.2rem] [@media(min-width:640px)_and_(max-height:820px)]:text-[3.4rem] [@media(min-width:1024px)_and_(max-height:820px)]:text-[4.4rem] [@media(max-height:820px)]:mt-4">
                {words.map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
                        visible: { y: 0, opacity: 1, transition: { duration: 1, ease, delay: 0.3 + wi * 0.07 } },
                        exit: { y: reduce ? 0 : '-40%', opacity: 0, transition: { duration: 0.45, ease } },
                      }}
                    >
                      {w}{wi < words.length - 1 ? ' ' : ''}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.75 } }, exit: { opacity: 0, transition: { duration: 0.35 } } }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg lg:text-xl [@media(max-height:820px)]:mt-5 [@media(max-height:820px)]:lg:text-lg"
              >
                {t(slide.subtitle)}
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.95 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}
                className="mt-10 flex flex-wrap items-center gap-6 [@media(max-height:820px)]:mt-7"
              >
                <Link to={slide.cta.to} className="group relative inline-flex items-center gap-3 overflow-hidden bg-gold px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
                  <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-forest transition-transform duration-500 ease-lux group-hover:scale-x-100" />
                  <span className="relative">{t(slide.cta.label)}</span>
                  <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
                <Link to="/contactos" className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-ivory/85 underline decoration-gold/60 underline-offset-8 transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  {u('contact')}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controlos */}
      <div className="absolute inset-x-0 bottom-0 z-[5]">
        <div className="mx-auto flex max-w-site items-end justify-between gap-6 px-5 pb-7 sm:px-8 lg:px-12 lg:pb-10">
          <div className="flex w-full max-w-xl items-end gap-6">
            <p className="hidden shrink-0 pb-3 font-display text-lg text-ivory/80 sm:block" aria-live="polite">
              <span className="text-gold-light">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-ivory/40">/</span>
              {String(count).padStart(2, '0')}
              <span className="sr-only"> — {u('slide')} {index + 1} {u('of')} {count}</span>
            </p>
            <div className="grid w-full gap-4" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
              {slides.map((s, i) => (
                <Indicator key={s.id} index={i} active={i === index} progress={progress} onClick={() => go(i)} label={`${u('slide')} ${i + 1}: ${t(s.title)}`} />
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 pb-1 sm:gap-3">
            <button type="button" onClick={() => setUserPaused((p) => !p)} className="hidden px-2 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:text-gold-light sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold" aria-pressed={userPaused}>
              {userPaused ? u('play') : u('pause')}
            </button>
            <button type="button" onClick={() => go(index - 1)} aria-label={u('previous')} className="group flex h-12 w-12 items-center justify-center border border-ivory/25 font-display text-2xl text-ivory transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-14 sm:w-14">
              <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-0.5">←</span>
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label={u('next')} className="group flex h-12 w-12 items-center justify-center border border-ivory/25 font-display text-2xl text-ivory transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-14 sm:w-14">
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Indicação de scroll */}
      <div aria-hidden className="absolute bottom-32 right-8 z-[5] hidden flex-col items-center gap-4 lg:flex xl:right-12">
        <span className="rotate-180 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-ivory/60 [writing-mode:vertical-rl]">{u('discover')}</span>
        <span className="relative block h-16 w-px overflow-hidden bg-ivory/20">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-gold" animate={reduce ? undefined : { y: ['-100%', '200%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </div>
      <span className="absolute bottom-3 right-5 z-[5] text-[0.55rem] uppercase tracking-[0.2em] text-ivory/45 sm:right-8 lg:right-12">{u('illustrative')}</span>
    </motion.section>
  )
}
