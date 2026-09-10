import StateRouter from 'abstract-state-router'
import sausage from 'sausage-router'
import makeRouter from 'hash-brown-router'

import makeSvelteStateRenderer from 'svelte-state-renderer'

import { BASE_PATH } from 'lib/base-path'

// sausage-router joins BASE_PATH onto every go()/replace(), but its get()
// returns the full pathname, so strip the prefix before the router matches.
const location = sausage(BASE_PATH)
const rawGet = location.get
const prefix = new RegExp(`^${BASE_PATH}(?=/|\\?|$)`)
location.get = () => {
	const path = rawGet().replace(prefix, '')
	return path.startsWith('/') ? path : '/' + path
}

export default StateRouter(
	makeSvelteStateRenderer(),
	document.getElementById('target'),
	{
		pathPrefix: BASE_PATH,
		router: makeRouter(location),
	},
)
