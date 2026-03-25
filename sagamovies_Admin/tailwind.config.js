/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f8ff',
          100: '#e8f0ff',
          200: '#c9dcff',
          300: '#a3c0ff',
          400: '#7399ff',
          500: '#426bff',
          600: '#2549f5',
          700: '#1f3ad6',
          800: '#2033ad',
          900: '#202f88'
        }
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(15, 23, 42, 0.45)'
      },
      backgroundImage: {
        'panel-grid':
          'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
