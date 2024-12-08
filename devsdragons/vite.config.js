import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from any device in the network
    port: 30000, // Frontend port
    hot: true,
    proxy: {
      '/socket.io': {
        target: 'http://192.168.1.208:29000', // Backend WebSocket URL
        ws: true, // Enable WebSocket proxying
        changeOrigin: true
      },
      '/api': {
        target: 'http://192.168.1.208:29000', // Backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Rewrite '/api' prefix
      }
    }
  },
  test: {
    environment: 'jsdom', // Simulate browser-like environment
    setupFiles: './vitest.setup.js', // Setup file for testing
    globals: true // Enable Jest-like global methods (e.g., test, expect)
  }
})