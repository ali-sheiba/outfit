import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import LoadingButton from 'components/LoadingButton';
import { DropdownListInput, TextInput, FileInput } from 'components/FormFields';
import { required, number } from 'components/FormFields/Validations';

const Form = ({
  error, handleSubmit, submitting, options,
}) => (
  <form onSubmit={handleSubmit} className="card">
    <div className="card-body">
      <Field
        autoFocus
        label="Name"
        placeholder="Item Name"
        name="item[name]"
        component={TextInput}
        validate={[required]}
      />

      <Field
        label="Price"
        placeholder="Item Price"
        name="item[price]"
        type="number"
        component={TextInput}
        validate={[required, number]}
      />

      <Field
        label="Category"
        placeholder="Category"
        name="item[category_id]"
        component={DropdownListInput}
        data={options.categories}
        valueField="id"
        textField="name"
        validate={[required]}
      />

      <Field
        label="Brand"
        placeholder="Brand"
        name="item[brand_id]"
        component={DropdownListInput}
        data={options.brands}
        valueField="id"
        textField="name"
        validate={[required]}
      />

      <Field
        label="Color"
        placeholder="Color"
        name="item[color_id]"
        component={DropdownListInput}
        data={options.colors}
        valueField="id"
        textField="name"
        validate={[required]}
      />

      <Field
        label="Image"
        accept="image/*"
        name="item[image]"
        component={FileInput}
        validate={[required]}
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
  options: PropTypes.shape(Object).isRequired,
  error: PropTypes.string,
};

export default reduxForm({ form: 'item' })(Form);
