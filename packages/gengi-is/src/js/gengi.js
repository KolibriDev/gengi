'use strict';
define(['vue', 'promise', 'utils/utils'], function(Vue, promise, utils) {
  var _gengi = {
    version: '0.0.3',
    vm: false,
    init: function(){
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
          showView: function(view, options){
            if (_gengi.showView.hasOwnProperty(view)) {
              _gengi.showView[view](options);
            } else {
              _gengi.showView.catch(view);
            }
          },
          focusSearchInput: function(){
            document.getElementById('search').focus();
          },
          performSearch: function(){
            utils.router.updateState(_gengi.vm);
            utils.search(_gengi.vm);
          },
          toggleInList: function(currency){
            if(_gengi.vm.currencyList.indexOf(currency.code) > -1) {
              _gengi.removeFromList(currency);
            } else {
              _gengi.addToList(currency);
            }
          },
          calculate: function(event){
            if (event.srcElement.id === 'amountCurr') {
              this.app.amountISK = utils.calculate(this.currencies.list[this.app.currentCurrency].rate, this.app.amountCurr);
            } else if (event.srcElement.id === 'amountISK') {
              this.app.amountCurr = utils.calculate(1 / this.currencies.list[this.app.currentCurrency].rate, this.app.amountISK);
            }
            utils.router.updateState(_gengi.vm);
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

    removeFromList: function(currency){
      var currList = _gengi.vm.currencyList;
      var index = currList.indexOf(currency.code);
      if (index !== -1) {
        currList.splice(index, 1);
      }
      _gengi.vm.$set('currencyList', currList);
      utils.local.setJSON('currencies', _gengi.vm.currencies);
    },
    addToList: function(currency){
      var currList = _gengi.vm.currencyList;
      currList.unshift(currency.code);
      _gengi.vm.$set('currencyList', currList);

      var currencies = _gengi.vm.currencies;
      currencies.list[currency.code] = currency;
      _gengi.vm.$set('currencies', currencies);
      utils.local.setJSON('currencies', _gengi.vm.currencies);
    },

    showView: {
      catch: function(view){
        _gengi.vm.app.view = view;
      },

      search: function(options){
        if (options && options.hasOwnProperty('term')) {
          _gengi.vm.search.term = options.term;
          utils.search(_gengi.vm);
        }
        _gengi.vm.app.view = 'search';
        // TODO: Find better way to ensure input exists before focus
        setTimeout(function(){
          document.getElementById('search').focus();
        },1);
      },

      calc: function(options){
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

        // TODO: Find better way to ensure input exists before focus
        setTimeout(function(){
          document.getElementById('amountCurr').focus();
        },1);
      },
    },

    initializeData: function(){
      // Must execute in this order
      _gengi.ensureLocalstoreVersion(_gengi.version);
      _gengi.initData('app');
      _gengi.initData('currencyList');
      _gengi.initCurrencies();
    },

    initializeWatches: function(){
      _gengi.vm.$watch('app', function(){
        utils.local.setJSON('app', this.app);
      }, {deep: true});
      _gengi.vm.$watch('currencies', function(){
        utils.local.setJSON('currencies', this.currencies);
      }, {deep: true});
      _gengi.vm.$watch('currencyList', function(){
        utils.local.setJSON('currencyList', this.currencyList);
      });

      // "Router"
      _gengi.vm.$watch('app.view', function(newVal){
        utils.router.updateView(_gengi.vm, newVal);
      });

      // TODO: fix issue #3
      // $(window).on('popstate', function(){
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

    initCurrencies: function(){
      var currencies = utils.local.getJSON('currencies');
      if (currencies && currencies.expires >= new Date().getTime()) {
        _gengi.vm.$set('currencies', currencies);
        return;
      }

      _gengi.vm.$set('message', 'loading');
      promise.get(
        'http://api-v2.gengi.is/currency/' + _gengi.vm.currencyList.join(',')
      ).then(function(error, response){
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
          $.each(res.currencies, function(currency){
            newList.push(currency);
          });
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
      var app = utils.local.getJSON('app');
      if (app === false || !app || app.version !== version) {
        utils.local.clearAll();
      }
    },

    initData: function(dataName){
      var data = utils.local.getJSON(dataName) || _gengi.vm[dataName];
      utils.local.setJSON(dataName,data);
      _gengi.vm.$set(dataName, data);
    },

  };

  return _gengi;
});
