import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build output is set to dist so Netlify can deploy from admin-app/dist
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
