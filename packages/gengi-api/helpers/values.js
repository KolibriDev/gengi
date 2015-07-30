
exports.name = function(name){
  if (!name) { return name; }
  name = name.split(',');
  name = name.length > 1 ? name[1].trim() + ' ' + name[0].trim() : name[0];
  return name;
};

exports.rate = function(value){
  return parseFloat(value).toFixed(3);
};
