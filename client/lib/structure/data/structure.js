import pipe from 'lib/pipe'
import guaranteeRange from 'lib/structure/guarantee-range'

const identifiers = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]

export default pipe([
	{
		identifier: 'A',
		title: 'Prologue',
		description: 'How to Read This Book',
		range: r([ 1, 1 ], [ 1, 11 ]),
	}, {
		identifier: 'B',
		title: 'First Septet – Seven Churches',
		description: 'A Look at the Beginnings of the Church that Christ is Building',
		range: r([ 2, 1 ], [ 3, 22 ]),
		introduction: {
			title: 'Introduction to the seven churches – Christ is present with His church',
			range: r([ 1, 12 ], [ 1, 20 ]),
		},
		subsections: makeSubsections(
			s('Ephesus', r([ 2, 1 ], [ 2, 7 ])),
			s('Smyrna', r([ 2, 8 ], [ 2, 11 ])),
			s('Pergamos', r([ 2, 12 ], [ 2, 17 ])),
			s('Thyatira', r([ 2, 18 ], [ 2, 29 ])),
			s('Sardis', r([ 3, 1 ], [ 3, 6 ])),
			s('Philadelphia', r([ 3, 7 ], [ 3, 13 ])),
			s('Laodicea', r([ 3, 14 ], [ 3, 22 ]))
		),
	}, {
		identifier: 'C',
		title: 'Second Septet – Seven Seals',
		description: 'Legal Judgments to be Executed Against Church’s Persecutors',
		range: r([ 6, 1 ], [ 8, 1 ]),
		introduction: {
			title: 'Introduction to the seven seals – Christ is on His throne and is governing all of history',
			range: r([ 4, 1 ], [ 5, 14 ]),
		},
		subsections: [
			s('Seal 1 - the white horse', r([ 6, 1 ], [ 6, 2 ]), 'a'),
			s('Seal 2 - the red horse', r([ 6, 3 ], [ 6, 4 ]), 'b'),
			s('Seal 3 - the black horse', r([ 6, 5 ], [ 6, 6 ]), 'c'),
			s('Seal 4 - the yellowish-green horse', r([ 6, 7 ], [ 6, 8 ]), 'd'),
			s('Seal 5 - the souls under the altar', r([ 6, 9 ], [ 6, 11 ]), 'e'),
			s('Seal 6 - the earthquake', r([ 6, 12 ], [ 6, 17 ]), 'f'),
			s('Interlude before the 7th seal: the 144,000 of the Jewish remnant and the innumerable multitude', r([ 7, 1 ], [ 7, 17 ]), 'interlude'),
			s('Seal 7 - introduces the seven trumpets and seems to comprise all of the third septet', r([ 8, 1 ], [ 8, 1 ]), 'g'),
		],
	}, {
		identifier: 'D',
		title: 'Third Septet – Seven Trumpets',
		description: 'The War Against the Church’s Persecutors',
		range: r([ 8, 7 ], [ 11, 19 ]),
		introduction: {
			title: 'Introduction to the seven trumpets – God ordains victory for the church through prayer',
			range: r([ 8, 2 ], [ 8, 6 ]),
		},
		subsections: [
			s('Trumpet 1 - The land is set on fire', r([ 8, 7 ], [ 8, 7 ]), 'a'),
			s('Trumpet 2 - The sea is turned to blood', r([ 8, 8 ], [ 8, 9 ]), 'b'),
			s('Trumpet 3 - The rivers and springs become bitter', r([ 8, 10 ], [ 8, 11 ]), 'c'),
			s('Trumpet 4 - The heavenly bodies are dimmed', r([ 8, 12 ], [ 8, 13 ]), 'd'),
			s('Trumpet 5 - Demons released from the pit', r([ 9, 1 ], [ 9, 12 ]), 'e'),
			s('Trumpet 6 - Demons released from Euphrates', r([ 9, 13 ], [ 9, 21 ]), 'f'),
			s('Interlude before 7th trumpet: The closing off of prophecy & the nature of prophecy', r([ 10, 1 ], [ 11, 14 ]), 'interlude'),
			s('Trumpet 7 - The seventh trumpet seems to comprise all of the fourth septet', r([ 11, 15 ], [ 11, 19 ]), 'g'),
		],
	}, {
		identifier: 'E',
		title: 'Fourth Septet – Seven Visions',
		description: 'From Total Defeat to Victory',
		range: r([ 13, 1 ], [ 15, 1 ]),
		introduction: {
			title: 'Introduction to the seven visions – The invisible battles are the key to the earthly ones',
			range: r([ 12, 1 ], [ 12, 17 ]),
			subsections: pipe([
				s('The Bride reflecting the glory of her husband', r([ 12, 1 ], [ 12, 1 ]), 'Ea'),
				s('The Child of the woman', r([ 12, 2 ], [ 12, 2 ]), 'Eb'),
				s('The Dragon tries to devour the Child', r([ 12, 3 ], [ 12, 5 ]), 'Ec'),
				s('The woman flees to the wilderness', r([ 12, 6 ], [ 12, 6 ]), 'Ed'),
				s('Dragon war in heaven', r([ 12, 7 ], [ 12, 9 ]), 'Ee'),
				s('Victory of Christ & His people over the dragon', r([ 12, 10 ], [ 12, 11 ]), 'Ef'),
				s('Dragon war on earth', r([ 12, 12 ], [ 12, 13 ]), 'Ee'),
				s('The woman flees to the wilderness', r([ 12, 14 ], [ 12, 14 ]), 'Ed'),
				s(`The Dragon's mouth & the earth swallows the serpents flood`, r([ 12, 15 ], [ 12, 16 ]), 'Ec'),
				s('The rest of the offspring of the woman', r([ 12, 17, 1 ], [ 12, 17, 1 ]), 'Eb'),
				s('The church reflecting the word of Christ', r([ 12, 17, 2 ], [ 12, 17 ]), 'Ea'),
			],
			addPrimeBooleanToChiasmSections,
			giveSectionsChiasmAnchors),
		},
		subsections: makeSubsections(
			s('The beast rising out of the sea', r([ 13, 1 ], [ 13, 10 ])),
			s('The beast rising out of the land', r([ 13, 11 ], [ 13, 18 ])),
			s('The 144,000 virgin (warriors) and the Lamb', r([ 14, 1 ], [ 14, 5 ])),
			s('The seven angels', r([ 14, 6 ], [ 14, 13 ])),
			s('The positive reaping of wheat', r([ 14, 14 ], [ 14, 16 ])),
			s('The negative reaping of grapes', r([ 14, 17 ], [ 14, 20 ])),
			s('The final "sign in heaven" seems to comprise everything in the fifth septet and guarantees the eventual conversion of all nations', r([ 15, 1 ], [ 15, 1 ]))
		),
	}, {
		identifier: 'D',
		title: 'Fifth Septet – Seven Bowls of Wrath Containing the Seven Plagues',
		range: r([ 16, 2 ], [ 16, 17 ]),
		introduction: {
			title: 'Introduction to the seven plagues – angels preparing for warfare; temple filled with God’s glory',
			range: r([ 15, 2 ], [ 16, 1 ]),
		},
		subsections: makeSubsections(
			s('Bowl 1 - On the land', r([ 16, 2 ], [ 16, 2 ])),
			s('Bowl 2 - On the sea', r([ 16, 3 ], [ 16, 3 ])),
			s('Bowl 3 - On the waters', r([ 16, 4 ], [ 16, 7 ])),
			s('Bowl 4 - On the sun', r([ 16, 8 ], [ 16, 9 ])),
			s('Bowl 5 - On the throne of the beast', r([ 16, 10 ], [ 16, 11 ])),
			s('Bowl 6 - On the Euphrates', r([ 16, 12 ], [ 16, 16 ])),
			s('Bowl 7 - On the air – note that this 7th bowl seems to introduce all of the next septet', r([ 16, 17 ], [ 16, 17 ]))
		),
	}, {
		identifier: 'C',
		title: 'Sixth Septet – Seven Condemnations of Babylon',
		range: r([ 17, 1 ], [ 19, 10 ]),
		introduction: {
			title: 'Introduction to the seven condemnations – Even with Roman support, Jerusalem is no match for Christ',
			range: r([ 16, 18 ], [ 16, 21 ]),
		},
		subsections: makeSubsections(
			s('Blasphemy of the Harlot', r([ 17, 1 ], [ 17, 6 ])),
			s('Harlots Pagan Alliance with Rome', r([ 17, 7 ], [ 17, 18 ])),
			s('Spiritual fornications', r([ 18, 1 ], [ 18, 8 ])),
			s('Ungodly statist/commercial alliance', r([ 18, 9 ], [ 18, 20 ])),
			s('The finality of Babylon’s fall', r([ 18, 21 ], [ 18, 24 ])),
			s('All heaven agreeing with her judgment', r([ 19, 1 ], [ 19, 4 ])),
			s('The death of the harlot is followed by the marriage of the Lamb', r([ 19, 5 ], [ 19, 10 ]))
		),
	}, {
		identifier: 'B',
		title: 'Seventh Septet – Seven visions of the victory of Christ’s Kingdom',
		description: 'The Church Militant & Triumphant',
		range: r([ 20, 1 ], [ 22, 5 ]),
		introduction: {
			title: 'Introduction to the seven New Covenant visions – Jesus proves that He is King of kings and Lord of lords',
			range: r([ 19, 11 ], [ 19, 21 ]),
		},
		subsections: makeSubsections(
			s('Satan’s power bound', r([ 20, 1 ], [ 20, 3 ])),
			s('Victory over death guaranteed – reign in life and in death', r([ 20, 4 ], [ 20, 6 ])),
			s('Final judgment', r([ 20, 7 ], [ 20, 15 ])),
			s('All things made new', r([ 21, 1 ], [ 21, 8 ])),
			s('The New Jerusalem as the spotless bride', r([ 21, 9 ], [ 21, 21 ])),
			s('Eternal Dominion', r([ 21, 22 ], [ 21, 27 ])),
			s('The river of life', r([ 22, 1 ], [ 22, 5 ])),
		),
	}, {
		identifier: 'A',
		title: 'Epilogue',
		description: 'How to Read This Book',
		range: r([ 22, 6 ], [ 22, 21 ]),
	},
],
addPrimeBooleanToChiasmSections,
giveSectionsChiasmAnchors,
giveSubsectionsAnchors,
giveIntroductionsAnchors)

