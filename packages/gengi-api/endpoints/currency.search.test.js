var app = require('../server').app;
var request = require('supertest');
var assert = require('assert');
var _ = require('underscore');

describe('/currency/search/:term', function(){
  var agent = request.agent(app);

  describe('GET /currency/search/króna', function(){
    it('should respond with json', function(done){
      agent
        .get('/currency/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object');
        })
        .end(done);
    });

    it('should have a currencyDate string', function(done){
      agent
        .get('/currency/search/króna')
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
        .get('/currency/search/króna')
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

    it('should have a currencies array containing DKK', function(done){
      agent
        .get('/currency/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          assert(res.body.hasOwnProperty('currencies'), 'respond should have a currencies');
        })
        .expect(function(res) {
          assert(Array.isArray(res.body.currencies), 'currencies should be an array');
        })
        .expect(function(res) {
          var inList = _.some(res.body.currencies, function(item){
            return item.code === 'DKK';
          });
          assert(inList, 'currencies should contain DKK');
        })
        .end(done);
    });

  });

});
