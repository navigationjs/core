import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  // CommonJS
  {
    input: '@navigationjs/core.js',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      indent: false,
    },
    plugins: [resolve(), babel()],
  },
  // ES
  {
    input: '@navigationjs/core.js',
    output: {
      file: 'es/index.js',
      format: 'es',
      indent: false,
    },
    plugins: [resolve(), babel()],
  },
  // UMD Dev
  {
    input: '@navigationjs/core.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'NavigationJsCore',
      indent: false,
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  },
  // UMD Prod
  {
    input: '@navigationjs/core.js',
    output: {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'NavigationJsCore',
      indent: false,
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
];
