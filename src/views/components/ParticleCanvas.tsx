import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface ParticleCanvasProps {
  className?: string
  /** RGB triplet string, e.g. "0, 33, 87" */
  particleColor?: string
  particleOpacity?: number
  connectionOpacity?: number
}

const CONNECT_DIST  = 160   // wider connections = denser graph
const MOUSE_DIST    = 200   // mouse influence range
const MOUSE_FORCE   = 0.048 // stronger attraction
const FRICTION      = 0.975

export function ParticleCanvas({
  className,
  particleColor    = '0, 33, 87',
  particleOpacity  = 0.55,
  connectionOpacity = 0.20,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let w = 0
    let h = 0
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = w
      canvas!.height = h

      const count = Math.min(58, Math.floor((w * h) / 13_000))
      particles = Array.from({ length: count }, () => ({
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r:  Math.random() * 1.6 + 0.7,
      }))
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d2 = dx * dx + dy * dy
        const d  = Math.sqrt(d2)

        if (d < MOUSE_DIST && d > 1) {
          p.vx += (dx / d) * MOUSE_FORCE
          p.vy += (dy / d) * MOUSE_FORCE
        }

        p.vx *= FRICTION
        p.vy *= FRICTION
        p.x  += p.vx
        p.y  += p.vy

        if (p.x <= 0)  { p.x = 0;  p.vx =  Math.abs(p.vx) }
        if (p.x >= w)  { p.x = w;  p.vx = -Math.abs(p.vx) }
        if (p.y <= 0)  { p.y = 0;  p.vy =  Math.abs(p.vy) }
        if (p.y >= h)  { p.y = h;  p.vy = -Math.abs(p.vy) }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${particleColor}, ${particleOpacity})`
        ctx!.fill()
      }

      // Connections — O(n²) but n ≤ 58, ≈ 1600 ops/frame
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * connectionOpacity
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(${particleColor}, ${alpha})`
            ctx!.lineWidth = 0.65
            ctx!.stroke()
          }
        }
      }

      animId = requestAnimationFrame(frame)
    }

    // Listen on window so the canvas reacts even when UI overlays it
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    frame()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [particleColor, particleOpacity, connectionOpacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block w-full h-full${className ? ` ${className}` : ''}`}
    />
  )
}
