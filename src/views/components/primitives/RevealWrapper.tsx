'use client'
import { motion } from 'motion/react'

interface RevealWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'none'
}

export function RevealWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealWrapperProps) {
  const initial =
    direction === 'up'
      ? { opacity: 0, y: 24 }
      : direction === 'left'
        ? { opacity: 0, x: -24 }
        : { opacity: 0 }

  const animate = direction === 'up' ? { opacity: 1, y: 0 } : direction === 'left' ? { opacity: 1, x: 0 } : { opacity: 1 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
