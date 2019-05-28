import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import R from 'ramda';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';

import reducers from 'src/reducers';
import rootSaga from 'src/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, compose(
  applyMiddleware(sagaMiddleware),
  // this code allows to use redux dev tools chrome extension
  typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
      // initialize, if there is a redux dev tools chrome extension
      window.devToolsExtension() :
      // otherwise, do nothing
      R.identity
));

sagaMiddleware.run(rootSaga);

export const wrap = child => (
  <Provider store={store}>
    <HashRouter>
      {child}
    </HashRouter>
  </Provider>
);
