var time = require('../../../dist/helpers/time');
var assert = require('assert');

describe('Helpers > time', function(){

  describe('secsToMidnight(now)', function(){

    it('should be a method', function(done){
      assert(time.hasOwnProperty('secsToMidnight'), 'expected \'time\' to have property \'secsToMidnight\'');
      assert(typeof time.secsToMidnight === 'function', 'expected time.secsToMidnight to be a method');
      done();
    });

    var value = time.secsToMidnight();

    it('should return a number', function(done){
      assert(typeof value === 'number', 'expected a number');
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
