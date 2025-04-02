import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct asset loading in production
  server: {
    port: 3000,
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000', // Uses backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    } : undefined, // Disable proxy in production
  },
  build: {
    outDir: 'dist', // Ensure correct build output
    assetsDir: 'assets', // Organize assets
  },
});
