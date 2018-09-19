import { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import Session from 'utils/session';

class SessionComponent extends Component {
  componentDidMount() {
    const { isLogin, logoutAction } = this.props;
    return isLogin && logoutAction() && Session.clearAccessToken();
  }

  handleSubmit = (values) => {
    const { sessionAction, history } = this.props;
    return sessionAction(values).then(({ value }) => {
      NotificationManager.success(value.data.message);
      Session.setAccessToken(value.data.token);
      history.push('/');
    }).catch((err) => {
      throw new SubmissionError({
        _error: err.response ? err.response.data.error : err.message,
      });
    });
  }
}

SessionComponent.propTypes = {
  sessionAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default SessionComponent;
