import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,  // Change this to the port you want to use (3000 is just an example)
    open: true,   // Automatically opens the browser when the server starts
  },
});
