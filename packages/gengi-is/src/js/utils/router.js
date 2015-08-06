define(['utils/format'], function(format) {
  'use strict';
  var _router = {
    updateView: function(vm, view){
      var newPath = '/';
      var state = {
        view: view,
        amountISK: vm.app.amountISK,
        amountCurr: vm.app.amountCurr,
        currentCurrency: vm.app.currentCurrency,
      };
      if (view === 'calc') {
        var value = format.number(vm.app.amountCurr, 0);
        newPath += (vm.app.currentCurrency ? vm.app.currentCurrency + value : '');
      } else if (view === 'search') {
        state.term = vm.search.term;
        newPath += 'search/' + state.term;
      } else if (view !== 'list') {
        newPath += view;
      }
      window.history.pushState(state, null, newPath);
    },

    initState: function(vm){
      var state = {
        view: vm.app.view,
        amountISK: vm.app.amountISK,
        amountCurr: vm.app.amountCurr,
        currentCurrency: vm.app.currentCurrency,
      };
      window.history.replaceState(state, null, window.location.pathname);
    },

    updateState: function(vm){
      var state = window.history.state;
      var newPath = '/';
      if (state.view === 'calc') {
        state.amountISK = vm.app.amountISK;
        state.amountCurr = format.number(vm.app.amountCurr, 0);
        newPath += vm.app.currentCurrency ? vm.app.currentCurrency + state.amountCurr : '';
      } else if (state.view === 'search') {
        state.term = vm.search.term;
        newPath += 'search/' + state.term;
      } else if (state.view !== 'list') {
        newPath += state.view;
      }
      window.history.replaceState(state, null, newPath);
    },

    parseQuery: function(query) {
      query = query || window.location.pathname.substr(1).toLowerCase();
      var retobj = {
        amount: 1,
        view: 'list',
        currency: '',
        term: '',
      };

      if (query.substring(0,5) === 'about') {
        retobj.view = 'about';
      }
      if (query.substring(0,6) === 'search') {
        retobj.view = 'search';
        retobj.term = decodeURIComponent(query.split('/').pop());
        return retobj;
      }
      if (/\d/.test(query)) {
        query.replace(/([0-9]+)/g, function(undefined, p1) {
          retobj.amount = p1;
        });
        query.replace(/(\D+)/g, function(undefined, p1) {
          retobj.currency = p1.toUpperCase();
        });
      }

      return retobj;
    },
  };

  return _router;
});