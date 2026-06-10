import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Custom cursor: small navy dot + spring-lagging ring.
 * Only renders on pointer:fine devices (not touch).
 * Adds .cursor-active to <html> to suppress the native cursor.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 22, stiffness: 220, mass: 0.4 }
  const ringX = useSpring(dotX, springConfig)
  const ringY = useSpring(dotY, springConfig)

  const hoveredRef = useRef(false)
  hoveredRef.current = hovered

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('cursor-active')
    setActive(true)

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"], label')) {
        setHovered(true)
      }
    }

    const onLeaveInteractive = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"], label')) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnterInteractive)
    document.addEventListener('mouseout', onLeaveInteractive)

    return () => {
      document.documentElement.classList.remove('cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnterInteractive)
      document.removeEventListener('mouseout', onLeaveInteractive)
    }
  }, [dotX, dotY])

  if (!active) return null

  const ringSize = hovered ? 44 : 32

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--color-brand)',
          zIndex: 9999,
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'var(--color-accent)' : 'var(--color-brand)'}`,
          opacity: hovered ? 0.7 : 0.35,
          zIndex: 9998,
        }}
      />
    </>
  )
}
