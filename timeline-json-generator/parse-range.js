const r = require('regex-fun')

module.exports = {
	parseIntegerRange,
	parseAnyRange,
}

const number = /-?\d+/
const optionalSpaces = / */
const separator = r.either('-', r.combine(' to '))
const captureIf = (condition, value, regex) => condition === value ? r.capture(regex) : regex
const range = captureNumber => r.combine(
	'[',
	captureIf(captureNumber, 0, number),
	separator,
	captureIf(captureNumber, 1, number),
	']'
)

const integerRangeRegex = r.combine(
	/^/,
	optionalSpaces,
	r.either(r.capture(number), range(0)),
	r.optional(
		optionalSpaces,
		separator,
		optionalSpaces,
		r.either(r.capture(number), range(1))
	),
	optionalSpaces,
	/$/
)

function parseIntegerRange(string) {
	const match = integerRangeRegex.exec(string)

	if (!match) {
		return null
	}

	const [ , ...captures ] = match

	const matchedNumbers = captures.filter(capture => capture)

	return [ parseInt(matchedNumbers[0], 10), parseInt(matchedNumbers[matchedNumbers.length - 1], 10) ]
}

const anyRangeRegex = r.combine(
	/^/,
	optionalSpaces,
	r.capture(r.oneOrMoreNonGreedy(/[^\n]/)),
	r.optional(
		optionalSpaces,
		separator,
		optionalSpaces,
		r.capture(r.oneOrMoreNonGreedy(/[^\n]/))
	),
	optionalSpaces,
	/$/
)

function parseAnyRange(string) {
	const match = anyRangeRegex.exec(string)

	if (!match) {
		return null
	}

	const [ , ...captures ] = match
	const truthyCaptures = captures.filter(str => str)

	return [ truthyCaptures[0], truthyCaptures[truthyCaptures.length - 1] ]
}
