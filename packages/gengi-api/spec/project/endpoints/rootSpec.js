'use strict'

const app = require('../../../dist/server').app
const pkg = require('../../../package.json').pkg
const fs = require('fs')
const _ = require('underscore')
const request = require('supertest')
const assert = require('assert')

describe('Endpoints > /', () => {
  const agent = request.agent(app)

  it('should respond with json', (done) => {
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert(Object.prototype.toString.call(res.body) === '[object Object]', 'expected response to be an object')
      })
      .end((err) => {
        if (err) {
          done.fail(err)
        } else {
          done(err)
        }
      })
  })

  it('should have a version matching package.json', (done) => {
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('version'), 'expected respond to have a version')
      })
      .expect((res) => {
        assert(typeof res.body.version === 'string', 'expected version to be a string')
      })
      .expect((res) => {
        assert(res.body.version === pkg.version, `expected version to equal ${pkg.version}`)
      })
      .end((err) => {
        if (err) {
          done.fail(err)
        } else {
          done(err)
        }
      })
  })

  it('should have a description matching package.json', (done) => {
    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('description'), 'expected respond to have a description')
      })
      .expect((res) => {
        assert(typeof res.body.description === 'string', 'expected description to be a string')
      })
      .expect((res) => {
        assert(res.body.description === pkg.description, `expected description to equal ${pkg.description}`)
      })
      .end((err) => {
        if (err) {
          done.fail(err)
        } else {
          done(err)
        }
      })
  })

  it('should have an endpoints object', (done) => {
    const endpoints = {}

    fs.readdirSync('./dist/routes').forEach((fileName) => {
      const endpoint = require(`../../../dist/routes/${fileName}`)
      endpoints[endpoint.name] = endpoint.docs
    })

    agent
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert(res.body.hasOwnProperty('endpoints'), 'expected respond to have endpoints')
      })
      .expect((res) => {
        assert(Object.prototype.toString.call(res.body.endpoints) === '[object Object]', 'expected endpoints to be an object')
      })
      .expect((res) => {
        assert(_.equal(res.body.endpoints, endpoints), `expected endpoints to equal ${endpoints}`)
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
