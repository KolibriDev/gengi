'use strict';
import global from 'global';
/* jshint ignore:start */
import jquery from 'vendor/jquery';
import underscore from 'vendor/underscore';
/* jshint ignore:end */
import storage from 'modules/storage';
import router from 'modules/router';
import onLoad from 'modules/onLoad';
import keys from 'modules/keys';

global.setAttr('load-step', '1');

class Gengi {
  constructor() {
    this.ensureVersion('0.0.8');

    global.setAttr('load-step', '2');
    this.initRouter();

    setTimeout(() => {
      global.clearAttr('load-step');
      global.setAttr('state', 'ready');
    }, 500);
  }

  ensureVersion(version) {
    if (storage.get('version') !== version) {
      storage.clearAll();
    }
    storage.set('version', version);
  }

  initRouter() {

    onLoad(() => {
      $('body').find('[route]').off('click.route').on('click.route', (event) => {
        if (event.currentTarget.tagName === 'A') {
          if (keys.isClickModifier(event)) { return; }
          router.navigate(event.currentTarget.pathname || $(event.currentTarget).attr('href'));
          event.preventDefault();
          return false;
        } else {
          let href = '';
          let $target = $(event.currentTarget);
          let view = $target.attr('route');


          if (view === 'back') {
            window.history.back();
            return;
          } else if (view === 'calculator') {
            href = $target.attr('code');
          } else if (view === 'home') {
            href = '';
          } else {
            href = view;
          }

          router.navigate(`/${href}`);
        }
      });
    });
  }
}

import domReady from 'vendor/domReady';
domReady(() => {
  // TODO: Remove from window
  window._gengi = new Gengi();
});
