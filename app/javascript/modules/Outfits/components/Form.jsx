import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from 'components/FormFields';
import { required, minLength } from 'components/FormFields/Validations';
import ItemsPicker from './ItemsPicker';

const min1 = minLength(1);

const Form = ({
  error, handleSubmit, submitting, items,
}) => (
  <form onSubmit={handleSubmit} className="card">
    <div className="card-body">
      <Field
        autoFocus
        label="Give it a name"
        placeholder="Item Name"
        name="outfit[name]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        autoFocus
        label="Name"
        placeholder="Item Name"
        name="outfit[item_ids]"
        items={items}
        component={ItemsPicker}
        validate={[required, min1]}
      />
    </div>

    {error && (
    <div className="alert alert-danger card-alert">
      {error}
    </div>
    )}

    <div className="card-footer text-center">
      <Button type="submit" color="primary" disabled={submitting}>Submit</Button>
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
  items: PropTypes.arrayOf(Object),
};

export default reduxForm({ form: 'outfit' })(Form);
