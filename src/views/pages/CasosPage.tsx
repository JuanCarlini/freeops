import { motion } from 'motion/react'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const COMING_SOON = [
  {
    id: 'cs-01',
    industry: 'Comercio y distribución',
    teaser: 'Automatización de seguimiento de pedidos y notificaciones a clientes.',
    tags: ['n8n', 'WhatsApp API', 'CRM'],
  },
  {
    id: 'cs-02',
    industry: 'Servicios profesionales',
    teaser: 'Pipeline de onboarding de clientes que reduce el tiempo manual en un 80%.',
    tags: ['Power Automate', 'Dataverse', 'Outlook'],
  },
  {
    id: 'cs-03',
    industry: 'Logística',
    teaser: 'Sistema de procesamiento de remitos y carga automática en ERP.',
    tags: ['Claude API', 'Python', 'SAP'],
  },
  {
    id: 'cs-04',
    industry: 'Finanzas y contabilidad',
    teaser: 'Extracción y clasificación automática de facturas con IA.',
    tags: ['Claude API', 'n8n', 'Google Sheets'],
  },
]

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
            {COMING_SOON.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="relative overflow-hidden p-8 border"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {/* Blur overlay (coming soon) */}
                <div
                  className="absolute inset-0 flex items-end pb-6 px-8"
                  style={{ backdropFilter: 'blur(2px)', zIndex: 2 }}
                >
                  <span
                    className="font-mono text-xs px-3 py-1.5"
                    style={{
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    PRÓXIMAMENTE
                  </span>
                </div>

                {/* Content */}
                <div className="relative" style={{ zIndex: 1 }}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {c.industry}
                  </p>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {c.teaser}
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
                </div>
              </motion.div>
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
              Sé el primer caso publicado.
            </h2>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Trabajamos con empresas de Rosario y la región.
              Si tenés un proceso que se hace a mano, podemos automatizarlo.
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
