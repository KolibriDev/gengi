import _ from 'underscore';
import helper from '../helpers/currencies';
import calculate from '../helpers/calculate';

let endpoint = {};

endpoint.get = (code, value, callback) => {
  helper.get((err, results) => {
    if (err) {
      callback(err);
    } else {
      code = calculate.ensureCurrency(code);
      value = calculate.ensureValue(value);
      callback(err, endpoint.buildResponse(code, value, results));
    }
  });
};

endpoint.buildResponse = (code, value, results) => {
  let currency = _.findWhere(results.currencies, { code: code });
  currency = helper.toDisplayCurrency(currency);

  let response = {};
  response['currencyDate'] = results.currencyDate;
  response['expires'] = results.expires;
  response['currency'] = currency;
  response['ISKvalue'] = value;
  response[code + 'value'] = calculate.toISK(currency.rate, value);

  return response;
};

module.exports = endpoint;
