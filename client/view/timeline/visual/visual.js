import Visual from './Visual.html'

import timelineData from 'lib/timeline/data/timeline-data.js'

export default mediator => ({
	name: 'main.timeline.visual',
	route: 'visual',
	template: Visual,
	resolve() {
		return Promise.resolve({
			timelineData,
		})
	},
})
