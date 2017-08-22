import Selectable from './Selectable.html'
import createEmitter from 'better-emitter'

export default createInstance()

function createInstance() {
	const emitter = createEmitter()

	return function SelectableProxy(options) {
		const component = new Selectable(options)

		const removeListener = emitter.on('selection possibility',
			identifier => component.set({ currentlySelectableIdentifier: identifier })
		)

		component.on('selection possibility', identifier => emitter.emit('selection possibility', identifier))
		component.on('destroy', removeListener)

		return component
	}
}
