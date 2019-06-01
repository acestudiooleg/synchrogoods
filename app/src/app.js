import React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import Router from './router';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <Router />
      </HashRouter>
    </Provider>
  </ThemeProvider>
);

export default hot(App);
