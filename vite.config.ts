import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        // Preserve API routes for proxy
        { from: /^\/api/, to: function(context) {
          return context.parsedUrl.pathname;
        }},
        // Fallback all other routes to index.html
        { from: /^(?!\/api).*/, to: '/index.html' }
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
