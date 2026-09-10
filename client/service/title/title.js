export default mediator => {
	// The shell served by biblicalblueprints.com injects a per-URL <title>
	// (the one search engines index), so keep it for the initial load and
	// only take over on in-app navigation. When the bare public/index.html is
	// served (local dev) there is no title yet, so make one.
	let titleElement = document.querySelector('title')
	let keepServerTitle = !!(titleElement && titleElement.text)
	if (!titleElement) {
		titleElement = document.head.appendChild(document.createElement('title'))
	}

	const makeTitleText = title => title ? `${title} | Revelation Project` : `Revelation Project`
	const changeTitle = title => titleElement.text = makeTitleText(title)

	return Promise.all([
		mediator.call('onStateRouter', 'stateChangeStart', () => {
			if (!keepServerTitle) changeTitle()
		}),
		mediator.call('onStateRouter', 'stateChangeEnd', (state, params, states) => {
			if (keepServerTitle) {
				keepServerTitle = false
				return
			}
			const title = states.reduce((acc, { data }) => {
				return (data && data.title) || acc
			}, null)

			changeTitle(title)
		})
	])
}
