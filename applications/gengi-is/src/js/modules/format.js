'use strict';
import _ from 'modules/underscore';

export const code = function(code) {
  code = _(code).sanitizeCode();
  return code.toUpperCase();
};
export const number = function(value, fix) {
  value = _(value).sanitizeNumber();
  return !fix ? value : parseFloat(value).toFixed(fix);
};
export const numberURL = function(value) {
  return this.number(value).toString().replace('.',',');
};
export const numberIcelandic = function(value, fix) {
  if (!value) { return value; }
  var initialValue = value;
  value = this.number(value, fix);
  value = value.toString();
  value = value.split('.');
  value[0] = this.numberWithCommas(value[0]);
  value = value.join(',');
  if (initialValue.toString().substring(initialValue.length - 1) === ',') {
    value = value + ',';
  }
  return value;
};
export const numberWithCommas = function(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default {
  code: code,
  number: number,
  numberURL: numberURL,
  numberIcelandic: numberIcelandic,
  numberWithCommas: numberWithCommas,
};
