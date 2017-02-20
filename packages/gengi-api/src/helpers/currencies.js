import _ from 'underscore'
import redis from './redis'
import borgun from './borgun'
import getSymbol from './symbols'

const get = (callback) => {
  redis.get((err, storedResult) => {
    if (!err && storedResult) {
      callback(null, storedResult)
    } else {
      try {
        borgun.get((error, results) => {
          if (error) {
            callback(error)
          } else {
            redis.set(results)
            callback(null, results)
          }
        })
      } catch (exc) {
        callback(exc)
      }
    }
  })
}

const toDisplayCurrency = (currency) => {
  const countryArr = []
  if (currency && currency.countries) {
    _.each(currency.countries, (country) => {
      countryArr.push(country.country)
    })
  }
  return {
    code: currency.code,
    symbol: getSymbol(currency.code),
    name: currency.name,
    rate: currency.rate,
    countries: countryArr,
  }
}

const ensureCodes = (Codes, currs) => {
  let codes = Codes || ''
  codes = codes.toString().toUpperCase().split(',')

  if (codes.length === 1 && codes[0] === '') {
    _.each(currs, (curr) => {
      codes.push(curr.code)
    })
  }

  return codes
}

export default { get, toDisplayCurrency, ensureCodes }
