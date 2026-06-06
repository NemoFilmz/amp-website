import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { COURSES, type Course } from '../data/site'
import { slugify, cn } from '../lib/util'

/**
 * A 3D coverflow "wheel" of the Academy courses. The centred card faces
 * forward and links to its course page; side cards angle back and bring
 * themselves to centre on click. Spin via drag, the arrows, the dots, or
 * the left/right arrow keys.
 */
export function CourseWheel() {
  const n = COURSES.length
  const [active, setActive] = useState(Math.floor(n / 2))
  const [mobile, setMobile] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 720)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const clamp = (v: number) => Math.min(n - 1, Math.max(0, v))
  const go = (d: number) => setActive((a) => clamp(a + d))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  const cardW = mobile ? 212 : 300
  const cardH = mobile ? 300 : 424
  const spacing = mobile ? 150 : 232
  const angle = mobile ? 34 : 44

  return (
    <div className="relative w-full select-none">
      <motion.div
        className="relative w-full cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1)
          else if (info.offset.x > 60) go(-1)
        }}
      >
        <div
          className="relative mx-auto flex items-center justify-center overflow-hidden [perspective:1700px]"
          style={{ height: cardH + 48 }}
        >
          {COURSES.map((course, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const visible = abs <= 2
            return (
              <motion.div
                key={course.name}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  zIndex: n - abs,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                initial={false}
                animate={{
                  x: offset * spacing,
                  z: -abs * 180,
                  rotateY: offset === 0 ? 0 : offset < 0 ? angle : -angle,
                  scale: 1 - abs * 0.05,
                  opacity: visible ? 1 - abs * 0.3 : 0,
                }}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 22 }}
              >
                {offset === 0 ? (
                  <Link
                    to={`/academy/${slugify(course.name)}`}
                    aria-label={`View the ${course.name} course`}
                    className="block"
                    draggable={false}
                  >
                    <WheelCard course={course} w={cardW} h={cardH} active />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show the ${course.name} course`}
                    className="block"
                  >
                    <WheelCard course={course} w={cardW} h={cardH} />
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <WheelArrow dir="prev" disabled={active === 0} onClick={() => go(-1)} />
        <div className="flex items-center gap-2">
          {COURSES.map((course, i) => (
            <button
              key={course.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to ${course.name}`}
              aria-current={i === active}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-7 bg-amp' : 'w-1.5 bg-line-strong hover:bg-secondary',
              )}
            />
          ))}
        </div>
        <WheelArrow dir="next" disabled={active === n - 1} onClick={() => go(1)} />
      </div>
    </div>
  )
}

function WheelCard({ course, w, h, active }: { course: Course; w: number; h: number; active?: boolean }) {
  return (
    <div
      style={{ width: w, height: h }}
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-colors duration-300',
        active ? 'border-amp/60 shadow-2xl shadow-black/50' : 'border-line',
      )}
    >
      <img
        src={course.image}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-500"
        style={{ filter: active ? 'none' : 'grayscale(0.45) brightness(0.62)' }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(32,33,36,0.94) 0%, rgba(32,33,36,0.35) 52%, rgba(32,33,36,0.05) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl leading-[0.98] tracking-tighter text-primary">{course.name}</h3>
        {active && (
          <span className="mt-4 inline-flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-label text-amp">
            View course
            <ArrowUpRight size={14} aria-hidden />
          </span>
        )}
      </div>
    </div>
  )
}

function WheelArrow({ dir, disabled, onClick }: { dir: 'prev' | 'next'; disabled: boolean; onClick: () => void }) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous course' : 'Next course'}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full border border-line text-primary transition-all duration-300',
        disabled
          ? 'cursor-not-allowed opacity-30'
          : 'hover:border-amp hover:text-amp hover:-translate-y-0.5',
      )}
    >
      <Icon size={20} aria-hidden />
    </button>
  )
}
