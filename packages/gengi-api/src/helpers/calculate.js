
var values = require('./values');

var calculate = {};

calculate.toISK = function(rate, value) {
  return values.rate(value * rate);
};

calculate.ensureCurrency = function(code) {
  code = code || '';
  code = code.toString().toUpperCase();
  code = code.length > 3 ? code.substring(0, 3) : code;
  return code;
};

calculate.ensureValue = function(value) {
  value = value || 1;
  value = values.rate(value);
  return value;
};

module.exports = calculate;
