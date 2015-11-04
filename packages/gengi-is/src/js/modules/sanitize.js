'use strict';
import underscore from 'vendor/underscore'; // jshint ignore:line

_.mixin({
  sanitizeCode: (code) => {
    return code.indexOf('NAN') > -1 && code.length > 3 ? code.replace('NAN','') : code;
  },
  sanitizeNumber: (value) => {
    if (!value && (value === 0 || value === '')) {
      return value;
    }
    value = value || '';
    if (value.toString().indexOf(',')) {
      value = value.toString().replace(',', '.');
    }
    value = parseFloat(value);
    value = isNaN(value) || value < 0 ? 1 : value;

    return value;
  },
});
