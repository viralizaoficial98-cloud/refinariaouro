import { useContent } from '../../content/ContentContext'
import { useLang } from '../../i18n/LanguageContext'

/** Mostra apenas dados de contacto oficialmente confirmados. */
export function ContactDetails({ dark = false }: { dark?: boolean }) {
  const { t, u } = useLang()
  const { content } = useContent()
  const c = content.contact
  const phones = c.phones.filter((p) => p.status === 'confirmado' && p.value)
  const emails = c.emails.filter((e) => e.status === 'confirmado' && e.value)
  const address = c.address.status === 'confirmado' && t(c.address.value)
  const hours = c.hours.status === 'confirmado' && t(c.hours.value)
  const muted = dark ? 'text-ivory/60' : 'text-charcoal-500'
  const strong = dark ? 'text-ivory' : 'text-forest'
  const lbl = 'text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold'
  const nothing = !phones.length && !emails.length && !address
  return (
    <div className="space-y-8">
      {nothing && <p className={`text-sm leading-relaxed ${muted}`}>{u('contactsPending')}</p>}
      {phones.length > 0 && (
        <div><p className={lbl}>{t({ pt: 'Telefone', en: 'Phone' })}</p>
          {phones.map((p) => <p key={p.value} className={`mt-2 font-display text-2xl ${strong}`}><a href={`tel:${p.value.replace(/\s/g, '')}`}>{p.value}</a> <span className={`font-sans text-xs ${muted}`}>{t(p.label)}</span></p>)}
        </div>
      )}
      {emails.length > 0 && (
        <div><p className={lbl}>E-mail</p>
          {emails.map((e) => <p key={e.value} className={`mt-2 font-display text-2xl ${strong}`}><a href={`mailto:${e.value}`}>{e.value}</a></p>)}
        </div>
      )}
      {address && <div><p className={lbl}>{t({ pt: 'Morada', en: 'Address' })}</p><p className={`mt-2 ${strong}`}>{address}</p></div>}
      {hours && <div><p className={lbl}>{t({ pt: 'Horário', en: 'Hours' })}</p><p className={`mt-2 ${strong}`}>{hours}</p></div>}
    </div>
  )
}
