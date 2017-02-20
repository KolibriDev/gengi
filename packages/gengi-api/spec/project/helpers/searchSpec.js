'use strict'

const search = require('../../../app/helpers/search')
const assert = require('assert')
const _ = require('underscore')

describe('Helpers > search', () => {
  it('should be a method', (done) => {
    assert(typeof search === 'function', 'expected search to be a method')
    done()
  })

  it('should return false if no term is provided', (done) => {
    assert(search() === false)
    done()
  })

  const arr = [
    { code: 'USD', name: 'bandarískur dalur' },
    { code: 'DKK', name: 'dönsk króna' },
    { code: 'CAD', name: 'kanadískur dalur' },
    { code: 'SEK', name: 'sænsk króna' },
    { code: 'NOK', name: 'norsk króna' },
  ]
  const retval = _.filter(arr, (value) => search(value, 'króna'))
  const expectedval = [
    { code: 'DKK', name: 'dönsk króna' },
    { code: 'SEK', name: 'sænsk króna' },
    { code: 'NOK', name: 'norsk króna' },
  ]

  it('should return an array', (done) => {
    assert(Array.isArray(retval), 'expected an array')
    done()
  })

  it('should return filtered list by term', (done) => {
    assert(_.isEqual(retval, expectedval), 'expected true')
    done()
  })
})
