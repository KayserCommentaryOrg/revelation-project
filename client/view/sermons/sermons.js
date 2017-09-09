import pProps from 'p-props'

import load from 'dynamic-import-iife'

import Sermons from './Sermons.html'

export default mediator => ({
	name: 'main.sermons',
	route: 'sermons',
	template: Sermons,
	resolve() {
		return pProps({
			sermons: load('/static/sermons.json', { type: 'json' }),
		})
	},
})
