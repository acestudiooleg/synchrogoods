import * as React from 'react';
import { Switch } from 'react-router-dom';
import Page from './containers/Page';
import Home from './routes/Home';

export const Router = () => (
  <Switch>
    <Page name="ACTIVITY" exact path="/" component={Home} />
  </Switch>
);

export default Router;
