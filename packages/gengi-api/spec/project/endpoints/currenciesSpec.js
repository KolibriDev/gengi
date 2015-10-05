var app = require('../../../dist/server').app;
var request = require('supertest');
var assert = require('assert');

describe('Endpoints > /currencies/:codes?', function(){
  var agent = request.agent(app);

  describe('GET /currencies/usd,eur', function(){
    it('should respond with json', function(done){
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object');
        })
        .end(done);
    });

    it('should have a currencyDate string', function(done){
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('currencyDate'), 'respond should have a currencyDate');
        })
        .expect(function(res) {
          assert(typeof res.body.currencyDate === 'string', 'currencyDate should be a string');
        })
        .end(done);
    });

    it('should have an expires number', function(done){
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('expires'), 'respond should have a expires');
        })
        .expect(function(res) {
          assert(typeof res.body.expires === 'number', 'expires should be a number');
        })
        .end(done);
    });

    it('should have a currencies object with exactly two items', function(done){
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('list'), 'respond should have a list property');
        })
        .expect(function(res) {
          var responseType = Object.prototype.toString.call(res.body.list);
          assert(responseType === '[object Object]', 'expected list to be an object, got \''+responseType+'\'');
        })
        .expect(function(res) {
          assert(Object.keys(res.body.list).length === 2, 'list should have exactly two items');
        })
        .end(done);
    });

    it('should have valid currency item in the list object', function(done){
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('list'), 'respond should have a list');
        })
        .expect(function(res) {
          var responseType = Object.prototype.toString.call(res.body.list);
          assert(responseType === '[object Object]', 'expected list to be an object, got \''+responseType+'\'');
        })
        .expect(function(res) {
          var firstObj = res.body.list[Object.keys(res.body.list)[0]];
          assert(firstObj.hasOwnProperty('code') && firstObj.hasOwnProperty('name') && firstObj.hasOwnProperty('rate'), 'currency item should have code, name and rate');
        })
        .end(done);
    });

  });

});
