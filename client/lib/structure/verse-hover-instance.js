import withinRange from 'multi-part-range-compare'
import createHoverInstance from 'lib/hover/index'

function sermonContainsVerseRange(sermonRange, verseReference) {
	return withinRange(sermonRange[0], sermonRange[1], verseReference)
}

export default createHoverInstance(sermonContainsVerseRange)
