/* jshint ignore:start */
'use strict';

define(['vue', 'zepto', 'keys', 'router', 'utils/utils', 'vueHelper'], (Vue, $, keys, router, utils, vueHelper) => {
  var Gengi = class {
    constructor() {
      this.version = '0.0.7';
      this.keyEvents();
      this.initVue();
      this.vm = new Vue(this.vueHelper);
      this.initializeData();
    }

    initVue() {
      this.vueFilters();
      this.vueHelper = vueHelper.options;
      this.vueHelper.methods = vueHelper.methods;

      this.vueHelper.data.app.version = this.version;

      this.vueMethods = {};
    }

    vueFilters() {
      Vue.filter('float', {
        read: function(value) {
          return value;
        },
        write: function (value, oldVal) {
          var parsed = parseFloat(value);
          parsed = isNaN(parsed) ? oldVal : parsed;
          parsed = value.substr(value.length - 1) === '.' ? parsed.toString() + '.' : parsed;
          parsed = value === '' ? '' : parsed;
          return parsed;
        }
      });

      Vue.filter('icelandicNumber', {
        read: function(value) {
          return utils.format.numberIcelandic(value);
        },
        write: function (value) {
          return value;
        },
      });
      Vue.filter('number', {
        read: function(value) {
          return utils.format.numberURL(value);
        },
        write: function (value) {
          return value;
        },
      });
    }

    keyEvents() {
      this.keylock = false;
      $(document).on('keyup', (event) => {
        if (router.state.view === 'list') {
        } else if (router.state.view === 'calc' && this.keylock && keys.isFunctionalKey(event.which)) {
          this.keylock = false;
        }
      });
      $(document).on('keydown', (event) => {
        if (router.state.view === 'list') {
          if (keys.isUpDown(event.which)) {
            this.navigateList(event.which);
          } else if (keys.which(event.which) === 'enter') {
            this.showView.calc({
              currency: this.vm.currencyList[this.vm.app.highlightedCurrency],
            });
          }
          event.preventDefault();
          return false;
        } else if (router.state.view === 'calc') {
          if (!this.keylock && keys.isFunctionalKey(event.which)) {
            this.keylock = true;
          }
          if (!this.keylock && (keys.isNumPad(event.which) || keys.isUpDown(event.which))) {
            this.numpad(keys.which(event.which));
            event.preventDefault();
            return false;
          }
        }
      });
    }
  };

  return new Gengi();
});
/* jshint ignore:end */