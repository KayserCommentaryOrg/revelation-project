require('reify')

const podcast = require('podcast2')
const fs = require('fs')

const sermons = require('./client/lib/sermons/sermons.js').default

const podcastInfo = {
	indent: true,
	title: 'Revelation Project: Sermons',
	description: 'A sermon series explaining Revelation, a paragraph at a time.',
	author: 'Phil Kayser',
	feed_url: 'https://revelation.biblicalblueprints.org/static/podcast.xml',
	site_url: 'https://revelation.biblicalblueprints.org/sermons',
	webMaster: 'me@JoshDuff.com',
	language: 'en',
	itunesOwner: {
		name: 'Phil Kayser',
		email: 'josh@biblicalblueprints.org',
	},
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

const podcastItems = sermons.map(sermon => ({
	title: sermon.title,
	description: sermon.passage,
	url: `http://www.dominioncovenantchurch.com/sermons/?sermon_id=${sermon.audioId}`,
	guid: sermon.audioId,
	date: sermon.date,
}))

const xml = podcast(podcastInfo, podcastItems)

fs.writeFileSync('public/static/podcast.xml', xml, { encoding: 'utf8' })
