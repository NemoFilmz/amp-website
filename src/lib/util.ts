export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Format a 1-based index as a zero-padded counter, e.g. 3 -> "03". */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}
