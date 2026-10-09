import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.svg',
        'pwa-icon.svg',
        'apple-touch-icon.png',
        'pwa-icon-192.png',
        'pwa-icon-512.png',
      ],
      manifest: {
        name: 'Caminho de Bronze',
        short_name: 'Caminho de Bronze',
        description: 'Mapa interativo e rotas de homenagem cultural em Maceió.',
        theme_color: '#a81d84',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        globIgnores: ['**/Map-*.js', '**/Map-*.css', '**/maplibre-gl-*.js'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => (
              /\/assets\/(?:Map-[^/]+\.(?:js|css)|maplibre-gl-[^/]+\.js)$/.test(url.pathname)
            ),
            handler: 'CacheFirst',
            options: {
              cacheName: 'caminho-bronze-map-assets',
              expiration: {
                maxEntries: 6,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
})
