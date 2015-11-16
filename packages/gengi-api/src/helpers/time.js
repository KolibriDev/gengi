import moment from 'moment';

/**
@secsToMidnight
  Returns seconds to next midnight, or midnight of given date
**/
export const secsToMidnight = function() {
  let now = moment().unix();
  let midnight = getMidnight() / 1000;
  return midnight - now;
};

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

export default { secsToMidnight, getMidnight };
