var redisClient = require('redis').createClient();
var time = require('./time');

var redis = {};
redis.ready = false;
redis.error = '';
redis.cacheKey = 'mastercard-gengi';


redisClient.on('error', function (err) {
  console.log('Error ' + err);
  redis.error = err;
  redis.ready = false;
});
redisClient.on('ready', function () {
  redis.error = '';
  redis.ready = true;
});

redis.isReady = function(callback) {
  if(redis.ready) {
    callback();
  } else {
    callback({error: redis.error});
  }
};

redis.set = function(data) {
  redis.isReady(function(err){
    if (!err) {
      redisClient.setex(redis.cacheKey, time.secsToMidnight(), JSON.stringify(data));
    }
  });
};

redis.get = function(callback) {
  redis.isReady(function(err){
    if (err) {
      callback(err);
    } else {
      redisClient.get(redis.cacheKey, function(err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null,JSON.parse(results));
        }
      });
    }
  });
};

redis.clear = function() {
  redis.isReady(function(err){
    if (!err) {
      redisClient.del(redis.cacheKey);
    }
  });
};

module.exports = redis;
