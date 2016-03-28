import _ from 'underscore'
import helper from '../helpers/currencies'

const buildResponse = (codes, results) => {
  const currencies = {}
  _.each(codes, (code) => {
    const curr = _.findWhere(results.currencies, { code })
    if (curr && curr.code !== 'ISK') {
      currencies[curr.code] = helper.toDisplayCurrency(curr)
    }
  })
  return {
    currencyDate: results.currencyDate,
    expires: results.expires,
    list: currencies,
  }
}

export default (codes, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err)
    } else {
      const retCodes = helper.ensureCodes(codes, results.currencies)
      callback(err, buildResponse(retCodes, results))
    }
  })
}
