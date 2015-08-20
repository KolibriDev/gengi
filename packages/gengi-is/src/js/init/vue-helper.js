'use strict';
define(['keys', 'router', 'utils/utils', 'init/swiftclick'], (keys, router, utils, swiftclick) => {
  var help = {
    filters: () => {
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
        utils.search(this);
      },

      calculate: function(event) {
        var srcElement = event.srcElement.id;
        help.calculate(srcElement);
      },
      which: function(event) {
        console.info(event.which, '=>', keys.which(event.which));
      },
      plusOne: function(event) {
        var target = event.target.id;
        var newVal = this.app[target];
        newVal = parseFloat(newVal);
        newVal = isNaN(newVal) ? 0 : newVal;
        newVal = newVal + 1;
        this.app[target] = newVal;
      },
      minusOne: function(event) {
        var target = event.target.id;
        var newVal = this.app[target];
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
        var target = event.target;
        if (!target.attributes.hasOwnProperty('key')) { return; }
        var key = target.attributes['key'].value;
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
      search: (vm, options) => {
        if (options && options.hasOwnProperty('term')) {
          vm.search.term = options.term;
          utils.search(vm);
        }
        vm.app.view = 'search';
        // TODO: Find better way to ensure input exists before focus
        setTimeout(() => {
          document.getElementById('search').focus();
        },1);
      },
      calc: (vm, options) => {
        if (!options) {
          console.warn('No options provided for calc view');
          return;
        }

        options.amount = !options.amount || options.amount <= 0 ? 1 : options.amount;
        vm.app.currentCurrency = options.currency;
        vm.app.view = 'calc';
        // Start with empty
        vm.app.amountCurr = options.amount;
        vm.app.amountISK = utils.calculate(vm.currencies.list[options.currency].rate, options.amount);

        help.activateCalcField(vm, 'curr');

        // TODO: Find better way to ensure num exists before triggering swiftclick
        setTimeout(() => {
          swiftclick.replaceNodeNamesToTrack(['num']);
        },1);
      },
    },
    activateCalcField: (vm, fieldName) => {
      vm.app.activeField = fieldName !== 'curr' ? 'amountISK' : 'amountCurr';
      var field = document.querySelector('[field="amountCurr"]');
      var otherField = document.querySelector('[field="amountISK"]');
      if (fieldName !== 'curr') {
        field = document.querySelector('[field="amountISK"]');
        otherField = document.querySelector('[field="amountCurr"]');
      }
      if (field) {
        field.classList.add('active');
        otherField.classList.remove('active');
      }
    },
    removeFromList: (vm, currency) => {
      var currList = vm.currencyList;
      var index = currList.indexOf(currency.code);
      if (index !== -1) {
        currList.splice(index, 1);
      }
      vm.$set('currencyList', currList);
      utils.local.setJSON('currencies', vm.currencies);
    },
    addToList: (vm, currency) => {
      var currList = vm.currencyList;
      currList.unshift(currency.code);
      vm.$set('currencyList', currList);

      var currencies = vm.currencies;
      currencies.list[currency.code] = currency;
      vm.$set('currencies', currencies);
      utils.local.setJSON('currencies', vm.currencies);
    },
    numpad: (vm, key) => {
      var newVal, numpadValue;
      newVal = vm.app[vm.app.activeField].toString();
      numpadValue = utils.numpad(newVal, key);
      /* jshint ignore:start */
      // Ignore until finished (causing jshint errors)
      if (numpadValue === 'show-list') {
        _gengi.showView.catch('list');
      } else if (numpadValue === 'activate-curr') {
        _gengi.activateCalcField('curr');
      } else if (numpadValue === 'activate-isk') {
        _gengi.activateCalcField('isk');
      } else if (numpadValue) {
        vm.app[vm.app.activeField] = numpadValue;
        _gengi.calculate(vm.app.activeField);
      }
      /* jshint ignore:end */
    },
    calculate: (vm, srcElement) => {
      if (srcElement === 'amountCurr') {
        vm.app.amountISK = utils.calculate(
          vm.currencies.list[vm.app.currentCurrency].rate,
          vm.app.amountCurr
          );
      } else if (srcElement === 'amountISK') {
        vm.app.amountCurr = utils.calculate(
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
});