import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Session from 'utils/session';
import RegisterForm from 'modules/Auth/components/RegisterForm';
import { register } from 'modules/Auth/actions';

class Register extends Component {
  componentDidMount() {
    return Session.isLogin() && Session.clearAccessToken();
  }

  handleSubmit = (values) => {
    const { registerAction, history } = this.props;
    return registerAction(values).then(({ value }) => {
      NotificationManager.success(value.data.message);
      Session.setAccessToken(value.data.token);
      history.push('/');
    }).catch((err) => {
      throw new SubmissionError({
        ...err.response.data.data,
        _error: err.response ? err.response.data.error : err.message,
      });
    });
  }

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
  registerAction: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => store.auth;

const mapDispatchToProps = {
  registerAction: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
