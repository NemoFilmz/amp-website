import { cn } from '../lib/util'

/**
 * Text reconstruction of the AMP logo for dark surfaces:
 * "ACTI" in light, "ON" in AMP yellow, optional "MEDIA PRODUCTION" subline.
 */
export function Wordmark({
  withSub = false,
  className,
}: {
  withSub?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)} aria-label="Action Media Production">
      <img
        src="/logo-amp.png"
        alt="Action Media Production"
        className="h-7 w-auto select-none md:h-8"
      />
      {withSub && (
        <span className="mt-1.5 font-body text-[9px] font-medium uppercase tracking-[0.3em] text-muted">
          Production FZ LLC
        </span>
      )}
    </span>
  )
}
