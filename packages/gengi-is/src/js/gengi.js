'use strict';
// import global from 'global';
/* jshint ignore:start */
import jquery from 'vendor/jquery';
import underscore from 'vendor/underscore';
import initrouter from 'init/router';
/* jshint ignore:end */
import storage from 'modules/storage';

class Gengi {
  constructor() {
    console.info('Final rewrite (yeah right)');
    this.version = '0.0.8';
    this.ensureVersion();
  }

  ensureVersion() {
    if (storage.get('version') !== this.version) {
      storage.clearAll();
    }
    storage.set('version', this.version);
  }
}

import domReady from 'vendor/domReady';
domReady(() => {
  // TODO: Remove
  window._gengi = new Gengi();
});
