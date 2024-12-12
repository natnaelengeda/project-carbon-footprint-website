import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// @
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 1029
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },

    ]
  }
})
