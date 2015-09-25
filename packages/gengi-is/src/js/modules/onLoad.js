import domReady from 'domReady';

export default (callback, reLoadCallback) => {
  domReady(callback);
  reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
  $(document).on('ajax-loaded', reLoadCallback);
};
