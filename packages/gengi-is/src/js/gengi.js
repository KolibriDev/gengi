'use strict';
import global from 'global';
/* jshint ignore:start */
import jquery from 'vendor/jquery';
/* jshint ignore:end */
import _ from 'modules/underscore';
import sortable from 'vendor/sortable';
import storage from 'modules/storage';
import router from 'modules/router';
import onLoad from 'modules/onLoad';
import keys from 'modules/keys';
import currencies from 'modules/currencies';
import SwiftClick from 'vendor/swiftclick';

global.setAttr('load-step', '1');

class Gengi {
  constructor() {
    // This is replaced with package.json version during build
    this.ensureVersion('<%version%>');

    global.setAttr('load-step', '2');

    this.setEvents();
    this.initRouter();
    this.initSorting();
    this.swiftclick = new SwiftClick(document.body);

    setTimeout(() => {
      $(document).trigger('loaded');
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
      global.clearAttr('load-step');
      global.setAttr('state', event.type);

      if (event.type === 'loaded') {
        this.swiftclick.replaceNodeNamesToTrack(['currency','curr-selected','curr-next','div','num']);

        this.initSorting();

        if (global.getAttr('edit-mode') === 'true' && global.getAttr('view') !== 'home' && global.getAttr('view') !== 'allcurrencies') {
          this.disableEdit();
        }
      }

      if (global.getAttr('view') === 'home') {
        if (global.getAttr('edit-mode') === 'true') {
          this.enableEdit();
          this.enableSorting();
        } else {
          this.disableEdit();
          this.softdisableSorting();
        }
      } else {
        this.disableEdit();
        this.disableSorting();
      }
    });

    $('[edit]').off('click.edit').on('click.edit', () => {
      this.enableEdit();
      if (global.getAttr('view') === 'home') {
        this.enableSorting();
      } else {
        this.disableSorting();
      }
    });
    $('[done]').off('click.done').on('click.done', () => {
      this.disableEdit();
      if (global.getAttr('view') === 'home') {
        this.softdisableSorting();
      } else {
        this.disableSorting();
      }
    });
  }

  enableEdit() {
    // console.trace('enableEdit');
    global.setAttr('edit-mode', true);
  }
  disableEdit() {
    // console.trace('disableEdit');
    global.setAttr('edit-mode', false);
  }

  enableSorting() {
    // console.trace('enableSorting');
    this.sortingOptions({disabled: true});
    this.sortingOptions({
      delay: 0,
      disabled: false,
    });
  }

  disableSorting() {
    // console.trace('disableSorting');
    this.sortingOptions({disabled: true});
  }

  softdisableSorting() {
    // console.trace('softdisableSorting');
    global.setAttr('edit-mode', false);
    this.sortingOptions({disabled: true});
    this.sortingOptions({
      delay: 250,
      disabled: false,
    });
  }

  sortingOptions(options) {
    options = options || {};
    _.each(options, (value, key) => {
      this.sortablelist.option(key, value);
    });
  }

  initSorting(options) {
    options = options || {};
    this.sortableOptions = {
      group: 'currency-list',
      sort: true,
      delay: 250,
      disabled: true,
      animation: 150,
      draggable: 'currency',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',

      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,

      onStart: () => {
        this.enableEdit();
      },

      onUpdate: () => {
        if (global.getAttr('view') === 'home') {
          let currlist = [];
          $('currency-list > div.list > currency').each((i, el) => {
            currlist.push($(el).attr('code'));
          });
          currencies.reorderSelected(currlist);
        }
      },
    };
    $.extend(this.sortableOptions, options);

    window._sortlist = this.sortablelist = sortable.create($('currency-list > div.list').get(0), this.sortableOptions);
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
