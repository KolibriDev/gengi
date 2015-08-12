var _ = require('underscore'),
    search = require('../helpers/search'),
    currency = require('../helpers/currency');

/**
@endpoint.getCurrencies
  Return selected or all available currencies in correct format.
**/
exports.getCurrencies = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      // Make sure codes isn't an empty string
      var codes = req.params.code || '';
      codes = codes.toUpperCase().split(',');

      // If codes array is empty, parse whole list
      if (codes.length === 1 && codes[0] === '') {
        _.each(results.currencies, function(currency){
          codes.push(currency.code);
        });
      }

      var currencies = {};
      _.each(codes, function(code){
        var curr = _.findWhere(results.currencies, {code: code});
        if (curr && curr.code !== 'ISK') {
          currencies[curr.code] = currency.toDisplayCurrency(curr);
        }
      });

      res.send({
        currencyDate: results.currencyDate,
        expires: results.expires,
        currencies: currencies,
      });
    }
  });
};

/**
@endpoint.findCurrencies
  Find all currencies that match search term, filtered with search helper.
**/
exports.findCurrencies = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      var searchResults = _.filter(results.currencies, function(value){
        // Decode parameter to make sure special characters work
        var term = decodeURIComponent(req.params.term.toUpperCase());
        return search.filter(value, term);
      });
      var currencies = {};
      _.each(searchResults, function(item){
        currencies[item.code] = currency.toDisplayCurrency(item);
      });
      res.send({
        currencyDate: results.currencyDate,
        expires: results.expires,
        currencies: currencies,
      });
    }
  });
};
