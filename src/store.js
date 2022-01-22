import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
// import { createBrowserHistory } from 'history';

import timers from './reducer';

const rootReducer = combineReducers({ timers });

// export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
// const middleware = [thunk, routerMiddleware(history)];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  // connectRouter(history)(rootReducer),
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
