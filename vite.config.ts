import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// @
import { fileURLToPath, URL } from 'node:url';

import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 1029
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
  }
})
