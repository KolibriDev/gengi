const _ = require('underscore')
const helper = require('../helpers/currencies')
const search = require('../helpers/search')

const buildResponse = (term, results) => {
  const searchResults = _.filter(results.currencies, (value) => search(value, term))

  const currencies = {}
  _.each(searchResults, (item) => {
    currencies[item.code] = helper.toDisplayCurrency(item)
  })

  return {
    currencyDate: results.currencyDate,
    expires: results.expires,
    currencies,
  }
}

const ensureTerm = (term) => {
  let value = term || ''
  value = typeof value === 'string' ? value : value.toString()
  value = value.toUpperCase()

  return value
}

module.exports = (term, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err)
    } else {
      const retTerm = ensureTerm(term)
      callback(err, buildResponse(retTerm, results))
    }
  })
}
