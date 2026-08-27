import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'], // Look for your existing logo
      manifest: {
        name: 'Nocami Labs',
        short_name: 'Nocami',
        description: 'Nocami Labs application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.png', // Use logo.png instead of missing files
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    fs: {
      allow: [
        '..',
        'C:/Users/prath/.gemini/antigravity-ide/brain/41cf40ad-5408-4b86-b92a-991e38c9df46'
      ]
    }
  }
})
