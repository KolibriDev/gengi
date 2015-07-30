var request = require('request'),
    parseString = require('xml2js').parseString,
    redis = require('redis').createClient(),
    values = require('./values'),
    time = require('./time');

exports.get = function(callback){
  var cacheKey = 'mastercard-gengi';
  redis.get(cacheKey, function(err, storedResult) {
    if(err || !storedResult) {
      try {
        exports.fetch(function(err, results) {
          if(err) {
            callback(err);
          } else {
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
        currencies: [],
        currencyDate: arr[0].RateDate[0],
        expires: time.getMidnight(),
      };
      for (var i = 0, currency; currency = arr[i]; i++) {
        retval.currencies.push({
          code: currency.CurrencyCode[0],
          name: values.name(currency.CurrencyDescription[0]),
          country: currency.Country[0],
          countryCode: currency.CountryCode[0],
          countryEnglish: currency.CountryEnglish[0],
          rate: values.rate(currency.CurrencyRate[0]),
        });
      }
      callback(null, retval);
      return;
    });
  }
  );
};
