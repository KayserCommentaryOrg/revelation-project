export default (fn, ary) => ary.reduce((acc, element) => [ ...acc, ...fn(element) ], [])
