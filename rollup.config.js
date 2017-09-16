import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import json from 'rollup-plugin-json'
import visualizer from 'rollup-plugin-visualizer'

export default {
	format: 'iife',
	moduleName: 'revelationStructure',
	entry: './client/index.js',
	dest: './public/static/index-bundle.js',
	sourceMap: true,
	plugins: [
		svelte(),
		commonjs(),
		json(),
		resolve({
			browser: true,
		}),
		babel({
			babelrc: false,
			presets: [
				[
					'es2015',
					{
						modules: false,
					},
				],
			],
			plugins: [
				'external-helpers',
			],
		}),
		visualizer(),
	],
}
