import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react'
import { SERVICES } from '@/models/services.data'
import { ParticleCanvas } from '../components/ParticleCanvas'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ─── Hero — texto visible primero, desaparece al scrollear ────────────────
//
// Cambio respecto a versión anterior:
//   • Headline + CTAs VISIBLES desde el inicio (no revelan con scroll)
//   • Al scrollear, el contenido DESAPARECE y queda solo el canvas
//   • Canvas react al mouse desde window (no solo hover directo sobre canvas)
//
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })

  // Scroll hint: desaparece rápido (mismo que antes)
  const hintOpacity = useTransform(smooth, [0, 0.10], [1, 0])
  const hintY       = useTransform(smooth, [0, 0.10], [0, -12])

  // Headline: VISIBLE desde el inicio, desaparece al scrollear
  const headlineOpacity = useTransform(smooth, [0.05, 0.42], [1, 0])
  const headlineY       = useTransform(smooth, [0.05, 0.42], [0, -48])

  // CTAs: desaparecen un poco antes que el headline
  const ctaOpacity = useTransform(smooth, [0, 0.32], [1, 0])
  const ctaY       = useTransform(smooth, [0, 0.32], [0, -24])

  // Canvas: escala sutil igual que antes
  const canvasScale = useTransform(smooth, [0, 1], [1, 1.04])

  return (
    <div ref={containerRef} style={{ height: '170vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {/* Canvas — graph interactivo, mouse desde window */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: canvasScale, transformOrigin: 'center' }}
        >
          <ParticleCanvas />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
          style={{ opacity: hintOpacity, y: hintY }}
        >
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
            scroll
          </span>
          <div
            className="w-px h-10"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </motion.div>

        {/* Headline + CTAs — visibles desde el inicio */}
        <div
          className="absolute inset-0 flex flex-col justify-center z-10"
          style={{ paddingTop: '4rem' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full">

            {/* Headline */}
            <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
              <h1
                className="text-display"
                style={{
                  fontSize: 'clamp(3.4rem, 8.5vw, 8.5rem)',
                  color: 'var(--color-heading)',
                  maxWidth: '14ch',
                }}
              >
                Automatización
                <br />
                <span style={{ color: 'var(--color-accent)' }}>
                  operativa.
                </span>
              </h1>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <Button href="/contacto" variant="primary">
                Diagnóstico gratuito →
              </Button>
              <Button href="/servicios" variant="outline">
                Servicios
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Letras de SERVICES ────────────────────────────────────────────────────
// S(keep) E R V(keep) I C(keep) E S  → al colapsar: S V C quedan juntas
const WORD_LETTERS = [
  { id: 's1', char: 'S', keep: true  },
  { id: 'e1', char: 'E', keep: false },
  { id: 'r1', char: 'R', keep: false },
  { id: 'v1', char: 'V', keep: true  },
  { id: 'i1', char: 'I', keep: false },
  { id: 'c1', char: 'C', keep: true  },
  { id: 'e2', char: 'E', keep: false },
  { id: 's2', char: 'S', keep: false },
]

// ─── Servicios — sticky navy ───────────────────────────────────────────────
//
// Animación de letras:
//   • Al cruzar scroll 14%, E R I E S salen con AnimatePresence popLayout
//   • S, V, C tienen layout prop y se deslizan juntas al cerrarse los huecos
//   • El intro completo desaparece después, igual que antes
//
function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })

  // Umbral discreto: cruza 0.06 → colapsa letras (early, para maximizar el hold de SVC)
  const [lettersCollapsed, setLettersCollapsed] = useState(false)
  useEffect(() => {
    return smooth.on('change', (v) => setLettersCollapsed(v > 0.06))
  }, [smooth])

  // Intro completo: se mantiene hasta 0.30, luego fade 0.30 → 0.46
  // SVC es visible todo ese rango (0.06 → 0.30) = 24% de 280vh ≈ 67vh de recorrido
  const introOpacity = useTransform(smooth, [0, 0.30, 0.46], [1, 1, 0])
  const introScale   = useTransform(smooth, [0, 0.46], [1, 0.78])

  // Lista de servicios: aparece después del fade del intro
  const listOpacity = useTransform(smooth, [0.42, 0.66], [0, 1])
  const listY       = useTransform(smooth, [0.42, 0.68], [48, 0])

  const letterStyle: React.CSSProperties = {
    display: 'inline-block',
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(7rem, 22vw, 22rem)',
    color: 'oklch(0.35 0.12 263)',
    letterSpacing: '-0.04em',
    lineHeight: 1,
    userSelect: 'none',
  }

  const visibleLetters = WORD_LETTERS.filter(({ keep }) => !lettersCollapsed || keep)

  return (
    <div ref={containerRef} style={{ height: '280vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflow: 'hidden',
          backgroundColor: 'var(--color-brand)',
        }}
      >
        {/* Canvas de partículas claras sobre navy */}
        <div className="absolute inset-0 opacity-60">
          <ParticleCanvas
            particleColor="240, 238, 230"
            particleOpacity={0.35}
            connectionOpacity={0.08}
          />
        </div>

        {/* Intro: SERVICES → SVC por colapso de letras */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: introOpacity, scale: introScale }}
        >
          {/* Las letras en flex — cada una con layout para animar posición */}
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleLetters.map(({ id, char }) => (
                <motion.span
                  key={id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout:  { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.20 },
                  }}
                  style={letterStyle}
                >
                  {char}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Lista de servicios */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center z-20 pt-16"
          style={{ opacity: listOpacity, y: listY }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-10"
              style={{ color: 'oklch(0.48 0.06 255)' }}
            >
              Servicios
            </p>

            <div>
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={false}
                  transition={{ duration: 0.35, delay: i * 0.06, ease }}
                >
                  <Link
                    to="/servicios"
                    className="group flex items-center justify-between py-4 border-b transition-all duration-200"
                    style={{ borderColor: 'oklch(0.28 0.09 263)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.40 0.12 255)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.28 0.09 263)'
                    }}
                  >
                    <span
                      className="font-display font-bold transition-colors duration-200"
                      style={{
                        fontSize: 'clamp(1.4rem, 3.2vw, 3rem)',
                        color: 'oklch(0.88 0.010 87)',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'oklch(0.940 0.012 87)'
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'oklch(0.88 0.010 87)'
                      }}
                    >
                      {service.name}
                    </span>
                    <span
                      className="font-mono text-sm translate-x-0 group-hover:translate-x-2 transition-transform duration-200 hidden sm:block"
                      style={{ color: 'oklch(0.48 0.06 255)' }}
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div
                className="border-b"
                style={{ borderColor: 'oklch(0.28 0.09 263)' }}
              />
            </div>

            <div className="mt-10">
              <Link
                to="/servicios"
                className="font-mono text-sm transition-colors duration-150"
                style={{ color: 'oklch(0.48 0.06 255)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'oklch(0.940 0.012 87)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'oklch(0.48 0.06 255)'
                }}
              >
                Ver todos los servicios →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Manifiesto — tipografía pura ────────────────────────────────────────
function ManifestoSection() {
  return (
    <section
      className="min-h-[90dvh] flex flex-col justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-28">
        <motion.p
          className="text-headline"
          style={{
            fontSize: 'clamp(2rem, 4.6vw, 5rem)',
            color: 'var(--color-heading)',
            maxWidth: '22ch',
          }}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
        >
          Los sistemas deberían trabajar cuando el equipo{' '}
          <span style={{ color: 'var(--color-accent)' }}>no puede.</span>
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/nosotros"
            className="font-mono text-sm transition-colors duration-150"
            style={{ color: 'var(--color-muted)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-brand)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted)'
            }}
          >
            Nuestro manifiesto →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Casos — sección en home (reemplaza la pestaña de nav) ────────────────
const CASOS_DATA = [
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

function CasosSection() {
  return (
    <section style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-24">

        <motion.div
          className="flex items-end justify-between mb-16 pb-6 border-b"
          style={{ borderColor: 'var(--color-border)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            className="text-headline"
            style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              color: 'var(--color-heading)',
            }}
          >
            Casos.
          </h2>
          <span
            className="font-mono text-xs pb-1"
            style={{ color: 'var(--color-muted)' }}
          >
            En construcción
          </span>
        </motion.div>

        <div>
          {CASOS_DATA.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 py-8 border-b items-start"
              style={{ borderColor: 'var(--color-border)', filter: 'blur(0)' }}
            >
              <div style={{ filter: 'blur(1.5px)', opacity: 0.6 }}>
                <p
                  className="font-display font-bold text-xl mb-2"
                  style={{ color: 'var(--color-heading)', letterSpacing: '-0.02em' }}
                >
                  {c.industry}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-muted)', maxWidth: '60ch' }}
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
              <span
                className="font-mono text-xs px-3 py-1.5 shrink-0 self-start mt-1"
                style={{
                  backgroundColor: 'var(--color-surface-2)',
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                PRÓXIMAMENTE
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button href="/contacto" variant="outline">
            Sé el primer caso publicado →
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CTA — panel navy ─────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      className="min-h-[60dvh] flex flex-col justify-center"
      style={{ backgroundColor: 'var(--color-brand)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <h2
            className="text-headline mb-10"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 5.5rem)',
              color: 'var(--color-on-brand)',
            }}
          >
            Diagnóstico gratuito.
            <br />
            <span style={{ color: 'oklch(0.58 0.12 255)' }}>
              Sin compromiso.
            </span>
          </h2>

          <Link
            to="/contacto"
            className="inline-flex items-center font-sans font-semibold text-sm px-8 py-4 transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-on-brand)',
              color: 'var(--color-brand)',
              borderRadius: 'var(--radius-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            Pedirlo ahora →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ManifestoSection />
      <CasosSection />
      <CTASection />
    </>
  )
}
