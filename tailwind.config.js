/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#08090B',
        surface: '#0E1014',
        elevated: '#14171C',
        line: '#1B1F26',
        'line-strong': '#2A2F38',
        primary: '#F4F5F7',
        secondary: '#A6ADB8',
        muted: '#8B93A1',
        amp: '#F9C00C',
        'amp-dim': '#C99A08',
        glow: '#2BD9FF',
      },
      fontFamily: {
        // Display: Anton (Google Fonts). Body: Industry (Adobe Fonts kit olx4mzh).
        display: ['"Anton"', '"Arial Narrow Bold"', 'Impact', 'sans-serif'],
        body: ['"industry"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        // No monospace anywhere. `mono` maps to the brand body face so any stray
        // `font-mono` still renders in Industry, never a typewriter font.
        mono: ['"industry"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        label: '0.22em',
      },
      maxWidth: {
        content: '1440px',
        prose: '68ch',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(43, 217, 255, 0.35)',
        amp: '0 10px 40px -12px rgba(249, 192, 12, 0.45)',
        lift: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      keyframes: {
        'scroll-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'scroll-cue': 'scroll-cue 1.6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
