import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import LoadingButton from 'components/LoadingButton';
import { TextInput } from 'components/FormFields';
import { required, minLength } from 'components/FormFields/Validations';
import ItemsPicker from './ItemsPicker';

const min3 = minLength(3, 'You have to add at least 3 items');

const Form = ({
  error, handleSubmit, submitting, items,
}) => (
  <form onSubmit={handleSubmit} className="card">
    <div className="card-body">
      <Field
        autoFocus
        label="Name"
        placeholder="Outfit Name"
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
        validate={[required, min3]}
      />
    </div>

    {error && (
    <div className="alert alert-danger card-alert">
      {error}
    </div>
    )}

    <div className="card-footer text-center">
      <LoadingButton
        className="btn btn-primary w-9"
        loading={submitting}
      >
        Submit
      </LoadingButton>
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
