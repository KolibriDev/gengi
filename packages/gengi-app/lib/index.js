/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLogo}>Gengi.is</Text>
      <Text style={styles.headerItem}>Gengi.is</Text>
      <Text style={styles.headerItem}>Gengi.is</Text>
      <Text style={styles.headerItem}>Gengi.is</Text>
    </View>
  )
}

const CurrencyListItem = (props) => {
  return (
    <View style={styles.currencyListItem}>
      <Text style={styles.currencyListTitle}>{props.currency.code}</Text>
      <Text style={styles.currencyListName}>{props.currency.name}</Text>
      <Text style={styles.currencyListRate}>{Math.round(props.currency.rate * 100) / 100}</Text>
    </View>
  )
}

class gengiapp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencies: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <ListView
            dataSource={this.state.currencies}
            renderRow={this.renderCurrency.bind(this)}
            style={styles.listView}
            />
        </View>
      </View>
    );
  }

  renderCurrency(currency) {

    return (
      <CurrencyListItem currency={currency} />
    )
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const data = require('./assets/currencies.json')
    this.setState({
      currencies: this.state.currencies.cloneWithRows(data.list)
    })
    // fetch('http://api.gengi.is/currencies')
    //   .then((response) => response.json())
    //   .then((data) => {
    //
    //   })
    //   .catch((error) => console.error(error))
  }
}

const _styles = require('./assets/styles')
const styles = StyleSheet.create(_styles)

AppRegistry.registerComponent('gengiapp', () => gengiapp);
