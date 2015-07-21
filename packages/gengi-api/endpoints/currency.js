var request = require('request'),
    parseString = require('xml2js').parseString,
    _ = require('underscore'),
    redis = require('redis').createClient();


exports.getCurrencies = function(req, res) {
  getCurrencyBase(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      res.send(results);
    }
  });
};

exports.getCurrency = function(req, res) {
  getCurrencyBase(function(err, results) {
    if(err) {
      res.send({error: 1});
    } else {
      res.send(_.findWhere(results, {shortName: req.params.name.toUpperCase()}));
    }
  });
};


var getCurrencyBase = function(cb) {
  var cacheKey = 'isk-base';
  redis.get(cacheKey, function(err, storedResult) {
    if(err || !storedResult) {
      try {
        fetchCurrencyBase(function(err, results) {
          if(err) {
            cb(err);
          } else {
            redis.setex(cacheKey, 900, JSON.stringify(results));
            cb(null, results);
          }
        });
      } catch(e) {
        cb(e);
      }
    } else {
      cb(null, JSON.parse(storedResult));
    }
  });
};


var fetchCurrencyBase = function(cb) {
  request.get({
    url: 'http://www.landsbankinn.is/modules/markets/services/XMLGengi.asmx/NyjastaGengiByType?strTegund=A'
  }, function(err, response, data) {
    if(err || response.statusCode !== 200) {
      cb(err);
    }

    var currencies = [];
    parseString(data, { explicitRoot: false }, function(err, result) {

      if(err || !result.hasOwnProperty('GjaldmidillRow')) {
        cb(err);
      }

      var arr = result.GjaldmidillRow;
      for (var i = 0, currency; currency = arr[i]; i++) {
        currencies.push({
          shortName: currency.Mynt[0],
          longName: currency.Heiti[0],
          longNameEn: currency.HeitiEN[0],
          timestamp: new Date(currency.Dagsetning[0]).getTime(),
          value: parseFloat(currency.Midgengi),
          askValue: parseFloat(currency.Sala),
          bidValue: parseFloat(currency.Kaup),
          changeCur: parseFloat(currency.Breyting[0]),
          changePer: parseFloat((parseFloat(currency.Breyting) / parseFloat(currency.Midgengi)).toFixed(2))
        });
      }
      cb(null, currencies);
    });
  }
  );
};