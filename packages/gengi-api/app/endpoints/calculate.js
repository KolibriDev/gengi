const _ = require('underscore')
const helper = require('../helpers/currencies')
const { toISK, ensureCurrency, ensureValue } = require('../helpers/calculate')

const buildResponse = (code, value, results) => {
  let currency = _.findWhere(results.currencies, { code })
  if (!currency) {
    return {
      status: 404,
      statusText: `No currency found with code '${code}'`,
    }
  }
  currency = helper.toDisplayCurrency(currency)

  const response = {}
  response.currencyDate = results.currencyDate
  response.expires = results.expires
  response.currency = currency
  response.ISKvalue = value
  response[`${code}value`] = toISK(currency.rate, value)

  return response
}

module.exports = (code, value, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err)
    } else {
      const retCode = ensureCurrency(code)
      const retValue = ensureValue(value)
      callback(null, buildResponse(retCode, retValue, results))
    }
  })
}
