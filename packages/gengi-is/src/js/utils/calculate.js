'use strict';
define(['utils/sanitize'], (sanitize) => {
  return (rate, amount) => {
    if (!rate) { return;}

    amount = sanitize.number(amount);
    rate = sanitize.number(rate);

    var value = amount * rate;
    var fix = value < 1 ? 5 : 2;

    return parseFloat(value).toFixed(fix);
  };
});
