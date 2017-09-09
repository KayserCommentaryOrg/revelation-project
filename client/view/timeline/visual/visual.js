import load from 'dynamic-import-iife'
import pProps from 'p-props'

import Visual from './Visual.html'

export default mediator => ({
	name: 'main.timeline.visual',
	route: 'visual',
	template: Visual,
	resolve() {
		return pProps({
			timelineData: load('/static/timeline-data.json', { type: 'json' }),
		})
	},
})
