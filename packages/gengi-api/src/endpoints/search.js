import _ from 'underscore';
import helper from '../helpers/currencies';
import search from '../helpers/search';

let endpoint = {};

endpoint.get = (term, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err);
    } else {
      term = endpoint.ensureTerm(term);
      callback(err, endpoint.buildResponse(term, results));
    }
  });
};

endpoint.buildResponse = (term, results) => {
  let searchResults = _.filter(results.currencies, (value) =>{
    return search.filter(value, term);
  });

  let currencies = {};
  _.each(searchResults, (item) => {
    currencies[item.code] = helper.toDisplayCurrency(item);
  });

  return {
    currencyDate: results.currencyDate,
    expires: results.expires,
    currencies: currencies,
  };
};

endpoint.ensureTerm = (term) => {
  term = term || '';
  term = typeof term === 'string' ? term : term.toString();
  term = term.toUpperCase();

  return term;
};

module.exports = endpoint;
