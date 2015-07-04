define(['momenttz','momentIS'], function(moment) {
  'use strict';
  moment.locale('is');
  moment.tz.setDefault('Atlantic/Reykjavik');
  return moment;
});
