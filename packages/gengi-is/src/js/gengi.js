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
    // This is replaced with package.json version during build
    this.ensureVersion('<%version%>');

    global.setAttr('load-step', '2');

    this.setEvents();
    this.initRouter();

    setTimeout(() => {
      global.clearAttr('load-step');
      global.setAttr('state', 'ready');
    }, 500);
  }

  ensureVersion(version) {
    if (storage.get('version') && storage.get('version') !== version) {
      storage.clearAll();
    }
    storage.set('version', version);
  }

  setEvents() {
    $(document).on('leaving loading loaded', (event) => {
      global.setAttr('state', event.type);
    });

    $('[edit]').off('click.edit').on('click.edit', () => {
      global.setAttr('edit-mode', true);
    });
    $('[done]').off('click.done').on('click.done', () => {
      global.setAttr('edit-mode', false);
    });
  }

  initRouter() {

    onLoad(() => {
      $('body').find('[route]').off('click.route').on('click.route', (event) => {
        let $target = $(event.currentTarget);
        let view = $target.attr('route');

        if (view === 'calculator' && global.getAttr('edit-mode') === 'true') {
          return;
        }
        $(document).trigger('leaving');
        setTimeout(() => {
          if (event.currentTarget.tagName === 'A') {
            if (keys.isClickModifier(event)) { return; }
            router.navigate(event.currentTarget.pathname || $(event.currentTarget).attr('href'));
            event.preventDefault();
            return false;
          } else {
            let href = '';

            if (view === 'back') {
              router.back();
              return;
            } else if (view === 'calculator') {
              href = $target.attr('code');
            } else if (view === 'home') {
              href = '';
            } else {
              href = view;
            }

            // Manually scroll to top when not going 'back'
            $('currency-list, calculator, about').stop().animate({
              scrollTop: 0
            }, 250);

            router.navigate(`/${href}`);
          }
        }, 150);
      });
    });
  }
}

import domReady from 'vendor/domReady';
domReady(() => {
  // TODO: Remove from window
  window._gengi = new Gengi();
});
