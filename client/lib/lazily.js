export default fn => {
	let run = false
	let result = null
	return () => {
		if (!run) {
			result = fn()
			run = true
		}
		return result
	}
}
