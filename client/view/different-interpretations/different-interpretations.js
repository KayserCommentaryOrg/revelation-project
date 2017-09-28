import DifferentInterpretations from './DifferentInterpretations.html'

import pProps from 'p-props'
import load from 'dynamic-import-iife'


export default mediator => ({
	name: 'main.different-interpretations',
	route: 'different-interpretations',
	template: DifferentInterpretations,
	resolve() {
		return pProps({
			structure: load('/static/structure.js'),
		})
	},
})
