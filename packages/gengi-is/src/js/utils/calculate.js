'use strict';
define(['utils/sanitize'], function(sanitize) {
  var _calc = function(rate, amount) {
    if (!rate) { return;}

    amount = sanitize.number(amount);
    rate = sanitize.number(rate);

    var value = amount * rate;
    var fix = value < 1 ? 5 : 2;

    return parseFloat(value).toFixed(fix);
  };

  return _calc;
});
