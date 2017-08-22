import Text from './Text.html'

import english from 'revelation'
import greek from 'majority-text-family-35-revelation'

export default mediator => ({
	name: 'main.structure.text',
	route: 'text',
	template: Text,
	resolve() {
		return Promise.resolve({
			translations: {
				english,
				greek,
			},
		})
	},
})
