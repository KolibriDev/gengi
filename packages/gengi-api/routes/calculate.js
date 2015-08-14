var express = require('express');
var router = express.Router();
var calculate = require('../endpoints/calculate');

var docs = {
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

router.get('/', function(req, res) {
  res.send({
    endpoint: docs,
  });
});

router.get('/:code/:value?', function(req, res) {
  calculate.get(req.params.code, req.params.value, function(err, results) {
    res.send(err ? err : results);
  });
});

module.exports = {
  router: router,
  name: 'calculate',
  docs: docs,
};
