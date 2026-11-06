import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../content/site'
import { path } from '../../content/routes'
import { useLang } from '../../i18n/LanguageContext'
import { useDialog } from '../../hooks/useDialog'
import { LangSwitch } from './Header'
import { Logo } from './Logo'

const ease = [0.22, 1, 0.36, 1] as const

export function MobileMenu({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: () => void }) {
  const { t, u } = useLang()
  const ref = useDialog<HTMLDivElement>(open, onClose)
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={u('menu')}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest-900 text-ivory"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <Logo size="sm" />
            <div className="flex items-center gap-6">
              <LangSwitch light />
              <button type="button" onClick={onClose} className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                {u('close')} <span aria-hidden>×</span>
              </button>
            </div>
          </div>
          <nav aria-label={t({ pt: 'Navegação principal', en: 'Main navigation' })} className="flex-1 px-5 pb-10 pt-4 sm:px-8">
            <ul>
              <motion.li initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease }} className="border-b border-ivory/10">
                <Link to="/" onClick={onClose} className="block py-5 font-display text-4xl focus-visible:outline-none focus-visible:text-gold-light">{u('home')}</Link>
              </motion.li>
              {nav.map((item, i) => (
                <motion.li key={item.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease }} className="border-b border-ivory/10">
                  <button
                    type="button"
                    aria-expanded={expanded === i}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex w-full items-center justify-between py-5 text-left font-display text-4xl focus-visible:outline-none focus-visible:text-gold-light"
                  >
                    {t(item.label)}
                    <span aria-hidden className={`text-2xl text-gold transition-transform duration-500 ${expanded === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                        {item.children?.map((c) => (
                          <li key={c.to}>
                            <Link to={c.to} onClick={onClose} className="block py-2.5 pl-1 text-base text-ivory/75 transition-colors hover:text-gold-light focus-visible:text-gold-light focus-visible:outline-none">
                              {t(c.label)}
                            </Link>
                          </li>
                        ))}
                        <li className="h-4" />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to={path('contact')} onClick={onClose} className="bg-gold px-6 py-4 text-center text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-charcoal">{u('contact')}</Link>
              <button type="button" onClick={onSearch} className="border border-ivory/30 px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ivory">{u('search')}</button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
