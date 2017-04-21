'use strict'

const redis = require('../../../app/helpers/redis')
const assert = require('assert')

describe('Helpers > redis', () => {
  it('should have set method', done => {
    assert(redis.set, "expected 'redis' to have property 'set'")
    assert(
      typeof redis.set === 'function',
      'expected redis.set to be a function'
    )
    done()
  })

  it('should have get method', done => {
    assert(redis.get, "expected 'redis' to have property 'get'")
    assert(
      typeof redis.get === 'function',
      'expected redis.get to be a function'
    )
    done()
  })

  it('should have clear method', done => {
    assert(redis.clear, "expected 'redis' to have property 'clear'")
    assert(
      typeof redis.clear === 'function',
      'expected redis.clear to be a function'
    )
    done()
  })
})
