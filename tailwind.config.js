/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: ['./index.html', './vue/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          50: '#ebfef6',
          100: '#cffce7',
          200: '#a4f6d4',
          300: '#69ecbf',
          400: '#2ddaa4',
          500: '#08b585',
          600: '#009c73',
          700: '#007d60',
          800: '#02634d',
          900: '#035141',
          950: '#002e25',
        },
      },
    },
  },
  plugins: [],
}
