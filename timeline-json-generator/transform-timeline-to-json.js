const fs = require('fs')
const got = require('got')
const pify = require('pify')
const sortRange = require('../client/lib/timeline/sort-range.js')
const readFile = pify(fs.readFile)
const {
	parseIntegerRange,
	parseAnyRange,
} = require('./parse-range.js')

const longPropertyNames = {
	h: 'hebrew',
	s: 'macedonian',
	g: 'gregorian',
	r: 'reference',
	dayheight: 'dayHeight',
}

// if a non-AMD date is empty or NA, ignore it
// collect all description lines (lines without an opening dash) into a single field/array


async function get() {
	// const markdown = await readFile('./demo-input.md', { encoding: 'utf8' })
	const { body: markdown } = await got('https://biblicalblueprints.com/Sermons/New%20Testament/Revelation/Revelation%20timeline')

	return markdown
}

const keepPropertyNames = [ 'title', 'josephus war', 'r', 'type' ]
const datePropertyNames = [ 'h', 's', 'g', 'amd' ]
const integerDatePropertyNames = [ 'amd' ]
const floatPropertyNames = [ 'dayheight' ]

async function main() {
	const markdown = await get()
	//fs.readFileSync('./timeline.md', { encoding: 'utf8' })

	const structure = matches(markdown).map(({ title, properties }) => {
		const newEvent = {
			title,
		}
		copyAndElongatePropertyNames(properties, newEvent)

		return newEvent
	}).filter(({ title, amd }) => {
		const hasAmdDay = amd && amd.start !== undefined

		if (!hasAmdDay) {
			throw new Error(`No AMD date for ${title}`)
		}

		return hasAmdDay
	})

	const sorted = sortRange(structure, event => [ event.amd.start, event.amd.end ])
	// const withNicestDates = addLongestAvailableDates(sorted)

	fs.writeFileSync('./public/static/timeline-data.json', formattedJson(addSlugs(sorted)) + '\n')
}

main().catch(err => {
	console.error(err)
})

function addSlugs(events) {
	return events.map(event => Object.assign(event, {
		slug: event.title
			.toLowerCase()
			.replace(/\s+/g, () => '-')
			.replace(/[^\w\d-]/g, () => '')
			.replace(/-{2,}/g, () => '-'),
	}))
}

function addLongestAvailableDates(events) {
	const safeGet = (object, property, ...rest) => {
		const nextObject = object && object[property]
		return rest.length > 0 ? safeGet(nextObject, ...rest) : nextObject
	}
	const dateKeys = [ 'hebrew', 'macedonian', 'gregorian' ]
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

	const amdDateToOtherDates = events.reduce((map, event) => {
		map[event.amd.start] = map[event.amd.start] || {}
		map[event.amd.end] = map[event.amd.end] || {}

		dateKeys.filter(key => event[key]).forEach(key => {
			map[event.amd.start][key] = returnLargest(map[event.amd.start][key], event[key].start)
			map[event.amd.end][key] = returnLargest(map[event.amd.end][key], event[key].end)
		})

		return map
	}, Object.create(null))

	const getNiceDateRange = (event, calendar) => ({
		start: amdDateToOtherDates[event.amd.start][calendar],
		end: amdDateToOtherDates[event.amd.end][calendar],
	})

	return events.map(event => Object.assign(event, {
		hebrew: getNiceDateRange(event, 'hebrew'),
		macedonian: getNiceDateRange(event, 'macedonian'),
		gregorian: getNiceDateRange(event, 'gregorian'),
	}))
}


function formattedJson(structure) {
	return JSON.stringify(structure, null, '\t')
}

function matches(str) {
	var match
	const regex = /^[-+]([^-].+?)\n((?:\n|(?:[^-].*\n))+)/gm

	const output = []
	while ((match = regex.exec(str)) !== null) {
		const [ , first, second ] = match

		if (first && second) {
			output.push({
				title: first.trim(),
				properties: turnLinesToObject(parseChildLines(second)),
			})
		}
	}

	return output
}

function parseChildLines(str) {
	var match
	const propertiesRegex = /^\t[-+](.+)$/gm
	const output = []
	while ((match = propertiesRegex.exec(str)) !== null) {
		output.push(match[1].trim())
	}
	return output
}

function isShortDateFieldName(field) {
	return datePropertyNames.indexOf(field) >= 0
}

function isIntegerDateFieldName(field) {
	return integerDatePropertyNames.indexOf(field) >= 0
}

function isFloatFieldName(field) {
	return floatPropertyNames.indexOf(field) >= 0
}

function rangeArrayToObject([ start, end ]) {
	return { start, end }
}

function turnLinesToObject(lines) {
	const o = {}

	lines.forEach(str => {
		const parts = str.split(/:\s*/)
		const secondPart = parts.slice(1).join(':').trim()

		const shortFieldName = parts[0].toLowerCase()
		if (secondPart) {
			if (isIntegerDateFieldName(shortFieldName)) {
				o[shortFieldName] = rangeArrayToObject(parseIntegerRange(secondPart))
			} else if (isShortDateFieldName(shortFieldName)) {
				o[shortFieldName] = rangeArrayToObject(parseAnyRange(secondPart))
			} else if (keepPropertyNames.indexOf(shortFieldName) >= 0) {
				o[shortFieldName] = secondPart
			} else if (isFloatFieldName(shortFieldName)) {
				o[shortFieldName] = parseFloat(secondPart)
			} else {
				console.log('Unknown field name', shortFieldName)
			}
		} else if (keepPropertyNames.indexOf(shortFieldName) === -1){
			console.log('Unparseable line', str)
		}
	})

	return o
}

function copyAndElongatePropertyNames(o, target) {
	Object.keys(o).forEach(key => target[longPropertyNames[key] || key] = o[key])
}
