import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

export default {
    input: 'js/main.js',
  output: {
    file: 'v2/themes/v2/assets/bundle.js',
    format: 'cjs'
  },
  plugins: [
    svelte({
        include: 'js/**/*.svelte',
    }),
    resolve({
        // browser: true
    }),
    css({ output: 'bundle.css' }),
],
};
