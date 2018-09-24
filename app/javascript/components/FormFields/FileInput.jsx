import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FileBase64 from 'react-file-base64';

import classNames from 'classnames';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.inputField = this.inputField.bind(this);
  }

  getFiles(files) {
    const { input } = this.props;
    input.onChange(files);
  }

  inputField() {
    const {
      input, meta, ...field
    } = this.props;

    return (
      <Fragment>
        <FileBase64
          {...input}
          {...field}
          onDone={this.getFiles}
          className={classNames('custom-file-input', input.className, {
            'is-invalid': meta.touched && !meta.valid,
          })}
        />

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
  }

  render() {
    const {
      input, meta, ...field
    } = this.props;

    return (field.label
      ? (
        <div className="form-group">
          <label htmlFor={field.name} className="form-label">
            {field.label}
          </label>
          {this.inputField()}
        </div>
      )
      : this.inputField());
  }
}


FileInput.propTypes = {
  input: PropTypes.shape(Object).isRequired,
  meta: PropTypes.shape(Object).isRequired,
  data: PropTypes.arrayOf(Object),
};

export default FileInput;
