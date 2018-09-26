import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FileBase64 from 'components/FileBase64';


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
      <div className="custom-file">
        <FileBase64
          {...input}
          {...field}
          onDone={this.getFiles}
          className={classNames('custom-file-input', input.className, {
            'is-invalid': meta.touched && !meta.valid,
          })}
        />
        <label className="custom-file-label">
          {input.value ? input.value.name : 'Choose file'}
        </label>

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
      </div>
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
