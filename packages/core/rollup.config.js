 import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const output = [
  {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  {
    file: pkg.module,
    format: 'esm',
    sourcemap: true,
  },
];

// 如果是生产环境，添加压缩版本
if (isProd) {
  output.push({
    file: pkg.main.replace('.js', '.min.js'),
    format: 'cjs',
    plugins: [terser()],
  });
  output.push({
    file: pkg.module.replace('.esm.js', '.esm.min.js'),
    format: 'esm',
    plugins: [terser()],
  });
}

export default {
  input: 'src/index.ts',
  output,
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
  ],
};