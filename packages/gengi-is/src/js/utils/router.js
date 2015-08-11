'use strict';
define(['utils/format'], (format) => {
  var _router = {
    updateView: (vm, view) => {
      var newPath = '/';
      var state = {
        view: view,
        amountISK: vm.app.amountISK,
        amountCurr: vm.app.amountCurr,
        currentCurrency: vm.app.currentCurrency,
      };
      if (view === 'calc') {
        var value = format.number(vm.app.amountCurr);
        newPath += (vm.app.currentCurrency ? vm.app.currentCurrency + value : '');
      } else if (view === 'search') {
        state.term = vm.search.term;
        newPath += 'search/' + state.term;
      } else if (view !== 'list') {
        newPath += view;
      }
      window.history.pushState(state, null, newPath);
    },

    initState: (vm) => {
      var state = {
        view: vm.app.view,
        amountISK: vm.app.amountISK,
        amountCurr: vm.app.amountCurr,
        currentCurrency: vm.app.currentCurrency,
      };
      window.history.replaceState(state, null, window.location.pathname);
    },

    updateState: (vm) => {
      var state = window.history.state;
      var newPath = '/';
      if (state.view === 'calc') {
        state.amountISK = vm.app.amountISK;
        state.amountCurr = format.number(vm.app.amountCurr);
        newPath += vm.app.currentCurrency ? vm.app.currentCurrency + state.amountCurr : '';
      } else if (state.view === 'search') {
        state.term = vm.search.term;
        newPath += 'search/' + state.term;
      } else if (state.view !== 'list') {
        newPath += state.view;
      }
      window.history.replaceState(state, null, newPath);
    },

    parseQuery: (query) => {
      query = query || window.location.pathname.substr(1).toLowerCase();
      var retobj = {
        view: 'list',
        options: {},
      };

      if (query.substring(0,5) === 'about') {
        retobj.view = 'about';
      }
      if (query.substring(0,6) === 'search') {
        retobj.view = 'search';
        retobj.options.term = decodeURIComponent(query.split('/').pop());
        return retobj;
      }

      if (query.length >= 3) {
        retobj.view = 'calc';
        retobj.options.currency = format.code(query.substring(0,3));
        retobj.options.amount = '';

        if (query.length > 3) {
          retobj.options.amount = format.number(query.substring(3));
        }
      }

      return retobj;
    },
  };

  return _router;
});