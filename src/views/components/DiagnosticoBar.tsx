import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'

/**
 * CTA global de conversión.
 * Desktop: barra fija inferior discreta.
 * Mobile: pill flotante que aparece recién después del primer viewport,
 * para no competir con el CTA del hero.
 * Oculta en /contacto (la página ya ES la conversión).
 */
export function DiagnosticoBar() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setPastHero(y > window.innerHeight * 0.85)
  })

  if (pathname === '/contacto') return null

  return (
    <>
      {/* Desktop */}
      <div
        className="hidden md:block fixed bottom-0 left-0 right-0"
        style={{
          backgroundColor: 'var(--color-brand)',
          borderTop: '1px solid oklch(0.28 0.09 263)',
          zIndex: 40,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between gap-4">
          <p className="font-sans text-sm" style={{ color: 'oklch(0.78 0.03 265)' }}>
            Diagnóstico gratuito de automatización, sin compromiso.
          </p>
          <Link
            to="/contacto"
            className="font-sans font-semibold text-sm px-5 py-2 shrink-0 transition-colors duration-150
              bg-[var(--color-on-brand)] text-[var(--color-brand)] rounded-[var(--radius-sm)]
              hover:bg-[oklch(0.88_0.012_87)] active:scale-[0.98]
              outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
              focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
          >
            Pedir diagnóstico →
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            className="md:hidden fixed right-4 z-40"
            style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contacto"
              className="inline-flex items-center font-sans font-semibold text-sm px-5 py-3 transition-colors duration-150
                bg-[var(--color-brand)] text-[var(--color-on-brand)] rounded-[var(--radius-md)]
                hover:bg-[var(--color-brand-mid)] active:scale-[0.98]
                outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              style={{ boxShadow: '0 8px 24px oklch(0.20 0.12 263 / 0.25)' }}
            >
              Pedir diagnóstico →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
