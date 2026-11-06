/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#075B21', 600: '#0A6A28', 700: '#064A1B', 800: '#053A16', 900: '#03270F' },
        emerald: { DEFAULT: '#14803B' },
        gold: { DEFAULT: '#D4AF37', light: '#E8C66A', deep: '#B08D24', pale: '#F3E6BD' },
        ivory: { DEFAULT: '#F8F7F2', 200: '#EFECE2', 300: '#E4DFCF' },
        charcoal: { DEFAULT: '#161B18', 700: '#2A312D', 500: '#5B635E', 400: '#7D847F' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.28em' },
      maxWidth: { site: '88rem' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        progress: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
    },
  },
  plugins: [],
}
