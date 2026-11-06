import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { NewsCard } from '../ui/NewsCard'
import { Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading } from '../ui/Typography'

export function NewsSection() {
  const { t, u } = useLang()
  const { content } = useContent()
  const news = content.news.filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date))
  const [emblaRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', dragFree: false })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!embla) return
    setCanPrev(embla.canScrollPrev())
    setCanNext(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect).on('reInit', onSelect)
    return () => { embla.off('select', onSelect).off('reInit', onSelect) }
  }, [embla, onSelect])

  if (!news.length) return null
  const arrow = 'flex h-12 w-12 items-center justify-center border border-forest/25 font-display text-2xl text-forest transition-colors duration-500 hover:border-forest hover:bg-forest hover:text-ivory disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold'

  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="news-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow>{t({ pt: 'Notícias e Comunicados', en: 'News and Announcements' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="news-title" className="mt-8">{t({ pt: 'Actualidade institucional.', en: 'Institutional news.' })}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="flex items-center gap-3">
            <button type="button" className={arrow} onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label={u('previous')}><span aria-hidden>←</span></button>
            <button type="button" className={arrow} onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label={u('next')}><span aria-hidden>→</span></button>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-14">
          <div ref={emblaRef} className="-mx-3 overflow-visible">
            <ul className="flex">
              {news.map((n) => (
                <li key={n.id} className="min-w-0 shrink-0 grow-0 basis-[85%] px-3 sm:basis-1/2 lg:basis-1/3">
                  <NewsCard item={n} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="mt-14"><ButtonLink to={path('news')} variant="ghost">{u('viewAll')}</ButtonLink></Reveal>
      </Container>
    </section>
  )
}
