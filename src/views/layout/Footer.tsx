import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '@/models/navigation.data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--color-brand)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display font-bold text-2xl tracking-tight mb-5 block"
              style={{ color: 'var(--color-on-brand)' }}
            >
              FREEOPS
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'oklch(0.75 0.04 265)' }}
            >
              Automatización e inteligencia artificial para empresas
              que necesitan operar mejor, no más grande.
            </p>
            <p
              className="font-mono text-xs mt-4"
              style={{ color: 'oklch(0.55 0.06 265)' }}
            >
              Rosario, Santa Fe, Argentina
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: 'oklch(0.55 0.06 265)' }}
            >
              Páginas
            </p>
            <nav className="space-y-3" aria-label="Navegación del footer">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block font-sans text-sm font-medium transition-colors duration-150"
                  style={{ color: 'oklch(0.72 0.04 265)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-brand)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.04 265)')}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: 'oklch(0.55 0.06 265)' }}
            >
              Contacto
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hola@freeops.ai"
                className="block font-sans text-sm transition-colors duration-150"
                style={{ color: 'oklch(0.72 0.04 265)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.04 265)')}
              >
                hola@freeops.ai
              </a>
              <a
                href="https://linkedin.com/company/freeops"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-sm transition-colors duration-150"
                style={{ color: 'oklch(0.72 0.04 265)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-on-brand)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.04 265)')}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid oklch(0.30 0.07 263)' }}
        >
          <span className="font-sans text-xs" style={{ color: 'oklch(0.48 0.05 265)' }}>
            © {year} FREEOPS. Todos los derechos reservados.
          </span>
          <span className="font-mono text-xs" style={{ color: 'oklch(0.36 0.06 263)' }}>
            freeops.ai
          </span>
        </div>
      </div>
    </footer>
  )
}
