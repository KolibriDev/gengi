var borgun = require('../../../dist/helpers/borgun');
var assert = require('assert');

describe('Helpers > borgun', function(){

  it('should have get method', function(done){
    assert(borgun.get, 'expected \'borgun\' to have property \'get\'');
    assert(typeof borgun.get === 'function', 'expected borgun.get to be a function');
    done();
  });

  it('should return callback with error and result', function(done){
    borgun.get(function(error, result){
      assert(true, 'expected borgun.get to call callback');
      assert(error !== undefined, 'expected callback to have error argument');
      assert(result !== undefined, 'expected callback to have result argument');
      done();
    });
  });

});
