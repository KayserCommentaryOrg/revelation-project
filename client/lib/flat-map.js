export default (fn, ary) => ary.reduce((acc, element, index) => [ ...acc, ...fn(element, index) ], [])
