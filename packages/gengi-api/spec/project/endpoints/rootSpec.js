var app = require('../../../dist/server').app;
var pkg = require('../../../package.json').pkg;
var fs = require('fs');
var _ = require('underscore');
var request = require('supertest');
var assert = require('assert');

describe('Endpoints > /', function(){
  var agent = request.agent(app);

  it('should respond with json', function(done){
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        assert(Object.prototype.toString.call(res.body) === '[object Object]', 'expected response to be an object');
      })
      .end(done);
  });

  it('should have a version matching package.json', function(done){
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        assert(res.body.hasOwnProperty('version'), 'expected respond to have a version');
      })
      .expect(function(res) {
        assert(typeof res.body.version === 'string', 'expected version to be a string');
      })
      .expect(function(res) {
        assert(res.body.version === pkg.version, 'expected version to equal ' + pkg.version);
      })
      .end(done);
  });

  it('should have a description matching package.json', function(done){
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        assert(res.body.hasOwnProperty('description'), 'expected respond to have a description');
      })
      .expect(function(res) {
        assert(typeof res.body.description === 'string', 'expected description to be a string');
      })
      .expect(function(res) {
        assert(res.body.description === pkg.description, 'expected description to equal ' + pkg.description);
      })
      .end(done);
  });

  it('should have an endpoints object', function(done){
    var endpoints = {};

    fs.readdirSync('./dist/routes').forEach(function(fileName) {
      var endpoint = require('../../../dist/routes/' + fileName);
      endpoints[endpoint.name] = endpoint.docs;
    });

    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        assert(res.body.hasOwnProperty('endpoints'), 'expected respond to have endpoints');
      })
      .expect(function(res) {
        assert(Object.prototype.toString.call(res.body.endpoints) === '[object Object]', 'expected endpoints to be an object');
      })
      .expect(function(res) {
        assert(_.equal(res.body.endpoints, endpoints), 'expected endpoints to equal ' + endpoints);
      })
      .end(done);
  });

});
