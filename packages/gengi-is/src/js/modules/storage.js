
let Storage = class {
  constructor(){
    this.storage = window.localStorage;
  }

  set(key, value){
    value = this.freeze(value);
    if (!value) {
      console.warn('No value provided for "%s"\n', key, value);
      return false;
    }
    this.storage.setItem(key, value);
  }
  get(key){
    let value = this.storage.getItem(key);
    value = this.thaw(value);
    return this.isEmpty(value) ? false : value;
  }
  clear(key){
    this.storage.removeItem(key);
  }
  clearAll(){
    this.storage.clear();
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

export default new Storage();
