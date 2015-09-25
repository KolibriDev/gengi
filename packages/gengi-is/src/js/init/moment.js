'use strict';
define(['momenttz', 'momentIS'], function(moment) {
  moment.locale('is');
  moment.tz.setDefault('Atlantic/Reykjavik');
  return moment;
});
