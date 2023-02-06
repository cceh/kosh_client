module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'main': '#013561',
        'main-dark': '#011E38',
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
      fontFamily: {
        'Helvetica': 'Helvetica, sans'
      },
      rotate: {
        '270': '270deg',
      },
      spacing: {
        '527': '33rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}