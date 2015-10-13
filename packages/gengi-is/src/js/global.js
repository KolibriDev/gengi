'use strict';
/* jshint ignore:start */
import jquery from 'vendor/jquery';
import underscore from 'vendor/underscore';
/* jshint ignore:end */

let Global = class {
  constructor() {
    this.id = 'gengi';
    this.options = {
      debug: false,
    };

    this.attributes = {};
  }

  createEl(name, el, target) {
    target = target || 'body';

    let newEl = $(el);
    $(target).append(newEl);

    this.els = this.els || {};
    this.els[name] = {
      el: newEl,
      name: name,
      target: target,
    };
    return newEl;
  }

  getEl(name) {
    if (!name || !this.els.hasOwnProperty(name)) { return undefined; }
    return this.els[name];
  }

  removeEl(name) {
    if (!name || !this.els.hasOwnProperty(name)) { return undefined; }
    let el = this.els[name];
    $(el.target).find(name).remove();
    this.els = _.omit(this.els, name);
  }

  setAttr(key, value) {
    if (!key) { return false; }

    key = this.cleanValue(key);
    value = this.cleanValue(value);

    $('html').attr(this.id + '-' + key, value);
    this.attributes[key] = value;
    $(document).trigger('attr', {key: key, value: value});
    return true;
  }

  getAttr(key) {
    if (!key) { return undefined; }
    key = this.cleanValue(key);
    return this.attributes[key];
  }
  clearAttr(key) {
    if (!key) { return; }
    $('html').removeAttr(this.id + '-' + key);
    this.attributes = _.omit(this.attributes, key);
  }
  clearAllAttr() {
    _.each(this.attributes, (value, key) => {
      this.clear(key);
    });
  }

  cleanValue(value) {
    return value && value.toString().toLowerCase();
  }
};

export default new Global();
