import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'three-stdlib': path.resolve(__dirname, '../../node_modules/three-stdlib'),
    }
  }
});
