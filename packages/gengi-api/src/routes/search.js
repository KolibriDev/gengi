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

module.exports = {
  router: router,
  name: 'search',
  docs: {
    path: '/search/:term',
    responseWithoutParams: 'Empty list',
    params: {
      term: {
        required: true,
        description: 'String value, search term to match with available currency objects',
        response: 'List of matching currencies, if any',
      }
    },
  },
};
