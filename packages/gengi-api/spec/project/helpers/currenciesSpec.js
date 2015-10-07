var currencies = require('../../../dist/helpers/currencies');
var assert = require('assert');

describe('Helpers > currencies', function(){

  describe('get(callback)', function(){

    it('should be a method', function(done){
      assert(typeof currencies.get === 'function', 'expected currencies.get to be a method');
      done();
    });

  });

  describe('toDisplayCurrency(currency)', function(){

    it('should be a method', function(done){
      assert(typeof currencies.toDisplayCurrency === 'function', 'expected currencies.toDisplayCurrency to be a method');
      done();
    });

  });

  describe('ensureCodes(codes, currencies)', function(){

    it('should be a method', function(done){
      assert(typeof currencies.ensureCodes === 'function', 'expected currencies.ensureCodes to be a method');
      done();
    });

    var value = currencies.ensureCodes('usd,eur');

    it('should return an array', function(done){
      assert(Array.isArray(value), 'expected to be array');
      done();
    });

    it('should be have a length of 2, and include USD and EUR', function(done){
      assert(value.length === 2 && value.indexOf('USD') > -1 && value.indexOf('EUR') > -1, 'expected \'["USD","EUR"]\', got \''+value+'\'');
      done();
    });

  });

});
