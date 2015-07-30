var _ = require('underscore'),
    currency = require('./helpers/currency');

exports.getCurrencies = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      res.send(results);
    }
  });
};

exports.getCurrency = function(req, res) {
  currency.get(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      res.send(_.findWhere(results, {shortName: req.params.name.toUpperCase()}));
    }
  });
};

