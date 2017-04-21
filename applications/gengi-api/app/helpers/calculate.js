const values = require('./values')

const toISK = (rate, value) => values.rate(value * rate)

const ensureCurrency = Code => {
  let code = Code || ''
  code = code.toString().toUpperCase()
  code = code.length > 3 ? code.substring(0, 3) : code
  return code
}

const ensureValue = value => values.rate(value || 1)

module.exports = {
  toISK,
  ensureCurrency,
  ensureValue,
}
