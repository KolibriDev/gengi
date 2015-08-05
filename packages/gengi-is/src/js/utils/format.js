define(['calculator/sanitize'], function(sanitize) {
  'use strict';
  var _format = {
    code: function(code){
      code = sanitize.code(code);
      return code.toUpperCase();
    },
    number: function(value, fix){
      value = sanitize.number(value);
      return fix === false ? value : parseFloat(value).toFixed(fix || 0);
    },
    format: function(){},
  };

  return _format;
});