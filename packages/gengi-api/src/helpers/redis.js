import redis from 'redis';
import time from './time';

let redisClient = redis.createClient();

let red = {};
red.ready = false;
red.error = '';
red.cacheKey = 'mastercard-gengi';

redisClient.on('error', (err) => {
  red.error = err;
  red.ready = false;
});
redisClient.on('ready', () => {
  red.error = '';
  red.ready = true;
});

red.isReady = function(callback) {
  if(red.ready) {
    callback();
  } else {
    callback({error: red.error});
  }
};

red.set = function(data) {
  red.isReady((err) => {
    if (!err) {
      redisClient.setex(red.cacheKey, time.secsToMidnight(), JSON.stringify(data));
    }
  });
};

red.get = function(callback) {
  red.isReady((err) => {
    if (err) {
      callback(err);
    } else {
      redisClient.get(red.cacheKey, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null,JSON.parse(results));
        }
      });
    }
  });
};

red.clear = function() {
  red.isReady((err) => {
    if (!err) {
      redisClient.del(red.cacheKey);
    }
  });
};

module.exports = red;
