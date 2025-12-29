/// <reference types="vite/client" />

declare module '*.md' {
  const Component: React.ComponentType<any>;
  export const content: string;
  export const codeBlocks: Array<{ code: string; language?: string }>;
  export default Component;
}

declare module '@react-code-view/unplugin/vite' {
  import type { Plugin } from 'vite';
  const plugin: (options?: Record<string, any>) => Plugin;
  export default plugin;
}
