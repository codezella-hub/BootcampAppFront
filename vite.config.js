import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // ✅ your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()
  ],
});