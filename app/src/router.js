import * as React from 'react';
import { Switch } from 'react-router-dom';
import Page from './containers/page/page';
import Home from './routes/home/home';

export const Router = () => (
  <Switch>
    <Page name="ACTIVITY" exact path="/" component={Home} />
  </Switch>
);

export default Router;
