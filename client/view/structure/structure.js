import JustChildState from 'component/JustChildState.html'

export default mediator => ({
	name: 'main.structure',
	route: 'structure',
	data: {
		title: `Revelation's structure`
	},
	template: JustChildState,
	defaultChild: 'text',
})
