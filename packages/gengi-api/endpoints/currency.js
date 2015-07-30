var _ = require('underscore'),
    search = require('../helpers/search'),
    currency = require('../helpers/currency');

exports.getCurrencies = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      var codes = req.params.code || '';
      codes = codes.toUpperCase().split(',');

      if (codes.length === 1 && codes[0] === '') {
        _.each(results.currencies, function(currency){
          codes.push(currency.code);
        });
        codes = _.uniq(codes);
      }
      var currencies = [];
      _.each(codes, function(code){
        var alreadythere = _.some(currencies, function(item){
          return item.code === code;
        });
        if (!alreadythere) {
          var curr = _.findWhere(results.currencies, {code: code});
          if (curr) {
            currencies.push({
              code: curr.code,
              name: curr.name,
              rate: curr.rate,
            });
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

exports.findCurrencies = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      var currencies = _.filter(results.currencies, function(value){
        var term = decodeURIComponent(req.params.term.toUpperCase());
        return search.filter(value, term);
      });
      res.send({
        currencyDate: results.currencyDate,
        expires: results.expires,
        currencies: currencies,
      });
    }
  });
};
