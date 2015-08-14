var redisClient = require('redis').createClient();
var time = require('./time');

var redis = {};
redis.cacheKey = 'mastercard-gengi';

redis.set = function(data) {
  redisClient.setex(redis.cacheKey, time.secsToMidnight(), JSON.stringify(data));
};

redis.get = function(callback) {
  redisClient.get(redis.cacheKey, function(err, results) {
    if (err) {
      callback(err);
    }
    callback(null,JSON.parse(results));
  });
};

redis.clear = function() {
  return redisClient.del(redis.cacheKey);
};

module.exports = redis;
