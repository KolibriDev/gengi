var request = require('request'),
    _ = require('underscore'),
    parseString = require('xml2js').parseString,
    redis = require('redis').createClient(),
    values = require('./values'),
    time = require('./time');

/**
@currency.get
  Try to get storedResult from redis and fetch new if it fails/is expired/not available.
**/
exports.get = function(callback){
  var cacheKey = 'mastercard-gengi';
  redis.get(cacheKey, function(err, storedResult) {
    if(err || !storedResult) {
      try {
        exports.fetch(function(err, results) {
          if(err) {
            callback(err);
          } else {
            // Expire cache on midnight same day
            redis.setex(cacheKey, time.secsToMidnight(), JSON.stringify(results));
            callback(null, results);
          }
        });
      } catch(e) {
        callback(e);
      }
    } else {
      callback(null, JSON.parse(storedResult));
    }
  });
};

/**
@currency.fetch
  Fetch latest data from borgun XML API and parse/format data. Make sure to store all searchable data.
**/
exports.fetch = function(callback){
  request.get({
    url: 'https://www.borgun.is/Currency/Default.aspx?function=all'
  }, function(err, response, data) {
    if(err || response.statusCode !== 200) {
      callback(err);
      return;
    }

    parseString(data, { explicitRoot: false }, function(err, result) {
      if(err || !result.hasOwnProperty('Rate') || result.Status[0].ResultCode[0] !== '0') {
        callback(err);
        return;
      }

      var arr = result.Rate;
      var retval = {
        currencies: {},
        currencyDate: arr[0].RateDate[0],
        // Store expiring timestamp for front-end
        expires: time.getMidnight(),
      };
      for (var i = 0, currency; currency = arr[i]; i++) {
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
        if (!retval.currencies.hasOwnProperty(newCurr.code)) {
          retval.currencies[newCurr.code] = newCurr;
        }
        retval.currencies[newCurr.code].countries.push(country);
      }
      retval.currencies = _.sortBy(retval.currencies, 'code');
      _.each(retval.currencies, function(currency){
        currency.countries = _.sortBy(currency.countries,'country');
      });
      callback(null, retval);
      return;
    });
  }
  );
};

exports.toDisplayCurrency = function(currency){
  var countryArr = [];
  _.each(currency.countries, function(country){
    countryArr.push(country.country);
  });
  return {
    code: currency.code,
    name: currency.name,
    rate: currency.rate,
    countries: countryArr,
  };
};
