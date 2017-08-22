import EventEmitter from 'eventemitter3'

import HoverDetector from './HoverDetector.html'
import HoverReflector from './HoverReflector.html'

function defaultReflectionDecider(target, hoveredData) {
	return target === hoveredData
}

export default function createHoverComponents(shouldReflectChange = defaultReflectionDecider) {
	const emitter = new EventEmitter()
	let currentlyHoveredData = null

	function emit(hoverData) {
		currentlyHoveredData = hoverData
		emitter.emit('hover', hoverData)
	}

	return {
		HoverDetector: function detectorProxy(options) {
			const component = new HoverDetector(options)
			component.on('hoverstart', emit)
			component.on('hoverend', hoverData => {
				if (hoverData === currentlyHoveredData) {
					emit(null)
				}
			})

			return component
		},
		HoverReflector: function reflectorProxy(options) {
			const initializationOptions = Object.assign({}, options, {
				data: Object.assign({}, options.data, {
					shouldReflectChange
				})
			})
			const component = new HoverReflector(initializationOptions)
			function identifierChangeListener(hoverData) {
				component.set({
					currentlyHoveredData: hoverData
				})
			}
			emitter.on('hover', identifierChangeListener)
			component.on('teardown', () => emitter.removeListener('hover', identifierChangeListener))

			return component
		}
	}
}
