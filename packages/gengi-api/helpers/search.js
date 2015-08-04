
/**
@search.filter
  Compare search term with available fields and return true for any partial match.
**/
exports.filter = function(value, term){
  term = term ? term.toUpperCase() : false;
  if (!term) { return false; }
  // Ignore ISK
  if (value.hasOwnProperty('code') && value.code.toUpperCase() === 'ISK') { return false;}

  if (value.hasOwnProperty('code') && value.code.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('name') && value.name.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('country') && value.country.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('countryCode') && value.countryCode.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('countryEnglish') && value.countryEnglish.toUpperCase().indexOf(term) > -1) { return true; }
  return false;
};
