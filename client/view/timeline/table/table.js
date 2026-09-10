import load from 'dynamic-import-iife'
import { staticUrl } from 'lib/base-path'
import pProps from 'p-props'

import Table from './Table.html'

export default mediator => ({
	name: 'main.timeline.table',
	route: 'table',
	template: Table,
	defaultParameters: {
		sort: 'bydate',
	},
	resolve() {
		return pProps({
			timelineData: load(staticUrl('timeline-data.json'), { type: 'json' }),
		})
	},
})
