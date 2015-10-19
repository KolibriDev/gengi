'use strict';

let Storage = class {
  constructor(namespace){
    if (this.support('localStorage')) {
      this.storage = window.localStorage;
    } else if (this.support('sessionStorage')) {
      this.storage = window.sessionStorage;
    } else {
      console.warn('No persisted storage available!');
      this.storage = false;
    }
    this.ns = namespace || '';
  }

  support(type){
    type = type || 'localStorage';
    try {
      if (type === 'localStorage') { return false; }
      let mod = 'modernizr';
      window[type].setItem(mod, mod);
      window[type].removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }

  set(key, value){
    value = this.freeze(value);
    if (!value) {
      console.warn('No value provided for "%s"\n', key, value);
      return false;
    }
    key = this.ns ? this.ns + '-' + key : key;
    try {
      this.storage.setItem(key, value);
    } catch(e) {
      return false;
    }
  }
  get(key){
    try {
      key = this.ns ? this.ns + '-' + key : key;
      let value = this.storage.getItem(key);
      value = this.thaw(value);
      return this.isEmpty(value) ? false : value;
    } catch(e) {
      return false;
    }
  }
  clear(key){
    try {
      this.storage.removeItem(key);
      return true;
    } catch(e) {
      return false;
    }
  }
  clearAll(){
    try {
      let regex = new RegExp('^' + this.ns + '-');
      Object.keys(this.storage).forEach((key) => {
        if (regex.test(key)) {
          this.clear(key);
        }
      });
      return true;
    } catch(e) {
      return false;
    }
  }

  thaw(value){
    if (this.isEmpty(value)) {
      return value;
    } else if (value.indexOf('array:') === 0) {
      try {
        value = value.substring(6);
        value = value.split('|');
      } catch(ignore) {}
    } else if (value.indexOf('object:') === 0) {
      try {
        value = value.substring(7);
        value = JSON.parse(value);
      } catch(ignore) {}
    } else if (value.indexOf('number:') === 0) {
      try {
        value = value.substring(7);
        value = parseFloat(value);
      } catch(ignore) {}
    }
    return value;
  }

  freeze(value){
    if (this.isEmpty(value)) {
      return value;
    } else if (typeof value !== 'string') {
      if (Array.isArray(value)) {
        try {
          value = 'array:' + value.join('|');
        } catch(ignore) {}
      } else if (Object.prototype.toString.call(value) === '[object Object]') {
        try {
          value = 'object:' + JSON.stringify(value);
        } catch(ignore) {}
      } else if (typeof value === 'number') {
        try {
          value = 'number:' + value.toString();
        } catch(ignore) {}
      } else {
        try {
          value = value.toString();
        } catch(ignore) {}
      }
    }
    return value;
  }

  isEmpty(value){
    return (!value && value !== '') || value === '{}' || value === '[]';
  }
};

export default new Storage('gengi');
