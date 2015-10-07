import _ from 'underscore';
import helper from '../helpers/currencies';
import search from '../helpers/search';

const buildResponse = (term, results) => {
  let searchResults = _.filter(results.currencies, (value) =>{
    return search(value, term);
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

const ensureTerm = (term) => {
  term = term || '';
  term = typeof term === 'string' ? term : term.toString();
  term = term.toUpperCase();

  return term;
};

export default (term, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err);
    } else {
      term = ensureTerm(term);
      callback(err, buildResponse(term, results));
    }
  });
};
