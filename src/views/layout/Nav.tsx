import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { NAV_ITEMS } from '@/models/navigation.data'

export function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        zIndex: 50,
        transition: 'border-color 0.3s ease',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-tight"
          style={{ color: 'var(--color-brand)' }}
        >
          FREEOPS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative font-sans text-sm font-medium py-1 transition-colors duration-150"
                style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-muted)' }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-heading)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--color-muted)'
                }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--color-brand)' }}
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
            className="font-sans font-semibold text-sm px-5 py-2.5 transition-all duration-150"
            style={{
              backgroundColor: 'var(--color-brand)',
              color: 'var(--color-on-brand)',
              borderRadius: 'var(--radius-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand-mid)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand)'
            }}
          >
            Diagnóstico gratuito
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span
            className="block h-0.5 w-5 transition-all duration-200 origin-center"
            style={{
              backgroundColor: 'var(--color-brand)',
              transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block h-0.5 transition-all duration-200"
            style={{
              backgroundColor: 'var(--color-brand)',
              width: menuOpen ? '0' : '20px',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-0.5 w-5 transition-all duration-200 origin-center"
            style={{
              backgroundColor: 'var(--color-brand)',
              transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block font-sans font-medium text-base py-3 border-b transition-colors duration-150"
                  style={{
                    color: pathname === item.href ? 'var(--color-brand)' : 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/contacto"
                  className="block w-full text-center font-sans font-semibold text-sm px-5 py-3"
                  style={{
                    backgroundColor: 'var(--color-brand)',
                    color: 'var(--color-on-brand)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  Diagnóstico gratuito
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
