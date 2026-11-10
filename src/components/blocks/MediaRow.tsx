import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useParallax } from '../../hooks/useParallax'
import { useLang } from '../../i18n/LanguageContext'
import type { L } from '../../content/types'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { Container, IllustrativeTag } from '../ui/Typography'

interface Props {
  id: string
  index?: number
  eyebrow?: L
  title: L
  text: L
  image?: string
  reverse?: boolean
  tone?: 'ivory' | 'white'
  /** Fotografia recortada (PNG transparente): apresentada inteira sobre fundo institucional. */
  cutout?: boolean
  /** Enquadramento CSS (object-position) da fotografia. */
  imagePosition?: string
  children?: ReactNode
}

/** Linha editorial alternada (fotografia / texto) usada nas páginas da brochura. */
export function MediaRow({ id, index, eyebrow, title, text, image, reverse = false, tone = 'ivory', cutout = false, imagePosition, children }: Props) {
  const { t } = useLang()
  const { ref, y } = useParallax<HTMLDivElement>(35)
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${tone === 'white' ? 'bg-white' : 'bg-ivory'}`} aria-labelledby={`${id}-t`}>
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {image && (
          <div ref={ref} className={`lg:col-span-6 ${reverse ? 'lg:order-2 lg:col-start-7' : ''}`}>
            <MaskReveal direction={reverse ? 'up' : 'left'} className={`group relative overflow-hidden ${cutout ? 'aspect-[4/3] bg-forest-900' : 'aspect-[4/3] bg-charcoal'}`}>
              {cutout && <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.3),transparent_65%)]" />}
              <motion.div style={{ y }} className={cutout ? 'absolute inset-8' : 'absolute -inset-y-10 inset-x-0'}>
                <Picture id={image} alt={t(title)} imgStyle={imagePosition ? { objectPosition: imagePosition } : undefined} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName={`h-full w-full transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.04] ${cutout ? 'object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]' : 'object-cover'}`} />
              </motion.div>
              <IllustrativeTag id={image} className="absolute bottom-4 right-4" />
            </MaskReveal>
          </div>
        )}
        <div className={image ? `lg:col-span-5 ${reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}` : 'lg:col-span-8'}>
          {(index !== undefined || eyebrow) && (
            <Reveal className="flex items-center gap-4">
              {index !== undefined && <span className="font-display text-2xl text-gold-deep">{String(index).padStart(2, '0')}</span>}
              {eyebrow && <span className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t(eyebrow)}</span>}
            </Reveal>
          )}
          <Reveal delay={0.1}><h2 id={`${id}-t`} className="mt-6 font-display text-4xl leading-tight text-forest sm:text-5xl">{t(title)}</h2></Reveal>
          <Reveal delay={0.15}><p className="mt-6 text-lg leading-relaxed text-charcoal-700">{t(text)}</p></Reveal>
          {children}
        </div>
      </Container>
    </section>
  )
}

/** Lista com marcadores dourados e entrada progressiva. */
export function GoldList({ items }: { items: L[] }) {
  const { t } = useLang()
  return (
    <ul className="mt-8">
      {items.map((d, j) => (
        <Reveal as="li" key={j} delay={0.2 + j * 0.05} className="flex gap-4 border-t border-ivory-300 py-4 text-charcoal-700 last:border-b">
          <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-gold" />{t(d)}
        </Reveal>
      ))}
    </ul>
  )
}
