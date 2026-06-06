import { useEffect, useRef } from 'react'

type City = {
  name: string
  lat: number
  lng: number
  /** Label offset (px) and alignment, to fan out the close Gulf cities. */
  lx: number
  ly: number
  align: CanvasTextAlign
}

/** AMP offices. Index 0 (Abu Dhabi) is the hub the arcs spring from. */
const CITIES: City[] = [
  { name: 'ABU DHABI', lat: 24.453, lng: 54.366, lx: 0, ly: 22, align: 'center' },
  { name: 'DUBAI', lat: 25.204, lng: 55.27, lx: 8, ly: -16, align: 'left' },
  { name: 'RIYADH', lat: 24.713, lng: 46.675, lx: -8, ly: -16, align: 'right' },
  { name: 'BARCELONA', lat: 41.385, lng: 2.173, lx: 0, ly: -16, align: 'center' },
]
const ARCS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
]

type Vec = [number, number, number]

function sphere(lat: number, lng: number): Vec {
  // +Z faces the viewer at lng 0; east (+lng) maps to +X (right).
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]
}
const rotY = ([x, y, z]: Vec, a: number): Vec => {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [c * x + s * z, y, -s * x + c * z]
}
const rotX = ([x, y, z]: Vec, a: number): Vec => {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x, c * y - s * z, s * y + c * z]
}
function slerp(a: Vec, b: Vec, t: number): Vec {
  let dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  dot = Math.max(-1, Math.min(1, dot))
  const om = Math.acos(dot)
  if (om < 1e-6) return a
  const so = Math.sin(om)
  const k0 = Math.sin((1 - t) * om) / so
  const k1 = Math.sin(t * om) / so
  return [a[0] * k0 + b[0] * k1, a[1] * k0 + b[1] * k1, a[2] * k0 + b[2] * k1]
}

/** Evenly distributed points on the sphere (fibonacci) for the dotted globe. */
function fibonacciSphere(n: number): Vec[] {
  const pts: Vec[] = []
  const gr = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = (2 * Math.PI * i) / gr
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r])
  }
  return pts
}

/**
 * A dark, dotted 3D globe rendered on a 2D canvas (no WebGL). Auto-rotates,
 * and you can spin it by dragging or scrolling over it. AMP offices are
 * marked in amber with arcs from the Abu Dhabi hub.
 */
export function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dots = fibonacciSphere(1500)
    const cityVecs = CITIES.map((c) => sphere(c.lat, c.lng))

    // Start with the Gulf + Europe facing the viewer.
    const state = { rx: 0.5, ry: -0.5, vy: 0, dragging: false, lastX: 0, lastY: 0 }
    let raf = 0
    let W = 0
    let H = 0
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const project = (v: Vec, cx: number, cy: number, R: number) => {
      const r = rotX(rotY(v, state.ry), state.rx)
      return { x: cx + r[0] * R, y: cy - r[1] * R, z: r[2] }
    }

    const draw = () => {
      const cx = W / 2
      const cy = H / 2
      const R = Math.min(W, H) * 0.45

      if (!state.dragging) {
        state.ry += (reduce ? 0 : 0.0016) + state.vy
        state.vy *= 0.94
      }

      ctx.clearRect(0, 0, W, H)

      // soft glow behind the globe
      const grad = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.25)
      grad.addColorStop(0, 'rgba(43,217,255,0.05)')
      grad.addColorStop(1, 'rgba(32,33,36,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2)
      ctx.fill()

      // dotted sphere
      for (let i = 0; i < dots.length; i += 1) {
        const p = project(dots[i], cx, cy, R)
        const a = p.z > 0 ? 0.1 + 0.34 * p.z : 0.05 * (1 + p.z)
        if (a <= 0.02) continue
        ctx.fillStyle = `rgba(150,162,178,${a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.z > 0 ? 1.1 : 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      // arcs from the hub
      ctx.lineWidth = 1.4
      for (let k = 0; k < ARCS.length; k += 1) {
        const a = cityVecs[ARCS[k][0]]
        const b = cityVecs[ARCS[k][1]]
        ctx.beginPath()
        let started = false
        for (let t = 0; t <= 1.0001; t += 1 / 56) {
          const s = slerp(a, b, t)
          const lift = 1 + 0.2 * Math.sin(Math.PI * t)
          const p = project([s[0] * lift, s[1] * lift, s[2] * lift], cx, cy, R)
          if (p.z > -0.12) {
            if (!started) {
              ctx.moveTo(p.x, p.y)
              started = true
            } else ctx.lineTo(p.x, p.y)
          } else started = false
        }
        ctx.strokeStyle = 'rgba(249,192,12,0.55)'
        ctx.stroke()
      }

      // city markers + labels
      ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '1.5px'
      ctx.font = '600 11px system-ui, -apple-system, Segoe UI, sans-serif'
      for (let i = 0; i < CITIES.length; i += 1) {
        const c = CITIES[i]
        const p = project(cityVecs[i], cx, cy, R)
        if (p.z < -0.05) continue
        const fade = p.z < 0.12 ? Math.max(0, (p.z + 0.05) / 0.17) : 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(249,192,12,${0.3 * fade})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(249,192,12,${0.95 * fade})`
        ctx.fill()
        ctx.fillStyle = `rgba(244,245,247,${fade})`
        ctx.textAlign = c.align
        ctx.fillText(c.name, p.x + c.lx, p.y + c.ly)
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onDown = (e: PointerEvent) => {
      state.dragging = true
      state.lastX = e.clientX
      state.lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!state.dragging) return
      state.ry += (e.clientX - state.lastX) * 0.006
      state.rx = Math.max(-1.2, Math.min(1.2, state.rx + (e.clientY - state.lastY) * 0.006))
      state.lastX = e.clientX
      state.lastY = e.clientY
    }
    const onUp = (e: PointerEvent) => {
      state.dragging = false
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {
        /* pointer already released */
      }
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      state.vy += e.deltaY * 0.00012
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointerleave', onUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointerleave', onUp)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[440px] w-full md:h-[600px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="Interactive globe of AMP offices: Abu Dhabi, Dubai, Riyadh, Barcelona"
      />
    </div>
  )
}
