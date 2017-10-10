import flatMap from 'lib/flat-map.js'

import entries from 'ordered-entries'

const sermonSeries = {
	ONE: { audioId: 742, description: `Principles 1-8` },
	TWO: { audioId: 745, description: `Principle 9` },
	THREE: { audioId: 747, description: `Principles 10-11` },
	FOUR: { audioId: 750, description: `Principle 12` },
	FIVE: { audioId: 755, description: `Principles 13` },
	SIX: { audioId: 754, description: `Principles 14-15` },
	SEVEN: { audioId: 763, description: `Principles 16-18` },
	EIGHT: { audioId: 762, description: `Principle 19` },
	NINE: { audioId: 766, description: `Principle 20` },
	TEN: { audioId: 765, description: `Principles 21-24` },
	ELEVEN: { audioId: 769, description: `Principles 25-29` },
	TWELVE: { audioId: 771, description: `Principle 30` },
	THIRTEEN: { audioId: 773, description: `Principle 30` },
	FOURTEEN: { audioId: 776, description: `Principles 32-30` },
}

const seriesPart = {
	ONE: seriesPartCounter(sermonSeries.ONE.audioId),
	TWO: seriesPartCounter(sermonSeries.TWO.audioId),
	THREE: seriesPartCounter(sermonSeries.THREE.audioId),
	FOUR: seriesPartCounter(sermonSeries.FOUR.audioId),
	FIVE: seriesPartCounter(sermonSeries.FIVE.audioId),
	SIX: seriesPartCounter(sermonSeries.SIX.audioId),
	SEVEN: seriesPartCounter(sermonSeries.SEVEN.audioId),
	EIGHT: seriesPartCounter(sermonSeries.EIGHT.audioId),
	NINE: seriesPartCounter(sermonSeries.NINE.audioId),
	TEN: seriesPartCounter(sermonSeries.TEN.audioId),
	ELEVEN: seriesPartCounter(sermonSeries.ELEVEN.audioId),
	TWELVE: seriesPartCounter(sermonSeries.TWELVE.audioId),
	THIRTEEN: seriesPartCounter(sermonSeries.THIRTEEN.audioId),
	FOURTEEN: seriesPartCounter(sermonSeries.FOURTEEN.audioId),
}


function seriesPartCounter(sermonAudioId) {
	const object = {
		audioId: sermonAudioId,
		principleCount: 0,
	}

	return () => {
		object.principleCount++
		return object.principleCount === 1 ? object : undefined
	}
}

const text = (text, principles) => ({ text, principles })
const p = (html, sermon) => ({ html, sermon })

