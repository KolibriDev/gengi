'use strict';
define(['domReady', 'zepto'], function(domReady, $){
  var onLoad = function(callback, reLoadCallback) {
    domReady(callback);
    reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
    $(document).on('re-loading', reLoadCallback);
  };
  return onLoad;
});
