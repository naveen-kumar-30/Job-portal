import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
  },
});