const principles = {
	1: p(`<strong>1</strong> - We must treat this book like a revelation or clear unveiling of truth (Ἀποκάλυψις - apokalupsis)`, seriesPart.ONE()),
	2: p(`<strong>2</strong> - We must treat this book as a revelation about Jesus Christ`, seriesPart.ONE()),
	3: p(`<strong>3</strong> - We must see this as an inspired message of God`, seriesPart.ONE()),
	4: p(`<strong>4</strong> - God has freely shown the meaning of this book to all readers; it is not a secret "mystery" for a few (as in gnosticism) (cf. 1:1,3; 13:9; 2:7,11,17: 2:29; 3:6,13,22)`, seriesPart.ONE()),
	5: p(`<strong>5</strong> - It is imperative that you understand and obey this book because these are Christ’s instructions to His “slaves”`, seriesPart.ONE()),
	6: p(`<strong>6</strong> - We must see this book as dealing with history`, seriesPart.ONE()),
	7: p(`<strong>7</strong> - We must see this as predestined Providential History (δεῖ - “must”) - it addresses the question of "Who controls history?"`, seriesPart.ONE()),
	8: p(`<strong>8</strong> - We must see the fulfillment or at least a partial fulfillment of all seven sections of Revelation as being "soon," "near," or "about to happen" (cf. 1:3,7,19; 2:5,10,16; 3:10,11; 6:11; 11:14; 22:6,7,10,12,20)`, seriesPart.ONE()),
	9: p(`<strong>9</strong> - We must see the historical events as being communicated via symbols (ἐσήμανεν - to communicate by symbols)`, seriesPart.TWO()),
	10: p(`<strong>10</strong> - We must see the role of angels as being critically important in world history (“angel”)`, seriesPart.THREE()),
	11: p(`<strong>11</strong> - We must take into consideration the authorial intent of John`, seriesPart.THREE()),
	12: p(`<strong>12</strong> - We should see this book as a covenant lawsuit against the church (ch. 1-3 - but still vindicating the church), and against Israel (ch. 4-19) and Rome (ch. 13-19) (ἐμαρτύρησεν - legal witness)`, seriesPart.FOUR()),
	13: p(`<strong>13</strong> - We must read the book of Revelation in light of the Old Testament and the earlier covenant lawsuit (μαρτυρίαν) of Jesus in the Gospels (“who gave witness [μαρτυρέω] to the word of God and to the testimony [μαρτυρίαν] of Jesus Christ”; cf. this phrase elsewhere in the book, v. 9, etc.)`, seriesPart.FIVE()),
	14: p(`<strong>14</strong> - This is a book that contains a high degree of visualization, not simply analytical words and not simply symbols. Think of it like a play or a movie. (εἶδεν past tense of ὁράω - “saw” - 41 times in Revelation)`, seriesPart.SIX()),
	15: p(`<strong>15</strong> - there is some already (“are”) and not yet (“those that must happen after these”) in verses 2,3 and 19 [v. 2 "και ατινα εισιν και α χρη γενεσθαι μετα ταυτα" occurs in the Majority Text.; v. 3 v. 19 - καὶ ἃ εἰσίν, καὶ ἃ μέλλει γίνεσθαι μετὰ ταῦτα]`, seriesPart.SIX()),
	16: p(`<strong>16</strong> - when rightly understood, this book brings great encouragement to believers (“Blessed”)`, seriesPart.SEVEN()),
	17: p(`<strong>17</strong> - this book is meant to be read aloud in the worship of the church ("read" = ἀναγινώσκω) and thus has a liturgical function`, seriesPart.SEVEN()),
	18: p(`<strong>18</strong> - this book is a book on ethics ("hear…keep")`, seriesPart.SEVEN()),
	19: p(`<strong>19</strong> - The whole book of Revelation is called a prophecy (cf. 22:7,10,18,19) and should be interpreted with the principles of the prophetic genre.`, seriesPart.EIGHT()),
	reiteration8: p(`Reiteration of principle #8 - the time is near`, seriesPart.EIGHT()),
	20: p(`<strong>20</strong> - this book should be seen as especially relevant to the seven first century churches it was written to`, seriesPart.NINE()),
	21: p(`<strong>21</strong> - Grace and Peace is a thematic element that holds the book together. Though the pronouncement of grace and peace is resisted by Satan, it will be fully accomplished by the end of the book (chapters 20-22)`, seriesPart.TEN()),
	22: p(`<strong>22</strong> - The Trinitarian God (v. 4c-5) is fully capable of providing the grace and peace needed to fulfill kingdom prophecies (see OT background in Zechariah 4, Isaiah 11, Psalm 89, etc.)`, seriesPart.TEN()),
	23: p(`<strong>23</strong> - this book presents Jesus as currently being prophet, priest, and king`, seriesPart.TEN()),
	24: p(`<strong>24</strong> - this book portrays the gradual advancement of redemption &amp; kingdom`, seriesPart.TEN()),
	25: p(`<strong>25</strong> - "Behold"/"Take note" is a clue that verse 7 is a central theme of this book. Since this is the only "Behold" in the introductory section (vv. 1-11), verse 7 may very well be the central theme (as Ken Gentry believes).`, seriesPart.ELEVEN()),
	26: p(`<strong>26</strong> - An imminent (vv. 1,3,19; 2:5,16,25; 3:3,11,20; 5:7; etc.), visible, sorrow-inducing (v. 7d with Zech. 12:10-14) coming of Christ in sovereign judgment (v. 7b-e) is therefore a central theme of this book. (cf. identical langauge in 22:22; cf. chart of seven uses of the term "coming" in the New Testament)`, seriesPart.ELEVEN()),
	27: p(`<strong>27</strong> - A redemptive judgment upon Rome and Israel (those who pierced Him) is therefore a central theme of the book, with the biggest emphasis being upon Israel ("all tribes of the land" in light of quote from Zech. 12:10-14). Since verse 7 alludes to Daniel 7:13-14 and Zech. 12:10-14, we should see a definition of "coming" that is consistent with those two passages. This is reinforced with the reference to "One like the Son of Man" (v. 13 with Dan. 7:13) and the coming in 22:22 which is "soon" (ταχύς).`, seriesPart.ELEVEN()),
	28: p(`<strong>28</strong> - The background to verse 7 is our first hint that the word "earth" (γῆς) should be translated as "land" throughout the book. It is a reference to the land of Israel.`, seriesPart.ELEVEN()),
	29: p(`<strong>29</strong> - since Christ now rules with absolute divine power, the accomplishment of His purposes are guaranteed (vv. 7e-8)`, seriesPart.ELEVEN()),
	30: p(`<strong>30</strong> - The tribulation (τῇ θλίψει) had already begun when John wrote the book and John shared (κοινωνὸς) this experience of tribulation and endurance with the first century churches. We must distinguish between
		<ol class="indented">
			<li>general persecution/tribulation (Jn 16:33; Acts 11:19; 14:22; 20:23; Rom 5:3; 8:35; 12:12; 1 Cor 7:28; 2 Cor 1:4; 1:8; 2:4; 4:17; 6:4; 7:4; 8:2; Eph. 3:13; Phil 1:16; 4:14; Col. 1:24; 1 Thess 1:6; 3:3; 3:7; 2 Thess 1:4; Heb 10:33),</li>
			<li>"the tribulation" or "the great tribulation" that Christians would experience (Matt 24:9-12, 21-29; Rev 1:9; 2:22; Rev 7:14), and</li>
			<li>the great wrath of God against the Jews (Matt 3:7; Luke 21:21-22; Rom. 9:22; 1 Thes. 2:16; Rev 6:16-17; 11:18; 12:12; 14:8-10; 14:19; 15:1, 7; 16:1, 19; 18:3; 19:15). Christians would never have to face God's wrathful judgment (1 Thess 1:10; Rom 5:9; Matt 3:7; Rom 2:5-8; 1 Thess 5:9).</li>
		</ol>
	`, seriesPart.TWELVE()),
	31: p(`<strong>31</strong> - The kingdom had already begun when John wrote the book, and kingdom, tribulation, and endurance coexisted side by side. Yet there are aspects of the kingdom that are still future (Rev. 12:10)`, seriesPart.THIRTEEN()),
	32: p(`<strong>32</strong> - This book is not just about Jesus (principle 2), but shows how life must flow from Jesus ("in Christ Jesus" - see verses 12ff).`, seriesPart.FOURTEEN()),
	reiteration13: p(`Reiteration of principle #13 - John's imprisonment on Patmos was because of His commitment to the Old Testament and to the covenant lawsuit of Jesus recorded in the Gospels`, seriesPart.FOURTEEN()),
	supporting12: p(`Supporting evidence for principle #12 (v. 9c) - John's tribulation on Patmos came from the Romans and not just from the Jews.`, seriesPart.FOURTEEN()),
	reiteration3: p(`Reiteration of principle #3 - This book was inspired or moved by the Spirit ("in the Spirit") and not the product of human will (cf. 2 Pet. 1:21; 1 Thes. 2:13)`, seriesPart.FOURTEEN()),
	33: p(`<strong>33</strong> - The vision took place "on" the Lord's Day (Sunday) rather than being a vision "about" the Lord's Day (end of history - as is believed by some futurists)`, seriesPart.FOURTEEN()),
	supporting12_19_22: p(`Supporting evidence for principles #12, 19, &amp; 22`, seriesPart.FOURTEEN()),
}

