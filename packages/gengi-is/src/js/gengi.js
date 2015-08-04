define(['vue', 'promise'], function(Vue, promise) {
  'use strict';
  var _gengi = {
    vm: false,
    init: function(){
      _gengi.vm = new Vue({
        el: 'gengi',
        data: {
          state: 'loading', // loading, expired, ready
          app: {
            title: 'Gengi.is...',
            view: 'list', // list, calc
            amountISK: 0,
            amountCurr: 1,
            currentCurrency: 'EUR',
          },
          expires: 0,
          currencies: {},
          currencyDate: 0,
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
      _gengi.vm.$set('expires', _gengi.initData('expires'));
      _gengi.vm.$set('app', _gengi.initData('app'));
      _gengi.vm.$set('currencyList',  _gengi.initData('currencyList'));
      _gengi.vm.$set('currencyDate',  _gengi.initData('currencyDate'));
      _gengi.vm.$set('currencies', _gengi.initData('currencies'));
      _gengi.vm.$watch('app', function(){
        _gengi.storeDataLocally('app', this.app);
      }, {deep: true});
      _gengi.vm.$watch('app.amountISK', function(){
        this.app.amountCurr = _gengi.calculate('ISK', this.app.currentCurrency, this.app.amountISK);
      });
      _gengi.vm.$watch('app.amountCurr', function(){
        this.app.amountISK = _gengi.calculate(this.app.currentCurrency, 'ISK', this.app.amountCurr);
      });
      _gengi.vm.$watch('expires', function(){
        _gengi.storeDataLocally('expires', this.expires);
      });
      _gengi.vm.$watch('currencies', function(){
        _gengi.storeDataLocally('currencies', this.currencies);
      });
      _gengi.vm.$watch('currencyDate', function(){
        _gengi.storeDataLocally('currencyDate', this.currencyDate);
      });
      _gengi.vm.$watch('currencyList', function(){
        _gengi.storeDataLocally('currencyList', this.currencyList);
      });
      if (Object.keys(_gengi.vm.currencies).length < 1) {
        _gengi.getCurrencies();
      }
    },

    calculate: function(currencyFrom, currencyTo, amount){
      var rate = 1;
      if (currencyFrom === 'ISK') {
        rate = 1 / _gengi.vm.currencies[currencyTo].rate;
      } else {
        rate = _gengi.vm.currencies[currencyFrom].rate;
      }
      return parseFloat(amount * rate).toFixed(2);
    },

    getCurrencies: function(){
      promise.get(
        'http://api-v2.gengi.is/currency/' + _gengi.vm.currencyList.join(',')
      ).then(function(error, response, xhr){
        if (error) {
          console.error('Error ' + xhr.status);
          return;
        }
        var res = JSON.parse(response);
        _gengi.vm.$set('expires', res.expires);
        _gengi.vm.$set('currencies', _gengi.transformCurrencies(res.currencies));
        _gengi.vm.$set('currencyDate', res.currencyDate);
      });
      return {};
    },

    transformCurrencies: function(currencies){
      var retval = {};
      $.each(currencies, function(index, currency){
        retval[currency.code] = currency;
      });
      return retval;
    },

    initData: function(dataName){
      var data = _gengi.getLocalData(dataName) || _gengi.vm[dataName];
      _gengi.storeDataLocally(dataName,data);
      return data;
    },
    getLocalData: function(dataName){
      var unParsedData = window.localStorage.getItem(dataName);
      if (!unParsedData || unParsedData === '{}' || unParsedData === '[]') {
        return false;
      }
      try {
        var data = JSON.parse(unParsedData);
        if (dataName === 'currencies' && _gengi.vm.expires < new Date().getTime()) {
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
