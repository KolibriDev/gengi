define([], function() {
  'use strict';
  var _san = {
    code: function(code){
      code = code.indexOf('NAN') > -1 && code.length > 3 ? code.replace('NAN','') : code;
      code = code.length !== 3 ? false : code;

      return code;
    },
    number: function(value){
      value = parseFloat(value);
      value = isNaN(value) || value <= 0 ? 1 : value;

      return value;
    },
    format: function(){},
  };

  return _san;
});