'use strict';
define(['domReady', 'events'], (domReady, events) => {
  return (callback, reLoadCallback) => {
    domReady(callback);
    reLoadCallback = typeof reLoadCallback === 'function' ? reLoadCallback : callback;
    events.on('re-loading', reLoadCallback);
  };
});
