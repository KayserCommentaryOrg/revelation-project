import createEmitter from 'better-emitter'
import debounce from 'lib/debounce-to-animation-frame.js'

const globalUpdateEmitter = createEmitter()

const listener = debounce(() => globalUpdateEmitter.emit('update'))

window.addEventListener('resize', listener)
window.addEventListener('scroll', listener)

export default globalUpdateEmitter
