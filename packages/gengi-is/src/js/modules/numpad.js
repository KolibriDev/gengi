'use strict';

const numpad = function(value, key) {
  value = value ? value.toString() : '';
  if (!key) { return; }
  if (value === '0') {
    value = '';
  }
  if (value.substring(value.length - 1) === '.') {
    value = value.replace('.','');
  }
  if (key === 'escape') {
    return 'show-list';
  } else if (key === 'arrow-up') {
    return 'activate-curr';
  } else if (key === 'arrow-down') {
    return 'activate-isk';
  } else if (key === ',' || key === 'comma') {
    if (value.indexOf('.') === -1 && value.substring(value.length - 1) !== ',') {
      value = value.length >= 1 ? value + ',' : '0' + ',';
    }
  } else if (key === 'del' || key === 'delete' || key === 'backspace') {
    value = value.slice(0, -1);
  } else {
    value += key.replace('numpad-','');
  }
  return value;
};

export default numpad;