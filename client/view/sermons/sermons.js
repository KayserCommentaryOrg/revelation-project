import pProps from 'p-props'

import load from 'dynamic-import-iife'
import { staticUrl } from 'lib/base-path'

import Sermons from './Sermons.html'

export default mediator => ({
	name: 'main.sermons',
	route: 'sermons',
	template: Sermons,
	data: {
		title: `Sermons`
	},
	resolve() {
		return pProps({
			sermons: load(staticUrl('sermons.json'), { type: 'json' }),
		})
	},
})
