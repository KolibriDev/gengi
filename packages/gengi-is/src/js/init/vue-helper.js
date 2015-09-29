'use strict';
import keys from 'modules/keys';
import router from 'modules/router';
import search from 'modules/search';
import calculate from 'modules/calculator';
import storage from 'modules/storage';
import numpad from 'modules/numpad';
import swiftclick from 'init/swiftclick';

let help = {
  filters: function() {
  },
  methods: {
    showView: function(view, options) {
      if (help.views.hasOwnProperty(view)) {
        help.views[view](this, options);
      } else {
        this.app.view = view;
      }
    },
    toggleInList: function(currency) {
      if(this.currencyList.indexOf(currency.code) > -1) {
        help.removeFromList(this, currency);
      } else {
        help.addToList(this, currency);
      }
    },
    focusSearchInput: function() {
      document.getElementById('search').focus();
    },
    performSearch: function() {
      router.updateState({
        view: this.app.view,
        amountCurr: this.app.amountCurr,
        amountISK: this.app.amountISK,
        currentCurrency: this.app.currentCurrency,
        term: this.search.term,
      });
      search(this);
    },

    calculate: function(event) {
      let srcElement = event.srcElement.id;
      help.calculate(srcElement);
    },
    which: function(event) {
      console.info(event.which, '=>', keys.which(event.which));
    },
    plusOne: function(event) {
      let target = event.target.id;
      let newVal = this.app[target];
      newVal = parseFloat(newVal);
      newVal = isNaN(newVal) ? 0 : newVal;
      newVal = newVal + 1;
      this.app[target] = newVal;
    },
    minusOne: function(event) {
      let target = event.target.id;
      let newVal = this.app[target];
      newVal = parseFloat(newVal);
      newVal = isNaN(newVal) ? 0 : newVal;
      newVal = newVal - 1;
      newVal = newVal < 0 ? 0 : newVal;
      this.app[target] = newVal;
    },
    activate: function(fieldName) {
      help.activateCalcField(fieldName);
    },
    numPad: function(event) {
      let target = event.target;
      if (!target.attributes.hasOwnProperty('key')) { return; }
      let key = target.attributes['key'].value;
      help.numpad(key);
    },
  },
  options: {
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
        title: 'Gengi.is...',
        view: 'list',
        amountISK: 0,
        amountCurr: 1,
        currentCurrency: '',
        activeField: 'amountCurr',
        highlightedCurrency: -1,
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
        'AMD',
        'GEL',
      ],
      search: {
        term: '',
        lastTerm: '',
        done: false,
        count: 0,
        results: {}
      },
    },
  },
  views: {
    search: function(vm, options) {
      if (options && options.hasOwnProperty('term')) {
        vm.search.term = options.term;
        search(vm);
      }
      vm.app.view = 'search';
      // TODO: Find better way to ensure input exists before focus
      setTimeout(function() {
        document.getElementById('search').focus();
      },1);
    },
    calc: function(vm, options) {
      if (!options) {
        console.warn('No options provided for calc view');
        return;
      }

      options.amount = !options.amount || options.amount <= 0 ? 1 : options.amount;
      vm.app.currentCurrency = options.currency;
      vm.app.view = 'calc';
      // Start with empty
      vm.app.amountCurr = options.amount;
      vm.app.amountISK = calculate(vm.currencies.list[options.currency].rate, options.amount);

      help.activateCalcField(vm, 'curr');

      // TODO: Find better way to ensure num exists before triggering swiftclick
      setTimeout(function() {
        swiftclick.replaceNodeNamesToTrack(['num']);
      },1);
    },
  },
  activateCalcField: function(vm, fieldName) {
    vm.app.activeField = fieldName !== 'curr' ? 'amountISK' : 'amountCurr';
    let field = document.querySelector('[field="amountCurr"]');
    let otherField = document.querySelector('[field="amountISK"]');
    if (fieldName !== 'curr') {
      field = document.querySelector('[field="amountISK"]');
      otherField = document.querySelector('[field="amountCurr"]');
    }
    if (field) {
      field.classList.add('active');
      otherField.classList.remove('active');
    }
  },
  removeFromList: function(vm, currency) {
    let currList = vm.currencyList;
    let index = currList.indexOf(currency.code);
    if (index !== -1) {
      currList.splice(index, 1);
    }
    vm.$set('currencyList', currList);
    storage.set('currencies', vm.currencies);
  },
  addToList: function(vm, currency) {
    let currList = vm.currencyList;
    currList.unshift(currency.code);
    vm.$set('currencyList', currList);

    let currencies = vm.currencies;
    currencies.list[currency.code] = currency;
    vm.$set('currencies', currencies);
    storage.set('currencies', vm.currencies);
  },
  numpad: function(vm, key) {
    let newVal, numpadValue;
    newVal = vm.app[vm.app.activeField].toString();
    numpadValue = numpad(newVal, key);

    return numpadValue;
  },
  calculate: function(vm, srcElement) {
    if (srcElement === 'amountCurr') {
      vm.app.amountISK = calculate(
        vm.currencies.list[vm.app.currentCurrency].rate,
        vm.app.amountCurr
        );
    } else if (srcElement === 'amountISK') {
      vm.app.amountCurr = calculate(
        1 / vm.currencies.list[vm.app.currentCurrency].rate,
        vm.app.amountISK
        );
    }
    router.updateState({
      view: vm.app.view,
      amountCurr: vm.app.amountCurr,
      amountISK: vm.app.amountISK,
      currentCurrency: vm.app.currentCurrency,
      term: vm.search.term,
    });
  },
};

return help;
