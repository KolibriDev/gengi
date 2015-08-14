var _ = require('underscore');
var helper = require('../helpers/currencies');
var calculate = require('../helpers/calculate');

var endpoint = {};

endpoint.get = function(code, value, callback) {
  helper.get(function(err, results) {
    if (err) {
      callback(err);
    } else {
      code = calculate.ensureCurrency(code);
      value = calculate.ensureValue(value);
      callback(err, endpoint.buildResponse(code, value, results));
    }
  });
};

endpoint.buildResponse = function(code, value, results) {
  var currency = _.findWhere(results.currencies, {code: code});
  currency = helper.toDisplayCurrency(currency);

  var response = {};
  response['currencyDate'] = results.currencyDate;
  response['expires'] = results.expires;
  response['currency'] = currency;
  response['ISKvalue'] = value;
  response[code + 'value'] = calculate.toISK(currency.rate, value);

  return response;
};

module.exports = endpoint;