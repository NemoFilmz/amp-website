import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { COUNTRIES } from './globeMarkers'

export type MarkerPos = { x: number; y: number; visible: boolean }
export type CountryMarkersHandle = { update: (positions: MarkerPos[]) => void }

/**
 * HTML overlay shared by both globes: an amber dot + country label per office
 * country, and a premium popup (on hover or tap) listing that country's
 * cities. The globe drives positions each frame via the `update` handle.
 */
export const CountryMarkers = forwardRef<
  CountryMarkersHandle,
  { onActiveChange?: (i: number | null) => void }
>(function CountryMarkers({ onActiveChange }, ref) {
  const [active, setActive] = useState<number | null>(null)
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const popupRef = useRef<HTMLDivElement>(null)

  const set = (i: number | null) => {
    setActive(i)
    onActiveChange?.(i)
  }

  useImperativeHandle(ref, () => ({
    update: (positions) => {
      for (let i = 0; i < positions.length; i += 1) {
        const el = btnRefs.current[i]
        if (!el) continue
        const p = positions[i]
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
        el.style.opacity = p.visible ? '1' : '0'
        el.style.pointerEvents = p.visible ? 'auto' : 'none'
      }
      const pop = popupRef.current
      if (!pop) return
      const ap = active != null ? positions[active] : null
      if (ap && ap.visible) {
        pop.style.transform = `translate(${ap.x}px, ${ap.y}px)`
        pop.style.opacity = '1'
      } else {
        pop.style.opacity = '0'
        if (active != null && ap && !ap.visible) set(null)
      }
    },
  }))

  const activeCountry = active != null ? COUNTRIES[active] : null

  return (
    <>
      {COUNTRIES.map((c, i) => (
        <button
          key={c.name}
          ref={(el) => {
            btnRefs.current[i] = el
          }}
          type="button"
          aria-label={`${c.name}: ${c.cities.join(', ')}`}
          onPointerEnter={(e) => {
            if (e.pointerType !== 'touch') set(i)
          }}
          onPointerLeave={(e) => {
            if (e.pointerType !== 'touch') set(null)
          }}
          onPointerDown={(e) => {
            e.stopPropagation()
            set(active === i ? null : i)
          }}
          className="group absolute left-0 top-0 z-10 flex h-7 w-7 cursor-pointer items-center justify-center"
          style={{ opacity: 0 }}
        >
          <span className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <span
              aria-hidden
              className="absolute h-5 w-5 animate-ping rounded-full bg-amp/40 motion-reduce:animate-none"
            />
            <span className="relative h-2.5 w-2.5 rounded-full bg-amp shadow-[0_0_0_4px_rgba(249,192,12,0.18)]" />
          </span>
          <span
            className={
              'pointer-events-none absolute top-[125%] whitespace-nowrap font-body text-[11px] font-medium uppercase tracking-label text-primary ' +
              (c.labelSide === 'right'
                ? 'left-1/2 ml-1.5 text-left'
                : c.labelSide === 'left'
                  ? 'right-1/2 mr-1.5 text-right'
                  : 'left-1/2 -translate-x-1/2 text-center')
            }
          >
            {c.label ?? c.name}
          </span>
        </button>
      ))}

      <div
        ref={popupRef}
        className="pointer-events-none absolute left-0 top-0 z-20 transition-opacity duration-150"
        style={{ opacity: 0 }}
      >
        {activeCountry && (
          <div className="-translate-x-1/2 -translate-y-[calc(100%+18px)]">
            <div className="min-w-[140px] rounded-xl border border-line bg-elevated/95 px-4 py-3 shadow-2xl shadow-black/60 backdrop-blur">
              <div className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-amp">
                {activeCountry.name}
              </div>
              <ul className="mt-2.5 space-y-2">
                {activeCountry.cities.map((city) => (
                  <li
                    key={city}
                    className="flex items-center gap-2.5 font-display text-lg leading-none tracking-tight text-primary"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amp" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-line bg-elevated" />
          </div>
        )}
      </div>
    </>
  )
})
