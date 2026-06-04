import type { ComponentProps } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '../lib/util'

export type LogoItem = {
  /** Display label — used as the wordmark and as the image alt text. */
  label: string
  /** Optional logo image. When set, the image renders instead of the wordmark. */
  src?: string
  /** Optional per-logo size override (Tailwind max-h/max-w classes). */
  size?: string
}

const DEFAULT_LOGO_SIZE = 'max-h-16 max-w-[160px] md:max-h-20'

type LogoCloudProps = ComponentProps<'div'> & {
  items: LogoItem[]
  /** Columns at the md breakpoint (mobile is always 2). Defaults to 4. */
  columns?: number
}

/**
 * Bordered "logo cloud" grid, adapted from the shadcn / 21st.dev logo-cloud-2
 * component to the AMP design system: dark tokens (surface/base/line), the
 * brand body font, and no shadcn-only classes. Internal grid lines come from a
 * 1px gap over `bg-line` (matching the Client Experience grid), with the two
 * signature horizontal rules bleeding full-viewport width.
 *
 * Each item renders as an uppercase brand wordmark by default, or as a logo
 * image when `src` is supplied — so real client/partner logos can drop straight
 * in later without touching this file.
 */
export function LogoCloud({ items, columns = 4, className, ...props }: LogoCloudProps) {
  const lastRow = Math.floor((items.length - 1) / columns)

  return (
    <div className="relative" {...props}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-line"
      />

      <div
        className={cn(
          'grid grid-cols-2 gap-px border-x border-line bg-line md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]',
          className,
        )}
        style={{ ['--cols' as string]: columns }}
      >
        {items.map((item, i) => {
          const col = i % columns
          const row = Math.floor(i / columns)
          const tint = (row + col) % 2 === 0
          const withPlus = col < columns - 1 && row < lastRow
          return <LogoCell key={item.label} item={item} tint={tint} withPlus={withPlus} />
        })}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-line"
      />

      {/* Brand accent: a thin AMP-yellow open bracket (half rectangle) framing the
          outer column on each side. Left wraps the ADNOC / ADWEA cells, right
          wraps the Abu Dhabi Airports / Sky News cells; the inner side stays open
          and the arms reach in toward the logos. */}
      <div
        aria-hidden
        style={{ width: `${(100 / columns) * 0.78}%` }}
        className="pointer-events-none absolute inset-y-0 left-0 z-10 border-y-[1.5px] border-l-[1.5px] border-amp"
      />
      <div
        aria-hidden
        style={{ width: `${(100 / columns) * 0.78}%` }}
        className="pointer-events-none absolute inset-y-0 right-0 z-10 border-y-[1.5px] border-r-[1.5px] border-amp"
      />
    </div>
  )
}

function LogoCell({
  item,
  tint,
  withPlus,
}: {
  item: LogoItem
  tint: boolean
  withPlus: boolean
}) {
  return (
    <div
      className={cn(
        'group relative flex items-center justify-center px-4 py-10 md:p-12',
        tint ? 'bg-surface' : 'bg-base',
      )}
    >
      {item.src ? (
        <img
          alt={item.label}
          src={item.src}
          loading="lazy"
          className={cn(
            'pointer-events-none w-auto select-none object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100',
            item.size ?? DEFAULT_LOGO_SIZE,
          )}
        />
      ) : (
        <span className="text-center font-body text-[12px] font-medium uppercase leading-tight tracking-[0.18em] text-secondary transition-colors duration-300 group-hover:text-primary md:text-sm">
          {item.label}
        </span>
      )}

      {withPlus && (
        <Plus
          aria-hidden
          strokeWidth={1}
          className="pointer-events-none absolute -bottom-[12.5px] -right-[12.5px] z-10 hidden size-6 text-line-strong md:block"
        />
      )}
    </div>
  )
}
