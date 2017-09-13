import defaultConfig from './rollup.config.js'
import minify from 'rollup-plugin-babel-minify'

export default Object.assign(defaultConfig, {
	plugins: [
		...defaultConfig.plugins,
		minify({
			comments: false,
		}),
	],
})
