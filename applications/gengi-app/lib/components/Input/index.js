import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

import styles from '../../styles'

const sanitizeNumber = (value) => {
  if (!value && (value === 0 || value === '')) {
    return value;
  }
  value = value || '';
  if (value.toString().indexOf(',')) {
    value = value.toString().replace(',', '.');
  }
  value = parseFloat(value);
  value = isNaN(value) || value < 0 ? 1 : value;

  return value;
}
const number = function(value, fix) {
  value = sanitizeNumber(value);
  return !fix ? value : parseFloat(value).toFixed(fix);
};
const numberWithCommas = function(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const numberIcelandic = function(value, fix) {
  if (!value) { return value; }
  var initialValue = value;
  value = number(value, fix);
  value = value.toString();
  value = value.split('.');
  value[0] = numberWithCommas(value[0]);
  value = value.join(',');
  if (initialValue.toString().substring(initialValue.length - 1) === '.') {
    value = value + ',';
  }
  return value;
};


const Input = ({ symbol, value }) => {
  const placeholder = <Text style={styles.currencyPlaceholder}>1</Text>
  return (
    <View style={styles.currencyInput}>
      <Text style={styles.currencySymbol}>{symbol}</Text>
      <Text style={styles.currencyRate}>{numberIcelandic(value)}</Text>
      {value ? null : placeholder}
    </View>
  )
}

Input.propTypes = {
  symbol: PropTypes.string,
  value: PropTypes.string,
};

module.exports = Input
