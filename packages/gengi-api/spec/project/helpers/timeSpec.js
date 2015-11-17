var time = require('../../../dist/helpers/time');
var assert = require('assert');

describe('Helpers > time', function(){

  describe('getExpirytime(now)', function(){

    it('should be a method', function(done){
      assert(time.hasOwnProperty('getExpirytime'), 'expected \'time\' to have property \'getExpirytime\'');
      assert(typeof time.getExpirytime === 'function', 'expected time.getExpirytime to be a method');
      done();
    });

    var value = time.getExpirytime('01.01.2014');

    it('should return a number', function(done){
      assert(typeof value === 'number', 'expected a number');
      done();
    });

    it('should return exactly 10 minutes in seconds', function(done){
      assert(value === 60 * 10, 'expected \'600\' got \'' + value + '\'');
      done();
    });

  });

  describe('getMidnight()', function(){

    it('should be a method', function(done){
      assert(time.hasOwnProperty('getMidnight'), 'expected \'time\' to have property \'getMidnight\'');
      assert(typeof time.getMidnight === 'function', 'expected time.getMidnight to be a method');
      done();
    });

    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    midnight = midnight.getTime();
    var value = time.getMidnight();

    it('should return a number', function(done){
      assert(typeof value === 'number', 'expected a number');
      done();
    });

    it('should return ' + midnight, function(done){
      assert(value === midnight, 'expected ' + midnight);
      done();
    });

  });

});