const verseNumberToTexts = {
	1: [
		text(`Jesus Christ’s revelation,`, [
			principles[1],
			principles[2],
		]),
		text(`which God gave Him`, [
			principles[3],
		]),
		text(`to show to His slaves—`, [
			principles[4],
			principles[5],
		]),
		text(`things that must occur shortly.`, [
			principles[6],
			principles[7],
			principles[8],
		]),
		text(`And He communicated it,`, [
			principles[9],
		]),
		text(`sending it by His angel to His slave John,`, [
			principles[10],
			principles[11],
		]),
	],
	2: [
		text(`who gave witness to the word of God, even the testimony of Jesus Christ—`, [
			principles[12],
			principles[13],
		]),
		text(`the things that He saw, both things that are and those that must happen after these.`, [
			principles[14],
			principles[15],
		]),
	],
	3: [
		text(`Blessed is he who reads and those who hear the words of the prophecy, and keep the things that are written in it; because the time is near.`, [
			principles[16],
			principles[17],
			principles[18],
			principles[19],
			principles.reiteration8,
		]),
	],
	4: [
		text(`John, to the seven churches that are in Asia:`, [
			principles[20],
		]),
		text(`Grace and peace to you`, [
			principles[21],
		]),
		text(`from Him who is and who was and who is coming, and from the seven-fold Spirit who is before His throne,`, [
			principles[22],
		]),
	],
	5: [
		text(`and from Jesus Christ the faithful witness, the firstborn from among the dead, and the ruler of the kings of the earth.  To Him who loved us and washed us from our sins with His own blood`, [
			principles[23],
		]),
	],
	6: [
		text(`—indeed, He made us a kingdom, priests to His God and Father—to Him be the glory and the dominion for ever and ever. Amen.`, [
			principles[24],
		]),
	],
	7: [
		text(`Take note, He comes with the clouds, and every eye will see Him, including those who pierced Him. And all the tribes of the earth will beat their breasts [in dismay] because of Him. Yea, verily!`, [
			principles[25],
			principles[26],
			principles[27],
			principles[28],
		]),
	],
	8: [
		text(`“I am the Alpha and the Omega”, says the Lord God, “He who is and who was and who is coming, The Almighty.”`, [
			principles[29],
		]),
	],
	9: [
		text(`I, John, your brother and companion in the tribulation and kingdom and endurance in Christ Jesus, was on the island called Patmos on account of the Word of God and on account of the testimony of Jesus Christ.`, [
			principles[30],
			principles[31],
			principles[32],
			principles.reiteration3,
			principles.supporting12,
		]),
	],
	10: [
		text(`I was in spirit on the Lord’s day and I heard a voice behind me, loud as a trumpet,`, [
			principles.reiteration3,
			principles[33],
		]),
	],
	11: [
		text(`saying, “Write what you see in a book and send it to the seven churches: to Ephesus, to Smyrna, to Pergamos, to Thyatira, to Sardis, to Philadelphia and to Laodicea.”`, [
			principles.supporting12_19_22,
		]),
	],
}

