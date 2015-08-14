var _ = require('underscore');
var helper = require('../helpers/currencies');

var endpoint = {};

endpoint.get = function(codes, callback) {
  helper.get(function(err, results) {
    if (err) {
      callback(err);
    } else {
      codes = helper.ensureCodes(codes, results.currencies);
      callback(err, endpoint.buildResponse(codes, results));
    }
  });
};

endpoint.buildResponse = function(codes, results) {
  var currencies = {};
  _.each(codes, function(code){
    var curr = _.findWhere(results.currencies, {code: code});
    if (curr && curr.code !== 'ISK') {
      currencies[curr.code] = helper.toDisplayCurrency(curr);
    }
  });
  return {
    currencyDate: results.currencyDate,
    expires: results.expires,
    currencies: currencies,
  };
};

module.exports = endpoint;