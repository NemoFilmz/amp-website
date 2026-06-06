import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type City = { name: string; lat: number; lng: number; transform: string }

/** AMP offices. Index 0 (Abu Dhabi) is the hub the arcs spring from. */
const CITIES: City[] = [
  { name: 'ABU DHABI', lat: 24.453, lng: 54.366, transform: 'translate(-50%, 10px)' },
  { name: 'DUBAI', lat: 25.204, lng: 55.27, transform: 'translate(4px, -120%)' },
  { name: 'RIYADH', lat: 24.713, lng: 46.675, transform: 'translate(calc(-100% - 4px), -120%)' },
  { name: 'BARCELONA', lat: 41.385, lng: 2.173, transform: 'translate(-50%, -120%)' },
]
const ARCS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
]
const AMBER = 0xf9c00c
const BASE = 0x202124

function sphereVec(lat: number, lng: number, r = 1): THREE.Vector3 {
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180
  return new THREE.Vector3(
    Math.cos(la) * Math.sin(lo),
    Math.sin(la),
    Math.cos(la) * Math.cos(lo),
  ).multiplyScalar(r)
}

function vslerp(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  let d = THREE.MathUtils.clamp(a.dot(b), -1, 1)
  const om = Math.acos(d)
  if (om < 1e-6) return a.clone()
  const so = Math.sin(om)
  return a
    .clone()
    .multiplyScalar(Math.sin((1 - t) * om) / so)
    .add(b.clone().multiplyScalar(Math.sin(t * om) / so))
}

function fibonacciPoints(n: number): number[] {
  const arr: number[] = []
  const gr = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = (2 * Math.PI * i) / gr
    arr.push(Math.cos(th) * r, y, Math.sin(th) * r)
  }
  return arr
}

function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grd.addColorStop(0, 'rgba(249,192,12,0.9)')
  grd.addColorStop(0.4, 'rgba(249,192,12,0.35)')
  grd.addColorStop(1, 'rgba(249,192,12,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

/** A WebGL (Three.js) dotted globe: dark, floating, auto-rotating; drag to spin, scroll to zoom. */
export function GlobeGL() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = wrap.clientWidth
    let H = wrap.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(BASE, 3.0, 5.4)

    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 100)
    const cityVecs = CITIES.map((c) => sphereVec(c.lat, c.lng))
    const centroid = cityVecs
      .reduce((acc, v) => acc.add(v), new THREE.Vector3())
      .normalize()
    camera.position.copy(centroid.multiplyScalar(3.8))

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setSize(W, H)
    renderer.setClearAlpha(0)
    wrap.appendChild(renderer.domElement)
    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.classList.add('touch-none')

    // Dotted sphere
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(fibonacciPoints(1600), 3))
    const dots = new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({
        color: 0x9aa6b8,
        size: 0.02,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        fog: true,
      }),
    )
    scene.add(dots)

    // Invisible occluder so back-facing dots/markers are hidden (body == page bg)
    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(0.962, 64, 64),
      new THREE.MeshBasicMaterial({ color: BASE }),
    )
    scene.add(occluder)

    // Markers + glows
    const glowTex = glowTexture()
    const markerGeo = new THREE.SphereGeometry(0.02, 16, 16)
    const markerMat = new THREE.MeshBasicMaterial({ color: AMBER })
    for (const v of cityVecs) {
      const m = new THREE.Mesh(markerGeo, markerMat)
      m.position.copy(v)
      scene.add(m)
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      )
      glow.scale.set(0.2, 0.2, 1)
      glow.position.copy(v)
      scene.add(glow)
    }

    // Arcs from the hub
    const arcMat = new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.6 })
    const arcObjs: THREE.Line[] = []
    for (const [i, j] of ARCS) {
      const pts: THREE.Vector3[] = []
      for (let t = 0; t <= 1.0001; t += 1 / 64) {
        const s = vslerp(cityVecs[i], cityVecs[j], t)
        s.multiplyScalar(1 + 0.18 * Math.sin(Math.PI * t))
        pts.push(s)
      }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat)
      scene.add(line)
      arcObjs.push(line)
    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.enableZoom = true
    controls.minDistance = 2.8
    controls.maxDistance = 6
    controls.rotateSpeed = 0.5
    controls.autoRotate = !reduce
    controls.autoRotateSpeed = 0.55

    const resize = () => {
      W = wrap.clientWidth
      H = wrap.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const camDir = new THREE.Vector3()
    const tmp = new THREE.Vector3()
    let raf = 0
    const tick = () => {
      controls.update()
      camDir.copy(camera.position).normalize()
      for (let i = 0; i < CITIES.length; i += 1) {
        const el = labelRefs.current[i]
        if (!el) continue
        const facing = cityVecs[i].dot(camDir)
        if (facing <= 0.04) {
          el.style.opacity = '0'
          continue
        }
        tmp.copy(cityVecs[i]).project(camera)
        const x = (tmp.x * 0.5 + 0.5) * W
        const y = (-tmp.y * 0.5 + 0.5) * H
        el.style.left = `${x}px`
        el.style.top = `${y}px`
        el.style.opacity = `${THREE.MathUtils.clamp((facing - 0.04) / 0.22, 0, 1)}`
      }
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      scene.traverse((o) => {
        const any = o as THREE.Mesh
        if (any.geometry) any.geometry.dispose()
        const mat = (any as THREE.Mesh).material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else if (mat) mat.dispose()
      })
      glowTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === wrap) wrap.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[440px] w-full md:h-[600px]">
      {CITIES.map((c, i) => (
        <div
          key={c.name}
          ref={(el) => {
            labelRefs.current[i] = el
          }}
          style={{ transform: c.transform, opacity: 0 }}
          className="pointer-events-none absolute z-10 whitespace-nowrap font-body text-[11px] font-medium uppercase tracking-label text-primary"
        >
          {c.name}
        </div>
      ))}
    </div>
  )
}
