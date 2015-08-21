'use strict';
define([], () => {
  var Sanitize = class {
    code(code) {
      return code.indexOf('NAN') > -1 && code.length > 3 ? code.replace('NAN','') : code;
    }
    number(value) {
      if (value.toString().indexOf(',')) {
        value = value.toString().replace(',', '.');
      }
      value = parseFloat(value);
      value = isNaN(value) || value < 0 ? 1 : value;

      return value;
    }
  };

  return new Sanitize();
});