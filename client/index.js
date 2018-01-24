console.log(process.env.NODE_ENV)
const TEST = process.env.NODE_ENV !== `production`

Raven.config(`https://abebea60be4f48689cd1d3c7684c93cd@sentry.io/270211`, {
	environment: TEST ? `client:development` : `client:production`,
}).install()

import mannish from 'mannish'
import makeAsrStateWatcher from 'asr-active-state-watcher'
import svelteQuerystringRouter from 'svelte-querystring-router'

import views from './globbed-views'
import statefulServices from './globbed-services'

import stateRouter from 'lib/asr-instance'
import watchScrollPosition from 'lib/asr-scroll-position'

const mediator = mannish()

mediator.provide(`stateGo`, stateRouter.go)
mediator.provide(`onStateRouter`, (event, cb) => {
	stateRouter.on(event, cb)
})

const moduleInitializationPromises = statefulServices.map(module => Promise.resolve(module(mediator)))

views.map(createView => createView(mediator)).forEach(state => {
	try {
		stateRouter.addState(state)
	} catch (e) {
		console.error(`Error adding`, state)
		throw e
	}
})

const stateWatcher = makeAsrStateWatcher(stateRouter)

stateWatcher.addDomApiAttachListener(domApi => {
	svelteQuerystringRouter.attachQuerystringData(domApi)
})

stateRouter.on(`routeNotFound`, (route, parameters) => {
	stateRouter.go(`main.not-found`, Object.assign({ route }, parameters), { replace: true })
})

stateRouter.on(`stateChangeStart`, (state, params) => console.log(`stateChangeStart`, state.name, params))
stateRouter.on(`stateChangeError`, error => console.error(error))
stateRouter.on(`stateError`, error => console.error(error))
stateRouter.on(`stateChangeEnd`, (state, params) => {
	console.log(`stateChangeEnd`, state.name, params)

	if (!TEST) {
		ga('set', 'page', document.location.pathname)
		ga('send', 'pageview')
	}
})

Promise.all(moduleInitializationPromises).then(() => {
	watchScrollPosition(stateRouter)
	stateRouter.evaluateCurrentRoute(`main`)

	rendered = true
})
