/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
*/

import React from 'react';
import PropTypes from 'prop-types';

export default class FileBase64 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { multiple, onDone } = this.props;
    // get the files
    const { files } = e.target;

    // Process each file
    const allFiles = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: `${Math.round(file.size / 1000)} kB`,
          base64: reader.result,
          file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length === files.length) {
          // Apply Callback function
          if (multiple) onDone(allFiles);
          else onDone(allFiles[0]);
        }
      }; // reader.onload
    } // for
  }

  render() {
    const { multiple, className, accept } = this.props;

    return (
      <input
        type="file"
        multiple={multiple}
        className={className}
        accept={accept}
        onChange={this.handleChange}
      />
    );
  }
}

FileBase64.propTypes = {
  multiple: PropTypes.bool,
  onDone: PropTypes.func.isRequired,
  className: PropTypes.string,
  accept: PropTypes.string,
};
