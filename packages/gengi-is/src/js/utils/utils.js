'use strict';
define([
  'utils/calculate',
  'utils/numpad',
  'utils/format',
  'utils/search',
  'kolibri/koli-local',
  'utils/sanitize'
  ], (calculate, numpad, format, search, local, sanitize) => {

  return {
    calculate: calculate,
    numpad: numpad,
    format: format,
    search: search,
    local: local,
    sanitize: sanitize,
  };
});