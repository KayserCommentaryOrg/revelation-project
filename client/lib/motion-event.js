import EventEmitter from 'eventemitter3'
import debounce from './debounce-to-animation-frame.js'

const globalUpdateEmitter = new EventEmitter()

const listener = debounce(() => globalUpdateEmitter.emit('update'))

window.addEventListener('resize', listener)
window.addEventListener('scroll', listener)

export default globalUpdateEmitter
