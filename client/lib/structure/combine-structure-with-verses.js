import oneToManyZip from 'one-to-many-array-zip'
import withinRange from 'multi-part-range-compare'

import getSectionRange from 'lib/structure/get-section-range'

export default function combineStructureWithVerses(structure, verses) {
	return oneToManyZip(structure, verses, (section, verse) => {
		const [ rangeStart, rangeEnd ] = getSectionRange(section)

		return verse.type !== 'verse' || withinRange(rangeStart, rangeEnd, verseReference(verse))
	}).map(({ one: section, many: verses }) => Object.assign({}, section, { verses }))
}

function verseReference({ chapterNumber, verseNumber, sectionNumber }) {
	return [ chapterNumber, verseNumber, sectionNumber ]
}
