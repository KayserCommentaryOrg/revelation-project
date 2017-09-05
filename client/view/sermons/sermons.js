import Sermons from './Sermons.html'

import sermons from 'lib/sermons/sermons'

export default mediator => ({
	name: 'main.sermons',
	route: 'sermons',
	template: Sermons,
	resolve() {
		return Promise.resolve({
			sermons,
		})
	},
})
