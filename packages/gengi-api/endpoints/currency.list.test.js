var app = require('../server').app;
var request = require('supertest');
var assert = require('assert');

describe('/currency/:code?', function(){
  var agent = request.agent(app);

  describe('GET /currency/usd,eur', function(){
    it('should respond with json', function(done){
      agent
        .get('/currency/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object');
        })
        .end(done);
    });

    it('should have a currencyDate string', function(done){
      agent
        .get('/currency/usd,eur')
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
        .get('/currency/usd,eur')
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
        .get('/currency/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('currencies'), 'respond should have a currencies property');
        })
        .expect(function(res) {
          var responseType = Object.prototype.toString.call(res.body.currencies);
          assert(responseType === '[object Object]', 'expected currencies to be an object, got \''+responseType+'\'');
        })
        .expect(function(res) {
          assert(Object.keys(res.body.currencies).length === 2, 'currencies should have exactly two items');
        })
        .end(done);
    });

    it('should have valid currency item in the currencies array', function(done){
      agent
        .get('/currency/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('currencies'), 'respond should have a currencies');
        })
        .expect(function(res) {
          var responseType = Object.prototype.toString.call(res.body.currencies);
          assert(responseType === '[object Object]', 'expected currencies to be an object, got \''+responseType+'\'');
        })
        .expect(function(res) {
          var firstObj = res.body.currencies[Object.keys(res.body.currencies)[0]];
          assert(firstObj.hasOwnProperty('code') && firstObj.hasOwnProperty('name') && firstObj.hasOwnProperty('rate'), 'currency item should have code, name and rate');
        })
        .end(done);
    });

  });

});
