const moment = require('moment')

/**
@getMidnight
  Returns timestamp for next midnight of given date, or todays next midnight.
**/
const getMidnight = (providedDate) => {
  let midnight
  let date
  if (providedDate) {
    date = providedDate.split('.')
    date = `${date[2]}-${date[1] < 10 ? `0${date[1]}` : date[1]}-${date[0] < 10 ? `0${date[0]}` : date[0]}`

    midnight = moment(date)
  } else {
    midnight = moment()
  }

  midnight.hours(24)
  midnight.minutes(0)
  midnight.seconds(0)
  midnight.milliseconds(0)
  return midnight.unix() * 1000
}

/**
@getExpirytime
  Returns seconds to expired data.
**/
const getExpirytime = (expiryDate) => {
  let date = expiryDate.split('.')
  date = `${date[2]}-${date[1]}-${date[0]}`

  let retVal = 0

  if (moment(date).isSame(moment().format('YYYY-MM-DD'))) {
    const now = moment().unix()
    const midnight = getMidnight() / 1000
    retVal = midnight - now
  } else {
    retVal = 60 * 10
  }

  return retVal
}

module.exports = { getMidnight, getExpirytime }
