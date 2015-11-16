import moment from 'moment';

/**
@getMidnight
  Returns timestamp for next midnight.
**/
export const getMidnight = function() {
  var midnight = moment();
  midnight.hours(24);
  midnight.minutes(0);
  midnight.seconds(0);
  midnight.milliseconds(0);
  return midnight.unix() * 1000;
};

/**
@secsToMidnight
  Returns seconds to next midnight, or midnight of given date
**/
export const secsToMidnight = function() {
  let now = moment().unix();
  let midnight = getMidnight() / 1000;
  return midnight - now;
};

export default { secsToMidnight, getMidnight };
