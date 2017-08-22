export default function createListener(listeners) {
	document.addEventListener('keydown', event => {
		if (listeners.hasOwnProperty(event.keyCode)) {
			event.preventDefault()

			listeners[event.keyCode]()
		}
	})
}
