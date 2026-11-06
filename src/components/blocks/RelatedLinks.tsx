import { Link, useLocation } from 'react-router-dom'
import { nav } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'
import { Reveal } from '../ui/Reveal'
import { Container } from '../ui/Typography'

/** «Continue a explorar»: páginas irmãs do mesmo grupo de navegação. */
export function RelatedLinks() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const group = nav.find((g) => g.children?.some((c) => c.to === pathname))
  const items = group?.children?.filter((c) => c.to !== pathname && !c.to.includes('#')) ?? []
  if (!items.length) return null
  return (
    <section className="border-t border-ivory-300 bg-ivory py-20 sm:py-24" aria-labelledby="related-title">
      <Container>
        <p id="related-title" className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold-deep">{t({ pt: 'Continue a explorar', en: 'Keep exploring' })} — {t(group!.label)}</p>
        <ul className="mt-8 grid gap-px bg-ivory-300 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c, i) => (
            <Reveal as="li" key={c.to} delay={i * 0.06} className="bg-ivory">
              <Link to={c.to} className="group flex h-full items-end justify-between gap-6 p-8 transition-colors duration-500 hover:bg-white focus-visible:bg-white focus-visible:outline-none">
                <span>
                  <span className="block font-display text-3xl text-forest">{t(c.label)}</span>
                  {c.description && <span className="mt-2 block text-sm text-charcoal-500">{t(c.description)}</span>}
                </span>
                <span aria-hidden className="font-display text-2xl text-gold-deep transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
