import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Input from '../Input'
import Numpad from '../Numpad'

class Calculator extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      amount: '',
      result: '',
    }
  }

  calculate() {
    console.log(this.props)
    const rate = this.props.currency.rate
    const amount = this.state.amount || 1

    const value = amount * rate
    const fix = value < 1 && value > 0.001 ? value === 0 ? 0 : 5 : 2
    let retValue = parseFloat(value).toFixed(fix)

    if (value > 999) {
      retValue = parseInt(retValue)
    }

    this.setState({
      result: retValue,
    })
  }

  componentWillMount() {
    this.calculate()
  }

  handleNumpad(_value) {
    let value = _value.toString()
    let amount = this.state.amount.toString()

    if (amount === '0') {
      amount = ''
    }

    if (value === 'comma') {
      if (amount.indexOf('.') === -1) {
        amount = amount.length >= 1 ? `${amount}.` : `0.`
      }
    } else if (value === 'clear') {
      amount = amount.slice(0, -1)
    } else {
      amount += value
    }

    this.setState(
      {
        amount,
      },
      this.calculate
    )
  }

  render() {
    return (
      <View>
        <View>
          <Input
            symbol={this.props.currency.symbol}
            value={this.state.amount.toString()}
          />
          <Input symbol="ISK" value={this.state.result.toString()} />
        </View>
        <Numpad handleClick={this.handleNumpad.bind(this)} />
      </View>
    )
  }
}

module.exports = Calculator
