import oneToManyZip from 'one-to-many-array-zip'
import withinRange from 'multi-part-range-compare'
import compareDateAsc from 'date-fns/compare_asc'

import getSectionRange from 'lib/structure/get-section-range'

export default function combineStructureWithSermons(structure, sermons) {
	return oneToManyZip(structure, sortSermons(sermons), (section, sermon) => {
		const [ rangeStart, rangeEnd ] = getSectionRange(section)

		return withinRange(rangeStart, rangeEnd, sermon.range[0])
	}).map(({ one: section, many: sermons }) => Object.assign({}, section, { sermons }))
}

function sortSermons(sermons) {
	return [ ...sermons ].sort((a, b) => {
		const rangeComparison = withinRange.relative(b.range[0], b.range[0], a.range[0])

		if (rangeComparison === 0) {
			return compareDateAsc(a.date, b.date)
		}

		return rangeComparison
	})
}

