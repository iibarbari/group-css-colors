import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
	input: './lib/index.ts',
	output: {
		file: './assets/index.js',
		format: 'esm'
	},
	plugins: [typescript(), resolve()],
	external: ['lodash-es']
};