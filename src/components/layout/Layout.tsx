import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import { Header } from './Header'
import { Footer } from './Footer'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 650)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
  return null
}

/** Congela o outlet de cada rota para que a página que sai não renderize a nova. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

function PageFallback() {
  return <div className="min-h-screen bg-forest-900" aria-busy="true" />
}

export function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const { u } = useLang()
  return (
    <>
      <a href="#conteudo" className="sr-only z-[100] bg-gold px-4 py-3 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {u('skip')}
      </a>
      <ScrollManager />
      <Header />
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => { if (!window.location.hash) window.scrollTo(0, 0) }}>
        <motion.main
          id="conteudo"
          key={location.pathname}
          tabIndex={-1}
          className="outline-none"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageFallback />}>
            <FrozenOutlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
