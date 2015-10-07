import _ from 'underscore';
import redis from './redis';
import borgun from './borgun';

export const get = function(callback) {
  redis.get((err, storedResult) => {
    if (!err && storedResult) {
      callback(null, storedResult);
    } else {
      try {
        borgun.get((err, results) => {
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

export const toDisplayCurrency = function(currency) {
  let countryArr = [];
  _.each(currency.countries, (country) => {
    countryArr.push(country.country);
  });
  return {
    code: currency.code,
    name: currency.name,
    rate: currency.rate,
    countries: countryArr,
  };
};

export const ensureCodes = function(codes, currs) {
  codes = codes || '';
  codes = codes.toString().toUpperCase().split(',');

  if (codes.length === 1 && codes[0] === '') {
    _.each(currs, (curr) => {
      codes.push(curr.code);
    });
  }

  return codes;
};

export default { get, toDisplayCurrency, ensureCodes };
