import React, { Fragment } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Header from 'components/Header';
import Footer from 'components/Footer';

// import PrivateRoute from '../components/PrivateRoute';

const App = () => (
  <Fragment>
    <div className="page-main">
      <Header />
      <Navbar />
      <div className="my-3 my-md-5">
        <div className="container">
          Hello
        </div>
      </div>
    </div>
    <Footer />
  </Fragment>
);

export default App;
