import { useEffect, useRef } from 'react'
import { LAND_DOTS } from './landDots'
import { COUNTRIES, COUNTRY_ARCS } from './globeMarkers'
import { CountryMarkers, type CountryMarkersHandle } from './CountryMarkers'

type Vec = [number, number, number]

function sphere(lat: number, lng: number): Vec {
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

/** A dotted-continents globe on a 2D canvas (no WebGL). The WebGL fallback. */
export function Globe2D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const markersRef = useRef<CountryMarkersHandle>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dots: Vec[] = []
    for (let i = 0; i < LAND_DOTS.length; i += 3) {
      dots.push([LAND_DOTS[i], LAND_DOTS[i + 1], LAND_DOTS[i + 2]])
    }
    const countryVecs = COUNTRIES.map((c) => sphere(c.lat, c.lng))

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

      if (!state.dragging && !pausedRef.current) {
        state.ry += (reduce ? 0 : 0.0016) + state.vy
        state.vy *= 0.94
      }

      ctx.clearRect(0, 0, W, H)

      const grad = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.25)
      grad.addColorStop(0, 'rgba(43,217,255,0.05)')
      grad.addColorStop(1, 'rgba(32,33,36,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < dots.length; i += 1) {
        const p = project(dots[i], cx, cy, R)
        if (p.z <= 0.03) continue
        ctx.fillStyle = `rgba(150,162,178,${0.16 + 0.5 * p.z})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.lineWidth = 1.4
      for (let k = 0; k < COUNTRY_ARCS.length; k += 1) {
        const a = countryVecs[COUNTRY_ARCS[k][0]]
        const b = countryVecs[COUNTRY_ARCS[k][1]]
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

      markersRef.current?.update(
        countryVecs.map((v) => {
          const p = project(v, cx, cy, R)
          return { x: p.x, y: p.y, visible: p.z > 0.05 }
        }),
      )

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
        aria-label="Interactive globe of AMP offices in the UAE, Saudi Arabia, and Spain"
      />
      <CountryMarkers
        ref={markersRef}
        onActiveChange={(i) => {
          pausedRef.current = i != null
        }}
      />
    </div>
  )
}
