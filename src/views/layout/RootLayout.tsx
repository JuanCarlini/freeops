import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { DiagnosticoBar } from '../components/DiagnosticoBar'
import { CustomCursor } from '../components/CustomCursor'

export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <CustomCursor />
      <Nav />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <Footer />
      <DiagnosticoBar />
    </div>
  )
}
