'use strict'

const calculate = require('../../../dist/helpers/calculate')
const assert = require('assert')

describe('Helpers > calculate', () => {
  describe('toISK(rate, value)', () => {
    it('should exist', (done) => {
      assert(calculate.hasOwnProperty('toISK'), 'expected to have property')
      done()
    })

    it('should be a function', (done) => {
      assert(typeof calculate.toISK === 'function', 'expected calculate.toISK to be a function')
      done()
    })

    const calculated = calculate.toISK(22, 10)

    it('should return calculated value of rate and value', (done) => {
      assert(calculated === 220, `expected '220', got '${calculated}'`)
      done()
    })
  })

  describe('ensureCurrency(code)', () => {
    it('should exist', (done) => {
      assert(calculate.hasOwnProperty('ensureCurrency'), 'expected to have property')
      done()
    })

    it('should be a function', (done) => {
      assert(typeof calculate.ensureCurrency === 'function', 'expected calculate.ensureCurrency to be a function')
      done()
    })

    const currCode = calculate.ensureCurrency('usdqwerty')

    it('should return USD', (done) => {
      assert(currCode === 'USD', `expected 'USD', got '${currCode}'`)
      done()
    })
  })

  describe('ensureValue(value)', () => {
    it('should exist', (done) => {
      assert(calculate.hasOwnProperty('ensureValue'), 'expected to have property')
      done()
    })

    it('should be a function', (done) => {
      assert(typeof calculate.ensureValue === 'function', 'expected calculate.ensureValue to be a function')
      done()
    })

    const value = calculate.ensureValue()

    it('should return USD', (done) => {
      assert(value === 1, `expected '1', got '${value}'`)
      done()
    })
  })
})
