'use strict';
define(['momenttz', 'momentIS'], (moment) => {
  moment.locale('is');
  moment.tz.setDefault('Atlantic/Reykjavik');
  return moment;
});
