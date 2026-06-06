import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { LAND_DOTS } from './landDots'
import { COUNTRIES, COUNTRY_ARCS } from './globeMarkers'
import { CountryMarkers, type CountryMarkersHandle } from './CountryMarkers'

const AMBER = 0xf9c00c
const BASE = 0x202124
const SPIN = Math.PI * 1.6

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
  const d = THREE.MathUtils.clamp(a.dot(b), -1, 1)
  const om = Math.acos(d)
  if (om < 1e-6) return a.clone()
  const so = Math.sin(om)
  return a
    .clone()
    .multiplyScalar(Math.sin((1 - t) * om) / so)
    .add(b.clone().multiplyScalar(Math.sin(t * om) / so))
}

/** A WebGL (Three.js) dotted-continents globe: scroll spins it into view; drag to spin. */
export function GlobeGL() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<CountryMarkersHandle>(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const mount = mountRef.current
    if (!wrap || !mount) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = wrap.clientWidth
    let H = wrap.clientHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(BASE, 3.0, 5.4)

    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 100)
    const countryVecs = COUNTRIES.map((c) => sphereVec(c.lat, c.lng))
    const centroid = countryVecs
      .reduce((acc, v) => acc.add(v.clone()), new THREE.Vector3())
      .normalize()
    camera.position.copy(centroid.clone().multiplyScalar(3.8))

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
    renderer.setSize(W, H)
    renderer.setClearAlpha(0)
    mount.appendChild(renderer.domElement)

    // Everything that should spin during the scroll reveal lives in this group.
    const group = new THREE.Group()
    scene.add(group)

    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(LAND_DOTS, 3))
    group.add(
      new THREE.Points(
        dotGeo,
        new THREE.PointsMaterial({
          color: 0x9aa6b8,
          size: 0.019,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          fog: true,
        }),
      ),
    )

    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.962, 64, 64),
        new THREE.MeshBasicMaterial({ color: BASE }),
      ),
    )

    const arcMat = new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.6 })
    for (const [i, j] of COUNTRY_ARCS) {
      const pts: THREE.Vector3[] = []
      for (let t = 0; t <= 1.0001; t += 1 / 64) {
        const s = vslerp(countryVecs[i], countryVecs[j], t)
        s.multiplyScalar(1 + 0.18 * Math.sin(Math.PI * t))
        pts.push(s)
      }
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat))
    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enablePan = false
    controls.enableZoom = false
    controls.rotateSpeed = 0.5

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
    const worldVec = new THREE.Vector3()
    const tmp = new THREE.Vector3()
    let raf = 0
    const tick = () => {
      if (!pausedRef.current) {
        const rect = wrap.getBoundingClientRect()
        const prog = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.6)),
        )
        const eased = reduce ? 1 : 1 - Math.pow(1 - prog, 3)
        group.rotation.y = -(1 - eased) * SPIN
      }
      controls.update()
      camDir.copy(camera.position).normalize()
      markersRef.current?.update(
        countryVecs.map((v) => {
          worldVec.copy(v).applyEuler(group.rotation)
          tmp.copy(worldVec).project(camera)
          return {
            x: (tmp.x * 0.5 + 0.5) * W,
            y: (-tmp.y * 0.5 + 0.5) * H,
            visible: worldVec.dot(camDir) > 0.04,
          }
        }),
      )
      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = mesh.material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else if (mat) mat.dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[440px] w-full md:h-[600px]">
      <div ref={mountRef} className="absolute inset-0" />
      <CountryMarkers
        ref={markersRef}
        onActiveChange={(i) => {
          pausedRef.current = i != null
        }}
      />
    </div>
  )
}
