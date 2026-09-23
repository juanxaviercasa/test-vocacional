/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-deep': '#0B101E',
        'graphite': '#141518',
        'graphite-surface': 'rgba(20, 21, 24, 0.75)',
        'neon-cyan': '#00F0FF',
        'neon-green': '#10B981',
        'alert-red': '#EF4444',
        'alert-amber': '#F59E0B',
        'gold-primary': '#FFD700',
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.35)',
        'cyan-glow-lg': '0 0 35px rgba(0, 240, 255, 0.55)',
        'green-glow': '0 0 20px rgba(16, 185, 129, 0.35)',
        'red-glow': '0 0 20px rgba(239, 68, 68, 0.35)',
        'tactical-card': '0 12px 35px rgba(0, 0, 0, 0.65)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
