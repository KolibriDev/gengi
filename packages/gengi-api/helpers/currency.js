var request = require('request'),
    parseString = require('xml2js').parseString,
    redis = require('redis').createClient();

exports.get = function(callback){
  var cacheKey = 'isk-base';
  redis.get(cacheKey, function(err, storedResult) {
    if(err || !storedResult) {
      try {
        exports.fetch(function(err, results) {
          if(err) {
            callback(err);
          } else {
            redis.setex(cacheKey, 900, JSON.stringify(results));
            callback(null, results);
          }
        });
      } catch(e) {
        callback(e);
      }
    } else {
      callback(null, JSON.parse(storedResult));
    }
  });
};

exports.fetch = function(callback){
  request.get({
    url: 'http://www.landsbankinn.is/modules/markets/services/XMLGengi.asmx/NyjastaGengiByType?strTegund=A'
  }, function(err, response, data) {
    if(err || response.statusCode !== 200) {
      callback(err);
    }

    parseString(data, { explicitRoot: false }, function(err, result) {

      if(err || !result.hasOwnProperty('GjaldmidillRow')) {
        callback(err);
      }

      var arr = result.GjaldmidillRow;
      var retval = {
        c: [],
        t: new Date(arr[0].Dagsetning[0]).getTime(),
      };
      for (var i = 0, currency; currency = arr[i]; i++) {
        retval.c.push({
          s: currency.Mynt[0],
          l: currency.Heiti[0],
          // longNameEn: currency.HeitiEN[0],
          v: parseFloat(currency.Midgengi).toFixed(3),
          // askValue: parseFloat(currency.Sala),
          // bidValue: parseFloat(currency.Kaup),
          // changeCur: parseFloat(currency.Breyting[0]),
          // changePer: parseFloat((parseFloat(currency.Breyting) / parseFloat(currency.Midgengi)).toFixed(2))
        });
      }
      callback(null, retval);
    });
  }
  );
};
