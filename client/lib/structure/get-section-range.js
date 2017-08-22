export default function getSectionRange({ range, introduction }) {
	const rangeStart = introduction ? introduction.range[0] : range[0]
	const rangeEnd = range[1]

	return [
		rangeStart,
		rangeEnd
	]
}
