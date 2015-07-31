var values = require('./values');
var assert = require('assert');

describe('Values', function(){

  describe('name()', function(){
    var name = values.name('pund, sterlingspund');

    it('should return a string', function(done){
      assert(typeof name === 'string', 'should return a string');
      done();
    });

    it('should return correctly formatted name', function(done){
      assert(name === 'sterlingspund', 'should return \'sterlingspund\', not \''+name+'\'');
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
      assert(rate === '123.457', 'should return \'123.457\', not \''+rate+'\'');
      done();
    });

  });

});
