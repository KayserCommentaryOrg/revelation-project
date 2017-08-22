import Table from './Table.html'
import timelineData from 'lib/timeline/data/timeline-data.js'

export default mediator => ({
	name: 'table',
	route: 'table',
	template: Table,
	resolve() {
		return Promise.resolve({
			timelineData,
		})
	},
})
