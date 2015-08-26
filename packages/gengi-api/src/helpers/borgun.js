var request = require('request');
var _ = require('underscore');
var parseString = require('xml2js').parseString;
var values = require('./values');
var time = require('./time');

var borgun = {};

borgun.get = function(callback) {
  request.get({
    url: 'https://www.borgun.is/Currency/Default.aspx?function=all'
  }, function(err, response, data) {
    if (err || response.statusCode !== 200) {
      callback(err);
      return;
    }

    var parsed = borgun.parse(data);

    if (parsed.hasOwnProperty('error') && parsed.error) {
      callback(parsed.error, parsed.result);
    }

    callback(null, parsed);
  });
};

borgun.parse = function(data) {
  var retVal;

  parseString(data, { explicitRoot: false }, function(err, result) {
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
  var currencies = {};

  _.each(result.Rate, function(currency) {
    borgun.parseCurrency(currency, function(newCurr, country) {
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
  var country = {
    country: currency.Country[0],
    countryCode: currency.CountryCode[0],
    countryEnglish: currency.CountryEnglish[0],
  };
  var newCurr = {
    code: currency.CurrencyCode[0],
    rate: values.rate(currency.CurrencyRate[0]),
    name: values.name(currency.CurrencyDescription[0]),
    countries: []
  };

  callback(newCurr, country);
};

borgun.sortCurrencies = function(currencies, sortBy) {
  currencies = _.sortBy(currencies, (sortBy || 'code'));
  _.each(currencies, function(currency){
    currency.countries = _.sortBy(currency.countries,'country');
  });
  return currencies;
};

module.exports = borgun;
