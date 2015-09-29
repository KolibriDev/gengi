'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line

class Gengi {
  constructor() {
    this.foo = 'bar';
    console.info('Final rewrite (yeah right)');
  }
}

import domReady from 'vendor/domReady';
domReady(() => {
  window._gengi = new Gengi();
});
