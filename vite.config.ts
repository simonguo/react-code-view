import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'docs'),
  resolve: {
    alias: {
      '@react-code-view/react/styles': resolve(__dirname, 'packages/react/styles'),
      '@react-code-view/react': resolve(__dirname, 'packages/react/src'),
      '@react-code-view/core': resolve(__dirname, 'packages/core/src'),
      'react-code-view': resolve(__dirname, 'packages/react-code-view/src')
    }
  },
  build: {
    outDir: resolve(__dirname, 'docs/dist'),
    emptyOutDir: true
  },
  server: {
    port: 3100,
    open: true
  }
});
