import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'

export default {
  input: 'lib/main.js',
  output: {
    file: 'dist/bet-return.js',
    format: 'es'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      comments: true,
      runtimeHelpers: true
    })
  ]
};
