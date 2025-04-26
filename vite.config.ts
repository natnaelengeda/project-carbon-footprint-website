import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// @
import { fileURLToPath, URL } from 'node:url';

import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4040, // Development server port
  },
  plugins: [
    react(),
    Inspect(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  },
  build: {
    outDir: 'dist', // Output directory for production build
    sourcemap: false, // Disable sourcemaps for production
    minify: 'esbuild', // Use esbuild for faster minification
    target: 'esnext', // Target modern browsers
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
