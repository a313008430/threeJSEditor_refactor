module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{svelte,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        'col-resize': 'col-resize'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
