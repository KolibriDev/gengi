var _ = require('underscore');
var redis = require('./redis');
var borgun = require('./borgun');

var currencies = {};

currencies.get = function(callback) {
  redis.get(function(err, storedResult) {
    if (!err && storedResult) {
      callback(null, storedResult);
    } else {
      try {
        borgun.get(function(err, results) {
          if (err) {
            callback(err);
          } else {
            redis.set(results);
            callback(null, results);
          }
        });
      } catch(exc) {
        callback(exc);
      }
    }
  });
};

currencies.toDisplayCurrency = function(currency){
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

currencies.ensureCodes = function(codes, currs) {
  codes = codes || '';
  codes = codes.toUpperCase().split(',');

  if (codes.length === 1 && codes[0] === '') {
    _.each(currs, function(curr) {
      codes.push(curr.code);
    });
  }

  return codes;
};

module.exports = currencies;
