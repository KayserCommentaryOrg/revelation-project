const test = require('tape')
const sortRange = require('./sort-range.js')

const r = (a, b) => ({ a, b })

test(`Sort range`, t => {
	const unsorted = [ r(3, 1), r(1, 3), r(1, 2), r(2, 2), r(1, 1) ]
	const expected = [ r(1, 1), r(1, 2), r(1, 3), r(2, 2), r(3, 1) ]
	const actual = sortRange(unsorted, object => [ object.a, object.b ])
	t.deepEqual(actual, expected)
	t.end()
})
