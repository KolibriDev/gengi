'use strict';
import {number} from './sanitize';

const calculate = function(rate, amount) {
  if (!rate) { return; }

  amount = number(amount);
  rate = number(rate);

  var value = amount * rate;
  var fix = value < 1 && value > 0.001 ? (value === 0 ? 0 : 5) : 2;

  return parseFloat(value).toFixed(fix);
};

export default calculate;
