import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        '..',
        'C:/Users/prath/.gemini/antigravity-ide/brain/41cf40ad-5408-4b86-b92a-991e38c9df46'
      ]
    }
  }
})
