'use strict';
define(['domReady', 'zepto'], (domReady, $) => {
  return (callback, reLoadCallback) => {
    domReady(callback);
    reLoadCallback = typeof reLoadCallback === 'function' ? reLoadCallback : callback;
    $(document).on('re-loading', reLoadCallback);
  };
});
