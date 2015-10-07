import _ from 'underscore';
/**
@search.filter
  Compare search term with available fields and return true for any partial match.
**/
export default function(value, term){
  term = term ? term.toUpperCase() : false;
  if (!term) { return false; }
  // Ignore ISK
  if (value.hasOwnProperty('code') && value.code.toUpperCase() === 'ISK') { return false;}

  if (value.hasOwnProperty('code') && value.code.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('name') && value.name.toUpperCase().indexOf(term) > -1) { return true; }
  if (value.hasOwnProperty('countries')){
    var found = false;
    _.each(value.countries, (country) => {
      if (country.hasOwnProperty('country') && country.country.toUpperCase().indexOf(term) > -1) { found = true; }
      if (country.hasOwnProperty('countryCode') && country.countryCode.toUpperCase().indexOf(term) > -1) { found = true; }
      if (country.hasOwnProperty('countryEnglish') && country.countryEnglish.toUpperCase().indexOf(term) > -1) { found = true; }
    });

    return found;
  }
  return false;
}
