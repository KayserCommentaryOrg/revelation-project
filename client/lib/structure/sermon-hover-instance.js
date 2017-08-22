import withinRange from 'multi-part-range-compare'
import createHoverInstance from 'lib/hover/index'

function verseIsInSermonRange(targetVerse, sermonRange) {
	return withinRange(sermonRange[0], sermonRange[1], targetVerse)
}

export default createHoverInstance(verseIsInSermonRange)
