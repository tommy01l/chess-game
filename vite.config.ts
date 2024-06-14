import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chess-game/',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    manifest: true,
  },
});
