import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Container } from './ui'

type ScrollVideoPanelProps = {
  src: string
  poster: string
  name: string
  blurb: string
}

/** Oil & Gas label over a bottom scrim, sized for the contained video. */
function Overlay({ name, blurb }: { name: string; blurb: string }) {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-base/95 via-base/45 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
        <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[0.95] tracking-tighter text-primary">
          {name}
        </h3>
        <p className="mt-3 max-w-md font-light text-base leading-relaxed text-secondary md:text-lg">
          {blurb}
        </p>
      </div>
    </>
  )
}

/**
 * A contained, margin-respecting video that scrubs with scroll: as the box
 * travels through the viewport (in normal flow — nothing is pinned), its
 * position drives video.currentTime, so it plays forward as you scroll past
 * and backward as you scroll up. The source is encoded all-intra so every
 * scroll position seeks to an exact, smooth frame.
 *
 * Falls back to a static poster for reduced-motion and a muted autoplay loop
 * on touch devices (where scroll-scrubbing is unreliable).
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
          /* seek can throw mid-load; the next scroll re-applies */
        }
      }
    }

    const update = () => {
      if (!duration) return
      const rect = box.getBoundingClientRect()
      const vh = window.innerHeight
      const denom = vh + rect.height
      // 0 when the box's top enters the bottom of the viewport,
      // 1 when its bottom has scrolled past the top of the viewport.
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
    <Container className="py-16 md:py-24">
      <div
        ref={boxRef}
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-surface"
      >
        {media}
        <Overlay name={name} blurb={blurb} />
      </div>
    </Container>
  )

  if (reduce) {
    return frame(<img src={poster} alt={name} className="absolute inset-0 h-full w-full object-cover" />)
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
        className="absolute inset-0 h-full w-full object-cover"
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
      className="absolute inset-0 h-full w-full object-cover"
    />,
  )
}
