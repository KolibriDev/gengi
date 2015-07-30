
exports.filter = function(value, term){
  if (value.code.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.name.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.country.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.countryCode.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.countryEnglish.toUpperCase().indexOf(term) > -1) { return true; }
  return false;
};
