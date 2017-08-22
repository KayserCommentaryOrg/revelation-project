export default function getParametersWithTranslationToggled(parameters) {
	const isCurrentlyGreek = parameters.translation === 'greek'
	const toggledTranslation = isCurrentlyGreek ? 'english' : 'greek'

	const newParameters = Object.assign({}, parameters, {
		translation: toggledTranslation
	})

	if (toggledTranslation === 'english') {
		delete newParameters.translation
	}

	return newParameters
}
