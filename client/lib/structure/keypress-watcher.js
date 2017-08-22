import inViewport from 'lib/in-viewport'
import getParametersWithTranslationToggled from 'lib/toggle-translation-parameter'
import createKeyboardListener from 'lib/keyboard-shortcut'

const keyCodes = {
	g: 71
}

export default function startKeypressWatcher(router) {
	createKeyboardListener({
		[keyCodes.g]: () => {
			const parameters = getParametersWithTranslationToggled(router.getCurrentParameters())

			router.navigate({
				parameters,
				element: getFirstAnchorInViewport()
			})
		}
	})
}

function getFirstAnchorInViewport() {
	const firstAnchorInViewport = [...document.querySelectorAll('a')]
		.find(element => element.id && inViewport(element))

	return firstAnchorInViewport
}
