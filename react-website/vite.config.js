import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables from `.env` file
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: process.env.NODE_ENV === 'development'
      ? {
          '/api': {
            target: process.env.VITE_API_URL || 'http://localhost:8000', // Use backend URL in development
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        }
      : undefined, // Disable proxy in production
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
