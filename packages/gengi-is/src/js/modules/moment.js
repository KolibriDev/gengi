'use strict';
import moment from 'vendor/moment-timezone';
import momentIS from 'vendor/moment-is'; // jshint ignore:line

moment.locale('is');
moment.tz.setDefault('Atlantic/Reykjavik');

export default moment;
