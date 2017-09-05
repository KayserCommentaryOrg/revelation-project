const rangeRegex = /\s(\d+):(\d+)[a-z]?(-(\d+)(:(\d+))?)?/
const START_CHAPTER = 1
const START_VERSE = 2
const END_1 = 4
const END_2 = 6

module.exports = parse
function parse(str) {
	const matches = str.match(rangeRegex)

	if (!matches) {
		return null
	}

	const startChapter = parseInt(matches[START_CHAPTER], 10)
	const startVerse = parseInt(matches[START_VERSE], 10)
	if (!matches[END_1]) {
		return [
			[startChapter, startVerse],
			[startChapter, startVerse]
		]
	}

	const endHasTwoParts = !!matches[END_2]

	const endChapter = endHasTwoParts ? parseInt(matches[END_1], 10) : startChapter
	const endVerse = parseInt(endHasTwoParts ? matches[END_2] : matches[END_1], 10)

	return [
		[startChapter, startVerse],
		[endChapter, endVerse]
	]
}

// const testInput = [
// 	"Genesis; Revelation",
// 	"Revelation 1:1",
// 	"Revelation 1:1b",
// 	"Revelation 1:1c",
// 	"Revelation 1:2a",
// 	"Revelation 1:2b",
// 	"Revelation 1:2c",
// 	"Revelation 1:3a-c",
// 	"Revelation 1:3d-e",
// 	"Revelation 1:4a",
// 	"Revelation 1:4b-6",
// 	"Revelation 1:7-8",
// 	"Revelation 1:9a",
// 	"Revelation 1:9b",
// 	"Revelation 1:9c-11",
// 	"Revelation 1:12-20",
// 	"Revelation 2:1-7",
// 	"Revelation 2:8-11",
// 	"Revelation 2:12-17",
// 	"Revelation 2:18-29",
// 	"Revelation 2:18-29",
// 	"Revelation 3:7-13",
// 	"Revelation 3:14-22",
// 	"Revelation 4:1-5",
// 	"Revelation 4:6b-8",
// 	"Revelation 5:1",
// 	"Revelation 5:2-7",
// 	"Revelation 5:8-14",
// 	"Revelation 6:1-8",
// 	"Revelation 6:1-2",
// 	"Revelation 6:3-4",
// 	"Revelation 6:5-6",
// 	"Revelation 6:7-8",
// 	"Revelation 6:9-11",
// 	"Revelation 7:1-8",
// 	"Revelation 7:9-17, part 1",
// 	"Revelation 7:9-17, part2",
// 	"Revelation 7:12",
// 	"Revelation 8:1-6",
// 	"Revelation 8:7",
// 	"Revelation 8:8-9",
// 	"Revelation 8:10-11",
// 	"Revelation 8:12-13",
// 	"Revelation 9:1-12, part 1",
// 	"Revelation 9:1-12, part 2",
// 	"Revelation 9:1-12, part 3",
// 	"Revelation 9:1-12, part 4",
// 	"Revelation 9:13-16",
// 	"Revelation 9:13-16",
// 	"Revelation 10:1-11, part 1",
// 	"Revelation 10:1-11, part 2",
// 	"Revelation 10:1-11, part 3",
// 	"Revelation 10:1-11, part 4",
// 	"Revelation 11:1-2",
// 	"Revelation 11:3-7, part 1",
// 	"Revelation 11:3-7, part 2",
// 	"Revelation 11:7",
// 	"Revelation 11:8",
// 	"Revelation 11:8-12:4"
// ]

// console.log(testInput.map(parse))
