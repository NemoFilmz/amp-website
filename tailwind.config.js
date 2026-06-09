/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#202124',
        surface: '#26282c',
        elevated: '#2d2f34',
        line: '#383b42',
        'line-strong': '#494d55',
        primary: '#F4F5F7',
        secondary: '#F4F5F7',
        muted: '#F4F5F7',
        amp: '#F9C00C',
        'amp-dim': '#C99A08',
        glow: '#2BD9FF',
      },
      fontFamily: {
        // Display: Anton (Google Fonts). Body: Dinosaur (Adobe Fonts kit olx4mzh).
        display: ['"Anton"', '"Arial Narrow Bold"', 'Impact', 'sans-serif'],
        body: ['"dinosaur"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        // No monospace anywhere. `mono` maps to the body face so any stray
        // `font-mono` still renders in Dinosaur, never a typewriter font.
        mono: ['"dinosaur"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        // Display ("impact"/Anton) tracking, loosened by 3% (+0.03em) per request.
        tightest: '0em',
        tighter: '0.01em',
        tight: '0.005em',
        label: '0.22em',
      },
      maxWidth: {
        // Wide enough to fill larger laptops (e.g. 15" Air on "More Space" = 1710 logical)
        // without leaving big side margins. Only affects viewports wider than this.
        content: '1680px',
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
