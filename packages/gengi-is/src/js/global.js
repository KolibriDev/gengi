'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line
import _ from 'vendor/underscore';

let Global = class {
  constructor() {
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

    $('html').attr('data-' + key, value);
    this.attributes[key] = value;
    return true;
  }

  getAttr(key) {
    if (!key) { return undefined; }
    key = this.cleanValue(key);
    return this.attributes[key];
  }
  clearAttr(key) {
    if (!key) { return; }
    $('html').removeAttr('data-' + key);
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
