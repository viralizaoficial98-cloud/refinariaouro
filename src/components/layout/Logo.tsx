import { Link } from 'react-router-dom'
import { brand } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

/**
 * Logotipo oficial, usado sem alterar proporções nem cores (fundo branco original).
 * Sobre fundos escuros é apresentado numa placa branca para manter o contraste.
 */
export function Logo({ size = 'md', plate = true, className = '' }: { size?: 'sm' | 'md' | 'lg'; plate?: boolean; className?: string }) {
  const { t, lang } = useLang()
  const h = size === 'sm' ? 'h-11 sm:h-12' : size === 'lg' ? 'h-24 sm:h-28' : 'h-12 sm:h-[3.75rem]'
  return (
    <Link
      to="/"
      className={`group inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${plate ? 'bg-white px-2.5 py-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]' : ''} transition-[padding,box-shadow] duration-700 ease-lux ${className}`}
      aria-label={`${t(brand.name)} — ${brand.group}, ${lang === 'pt' ? 'página inicial' : 'home page'}`}
    >
      <picture>
        <source type="image/webp" srcSet={brand.logoSrc.replace(/\.png$/, '.webp')} />
        <img src={brand.logoSrc} alt="" width={693} height={410} className={`${h} w-auto transition-[height] duration-700 ease-lux`} />
      </picture>
    </Link>
  )
}
