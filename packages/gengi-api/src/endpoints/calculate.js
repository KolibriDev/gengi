import _ from 'underscore'
import helper from '../helpers/currencies'
import { toISK, ensureCurrency, ensureValue } from '../helpers/calculate'

const buildResponse = (code, value, results) => {
  let currency = _.findWhere(results.currencies, { code })
  currency = helper.toDisplayCurrency(currency)

  const response = {}
  response.currencyDate = results.currencyDate
  response.expires = results.expires
  response.currency = currency
  response.ISKvalue = value
  response[`${code}value`] = toISK(currency.rate, value)

  return response
}

export default (code, value, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err)
    } else {
      const retCode = ensureCurrency(code)
      const retValue = ensureValue(value)
      callback(err, buildResponse(retCode, retValue, results))
    }
  })
}
