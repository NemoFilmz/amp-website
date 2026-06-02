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
      <span className="font-display font-bold tracking-tighter text-[1.15rem] md:text-[1.25rem]">
        <span className="text-primary">ACTI</span>
        <span className="text-amp">ON</span>
        <span className="text-primary"> MEDIA</span>
      </span>
      {withSub && (
        <span className="mt-1.5 font-body text-[9px] font-medium uppercase tracking-[0.3em] text-muted">
          Production FZ LLC
        </span>
      )}
    </span>
  )
}
