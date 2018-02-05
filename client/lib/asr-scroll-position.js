import historyState from 'lib/history-state'
import afterSuccessfulStateChange from 'lib/after-successful-state-change'

// on scroll/resize, update the current position in state
// on old state, wait for stateChangeEnd, then scroll to the position from state
// on new state, wait for stateChangeEnd, then scroll to the anchor if it exists, else scroll to top

const currentAnchor = () => window.location.hash.replace(/^#/, ``)
const scrollToElement = element => element && element.scrollIntoView()
const getElementById = id => id && document.getElementById(id)
const scrollToTop = () => window.scrollTo(0, 0)
const atTop = () => window.scrollX === 0 && window.scrollY === 0
const windowListener = (event, listener) => window.addEventListener(event, listener)
const currentPosition = () => ({ x: window.scrollX, y: window.scrollY })

export default function watchScrollPosition(stateRouter) {
	if (`scrollRestoration` in history) {
		history.scrollRestoration = `manual`
	}

	setUpInitialPosition(stateRouter)

	let changingStates = false

	stateRouter.on(`stateChangeStart`, () => changingStates = true)
	stateRouter.on(`stateChangeEnd`, () => changingStates = false)

	function updatePosition() {
		if (!changingStates) {
			historyState.update({
				position: currentPosition(),
			})
		}
	}

	historyState.on(`new state`, () => {
		afterSuccessfulStateChange(stateRouter, () => {
			const anchorElement = getElementById(currentAnchor())

			if (anchorElement) {
				scrollToElement(anchorElement)
			} else if (atTop()) {
				updatePosition()
			} else {
				scrollToTop()
			}
		})
	})

	historyState.addBeforePushStateMiddleware(state => Object.assign(state, { position: currentPosition() }))
	windowListener(`beforeunload`, updatePosition)

	const updatePositionDebounced = debounce(updatePosition, 350)

	windowListener(`scroll`, updatePositionDebounced)
	windowListener(`resize`, updatePositionDebounced)

	historyState.on(`old state`, ({ position }) => {
		scrollToStatePosition(position)
	})
}

function debounce(fn, interval) {
	let last = null
	let finalTimeout = null

	function resetFinalTimeout() {
		if (finalTimeout) {
			clearTimeout(finalTimeout)
			finalTimeout = null
		}
	}

	return function debounced() {
		const now = Date.now()

		resetFinalTimeout()
		if (!last || now - last >= interval) {
			last = now
			fn()
		} else {
			finalTimeout = setTimeout(debounced, interval)
		}
	}
}

function scrollToStatePosition(position, mayRetry = true) {
	if (position) {
		const { x, y } = position
		window.scrollTo(x, y)

		const scrolledFarEnough = window.scrollX >= x && window.scrollY >= y
		if (mayRetry && !scrolledFarEnough) {
			setTimeout(() => scrollToStatePosition(position, false), 0)
		}
	}
}

function setUpInitialPosition(stateRouter) {
	const initialState = historyState.get()
	if (initialState && initialState.position) {
		afterSuccessfulStateChange(stateRouter, () => scrollToStatePosition(initialState.position))
	} else {
		const anchor = currentAnchor()
		if (anchor) {
			afterSuccessfulStateChange(stateRouter, () => scrollToElement(getElementById(currentAnchor())))
		}
	}
}
