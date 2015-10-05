'use strict';
import jquery from 'vendor/jquery'; // jshint ignore:line
import domReady from 'vendor/domReady';

export default (callback, reLoadCallback) => {
  domReady(callback);
  reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
  $(document).on('partial-loaded', reLoadCallback);
};
