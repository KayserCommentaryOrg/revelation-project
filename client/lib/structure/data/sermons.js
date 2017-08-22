import sermons from 'lib/structure/data/sermons.json'
import guaranteeRangeSection from 'lib/structure/guarantee-range-section'

export default sermons.map(sermon => {
	return Object.assign({}, sermon, {
		range: [
			guaranteeRangeSection(sermon.range[0]),
			guaranteeRangeSection(sermon.range[1]),
		],
	})
})
