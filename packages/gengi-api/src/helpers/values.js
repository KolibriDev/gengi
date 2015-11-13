
/**
@values.name
  Parse/format currency name for better human readability.
**/
export const name = function(name){
  if (!name) { return name; }
  // Change 'dalur, bandarískur' to 'bandarískur dalur'
  name = name.split(',');
  name = name.length > 1 ? name[1].trim() + ' ' + name[0].trim() : name[0];

  if (name.indexOf(' ') > -1) {
    // Remove duplicates in name, e.g. 'sterlingspund pund'
    var split = name.split(' ');
    name = name.replace((split[split.length-1] + ' ' + split[split.length-1]), split[split.length-1]);
  }

  name = name.trim().charAt(0).toUpperCase() + name.slice(1);

  return name;
};

/**
@values.rate
  Normalize float values for currency rate.
**/
export const rate = function(value){
  return parseFloat(value);
};

export default { name, rate };
