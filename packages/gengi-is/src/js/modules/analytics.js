'use strict';

// Setup temporary Google Analytics objects.
window.GoogleAnalyticsObject = 'ga';
window.ga = function () {
  (window.ga.q = window.ga.q || []).push(arguments);
};
window.ga.l = 1 * new Date();

window.ga('create', 'UA-42500963-1', 'gengi.is');

let analytics = function() {
  window.ga.apply(this, arguments);
};

analytics.logTime = function(category, id) {
  if (window.hasOwnProperty('performance') && category !== undefined && id !== undefined) {
    this('send', 'timing', category, id, window.performance.now());
  }
};

analytics.logException = function(desc, fatal) {
  if (desc === undefined) { return; }
  this('send', 'exception', desc, !!fatal);
};

let flag = false;
analytics.logFirst = function(type) {
  if (flag) { return; }
  flag = true;
  analytics.logTime('First Interaction', type || 'unknown');
};

analytics.cleanUrl = function(url) {
  if (!url) {
    return window.location.pathname.toString().toLowerCase();
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
  return url.toString().toLowerCase();
};

// Asynchronously load Google Analytics, letting it take over our `window.ga`
// object after it loads. This allows us to add events to `window.ga` even
// before the library has fully loaded.
require(['//www.google-analytics.com/analytics.js']);

export default analytics;
