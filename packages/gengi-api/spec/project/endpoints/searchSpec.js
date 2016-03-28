'use strict'

const app = require('../../../dist/server').app
const request = require('supertest')
const assert = require('assert')

describe('Endpoints > /search/:term?', () => {
  const agent = request.agent(app)

  describe('GET /search/króna', () => {
    it('should respond with json', (done) => {
      agent
        .get('/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object')
        })
        .end(done)
    })

    it('should have a currencyDate string', (done) => {
      agent
        .get('/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('currencyDate'), 'respond should have a currencyDate')
        })
        .expect((res) => {
          assert(typeof res.body.currencyDate === 'string', 'currencyDate should be a string')
        })
        .end(done)
    })

    it('should have an expires number', (done) => {
      agent
        .get('/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('expires'), 'respond should have a expires')
        })
        .expect((res) => {
          assert(typeof res.body.expires === 'number', 'expires should be a number')
        })
        .end(done)
    })

    it('should have a currencies object containing DKK', (done) => {
      agent
        .get('/search/króna')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('currencies'), 'respond should have a currencies')
        })
        .expect((res) => {
          const responseType = Object.prototype.toString.call(res.body.currencies)
          assert(responseType === '[object Object]', `expected currencies to be an object, got '${responseType}'`)
        })
        .expect((res) => {
          assert(res.body.currencies.hasOwnProperty('DKK'), 'currencies should contain DKK')
        })
        .end(done)
    })
  })
})
