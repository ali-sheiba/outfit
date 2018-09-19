import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import RegisterForm from 'modules/Auth/components/RegisterForm';
import SessionComponent from 'modules/Auth/components/SessionComponent';
import { register, logout } from 'modules/Auth/actions';

class Register extends SessionComponent {
  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <Row>
            <Col className="col-login mx-auto">
              <RegisterForm
                onSubmit={this.handleSubmit}
              />
              <div className="text-center text-muted">
                Already have account?
                {' '}
                <Link to="/login">Login</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  sessionAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = store => store.auth;

const mapDispatchToProps = {
  sessionAction: register,
  logoutAction: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
