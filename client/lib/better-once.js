export default function once(emitter, event, listener) {
	emitter.once(event, listener)
	return () => emitter.removeListener(event, listener)
}
