import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import type { Service } from '@/models/types'
import { AsciiBlock } from './primitives/AsciiBlock'
import { Tag } from './primitives/Tag'

interface ServiceCardProps {
  service: Service
  compact?: boolean
  index?: number
}

// Editorial row — used in homepage services list
export function ServiceRow({ service, index = 0 }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/servicios#${service.slug}`}
        className="group flex items-start gap-6 md:gap-10 py-6 md:py-7 border-b transition-colors duration-150"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span
          className="font-mono text-xs shrink-0 mt-0.5 w-14 transition-colors duration-150"
          style={{ color: 'var(--color-accent)' }}
        >
          {service.secNumber}
        </span>

        <div className="flex-1 min-w-0">
          <h3
            className="font-sans font-semibold text-xl md:text-2xl mb-1 transition-colors duration-150 group-hover:text-[var(--color-heading)]"
            style={{ color: 'var(--color-heading)' }}
          >
            {service.name}
          </h3>
          <p className="text-sm md:text-base" style={{ color: 'var(--color-muted)' }}>
            {service.tagline}
          </p>
        </div>

        <motion.span
          className="font-mono text-base shrink-0 self-center"
          style={{ color: 'var(--color-accent)' }}
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  )
}

// Full card — used in /servicios page
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      id={service.slug}
      className="border p-8 md:p-10"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: 'var(--color-accent-dark)' }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="flex-1">
          <div className="font-mono text-xs mb-4" style={{ color: 'var(--color-accent)' }}>
            {service.secNumber}
          </div>
          <h2
            className="font-sans font-semibold text-3xl md:text-4xl mb-3 tracking-tight"
            style={{ color: 'var(--color-heading)' }}
          >
            {service.name}
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-accent-dim)' }}>
            {service.tagline}
          </p>
          <p className="mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {service.description}
          </p>

          <ul className="space-y-2 mb-8">
            {service.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text)' }}>
                <span style={{ color: 'var(--color-accent)' }} className="mt-0.5 shrink-0">
                  ▸
                </span>
                {cap}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {service.techTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Right — ASCII */}
        <div className="md:w-64 shrink-0 flex items-start justify-end">
          <AsciiBlock art={service.asciiIcon} />
        </div>
      </div>
    </motion.div>
  )
}
