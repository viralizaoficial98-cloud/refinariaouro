import { useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/** Deslocamento parallax subtil de um elemento em função do scroll. */
export function useParallax<T extends HTMLElement>(distance = 60) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance])
  return { ref, y }
}
