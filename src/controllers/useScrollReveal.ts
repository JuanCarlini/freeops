import { useEffect, useRef } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-hidden')
          el.classList.add('reveal-visible')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    el.classList.add('reveal-hidden')
    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.05, rootMargin = '0px 0px -40px 0px' } = options
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]

    children.forEach((child) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(24px)'
      child.style.transition = 'none'
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              child.style.opacity = '1'
              child.style.transform = 'translateY(0)'
            }, i * 80)
          })
          observer.unobserve(container)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [count, threshold, rootMargin])

  return containerRef
}
