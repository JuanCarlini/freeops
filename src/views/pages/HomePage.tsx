import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react'
import { SERVICES } from '@/models/services.data'
import { ParticleCanvas } from '../components/ParticleCanvas'
import { Button } from '../components/primitives/Button'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

// ─── Hero — sticky scroll, canvas interactive ──────────────────────────────
//
// Estructura:
//   • Outer div: height 170vh — define el espacio de scroll
//   • Inner div: position sticky, top 0, height 100dvh — se queda fijo
//   • Canvas: fondo de red de partículas (mouse-reactivo)
//   • Al scrollear: headline + CTAs se revelan sobre el canvas
//
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring sobre scroll raw
  const smooth = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })

  // Indicador "scroll ↓" desaparece rápido
  const hintOpacity = useTransform(smooth, [0, 0.12], [1, 0])
  const hintY       = useTransform(smooth, [0, 0.12], [0, -16])

  // Headline aparece al scrollear
  const headlineOpacity = useTransform(smooth, [0.10, 0.42], [0, 1])
  const headlineY       = useTransform(smooth, [0.10, 0.45], [52, 0])

  // CTAs aparecen levemente después
  const ctaOpacity = useTransform(smooth, [0.32, 0.60], [0, 1])
  const ctaY       = useTransform(smooth, [0.32, 0.60], [24, 0])

  // Canvas se escala sutilmente al avanzar
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
        {/* Canvas — ocupa todo el sticky, reacciona al mouse */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: canvasScale, transformOrigin: 'center' }}
        >
          <ParticleCanvas />
        </motion.div>

        {/* Indicador de scroll */}
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

        {/* Contenido principal: aparece al scrollear */}
        <div
          className="absolute inset-0 flex flex-col justify-center z-10"
          style={{ paddingTop: '4rem' }} // clearance del nav fijo
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full">

            {/* Headline */}
            <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
              <h1
                className="text-display"
                style={{
                  fontSize: 'clamp(3.4rem, 8vw, 8.5rem)',
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

// ─── Servicios — sticky navy, intro → lista ────────────────────────────────
//
// Entrada: palabra "SVC" enorme en el centro (interactiva via partículas blancas)
// Al scrollear: nombre de los 5 servicios aparecen en lista grande
//
function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })

  // Intro "SVC" desaparece
  const introOpacity = useTransform(smooth, [0, 0.22, 0.32], [1, 1, 0])
  const introScale   = useTransform(smooth, [0, 0.32], [1, 0.80])

  // Lista de servicios aparece
  const listOpacity  = useTransform(smooth, [0.28, 0.52], [0, 1])
  const listY        = useTransform(smooth, [0.28, 0.54], [48, 0])

  return (
    <div ref={containerRef} style={{ height: '220vh' }}>
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

        {/* Intro: "SVC" grande */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: introOpacity, scale: introScale }}
        >
          <span
            className="font-display font-bold select-none"
            style={{
              fontSize: 'clamp(7rem, 22vw, 22rem)',
              color: 'oklch(0.20 0.10 263)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            SVC
          </span>
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
              {/* Línea de cierre */}
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

// ─── Manifiesto — tipografía pura ─────────────────────────────────────────
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

// ─── CTA — panel navy minimalista ─────────────────────────────────────────
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
      <CTASection />
    </>
  )
}
