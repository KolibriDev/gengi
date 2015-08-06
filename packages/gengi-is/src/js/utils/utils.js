define([
  'utils/calculate',
  'utils/format',
  'utils/router',
  'utils/search',
  'kolibri/koli-local',
  'utils/sanitize'
  ], function(calculate, format, router, search, local, sanitize) {
  'use strict';

  return {
    calculate: calculate,
    format: format,
    router: router,
    search: search,
    local: local,
    sanitize: sanitize,
  };
});