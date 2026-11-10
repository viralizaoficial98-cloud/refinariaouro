import { useContent } from '../../content/ContentContext'
import type { ContactInfo } from '../../content/types'
import { useLang } from '../../i18n/LanguageContext'

/** Selecciona os contactos a apresentar e indica se algum aguarda validação institucional. */
// eslint-disable-next-line react-refresh/only-export-components
export function visibleContacts(c: ContactInfo) {
  const phones = c.phones.filter((p) => p.value)
  const emails = c.emails.filter((e) => e.value)
  const website = c.website?.value ? c.website : null
  const hasAddress = !!(c.address.value.pt || c.address.value.en)
  const pending = [...phones, ...emails, ...(website ? [website] : []), ...(hasAddress ? [c.address] : [])].some((x) => x.status !== 'confirmado')
  return { phones, emails, website, hasAddress, pending }
}

export const telHref = (v: string) => `tel:${v.replace(/[^\d+]/g, '')}`
export const webHref = (v: string) => (/^https?:\/\//.test(v) ? v : `https://${v}`)

/**
 * Contactos institucionais. Os dados indicados na brochura são apresentados com uma nota
 * de validação até serem marcados como 'confirmado' no backoffice.
 */
export function ContactDetails({ dark = false, buttons = false }: { dark?: boolean; buttons?: boolean }) {
  const { t, u } = useLang()
  const { content } = useContent()
  const c = content.contact
  const { phones, emails, website, hasAddress, pending } = visibleContacts(c)
  const hours = c.hours.status === 'confirmado' && t(c.hours.value)
  const muted = dark ? 'text-ivory/60' : 'text-charcoal-500'
  const strong = dark ? 'text-ivory' : 'text-forest'
  const lbl = 'text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold'
  const link = `transition-colors duration-300 ${dark ? 'hover:text-gold-light' : 'hover:text-gold-deep'}`
  const nothing = !phones.length && !emails.length && !hasAddress
  const btn = `group relative inline-flex items-center gap-3 overflow-hidden px-6 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-lux focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`
  return (
    <div className="space-y-8">
      {nothing && <p className={`text-sm leading-relaxed ${muted}`}>{u('contactsPending')}</p>}
      {phones.length > 0 && (
        <div><p className={lbl}>{t({ pt: 'Telefone', en: 'Phone' })}</p>
          {phones.map((p) => <p key={p.value} className={`mt-2 font-display text-2xl ${strong}`}><a className={link} href={telHref(p.value)}>{p.value}</a> <span className={`font-sans text-xs ${muted}`}>{t(p.label)}</span></p>)}
        </div>
      )}
      {emails.length > 0 && (
        <div><p className={lbl}>E-mail</p>
          {emails.map((e) => <p key={e.value} className={`mt-2 break-all font-display text-2xl ${strong}`}><a className={link} href={`mailto:${e.value}`}>{e.value}</a></p>)}
        </div>
      )}
      {website && (
        <div><p className={lbl}>Website</p>
          <p className={`mt-2 font-display text-2xl ${strong}`}><a className={link} href={webHref(website.value)} target="_blank" rel="noopener noreferrer">{website.value}</a></p>
        </div>
      )}
      {hasAddress && <div><p className={lbl}>{t({ pt: 'Localização', en: 'Location' })}</p><p className={`mt-2 leading-relaxed ${strong}`}>{t(c.address.value)}</p></div>}
      {hours && <div><p className={lbl}>{t({ pt: 'Horário', en: 'Hours' })}</p><p className={`mt-2 ${strong}`}>{hours}</p></div>}
      {buttons && (phones[0] || emails[0]) && (
        <div className="flex flex-wrap gap-4 pt-2">
          {phones[0] && (
            <a href={telHref(phones[0].value)} className={`${btn} bg-gold text-charcoal hover:text-ivory`}>
              <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-forest transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              <span className="relative">{t({ pt: 'Ligar agora', en: 'Call now' })}</span>
            </a>
          )}
          {emails[0] && (
            <a href={`mailto:${emails[0].value}`} className={`${btn} border ${dark ? 'border-ivory/40 text-ivory hover:text-charcoal' : 'border-forest/30 text-forest hover:text-ivory'}`}>
              <span aria-hidden className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-lux group-hover:scale-x-100 ${dark ? 'bg-gold' : 'bg-forest'}`} />
              <span className="relative">{t({ pt: 'Enviar e-mail', en: 'Send e-mail' })}</span>
            </a>
          )}
        </div>
      )}
      {pending && <p className={`border-l-2 border-gold pl-4 text-xs leading-relaxed ${muted}`}>{t({ pt: 'Contactos indicados na brochura institucional, em validação administrativa antes da publicação definitiva.', en: 'Contact details from the corporate brochure, pending administrative validation before final publication.' })}</p>}
    </div>
  )
}
