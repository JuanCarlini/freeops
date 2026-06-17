import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { RootLayout } from './views/layout/RootLayout'
import { HomePage } from './views/pages/HomePage'

// Páginas secundarias en chunks propios: el router espera el import antes de
// navegar (sin flash de loading) y el bundle inicial solo carga la home.
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'servicios',
        lazy: () =>
          import('./views/pages/ServiciosPage').then((m) => ({ Component: m.ServiciosPage })),
      },
      {
        path: 'nosotros',
        lazy: () =>
          import('./views/pages/NosotrosPage').then((m) => ({ Component: m.NosotrosPage })),
      },
      {
        path: 'casos',
        lazy: () => import('./views/pages/CasosPage').then((m) => ({ Component: m.CasosPage })),
      },
      {
        path: 'contacto',
        lazy: () =>
          import('./views/pages/ContactoPage').then((m) => ({ Component: m.ContactoPage })),
      },
      {
        path: 'privacidad',
        lazy: () =>
          import('./views/pages/PrivacidadPage').then((m) => ({ Component: m.PrivacidadPage })),
      },
      {
        path: '*',
        element: (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--color-accent)' }}>
              [ERR.404]
            </div>
            <h1
              className="text-4xl font-sans font-semibold mb-4"
              style={{ color: 'var(--color-heading)' }}
            >
              Página no encontrada.
            </h1>
            <Link to="/" className="font-mono text-sm" style={{ color: 'var(--color-muted)' }}>
              ← Volver al inicio
            </Link>
          </div>
        ),
      },
    ],
  },
])

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
      <Analytics />
    </MotionConfig>
  )
}
