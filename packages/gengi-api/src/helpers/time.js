import moment from 'moment';

/**
@getMidnight
  Returns timestamp for next midnight of given date, or todays next midnight.
**/
export const getMidnight = function(date) {
  var midnight;
  if (date) {
    date = date.split('.');
    date = date[2] + '-' + date[1] + '-' + date[0];

    midnight = moment(date);
  } else {
    midnight = moment();
  }

  midnight.hours(24);
  midnight.minutes(0);
  midnight.seconds(0);
  midnight.milliseconds(0);
  return midnight.unix() * 1000;
};

/**
@getExpirytime
  Returns seconds to expired data.
**/
export const getExpirytime = function(date) {
  date = date.split('.');
  date = date[2] + '-' + date[1] + '-' + date[0];

  if (moment(date).isSame(moment().format('YYYY-MM-DD'))) {
    let now = moment().unix();
    let midnight = getMidnight() / 1000;
    return midnight - now;
  } else {
    return 60 * 10;
  }
};

export default { getMidnight, getExpirytime };
