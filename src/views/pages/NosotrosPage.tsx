import { motion } from 'motion/react'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 as number },
  transition: { duration: 0.6, delay, ease },
})

const MANIFESTO_PARAGRAPHS = [
  'Las operaciones de una empresa están llenas de trabajo que no debería hacerse a mano. Tickets que se responden igual siempre. Facturas que se procesan igual siempre. Datos que se copian de un sistema a otro, igual, siempre.',
  'Ese trabajo no requiere criterio humano. Requiere un sistema.',
  'FREEOPS construye ese sistema.',
  'No vendemos automatización como concepto. Vendemos operaciones que funcionan: con logs, con manejo de errores, con documentación, con handoff real. El sistema trabaja cuando el equipo humano no puede, no quiere o no debería.',
  'La IA entra donde hay fricción real. No en el pitch, no en el caso de uso inventado, no donde "está de moda". Entra donde un proceso se rompe todos los días a las 9 de la mañana.',
  'El resultado no es código. Es una operación que ya no necesita atención.',
]

const STACK = [
  'n8n', 'Power Automate', 'Claude API', 'Next.js', 'TypeScript',
  'Supabase', 'WhatsApp Business API', 'Chatwoot', 'Microsoft Dataverse',
]

const VALUES = [
  {
    n: '01',
    title: 'Automatizamos lo que existe, no lo que debería existir.',
    body: 'El diagnóstico empieza con el proceso real, no con el proceso ideal. Si hay fricción, la eliminamos. Si no la hay, no inventamos soluciones.',
  },
  {
    n: '02',
    title: 'IA donde hay fricción, no donde está de moda.',
    body: 'Claude, GPT, modelos locales: son herramientas. Las usamos cuando resuelven algo concreto. No las usamos para el pitch.',
  },
  {
    n: '03',
    title: 'Sin dependencias permanentes.',
    body: 'Todo lo que construimos viene con documentación, handoff y capacitación. El sistema es del cliente. Siempre.',
  },
  {
    n: '04',
    title: 'Sistemas completos, no scripts aislados.',
    body: 'Manejo de errores, logs, reintentos, alertas: parte del entregable, no un extra. Un sistema que falla en silencio no es un sistema.',
  },
  {
    n: '05',
    title: 'Medimos lo que hacemos.',
    body: 'Sin métricas no hay automatización, hay esperanza. Cada proyecto define qué se mide antes de empezar.',
  },
]

function ManifestoSection() {
  return (
    <section
      className="pt-32 pb-20 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div {...fadeUp(0)}>
          <h1
            className="text-headline mb-14"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
              color: 'var(--color-heading)',
            }}
          >
            Liberar operaciones.
          </h1>
        </motion.div>

        <div className="space-y-6">
          {MANIFESTO_PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp(i * 0.06)}
              className="text-lg leading-relaxed"
              style={{
                color: p === 'FREEOPS construye ese sistema.'
                  ? 'var(--color-heading)'
                  : 'var(--color-muted)',
                fontWeight: p === 'FREEOPS construye ese sistema.' ? 600 : 400,
                maxWidth: '60ch',
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderSection() {
  return (
    <section
      className="py-20 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.p
          className="font-mono text-xs uppercase tracking-widest mb-10"
          style={{ color: 'var(--color-muted)' }}
          {...fadeUp(0)}
        >
          Founder
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12">
          <div className="space-y-4">
            {[
              <>
                <strong style={{ color: 'var(--color-heading)', fontWeight: 600 }}>
                  Juan Andrés Carlini.
                </strong>{' '}
                Rosario, Argentina. Developer de automatización e IA con foco en integración
                de sistemas y agentes conversacionales.
              </>,
              'Antes de FREEOPS, cinco años construyendo sistemas de automatización bajo la marca personal Carlini: desde integraciones simples hasta arquitecturas completas con Power Automate, n8n, Claude API y WhatsApp Business.',
              'FREEOPS es la evolución de esa práctica: de desarrollador independiente a estudio con servicios sistematizados, metodología definida y entrega estandarizada.',
            ].map((text, i) => (
              <motion.p
                key={i}
                {...fadeUp(i * 0.08)}
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div {...fadeUp(0.25)} className="pt-2">
              <a
                href="https://portfolio.n8njuani.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--color-brand)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-brand)')}
              >
                Ver portfolio →
              </a>
            </motion.div>
          </div>

          {/* Stack panel */}
          <motion.div
            {...fadeUp(0.1)}
            className="border p-6 h-fit"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-muted)' }}
            >
              Stack
            </p>
            {STACK.map((tech) => (
              <div
                key={tech}
                className="font-mono text-xs py-2 border-b last:border-0 flex items-center gap-2"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <span style={{ color: 'var(--color-accent)' }}>›</span>
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.p
          className="font-mono text-xs uppercase tracking-widest mb-14"
          style={{ color: 'var(--color-muted)' }}
          {...fadeUp(0)}
        >
          Principios
        </motion.p>

        <div className="space-y-0">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.n}
              {...fadeUp(i * 0.07)}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 py-8 border-b last:border-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div
                className="font-display font-bold text-3xl"
                style={{ color: 'oklch(0.78 0.025 87)', lineHeight: 1 }}
              >
                {v.n}
              </div>
              <div>
                <h3
                  className="font-sans font-semibold text-lg mb-2"
                  style={{ color: 'var(--color-heading)' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {v.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16" {...fadeUp(0.2)}>
          <Button href="/contacto" variant="outline">
            Trabajemos juntos →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export function NosotrosPage() {
  return (
    <>
      <ManifestoSection />
      <FounderSection />
      <ValuesSection />
    </>
  )
}