export default flatMap(([ number, texts ], index) => {
	const principleRows = flatMap(makeTextIntoPrincipleRows, texts)

	const [ firstPrincipleRow, ...restOfPrincipleRows ] = principleRows

	const verseNumberColumn = {
		type: 'verse number',
		height: principleRows.length,
		text: number,
		className: 'verse-number-column',
		index,
	}

	return [
		[ verseNumberColumn, ...firstPrincipleRow ],
		...restOfPrincipleRows,
	]
}, entries(verseNumberToTexts))

const sermons = Object.getOwnPropertyNames(sermonSeries).map(key => sermonSeries[key])
const verseTexts = flatMap(([ , texts ]) => texts, entries(verseNumberToTexts))
const verseCount = Object.keys(verseNumberToTexts).length
const verseTextCount = verseTexts.length

export {
	sermons,
	verseTexts,
	verseCount,
	verseTextCount,
}


function makeTextIntoPrincipleRows(verseTextObject, index) {
	const { text, principles } = verseTextObject

	const verseTextColumn = {
		type: 'verse text',
		height: principles.length,
		text,
		index,
	}

	const [ firstPrincipleRow, ...restOfPrincipleRows ] = principles.map(makePrincipleRow)

	return [
		[ verseTextColumn, ...firstPrincipleRow ],
		...restOfPrincipleRows,
	]
}

function makePrincipleRow({ html, sermon }) {
	const principleColumn = {
		type: 'principle',
		height: 1,
		html,
	}


	return sermon
		? [ principleColumn, { height: sermon.principleCount, sermonAudioId: sermon.audioId, className: 'sermon-column' }]
		: [ principleColumn ]
}

// console.log(JSON.stringify(tableData, null, '\t'))
