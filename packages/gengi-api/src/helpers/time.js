
/**
@secsToMidnight
  Returns seconds to next midnight, or midnight of given date
**/
export const secsToMidnight = function(now) {
    var msd = 8.64e7;
    now = now instanceof Date ? now : new Date();
    return Math.floor((msd - (now - now.getTimezoneOffset()*1000) % msd)/1000);
};

/**
@getMidnight
  Returns timestamp for next midnight.
**/
export const getMidnight = function() {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return midnight.getTime();
};

export default { secsToMidnight, getMidnight };
