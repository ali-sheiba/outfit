import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './containers/Index';
import Show from './containers/Show';

const index = () => (
  <Switch>
    <Route path="/explores/:id" component={Show} exact />
    <Route path="/explores" component={Index} />
  </Switch>
);

export default index;
