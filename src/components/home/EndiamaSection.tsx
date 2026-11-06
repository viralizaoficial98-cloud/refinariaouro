import { homeText } from '../../content/home'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Picture } from '../ui/Picture'
import { MaskReveal, Reveal } from '../ui/Reveal'
import { ButtonLink, Container, Eyebrow, Heading } from '../ui/Typography'

export function EndiamaSection() {
  const { t } = useLang()
  const c = homeText.endiama
  return (
    <section id="grupo-endiama" className="relative bg-ivory py-24 sm:py-32 lg:py-40" aria-labelledby="endiama-title">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <MaskReveal className="relative aspect-[16/10] overflow-hidden">
            <Picture id="luanda-city" alt={t({ pt: 'Vista da cidade de Luanda', en: 'View of Luanda' })} sizes="(min-width: 1024px) 50vw, 100vw" className="block h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-[1600ms] ease-lux hover:scale-105" />
          </MaskReveal>
          <p className="mt-3 text-xs text-charcoal-500">{t({ pt: 'Luanda, Angola — fotografia ilustrativa', en: 'Luanda, Angola — illustrative photograph' })}</p>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal><Eyebrow>{t(c.eyebrow)}</Eyebrow></Reveal>
          <Reveal delay={0.1}><p className="mt-8 font-display text-[4.5rem] font-semibold leading-none tracking-[0.04em] text-forest sm:text-[6rem]">ENDIAMA</p></Reveal>
          <Reveal delay={0.15}><Heading id="endiama-title" level={3} className="mt-6 !text-3xl sm:!text-4xl">{t(c.title)}</Heading></Reveal>
          {c.body.map((p, i) => (
            <Reveal key={i} delay={0.2 + i * 0.1}><p className={`mt-6 leading-relaxed ${i === 0 ? 'text-lg text-charcoal-700' : 'text-sm text-charcoal-500'}`}>{t(p)}</p></Reveal>
          ))}
          <Reveal delay={0.4} className="mt-10"><ButtonLink to={`${path('about')}#grupo-endiama`} variant="outline">{t({ pt: 'A ligação institucional', en: 'The institutional connection' })}</ButtonLink></Reveal>
        </div>
      </Container>
    </section>
  )
}
