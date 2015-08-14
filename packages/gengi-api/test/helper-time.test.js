var time = require('../helpers/time');
var assert = require('assert');

describe('Helpers > time', function(){

  describe('secsToMidnight()', function(){

    it('should exist', function(done){
      assert(time.hasOwnProperty('secsToMidnight'), 'expected \'time\' to have property \'secsToMidnight\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof time.secsToMidnight === 'function', 'expected time.secsToMidnight to be a function');
      done();
    });

    var fakeDate = new Date();
    fakeDate.setHours(23);
    fakeDate.setMinutes(0);
    fakeDate.setSeconds(0);
    fakeDate.setMilliseconds(0);
    var value = time.secsToMidnight(fakeDate);

    it('should return a number', function(done){
      assert(typeof value === 'number', 'expected a number');
      done();
    });

    it('should return 1 hour; 3600 seconds', function(done){
      assert(value === 3600, 'expected 3600 seconds');
      done();
    });

  });

  describe('getMidnight()', function(){

    it('should exist', function(done){
      assert(time.hasOwnProperty('getMidnight'), 'expected \'time\' to have property \'getMidnight\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof time.getMidnight === 'function', 'expected time.getMidnight to be a function');
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
