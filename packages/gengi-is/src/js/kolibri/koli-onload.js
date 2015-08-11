'use strict';
define(['domReady', 'zepto'], (domReady, $) => {
  return (callback, reLoadCallback) => {
    domReady(callback);
    reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
    $(document).on('re-loading', reLoadCallback);
  };
});
