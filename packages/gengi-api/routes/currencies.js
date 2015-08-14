var express = require('express');
var router = express.Router();
var currencies = require('../endpoints/currencies');

router.get('/:codes?', function(req, res) {
  currencies.get(req.params.codes, function(err, results) {
    res.send(err ? err : results);
  });
});

module.exports = router;
