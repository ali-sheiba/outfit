import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './containers/Index';
import New from './containers/New';
import Show from './containers/Show';
import Edit from './containers/Edit';

const index = () => (
  <Switch>
    <Route path="/outfits/new" component={New} exact />
    <Route path="/outfits/:id/edit" component={Edit} exact />
    <Route path="/outfits/:id" component={Show} exact />
    <Route path="/outfits" component={Index} />
  </Switch>
);

export default index;
