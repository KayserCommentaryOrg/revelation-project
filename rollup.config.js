import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import svelte from 'rollup-plugin-svelte'
import json from 'rollup-plugin-json'
import visualizer from 'rollup-plugin-visualizer'
import sveltePreprocessPostcss from 'svelte-preprocess-postcss'

import precss from 'precss'
import autoprefixer from 'autoprefixer'

const reasonablePrecss = precss({
	import: {
		path: [ `client/global-css` ],
		prefix: ``,
	},
})



export default {
	name: `revelationStructure`,
	input: `./client/index.js`,
	output: {
		file: `./public/static/index-bundle.js`,
		format: `iife`,
	},
	sourcemap: true,
	plugins: [
		svelte({
			preprocess: {
				style: sveltePreprocessPostcss({
					useConfigFile: false,
					plugins: [ reasonablePrecss, autoprefixer ],
				}),
			},
			css(css) {
				css.write(`public/static/components.css`)
			},
		}),
		commonjs(),
		json(),
		resolve({
			browser: true,
		}),
		babel({
			babelrc: false,
			presets: [
				[
					`es2015`,
					{
						modules: false,
					},
				],
			],
			plugins: [
				`external-helpers`,
			],
		}),
		visualizer(),
	],
}
