'use strict';
define(['utils/sanitize'], function(sanitize) {
  var _format = {
    code: function(code){
      code = sanitize.code(code);
      return code.toUpperCase();
    },
    number: function(value, fix){
      value = sanitize.number(value);
      return !fix ? value : parseFloat(value).toFixed(fix);
    },
    format: function(){},
  };

  return _format;
});