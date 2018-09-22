import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import classNames from 'classnames';

const DropdownListInput = ({
  input, meta, data = [], ...field
}) => {
  const inputField = () => (
    <Fragment>
      <DropdownList
        filter
        id={field.id || input.name}
        valueField="id"
        textField="name"
        {...input}
        {...field}
        data={data}
        onChange={value => input.onChange(value.id)}
        containerClassName={classNames('form-control', input.className, {
          'is-invalid': meta.touched && !meta.valid,
        })}
      />
      {' '}
      {meta.touched && meta.error && (
      <div className="invalid-feedback">
        {meta.error}
      </div>
      )}
      {field.help && (
      <div className="form-text text-muted">
        {field.help}
      </div>
      )}
    </Fragment>
  );

  return (field.label
    ? (
      <div className="form-group">
        <label htmlFor={field.name} className="form-label">
          {field.label}
        </label>
        {inputField()}
      </div>
    )
    : inputField());
};


DropdownListInput.propTypes = {
  input: PropTypes.shape(Object).isRequired,
  meta: PropTypes.shape(Object).isRequired,
  data: PropTypes.arrayOf(Object),
};

export default DropdownListInput;
