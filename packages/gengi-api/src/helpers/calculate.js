import {rate as valueRate} from './values';

export const toISK = (rate, value) => valueRate(value * rate);

export const ensureCurrency = function(code) {
  code = code || '';
  code = code.toString().toUpperCase();
  code = code.length > 3 ? code.substring(0, 3) : code;
  return code;
};

export const ensureValue = function(value) {
  value = value || 1;
  value = valueRate(value);
  return value;
};
