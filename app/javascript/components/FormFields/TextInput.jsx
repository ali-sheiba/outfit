import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = ({ input, meta, ...field }) => {
  const inputField = () => (
    <Fragment>
      <input
        id={field.id || input.name}
        {...input}
        {...field}
        className={classNames('form-control', input.className, {
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


TextInput.propTypes = {
  input: PropTypes.objectOf(Object).isRequired,
  meta: PropTypes.objectOf(Object).isRequired,
};

export default TextInput;
