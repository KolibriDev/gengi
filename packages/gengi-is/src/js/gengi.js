'use strict';
import global from 'global';
import $ from 'modules/jquery';
import _ from 'modules/underscore';
import sortable from 'vendor/sortable';
import storage from 'modules/storage';
import router from 'modules/router';
import onLoad from 'modules/onLoad';
import keys from 'modules/keys';
import currencies from 'modules/currencies';
import analytics from 'modules/analytics';
import SwiftClick from 'vendor/swiftclick';

analytics.logTime('JS Dependencies', 'load');
global.setAttr('load-step', '1');

class Gengi {
  constructor() {
    analytics.logTime('Gengi app', 'construct');
    // This is replaced with package.json version during build
    this.ensureVersion('<%version%>');

    global.setAttr('load-step', '2');

    this.setEvents();
    this.initRouter();
    this.initSorting();
    this.swiftclick = new SwiftClick(document.body);

    setTimeout(() => {
      // Make sure we're loaded
      $(document).trigger('loaded');
    }, 500);
  }

  ensureVersion(version) {
    if (storage.get('version') && storage.get('version') !== version) {
      // analytics('send', 'event');
      storage.clearAll();
    }
    storage.set('version', version);
  }

  setEvents() {
    $(document).on('leaving loading loaded', (event) => {
      global.clearAttr('load-step');
      global.setAttr('state', event.type);

      if (event.type === 'loaded') {
        this.swiftclick.replaceNodeNamesToTrack(['a', 'currency','curr-selected','curr-next','div','num']);

        if (global.getAttr('edit-mode') === 'true' && global.getAttr('view') !== 'home' && global.getAttr('view') !== 'allcurrencies') {
          this.disableEdit();
        }

        if (global.getAttr('view') === 'home') {
          this.initSorting();
          if (global.getAttr('edit-mode') === 'true') {
            this.enableEdit();
            this.enableSorting();
          } else {
            this.disableEdit();
            this.softdisableSorting();
          }
        } else {
          this.disableSorting();
        }
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

    $(document).off('keydown.esc').on('keydown.esc', (event) => {
      if (keys.which(event.which) === 'escape') {
        router.back();
        event.preventDefault();
        return false;
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
      draggable: 'a',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',

      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,

      onStart: () => {
        this.enableEdit();
        this.enableSorting();
      },

      onUpdate: () => {
        if (global.getAttr('view') === 'home') {
          let currlist = [];
          $('currency-list > div.list > a').each((i, el) => {
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

        if (event.currentTarget.tagName === 'A' && keys.isClickModifier(event)) {
          return;
        }

        if (view === 'calculator' && global.getAttr('edit-mode') === 'true') {
          if (event.currentTarget.tagName === 'A') {
            console.log('preventdefault');
            event.preventDefault();
            return false;
          } else {
            return;
          }
        }

        $(document).trigger('leaving');
        setTimeout(() => {
          if (event.currentTarget.tagName === 'A') {

            let href = $target.attr('href');

            router.navigate(href);

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

        if (event.currentTarget.tagName === 'A') {
          event.preventDefault();
          return false;
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
