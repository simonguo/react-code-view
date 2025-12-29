import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import reactCodeView from '../../packages/unplugin/src/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView({
      useNativeParser: true // 使用原生 parseHTML 解析
    })
  ],
  resolve: {
    alias: {
      '@react-code-view/react/styles': resolve(__dirname, '../../packages/react/styles'),
      '@react-code-view/react': resolve(__dirname, '../../packages/react/src'),
      '@react-code-view/core': resolve(__dirname, '../../packages/core/src')
    }
  },
  server: {
    port: 3000
  }
});
