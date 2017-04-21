'use strict'

const currencies = require('../../../app/helpers/currencies')
const assert = require('assert')

describe('Helpers > currencies', () => {
  describe('get(callback)', () => {
    it('should be a method', done => {
      assert(
        typeof currencies.get === 'function',
        'expected currencies.get to be a method'
      )
      done()
    })
  })

  describe('toDisplayCurrency(currency)', () => {
    it('should be a method', done => {
      assert(
        typeof currencies.toDisplayCurrency === 'function',
        'expected currencies.toDisplayCurrency to be a method'
      )
      done()
    })
  })

  describe('ensureCodes(codes, currencies)', () => {
    it('should be a method', done => {
      assert(
        typeof currencies.ensureCodes === 'function',
        'expected currencies.ensureCodes to be a method'
      )
      done()
    })

    const value = currencies.ensureCodes('usd,eur')

    it('should return an array', done => {
      assert(Array.isArray(value), 'expected to be array')
      done()
    })

    it('should be have a length of 2, and include USD and EUR', done => {
      assert(
        value.length === 2 &&
          value.indexOf('USD') > -1 &&
          value.indexOf('EUR') > -1,
        `expected '["USD","EUR"]', got '${value}'`
      )
      done()
    })
  })
})
