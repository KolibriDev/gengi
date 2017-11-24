import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies } from '../ducks/currencies';

class AllCurrencies extends Component {
  static propTypes = {
    currencies: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;

    console.log('---', currencies);


    return (
      <div>
        <div className="currency-list__wrap">
          {Object.keys(currencies).map((key, index) => (
            <p key={currencies[key].code}>{currencies[key].code}</p>
            // <CurrencyItem
            //   {...currencies[key]}
            //   key={currencies[key].code}
            //   index={index}
            // />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies.list
})

export default connect(mapStateToProps)(AllCurrencies);
