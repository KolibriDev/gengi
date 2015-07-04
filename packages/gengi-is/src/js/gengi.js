define(['vue'], function(Vue) {
  'use strict';
  var _gengi = {
    vm: false,
    init: function(){
      _gengi.vm = new Vue({
        el: 'gengi',
        data: {
          title: 'Gengi.is',
        },
      });
    },
  };

  return _gengi;
});
