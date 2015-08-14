var app = require('../server').app;
var request = require('supertest');
var assert = require('assert');

describe('Endpoints > /calculate/:code/:value?', function(){
  var agent = request.agent(app);

  describe('GET /calculate/usd/22', function(){
    it('should respond with json', function(done){
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object');
        })
        .end(done);
    });

    it('should have a currencyDate string', function(done){
      agent
        .get('/calculate/usd/22')
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
        .get('/calculate/usd/22')
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

    it('should have a valid currency object', function(done){
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('currency'), 'respond should have a currency property');
        })
        .expect(function(res) {
          var responseType = Object.prototype.toString.call(res.body.currency);
          assert(responseType === '[object Object]', 'expected currency to be an object, got \''+responseType+'\'');
        })
        .expect(function(res) {
          assert(res.body.currency.hasOwnProperty('rate'), 'expected currency to have property rate');
        })
        .expect(function(res) {
          var currency = res.body.currency;
          assert(currency.hasOwnProperty('code') && currency.hasOwnProperty('name') && currency.hasOwnProperty('rate'), 'currency item should have code, name and rate');
        })

        .end(done);
    });

    it('should have an ISKvalue number, matching path', function(done){
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('ISKvalue'), 'respond should have a ISKvalue');
        })
        .expect(function(res) {
          assert(typeof res.body.ISKvalue === 'number', 'ISKvalue should be a number');
        })
        .expect(function(res) {
          assert(res.body.ISKvalue === 22, 'ISKvalue should be match path');
        })
        .end(done);
    });

    it('should have an USDvalue number, calculated value', function(done){
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('USDvalue'), 'respond should have a USDvalue');
        })
        .expect(function(res) {
          assert(typeof res.body.USDvalue === 'number', 'USDvalue should be a number');
        })
        .expect(function(res) {
          assert(res.body.USDvalue === res.body.currency.rate * 22, 'USDvalue should be calculated value');
        })
        .end(done);
    });

  });

});
