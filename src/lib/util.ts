export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Format a 1-based index as a zero-padded counter, e.g. 3 -> "03". */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/**
 * URL-safe slug for an industry/filter name, used to link the home industry
 * panels to the Work page with the matching filter pre-selected.
 * e.g. "Oil & Gas" -> "oil-gas", "Energy & Utilities" -> "energy-utilities".
 */
export function industrySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
