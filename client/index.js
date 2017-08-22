import StateRouter from 'abstract-state-router'
import sausage from 'sausage-router'
import makeRouter from 'hash-brown-router'

import makeSvelteStateRenderer from 'svelte-state-renderer'
import mannish from 'mannish'

import views from './globbed-views'
import statefulServices from './globbed-services'

const mediator = mannish()

const renderer = makeSvelteStateRenderer({
	methods: {
		call: mediator.call,
	},
})

const stateRouter = StateRouter(
	renderer,
	document.getElementById('target'),
	{
		pathPrefix: '',
		router: makeRouter(sausage()),
	},
)

mediator.provide('stateGo', stateRouter.go)
mediator.provide('onStateRouter', (event, cb) => {
	stateRouter.on(event, cb)
})

const moduleInitializationPromises = statefulServices.map(module => module(mediator))

views.map(createView => createView(mediator)).forEach(state => {
	try {
		stateRouter.addState(state)
	} catch (e) {
		console.error('Error adding', state)
		throw e
	}
})

stateRouter.on('routeNotFound', (route, parameters) => {
	stateRouter.go('not-found', { route, parameters }, { replace: true })
})

stateRouter.on('stateChangeStart', (state, params) => console.log('stateChangeStart', state.name, params))
stateRouter.on('stateChangeError', error => console.error(error))
stateRouter.on('stateError', error => console.error(error))
stateRouter.on('stateChangeEnd', (state, params) => console.log('stateChangeEnd', state.name, params))

Promise.all(moduleInitializationPromises).then(() => {
	stateRouter.evaluateCurrentRoute('main')
})

