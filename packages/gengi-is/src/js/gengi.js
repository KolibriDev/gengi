define(['vue', 'promise', 'zepto'], function(Vue, promise, $) {
  'use strict';
  var _gengi = {
    version: '0.0.3',
    vm: false,
    init: function(){
      _gengi.vm = new Vue({
        el: 'gengi',
        data: {
          state: 'loading', // loading, expired, ready
          app: {
            version: _gengi.version,
            title: 'Gengi.is...',
            view: 'list', // list, calc, about
            amountISK: 0,
            amountCurr: 1,
            currentCurrency: 'EUR',
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
            'DKK',
            'SEK',
            'NOK',
            'PLN',
          ],
        },
        methods: {
          showList: function(){
            this.app.view = 'list';
          },
          showCalc: function(currency){
            this.app.currentCurrency = currency;
            this.app.view = 'calc';
            this.app.amountISK = _gengi.calculate(currency, 'ISK', 1);
          },
        },
      });

      _gengi.initializeData();
      _gengi.initializeWatches();
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
        _gengi.storeDataLocally('app', this.app);
      }, {deep: true});
      _gengi.vm.$watch('currencies', function(){
        _gengi.storeDataLocally('currencies', this.currencies);
      }, {deep: true});
      _gengi.vm.$watch('currencyList', function(){
        _gengi.storeDataLocally('currencyList', this.currencyList);
      });

      // For calculation purposes
      _gengi.vm.$watch('app.amountISK', function(){
        this.app.amountCurr = _gengi.calculate('ISK', this.app.currentCurrency, this.app.amountISK);
      });
      _gengi.vm.$watch('app.amountCurr', function(){
        this.app.amountISK = _gengi.calculate(this.app.currentCurrency, 'ISK', this.app.amountCurr);
      });
    },

    calculate: function(currencyFrom, currencyTo, amount){
      var rate = 1;
      if (currencyFrom === 'ISK') {
        rate = 1 / _gengi.vm.currencies.list[currencyTo].rate;
      } else {
        rate = _gengi.vm.currencies.list[currencyFrom].rate;
      }
      return parseFloat(amount * rate).toFixed(2);
    },

    transformCurrencies: function(currencies){
      var retval = {};
      $.each(currencies, function(index, currency){
        retval[currency.code] = currency;
      });
      return retval;
    },

    initCurrencies: function(){
      var data = _gengi.getLocalData('currencies');
      if (!data) {
        promise.get(
          'http://api-v2.gengi.is/currency/' + _gengi.vm.currencyList.join(',')
        ).then(function(error, response, xhr){
          if (error) {
            console.error('Error ' + xhr.status);
            return;
          }
          var res = JSON.parse(response);
          _gengi.vm.$set('currencies', {
            list: _gengi.transformCurrencies(res.currencies),
            expires: res.expires,
            currencyDate: res.currencyDate,
          });
        });
      } else {
        _gengi.vm.$set('currencies', data);
      }
    },

    ensureLocalstoreVersion: function(version){
      var unParsedApp = window.localStorage.getItem('app');
      if (unParsedApp) {
        try {
          var app = JSON.parse(unParsedApp);
          if(app.version !== version) {
            window.localStorage.clear();
          }
        } catch(exc) {
          window.localStorage.clear();
        }
      } else {
        window.localStorage.clear();
      }
    },

    initData: function(dataName){
      var data = _gengi.getLocalData(dataName) || _gengi.vm[dataName];
      _gengi.storeDataLocally(dataName,data);
      _gengi.vm.$set(dataName, data);
    },

    getLocalData: function(dataName){
      var unParsedData = window.localStorage.getItem(dataName);
      if (!unParsedData || unParsedData === '{}' || unParsedData === '[]') {
        return false;
      }
      try {
        var data = JSON.parse(unParsedData);
        if (dataName === 'currencies' && data.expires < new Date().getTime()) {
          throw 'Currencies expired!';
        }
        return data;
      } catch(exc) {
        console.warn(exc);
      }
    },

    clearLocalData: function(dataName) {
      window.localStorage.removeItem(dataName);
    },

    storeDataLocally: function(dataName, data) {
      if (data === undefined) {
        return console.warn('No data provided for "%s"\n', dataName, data);
      }
      window.localStorage.setItem(dataName, JSON.stringify(data));
    },
  };

  return _gengi;
});
