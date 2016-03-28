'use strict'

const values = require('../../../dist/helpers/values')
const assert = require('assert')

describe('Helpers > values', () => {
  describe('name(name)', () => {
    it('should exist', (done) => {
      assert(values.hasOwnProperty('name'), 'expected \'values\' to have property \'name\'')
      done()
    })

    it('should be a function', (done) => {
      assert(typeof values.name === 'function', 'expected values.name to be a function')
      done()
    })

    it('should return given value if falsy', (done) => {
      assert(values.name(undefined) === undefined, 'expected undefined')
      done()
    })

    const name = values.name('pund, sterlingspund')

    it('should return a string', (done) => {
      assert(typeof name === 'string', 'expected a string')
      done()
    })

    it('should return correctly formatted name', (done) => {
      assert(name === 'Sterlingspund', `expected 'Sterlingspund', got '${name}'`)
      done()
    })

    const noname = values.name('')
    it('should return empty string', (done) => {
      assert(noname === '', `expected '', got '${noname}'`)
      done()
    })

    const nocomma = values.name('sterlingspund')
    it('should return sterlingspund', (done) => {
      assert(nocomma === 'Sterlingspund', `expected 'Sterlingspund', got '${nocomma}'`)
      done()
    })
  })

  describe('rate(value)', () => {
    it('should exist', (done) => {
      assert(values.hasOwnProperty('rate'), 'expected \'values\' to have property \'rate\'')
      done()
    })

    it('should be a function', (done) => {
      assert(typeof values.rate === 'function', 'expected values.rate to be a function')
      done()
    })

    const rate = values.rate(123.456789)

    it('should return a float', (done) => {
      assert(!isNaN(rate) && rate.toString().indexOf('.') !== -1, 'expected a float')
      done()
    })

    it('should return correctly formatted rate', (done) => {
      assert(rate === 123.456789, `expected '123.456789', not '${rate}'`)
      done()
    })
  })
})
