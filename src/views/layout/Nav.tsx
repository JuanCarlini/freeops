import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react'
import { NAV_ITEMS } from '@/models/navigation.data'

/**
 * true cuando una sección marcada con [data-nav-dark] cruza la franja
 * superior del viewport (la banda que ocupa el nav). Permite que el header
 * cambie a tema navy sobre las secciones oscuras en vez de flotar en crema.
 */
function useNavDark() {
  const { pathname } = useLocation()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const intersecting = new Set<Element>()

    const connect = () => {
      observer?.disconnect()
      intersecting.clear()
      const sections = document.querySelectorAll('[data-nav-dark]')
      if (sections.length === 0) {
        setDark(false)
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) intersecting.add(e.target)
            else intersecting.delete(e.target)
          }
          setDark(intersecting.size > 0)
        },
        // Solo cuenta la franja superior de 64px (la altura del nav)
        { rootMargin: `0px 0px ${-(window.innerHeight - 64)}px 0px`, threshold: 0 }
      )
      sections.forEach((s) => observer!.observe(s))
    }

    connect()
    window.addEventListener('resize', connect)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', connect)
    }
  }, [pathname])

  return dark
}

export function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionDark = useNavDark()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 32))

  // El drawer abierto fuerza tema claro para que panel y header coincidan
  const dark = sectionDark && !menuOpen

  // Cierra el menú al navegar: ajuste de estado durante render (sin efecto),
  // cubre clicks, back/forward y cualquier otra causa de cambio de ruta
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setMenuOpen(false)
  }

  // Drawer abierto: bloquea el scroll del body y cierra con Escape
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const burgerColor = dark ? 'var(--color-on-brand)' : 'var(--color-brand)'

  return (
    <motion.header
      className="fixed top-0 left-0 right-0"
      style={{
        backgroundColor: dark ? 'var(--color-brand)' : 'var(--color-bg)',
        borderBottom: `1px solid ${
          scrolled
            ? dark
              ? 'oklch(0.30 0.09 263)'
              : 'var(--color-border)'
            : 'transparent'
        }`,
        zIndex: 50,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo: FREE + OPS */}
        <Link
          to="/"
          className="font-display text-xl tracking-tight select-none outline-none
            focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
            focus-visible:ring-offset-2"
          style={{ fontWeight: 800, lineHeight: 1 }}
        >
          <span
            className="transition-colors duration-300"
            style={{ color: dark ? 'var(--color-on-brand)' : 'var(--color-heading)' }}
          >
            FREE
          </span>
          <span
            className="transition-colors duration-300"
            style={{ color: dark ? 'oklch(0.64 0.13 255)' : 'var(--color-accent)' }}
          >
            OPS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            const linkClass = dark
              ? isActive
                ? 'text-[var(--color-on-brand)]'
                : 'text-[oklch(0.72_0.04_265)] hover:text-[var(--color-on-brand)]'
              : isActive
                ? 'text-[var(--color-brand)]'
                : 'text-[var(--color-muted)] hover:text-[var(--color-heading)]'
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative font-sans text-sm font-medium py-1 transition-colors duration-150 outline-none
                  focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                  focus-visible:ring-offset-2 ${linkClass}`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5"
                    style={{
                      backgroundColor: dark ? 'var(--color-on-brand)' : 'var(--color-brand)',
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contacto"
            className={`font-sans font-semibold text-sm px-5 py-2.5 rounded-[var(--radius-md)]
              transition-colors duration-300 outline-none active:scale-[0.98]
              focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 ${
                dark
                  ? 'bg-[var(--color-on-brand)] text-[var(--color-brand)] hover:bg-[oklch(0.88_0.012_87)] focus-visible:ring-offset-[var(--color-brand)]'
                  : 'bg-[var(--color-brand)] text-[var(--color-on-brand)] hover:bg-[var(--color-brand-mid)] focus-visible:ring-offset-[var(--color-bg)]'
              }`}
          >
            Diagnóstico gratuito
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2 outline-none
            focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-[var(--radius-sm)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span
            className="block h-0.5 w-5 transition-all duration-200 origin-center"
            style={{
              backgroundColor: burgerColor,
              transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-0.5 transition-all duration-200"
            style={{
              backgroundColor: burgerColor,
              width: menuOpen ? '0' : '20px',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 transition-all duration-200 origin-center"
            style={{
              backgroundColor: burgerColor,
              transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile drawer + scrim */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="scrim"
              className="md:hidden fixed inset-0 top-16"
              style={{ backgroundColor: 'oklch(0.18 0.10 263 / 0.45)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden relative"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div className="max-w-7xl mx-auto px-6 py-5">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block font-display font-bold text-lg py-3.5 transition-colors duration-150 outline-none
                      focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                    style={{
                      color:
                        pathname === item.href
                          ? 'var(--color-accent)'
                          : 'var(--color-heading)',
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-5 pb-2">
                  <Link
                    to="/contacto"
                    className="block w-full text-center font-sans font-semibold text-sm px-5 py-3.5
                      bg-[var(--color-brand)] text-[var(--color-on-brand)] rounded-[var(--radius-md)]
                      hover:bg-[var(--color-brand-mid)] active:scale-[0.98] transition-colors outline-none
                      focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                  >
                    Diagnóstico gratuito
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
