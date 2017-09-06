function typeOf(o) {
	if (o === null) {
		return 'null'
	}

	return Array.isArray(o) ? 'array' : typeof o
}

function arraysEqual(a, b) {
	return a.length === b.length
		&& a.every((value, index) => valuesEqual(value, b[index]))
}

function objectsEqual(a, b) {
	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)

	return aKeys.length === bKeys.length
		&& aKeys.every(key => valuesEqual(a[key], b[key]))
}

function valuesEqual(a, b) {
	const type = typeOf(a)
	if (type !== typeOf(b)) {
		return false
	} else if (type === 'array') {
		return arraysEqual(a, b)
	} else if (type === 'object') {
		return objectsEqual(a, b)
	} else {
		return a === b
	}
}

export default valuesEqual
