import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['download.png'],
      manifest: {
        name: 'Water Level Moniter',
        short_name: 'WaterX',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'download.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'logo192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'logo512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'logo512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    })
  ],
})