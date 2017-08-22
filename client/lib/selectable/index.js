import Selectable from './Selectable.html'
import EventEmitter from 'eventemitter3'

export default createInstance()

function createInstance() {
	const emitter = new EventEmitter()

	return function SelectableProxy(options) {
		const component = new Selectable(options)

		const emitterListener = identifier => component.set({
			currentlySelectableIdentifier: identifier
		})

		emitter.on('selection possibility', emitterListener)

		component.on('selection possibility', identifier => emitter.emit('selection possibility', identifier))
		component.on('destroy', () => emitter.removeListener('selection possibility', emitterListener))

		return component
	}
}
