import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCodeView from '@react-code-view/unplugin/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView()
  ]
});
