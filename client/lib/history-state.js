import makeEmitter from 'better-emitter'

const originalPushState = window.history.pushState
const originalReplaceState = window.history.replaceState

const KEY = '_super_cool_history_state_'

const callHistoryMethod = (method, ...args) => method.apply(window.history, args)
const getCoolState = () => window.history.state && window.history.state[KEY]

const beforePushStateMiddleware = []

const historyState = makeEmitter({
	update(newState) {
		const coolState = Object.assign({}, getCoolState(), newState)
		const actualState = Object.assign({}, window.history.state, { [KEY]: coolState })
		callHistoryMethod(originalReplaceState, actualState, '', window.location.href)
	},
	onBeforePushState(fn) {
		beforePushStateMiddleware.push(fn)
	},
	get() {
		return getCoolState()
	},
})

window.history.replaceState = (initialState, ...otherArgs) => {
	const actualState = Object.assign({}, initialState, { [KEY]: getCoolState() || {} })
	callHistoryMethod(originalReplaceState, actualState, ...otherArgs)
}

window.history.pushState = (initialState = {}, ...otherArgs) => {
	const coolState = beforePushStateMiddleware.reduce((state, fn) => fn(state), getCoolState())
	historyState.update(coolState)

	const newState = Object.assign({}, initialState, { [KEY]: {} })
	callHistoryMethod(originalPushState, newState, ...otherArgs)
	historyState.emit('new state')
}

window.addEventListener('popstate', function onPopState(event) {
	if (event.state) {
		const coolState = event.state[KEY]
		historyState.emit('old state', coolState)
	}
}, true)

export default historyState
