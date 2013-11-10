var request = require('request'),
    async = require('async'),
    _ = require('underscore');

exports.list = function(req, res) {
  async.parallel([fetchBtcIsk, fetchIskBase],
    // Callback
    function(err, results) {
      res.send(_.flatten(results));
    }
  );
};

exports.show = function(req, res) {
  async.parallel([fetchBtcIsk, fetchIskBase],
    // Callback
    function(err, results) {
      var flattenResults = _.map(_.flatten(results), function(curr) {
        return {
          shortName: curr.shortName.toUpperCase(),
          longName: curr.longName,
          value: curr.value
        };
      });

      res.send(_.findWhere(flattenResults, {shortName: req.params.name.toUpperCase()}));
    }
  );
};

function fetchIskBase(cb) {
  request.get({ url: 'http://apis.is/currency/lb' },
    function (err, response, data) {
      if(err) {
        cb(true);
      } else {
        data = JSON.parse(data);
        cb(null, data.results);
      }
    }
  );
}

function fetchBtcIsk(cb) {
  request.get({ url: 'https://api.coindesk.com/v1/bpi/currentprice/ISK.json' },
    function (err, response, data) {
      data = JSON.parse(data);
      if(err) {
        cb(true);
      } else if(data.bpi) {
        cb(null, [{
          shortName: 'BTC',
          longName: "Bitcoin",
          value: data.bpi.ISK.rate_float
        }]);
      } else {
        cb(true);
      }
    }
  );
}