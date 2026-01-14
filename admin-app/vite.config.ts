import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build output is set to ../admin so `npm run build` will populate the repo's admin/ folder
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../admin',
    emptyOutDir: false
  }
})
