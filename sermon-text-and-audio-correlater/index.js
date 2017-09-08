require('loud-rejection')()

const Butler = require('noddity-butler')
const level = require('level-mem')
const denodeify = require('then-denodeify')
const Retrieval = require('noddity-fs-retrieval')
const sh = require('shell-tag')

const compareDateAsc = require('date-fns/compare_asc')
const formatDate = require('date-fns/format')
const isSunday = require('date-fns/is_sunday')
const addDays = require('date-fns/add_days')

const getSermonAudioData = require('./sermon-rss')
const passageToRange = require('./passage-to-range')

sh`
cd /Users/josh/code/KayserCommentary
git fetch upstream
git checkout upstream/master
rm -rf content
node ci/deploy/bin.js Markdown/Web/ ./content
`

const retrieval = new Retrieval('/Users/josh/code/KayserCommentary/content')

const butler = Butler(retrieval, level('server'), {
	parallelPostRequests: 10,
})

const getPosts = denodeify(butler.getPosts)

async function main() {
	const [
		posts, sermonAudioData,
	] = await Promise.all([
		getPosts(), getSermonAudioData(),
	])

	const dateToIdAndTitle = sermonAudioData.reduce((map, { id, title, dateString }) => {
		map[dateString] = { id, title }
		return map
	}, Object.create(null))

	const revelationPosts = posts.filter(post => {
		return post.metadata.published
			&& /^Sermons\/New Testament\/Revelation\/Revelation/.test(post.filename)
			&& !/GraphicsCharts/.test(post.filename)
			&& !/Revelation timeline/.test(post.filename)
	}).map(({ filename, metadata }) => {
		const { passage, date, title } = metadata
		return {
			title,
			passage,
			filename,
			date,
		}
	}).sort((postA, postB) => {
		return compareDateAsc(postA.date, postB.date)
	})

	// print(revelationPosts)

	const audioIdsSeenAlready = new Set()

	const postsAndAudio = revelationPosts.map(({ filename, passage, date, title }) => {
		const isoDateString = formatDate(nextSunday(date), 'YYYY-MM-DD')
		const audioId = dateToIdAndTitle[isoDateString] && dateToIdAndTitle[isoDateString].id

		if (audioId) {
			if (audioIdsSeenAlready.has(audioId)) {
				throw new Error(`Can't add sermon audioId ${audioId} to the sermon list twice!`)
			}
			audioIdsSeenAlready.add(audioId)
		}
		// console.log(isoDateString, dateToId[isoDateString])
		const range = isoDateString === '2015-04-26' ? [ [ 21, 1 ], [ 21, 1 ] ] : passageToRange(passage)
		return {
			title,
			passage,
			range,
			filename,
			date: isoDateString,
			audioId: dateToIdAndTitle[isoDateString] && dateToIdAndTitle[isoDateString].id,
			// audioTitle: dateToIdAndTitle[isoDateString] && dateToIdAndTitle[isoDateString].title
		}
	})

	save(postsAndAudio)
}

const rangeRegex = /"range": \[\s*\[\s*(\d+),\s*(\d+)\s*\],\s*\[\s*(\d+),\s*(\d+)\s*\]\s*\]/mg

function toJson(structure) {
	const json = JSON.stringify(structure, null, '\t')
	return json.replace(rangeRegex, (match, startChapter, startVerse, endChapter, endVerse) => {
		return `"range": [[${startChapter},${startVerse}], [${endChapter},${endVerse}]]`
	})
}

function print(structure) {
	console.log(toJson(structure))
}

function save(structure) {
	const json = toJson(structure)
	require('fs').writeFileSync('../client/lib/sermons/sermons.json', json)
}

function nextSunday(date) {
	if (isSunday(date)) {
		return date
	} else {
		return nextSunday(addDays(date, 1))
	}
}

main()
