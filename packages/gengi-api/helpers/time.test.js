var time = require('./time');
var assert = require('assert');

describe('Time', function(){

  describe('secsToMidnight()', function(){
    var fakeDate = new Date();
    fakeDate.setHours(23);
    fakeDate.setMinutes(0);
    fakeDate.setSeconds(0);
    fakeDate.setMilliseconds(0);
    var value = time.secsToMidnight(fakeDate);

    it('should return a number', function(done){
      assert(typeof value === 'number', 'should return a number');
      done();
    });

    it('should return 1 hour; 3600 seconds', function(done){
      assert(value === 3600, 'should return 1 hour; or 3600 seconds');
      done();
    });

  });

  describe('getMidnight()', function(){
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    midnight = midnight.getTime();
    var value = time.getMidnight();

    it('should return a number', function(done){
      assert(typeof value === 'number', 'should return a number');
      done();
    });

    it('should return ' + midnight, function(done){
      assert(value === midnight, 'should return ' + midnight);
      done();
    });

  });

});
