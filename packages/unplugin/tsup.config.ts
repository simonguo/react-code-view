import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    webpack: 'src/webpack.ts',
    vite: 'src/vite.ts',
    rollup: 'src/rollup.ts',
    esbuild: 'src/esbuild.ts',
    rspack: 'src/rspack.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  external: [
    'webpack',
    'vite',
    'rollup',
    'esbuild',
    '@rspack/core'
  ]
});
