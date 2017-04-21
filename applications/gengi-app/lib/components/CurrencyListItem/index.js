import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../styles'

export default props => {
  return (
    <View style={styles.currencyListItem}>
      <Text style={styles.currencyListSymbol}>{props.currency.symbol}</Text>
      <Text style={styles.currencyListTitle}>{props.currency.code}</Text>
      <Text style={styles.currencyListName}>{props.currency.name}</Text>
      <Text style={styles.currencyListRate}>
        {Math.round(props.currency.rate * 100) / 100}
      </Text>
    </View>
  )
}
