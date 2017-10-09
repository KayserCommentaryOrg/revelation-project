import Text from './Text.html'

import lazily from 'lib/lazily.js'

import load from 'dynamic-import-iife'
import pProps from 'p-props'

import combineStructureWithSermons from 'lib/structure/combine-structure-with-sermons'

const getStructurePromise = lazily(() => load('/static/structure.js'))
const getStructureWithSermonsPromise = lazily(() => Promise.all([
	load('/static/sermons.json', { type: 'json' }),
	getStructurePromise(),
]).then(([ sermons, structure ]) => {
	return combineStructureWithSermons(structure, sermons)
}))

export default mediator => ({
	name: 'main.structure.text',
	route: 'text',
	template: Text,
	resolve() {
		return pProps({
			translations: load('/static/revelation.js'),
			structureWithSermons: getStructureWithSermonsPromise(),
			structure: getStructurePromise(),
		})
	},
})
