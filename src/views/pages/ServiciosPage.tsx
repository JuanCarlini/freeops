import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SERVICES } from '@/models/services.data'
import type { Service } from '@/models/types'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ─── Single expandable service row ────────────────────────────────────────
function ServiceItem({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="border-t transition-colors duration-200"
      style={{ borderColor: open ? 'var(--color-accent)' : 'var(--color-border)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start md:items-center gap-5 md:gap-6 py-7 text-left group outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--color-bg)] rounded-[var(--radius-sm)]"
        aria-expanded={open}
      >
        {/* Number */}
        <span
          className={`font-mono text-xs shrink-0 w-14 mt-2 md:mt-0.5 transition-colors duration-200 ${
            open ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
          }`}
        >
          {service.secNumber}
        </span>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <p
            className="font-display font-bold text-xl md:text-2xl mb-1 transition-colors duration-200"
            style={{ color: open ? 'var(--color-brand)' : 'var(--color-heading)' }}
          >
            {service.name}
          </p>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            {service.tagline}
          </p>
        </div>

        {/* Toggle indicator */}
        <span
          aria-hidden="true"
          className={`shrink-0 flex items-center justify-center w-8 h-8 mt-1 md:mt-0 border font-mono text-base leading-none
            rounded-[var(--radius-sm)] transition-all duration-200 ${
              open
                ? 'bg-[var(--color-brand)] border-[var(--color-brand)] text-[var(--color-on-brand)]'
                : 'bg-transparent border-[var(--color-border)] text-[var(--color-muted)] group-hover:border-[var(--color-brand)] group-hover:text-[var(--color-brand)]'
            }`}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 pb-10
                ml-2 pl-5 border-l md:ml-0 md:pl-20 md:border-l-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {/* Description + capabilities */}
              <div>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--color-text)', maxWidth: '60ch' }}
                >
                  {service.description}
                </p>

                <p
                  className="font-mono text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Capacidades
                </p>
                <ul className="space-y-2">
                  {service.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: 'var(--color-text)' }}
                    >
                      <span style={{ color: 'var(--color-accent)' }} className="mt-0.5 shrink-0">
                        ›
                      </span>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech tags */}
              <div>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-4"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1.5"
                      style={{
                        backgroundColor: 'var(--color-surface-2)',
                        color: 'var(--color-text)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/contacto" variant="primary">
                    Pedir diagnóstico →
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export function ServiciosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1
              className="text-headline mb-5"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
                color: 'var(--color-heading)',
                textWrap: 'balance',
                maxWidth: '18ch',
              }}
            >
              Chau trabajo manual, HOLA optimización.
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Cada servicio resuelve un tipo de trabajo distinto: atención,
              procesos internos, ventas, facturación, infraestructura y web.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {SERVICES.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
          <div
            className="border-t"
            style={{ borderColor: 'var(--color-border)' }}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-16 border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="font-display font-bold text-xl mb-1"
              style={{ color: 'var(--color-heading)' }}
            >
              No sabés por dónde empezar.
            </p>
            <p style={{ color: 'var(--color-muted)' }} className="text-sm">
              El diagnóstico identifica el punto de mayor impacto.
            </p>
          </motion.div>
          <Button href="/contacto" variant="primary" className="shrink-0">
            Pedir diagnóstico →
          </Button>
        </div>
      </section>
    </>
  )
}
