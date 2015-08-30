'use strict';

const sanitize = {
  code: function(code) {
    return code.indexOf('NAN') > -1 && code.length > 3 ? code.replace('NAN','') : code;
  },
  number: function(value) {
    if (value.toString().indexOf(',')) {
      value = value.toString().replace(',', '.');
    }
    value = parseFloat(value);
    value = isNaN(value) || value < 0 ? 1 : value;

    return value;
  },
};

export const code = sanitize.code;
export const number = sanitize.number;
export default sanitize;
