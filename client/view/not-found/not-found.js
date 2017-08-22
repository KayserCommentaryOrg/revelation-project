import NotFound from './NotFound.html'

export default mediator => ({
	name: 'main.not-found',
	route: 'not-found',
	querystringParameters: [ 'route', 'parameters' ],
	template: NotFound,
	resolve(data, parameters) {
		return Promise.resolve(parameters)
	}
})
