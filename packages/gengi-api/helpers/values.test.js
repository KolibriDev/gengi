var values = require('./values');
var assert = require('assert');

describe('Values', function(){

  describe('name()', function(){
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

  describe('rate()', function(){
    var rate = values.rate(123.456789);

    it('should return a float', function(done){
      assert(!isNaN(rate) && rate.toString().indexOf('.') !== -1, 'should be a float');
      done();
    });

    it('should return correctly formatted rate', function(done){
      assert(rate === '123.456789', 'expected \'123.456789\', not \''+rate+'\'');
      done();
    });

  });

});