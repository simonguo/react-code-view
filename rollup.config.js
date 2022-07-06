import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/umd/react-code-view.js',
        format: 'umd',
        sourcemap: true,
        name: 'ReactCodeView',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
      terser()
    ]
  }
];
