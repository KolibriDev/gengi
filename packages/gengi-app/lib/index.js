import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import styles from './styles'
import Header from './components/Header'
import CurrencyListItem from './components/CurrencyListItem'

class App extends Component {
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
    const data = require('./mock/currencies.json')
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

export default App
