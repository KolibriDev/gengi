import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from '../../styles'

class Numpad extends Component {
  constructor(props) {
    super(props)
  }
  handlePress(foo) {
    this.props.handleClick(foo)
  }

  render() {
    return (
      <View>
        <View style={styles.numpadWrap}>
          <TouchableOpacity onPress={() => this.handlePress(1)}>
            <Text style={styles.numpad}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(2)}>
            <Text style={styles.numpad}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(3)}>
            <Text style={styles.numpad}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numpadWrap}>
          <TouchableOpacity onPress={() => this.handlePress(4)}>
            <Text style={styles.numpad}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(5)}>
            <Text style={styles.numpad}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(6)}>
            <Text style={styles.numpad}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numpadWrap}>
          <TouchableOpacity onPress={() => this.handlePress(7)}>
            <Text style={styles.numpad}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(8)}>
            <Text style={styles.numpad}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(9)}>
            <Text style={styles.numpad}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numpadWrap}>
          <TouchableOpacity onPress={() => this.handlePress('comma')}>
            <Text style={styles.numpad}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(0)}>
            <Text style={styles.numpad}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress('clear')}>
            <Text style={styles.numpad}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Numpad.propTypes = {
  symbol: PropTypes.string,
  value: PropTypes.string,
}

module.exports = Numpad
