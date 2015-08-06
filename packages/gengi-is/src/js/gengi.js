define(['vue', 'promise', 'utils/utils'], function(Vue, promise, utils) {
  'use strict';
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
            count: 0,
            results: {}
          },
        },
        methods: {
          showList: function(){
            _gengi.showList();
          },
          showCalc: function(currency){
            _gengi.showCalc(currency, 1);
          },
          showSearch: function(){
            _gengi.showSearch();
          },
          focusSearchInput: function(){
            document.getElementById('search').focus();
          },
          performSearch: function(){
            promise.get(
              'http://api-v2.gengi.is/currency/search/' + this.search.term
            ).then(function(error, response, xhr){
              if (error) {
                console.error('Error ' + xhr.status);
                return;
              }
              var res = JSON.parse(response);
              _gengi.vm.search.count = Object.keys(res.currencies).length;
              _gengi.vm.search.results = res.currencies;
            });
          },
          toggleInList: function(currency){
            if(_gengi.vm.currencyList.indexOf(currency.code) > -1) {
              _gengi.removeFromList(currency);
            } else {
              _gengi.addToList(currency);
            }
          },
        },
      });

      _gengi.initializeData();
      _gengi.initializeWatches();

      var values = utils.router.parseQuery();
      if (values.currName) {
        if (values.currName === 'SEARCH') {
          _gengi.showSearch();
        } else {
          _gengi.showCalc(values.currName,values.amount);
        }
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

    showSearch: function(){
      _gengi.vm.app.view = 'search';
      // TODO: Find better way to ensure input exists before focus
      setTimeout(function(){
        document.getElementById('search').focus();
      },1);
    },

    showList: function(){
      _gengi.vm.app.view = 'list';
    },

    showCalc: function(currency, amount){
      amount = amount || 1;
      _gengi.vm.app.currentCurrency = currency;
      _gengi.vm.app.view = 'calc';
      _gengi.vm.app.amountCurr = amount > 1 ? amount : '';
      _gengi.vm.app.amountISK = utils.calculate(_gengi.vm.currencies.list[currency].rate, amount);

      // TODO: Find better way to ensure input exists before focus
      setTimeout(function(){
        document.getElementById('amountCurr').focus();
      },1);
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

      // For calculation purposes
      // TODO: Run this on keyup instead of watching
      // _gengi.vm.$watch('app.amountISK', function(){
      //   utils.router.updateState(_gengi.vm);
      //   this.app.amountCurr = utils.calculate(1 / this.currencies.list[this.app.currentCurrency].rate, this.app.amountISK);
      // });
      _gengi.vm.$watch('app.amountCurr', function(){
        utils.router.updateState(_gengi.vm);
        this.app.amountISK = utils.calculate(this.currencies.list[this.app.currentCurrency].rate, this.app.amountCurr);
      });

      _gengi.vm.$watch('search.term', function(){
        utils.router.updateState(_gengi.vm);
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
