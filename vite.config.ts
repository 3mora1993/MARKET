import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,    // Ensure Vite uses port 5173
    strictPort: true,  // Ensure Vite doesn't try to use another port if 5173 is taken
  },
});
