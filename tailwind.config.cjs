const plugin = require('tailwindcss/plugin')
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{svelte,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textShadow: {
      'sss': ['1px 1px 0 rgb(0 0 0 / 25%)']
    },
    fontFamily: {
      'sans': ['Helvetica, Arial, sans-serif']
    },
    extend: {
      cursor: {
        'col-resize': 'col-resize',
        'row-resize': 'row-resize'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [plugin(function ({ addComponents, theme }) {
    const textShadow = {
      '.text-shadow-25': {
        'text-shadow': `1px 1px 0 rgb(0 0 0 / 25%)`,
      }
    }

    addComponents(textShadow)
  })],
}
