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
        codes = _.uniq(codes);
      }

      var currencies = [];
      _.each(codes, function(code){
        // Return if current currency code is already in the array
        var alreadythere = _.some(currencies, function(item){
          return item.code === code || item.code === 'ISK';
        });
        if (!alreadythere) {
          // Select only first instance of current currency code
          var curr = _.findWhere(results.currencies, {code: code});
          if (curr) {
            currencies.push(currency.toDisplayCurrency(curr));
          }
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
      var currencies = _.filter(results.currencies, function(value){
        // Decode parameter to make sure special characters work
        var term = decodeURIComponent(req.params.term.toUpperCase());
        return search.filter(value, term);
      });
      currencies = currency.uniqueByCode(currencies);
      res.send({
        currencyDate: results.currencyDate,
        expires: results.expires,
        currencies: currencies,
      });
    }
  });
};
