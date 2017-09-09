import Text from './Text.html'

import load from 'dynamic-import-iife'
import pProps from 'p-props'

import combineStructureWithSermons from 'lib/structure/combine-structure-with-sermons'

const structureWithSermonsPromise = Promise.all([
	load('/static/sermons.json', { type: 'json' }),
	load('/static/structure.js'),
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
		})
	},
})
