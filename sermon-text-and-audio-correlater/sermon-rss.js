const denodeify = require(`then-denodeify`)
const parse = denodeify(require(`xml2js`).parseString)
const formatDate = require(`date-fns/format`)
const got = require(`got`)

// const xml = require('fs').readFileSync('./example-rss.xml', { encoding: 'utf8' })

const linkIdRegex = /^https?:\/\/(?:www\.)?dominioncovenantchurch.com\/sermons\/\?sermon_id=(\d+)$/

module.exports = async function getSermonAudioDataStructure() {
	const { body } = await got(`http://www.dominioncovenantchurch.com/?page_id=8&podcast`)
	const result = await parse(body)
	const items = result.rss.channel[0].item
	const pkSermons = items.filter(
		record => record.category[0] === `Sermon`
			&& record[`itunes:author`][0] === `Phillip Kayser, PhD`,
	)

	return pkSermons.map(({ link, title, pubDate, enclosure }) => ({
		title: title[0],
		dateString: formatDate(new Date(pubDate[0]), `YYYY-MM-DD`),
		id: parseInt(link[0].match(linkIdRegex)[1], 10),
		enclosure: enclosure[0].$,
	}))
}
