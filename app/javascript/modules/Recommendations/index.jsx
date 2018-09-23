import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './containers/Index';

const index = () => (
  <Switch>
    <Route path="/recommendations" component={Index} />
  </Switch>
);

export default index;
