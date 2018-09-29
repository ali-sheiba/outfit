import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({ loading, children, ...props }) => (
  <button disabled={loading} {...props}>
    {loading ? <i className="fas fa-spinner fa-spin" /> : children}
  </button>
);

LoadingButton.propTypes = {
  loading: PropTypes.bool,
};

LoadingButton.defaultProps = {
  loading: false,
};

export default LoadingButton;
