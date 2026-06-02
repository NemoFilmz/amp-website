import { useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Container, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { PHILOSOPHY } from '../data/site'

/* ------------------------------------------------------------------ */
/* Drifting particle field (cyan + white, faint)                       */
/* ------------------------------------------------------------------ */

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  cyan: boolean
}

const PARTICLE_COUNT = 60
const LINK_DISTANCE = 150

function ParticleField({ reduce }: { reduce: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let particles: Particle[] = []

    const seed = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.5,
        cyan: Math.random() > 0.55,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      const rect = parent
        ? parent.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight }
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (particles.length === 0) seed()
    }

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height)

      // hairline links between near particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.18
            ctx.strokeStyle = `rgba(43,217,255,${alpha.toFixed(3)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // dots
      for (const p of particles) {
        if (animate) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
          if (p.y < -20) p.y = height + 20
          if (p.y > height + 20) p.y = -20
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.cyan
          ? 'rgba(43,217,255,0.18)'
          : 'rgba(244,245,247,0.18)'
        ctx.fill()
      }
    }

    const loop = () => {
      draw(true)
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      // single static frame, no animation loop
      draw(false)
    } else {
      frame = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  )
}

/* ------------------------------------------------------------------ */
/* Render a single philosophy line, optionally accenting a phrase      */
/* ------------------------------------------------------------------ */

const ACCENT = 'national vision'

function renderLine(line: string): ReactNode {
  const idx = line.indexOf(ACCENT)
  if (idx === -1) return line
  const before = line.slice(0, idx)
  const after = line.slice(idx + ACCENT.length)
  return (
    <>
      {before}
      <span className="text-amp">{ACCENT}</span>
      {after}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Philosophy() {
  const reduce = useReducedMotion() ?? false

  return (
    <section
      id="philosophy"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-base grain scroll-mt-24"
    >
      {/* Animated drifting particle field */}
      <ParticleField reduce={reduce} />

      {/* Radial cyan glow for depth + text contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 18% 38%, rgba(43,217,255,0.12), transparent 62%), radial-gradient(80% 90% at 100% 100%, rgba(8,9,11,0.85), transparent 55%), linear-gradient(180deg, rgba(8,9,11,0.35) 0%, rgba(8,9,11,0.78) 100%)',
        }}
      />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Eyebrow index={7} total={10}>{PHILOSOPHY.eyebrow}</Eyebrow>
          <span aria-hidden className="hidden h-px w-10 bg-line-strong sm:inline-block" />
          <span className="eyebrow text-muted">{PHILOSOPHY.title}</span>
        </div>

        <div className="mt-10 space-y-2 md:mt-12 md:space-y-3">
          {PHILOSOPHY.lines.map((line, i) => (
            <Reveal key={line} delay={i * 0.12} y={28}>
              <h2 className="font-display tracking-tighter leading-[1.06] text-primary text-[clamp(1.8rem,5.2vw,4rem)]">
                {renderLine(line)}
              </h2>
            </Reveal>
          ))}
        </div>

        <Reveal delay={PHILOSOPHY.lines.length * 0.12 + 0.1} y={24}>
          <p className="mt-10 max-w-3xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
            {PHILOSOPHY.body}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
