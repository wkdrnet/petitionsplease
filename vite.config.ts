import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/petitionsplease/",
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {},
  },
  preview: {
    host: true
  }
})
