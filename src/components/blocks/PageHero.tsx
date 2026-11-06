import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { IllustrativeTag } from '../ui/Typography'

const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  eyebrow: string
  title: string
  intro?: string
  image: string
  crumbs?: { label: string; to?: string }[]
  compact?: boolean
}

export function PageHero({ eyebrow, title, intro, image, crumbs = [], compact = false }: Props) {
  const { u } = useLang()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.3])

  return (
    <section ref={ref} className={`relative flex items-end overflow-hidden bg-charcoal text-ivory ${compact ? 'min-h-[52vh]' : 'min-h-[78vh] lg:min-h-[86vh]'}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div className="h-full w-full" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <Picture id={image} alt="" priority sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-900/70 to-transparent" />
      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-site px-5 pb-16 pt-40 sm:px-8 lg:px-12 lg:pb-24">
        {crumbs.length > 0 && (
          <nav aria-label={u('breadcrumb')}>
            <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ivory/60">
              <li><Link to="/" className="hover:text-gold-light">{u('home')}</Link></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span aria-hidden className="text-gold">/</span>
                  {c.to ? <Link to={c.to} className="hover:text-gold-light">{c.label}</Link> : <span aria-current="page" className="text-ivory/85">{c.label}</span>}
                </li>
              ))}
            </motion.ol>
          </nav>
        )}
        <motion.p initial={reduce ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="mt-10 flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-gold-light">
          <span aria-hidden className="h-px w-12 bg-gold" />{eyebrow}
        </motion.p>
        <h1 className="mt-6 max-w-5xl overflow-hidden font-display text-[2.6rem] font-medium leading-[1.03] tracking-[-0.01em] sm:text-6xl lg:text-[5.2rem]">
          <motion.span className="block" initial={reduce ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 1.1, ease }}>{title}</motion.span>
        </h1>
        {intro && (
          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80">
            {intro}
          </motion.p>
        )}
      </motion.div>
      <IllustrativeTag className="absolute bottom-4 right-5 sm:right-8 lg:right-12" />
    </section>
  )
}
