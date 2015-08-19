'use strict';
define([
  'utils/calculate',
  'utils/format',
  'utils/search',
  'kolibri/koli-local',
  'utils/sanitize'
  ], (calculate, format, search, local, sanitize) => {

  return {
    calculate: calculate,
    format: format,
    search: search,
    local: local,
    sanitize: sanitize,
  };
});