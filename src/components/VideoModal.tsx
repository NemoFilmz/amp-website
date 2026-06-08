import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type VideoModalProps = {
  /** Vimeo video id; the modal is open when this is set. */
  vimeo: string | null
  title?: string
  onClose: () => void
}

/** A lightbox that plays a project's Vimeo video over a dimmed backdrop. */
export function VideoModal({ vimeo, title, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!vimeo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [vimeo, onClose])

  return (
    <AnimatePresence>
      {vimeo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} — video` : 'Project video'}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base/92 p-4 backdrop-blur-md md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line text-primary transition-colors duration-200 hover:border-amp hover:text-amp"
          >
            <X size={20} aria-hidden />
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            {title && (
              <p className="mb-3 font-display text-lg tracking-tighter text-primary md:text-xl">{title}</p>
            )}
            <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-black shadow-2xl shadow-black/60">
              <iframe
                src={`https://player.vimeo.com/video/${vimeo}?autoplay=1&title=0&byline=0&portrait=0`}
                title={title ?? 'Project video'}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
