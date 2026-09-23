/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identidad Nacional y Militar Peruana
        'peru-red': '#D91023',
        'peru-red-dark': '#990B19',
        'peru-red-light': '#EF4444',
        'peru-white': '#FFFFFF',
        'military-olive': '#4B5320',
        'military-olive-dark': '#363C17',
        'military-olive-light': '#636D2C',
        'combat-sand': '#F4F4F5',
        'combat-sand-dark': '#E4E4E7',
        'charcoal': '#1C1917',
        'charcoal-light': '#292524',
        
        // Modo Oscuro (Night Ops)
        'night-deep': '#0B101E',
        'night-navy': '#0f172a',
        'graphite': '#141518',
        'graphite-surface': 'rgba(20, 21, 24, 0.75)',

        // Acentos Tácticos y de Estado
        'gold-primary': '#D4AF37',
        'gold-radiant': '#FFD700',
        'neon-cyan': '#00F0FF',
        'neon-green': '#10B981',
        'alert-red': '#EF4444',
        'alert-amber': '#F59E0B',
      },
      fontFamily: {
        military: ['"Black Ops One"', 'Quantico', 'sans-serif'],
        stencil: ['Quantico', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'tactical-brutal': '4px 4px 0px 0px rgba(28, 25, 23, 0.9)',
        'tactical-brutal-sm': '2px 2px 0px 0px rgba(28, 25, 23, 0.85)',
        'tactical-brutal-olive': '4px 4px 0px 0px #363C17',
        'tactical-red': '0 0 20px rgba(217, 16, 35, 0.4)',
        'tactical-gold': '0 0 20px rgba(212, 175, 55, 0.35)',
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.35)',
        'cyan-glow-lg': '0 0 35px rgba(0, 240, 255, 0.55)',
        'tactical-card': '0 12px 35px rgba(0, 0, 0, 0.65)',
        'tactical-card-light': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
