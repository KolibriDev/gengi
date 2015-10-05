import _ from 'underscore';
import request from 'request';
import xml2js from 'xml2js';
import values from './values';
import time from './time';

let parseString = xml2js.parseString;

let borgun = {};

borgun.get = function(callback) {
  request.get({
    url: 'https://www.borgun.is/Currency/Default.aspx?function=all'
  }, (err, response, data) => {
    if (err || response.statusCode !== 200) {
      callback(err);
      return;
    }

    let parsed = borgun.parse(data);

    if (parsed.hasOwnProperty('error') && parsed.error) {
      callback(parsed.error, parsed.result);
    }

    callback(null, parsed);
  });
};

borgun.parse = function(data) {
  let retVal;

  parseString(data, { explicitRoot: false }, (err, result) => {
    if(err || !result.hasOwnProperty('Rate') || result.Status[0].ResultCode[0] !== '0') {
      retVal = {error: err, result: result};
    } else {
      retVal = {
        currencies: borgun.parseCurrencies(result),
        currencyDate: result.Rate[0].RateDate[0],
        // Store expiring timestamp for front-end
        expires: time.getMidnight(),
      };
    }
  });

  return retVal;
};

borgun.parseCurrencies = function(result) {
  let currencies = {};

  _.each(result.Rate, (currency) => {
    borgun.parseCurrency(currency, (newCurr, country) => {
      if (!currencies.hasOwnProperty(newCurr.code)) {
        currencies[newCurr.code] = newCurr;
      }
      currencies[newCurr.code].countries.push(country);
    });
  });

  currencies = borgun.sortCurrencies(currencies, 'code');

  return currencies;
};

borgun.parseCurrency = function(currency, callback) {
  let country = {
    country: currency.Country[0],
    countryCode: currency.CountryCode[0],
    countryEnglish: currency.CountryEnglish[0],
  };
  let newCurr = {
    code: currency.CurrencyCode[0],
    rate: values.rate(currency.CurrencyRate[0]),
    name: values.name(currency.CurrencyDescription[0]),
    countries: []
  };

  callback(newCurr, country);
};

borgun.sortCurrencies = function(currencies, sortBy) {
  currencies = _.sortBy(currencies, (sortBy || 'code'));
  _.each(currencies, (currency) => {
    currency.countries = _.sortBy(currency.countries,'country');
  });
  return currencies;
};

module.exports = borgun;
