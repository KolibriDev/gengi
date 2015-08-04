define(['vue', 'promise'], function(Vue, promise) {
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
            results: []
          },
        },
        methods: {
          showList: function(){
            _gengi.showList();
          },
          showCalc: function(currency){
            _gengi.showCalc(currency, 1);
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
              _gengi.vm.search.results = res.currencies;
            });
          },
          addToList: function(currency){
            _gengi.vm.currencyList.unshift(currency.code);
            _gengi.vm.currencies.list[currency.code] = currency;
            _gengi.storeDataLocally('currencies', _gengi.vm.currencies);
          },
        },
      });

      _gengi.initializeData();
      _gengi.initializeWatches();

      var values = _gengi.parseQuery();
      if (values.currName) {
        _gengi.showCalc(values.currName,values.amount);
      }
      _gengi.initState();
    },

    showList: function(){
      _gengi.vm.app.currentCurrency = '';
      _gengi.vm.app.view = 'list';
    },

    showCalc: function(currency, amount){
      amount = amount || 1;
      _gengi.vm.app.currentCurrency = currency;
      _gengi.vm.app.view = 'calc';
      _gengi.vm.app.amountCurr = amount;
      _gengi.vm.app.amountISK = _gengi.calculate(currency, 'ISK', amount);
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
        _gengi.updateState();
        this.app.amountCurr = _gengi.calculate('ISK', this.app.currentCurrency, this.app.amountISK);
      });
      _gengi.vm.$watch('app.amountCurr', function(){
        _gengi.updateState();
        this.app.amountISK = _gengi.calculate(this.app.currentCurrency, 'ISK', this.app.amountCurr);
      });

      // "Router"
      _gengi.vm.$watch('app.view', function(newVal){
        _gengi.updateView(newVal);
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

    updateView: function(view){
      var newPath = '/';
      if (view === 'calc') {
        var value = parseFloat(_gengi.vm.app.amountCurr || 1).toFixed(0);
        newPath = '/' + (_gengi.vm.app.currentCurrency ? _gengi.vm.app.currentCurrency + value : '');
      }
      var newState = {
        view: view,
        amountISK: _gengi.vm.app.amountISK,
        amountCurr: _gengi.vm.app.amountCurr,
        currentCurrency: _gengi.vm.app.currentCurrency,
      };
      window.history.pushState(newState, null, newPath);
    },

    initState: function(){
      var state = {
        view: _gengi.vm.app.view,
        amountISK: _gengi.vm.app.amountISK,
        amountCurr: _gengi.vm.app.amountCurr,
        currentCurrency: _gengi.vm.app.currentCurrency,
      };
      window.history.replaceState(state, null, window.location.pathname);
    },

    updateState: function(){
      var state = window.history.state;
      state.amountISK = _gengi.vm.app.amountISK;
      state.amountCurr = _gengi.vm.app.amountCurr;
      var value = parseFloat(_gengi.vm.app.amountCurr || 1).toFixed(0);
      var newPath = '/' + (_gengi.vm.app.currentCurrency ? _gengi.vm.app.currentCurrency + value : '');
      window.history.replaceState(state, null, newPath);
    },

    calculate: function(currencyFrom, currencyTo, amount){
      if (!currencyFrom || !currencyTo) { return;}
      var rate = 1;
      if (currencyFrom === 'ISK') {
        rate = 1 / _gengi.vm.currencies.list[currencyTo].rate;
      } else {
        rate = _gengi.vm.currencies.list[currencyFrom].rate;
      }
      var value = amount * rate;
      var fix = value < 1 ? 5 : 2;
      return parseFloat(value).toFixed(fix);
    },

    parseQuery: function(query) {
      query = query || window.location.pathname.substr(1).toUpperCase();
      var amount = 1,
          currName = query;

      if (/\d/.test(query)) {
        query.replace(/([0-9]+)/g, function(undefined, p1) {
          amount = p1;
        });
        query.replace(/(\D+)/g, function(undefined, p1) {
          currName = p1;
        });
      }

      return {
        amount: amount,
        currName: currName
      };
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
            list: res.currencies,
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
