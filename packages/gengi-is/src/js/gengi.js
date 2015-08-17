'use strict';
define(['vue', 'promise', 'keys', 'utils/utils', 'init/swiftclick'], (Vue, promise, keys, utils, swiftclick) => {
  var _gengi = {
    version: '0.0.6',
    vm: false,
    init: () => {

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
          showView: (view, options) => {
            if (_gengi.showView.hasOwnProperty(view)) {
              _gengi.showView[view](options);
            } else {
              _gengi.showView.catch(view);
            }
          },
          focusSearchInput: () => {
            document.getElementById('search').focus();
          },
          performSearch: () => {
            utils.router.updateState(_gengi.vm);
            utils.search(_gengi.vm);
          },
          toggleInList: (currency) => {
            if(_gengi.vm.currencyList.indexOf(currency.code) > -1) {
              _gengi.removeFromList(currency);
            } else {
              _gengi.addToList(currency);
            }
          },
          calculate: (event) => {
            var srcElement = event.srcElement.id;
            _gengi.calculate(srcElement);
          },
          which: (event) => {
            console.info(event.which, '=>', keys.which(event.which));
          },
          plusOne: (event) => {
            var target = event.target.id;
            var newVal = _gengi.vm.app[target];
            newVal = parseFloat(newVal);
            newVal = isNaN(newVal) ? 0 : newVal;
            newVal = newVal + 1;
            _gengi.vm.app[target] = newVal;
          },
          minusOne: (event) => {
            var target = event.target.id;
            var newVal = _gengi.vm.app[target];
            newVal = parseFloat(newVal);
            newVal = isNaN(newVal) ? 0 : newVal;
            newVal = newVal - 1;
            newVal = newVal < 0 ? 0 : newVal;
            _gengi.vm.app[target] = newVal;
          },
          numPad: (event) => {
            var target = event.target;
            target.classList.remove('click');
            var durations = window.getComputedStyle(target, ':after').transitionDuration;
            durations = durations.split(',');
            durations.forEach(function(duration, index){
              durations[index] = parseFloat(duration);
            });
            var time = Math.max.apply(durations, durations) * 1000;
            setTimeout(() => {
              target.classList.add('click');
              setTimeout(() => {
                target.classList.remove('click');
              }, time);
            }, 1);
            if (!target.attributes.hasOwnProperty('key')) { return; }
            var newVal = _gengi.vm.app.amountCurr.toString();
            var key = target.attributes['key'].value;
            if (!key) { return; }
            if (newVal === '0') {
              newVal = '';
            }
            if (key === ',') {
              newVal = newVal.length >= 1 ? newVal + key : '0' + key;
            } else if (key === 'del') {
              newVal = newVal.slice(0, -1);
            } else {
              newVal += key;
            }
            _gengi.vm.app.amountCurr = newVal;
            _gengi.calculate('amountCurr');
          },
        },
      });

      _gengi.initializeData();
      _gengi.initializeWatches();

      var query = utils.router.parseQuery();
      if (query.view) {
        if (_gengi.showView.hasOwnProperty(query.view)) {
          _gengi.showView[query.view](query.options);
        } else {
          _gengi.showView.catch(query.view, query.options);
        }
      } else {
        console.warn('No view provided!');
      }

      utils.router.initState(_gengi.vm);
    },

    calculate: (srcElement) => {
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
      utils.router.updateState(_gengi.vm);
    },

    removeFromList: (currency) => {
      var currList = _gengi.vm.currencyList;
      var index = currList.indexOf(currency.code);
      if (index !== -1) {
        currList.splice(index, 1);
      }
      _gengi.vm.$set('currencyList', currList);
      utils.local.setJSON('currencies', _gengi.vm.currencies);
    },
    addToList: (currency) => {
      var currList = _gengi.vm.currencyList;
      currList.unshift(currency.code);
      _gengi.vm.$set('currencyList', currList);

      var currencies = _gengi.vm.currencies;
      currencies.list[currency.code] = currency;
      _gengi.vm.$set('currencies', currencies);
      utils.local.setJSON('currencies', _gengi.vm.currencies);
    },

    showView: {
      catch: (view) => {
        _gengi.vm.app.view = view;
      },

      search: (options) => {
        if (options && options.hasOwnProperty('term')) {
          _gengi.vm.search.term = options.term;
          utils.search(_gengi.vm);
        }
        _gengi.vm.app.view = 'search';
        // TODO: Find better way to ensure input exists before focus
        setTimeout(() => {
          document.getElementById('search').focus();
        },1);
      },

      calc: (options) => {
        if (!options) {
          console.warn('No options provided for calc view');
          return;
        }

        options.amount = !options.amount || options.amount <= 0 ? '' : options.amount;
        _gengi.vm.app.currentCurrency = options.currency;
        _gengi.vm.app.view = 'calc';
        // Start with empty
        _gengi.vm.app.amountCurr = options.amount;
        _gengi.vm.app.amountISK = utils.calculate(_gengi.vm.currencies.list[options.currency].rate, options.amount);

        // TODO: Find better way to ensure num exists before triggering swiftclick
        setTimeout(() => {
          swiftclick.replaceNodeNamesToTrack(['num']);
        },1);
      },
    },

    initializeData: () => {
      // Must execute in this order
      _gengi.ensureLocalstoreVersion(_gengi.version);
      _gengi.initData('app');
      _gengi.initData('currencyList');
      _gengi.initCurrencies();
    },

    initializeWatches: () => {
      _gengi.vm.$watch('app', () => {
        utils.local.setJSON('app', _gengi.vm.app);
      }, {deep: true});
      _gengi.vm.$watch('currencies', () => {
        utils.local.setJSON('currencies', _gengi.vm.currencies);
      }, {deep: true});
      _gengi.vm.$watch('currencyList', () => {
        utils.local.setJSON('currencyList', _gengi.vm.currencyList);
      });

      // "Router"
      _gengi.vm.$watch('app.view', (newVal) => {
        utils.router.updateView(_gengi.vm, newVal);
      });

      // TODO: fix issue #3
      // $(window).on('popstate', () => {
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

    initCurrencies: () => {
      var currencies = utils.local.getJSON('currencies');
      if (currencies && currencies.expires >= new Date().getTime()) {
        _gengi.vm.$set('currencies', currencies);
        return;
      }

      _gengi.vm.$set('message', 'loading');
      promise.get(
        'http://api-v2.gengi.is/currencies/' + _gengi.vm.currencyList.join(',')
      ).then((error, response) => {
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

    ensureLocalstoreVersion: (version) => {
      var app = utils.local.getJSON('app');
      if (app === false || !app || app.version !== version) {
        utils.local.clearAll();
      }
    },

    initData: (dataName) => {
      var data = utils.local.getJSON(dataName) || _gengi.vm[dataName];
      utils.local.setJSON(dataName,data);
      _gengi.vm.$set(dataName, data);
    },

  };

  return _gengi;
});
