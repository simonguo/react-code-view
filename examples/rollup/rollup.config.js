import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import reactCodeView from '@react-code-view/unplugin/rollup';

const isDevelopment = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
  },
  plugins: [
    reactCodeView(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
      preventAssignment: true,
    }),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
    }),
    postcss({
      extract: false,
      minimize: !isDevelopment,
      sourceMap: true,
    }),
    copy({
      targets: [
        { src: 'public/index.html', dest: 'dist' }
      ]
    }),
    isDevelopment && serve({
      open: true,
      contentBase: 'dist',
      port: 3002,
    }),
    isDevelopment && livereload('dist'),
  ],
};
