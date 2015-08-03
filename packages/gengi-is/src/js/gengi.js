define(['vue', 'promise'], function(Vue, promise) {
  'use strict';
  var _gengi = {
    vm: false,
    init: function(){
      _gengi.vm = new Vue({
        el: 'gengi',
        data: {
          state: '', // loading, expired, ready
          expires:  _gengi.initData('expires'),
          app: _gengi.initData('app'),
          currencies: _gengi.initData('currencies'),
          currencyDate:  _gengi.initData('currencyDate'),
          currencyList:  _gengi.initData('currencyList'),
        },
      });
      _gengi.vm.$watch('app', function(){
        _gengi.storeDataLocally('app');
      });
      _gengi.vm.$watch('expires', function(){
        _gengi.storeDataLocally('expires');
      });
      _gengi.vm.$watch('currencies', function(){
        _gengi.storeDataLocally('currencies');
      });
      _gengi.vm.$watch('currencyDate', function(){
        _gengi.storeDataLocally('currencyDate');
      });
      _gengi.vm.$watch('currencyList', function(){
        _gengi.storeDataLocally('currencyList');
      });
      if (_gengi.vm.currencies.length < 1) {
        _gengi.getCurrencies();
      }
    },

    defaults: {
      app: {
        title: 'Gengi.is...',
      },
      expires: 0,
      currencies: [],
      currencyDate: 0,
      currencyList: [
        'eur',
        'usd',
        'gbp',
        'dkk',
        'sek',
        'nok',
        'pln',
      ],
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
        _gengi.vm.$set('currencies', res.currencies);
        _gengi.vm.$set('currencyDate', res.currencyDate);
      });
      return {};
    },

    initData: function(dataName){
      var data = _gengi.getLocalData(dataName) || _gengi.defaults[dataName] || {};
      _gengi.storeDataLocally(dataName,data);
      return data;
    },
    getLocalData: function(dataName){
      var data = window.localStorage.getItem(dataName);
      if (data) {
        try {
          data = JSON.parse(data);
          if (dataName === 'currencies' && _gengi.vm.expires < new Date().getTime()) { // 1 day
            throw 'too old!';
          }
          return data;
        } catch(exc) {
          _gengi.clearLocalData(dataName);
          return dataName === 'currencies' ? [] : false;
        }
      }
      return dataName === 'currencies' ? [] : false;
    },
    clearLocalData: function(dataName) {
      window.localStorage.removeItem(dataName);
    },
    storeDataLocally: function(dataName, data) {
      data = data || _gengi.vm.hasOwnProperty(dataName) && _gengi.vm[dataName];
      window.localStorage.setItem(dataName, JSON.stringify(data));
    },
  };

  return _gengi;
});
