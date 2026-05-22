/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        panini: {
          blue: '#1a3a6b',
          red: '#c8102e',
          gold: '#f5c518',
        },
      },
    },
  },
  plugins: [],
};