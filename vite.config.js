import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), viteExternalsPlugin({
    three: "THREE",
  })],
  build: {
    rollupOptions: { external: ['three'] }
  },
  optimizeDeps: {
    exclude: ['three']
  },
  server: {

  }

})
