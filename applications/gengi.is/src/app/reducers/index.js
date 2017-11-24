import { combineReducers } from 'redux';

function foo(state = {chips: 1}, action) {
  return state;
}

const rootReducer = combineReducers({
  foo,
});

export default rootReducer;
