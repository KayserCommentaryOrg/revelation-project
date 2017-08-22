module.exports = (input, ...fns) => fns.reduce((last, fn) => fn(last), input)
