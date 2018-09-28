import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import classNames from 'classnames';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

momentLocalizer(moment);

const DatePickerInput = ({
  input, meta, ...field
}) => {
  const inputField = () => (
    <Fragment>
      <DateTimePicker
        id={field.id || input.name}
        time={false}
        format="MMM DD, YYYY"
        {...input}
        {...field}
        onChange={input.onChange}
        value={!input.value ? null : new Date(input.value)}
        containerClassName={classNames('form-control py-0 pr-0', input.className, {
          'is-invalid': meta.touched && !meta.valid,
        })}
      />
      {' '}
      {meta.touched && meta.error && (
      <div className="invalid-feedback d-block">
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


DatePickerInput.propTypes = {
  input: PropTypes.shape(Object).isRequired,
  meta: PropTypes.shape(Object).isRequired,
};

export default DatePickerInput;
