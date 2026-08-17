import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy Blynk Cloud API to avoid CORS issues in browser
      '/blynk-api': {
        target: 'https://blynk.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blynk-api/, '/external/api'),
        secure: true,
      },
    },
  },
})
