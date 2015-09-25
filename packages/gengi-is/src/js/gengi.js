'use strict';
define(['vue', 'zepto', 'promise', 'keys', 'router', 'modules/utils', 'init/swiftclick'], function(Vue, $, promise, keys, router, utils, swiftclick) {
  var _gengi = {
    version: '0.0.7',
    vm: false,
    init: function() {
      var keylock = false;

      $(document).on('keyup', function(event) {
        if (router.state.view === 'list') {
        } else if (router.state.view === 'calc' && keylock && keys.isFunctionalKey(event.which)) {
          keylock = false;
        }
      });
      $(document).on('keydown', function(event) {
        if (router.state.view === 'list') {
          if (keys.isUpDown(event.which)) {
            _gengi.navigateList(event.which);
          } else if (keys.which(event.which) === 'enter') {
            _gengi.showView.calc({
              currency: _gengi.vm.currencyList[_gengi.vm.app.highlightedCurrency],
            });
          }
          event.preventDefault();
          return false;
        } else if (router.state.view === 'calc') {
          if (!keylock && keys.isFunctionalKey(event.which)) {
            keylock = true;
          }
          if (!keylock && (keys.isNumPad(event.which) || keys.isUpDown(event.which))) {
            _gengi.numpad(keys.which(event.which));
            event.preventDefault();
            return false;
          }
        }
      });

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
      _gengi.vm = new Vue({
        el: 'gengi',
        data: {
          state: 'loading', // loading, expired, ready
          message: '',
          messages: {
            'expired-error': 'Þú ert að nota úrelt gengi og ekki tókst að uppfæra',
            'expired': 'Þú ert að nota úrelt gengi',
            'error': 'Ekki tókst að hlaða inn gjaldmiðlum',
            'loading': 'Hleð inn gjaldmiðlum',
          },
          app: {
            version: _gengi.version,
            title: 'Gengi.is...',
            view: 'list',
            amountISK: 0,
            amountCurr: 1,
            currentCurrency: '',
            activeField: 'amountCurr',
            highlightedCurrency: -1,
          },
          currencies: {
            expires: 0,
            currencyDate: 0,
            list: {},
          },
          currencyList: [
            'EUR',
            'USD',
            'GBP',
            'VND',
            'AMD',
            'GEL',
          ],
          search: {
            term: '',
            lastTerm: '',
            done: false,
            count: 0,
            results: {}
          },
        },
        methods: {
          showView: function(view, options) {
            if (_gengi.showView.hasOwnProperty(view)) {
              _gengi.showView[view](options);
            } else {
              _gengi.showView.catch(view);
            }
          },
          focusSearchInput: function() {
            document.getElementById('search').focus();
          },
          performSearch: function() {
            router.updateState({
              view: _gengi.vm.app.view,
              amountCurr: _gengi.vm.app.amountCurr,
              amountISK: _gengi.vm.app.amountISK,
              currentCurrency: _gengi.vm.app.currentCurrency,
              term: _gengi.vm.search.term,
            });
            utils.search(_gengi.vm);
          },
          toggleInList: function(currency) {
            if(_gengi.vm.currencyList.indexOf(currency.code) > -1) {
              _gengi.removeFromList(currency);
            } else {
              _gengi.addToList(currency);
            }
          },
          calculate: function(event) {
            var srcElement = event.srcElement.id;
            _gengi.calculate(srcElement);
          },
          which: function(event) {
            console.info(event.which, '=>', keys.which(event.which));
          },
          plusOne: function(event) {
            var target = event.target.id;
            var newVal = _gengi.vm.app[target];
            newVal = parseFloat(newVal);
            newVal = isNaN(newVal) ? 0 : newVal;
            newVal = newVal + 1;
            _gengi.vm.app[target] = newVal;
          },
          minusOne: function(event) {
            var target = event.target.id;
            var newVal = _gengi.vm.app[target];
            newVal = parseFloat(newVal);
            newVal = isNaN(newVal) ? 0 : newVal;
            newVal = newVal - 1;
            newVal = newVal < 0 ? 0 : newVal;
            _gengi.vm.app[target] = newVal;
          },
          activate: function(fieldName) {
            _gengi.activateCalcField(fieldName);
          },
          numPad: function(event) {
            var target = event.target;
            // target.classList.remove('click');
            // var durations = window.getComputedStyle(target, ':after').transitionDuration;
            // durations = durations.split(',');
            // durations.forEach(function(duration, index){
            //   durations[index] = parseFloat(duration);
            // });
            // var time = Math.max.apply(durations, durations) * 1000;
            // setTimeout(function() {
            //   target.classList.add('click');
            //   setTimeout(function() {
            //     target.classList.remove('click');
            //   }, time);
            // }, 1);
            if (!target.attributes.hasOwnProperty('key')) { return; }
            var key = target.attributes['key'].value;
            _gengi.numpad(key);
          },
        },
      });

      _gengi.initializeData();
      _gengi.initializeWatches();

      var query = router.parseQuery();
      if (query.view) {
        if (_gengi.showView.hasOwnProperty(query.view)) {
          _gengi.showView[query.view](query.options);
        } else {
          _gengi.showView.catch(query.view, query.options);
        }
      } else {
        console.warn('No view provided!');
      }

      _gengi.vm.app.highlightedCurrency = -1;
      router.replaceState({
        view: _gengi.vm.app.view,
        amountCurr: _gengi.vm.app.amountCurr,
        amountISK: _gengi.vm.app.amountISK,
        currentCurrency: _gengi.vm.app.currentCurrency,
        term: _gengi.vm.search.term,
      }, null, window.location.pathname);
    },

    navigateList: function(key) {
      key = keys.which(key);
      if (key === 'arrow-up') {
        if (!_gengi.vm.app.highlightedCurrency || _gengi.vm.app.highlightedCurrency < 1) {
          _gengi.vm.app.highlightedCurrency = 0;
        } else {
          _gengi.vm.app.highlightedCurrency = _gengi.vm.app.highlightedCurrency - 1;
        }
      } else if (key === 'arrow-down') {
        if (_gengi.vm.app.highlightedCurrency >= _gengi.vm.currencyList.length - 1) {
          _gengi.vm.app.highlightedCurrency = _gengi.vm.currencyList.length - 1;
        } else {
          _gengi.vm.app.highlightedCurrency = _gengi.vm.app.highlightedCurrency + 1;
        }
      }
    },

    numpad: function(key) {
      var newVal = _gengi.vm.app[_gengi.vm.app.activeField].toString();
      var numpadValue = utils.numpad(newVal, key);

      if (numpadValue === 'show-list') {
        _gengi.showView.catch('list');
      } else if (numpadValue === 'activate-curr') {
        _gengi.activateCalcField('curr');
      } else if (numpadValue === 'activate-isk') {
        _gengi.activateCalcField('isk');
      } else if (numpadValue) {
        _gengi.vm.app[_gengi.vm.app.activeField] = numpadValue;
        _gengi.calculate(_gengi.vm.app.activeField);
      }
    },

    calculate: function(srcElement) {
      if (srcElement === 'amountCurr') {
        _gengi.vm.app.amountISK = utils.calculate(
          _gengi.vm.currencies.list[_gengi.vm.app.currentCurrency].rate,
          _gengi.vm.app.amountCurr
          );
      } else if (srcElement === 'amountISK') {
        _gengi.vm.app.amountCurr = utils.calculate(
          1 / _gengi.vm.currencies.list[_gengi.vm.app.currentCurrency].rate,
          _gengi.vm.app.amountISK
          );
      }
      router.updateState({
        view: _gengi.vm.app.view,
        amountCurr: _gengi.vm.app.amountCurr,
        amountISK: _gengi.vm.app.amountISK,
        currentCurrency: _gengi.vm.app.currentCurrency,
        term: _gengi.vm.search.term,
      });
    },

    removeFromList: function(currency) {
      var currList = _gengi.vm.currencyList;
      var index = currList.indexOf(currency.code);
      if (index !== -1) {
        currList.splice(index, 1);
      }
      _gengi.vm.$set('currencyList', currList);
      utils.local.set('currencies', _gengi.vm.currencies);
    },
    addToList: function(currency) {
      var currList = _gengi.vm.currencyList;
      currList.unshift(currency.code);
      _gengi.vm.$set('currencyList', currList);

      var currencies = _gengi.vm.currencies;
      currencies.list[currency.code] = currency;
      _gengi.vm.$set('currencies', currencies);
      utils.local.set('currencies', _gengi.vm.currencies);
    },

    showView: {
      catch: function(view) {
        _gengi.vm.app.view = view;
      },

      search: function(options) {
        if (options && options.hasOwnProperty('term')) {
          _gengi.vm.search.term = options.term;
          utils.search(_gengi.vm);
        }
        _gengi.vm.app.view = 'search';
        // TODO: Find better way to ensure input exists before focus
        setTimeout(function() {
          document.getElementById('search').focus();
        },1);
      },

      calc: function(options) {
        if (!options) {
          console.warn('No options provided for calc view');
          return;
        }

        options.amount = !options.amount || options.amount <= 0 ? 1 : options.amount;
        _gengi.vm.app.currentCurrency = options.currency;
        _gengi.vm.app.view = 'calc';
        // Start with empty
        _gengi.vm.app.amountCurr = options.amount;
        _gengi.vm.app.amountISK = utils.calculate(_gengi.vm.currencies.list[options.currency].rate, options.amount);

        _gengi.activateCalcField('curr');

        // TODO: Find better way to ensure num exists before triggering swiftclick
        setTimeout(function() {
          swiftclick.replaceNodeNamesToTrack(['num']);
        },1);
      },
    },

    activateCalcField: function(fieldName) {
      _gengi.vm.app.activeField = fieldName !== 'curr' ? 'amountISK' : 'amountCurr';
      var field = document.querySelector('[field="amountCurr"]');
      var otherField = document.querySelector('[field="amountISK"]');
      if (fieldName !== 'curr') {
        field = document.querySelector('[field="amountISK"]');
        otherField = document.querySelector('[field="amountCurr"]');
      }
      if (field) {
        field.classList.add('active');
        otherField.classList.remove('active');
      }
    },

    initializeData: function() {
      // Must execute in this order
      _gengi.ensureLocalstoreVersion(_gengi.version);
      _gengi.initData('app');
      _gengi.initData('currencyList');
      _gengi.initCurrencies();
    },

    initializeWatches: function() {
      _gengi.vm.$watch('app', function() {
        utils.local.set('app', _gengi.vm.app);
      }, {deep: true});
      _gengi.vm.$watch('currencies', function() {
        utils.local.set('currencies', _gengi.vm.currencies);
      }, {deep: true});
      _gengi.vm.$watch('currencyList', function() {
        utils.local.set('currencyList', _gengi.vm.currencyList);
      });

      // "Router"
      _gengi.vm.$watch('app.view', function() {
        router.updateView({
          view: _gengi.vm.app.view,
          amountCurr: _gengi.vm.app.amountCurr,
          amountISK: _gengi.vm.app.amountISK,
          currentCurrency: _gengi.vm.app.currentCurrency,
          term: _gengi.vm.search.term,
        });
      });

      // TODO: fix issue #3
      // $(window).on('popstate', function() {
      //   var state = window.history.state;
      //   console.log('popstate', state);
      //   if (!state) { return; }
      //   _gengi.vm.$set('app', {
      //     version: _gengi.vm.app.version,
      //     title: _gengi.vm.app.title,
      //     view: state.view,
      //     amountISK: state.amountISK,
      //     amountCurr: state.amountCurr,
      //     currentCurrency: state.currentCurrency,
      //   });
      // });
    },

    initCurrencies: function() {
      var currencies = utils.local.get('currencies');
      if (currencies && currencies.expires >= new Date().getTime()) {
        _gengi.vm.$set('currencies', currencies);
        return;
      }

      _gengi.vm.$set('message', 'loading');
      promise.get(
        'http://api-v2.gengi.is/currencies/' + _gengi.vm.currencyList.join(',')
      ).then(function(error, response) {
        if (error) {
          if (currencies) {
            _gengi.vm.$set('message', 'expired-error');
            _gengi.vm.$set('currencies', currencies);
          } else {
            _gengi.vm.$set('message', 'error');
          }
          return;
        }
        var res = JSON.parse(response);
        if (_gengi.vm.currencyList.length === 0) {
          var newList = [];
          for (var currency in res.currencies) {
            newList.push(currency);
          }
          _gengi.vm.$set('currencyList', newList);
        }
        _gengi.vm.$set('message', '');
        _gengi.vm.$set('currencies', {
          list: res.currencies,
          expires: res.expires,
          currencyDate: res.currencyDate,
        });
      });
    },

    ensureLocalstoreVersion: function(version){
      var app = utils.local.get('app');
      if (app === false || !app || app.version !== version) {
        utils.local.clearAll();
      }
    },

    initData: function(dataName){
      var data = utils.local.get(dataName) || _gengi.vm[dataName];
      utils.local.set(dataName,data);
      _gengi.vm.$set(dataName, data);
    },

  };

  return _gengi;
});
