const R = require('ramda')

const DEBUG =
  process.env.DEBUG || !process.env.HOST || process.env.HOST === 'localhost'
const orFalse = R.defaultTo(false)
const debugOnly = data => orFalse(DEBUG ? data : false)
const pickOnly = R.compose(R.map(orFalse), R.pickAll)

module.exports = {
  DEBUG,
  orFalse,
  debugOnly,
  pickOnly
}
