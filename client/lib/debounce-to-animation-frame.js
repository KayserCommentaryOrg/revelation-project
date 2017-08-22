export default function debounce(fn) {
	var alreadyCalled = false
	return (...args) => {
		if (!alreadyCalled) {
			alreadyCalled = true
			window.requestAnimationFrame(() => {
				fn(...args)
				alreadyCalled = false
			})
		}
	}
}
