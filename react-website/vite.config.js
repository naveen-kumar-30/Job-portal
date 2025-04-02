import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures correct asset paths on Netlify
  server: {
    port: 3000,
    proxy: process.env.NODE_ENV === 'development'
      ? {
          '/api': {
            target: process.env.VITE_API_URL || 'http://localhost:8000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        }
      : undefined, 
  },
  build: {
    outDir: 'dist', // Ensures build output is in the correct folder
    assetsDir: 'assets', // Puts assets in a subfolder to avoid conflicts
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
