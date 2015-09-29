'use strict';
import {number as sanitizeNumber} from 'mod/sanitize';

export default function(rate, amount) {
  if (!rate) { return; }

  amount = sanitizeNumber(amount);
  rate = sanitizeNumber(rate);

  let value = amount * rate;
  let fix = value < 1 && value > 0.001 ? (value === 0 ? 0 : 5) : 2;

  return parseFloat(value).toFixed(fix);
}
