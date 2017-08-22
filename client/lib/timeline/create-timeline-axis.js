const pipe = require('lib/pipe.js')

const flatMap = (fn, ary) => ary.reduce((acc, element) => [ ...acc, ...fn(element) ], [])
const safeGet = (object, property, ...rest) => {
	const nextObject = object && object[property]
	return rest.length > 0 ? safeGet(nextObject, ...rest) : nextObject
}
const getDates = (property, object) => ({
	hebrew: safeGet(object, 'hebrew', property),
	macedonian: safeGet(object, 'macedonian', property),
	gregorian: safeGet(object, 'gregorian', property),
	amd: safeGet(object, 'amd', property),
})
const amdSort = (a, b) => a.amd - b.amd

module.exports = createTimelineAxis
function createTimelineAxis({ timelineData, snipSectionsLongerThan, snipBuffer, start, end }) {
	const naiveAxisMarkers = flatMap(event => {
		return event.amd.start === event.amd.end
			? [ getDates('start', event) ]
			: [ getDates('start', event), getDates('end', event) ]
	}, timelineData)
		.filter(point => point.amd >= start && point.amd <= end)
		.sort(amdSort)

	return pipe(naiveAxisMarkers,
		mergeDuplicates,
		_ => addSnipEvents(_, snipSectionsLongerThan, snipBuffer),
		calculateAxisPoints
	)
}


const mergeProperties = (target, object, pickValueToKeep = (a, b) => a === undefined ? b : a) => {
	Object.keys(object)
		.forEach(key => target[key] = pickValueToKeep(target[key], object[key]))
	return target
}

const both = (a, b, type) => typeof a === type && typeof b === type
const returnLargest = (a, b) => {
	if (a === undefined) {
		return b
	} else if (b === undefined) {
		return a
	} else if (both(a, b, 'number')) {
		return a > b ? a : b
	} else if (both(a, b, 'string')) {
		return a.length > b.length ? a : b
	} else if (typeof a === 'string') {
		return a
	} else if (typeof b === 'string') {
		return b
	}

	return a
}
const mergeLongerProperties = (a, b) => {
	if (!b) {
		return a
	}
	if (!a) {
		return b
	}

	return mergeProperties(mergeProperties({}, a), b, returnLargest)
}

function mergeDuplicates(dates) {
	const map = dates.reduce((map, date) => {
		map[date.amd] = mergeLongerProperties(date, map[date.amd])
		return map
	}, {})

	return Object.keys(map).map(amd => map[amd]).sort(amdSort)
}

function addSnipEvents(dates, snipSectionsLongerThan, snipBuffer) {
	if (!snipSectionsLongerThan) {
		return dates
	}
	let lastDay = null

	return flatMap(date => {
		if (lastDay) {
			const delta = date.amd - lastDay
			if (delta > snipSectionsLongerThan) {
				const snipDays = delta - (snipBuffer * 2)
				const snip = {
					type: 'snip',
					days: snipDays,
					start: lastDay + snipBuffer,
					end: date.amd - snipBuffer,
				}
				lastDay = date.amd
				return [ snip, date ]
			}
		}

		lastDay = date.amd

		return [ date ]
	}, dates)
}

// axis points: number of visible days from the top of the timeline
function calculateAxisPoints(dates) {
	let snippedSoFar = 0

	return dates.map(date => {
		if (date.type === 'snip') {
			const axisPoint = date.start - snippedSoFar
			snippedSoFar += date.days
			return Object.assign({ axisPoint }, date)
		} else {
			return Object.assign({
				axisPoint: date.amd - snippedSoFar,
			}, date)
		}
	})
}

// console.log(createTimelineAxis(require('./filter-and-sort')(require('./timeline-data')), 5).map(date => {
// 	return Object.assign({
// 		afterCrucifixion: (date.start || date.amd) - 1471937
// 	}, date)
// }))
