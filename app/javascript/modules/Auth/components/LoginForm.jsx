/* eslint jsx-a11y/tabindex-no-positive: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextInput from 'components/FormFields/TextInput';
import LoadingButton from 'components/LoadingButton';
import { required, email } from 'components/FormFields/Validations';

const Form = ({ error, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit} className="card">
    <div className="card-body p-6">

      <div className="card-title">
        Login to your account
      </div>

      <Field
        label="Email"
        autoFocus
        placeholder="Email"
        className="form-control"
        tabIndex="1"
        type="email"
        name="user[email]"
        id="user_email"
        component={TextInput}
        validate={[required, email]}
      />

      <div className="form-group">
        <label className="form-label">
            Password
          {/* <a className="float-right small" href="/auth/password/new">Forgot Password?</a> */}
        </label>
        <Field
          autoComplete="off"
          placeholder="Password"
          className="form-control"
          tabIndex="2"
          type="password"
          name="user[password]"
          id="user_password"
          component={TextInput}
          validate={[required]}
        />
      </div>

      {error && (
      <div className="alert alert-danger">
        {error}
      </div>
      )}

      <div className="form-footer">
        <LoadingButton
          className="btn btn-primary btn-block"
          tabIndex="3"
          loading={submitting}
        >
          Login
        </LoadingButton>
      </div>

    </div>
  </form>
);

Form.defaultProps = {
  error: null,
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default reduxForm({ form: 'login' })(Form);
