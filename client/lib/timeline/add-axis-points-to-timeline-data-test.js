const tape = require('tape')

const addAxisPoints = require('./add-axis-points-to-timeline-data.js')

tape(`add axis points to timeline data`, t => {
	const axisData = [
		{
			axisPoint: 1471939,
			hebrew: 'Ab 16, 4030',
			macedonian: 'Xanthicus 16, 341',
			gregorian: 'April 6, 30',
			amd: 1471939
		}, {
			axisPoint: 1471955,
			hebrew: '4030',
			macedonian: '341',
			gregorian: 'April 22, 30',
			amd: 1471955
		}, {
			axisPoint: 1471977,
			hebrew: 'Iyar 24, 4030',
			macedonian: 'Xanthicus 24, 341',
			gregorian: 'May 14, 30',
			amd: 1471977
		}, {
			axisPoint: 1471982,
			type: 'snip',
			days: 2488,
			start: 1471982,
			end: 1474470
		}, {
			axisPoint: 1471987,
			hebrew: '4037',
			macedonian: '348',
			gregorian: 'March 16, 37',
			amd: 1474475
		}, {
			axisPoint: 1471992,
			type: 'snip',
			days: 1400,
			start: 1474480,
			end: 1475880
		}, {
			axisPoint: 1471997,
			hebrew: '4040',
			macedonian: '351',
			gregorian: 'January 24, 41',
			amd: 1475885
		}
	]

	const timelineData = [
		{
			title: 'Resurrection',
			hebrew: { start: 'Ab 16, 4030', end: 'Ab 16, 4030' },
			macedonian: { start: 'Xanthicus 16, 341', end: 'Xanthicus 16, 341' },
			gregorian: { start: 'April 6, 30', end: 'April 6, 30' },
			amd: { start: 1471939, end: 1471939 }
		}, {
			title: 'First Seal - Tiberius',
			hebrew: { start: '4030', end: '4037' },
			macedonian: { start: '341', end: '348' },
			gregorian: { start: 'April 22, 30', end: 'March 16, 37' },
			amd: { start: 1471955, end: 1474475 },
			reference: 'Revelation 6:1-2'
		}, {
			title: 'Ascension',
			hebrew: { start: 'Iyar 24, 4030', end: 'Iyar 24, 4030' },
			macedonian: { start: 'Xanthicus 24, 341', end: 'Xanthicus 24, 341' },
			gregorian: { start: 'May 14, 30', end: 'May 14, 30' },
			amd: { start: 1471977, end: 1471977 },
			reference: 'Revelation 4-5'
		}, {
			title: 'Second Seal - Caligula',
			hebrew: { start: '4037', end: '4040' },
			macedonian: { start: '348', end: '351' },
			gregorian: { start: 'March 16, 37', end: 'January 24, 41' },
			amd: { start: 1474475, end: 1475885 },
			reference: 'Revelation 6:3-4'
		}
	]

	const expected = [
		{
			title: 'Resurrection',
			hebrew: { start: 'Ab 16, 4030', end: 'Ab 16, 4030' },
			macedonian: { start: 'Xanthicus 16, 341', end: 'Xanthicus 16, 341' },
			gregorian: { start: 'April 6, 30', end: 'April 6, 30' },
			amd: { start: 1471939, end: 1471939 },
			axis: { start: 1471939, end: 1471939, cutOffAtStart: false, cutOffAtEnd: false }
		}, {
			title: 'First Seal - Tiberius',
			hebrew: { start: '4030', end: '4037' },
			macedonian: { start: '341', end: '348' },
			gregorian: { start: 'April 22, 30', end: 'March 16, 37' },
			amd: { start: 1471955, end: 1474475 },
			reference: 'Revelation 6:1-2',
			axis: { start: 1471955, end: 1471987, cutOffAtStart: false, cutOffAtEnd: false }
		}, {
			title: 'Ascension',
			hebrew: { start: 'Iyar 24, 4030', end: 'Iyar 24, 4030' },
			macedonian: { start: 'Xanthicus 24, 341', end: 'Xanthicus 24, 341' },
			gregorian: { start: 'May 14, 30', end: 'May 14, 30' },
			amd: { start: 1471977, end: 1471977 },
			reference: 'Revelation 4-5',
			axis: { start: 1471977, end: 1471977, cutOffAtStart: false, cutOffAtEnd: false }
		}, {
			title: 'Second Seal - Caligula',
			hebrew: { start: '4037', end: '4040' },
			macedonian: { start: '348', end: '351' },
			gregorian: { start: 'March 16, 37', end: 'January 24, 41' },
			amd: { start: 1474475, end: 1475885 },
			reference: 'Revelation 6:3-4',
			axis: { start: 1471987, end: 1471997, cutOffAtStart: false, cutOffAtEnd: false }
		}
	]

	const actual = addAxisPoints(axisData, timelineData)

	t.deepEqual(actual, expected)

	t.end()
})

