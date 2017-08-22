function createIndentLevelCalculator() {
	const indentLevels = []
	return event => {
		const eventDate = event.amd
		const replaceIndent = indentLevels.findIndex(previousDate => previousDate.end < eventDate.start)
		if (replaceIndent === -1) {
			indentLevels.push(eventDate)
			return indentLevels.length - 1
		} else {
			indentLevels[replaceIndent] = eventDate
			return replaceIndent
		}
	}
}

export default function addIndentAndAxisAfterStart(events, startDay, endDay) {
	const getIndentLevel = createIndentLevelCalculator()
	return events.map(event => {
		if (event.axis.start === undefined || event.axis.end === undefined) {
			console.error(event)
			throw new Error(`No axis values for ${event.title}`)
		}
		const axisAfterStart = Math.max(event.axis.start - startDay, 0)
		const eventDays = event.axis.end - event.axis.start + 1
		const daysBeforeStart = Math.max(startDay - event.axis.start, 0)
		const daysAfterEnd = Math.max(event.axis.end - endDay, 0)
		const visibleDays = eventDays - daysBeforeStart - daysAfterEnd
		return Object.assign({
			indentLevel: getIndentLevel(event),
			axisAfterStart,
			visibleDays
		}, event)
	})
}
