
/**
@values.name
  Parse/format currency name for better human readability.
**/
const name = (providedName) => {
  if (!providedName) { return providedName }
  // Change 'dalur, bandarískur' to 'bandarískur dalur'
  let value = providedName.split(',')
  value = value.length > 1 ? `${value[1].trim()} ${value[0].trim()}` : value[0]

  if (value.indexOf(' ') > -1) {
    // Remove duplicates in value, e.g. 'sterlingspund pund'
    const split = value.split(' ')
    // value = value.replace((split[split.length-1] + ' ' + split[split.length-1]), split[split.length-1])
    value = value.replace((`${split[split.length - 1]} ${split[split.length - 1]}`), split[split.length - 1])
  }

  value = value.trim().charAt(0).toUpperCase() + value.slice(1)

  return value
}

/**
@values.rate
  Normalize float values for currency rate.
**/
const rate = function (value) {
  return parseFloat(value)
}

module.exports = { name, rate }
