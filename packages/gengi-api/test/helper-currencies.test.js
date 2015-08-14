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

});
