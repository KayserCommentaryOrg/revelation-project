import JustChildState from 'component/JustChildState.html'

export default mediator => ({
	name: 'main.timeline',
	route: 'timeline',
	data: {
		title: `Timeline`
	},
	template: JustChildState,
	defaultChild: 'visual',
})
