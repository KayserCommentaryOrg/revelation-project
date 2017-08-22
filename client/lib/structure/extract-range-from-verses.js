import withinRange from 'multi-part-range-compare'

export default function extractRangeFromVerses(verses, range) {
	const [ rangeStart, rangeEnd ] = range
	const matching = []

	let insideMatchingRange = false
	let hitEndOfRange = false
	verses.forEach(chunk => {
		if (!hitEndOfRange) {
			const { chapterNumber, verseNumber, sectionNumber } = chunk
			const isAnActualVerse = chunk.type === 'verse'

			if (isAnActualVerse) {
				const currentVerseIsInRange = withinRange(rangeStart, rangeEnd,
					[ chapterNumber, verseNumber, sectionNumber ])

				hitEndOfRange = insideMatchingRange && !currentVerseIsInRange
				insideMatchingRange = currentVerseIsInRange
			}

			if (insideMatchingRange) {
				matching.push(chunk)
			}
		}
	})

	return matching
}
