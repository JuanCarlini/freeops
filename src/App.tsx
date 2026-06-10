import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { RootLayout } from './views/layout/RootLayout'
import { HomePage } from './views/pages/HomePage'
import { ServiciosPage } from './views/pages/ServiciosPage'
import { NosotrosPage } from './views/pages/NosotrosPage'
import { CasosPage } from './views/pages/CasosPage'
import { ContactoPage } from './views/pages/ContactoPage'
import { PrivacidadPage } from './views/pages/PrivacidadPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'servicios', element: <ServiciosPage /> },
      { path: 'nosotros', element: <NosotrosPage /> },
      { path: 'casos', element: <CasosPage /> },
      { path: 'contacto', element: <ContactoPage /> },
      { path: 'privacidad', element: <PrivacidadPage /> },
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
  return <RouterProvider router={router} />
}
