var search = require('../../../dist/helpers/search');
var assert = require('assert');
var _ = require('underscore');

describe('Helpers > search', function(){


  it('should be a method', function(done){
    assert(typeof search === 'function', 'expected search to be a method');
    done();
  });

  it('should return false if no term is provided', function(done){
    assert(search() === false);
    done();
  });

  var arr = [
    { code: 'USD', name: 'bandarískur dalur' },
    { code: 'DKK', name: 'dönsk króna' },
    { code: 'CAD', name: 'kanadískur dalur' },
    { code: 'SEK', name: 'sænsk króna' },
    { code: 'NOK', name: 'norsk króna' },
  ];
  var retval = _.filter(arr, function(value){
    return search(value, 'króna');
  });
  var expectedval = [
    { code: 'DKK', name: 'dönsk króna' },
    { code: 'SEK', name: 'sænsk króna' },
    { code: 'NOK', name: 'norsk króna' },
  ];

  it('should return an array', function(done){
    assert(Array.isArray(retval), 'expected an array');
    done();
  });

  it('should return filtered list by term', function(done){
    assert(_.isEqual(retval, expectedval), 'expected true');
    done();
  });

});
