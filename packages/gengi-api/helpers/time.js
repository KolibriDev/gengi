
exports.secsToMidnight = function() {
    var msd = 8.64e7;
    var now = new Date();
    return Math.floor((msd - (now - now.getTimezoneOffset()*1000) % msd)/1000);
};

exports.getMidnight = function() {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return midnight.getTime();
};
