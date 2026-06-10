import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
}

interface ParticleCanvasProps {
  className?: string
  /** RGB triplet string, e.g. "0, 33, 87" */
  particleColor?: string
  particleOpacity?: number
  connectionOpacity?: number
}

const CONNECT_DIST  = 160
const MOUSE_DIST    = 200
const MOUSE_FORCE   = 0.048
const FRICTION      = 0.975
const EXPLODE_DIST  = 130
const EXPLODE_FORCE = 9
const SPAWN_INTERVAL_MIN = 300
const SPAWN_BATCH = 4
const SPAWN_INTERVAL_MAX = 700
const FADE_SPEED    = 0.018

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animId = 0
    let running = false
    let w = 0
    let h = 0
    let dpr = 1
    let particles: Particle[] = []
    let maxParticles = 58
    let spawnTimer: ReturnType<typeof setTimeout> | null = null
    const mouse = { x: -9999, y: -9999 }

    function makeParticle(fadeIn = false): Particle {
      return {
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r:  Math.random() * 1.6 + 0.7,
        opacity: fadeIn ? 0 : particleOpacity,
      }
    }

    function scheduleSpawn() {
      if (reduceMotion) return
      const delay = SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN)
      spawnTimer = setTimeout(() => {
        for (let i = 0; i < SPAWN_BATCH; i++) {
          if (particles.length < maxParticles) {
            particles.push(makeParticle(true))
          } else {
            // replace a random existing particle so fresh ones always appear
            particles[Math.floor(Math.random() * particles.length)] = makeParticle(true)
          }
        }
        scheduleSpawn()
      }, delay)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      maxParticles = Math.min(58, Math.floor((w * h) / 13_000))
      particles = Array.from({ length: maxParticles }, () => makeParticle(false))
    }

    function draw(applyPhysics: boolean) {
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        if (applyPhysics) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d  = Math.sqrt(dx * dx + dy * dy)

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

          if (p.opacity < particleOpacity) {
            p.opacity = Math.min(particleOpacity, p.opacity + FADE_SPEED)
          }
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${particleColor}, ${p.opacity})`
        ctx!.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            const pairOpacity = Math.min(a.opacity, b.opacity)
            const alpha = (1 - d / CONNECT_DIST) * connectionOpacity * (pairOpacity / particleOpacity)
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(${particleColor}, ${alpha})`
            ctx!.lineWidth = 0.65
            ctx!.stroke()
          }
        }
      }
    }

    function frame() {
      draw(true)
      animId = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      animId = requestAnimationFrame(frame)
    }

    function stop() {
      if (!running) return
      running = false
      cancelAnimationFrame(animId)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const onExplode = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      for (const p of particles) {
        const dx = p.x - cx
        const dy = p.y - cy
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < EXPLODE_DIST && d > 0.5) {
          const strength = (1 - d / EXPLODE_DIST) * EXPLODE_FORCE
          p.vx += (dx / d) * strength
          p.vy += (dy / d) * strength
        }
      }
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(false)
    })
    ro.observe(canvas)
    resize()

    if (reduceMotion) {
      draw(false)
    } else {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      )
      io.observe(canvas)

      window.addEventListener('mousemove', onMove, { passive: true })
      window.addEventListener('mouseleave', onLeave)
      window.addEventListener('click', onExplode)
      scheduleSpawn()

      return () => {
        stop()
        io.disconnect()
        ro.disconnect()
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseleave', onLeave)
        window.removeEventListener('click', onExplode)
        if (spawnTimer) clearTimeout(spawnTimer)
      }
    }

    return () => {
      ro.disconnect()
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
