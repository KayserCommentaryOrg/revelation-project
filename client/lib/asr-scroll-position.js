import historyState from 'lib/history-state'
import afterSuccessfulStateChange from 'lib/after-successful-state-change'

// on scroll/resize, update the current position in state
// on old state, wait for stateChangeEnd, then scroll to the position from state
// on new state, wait for stateChangeEnd, then scroll to the anchor if it exists, else scroll to top

const currentAnchor = () => window.location.hash.replace(/^#/, '')
const scrollToElement = element => element && element.scrollIntoView()
const getElementById = id => id && document.getElementById(id)
const scrollToTop = () => window.scrollTo(0, 0)

export default function watchScrollPosition(stateRouter) {
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual'
	}

	setUpInitialPosition(stateRouter)

	let changingStates = false

	stateRouter.on('stateChangeStart', () => changingStates = true)
	stateRouter.on('stateChangeEnd', () => changingStates = false)

	function updatePosition() {
		if (!changingStates) {
			console.log('updating position to', window.scrollX, window.scrollY)
			historyState.update({
				position: {
					x: window.scrollX,
					y: window.scrollY,
				},
			})
		}
	}

	historyState.on('new state', () => {
		afterSuccessfulStateChange(stateRouter, () => {
			const anchorElement = getElementById(currentAnchor())

			if (anchorElement) {
				console.log('Scrolling to anchor')
				scrollToElement(anchorElement)
			} else {
				console.log('Scrolling to top')
				scrollToTop()
			}
		})
	})

	historyState.onBeforePushState(updatePosition)

	const updatePositionDebounced = debounce(updatePosition, 100)

	window.addEventListener('scroll', updatePositionDebounced)
	window.addEventListener('resize', updatePositionDebounced)

	historyState.on('old state', ({ position }) => {
		console.log('transitioned to old state, position is', position)
		scrollToStatePosition(position)
	})
}

function debounce(fn, interval) {
	let last = null
	return function debounced() {
		const now = Date.now()
		if (!last || now - last >= interval) {
			last = now
			fn()
		}
	}
}

function scrollToStatePosition(position) {
	if (position) {
		const { x, y } = position
		console.log('calling scrollTo', x, y)
		window.scrollTo(x, y)
	}
}

function setUpInitialPosition(stateRouter) {
	const initialState = historyState.get()
	if (initialState && initialState.position) {
		afterSuccessfulStateChange(stateRouter, () => scrollToStatePosition(initialState.position))
	}
}
