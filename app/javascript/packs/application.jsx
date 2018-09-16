import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

import App from '../modules/App';

import 'tabler-ui/dist/assets/css/tabler.css';
import 'tabler-ui/dist/assets/css/dashboard.css';
import '@fortawesome/fontawesome-free/css/all.css';
// import 'react-notifications/lib/notifications.css';

window.store = store;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
    <Provider store={store}>
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login} exact /> */}
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  ), document.getElementById('root'));
});
