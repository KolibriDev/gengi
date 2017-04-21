'use strict'

const time = require('../../../app/helpers/time')
const assert = require('assert')

describe('Helpers > time', () => {
  describe('getExpirytime(now)', () => {
    it('should be a method', done => {
      assert(
        time.hasOwnProperty('getExpirytime'),
        "expected 'time' to have property 'getExpirytime'"
      )
      assert(
        typeof time.getExpirytime === 'function',
        'expected time.getExpirytime to be a method'
      )
      done()
    })

    const value = time.getExpirytime('01.01.2014')

    it('should return a number', done => {
      assert(typeof value === 'number', 'expected a number')
      done()
    })

    it('should return exactly 10 minutes in seconds', done => {
      assert(value === 60 * 10, `expected '600' got '${value}'`)
      done()
    })
  })

  describe('getMidnight()', () => {
    it('should be a method', done => {
      assert(
        time.hasOwnProperty('getMidnight'),
        "expected 'time' to have property 'getMidnight'"
      )
      assert(
        typeof time.getMidnight === 'function',
        'expected time.getMidnight to be a method'
      )
      done()
    })

    let midnight = new Date()
    midnight.setHours(24)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    midnight.setMilliseconds(0)
    midnight = midnight.getTime()
    const value = time.getMidnight()

    it('should return a number', done => {
      assert(typeof value === 'number', 'expected a number')
      done()
    })

    it('should return midnight', done => {
      assert(value === midnight, `expected '${midnight}' to equal '${value}'`)
      done()
    })
  })
})
