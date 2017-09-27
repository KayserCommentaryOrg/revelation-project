import Text from './Text.html'

import load from 'dynamic-import-iife'
import pProps from 'p-props'

import combineStructureWithSermons from 'lib/structure/combine-structure-with-sermons'

const structurePromise = load('/static/structure.js')
const structureWithSermonsPromise = Promise.all([
	load('/static/sermons.json', { type: 'json' }),
	structurePromise,
]).then(([ sermons, structure ]) => {
	return combineStructureWithSermons(structure, sermons)
})

export default mediator => ({
	name: 'main.structure.text',
	route: 'text',
	template: Text,
	resolve() {
		return pProps({
			translations: load('/static/revelation.js'),
			structureWithSermons: structureWithSermonsPromise,
			structure: structurePromise,
		})
	},
})
