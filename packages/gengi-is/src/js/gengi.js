'use strict';
import global from 'global';
/* jshint ignore:start */
// These vendor modules register themselves globally
import jquery from 'vendor/jquery';
import underscore from 'vendor/underscore';
/* jshint ignore:end */
import storage from 'modules/storage';
import sanitize from 'modules/sanitize';
import currencies from 'modules/currencies';
import calculate from 'modules/calculate';

class Gengi {
  constructor() {
    console.info('Final rewrite (yeah right)');
    this.version = '0.0.8';
    this.syncStorage();

    global.setAttr('foo', 'bar');

    // this.state = 'loading';
  }

  calculate() {
    console.group('Calculating');
    let rate = this.currencies.list['USD'].rate;
    let amount = this.amount.cur;

    let retval = calculate(rate, amount);
    console.log('retval: ', retval);
    console.groupEnd('and done!');
  }

  search() {}

  setIsk(newValue) {
    this.amount.isk = sanitize.number(newValue) || this.amount.isk;
    this.store('amount');
  }
  setCur(newValue) {
    this.amount.cur = sanitize.number(newValue) || this.amount.cur;
    this.store('amount');
  }

  store(target) {
    if (!target) { return undefined; }
    storage.set(target, this[target]);
  }

  syncStorage() {
    if (storage.get('version') !== this.version) {
      storage.clearAll();
    }
    this.amount = {
      isk: 0,
      cur: 1,
    };

    this.selectedCurrencies = this.selectedCurrencies || [
      'EUR',
      'USD',
      'GBP',
    ];

    this.store('amount');
    this.store('version');
    this.store('selectedCurrencies');

    currencies.get((res) => {
      this.currencies = res;
    }, (res) => {
      if (!res) {
        // TODO: inform user their screwed
        console.warn('inform user their screwed');
      } else {
        // TODO: inform user they have expired rates
        console.warn('inform user they have expired rates');
        this.currencies = res;
      }
    });
  }
}

import domReady from 'vendor/domReady';
domReady(() => {
  window._gengi = new Gengi();
});
