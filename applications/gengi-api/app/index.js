const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.set('port', process.env.PORT || 8002)
app.use(cors())

// Endpoints
const endpoints = {}

fs.readdirSync(path.join(__dirname, 'routes')).forEach(fileName => {
  const { name, router, docs } = require(`./routes/${fileName}`)
  app.use(`/${name}`, router)
  app.use(`/v2/${name}`, router)
  endpoints[name] = docs
})

const { version, description, bugs, author, contributors } = require(path.join(
  __dirname,
  '../',
  'package.json'
))
const docs = {
  version,
  description,
  endpoints,
  bugs,
  author,
  contributors,
}

app.get('/', (req, res) => {
  res.status(200).send(docs)
})

app.use((req, res) => {
  res.status(404).send(docs)
})

module.exports = app
