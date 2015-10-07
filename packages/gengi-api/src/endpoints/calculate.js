import _ from 'underscore';
import helper from '../helpers/currencies';
import {toISK, ensureCurrency, ensureValue} from '../helpers/calculate';

const buildResponse = (code, value, results) => {
  let currency = _.findWhere(results.currencies, { code: code });
  currency = helper.toDisplayCurrency(currency);

  let response = {};
  response['currencyDate'] = results.currencyDate;
  response['expires'] = results.expires;
  response['currency'] = currency;
  response['ISKvalue'] = value;
  response[code + 'value'] = toISK(currency.rate, value);

  return response;
};

export default (code, value, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err);
    } else {
      code = ensureCurrency(code);
      value = ensureValue(value);
      callback(err, buildResponse(code, value, results));
    }
  });
};
