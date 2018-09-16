import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Session from 'utils/session';
import LoginForm from './components/Form';
import { login } from './actions';

class Login extends Component {
  componentDidMount() {
    return Session.isLogin() && Session.clearAccessToken();
  }

  handleSubmit = (values) => {
    const { loginAction, history } = this.props;
    return loginAction(values).then(({ value }) => {
      Session.setAccessToken(value.data.token);
      history.push('/');
    }).catch((err) => {
      throw new SubmissionError({
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
              <LoginForm
                onSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

const mapStateToProps = store => store.auth;

const mapDispatchToProps = {
  loginAction: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
