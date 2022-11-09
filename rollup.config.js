import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'v4_js/input.js',
  output: {file: 'v4_out/output.js'},
  plugins: [
    svelte({ 
      include: 'v4_js/*.svelte',
      preprocess: autoPreprocess(),
    }),
    resolve({ browser: true }),
    commonjs(),
  ],
};