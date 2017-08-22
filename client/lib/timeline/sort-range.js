const { relative: rangeSort } = require('multi-part-range-compare')

module.exports = function sortRange(ary, getRangeValues) {
	return ary.slice().sort((a, b) => {
		const bValue = getRangeValues(b)
		return rangeSort(bValue, bValue, getRangeValues(a))
	})
}
