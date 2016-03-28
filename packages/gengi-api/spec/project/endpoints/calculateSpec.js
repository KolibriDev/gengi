'use strict'

const app = require('../../../dist/server').app
const request = require('supertest')
const assert = require('assert')

describe('Endpoints > /calculate/:code/:value?', () => {
  const agent = request.agent(app)

  describe('GET /calculate/wat', () => {
    it('should respond with 404 and message', (done) => {
      agent
        .get('/calculate/wat')
        .expect(404)
        .expect((res) => {
          assert(res.body.statusText, `expected text, got ${res.body.statusText}`)
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })
  })

  describe('GET /calculate/usd/22', () => {
    it('should respond with json', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(Object.prototype.toString.call(res.body) === '[object Object]', 'res.body should be an object')
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have a currencyDate string', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('currencyDate'), 'respond should have a currencyDate')
        })
        .expect((res) => {
          assert(typeof res.body.currencyDate === 'string', 'currencyDate should be a string')
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have an expires number', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('expires'), 'respond should have a expires')
        })
        .expect((res) => {
          assert(typeof res.body.expires === 'number', 'expires should be a number')
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have a valid currency object', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('currency'), 'respond should have a currency property')
        })
        .expect((res) => {
          const responseType = Object.prototype.toString.call(res.body.currency)
          assert(responseType === '[object Object]', `expected currency to be an object, got '${responseType}'`)
        })
        .expect((res) => {
          assert(res.body.currency.hasOwnProperty('rate'), 'expected currency to have property rate')
        })
        .expect((res) => {
          const currency = res.body.currency
          assert(currency.hasOwnProperty('code') && currency.hasOwnProperty('name') && currency.hasOwnProperty('rate'), 'currency item should have code, name and rate')
        })

        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have an ISKvalue number, matching path', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('ISKvalue'), 'respond should have a ISKvalue')
        })
        .expect((res) => {
          assert(typeof res.body.ISKvalue === 'number', 'ISKvalue should be a number')
        })
        .expect((res) => {
          assert(res.body.ISKvalue === 22, 'ISKvalue should be match path')
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have an USDvalue number, calculated value', (done) => {
      agent
        .get('/calculate/usd/22')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert(res.body.hasOwnProperty('USDvalue'), 'respond should have a USDvalue')
        })
        .expect((res) => {
          assert(typeof res.body.USDvalue === 'number', 'USDvalue should be a number')
        })
        .expect((res) => {
          assert(res.body.USDvalue === res.body.currency.rate * 22, 'USDvalue should be calculated value')
        })
        .end((err) => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })
  })
})
