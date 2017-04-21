import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
} from 'react-native'

import styles from './styles'
import Header from './components/Header'
import CurrencyListItem from './components/CurrencyListItem'
import Calculator from './components/Calculator'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'list',
      currency: {},
      currencies: {},
      currenciesDataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    }
  }

  showView(view, currency = {}) {
    this.setState({
      view,
      currency,
    })
  }

  render() {
    console.log(this.state)
    let view = (
      <ListView
        dataSource={this.state.currenciesDataSource}
        renderRow={this.renderCurrency.bind(this)}
        style={styles.listView}
      />
    )
    if (this.state.view === 'calculator') {
      view = <Calculator currency={this.state.currency} />
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.showView('list')}>
          <Header currency={this.state.currency} />
        </TouchableOpacity>
        <View style={styles.content}>
          {view}
        </View>
      </View>
    )
  }

  renderCurrency(currency) {
    return (
      <TouchableOpacity onPress={() => this.showView('calculator', currency)}>
        <CurrencyListItem currency={currency} />
      </TouchableOpacity>
    )
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    const data = require('./mock/currencies.json')
    this.setState({
      currencies: data.list,
      currenciesDataSource: this.state.currenciesDataSource.cloneWithRows(
        data.list
      ),
    })
    // fetch('https://api.gengi.is/currencies')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       currencies: this.state.currenciesDataSource.cloneWithRows(data.list)
    //     })
    //   })
    //   .catch((error) => console.error(error))
  }
}

export default App
