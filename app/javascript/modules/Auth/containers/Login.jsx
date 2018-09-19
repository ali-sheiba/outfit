import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from 'modules/Auth/components/LoginForm';
import SessionComponent from 'modules/Auth/components/SessionComponent';
import { login, logout } from 'modules/Auth/actions';

class Login extends SessionComponent {
  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <Row>
            <Col className="col-login mx-auto">
              <LoginForm
                onSubmit={this.handleSubmit}
              />
              <div className="text-center text-muted">
                Dont have account yet?
                {' '}
                <Link to="/register">Register</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  sessionAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = store => store.auth;

const mapDispatchToProps = {
  sessionAction: login,
  logoutAction: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
