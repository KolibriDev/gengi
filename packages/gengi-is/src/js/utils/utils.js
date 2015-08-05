define([
  'utils/calculate',
  'utils/format',
  'utils/router',
  'kolibri/koli-local',
  'utils/sanitize'
  ], function(calculate, format, router, local, sanitize) {
  'use strict';

  return {
    calculate: calculate,
    format: format,
    router: router,
    local: local,
    sanitize: sanitize,
  };
});