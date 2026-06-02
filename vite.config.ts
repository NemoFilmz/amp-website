import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split heavy libraries into a cached vendor chunk, separate from route code.
        manualChunks: {
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'react-router-dom', 'lenis'],
        },
      },
    },
  },
})
