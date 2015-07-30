
exports.name = function(name){
  if (!name) { return name; }
  name = name.split(',');
  name = name.length > 1 ? name[1].trim() + ' ' + name[0].trim() : name[0];

  if (name.indexOf(' ') > -1) {
    var split = name.split(' ');
    name = name.replace((split[split.length-1] + ' ' + split[split.length-1]), split[1]);
  }

  return name;
};

exports.rate = function(value){
  return parseFloat(value).toFixed(3);
};
