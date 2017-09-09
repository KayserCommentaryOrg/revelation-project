const podcast = require('podcast2')
const fs = require('fs')

const podcastInfo = {
	indent: true,
	title: 'Revelation Project: Sermons',
	description: 'A series of sermons explaining the book of Revelation.',
	author: 'Phil Kayser',
	feed_url: 'https://revelation.biblicalblueprints.org/static/podcast.xml',
	site_url: 'https://revelation.biblicalblueprints.org/sermons',
	image_url: 'https://revelation.biblicalblueprints.org/static/blood-moon-large.png',
	webMaster: 'me@JoshDuff.com (Josh Duff)',
	language: 'en',
	itunesOwner: {
		name: 'Phil Kayser',
		email: 'josh@biblicalblueprints.org',
	},
	categories: [ 'Religion & Spirituality' ],
	itunesCategory: [{
		text: 'Religion & Spirituality',
		subcats: [{
			text: 'Christianity',
		}],
	}],
/*
* `categories` _optional_ **array of strings**  One or more categories this feed belongs to.
* `itunesAuthor` _optional_  **string** (iTunes specific) author of the podcast
* `itunesSubtitle` _optional_  **string** (iTunes specific) subtitle for iTunes listing
* `itunesSummary` _optional_  **string** (iTunes specific) summary for iTunes listing
* `itunesOwner` _optional_ **object** (iTunes specific) owner of the podcast
    * `name` **string**
    * `email` **string**
* `itunesExplicit` _optional_ **boolean** (iTunes specific) specifies if the podcast contains explicit content
* `itunesCategory` _optional_ **array of objects** (iTunes specific) Categories for iTunes
    * `text` **string**
    * `subcats` **array of objects** A recursive array of these category objects
* `itunesImage` _optional_ **string** (iTunes specific) link to an image for the podcast
*/
}


module.exports = sermons => {
	const podcastItems = sermons.map(({ title, passage, audioId, date, enclosure }) => ({
		title: title,
		description: passage,
		url: `http://www.dominioncovenantchurch.com/sermons/?sermon_id=${audioId}`,
		guid: `phil-kayser-revelation-project-sermon-audio-${audioId}`,
		date: date,
		enclosure: {
			url: enclosure.url,
			mime: enclosure.type,
			size: parseInt(enclosure.length, 10),
		},
	}))

	const xml = podcast(podcastInfo, podcastItems)

	fs.writeFileSync('../public/static/podcast.xml', xml, { encoding: 'utf8' })
}
