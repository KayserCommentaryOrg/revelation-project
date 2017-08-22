import { MINIMUM_MEANINGFUL_IDENTIFIER_LENGTH } from 'lib/structure/constants'

const chiasmColors = {
	a: '#018d5d',
	b: '#ba4460',
	c: '#9ea946',
	d: '#00479f',
	e: '#c26939',
	f: '#8188df',
	g: '#ee6bd4',
	introduction: '#7d7d7d',
}

export default function getChiasmColor(identifier) {
	if (identifier.length < MINIMUM_MEANINGFUL_IDENTIFIER_LENGTH) {
		const key = identifier[identifier.length - 1].toLowerCase()
		return chiasmColors[key]
	} else {
		return chiasmColors[identifier]
	}
}
