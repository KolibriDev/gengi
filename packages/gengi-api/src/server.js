import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import fs from 'fs'

const app = express()

app.set('port', process.env.PORT || 8002)
app.use(cors())

// Endpoints
const endpoints = {}

fs.readdirSync(path.join(__dirname, 'routes')).forEach((fileName) => {
  const { name, router, docs } = require(`./routes/${fileName}`)
  app.use(`/${name}`, router)
  app.use(`/v2/${name}`, router)
  endpoints[name] = docs
})

app.use((req, res) => {
  const {
    version, description, bugs, author, contributors,
  } = require(path.join(__dirname, 'package.json'))
  res.send({
    version, description, endpoints, bugs, author, contributors,
  })
})

http.createServer(app).listen(app.get('port'))

exports.app = app
