'use strict';
define(['utils/sanitize'], (sanitize) => {
  return {
    code: (code) => {
      code = sanitize.code(code);
      return code.toUpperCase();
    },
    number: (value, fix) => {
      value = sanitize.number(value);
      return !fix ? value : parseFloat(value).toFixed(fix);
    },
    format: () => {},
  };
});