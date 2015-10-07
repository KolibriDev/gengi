import express from 'express';
import currencies from '../endpoints/currencies';

let router = express.Router();

let docs = {
  path: '/currencies/:codes',
  responseWithoutParams: 'All available currencies',
  params: {
    codes: {
      required: false,
      description: 'String value, one or more currency codes separated by comma',
      response: 'List of requested currencies, if they exist',
    }
  },
};

router.get('/:codes?', (req, res) => {
  currencies.get(req.params.codes, (err, results) => {
    res.send(err ? err : results);
  });
});

export default {
  name: 'currencies',
  router,
  docs,
};
