/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panini: {
          blue: '#1a3a6b',
          'blue-light': '#2d5ca8',
          red: '#c8102e',
          gold: '#f5c518',
          'gold-dark': '#d4a800',
          cream: '#f0ebe0',
          'dark-navy': '#0d1b35',
          'card-dark': '#152040',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'Arial Black', 'sans-serif'],
      },
      keyframes: {
        'sticker-pop': {
          '0%':   { transform: 'scale(0.7) rotate(-4deg)', opacity: '0' },
          '65%':  { transform: 'scale(1.08) rotate(1deg)',  opacity: '1' },
          '100%': { transform: 'scale(1)   rotate(0deg)',   opacity: '1' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'slide-down': {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'sticker-pop':  'sticker-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
        shimmer:        'shimmer 2s linear infinite',
        'slide-down':   'slide-down 0.18s ease-out',
      },
    },
  },
  plugins: [],
};