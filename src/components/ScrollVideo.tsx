import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Container } from './ui'
import { Reveal } from './Reveal'

type ScrollVideoPanelProps = {
  src: string
  poster: string
  name: string
  blurb: string
}

/** Full-bleed name + blurb over a left fade and bottom scrim (matches the image panels). */
function Overlay({ name, blurb }: { name: string; blurb: string }) {
  return (
    <>
      {/* Smooth left-side fade for text contrast; video stays visible through it. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to right, rgba(32,33,36,0.72) 0%, rgba(32,33,36,0.42) 32%, transparent 66%)',
        }}
      />
      {/* Top scrim */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[1] h-2/3 bg-gradient-to-b from-base via-base/80 to-transparent"
      />
      {/* Bottom fade: blends the seam where stacked panels touch into base */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-base via-base/55 to-transparent"
      />
      <Container className="relative z-10 pt-28 md:pt-32">
        <Reveal>
          <h3 className="font-display text-[clamp(2rem,7vw,5.5rem)] leading-[0.92] tracking-tighter text-primary">
            {name}
          </h3>
          <p className="mt-5 max-w-xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
            {blurb}
          </p>
        </Reveal>
      </Container>
    </>
  )
}

/**
 * A full-bleed video whose playback position is driven by scroll: as the panel
 * travels through the viewport (in normal flow — nothing is pinned), its
 * position drives video.currentTime, so it plays forward as you scroll past and
 * back as you scroll up. The source is all-intra so every scroll position seeks
 * to an exact, smooth frame.
 *
 * Falls back to a static poster for reduced-motion and a muted autoplay loop on
 * touch devices (where scroll-scrubbing is unreliable).
 */
export function ScrollVideoPanel({ src, poster, name, blurb }: ScrollVideoPanelProps) {
  const reduce = useReducedMotion()
  const [touch, setTouch] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches)
  }, [])

  const scrub = !reduce && !touch

  useEffect(() => {
    if (!scrub) return
    const box = boxRef.current
    const video = videoRef.current
    if (!box || !video) return

    let raf = 0
    let duration = video.readyState >= 1 ? video.duration || 0 : 0
    let target = 0

    const apply = () => {
      raf = 0
      if (Math.abs(video.currentTime - target) > 0.015) {
        try {
          video.currentTime = target
        } catch {
          /* seek can throw mid-load; next scroll re-applies */
        }
      }
    }

    const update = () => {
      if (!duration) return
      const rect = box.getBoundingClientRect()
      const vh = window.innerHeight
      const denom = vh + rect.height
      const progress = denom > 0 ? Math.min(1, Math.max(0, (vh - rect.top) / denom)) : 0
      target = progress * Math.max(0, duration - 0.05)
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onMeta = () => {
      duration = video.duration || 0
      update()
    }

    video.addEventListener('loadedmetadata', onMeta)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrub])

  const frame = (media: ReactNode) => (
    <div
      ref={boxRef}
      className="relative flex min-h-[58vh] items-start overflow-hidden md:min-h-[80vh]"
    >
      {media}
      <Overlay name={name} blurb={blurb} />
    </div>
  )

  if (reduce) {
    return frame(<img src={poster} alt={name} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />)
  }

  if (touch) {
    return frame(
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
      />,
    )
  }

  return frame(
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
    />,
  )
}
