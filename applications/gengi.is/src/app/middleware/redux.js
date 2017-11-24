import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';

// Middleware for reducing boilerplate when using async actions
const promiseMiddleware = () => next => action => {
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });
  return promise.then(
    payload => next({ ...rest, payload, type: SUCCESS }),
    error => next({ ...rest, error, type: FAILURE })
  );
};

const redux = () => session => {
  const middlewares = [thunk, promiseMiddleware];
  const stateFromServer = typeof window === 'undefined' ? undefined : window.REDUX_STATE;
  const store = createStore(rootReducer, stateFromServer, applyMiddleware(...middlewares));

  session.on('server', next => {
    next();
    session.window.REDUX_STATE = store.getState();
  })

  return async next => {
    const children = await next()

    return <Provider store={store}>{children}</Provider>
  }
}

export default redux
