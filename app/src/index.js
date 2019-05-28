import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store';

const render = () => {
  console.log('.........GGGGGGGGGGGGGGGGGGG......')
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route path="/" render={App} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
    );
};
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.addEventListener('deviceready', render, false);