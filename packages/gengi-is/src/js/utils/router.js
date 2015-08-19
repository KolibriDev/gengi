'use strict';
define(['utils/format'], (format) => {
  var Router = class {
    constructor() {
      this.title = null;
      this.state = {};
      this.path = window.location.pathname;
    }

    pushState() {
      window.history.pushState(this.state, this.title, this.path);
    }

    replaceState() {
      window.history.replaceState(this.state, this.title, this.path);
    }

    updateView(vm, view) {
      if (!vm || !view) { return; }
      this.path = '/';

      this.state['view'] = view;
      this.state['amountISK'] = format.number(vm.app.amountISK);
      this.state['amountCurr'] = format.number(vm.app.amountCurr);
      this.state['currentCurrency'] = vm.app.currentCurrency;

      if (view === 'calc') {
        this.path += (vm.app.currentCurrency ? vm.app.currentCurrency + this.state['amountCurr'] : '');
      } else if (view === 'search') {
        this.state['term'] = vm.search.term;
        this.path += 'search/' + this.state['term'];
      } else if (view !== 'list') {
        this.path += view;
      }

      this.pushState();
    }

    initState(vm) {
      this.path = window.location.pathname;
      this.state['view'] = vm.app.view;
      this.state['amountISK'] = vm.app.amountISK;
      this.state['amountCurr'] = vm.app.amountCurr;
      this.state['currentCurrency'] = vm.app.currentCurrency;

      this.replaceState();
    }

    updateState(vm) {
      this.path = '/';
      if (this.state['view'] === 'calc') {
        this.state['amountISK'] = format.number(vm.app.amountISK);
        this.state['amountCurr'] = format.number(vm.app.amountCurr);
        this.state['formattedAmountCurr'] = format.numberURL(vm.app.amountCurr);
        this.path += vm.app.currentCurrency ? vm.app.currentCurrency + this.state['formattedAmountCurr'] : '';
      } else if (this.state['view'] === 'search') {
        this.state['term'] = vm.search.term;
        this.path += 'search/' + this.state['term'];
      } else if (this.state['view'] !== 'list') {
        this.path += this.state['view'];
      }

      this.replaceState();
    }

    parseQuery(query) {
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
    }
  };

  return new Router();
});