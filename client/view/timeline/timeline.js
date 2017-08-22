import JustChildState from 'component/JustChildState.html'

export default mediator => ({
	name: 'timeline',
	route: 'timeline',
	template: JustChildState,
	defaultChild: 'visual',
})
