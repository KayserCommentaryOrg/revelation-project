import EfficientVisibility from './EfficientVisibility.html'
import debounce from 'lib/debounce-to-animation-frame.js'
import keyMaster from 'key-master'

const changeTracker = createChangeTracker()

const applyChanges = debounce(() => {
	const componentsToChange = keyMaster(() => ({}), new Map())
	const parentComponents = new Set()

	changeTracker.forEachEntry((component, change) => {
		const { parent, parentProperty, key } = change

		const componentChanges = componentsToChange.get(parent)
		parentComponents.add(parent)
		Object.assign(componentChanges, {
			[parentProperty]: Object.assign(componentChanges[parentProperty] || {}, {
				[key]: change,
			}),
		})
	})

	forOf(parentComponents.values(), parentComponent => {
		const changes = componentsToChange.get(parentComponent)

		const changesMergedWithOriginalState = {}
		Object.keys(changes).forEach(key => {
			const originalState = parentComponent.get(key)
			changesMergedWithOriginalState[key] = Object.assign({}, originalState, changes[key])
		})

		parentComponent.set(changesMergedWithOriginalState)
	})

	changeTracker.clear()
})

export default function EfficientVisibilityWrapper(options) {
	const component = new EfficientVisibility(options)

	let notVisibleChange = null

	component.observe('notVisibleChange', change => {
		if (change.parent) {
			notVisibleChange = change
		}
	})

	component.on('change', change => {
		if (change.parent) {
			changeTracker.add(component, change)
			applyChanges()
		}
	})

	component.on('destroy', () => {
		if (notVisibleChange) {
			changeTracker.add(component, notVisibleChange)
			applyChanges()
		}
	})

	return component
}

function createChangeTracker() {
	let visibilityComponentsToChanges = new WeakMap()
	let changedVisibilityComponents = new Set()

	return {
		add(component, change) {
			visibilityComponentsToChanges.set(component, change)
			changedVisibilityComponents.add(component)
		},
		clear() {
			visibilityComponentsToChanges = new WeakMap()
			changedVisibilityComponents = new Set()
		},
		forEachEntry(fn) {
			forOf(changedVisibilityComponents.keys(), component => {
				const change = visibilityComponentsToChanges.get(component)
				fn(component, change)
			})
		},
		changedComponents() {
			return changedVisibilityComponents.keys()
		},
	}
}

function forOf(iterable, fn) {
	for (const value of iterable) {
		fn(value)
	}
}
