import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi Vite dengan plugin React
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
