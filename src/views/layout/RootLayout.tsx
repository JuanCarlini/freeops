import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { DiagnosticoBar } from '../components/DiagnosticoBar'

export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Conteo anónimo de visitas: solo ruta + referrer, sin cookies ni
  // identificadores. /api/track lo reenvía a n8n (o lo descarta si no
  // hay webhook configurado). Ver README, sección Log de visitas.
  useEffect(() => {
    if (import.meta.env.DEV) return
    const payload = JSON.stringify({ path: pathname, referrer: document.referrer })
    navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
  }, [pathname])

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <DiagnosticoBar />
    </div>
  )
}
