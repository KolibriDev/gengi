var borgun = require('../../../dist/helpers/borgun');
var assert = require('assert');

describe('Helpers > borgun', function(){

  describe('get(callback)', function(){

    it('should exist', function(done){
      assert(borgun.hasOwnProperty('get'), 'expected \'borgun\' to have property \'get\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof borgun.get === 'function', 'expected borgun.get to be a function');
      done();
    });

  });

  describe('parse(data)', function(){

    it('should exist', function(done){
      assert(borgun.hasOwnProperty('parse'), 'expected \'borgun\' to have property \'parse\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof borgun.parse === 'function', 'expected borgun.parse to be a function');
      done();
    });

  });

  describe('parseCurrencies(result)', function(){

    it('should exist', function(done){
      assert(borgun.hasOwnProperty('parseCurrencies'), 'expected \'borgun\' to have property \'parseCurrencies\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof borgun.parseCurrencies === 'function', 'expected borgun.parseCurrencies to be a function');
      done();
    });

  });

  describe('parseCurrency(currency, callback)', function(){

    it('should exist', function(done){
      assert(borgun.hasOwnProperty('parseCurrency'), 'expected \'borgun\' to have property \'parseCurrency\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof borgun.parseCurrency === 'function', 'expected borgun.parseCurrency to be a function');
      done();
    });

  });

  describe('sortCurrencies(currencies, sortBy)', function(){

    it('should exist', function(done){
      assert(borgun.hasOwnProperty('sortCurrencies'), 'expected \'borgun\' to have property \'sortCurrencies\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof borgun.sortCurrencies === 'function', 'expected borgun.sortCurrencies to be a function');
      done();
    });

  });

});
