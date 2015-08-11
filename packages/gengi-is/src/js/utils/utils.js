'use strict';
define([
  'utils/calculate',
  'utils/format',
  'utils/router',
  'utils/search',
  'kolibri/koli-local',
  'utils/sanitize'
  ], (calculate, format, router, search, local, sanitize) => {

  return {
    calculate: calculate,
    format: format,
    router: router,
    search: search,
    local: local,
    sanitize: sanitize,
  };
});