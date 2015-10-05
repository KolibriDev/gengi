var redis = require('../../../dist/helpers/redis');
var assert = require('assert');

describe('Helpers > redis', function(){

  describe('set(data)', function(){

    it('should exist', function(done){
      assert(redis.hasOwnProperty('set'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof redis.set === 'function', 'expected redis.set to be a function');
      done();
    });

  });

  describe('get(callback)', function(){

    it('should exist', function(done){
      assert(redis.hasOwnProperty('get'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof redis.get === 'function', 'expected redis.get to be a function');
      done();
    });

  });

  describe('clear()', function(){

    it('should exist', function(done){
      assert(redis.hasOwnProperty('clear'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof redis.clear === 'function', 'expected redis.clear to be a function');
      done();
    });

  });

});
