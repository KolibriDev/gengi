import calculate from 'modules/calculate';
import numpad from 'modules/numpad';
import format from 'modules/format';
import search from 'modules/search';
import storage from 'modules/storage';
import sanitize from 'modules/sanitize';

export default {
  calculate: calculate,
  numpad: numpad,
  format: format,
  search: search,
  local: storage,
  sanitize: sanitize,
};
