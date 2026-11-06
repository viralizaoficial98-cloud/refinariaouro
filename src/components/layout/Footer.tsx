import { Link } from 'react-router-dom'
import { brand, nav } from '../../content/site'
import { path } from '../../content/routes'
import { useContent } from '../../content/ContentContext'
import { useLang } from '../../i18n/LanguageContext'
import { Logo } from './Logo'

export function Footer() {
  const { t, u } = useLang()
  const { content } = useContent()
  const c = content.contact
  const phones = c.phones.filter((p) => p.status === 'confirmado' && p.value)
  const emails = c.emails.filter((e) => e.status === 'confirmado' && e.value)
  const address = c.address.status === 'confirmado' ? t(c.address.value) : ''
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-forest-900 text-ivory">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-site px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-ivory/85">{u('footerTagline')}</p>
            <div className="mt-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold">{u('officialContacts')}</p>
              {phones.length || emails.length || address ? (
                <ul className="mt-4 space-y-2 text-sm text-ivory/75">
                  {phones.map((p) => <li key={p.value}><a className="hover:text-gold-light" href={`tel:${p.value.replace(/\s/g, '')}`}>{p.value}</a></li>)}
                  {emails.map((e) => <li key={e.value}><a className="hover:text-gold-light" href={`mailto:${e.value}`}>{e.value}</a></li>)}
                  {address && <li>{address}</li>}
                </ul>
              ) : (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">{u('contactsPending')}</p>
              )}
            </div>
          </div>
          <nav aria-label={t({ pt: 'Mapa do site', en: 'Site map' })} className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {nav.map((g) => (
              <div key={g.to}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-gold">{t(g.label)}</p>
                <ul className="mt-5 space-y-3">
                  {g.children?.map((c) => (
                    <li key={c.to}>
                      <Link to={c.to} className="text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory focus-visible:text-gold-light focus-visible:outline-none">{t(c.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ivory/10 pt-8 text-xs text-ivory/50 lg:flex-row lg:items-center">
          <p>© {year} {t(brand.name)} — {brand.group}. {u('rights')}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li><Link className="hover:text-ivory" to={path('legal')}>{u('privacy')}</Link></li>
            <li><Link className="hover:text-ivory" to={path('credits')}>{u('credits')}</Link></li>
            <li><Link className="hover:text-ivory" to={path('contact')}>{u('contact')}</Link></li>
            <li><a className="hover:text-ivory" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>{u('backToTop')} ↑</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
