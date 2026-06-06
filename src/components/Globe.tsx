import { Component, lazy, Suspense, useState, type ReactNode } from 'react'
import { Globe2D } from './Globe2D'

/** Three.js is heavy, so only fetch it when we're actually going to use WebGL. */
const GlobeGL = lazy(() => import('./GlobeGL').then((m) => ({ default: m.GlobeGL })))

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/** Falls back to the 2D globe if the WebGL globe fails to load or render. */
class GlobeBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/**
 * The International Presence globe. Renders the WebGL (Three.js) globe when the
 * browser supports WebGL, and the dependency-free 2D-canvas globe otherwise.
 */
export function Globe() {
  const [gl] = useState(() => (typeof window !== 'undefined' ? webglAvailable() : false))
  if (!gl) return <Globe2D />
  return (
    <GlobeBoundary fallback={<Globe2D />}>
      <Suspense fallback={<div className="h-[440px] w-full md:h-[600px]" />}>
        <GlobeGL />
      </Suspense>
    </GlobeBoundary>
  )
}
