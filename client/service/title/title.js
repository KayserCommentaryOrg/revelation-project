export default mediator => {
	const titleElement = document.querySelector('title')

	const makeTitleText = title => title ? `${title} | Revelation Project` : `Revelation Project`
	const changeTitle = title => titleElement.text = makeTitleText(title)

	return Promise.all([
		mediator.call('onStateRouter', 'stateChangeStart', () => changeTitle()),
		mediator.call('onStateRouter', 'stateChangeEnd', (state, params, states) => {
			const title = states.reduce((acc, { data }) => {
				return (data && data.title) || acc
			}, null)

			changeTitle(title)
		})
	])
}
