import { Link } from 'react-router-dom'
import { brand } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

/**
 * Logotipo. Quando `brand.logoSrc` estiver definido, usa o ficheiro oficial sem
 * alterar proporções nem cores. Caso contrário, mostra uma assinatura tipográfica
 * provisória (não é o logotipo oficial).
 */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const { t, lang } = useLang()
  const src = light && brand.logoLightSrc ? brand.logoLightSrc : brand.logoSrc
  return (
    <Link to="/" className={`group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`} aria-label={`${t(brand.name)} — ${brand.group}, ${lang === 'pt' ? 'página inicial' : 'home page'}`}>
      {src ? (
        <img src={src} alt="" className="h-12 w-auto object-contain sm:h-14" />
      ) : (
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className={`font-display text-[1.05rem] font-semibold uppercase tracking-[0.08em] sm:text-[1.3rem] 2xl:text-[1.4rem] ${light ? 'text-ivory' : 'text-forest'}`}>
            {lang === 'pt' ? 'Refinaria de Ouro' : 'Angola Gold'}
          </span>
          <span className="mt-1 flex items-center gap-2 text-[0.5rem] sm:text-[0.56rem] font-semibold uppercase tracking-[0.34em] text-gold">
            {lang === 'pt' ? 'de Angola' : 'Refinery'}
            <span aria-hidden className="h-px w-4 bg-gold/60" />
            <span className={light ? 'text-ivory/70' : 'text-charcoal-500'}>{brand.group}</span>
          </span>
        </span>
      )}
    </Link>
  )
}
