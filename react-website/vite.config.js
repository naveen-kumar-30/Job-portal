import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows Railway to bind to the correct address
    port: process.env.PORT || 3000, // Use Railway-provided PORT
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/", // Adjust if using a subdirectory
});
