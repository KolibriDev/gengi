var _ = require('underscore');
var search = require('../helpers/search');
var helper = require('../helpers/currencies');

var endpoint = {};

endpoint.get = function(term, callback) {
  helper.get(function(err, results) {
    if (err) {
      callback(err);
    } else {
      term = endpoint.ensureTerm(term);
      callback(err, endpoint.buildResponse(term, results));
    }
  });
};

endpoint.buildResponse = function(term, results) {
  var searchResults = _.filter(results.currencies, function(value){
    return search.filter(value, term);
  });

  var currencies = {};
  _.each(searchResults, function(item){
    currencies[item.code] = helper.toDisplayCurrency(item);
  });

  return {
    currencyDate: results.currencyDate,
    expires: results.expires,
    currencies: currencies,
  };
};

endpoint.ensureTerm = function(term) {
  term = term || '';
  term = typeof term === 'string' ? term : term.toString();
  term = term.toUpperCase();

  return term;
};

module.exports = endpoint;