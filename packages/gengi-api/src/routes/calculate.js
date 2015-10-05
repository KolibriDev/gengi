import express from 'express';
import calculate from '../endpoints/calculate';

let router = express.Router();

let docs = {
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
    }
  },
};

router.get('/', (req, res) => {
  res.send({
    endpoint: docs,
  });
});

router.get('/:code/:value?', (req, res) => {
  calculate.get(req.params.code, req.params.value, (err, results) => {
    res.send(err ? err : results);
  });
});

module.exports = {
  router: router,
  name: 'calculate',
  docs: docs,
};
