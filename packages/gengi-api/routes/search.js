var express = require('express');
var router = express.Router();
var search = require('../endpoints/search');

router.get('/:term?', function(req, res) {
  // Decode search term to make sure special characters work
  var term = decodeURIComponent(req.params.term);
  search.get(term, function(err, results) {
    res.send(err ? err : results);
  });
});

module.exports = router;
