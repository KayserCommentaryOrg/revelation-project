import Explanation from './Explanation.html'

import pProps from 'p-props'
import load from 'dynamic-import-iife'

export default mediator => ({
	name: 'main.structure.explanation',
	route: 'explanation',
	template: Explanation,
	resolve() {
		return pProps({
			structure: load('/static/structure.js'),
		})
	},
})