function makeSubsections(...subsections) {
	return subsections.map(({ title, range }, i) => {
		const identifier = identifiers[i]
		return {
			title,
			range,
			identifier,
		}
	})
}

function s(title, range, identifier) {
	return { title, range, identifier }
}

function r(rangeStart, rangeEnd) {
	return guaranteeRange([ rangeStart, rangeEnd ])
}

function addPrimeBooleanToChiasmSections(sections) {
	const pivotIndex = Math.floor(sections.length / 2)

	return sections.map((section, index) => Object.assign({ prime: index > pivotIndex }, section))
}

function giveSectionsChiasmAnchors(sections) {
	const pivotIndex = Math.floor(sections.length / 2)

	return sections.map((section, index) => {
		if (index === pivotIndex) {
			return Object.assign({
				anchor: section.identifier,
			}, section)
		}

		const primeAnchor = `${section.identifier}prime`

		return Object.assign({
			anchor: index < pivotIndex ? section.identifier : primeAnchor,
			siblingAnchor: index < pivotIndex ? primeAnchor : section.identifier,
			siblingIsDown: index < pivotIndex,
		}, section)
	})
}

function giveSubsectionsAnchors(sections) {
	const pivotIndex = Math.floor(sections.length / 2)

	return sections.map((section, index) => {
		if (!section.subsections) {
			return section
		}

		const isPivotSection = index === pivotIndex

		return Object.assign({}, section, {
			subsections: section.subsections.map(subsection => {
				if (!subsection.identifier) {
					return subsection
				} else if (subsection.identifier === 'interlude' || isPivotSection) {
					return Object.assign({
						anchor: `${section.anchor}-${subsection.identifier}`,
					}, subsection)
				}

				return Object.assign({
					anchor: `${section.anchor}-${subsection.identifier}`,
					siblingAnchor: `${section.siblingAnchor}-${subsection.identifier}`,
					siblingIsDown: section.siblingIsDown,
				}, subsection)
			}),
		})
	})
}

function giveIntroductionsAnchors(sections) {
	return sections.map(section => {
		if (!section.introduction) {
			return section
		}

		return Object.assign({}, section, {
			introduction: Object.assign({
				anchor: `${section.anchor}-introduction`,
				siblingAnchor: `${section.siblingAnchor}-introduction`,
				siblingIsDown: section.siblingIsDown,
			}, section.introduction),
		})
	})
}
