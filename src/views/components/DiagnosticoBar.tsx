import { Link, useLocation } from 'react-router-dom'

export function DiagnosticoBar() {
  const { pathname } = useLocation()
  if (pathname === '/contacto') return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0"
      style={{
        backgroundColor: 'var(--color-brand)',
        borderTop: '1px solid oklch(0.28 0.09 263)',
        zIndex: 40,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between gap-4">
        <p className="font-sans text-sm hidden sm:block" style={{ color: 'oklch(0.72 0.04 265)' }}>
          Diagnóstico gratuito de automatización — sin compromiso.
        </p>
        <Link
          to="/contacto"
          className="font-sans font-semibold text-sm px-5 py-2 shrink-0 transition-all duration-150"
          style={{
            backgroundColor: 'var(--color-on-brand)',
            color: 'var(--color-brand)',
            borderRadius: 'var(--radius-sm)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'oklch(0.94 0.008 265)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-on-brand)')}
        >
          Pedilo gratis →
        </Link>
      </div>
    </div>
  )
}
