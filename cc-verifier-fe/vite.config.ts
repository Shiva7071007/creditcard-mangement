import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim')
export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
