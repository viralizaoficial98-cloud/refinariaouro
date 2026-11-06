import { Link } from 'react-router-dom'
import { brand } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

/** Halo luminoso muito suave para legibilidade sobre fundos escuros (sem caixa nem placa). */
const darkFilter =
  'drop-shadow(0 0 0.35px rgba(255,255,255,0.7)) drop-shadow(0 0 8px rgba(255,255,255,0.28)) drop-shadow(0 0 24px rgba(232,198,106,0.18))'

/**
 * Logotipo oficial em PNG transparente, sem alterar proporções nem cores.
 * `tone="dark"` aplica apenas um halo subtil quando o fundo é escuro.
 */
export function Logo({ size = 'md', tone = 'light', className = '' }: { size?: 'sm' | 'md' | 'lg'; tone?: 'light' | 'dark'; className?: string }) {
  const { t, lang } = useLang()
  const h = size === 'sm' ? 'h-11 sm:h-12' : size === 'lg' ? 'h-24 sm:h-28' : 'h-14 sm:h-16 xl:h-[4.5rem]'
  return (
    <Link
      to="/"
      className={`group inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 ${className}`}
      aria-label={`${t(brand.name)} — ${brand.group}, ${lang === 'pt' ? 'página inicial' : 'home page'}`}
    >
      <picture>
        <source type="image/webp" srcSet={brand.logoSrc.replace(/\.png$/, '.webp')} />
        <img
          src={brand.logoSrc}
          alt=""
          width={695}
          height={413}
          style={{ filter: tone === 'dark' ? darkFilter : 'none' }}
          className={`${h} w-auto transition-[height,filter] duration-700 ease-lux`}
        />
      </picture>
    </Link>
  )
}
