import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { DropdownListInput, TextInput } from 'components/FormFields';
import { required } from 'components/FormFields/Validations';

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
        component={TextInput}
        validate={[required]}
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
    </div>

    {error && (
    <div className="alert alert-danger card-alert">
      {error}
    </div>
    )}

    <div className="card-footer text-center">
      <Button color="primary" disabled={submitting}>Submit</Button>
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
