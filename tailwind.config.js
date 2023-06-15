/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'main': '#013561',
        'dark': '#343a40',
        'off': '#95c11f',
        'off-dark': '#526B16',
        'action': '#DB6C00',
        'error': '#C10D00',
        'off-white': '#f2f6fc',
        'sb-gray': '#B9B9B9',
        'h2-gray': '#6F6F6F',
        'p-gray': '#858585'
      }, screens: {
        'smartphone': { 'max': '639px' },
        'smartphone-xs': { 'max': '430px' }
      },
      rotate: {
        '270': '270deg',
      },
      spacing: {
        '527': '33rem',
      },
    },
  },
  plugins: [],
}
