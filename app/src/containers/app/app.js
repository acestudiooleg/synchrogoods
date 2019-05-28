import React from "react";
import {Button} from '@material-ui/core'
import {Switch} from 'react-router-dom';
import Page from '../page';

export default () => (
  <Switch>
    <Page
      name="HELLO"
      path="/hello"
      component={() =>  <Button variant="contained" color="secondary">hellow</Button>}
    />
    <Page name="ACTIVITY" exact path="/" component={() => <Button variant="contained" color="primary">Root</Button>} />
  </Switch>
);
