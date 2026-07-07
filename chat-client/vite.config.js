import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// Below server config is specifically for making hot-reload work for WSL2
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
    // host: true,
    // strictPort: true,
    // port: 5173
  }
});
