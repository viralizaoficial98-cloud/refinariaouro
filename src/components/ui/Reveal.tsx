import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/** Revelação suave ao entrar no viewport (IntersectionObserver via Framer Motion). */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Comp>
  )
}

/** Revelação de imagem com máscara (cortina) — efeito editorial. */
export function MaskReveal({ children, className = '', direction = 'up' }: { children: ReactNode; className?: string; direction?: 'up' | 'left' }) {
  const reduce = useReducedMotion()
  const hidden = direction === 'up' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
  const variants: Variants = {
    hidden: { clipPath: hidden },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease } },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
export { ease }
