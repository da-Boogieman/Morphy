import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'crypto': 'crypto-js'
    }
  },
  optimizeDeps: {
    include: [
      'crypto-js',
      'react',
      'react-dom',
      'idb',
      'comlink',
      '@xenova/transformers',
      'lucide-react'
    ],
    exclude: ['crypto']
  },
  build: {
    rollupOptions: {
      external: ['crypto'],
      output: {
        manualChunks: {
          'quantum-core': [
            './src/services/quantum',
            './src/services/core'
          ],
          'divine-systems': [
            './src/services/divine',
            './src/services/seraphim'
          ],
          'earth-systems': [
            './src/services/earth',
            './src/services/elements'
          ],
          'security': [
            './src/services/core/security',
            './src/services/core/failsafe'
          ]
        }
      }
    },
    target: 'esnext',
    sourcemap: true
  }
});