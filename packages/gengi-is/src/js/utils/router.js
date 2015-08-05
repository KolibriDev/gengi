define(['utils/format'], function(format) {
  'use strict';
  var _router = {
    updateView: function(vm, view){
      var newPath = '/';
      if (view === 'calc') {
        var value = format.number(vm.app.amountCurr, 0);
        newPath = '/' + (vm.app.currentCurrency ? vm.app.currentCurrency + value : '');
      }
      var newState = {
        view: view,
        amountISK: vm.app.amountISK,
        amountCurr: vm.app.amountCurr,
        currentCurrency: vm.app.currentCurrency,
      };
      window.history.pushState(newState, null, newPath);
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
      state.amountISK = vm.app.amountISK;
      state.amountCurr = format.number(vm.app.amountCurr, 0);
      var newPath = '/' + (vm.app.currentCurrency ? vm.app.currentCurrency + state.amountCurr : '');
      window.history.replaceState(state, null, newPath);
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
        currName: format.code(currName)
      };
    },
  };

  return _router;
});