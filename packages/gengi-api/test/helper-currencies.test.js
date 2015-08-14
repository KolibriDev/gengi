var currencies = require('../helpers/currencies');
var assert = require('assert');

describe('Helpers > currencies', function(){

  describe('get(callback)', function(){

    it('should exist', function(done){
      assert(currencies.hasOwnProperty('get'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof currencies.get === 'function', 'expected currencies.get to be a function');
      done();
    });

  });

  describe('toDisplayCurrency(currency)', function(){

    it('should exist', function(done){
      assert(currencies.hasOwnProperty('toDisplayCurrency'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof currencies.toDisplayCurrency === 'function', 'expected currencies.toDisplayCurrency to be a function');
      done();
    });

  });

  describe('ensureCodes(codes, currencies)', function(){

    it('should exist', function(done){
      assert(currencies.hasOwnProperty('ensureCodes'), 'expected to have property');
      done();
    });

    it('should be a function', function(done){
      assert(typeof currencies.ensureCodes === 'function', 'expected currencies.ensureCodes to be a function');
      done();
    });

    var value = currencies.ensureCodes('usd,eur');
    console.log(value);

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
