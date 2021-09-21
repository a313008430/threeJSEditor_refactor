module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{svelte,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
  plugins: [],
}
