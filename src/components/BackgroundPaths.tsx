import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated flowing-path background (adapted from kokonutd "Background Paths" on
 * 21st.dev). Tinted to the AMP brand (faint cyan) and reduced-motion safe.
 * Render inside a `relative overflow-hidden` parent; sits behind the content.
 */
function FloatingPaths({ position }: { position: number }) {
  const reduce = useReducedMotion()
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${
      470 - i * 6
    } ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-glow"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {paths.map((path, i) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + (i % 14) * 0.025}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.6 }
                : { pathLength: 1, opacity: [0.35, 0.7, 0.35], pathOffset: [0, 1, 0] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 18 + (i % 10) * 2, repeat: Infinity, ease: 'linear' }
            }
          />
        ))}
      </svg>
    </div>
  )
}

export function BackgroundPaths() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
}
