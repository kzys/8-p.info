import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'v4/js/input.js',
  output: {file: 'v4/out/output.js'},
  plugins: [
    svelte({ 
      include: 'v4/js/*.svelte',
      preprocess: autoPreprocess(),
    }),
    resolve({ browser: true }),
    commonjs(),
  ],
};