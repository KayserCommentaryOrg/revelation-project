import Explanation from './Explanation.html'

import pProps from 'p-props'
import load from 'dynamic-import-iife'
import { staticUrl } from 'lib/base-path'

export default mediator => ({
	name: 'main.structure.explanation',
	route: 'explanation',
	template: Explanation,
	resolve() {
		return pProps({
			structure: load(staticUrl('structure.js')),
		})
	},
})
