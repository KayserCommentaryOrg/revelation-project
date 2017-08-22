import { VERSE_SECTION_RANGE_MIN } from 'lib/structure/constants'

export default function guaranteeRangeSection(range, defaultSection = VERSE_SECTION_RANGE_MIN) {
	if (range.length === 3) {
		return range
	} else {
		return [ ...range, defaultSection ]
	}
}
