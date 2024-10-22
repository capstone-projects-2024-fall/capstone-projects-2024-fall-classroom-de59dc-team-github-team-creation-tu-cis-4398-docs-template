import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom', // Simulate browser-like environment
    setupFiles: './vitest.setup.js', // Setup file for testing
    globals: true, // Enable Jest-like global methods (e.g., test, expect)
  },
})
