import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../../content/site'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from './SearchOverlay'

const languages = [
  { code: 'pt', label: 'PT', name: 'Português', flag: '/flags/pt.svg' },
  { code: 'en', label: 'EN', name: 'English', flag: '/flags/us.svg' },
] as const

/** Selector de idioma com bandeiras SVG locais (Portugal / Estados Unidos). */
export function LangSwitch({ light }: { light: boolean }) {
  const { lang, setLang, u } = useLang()
  return (
    <div role="group" aria-label={u('language')} className="flex items-center gap-0.5 text-[0.7rem] font-semibold tracking-[0.18em]">
      {languages.map((l, i) => {
        const active = lang === l.code
        return (
          <span key={l.code} className="flex items-center">
            {i > 0 && <span aria-hidden className={`mx-1 h-3 w-px ${light ? 'bg-ivory/30' : 'bg-charcoal/20'}`} />}
            <button
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              aria-label={l.name}
              title={l.name}
              lang={l.code}
              className={`group relative flex min-h-[2.25rem] items-center gap-1.5 px-1.5 py-1 uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                active ? 'text-gold' : light ? 'text-ivory/70 hover:text-ivory' : 'text-charcoal-500 hover:text-forest'
              }`}
            >
              <img
                src={l.flag}
                alt=""
                width={20}
                height={14}
                className={`h-[14px] w-[20px] shrink-0 rounded-[2px] object-cover object-left transition-[opacity,filter,box-shadow] duration-300 ${
                  active ? 'opacity-100 shadow-[0_0_0_1px_#D4AF37]' : `opacity-70 saturate-[0.85] group-hover:opacity-100 group-hover:saturate-100 ${light ? 'shadow-[0_0_0_1px_rgba(248,247,242,0.25)]' : 'shadow-[0_0_0_1px_rgba(22,27,24,0.12)]'}`
                }`}
              />
              <span aria-hidden>{l.label}</span>
              <span aria-hidden className={`absolute inset-x-1.5 bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-lux ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
            </button>
          </span>
        )
      })}
    </div>
  )
}

export function Header() {
  const { t, u } = useLang()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)

  // Páginas com hero escuro começam com cabeçalho transparente.
  const overHero = !scrolled
  const light = overHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(null); setMobile(false) }, [pathname])

  const openMenu = (i: number) => { window.clearTimeout(closeTimer.current); setOpen(i) }
  const scheduleClose = () => { closeTimer.current = window.setTimeout(() => setOpen(null), 160) }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding] duration-700 ease-lux ${
          scrolled ? 'bg-ivory/85 py-3 shadow-[0_1px_0_rgba(7,91,33,0.08)] backdrop-blur-xl' : 'bg-gradient-to-b from-charcoal/60 to-transparent py-5 lg:py-7'
        }`}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(null) }}
      >
        <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo size={scrolled ? 'sm' : 'md'} tone={scrolled ? 'light' : 'dark'} />

          <nav aria-label={t({ pt: 'Navegação principal', en: 'Main navigation' })} className="hidden min-[1360px]:block">
            <ul className="flex items-center">
              {nav.map((item, i) => {
                const active = item.children?.some((c) => pathname.startsWith(c.to.split('#')[0])) ?? false
                return (
                  <li key={item.to} className="relative" onMouseEnter={() => openMenu(i)} onMouseLeave={scheduleClose}>
                    <button
                      type="button"
                      aria-expanded={open === i}
                      aria-controls={`menu-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                      className={`relative px-2.5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] 2xl:px-4 2xl:text-[0.74rem] 2xl:tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        light ? 'text-ivory/90 hover:text-gold-light' : 'text-charcoal-700 hover:text-forest'
                      } ${active ? (light ? 'text-gold-light' : 'text-forest') : ''}`}
                    >
                      {t(item.label)}
                      <span aria-hidden className={`absolute bottom-1.5 left-2.5 right-2.5 h-px 2xl:left-4 2xl:right-4 origin-left bg-gold transition-transform duration-500 ease-lux ${open === i || active ? 'scale-x-100' : 'scale-x-0'}`} />
                    </button>
                    <AnimatePresence>
                      {open === i && item.children && (
                        <motion.div
                          id={`menu-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${item.children.length > 6 ? 'w-[42rem]' : 'w-[22rem]'}`}
                        >
                          <ul className={`border-t-2 border-gold bg-ivory p-3 shadow-[0_30px_60px_-20px_rgba(22,27,24,0.35)] ${item.children.length > 6 ? 'grid grid-cols-2' : ''}`}>
                            {item.children.map((c) => (
                              <li key={c.to}>
                                <NavLink
                                  to={c.to}
                                  className="group/item block px-4 py-3 transition-colors duration-300 hover:bg-ivory-200 focus-visible:bg-ivory-200 focus-visible:outline-none"
                                  onClick={() => setOpen(null)}
                                >
                                  <span className="block font-display text-xl text-forest transition-transform duration-500 ease-lux group-hover/item:translate-x-1">{t(c.label)}</span>
                                  {c.description && <span className="mt-0.5 block text-xs text-charcoal-500">{t(c.description)}</span>}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4 2xl:gap-5">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className={`hidden text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-colors sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${light ? 'text-ivory/80 hover:text-ivory' : 'text-charcoal-500 hover:text-forest'}`}
            >
              {u('search')}
            </button>
            <span aria-hidden className={`hidden h-4 w-px sm:block ${light ? 'bg-ivory/30' : 'bg-charcoal/15'}`} />
            <LangSwitch light={light} />
            <Link
              to={path('contact')}
              className="group relative hidden overflow-hidden bg-gold px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 hover:text-ivory md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-forest transition-transform duration-500 ease-lux group-hover:scale-x-100" />
              <span className="relative">{u('contact')}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              className={`flex h-11 items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] min-[1360px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${light ? 'text-ivory' : 'text-forest'}`}
            >
              <span className="hidden sm:inline">{u('menu')}</span>
              <span aria-hidden className="flex w-7 flex-col gap-[6px]">
                <span className={`h-px w-full ${light ? 'bg-ivory' : 'bg-forest'}`} />
                <span className="h-px w-2/3 self-end bg-gold" />
              </span>
              <span className="sr-only sm:hidden">{u('menu')}</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} onSearch={() => { setMobile(false); setSearch(true) }} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  )
}
