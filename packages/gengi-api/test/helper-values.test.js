var values = require('../helpers/values');
var assert = require('assert');

describe('Helpers > values', function(){

  describe('name(name)', function(){

    it('should exist', function(done){
      assert(values.hasOwnProperty('name'), 'expected \'values\' to have property \'name\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof values.name === 'function', 'expected values.name to be a function');
      done();
    });

    it('should return given value if falsy', function(done){
      assert(values.name(undefined) === undefined, 'expected undefined');
      done();
    });

    var name = values.name('pund, sterlingspund');

    it('should return a string', function(done){
      assert(typeof name === 'string', 'expected a string');
      done();
    });

    it('should return correctly formatted name', function(done){
      assert(name === 'sterlingspund', 'expected \'sterlingspund\', got \''+name+'\'');
      done();
    });

    var noname = values.name('');
    it('should return empty string', function(done){
      assert(noname === '', 'expected \'\', got \''+noname+'\'');
      done();
    });

    var nocomma = values.name('sterlingspund');
    it('should return sterlingspund', function(done){
      assert(nocomma === 'sterlingspund', 'expected \'sterlingspund\', got \''+nocomma+'\'');
      done();
    });

  });

  describe('rate(value)', function(){

    it('should exist', function(done){
      assert(values.hasOwnProperty('rate'), 'expected \'values\' to have property \'rate\'');
      done();
    });

    it('should be a function', function(done){
      assert(typeof values.rate === 'function', 'expected values.rate to be a function');
      done();
    });

    var rate = values.rate(123.456789);

    it('should return a float', function(done){
      assert(!isNaN(rate) && rate.toString().indexOf('.') !== -1, 'expected a float');
      done();
    });

    it('should return correctly formatted rate', function(done){
      assert(rate === 123.456789, 'expected \'123.456789\', not \''+rate+'\'');
      done();
    });

  });

});
