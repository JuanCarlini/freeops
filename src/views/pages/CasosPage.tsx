import { motion } from 'motion/react'
import { CASES } from '@/models/casos.data'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function CasosPage() {
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
              }}
            >
              Problemas reales.
              <br />
              Sistemas reales.
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Cada caso empieza con un proceso que se hacía a mano.
              Termina con un sistema que lo hace solo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASES.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex flex-col p-8 border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p
                    className="font-mono text-xs uppercase tracking-widest"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {c.client ?? 'Interno'}
                  </p>
                  <span
                    className="font-mono text-xs shrink-0 inline-flex items-center gap-2"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {c.status === 'En producción' && (
                      <span
                        aria-hidden="true"
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      />
                    )}
                    {c.status}
                  </span>
                </div>

                <h2
                  className="font-display font-bold text-2xl mb-3"
                  style={{ color: 'var(--color-heading)', letterSpacing: '-0.02em' }}
                >
                  {c.title}
                </h2>
                <p
                  className="text-base leading-relaxed mb-6 flex-1"
                  style={{ color: 'var(--color-text)' }}
                >
                  {c.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1"
                      style={{
                        backgroundColor: 'var(--color-surface-2)',
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 border-t"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="max-w-xl"
          >
            <h2
              className="font-display font-bold text-2xl mb-4"
              style={{ color: 'var(--color-heading)' }}
            >
              ¿Tenés un proceso parecido?
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Trabajamos con empresas de Rosario y la región.
              Si hay un proceso que se hace a mano, lo analizamos y te decimos
              qué se puede automatizar.
            </p>
            <Button href="/contacto" variant="primary">
              Pedir diagnóstico →
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
