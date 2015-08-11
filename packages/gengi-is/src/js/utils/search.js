'use strict';
define(['promise'], (promise) => {
  var timeout = 0;
  var _search = (vm) => {
    vm.search.done = false;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!vm.search.term) {
        vm.$set('search',{
          term: vm.search.term,
          done: true,
          lastTerm: vm.search.lastTerm,
          count: 0,
          results: {},
        });
        return;
      }
      if (vm.search.term === vm.search.lastTerm) {
        vm.search.done = true;
        return;
      }
      promise.get(
        'http://api-v2.gengi.is/currency/search/' + vm.search.term
      ).then((error, response, xhr) => {
        if (error) {
          console.error('Error ' + xhr.status);
          return;
        }
        var res = JSON.parse(response);
        vm.$set('search',{
          term: vm.search.term,
          done: true,
          lastTerm: vm.search.term,
          count: Object.keys(res.currencies).length,
          results: res.currencies,
        });
      });
    },100);
  };

  return _search;
});