tape(`Add axis points when some events start before or after the current range`, t => {
	const axisData = [{
		"axisPoint": 1483532,
		"amd": 1483532
	}, {
		"axisPoint": 1483647,
		"amd": 1483647
	}, {
		"axisPoint": 1483697,
		"type": "snip",
		"days": 1367,
		"start": 1483697,
		"end": 1485064
	}, {
		"axisPoint": 1483747,
		"amd": 1485114
	}, {
		"axisPoint": 1483762,
		"amd": 1485129
	}, {
		"axisPoint": 1483803,
		"amd": 1485170
	}, {
		"axisPoint": 1483862,
		"amd": 1485229
	}, {
		"axisPoint": 1483871,
		"amd": 1485238
	}, {
		"axisPoint": 1483875,
		"amd": 1485242
	}, {
		"axisPoint": 1483889,
		"amd": 1485256
	}, {
		"axisPoint": 1483896,
		"amd": 1485263
	}, {
		"axisPoint": 1483913,
		"amd": 1485280
	}, {
		"axisPoint": 1483928,
		"amd": 1485295
	}, {
		"axisPoint": 1483931,
		"amd": 1485298
	}, {
		"axisPoint": 1484041,
		"amd": 1485408
	}, {
		"axisPoint": 1484077,
		"amd": 1485444
	}, {
		"axisPoint": 1484127,
		"type": "snip",
		"days": 339,
		"start": 1485494,
		"end": 1485833
	}, {
		"axisPoint": 1484177,
		"amd": 1485883
	}]

	const timelineData = [{
		"title": "Seven seals",
		"amd": { "start": 1471939, "end": 1485229 },
	}, {
		"title": "Fifth Seal",
		"amd": { "start": 1483532, "end": 1485114 },
	}, {
		"title": "Jewish preparations for defence of temple and city start in earnest",
		"amd": { "start": 1485408, "end": 1485408 },
	}, {
		"title": "First three and a half years of the war of Titus the prince",
		"amd": { "start": 1485408, "end": 1486668 },
	}, {
		"title": "Seven trumpets",
		"amd": { "start": 1485242, "end": 1486668 },
	}]

	const expected = [{
		"title": "Seven seals",
		"amd": { "start": 1471939, "end": 1485229 },
		"axis": { "start": 1483532, "end": 1483862, cutOffAtEnd: false, cutOffAtStart: true },
	}, {
		"title": "Fifth Seal",
		"amd": { "start": 1483532, "end": 1485114 },
		"axis": { "start": 1483532, "end": 1483747, cutOffAtEnd: false, cutOffAtStart: false },
	}, {
		"title": "Jewish preparations for defence of temple and city start in earnest",
		"amd": { "start": 1485408, "end": 1485408 },
		"axis": { "start": 1484041, "end": 1484041, cutOffAtEnd: false, cutOffAtStart: false },
	}, {
		"title": "First three and a half years of the war of Titus the prince",
		"amd": { "start": 1485408, "end": 1486668 },
		"axis": { "start": 1484041, "end": 1484177, cutOffAtEnd: true, cutOffAtStart: false },
	}, {
		"title": "Seven trumpets",
		"amd": { "start": 1485242, "end": 1486668 },
		"axis": { "start": 1483875, "end": 1484177, cutOffAtEnd: true, cutOffAtStart: false },
	}]

	const actual = addAxisPoints(axisData, timelineData)

	t.deepEqual(actual, expected)

	t.end()
})
