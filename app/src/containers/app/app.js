import * as React from 'react';
import { Button } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Page from '../page';
import Home from '../home';

export const App = () => (
  <Switch>
    <Page
      name="HELLO"
      path="/hello"
      component={() => (
        <Button variant="contained" color="secondary">
          hellow
        </Button>
      )}
    />
    <Page name="ACTIVITY" exact path="/" component={Home} />
  </Switch>
);

export default hot(App);
