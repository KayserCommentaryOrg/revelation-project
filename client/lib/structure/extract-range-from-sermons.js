import withinRange from 'multi-part-range-compare'

export default function extractRangeFromSermons(sermons, range) {
	const [ rangeStart, rangeEnd ] = range
	const matching = []

	let insideMatchingRange = false
	let hitEndOfRange = false
	sermons.forEach(sermon => {
		if (!hitEndOfRange) {
			const currentSermonIsInRange = withinRange(rangeStart, rangeEnd, sermon.range[0])

			hitEndOfRange = insideMatchingRange && !currentSermonIsInRange
			insideMatchingRange = currentSermonIsInRange

			if (insideMatchingRange) {
				matching.push(sermon)
			}
		}
	})

	return matching
}
