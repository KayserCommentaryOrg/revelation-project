const contains = (function () {
	if (!window.document) {
		throw new Error('NO GLOBAL DOCUMENT!')
	}

	if (window.document.documentElement.compareDocumentPosition) {
		return (container, element) => !!(container.compareDocumentPosition(element) & 16)
	} else if (window.document.documentElement.contains) {
		return (container, element) => container !== element && (container.contains ? container.contains(element) : false)
	}

	return (container, element) => {
		while (element = element.parentNode) {
			if (element === container) {
				return true
			}
		}
		return false
	}
})()

export default function isVisible(element, offset = 0) {
	if (!contains(window.document.documentElement, element)) {
		return false
	}

	// Check if the element is visible
	// https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
	// if (!element.offsetWidth || !element.offsetHeight) {
	// 	return false
	// }

	const elementRect = element.getBoundingClientRect()
	const viewport = {
		top: -offset,
		left: -offset,
		right: window.document.documentElement.clientWidth + offset,
		bottom: window.document.documentElement.clientHeight + offset
	}

	// The element must overlap with the visible part of the viewport
	const visible = elementRect.right >= viewport.left
		&& elementRect.left <= viewport.right
		&& elementRect.bottom >= viewport.top
		&& elementRect.top <= viewport.bottom

	return visible
}
