'use strict';
import sanitize from './sanitize';

const format = {
  code: function(code) {
    code = sanitize.code(code);
    return code.toUpperCase();
  },
  number: function(value, fix) {
    value = sanitize.number(value);
    return !fix ? value : parseFloat(value).toFixed(fix);
  },
  numberURL: function(value) {
    return this.number(value).toString().replace('.',',');
  },
  numberIcelandic: function(value, fix) {
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
  },
  numberWithCommas: function(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  },
};

export const currencyCode = format.currencyCode;
export const number = format.number;
export const numberURL = format.numberURL;
export const numberIcelandic = format.numberIcelandic;
export const numberWithCommas = format.numberWithCommas;
export default format;
