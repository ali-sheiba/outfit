import React, { Fragment } from 'react';
import {
  Input, FormFeedback, FormText, Label, FormGroup,
} from 'reactstrap';

const TextInput = (field) => {
  const input = () => (
    <Fragment>
      <Input
        id={field.id || field.input.name}
        placeholder={field.placeholder}
        type={field.type}
        autoComplete={field.autoComplete}
        autoFocus={field.autoFocus}
        disabled={field.disabled}
        dir={field.dir}
        tabIndex={field.tabIndex}
        {...field.input}
        invalid={field.meta.touched && !field.meta.valid}
      />
      {' '}
      {field.meta.touched && field.meta.error && <FormFeedback>{field.meta.error}</FormFeedback>}
      {field.help && (
      <FormText color="muted">
        {field.help}
      </FormText>
      )}
    </Fragment>
  );

  return (field.label
    ? (
      <FormGroup>
        <Label for={field.id || field.input.name} className="form-label">{field.label}</Label>
        {input()}
      </FormGroup>
    )
    : input());
};

export default TextInput;
