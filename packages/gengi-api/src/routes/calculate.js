import express from 'express'
import calculate from '../endpoints/calculate'

const router = express.Router() // eslint-disable-line new-cap

const docs = {
  path: '/calculate/:code/:value',
  response: 'Calculated value',
  params: {
    code: {
      required: true,
      description: 'Currency code',
    },
    value: {
      required: false,
      description: 'Number, defaults to 1',
    },
  },
}

router.get('/', (req, res) => {
  res.send({
    endpoint: docs,
  })
})

router.get('/:code/:value?', (req, res) => {
  calculate(req.params.code, req.params.value, (err, results) => {
    res.send(err || results)
  })
})

export default {
  name: 'calculate',
  router,
  docs,
}
