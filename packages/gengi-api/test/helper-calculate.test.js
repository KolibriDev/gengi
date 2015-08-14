var calculate = require('../helpers/calculate');
var assert = require('assert');

describe('Helpers > calculate', function(){

  describe('toISK(rate, value)', function(){

    it('should exist', function(done){
      assert(calculate.hasOwnProperty('toISK'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof calculate.toISK === 'function', 'expected calculate.toISK to be a function');
      done();
    });

    var calculated = calculate.toISK(22, 10);

    it ('should return calculated value of rate and value', function(done){
      assert(calculated === 220, 'expected \'220\', got \''+calculated+'\'');
      done();
    });

  });

  describe('ensureCurrency(code)', function(){

    it('should exist', function(done){
      assert(calculate.hasOwnProperty('ensureCurrency'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof calculate.ensureCurrency === 'function', 'expected calculate.ensureCurrency to be a function');
      done();
    });

    var currCode = calculate.ensureCurrency('usdqwerty');

    it ('should return USD', function(done){
      assert(currCode === 'USD', 'expected \'USD\', got \''+currCode+'\'');
      done();
    });

  });

  describe('ensureValue(value)', function(){

    it('should exist', function(done){
      assert(calculate.hasOwnProperty('ensureValue'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof calculate.ensureValue === 'function', 'expected calculate.ensureValue to be a function');
      done();
    });

    var value = calculate.ensureValue();

    it ('should return USD', function(done){
      assert(value === 1, 'expected \'1\', got \''+value+'\'');
      done();
    });

  });

});
