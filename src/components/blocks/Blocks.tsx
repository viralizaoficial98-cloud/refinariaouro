import { motion } from 'framer-motion'
import type { Block } from '../../content/types'
import { useLang } from '../../i18n/LanguageContext'
import { useParallax } from '../../hooks/useParallax'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal, staggerChild, staggerParent } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading, IllustrativeTag, PendingNote } from '../ui/Typography'

function Split({ b }: { b: Extract<Block, { type: 'split' }> }) {
  const { t } = useLang()
  const { ref, y } = useParallax<HTMLDivElement>(40)
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${b.reverse ? 'lg:order-2 lg:col-start-8' : ''}`}>
          {b.eyebrow && <Reveal><Eyebrow>{t(b.eyebrow)}</Eyebrow></Reveal>}
          <Reveal delay={0.1}><Heading className="mt-7 !text-4xl sm:!text-5xl">{t(b.title)}</Heading></Reveal>
          {b.body.map((p, i) => <Reveal key={i} delay={0.15 + i * 0.08}><p className="mt-6 text-lg leading-relaxed text-charcoal-700">{t(p)}</p></Reveal>)}
        </div>
        <div ref={ref} className={`lg:col-span-6 ${b.reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
          <MaskReveal direction={b.reverse ? 'left' : 'up'} className="relative aspect-[4/3] overflow-hidden">
            <motion.div style={{ y }} className="absolute -inset-y-12 inset-x-0">
              <Picture id={b.image} alt={b.caption ? t(b.caption) : t(b.title)} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
            </motion.div>
            <IllustrativeTag id={b.image} className="absolute bottom-4 right-4" />
          </MaskReveal>
          {b.caption && <p className="mt-3 text-xs text-charcoal-500">{t(b.caption)}</p>}
        </div>
      </Container>
    </section>
  )
}

function Pillars({ b }: { b: Extract<Block, { type: 'pillars' }> }) {
  const { t } = useLang()
  const dark = b.tone === 'dark'
  return (
    <section className={`py-20 sm:py-28 lg:py-32 ${dark ? 'bg-forest text-ivory' : 'bg-white'}`}>
      <Container>
        <div className="max-w-3xl">
          {b.eyebrow && <Reveal><Eyebrow light={dark}>{t(b.eyebrow)}</Eyebrow></Reveal>}
          <Reveal delay={0.1}><Heading light={dark} className="mt-7 !text-4xl sm:!text-5xl">{t(b.title)}</Heading></Reveal>
          {b.intro && <Reveal delay={0.15}><p className={`mt-6 text-lg ${dark ? 'text-ivory/75' : 'text-charcoal-700'}`}>{t(b.intro)}</p></Reveal>}
        </div>
        <motion.ul variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-8%' }}
          className={`mt-14 grid gap-px sm:grid-cols-2 ${b.items.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} ${dark ? 'bg-ivory/10' : 'bg-ivory-300'}`}>
          {b.items.map((it, i) => (
            <motion.li key={i} variants={staggerChild} className={`group relative p-8 lg:p-10 ${dark ? 'bg-forest' : 'bg-white'}`}>
              <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-lux group-hover:w-full" />
              <span className={`text-xs font-semibold ${dark ? 'text-gold' : 'text-gold-deep'}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`mt-8 font-display text-[1.75rem] leading-tight ${dark ? 'text-ivory' : 'text-forest'}`}>{t(it.title)}</h3>
              <p className={`mt-4 leading-relaxed ${dark ? 'text-ivory/70' : 'text-charcoal-500'}`}>{t(it.text)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

function Banner({ b }: { b: Extract<Block, { type: 'banner' }> }) {
  const { t } = useLang()
  const { ref, y } = useParallax<HTMLElement>(70)
  return (
    <section ref={ref} className="relative overflow-hidden bg-charcoal text-ivory">
      <motion.div aria-hidden style={{ y }} className="absolute -inset-y-20 inset-x-0">
        <Picture id={b.image} alt="" sizes="100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      <Container className="relative py-28 lg:py-40">
        <Reveal><Heading light className="max-w-2xl">{t(b.title)}</Heading></Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-ivory/80">{t(b.text)}</p></Reveal>
      </Container>
      <IllustrativeTag id={b.image} className="absolute bottom-4 right-5" />
    </section>
  )
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  const { t } = useLang()
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'lead':
            return (
              <section key={i} className="bg-ivory py-20 sm:py-28 lg:py-36">
                <Container>
                  <Reveal><p className="max-w-5xl font-display text-3xl leading-[1.25] text-forest sm:text-4xl lg:text-[3.1rem]">{t(b.text)}</p></Reveal>
                  <Reveal delay={0.2}><span aria-hidden className="mt-10 block h-px w-24 bg-gold" /></Reveal>
                </Container>
              </section>
            )
          case 'split': return <div key={i} id={b.id} className={`scroll-mt-24 ${i % 2 ? 'bg-white' : 'bg-ivory'}`}><Split b={b} /></div>
          case 'pillars': return <Pillars key={i} b={b} />
          case 'banner': return <Banner key={i} b={b} />
          case 'quote':
            return (
              <section key={i} className="bg-ivory py-16 sm:py-24">
                <Container>
                  <Reveal className="grid gap-6 border-t border-gold/40 pt-12 lg:grid-cols-12">
                    {b.attribution && <p className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-gold-deep lg:col-span-3">{t(b.attribution)}</p>}
                    <blockquote className="font-display text-3xl leading-snug text-forest sm:text-4xl lg:col-span-9 lg:text-[2.8rem]">{t(b.text)}</blockquote>
                  </Reveal>
                </Container>
              </section>
            )
          case 'list':
            return (
              <section key={i} className="bg-ivory py-20 sm:py-28">
                <Container className="grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    {b.eyebrow && <Reveal><Eyebrow>{t(b.eyebrow)}</Eyebrow></Reveal>}
                    <Reveal delay={0.1}><Heading className="mt-7 !text-4xl sm:!text-5xl">{t(b.title)}</Heading></Reveal>
                  </div>
                  <ol className="lg:col-span-6 lg:col-start-7">
                    {b.items.map((it, j) => (
                      <Reveal as="li" key={j} delay={j * 0.06} className="group flex gap-6 border-t border-ivory-300 py-6 last:border-b">
                        <span className="font-display text-xl text-gold-deep">{String(j + 1).padStart(2, '0')}</span>
                        <span className="text-lg text-charcoal-700 transition-transform duration-500 ease-lux group-hover:translate-x-1">{t(it)}</span>
                      </Reveal>
                    ))}
                  </ol>
                </Container>
              </section>
            )
          case 'notice':
            return (
              <section key={i} className="bg-ivory pb-16 pt-4">
                <Container><Reveal><PendingNote className="max-w-3xl">{t(b.text)}</PendingNote></Reveal></Container>
              </section>
            )
          case 'cta':
            return (
              <section key={i} className="bg-forest-900 py-20 text-ivory sm:py-28">
                <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
                  <div>
                    <Reveal><Heading light>{t(b.title)}</Heading></Reveal>
                    <Reveal delay={0.1}><p className="mt-5 max-w-xl text-lg text-ivory/70">{t(b.text)}</p></Reveal>
                  </div>
                  <Reveal delay={0.2}><ButtonLink to={b.to}>{t(b.label)}</ButtonLink></Reveal>
                </Container>
              </section>
            )
          default: return null
        }
      })}
    </>
  )
}
