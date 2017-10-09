import pProps from 'p-props'
import load from 'dynamic-import-iife'

import PrinciplesOfInterpretation from './PrinciplesOfInterpretation.html'

import lazily from 'lib/lazily.js'

const loadSermonAudioIdToFilenameMap = lazily(() => load('/static/sermons.json', { type: 'json' })
	.then(sermons =>
		sermons.reduce((map, sermon) => {
			map[sermon.audioId] = sermon.filename
			return map
		}, Object.create(null))
	)
)



export default mediator => ({
	name: 'main.principles-of-interpretation',
	route: 'principles-of-interpretation',
	data: {
		title: `Principles of Interpretation`,
	},
	template: PrinciplesOfInterpretation,
	resolve() {
		return pProps({
			sermonAudioIdToFilename: loadSermonAudioIdToFilenameMap(),
		})
	},
})
