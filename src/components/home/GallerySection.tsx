import { useContent } from '../../content/ContentContext'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { GalleryMosaic } from '../ui/GalleryMosaic'
import { Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading } from '../ui/Typography'

export function GallerySection() {
  const { t, u } = useLang()
  const { content } = useContent()
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="gallery-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal><Eyebrow>{t({ pt: 'Galeria', en: 'Gallery' })}</Eyebrow></Reveal>
            <Reveal delay={0.1}><Heading id="gallery-title" className="mt-8">{t({ pt: 'O brilho do rigor.', en: 'The gleam of rigour.' })}</Heading></Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-sm text-sm text-charcoal-500">{u('galleryNote')}</Reveal>
        </div>
        <div className="mt-14"><GalleryMosaic items={content.gallery.slice(0, 8)} /></div>
        <Reveal className="mt-14"><ButtonLink to={path('gallery')} variant="ghost">{t({ pt: 'Galeria multimédia', en: 'Media gallery' })}</ButtonLink></Reveal>
      </Container>
    </section>
  )
}
