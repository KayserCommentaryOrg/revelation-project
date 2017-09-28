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

const roughChapterToChiasmMap = {
	1: chiasmColors.b,
	2: chiasmColors.b,
	3: chiasmColors.b,
	4: chiasmColors.c,
	5: chiasmColors.c,
	6: chiasmColors.c,
	7: chiasmColors.c,
	8: chiasmColors.d,
	9: chiasmColors.d,
	10: chiasmColors.d,
	11: chiasmColors.d,
	12: chiasmColors.e,
	13: chiasmColors.e,
	14: chiasmColors.e,
	15: chiasmColors.d,
	16: chiasmColors.d,
	17: chiasmColors.c,
	18: chiasmColors.c,
	19: chiasmColors.b,
	20: chiasmColors.b,
	21: chiasmColors.b,
	22: chiasmColors.b,
}

export function getChapterColor(chapterNumber) {
	return roughChapterToChiasmMap[chapterNumber]
}
