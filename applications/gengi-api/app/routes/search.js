const express = require('express')
const search = require('../endpoints/search')

const router = express.Router() // eslint-disable-line new-cap

const docs = {
  path: '/search/:term',
  responseWithoutParams: 'Empty list',
  params: {
    term: {
      required: true,
      description: 'String value, search term to match with available currency objects',
      response: 'List of matching currencies, if any',
    },
  },
}

router.get('/:term?', (req, res) => {
  // Decode search term to make sure special characters work
  const term = decodeURIComponent(req.params.term)
  search(term, (err, results) => {
    res.send(err || results)
  })
})

module.exports = {
  name: 'search',
  router,
  docs,
}
