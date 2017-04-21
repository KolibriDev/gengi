const express = require('express')
const currencies = require('../endpoints/currencies')

const router = express.Router() // eslint-disable-line new-cap

const docs = {
  path: '/currencies/:codes',
  responseWithoutParams: 'All available currencies',
  params: {
    codes: {
      required: false,
      description: 'String value, one or more currency codes separated by comma',
      response: 'List of requested currencies, if they exist',
    },
  },
}

router.get('/:codes?', (req, res) => {
  currencies(req.params.codes, (err, results) => {
    res.send(err || results)
  })
})

module.exports = {
  name: 'currencies',
  router,
  docs,
}
