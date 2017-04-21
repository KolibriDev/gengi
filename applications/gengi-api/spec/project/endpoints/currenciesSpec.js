'use strict'

const app = require('../../../app')
const request = require('supertest')
const assert = require('assert')

describe('Endpoints > /currencies/:codes?', () => {
  const agent = request.agent(app)

  describe('GET /currencies/usd,eur', () => {
    it('should respond with json', done => {
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          assert(
            Object.prototype.toString.call(res.body) === '[object Object]',
            'res.body should be an object'
          )
        })
        .end(err => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have a currencyDate string', done => {
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          assert(
            res.body.hasOwnProperty('currencyDate'),
            'respond should have a currencyDate'
          )
        })
        .expect(res => {
          assert(
            typeof res.body.currencyDate === 'string',
            'currencyDate should be a string'
          )
        })
        .end(err => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have an expires number', done => {
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          assert(
            res.body.hasOwnProperty('expires'),
            'respond should have a expires'
          )
        })
        .expect(res => {
          assert(
            typeof res.body.expires === 'number',
            'expires should be a number'
          )
        })
        .end(err => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have a currencies object with exactly two items', done => {
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          assert(
            res.body.hasOwnProperty('list'),
            'respond should have a list property'
          )
        })
        .expect(res => {
          const responseType = Object.prototype.toString.call(res.body.list)
          assert(
            responseType === '[object Object]',
            `expected list to be an object, got '${responseType}'`
          )
        })
        .expect(res => {
          assert(
            Object.keys(res.body.list).length === 2,
            'list should have exactly two items'
          )
        })
        .end(err => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })

    it('should have valid currency item in the list object', done => {
      agent
        .get('/currencies/usd,eur')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          assert(res.body.hasOwnProperty('list'), 'respond should have a list')
        })
        .expect(res => {
          const responseType = Object.prototype.toString.call(res.body.list)
          assert(
            responseType === '[object Object]',
            `expected list to be an object, got '${responseType}'`
          )
        })
        .expect(res => {
          const firstObj = res.body.list[Object.keys(res.body.list)[0]]
          assert(
            firstObj.hasOwnProperty('code') &&
              firstObj.hasOwnProperty('name') &&
              firstObj.hasOwnProperty('rate'),
            'currency item should have code, name and rate'
          )
        })
        .end(err => {
          if (err) {
            done.fail(err)
          } else {
            done(err)
          }
        })
    })
  })
})
