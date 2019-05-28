import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import reducers from 'src/reducers';
import rootSaga from 'src/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(rootSaga);

export const wrap = child => (
  <ThemeProvider theme={theme} >
    <Provider store={store}>
      <HashRouter>
        {child}
      </HashRouter>
    </Provider>
  </ThemeProvider>
);
