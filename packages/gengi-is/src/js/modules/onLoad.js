import domReady from 'domReady';
import $ from 'jquery';

export default (callback, reLoadCallback) => {
  domReady(callback);
  reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
  $(document).on('ajax-loaded', reLoadCallback);
};
