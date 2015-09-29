import global from 'mod/global';

// Setup temporary Google Analytics objects.
window.GoogleAnalyticsObject = 'ga';
window.ga = function () {
  (window.ga.q = window.ga.q || []).push(arguments);
};
window.ga.l = 1 * new Date();

// Immediately add a pageview event to the queue.
console.warn('analytics disabled');
// window.ga('create', 'UA-XXXXXXXX-X', 'gengi.is');
// window.ga('send', 'pageview');

let analytics = function() {
  if (global.options.debug) {
    console.info('analytics', arguments);
  }
  console.warn('analytics disabled', this, arguments);
  // window.ga.apply(this, arguments);
};

analytics.cleanUrl = function(url) {
  if (!url) {
    return window.location.pathname;
  }
  if (url.indexOf('localhost') > -1 || url.indexOf('.is') > -1) {
    var divider = url.indexOf('localhost') > -1 ? 'localhost:1337' : '.is';
    url = url.split(divider);
    url = url[1] || url[0];
  }
  if (url.indexOf('#') > -1) {
    url = url.split('#');
    url = url[0];
  }
  if (url.indexOf('?') > -1) {
    url = url.split('?');
    url = url[0];
  }
  return url;
};

// Asynchronously load Google Analytics, letting it take over our `window.ga`
// object after it loads. This allows us to add events to `window.ga` even
// before the library has fully loaded.
require(['//www.google-analytics.com/analytics.js']);

export default analytics;
