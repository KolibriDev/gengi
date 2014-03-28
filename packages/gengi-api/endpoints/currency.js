var request = require('request'),
    async = require('async'),
    _ = require('underscore');

// Connect to redis cache
var redis;
if(process.env.REDISCLOUD_URL || process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISCLOUD_URL || process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(':')[1]);
} else {
  redis = require('redis').createClient();
}

// List all currencies
exports.list = function(req, res) {
  // Fetch curency information in parallel and pass it to a callback
  async.parallel([fetchBtcIsk, fetchAurIsk, fetchIskBase],
    // Callback
    function(err, results) {
      res.send(_.flatten(results));
    }
  );
};

// Filter one currency from fetched data
exports.show = function(req, res) {
  async.parallel([fetchBtcIsk, fetchAurIsk, fetchIskBase],
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

// Fetches the base ISK dataset from the apis.is service
function fetchIskBase(cb) {
  var cacheKey = 'apis-is-isk-base';

  // Fetch cache key from redis cache
  redis.get(cacheKey, function(err, storedResult) {

    // Fetch new data in case of an error or no results showing up
    if(err || !storedResult) {
      request.get({ url: 'http://apis.is/currency/lb' },
        function (err, response, data) {
          if(err) {
            cb(true);
          } else {
            data = JSON.parse(data);

            // Store the fetched data in Redis
            redis.setex(cacheKey, 900, JSON.stringify(data.results));
            cb(null, data.results);
          }
        }
      );
    } else {
      // Serve cached data
      cb(null, JSON.parse(storedResult));
    }
  });
}

// Fetches the ISK-BTC rate from Coindesks's API
function fetchBtcIsk(cb) {
  var cacheKey = 'coindesk-btc-isk';

  // Fetch cache key from redis cache
  redis.get(cacheKey, function(err, storedResult) {

    // Fetch new data in case of an error or no results showing up
    if(err || !storedResult) {
      request.get({ url: 'https://api.coindesk.com/v1/bpi/currentprice/ISK.json' },
        function (err, response, data) {
          data = JSON.parse(data);
          if(err) {
            cb(true);
          } else if(data.bpi) {

            var result = [{
              shortName: 'BTC',
              longName: 'Bitcoin',
              value: data.bpi.ISK.rate_float
            }];

            // Store the fetched data in Redis
            redis.setex(cacheKey, 900, JSON.stringify(result));
            cb(null, result);
          } else {
            cb(true);
          }
        }
      );
    } else {
      // Serve cached data
      cb(null, JSON.parse(storedResult));
    }
  });
}
// Fetches the USD-AUR rate from Coinmarketcap.com and converts to ISK
function fetchAurIsk(cb) {
  var cacheKey = 'coinmarketcap-aur-usd';

  // Fetch cache key from redis cache
  redis.get(cacheKey, function(err, storedResult) {

    // Fetch new data in case of an error or no results showing up
    if(err || !storedResult) {
      request.get({ url: 'http://api02.gengi.is/currency/usd' },
        function (err, response, data) {
          data = JSON.parse(data);
          hasUsd(data.value);
        }
      );
      function hasUsd (usdValue) {
        request.get({ url: 'http://coinmarketcap.northpole.ro/api/aur.json' }, function (err, response, data) {
            data = JSON.parse(data);
            if(err) {
              cb(true);
            } else if(data.price) {

              var result = [{
                shortName: data.id,
                longName: data.name,
                value: data.price * usdValue
              }];

              // Store the fetched data in Redis
              redis.setex(cacheKey, 900, JSON.stringify(result));
              cb(null, result);
            } else {
              cb(true);
            }
          }
        );
      }
    } else {
      // Serve cached data
      cb(null, JSON.parse(storedResult));
    }
  });
}