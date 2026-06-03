import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Container } from './ui'
import { Reveal } from './Reveal'

type ScrollVideoPanelProps = {
  src: string
  poster: string
  name: string
  blurb: string
  /** Extra vertical scroll (in vh) over which the whole clip is scrubbed. */
  scrubVh?: number
}

/** Industry name + blurb over a bottom scrim, matching the cinematic panels. */
function Overlay({ name, blurb }: { name: string; blurb: string }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-base via-base/80 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-10">
        <Container className="pb-12 md:pb-20">
          <Reveal>
            <h3 className="font-display text-[clamp(2rem,7vw,5.5rem)] leading-[0.92] tracking-tighter text-primary">
              {name}
            </h3>
            <p className="mt-5 max-w-xl font-light text-xl leading-relaxed text-secondary md:text-2xl">
              {blurb}
            </p>
          </Reveal>
        </Container>
      </div>
    </>
  )
}

/**
 * A full-bleed video whose playback position is driven by scroll: as the
 * viewer scrolls through the (taller-than-screen) track, the pinned video
 * scrubs forward from its first to its last frame. The source is encoded
 * all-intra so every scroll position seeks to an exact, smooth frame.
 *
 * Falls back to a static poster for reduced-motion, and to a muted autoplay
 * loop on touch devices (where scroll-scrubbing is unreliable).
 */
export function ScrollVideoPanel({ src, poster, name, blurb, scrubVh = 130 }: ScrollVideoPanelProps) {
  const reduce = useReducedMotion()
  const [touch, setTouch] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches)
  }, [])

  const scrub = !reduce && !touch

  useEffect(() => {
    if (!scrub) return
    const track = trackRef.current
    const video = videoRef.current
    if (!track || !video) return

    let raf = 0
    let duration = video.readyState >= 1 ? video.duration || 0 : 0
    let target = 0

    const apply = () => {
      raf = 0
      // Seek only when the frame would meaningfully change, to avoid thrashing.
      if (Math.abs(video.currentTime - target) > 0.015) {
        try {
          video.currentTime = target
        } catch {
          /* seek can throw mid-load; ignored, next scroll re-applies */
        }
      }
    }

    const update = () => {
      if (!duration) return
      const scrubPx = track.offsetHeight - window.innerHeight
      if (scrubPx <= 0) return
      const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / scrubPx))
      // Stop just shy of the very end; seeking exactly to duration can blank.
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

  // Reduced motion: static first-frame panel.
  if (reduce) {
    return (
      <div className="relative min-h-[58vh] overflow-hidden md:min-h-[80vh]">
        <img src={poster} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        <Overlay name={name} blurb={blurb} />
      </div>
    )
  }

  // Touch devices: muted autoplay loop (scroll-scrubbing is unreliable there).
  if (touch) {
    return (
      <div className="relative min-h-[58vh] overflow-hidden md:min-h-[80vh]">
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Overlay name={name} blurb={blurb} />
      </div>
    )
  }

  // Scroll-scrubbed: tall track with a pinned, scroll-driven video.
  return (
    <div ref={trackRef} className="relative" style={{ height: `calc(100vh + ${scrubVh}vh)` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Overlay name={name} blurb={blurb} />
      </div>
    </div>
  )
}
