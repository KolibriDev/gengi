var express = require('express');
var router = express.Router();
var currencies = require('../endpoints/currencies');

router.get('/:codes?', function(req, res) {
  currencies.get(req.params.codes, function(err, results) {
    res.send(err ? err : results);
  });
});

module.exports = {
  router: router,
  name: 'currencies',
  docs: {
    path: '/currencies/:codes',
    responseWithoutParams: 'All available currencies',
    params: {
      codes: {
        required: false,
        description: 'String value, one or more currency codes separated by comma',
        response: 'List of requested currencies, if they exist',
      }
    },
  },
};
