import JustChildState from 'component/JustChildState.html'

export default mediator => ({
	name: 'main.timeline',
	route: 'timeline',
	template: JustChildState,
	defaultChild: 'visual',
})
