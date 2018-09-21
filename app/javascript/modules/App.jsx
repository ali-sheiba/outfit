import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import Session from 'utils/session';

import Navbar from 'components/Navbar';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { getProfile } from 'modules/Auth/actions';

import index from 'modules/Items';

class App extends Component {
  componentDidMount() {
    const { isLogin, profileAction } = this.props;
    if (Session.isLogin() && !isLogin) {
      profileAction();
    }
  }

  render() {
    const { isLogin, profile } = this.props;
    return (
      <Fragment>
        <div className="page-main">
          <Header isLogin={isLogin} profile={profile} />
          {isLogin && <Navbar />}
          <div className="my-3 my-md-5">
            <div className="container">
              <Switch>
                <PrivateRoute path="/items" component={index} isAuthenticated={isLogin || Session.isLogin()} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

App.propTypes = {
  profileAction: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  profile: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => store.auth;

const mapDispatchToProps = {
  profileAction: getProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
