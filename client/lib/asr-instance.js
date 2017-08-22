import StateRouter from 'abstract-state-router'
import sausage from 'sausage-router'
import makeRouter from 'hash-brown-router'

import makeSvelteStateRenderer from 'svelte-state-renderer'

export default StateRouter(
	makeSvelteStateRenderer(),
	document.getElementById('target'),
	{
		pathPrefix: '',
		router: makeRouter(sausage()),
	},
)
