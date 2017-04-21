'use strict';
import $ from 'modules/jquery';
import domReady from 'vendor/domReady';

export default (callback, reLoadCallback) => {
  domReady(callback);
  reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
  $(document).on('loaded', reLoadCallback);
};
