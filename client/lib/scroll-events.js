import motionEvent from './motion-event.js'

import createEmitter from 'better-emitter'

const scrollEventEmitter = createEmitter()

function debounceStartAndStop(fn, delay = 300) {
	let timeoutId = null
	return () => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		} else {
			fn('start')
		}

		timeoutId = setTimeout(() => {
			timeoutId = null
			fn('stop')
		}, delay)
	}
}

motionEvent.on('update', debounceStartAndStop(event => {
	scrollEventEmitter.emit(event)
}, 200))

export default scrollEventEmitter
