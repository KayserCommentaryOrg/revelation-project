import { VERSE_SECTION_RANGE_MIN, VERSE_SECTION_RANGE_MAX } from 'lib/structure/constants'

function guaranteeRangeSection(range, defaultSection = VERSE_SECTION_RANGE_MIN) {
	if (range.length === 3) {
		return range
	} else {
		return [ ...range, defaultSection ]
	}
}

export default function guaranteeRange([ rangeStart, rangeEnd ]) {
	return [
		guaranteeRangeSection(rangeStart, VERSE_SECTION_RANGE_MIN),
		guaranteeRangeSection(rangeEnd, VERSE_SECTION_RANGE_MAX),
	]
}
