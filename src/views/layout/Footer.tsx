import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '@/models/navigation.data'
import { CONTACT_EMAIL, LINKEDIN_URL, LOCATION } from '@/models/contact.data'

const FOOTER_LINK_CLASS =
  'block font-sans text-sm font-medium transition-colors duration-150 ' +
  'text-[oklch(0.72_0.04_265)] hover:text-[var(--color-on-brand)] outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--color-brand)' }} data-nav-dark>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-[calc(2.5rem+env(safe-area-inset-bottom))] md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display font-bold text-2xl tracking-tight mb-5 block outline-none
                focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
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
              style={{ color: 'oklch(0.60 0.05 265)' }}
            >
              {LOCATION}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: 'oklch(0.60 0.05 265)' }}
            >
              Páginas
            </p>
            <nav className="space-y-3" aria-label="Navegación del footer">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} to={item.href} className={FOOTER_LINK_CLASS}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: 'oklch(0.60 0.05 265)' }}
            >
              Contacto
            </p>
            <div className="space-y-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK_CLASS}>
                {CONTACT_EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK_CLASS}
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
          <span className="font-sans text-xs" style={{ color: 'oklch(0.60 0.05 265)' }}>
            © {year} FREEOPS. Todos los derechos reservados.
          </span>
          <Link
            to="/privacidad"
            className="font-sans text-xs transition-colors duration-150
              text-[oklch(0.60_0.05_265)] hover:text-[var(--color-on-brand)] outline-none
              focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
              focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
          >
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
