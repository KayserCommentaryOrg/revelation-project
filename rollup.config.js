import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import json from 'rollup-plugin-json'

export default {
	format: 'iife',
	moduleName: 'revelationStructure',
	entry: './client/index.js',
	dest: './public/index-bundle.js',
	// sourceMap: true,
	plugins: [
		svelte(),
		commonjs(),
		json(),
		resolve({
			browser: true
		}),
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: [
				[
					'es2015',
					{
						modules: false
					}
				]
			],
			plugins: [
				'external-helpers'
			]
		}),
	]
}
