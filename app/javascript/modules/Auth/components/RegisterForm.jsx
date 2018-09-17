/* eslint jsx-a11y/tabindex-no-positive: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import TextInput from 'components/FormFields/TextInput';
import { required, email } from 'components/FormFields/Validations';

const Form = ({ error, handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit} className="card">
    <div className="card-body p-6">

      <div className="card-title">
        Create new account
      </div>

      <Field
        label="First Name"
        autoFocus
        placeholder="First Name"
        tabIndex="1"
        name="user[first_name]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        label="Last Name"
        placeholder="Last Name"
        tabIndex="2"
        name="user[last_name]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        label="Mobile"
        placeholder="Mobile"
        tabIndex="3"
        name="user[mobile]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        label="Date of Birth"
        type="date"
        tabIndex="4"
        name="user[date_of_birth]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        label="Email"
        placeholder="Email"
        tabIndex="5"
        type="email"
        name="user[email]"
        component={TextInput}
        validate={[required, email]}
      />

      <Field
        label="Password"
        autoComplete="off"
        placeholder="Password"
        tabIndex="6"
        type="password"
        name="user[password]"
        component={TextInput}
        validate={[required]}
      />

      {error && (
      <div className="alert alert-danger">
        {error}
      </div>
      )}

      <div className="form-footer">
        <Button color="primary" tabIndex="7" block disabled={submitting}>Regsiter</Button>
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

export default reduxForm({ form: 'register' })(Form);
