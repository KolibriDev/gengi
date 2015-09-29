'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line
import _ from 'vendor/underscore';

let Global = class {
  constructor() {
    this.options = {
      debug: false,
    };

    this.attributes = {};

    this.createEls();
  }

  createEls() {
    this.els = {
      overlay: $('<overlay />'),
    };
    $.each(this.els, (index, el) => {
      $('body').append(el);
    });
  }

  getEl(name) {
    if (!name || !this.els.hasOwnProperty(name)) { return undefined; }
    return this.els[name];
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
