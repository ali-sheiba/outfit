import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './containers/Index';
import New from './containers/New';

const index = () => (
  <Switch>
    <Route path="/items/new" component={New} exact />
    <Route path="/items" component={Index} />
  </Switch>
);

export default index;
