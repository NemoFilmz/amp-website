export type Country = {
  name: string
  lat: number
  lng: number
  cities: string[]
  hub?: boolean
  /** Optional short label for the marker (defaults to name). */
  label?: string
  /** Which way the always-on label fans, so close countries don't collide. */
  labelSide: 'left' | 'right' | 'center'
}

/** Marked on the globe by country; the popup reveals each country's cities. */
export const COUNTRIES: Country[] = [
  { name: 'UAE', lat: 24.5, lng: 54.4, cities: ['Abu Dhabi', 'Dubai'], hub: true, labelSide: 'right' },
  { name: 'Saudi Arabia', lat: 24.7, lng: 46.7, cities: ['Riyadh'], label: 'Saudi', labelSide: 'left' },
  { name: 'Spain', lat: 41.385, lng: 2.173, cities: ['Barcelona'], labelSide: 'center' },
  { name: 'Egypt', lat: 31.1, lng: 27.86, cities: ['Ras Al Hekma'], labelSide: 'left' },
]

/** Arcs from the UAE hub (index 0) to the other countries. */
export const COUNTRY_ARCS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
]
