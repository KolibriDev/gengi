import _ from 'underscore'
import request from 'request'
import xml2js from 'xml2js'
import values from './values'
import { getMidnight } from './time'

class Borgun {
  constructor(url) {
    this.options = {
      url: url || 'https://www.borgun.is/Currency/Default.aspx?function=all',
    }
  }

  get(callback) {
    if (!this.options || !this.options.url) { return callback({ error: 1 }) }

    return request.get(this.options, (err, response, data) => {
      if (err || response.statusCode !== 200) {
        callback(err)
        return
      }

      const { error, result } = this.parse(data)
      callback(error, result)
    })
  }

  parse(data) {
    let retVal = {
      error: null,
    }

    xml2js.parseString(data, { explicitRoot: false }, (err, result) => {
      if (err || !result.hasOwnProperty('Rate') || result.Status[0].ResultCode[0] !== '0') {
        retVal = { error: err, result }
      } else {
        retVal.result = {
          currencies: this.parseCurrencies(result),
          currencyDate: result.Rate[0].RateDate[0],
          // Store expiring timestamp for front-end
          expires: getMidnight(result.Rate[0].RateDate[0]),
        }
      }
    })

    return retVal
  }

  parseCurrencies(result) {
    const currencies = {}

    _.each(result.Rate, (currency) => {
      const [newCurr, country] = this.parseCurrency(currency)

      if (!currencies.hasOwnProperty(newCurr.code)) {
        currencies[newCurr.code] = newCurr
      }
      currencies[newCurr.code].countries.push(country)
    })

    const sorted = this.sortCurrencies(currencies, 'code')

    return sorted
  }

  parseCurrency(currency) {
    const country = {
      country: currency.Country[0],
      countryCode: currency.CountryCode[0],
      countryEnglish: currency.CountryEnglish[0],
    }
    const newCurr = {
      code: currency.CurrencyCode[0],
      rate: values.rate(currency.CurrencyRate[0]),
      name: values.name(currency.CurrencyDescription[0]),
      countries: [],
    }

    return [newCurr, country]
  }

  sortCurrencies(currencies, sortBy) {
    const sorted = _.sortBy(currencies, (sortBy || 'code'))

    // Sort country names alphabetically
    _.each(sorted, (currency) => {
      currency.countries = _.sortBy(currency.countries, 'country') // eslint-disable-line no-param-reassign
    })

    return sorted
  }
}

export default new Borgun()
