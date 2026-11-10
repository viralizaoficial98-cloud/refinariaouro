import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import { images } from '../../content/images'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function Eyebrow({ children, light = false, className = '' }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow ${light ? 'text-gold-light' : 'text-gold-deep'} ${className}`}>
      <span aria-hidden className={`h-px w-10 ${light ? 'bg-gold-light/70' : 'bg-gold'}`} />
      {children}
    </p>
  )
}

export function Heading({ children, level = 2, light = false, className = '', id }: { children: ReactNode; level?: 1 | 2 | 3; light?: boolean; className?: string; id?: string }) {
  const Tag = `h${level}` as const
  const size = level === 1 ? 'text-5xl sm:text-6xl lg:text-7xl' : level === 2 ? 'text-4xl sm:text-5xl lg:text-[3.6rem]' : 'text-2xl sm:text-3xl'
  return (
    <Tag id={id} className={`font-display font-medium leading-[1.05] tracking-[-0.01em] text-balance ${size} ${light ? 'text-ivory' : 'text-forest'} ${className}`}>
      {children}
    </Tag>
  )
}

type BtnVariant = 'gold' | 'outline' | 'outlineLight' | 'ghost'
const btnBase = 'group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ease-lux focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2'
const btnVariants: Record<BtnVariant, string> = {
  gold: 'bg-gold text-charcoal hover:text-ivory',
  outline: 'border border-forest/30 text-forest hover:text-ivory hover:border-forest',
  outlineLight: 'border border-ivory/40 text-ivory hover:text-charcoal hover:border-gold',
  ghost: 'px-0 py-2 text-forest',
}
const btnFill: Record<BtnVariant, string> = {
  gold: 'bg-forest',
  outline: 'bg-forest',
  outlineLight: 'bg-gold',
  ghost: '',
}

export function ButtonLink({ to, children, variant = 'gold', className = '' }: { to: string; children: ReactNode; variant?: BtnVariant; className?: string }) {
  if (variant === 'ghost') {
    return (
      <Link to={to} className={`group inline-flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}>
        <span className="relative">
          {children}
          <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-0" />
          <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-forest transition-transform delay-150 duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100" />
        </span>
        <span aria-hidden className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
      </Link>
    )
  }
  return (
    <Link to={to} className={`${btnBase} ${btnVariants[variant]} ${className}`}>
      <span aria-hidden className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-lux group-hover:scale-x-100 ${btnFill[variant]}`} />
      <span className="relative">{children}</span>
      <span aria-hidden className="relative transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
    </Link>
  )
}

/**
 * Indicação discreta da origem da fotografia: «Imagem ilustrativa» (não corresponde às instalações)
 * ou «Brochura institucional» quando a imagem foi extraída da brochura da Refinaria.
 * Fotografias oficiais (ex.: retrato do CEO) não recebem indicação.
 */
export function IllustrativeTag({ className = '', light = true, id }: { className?: string; light?: boolean; id?: string }) {
  const { u } = useLang()
  const meta = id ? images[id] : undefined
  if (meta?.official) return null
  return (
    <span className={`pointer-events-none select-none text-[0.6rem] font-medium uppercase tracking-[0.2em] ${light ? 'text-ivory/70' : 'text-charcoal-500'} ${className}`}>
      {meta?.brochure ? u('brochureImage') : u('illustrative')}
    </span>
  )
}

/** Nota editorial para conteúdo pendente de validação institucional. */
export function PendingNote({ children, className = '', light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`border-l-2 border-gold pl-5 text-sm leading-relaxed ${light ? 'text-ivory/70' : 'text-charcoal-500'} ${className}`}>
      {children}
    </p>
  )
}

export function StatusBadge({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'light' }) {
  return (
    <span className={`inline-block border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${tone === 'gold' ? 'border-gold/60 text-gold-deep' : 'border-ivory/40 text-ivory/80'}`}>
      {children}
    </span>
  )
}
