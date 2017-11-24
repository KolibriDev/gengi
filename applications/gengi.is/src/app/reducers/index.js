import { combineReducers } from 'redux';

import currencies from '../ducks/currencies';
// import calculator from '../ducks/calculator';

function reducer(state = {}, action) {
  return state;
}

const rootReducer = combineReducers({
  currencies,
  // calculator,
});

export default rootReducer;
