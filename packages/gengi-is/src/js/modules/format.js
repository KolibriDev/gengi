import sanitize from 'modules/sanitize';

let Format = class {
  code(code) {
    code = sanitize.code(code);
    return code.toUpperCase();
  }
  number(value, fix) {
    value = sanitize.number(value);
    return !fix ? value : parseFloat(value).toFixed(fix);
  }
  numberURL(value) {
    return this.number(value).toString().replace('.',',');
  }
  numberIcelandic(value, fix) {
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
  }
  numberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
};

export default new Format();
