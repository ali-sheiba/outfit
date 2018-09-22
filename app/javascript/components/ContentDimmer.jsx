/* eslint react/prop-types: 0 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ContentDimmer = ({ active = false, error = null, children }) => (
  <div className={classNames('dimmer', { active })}>
    {active && <div className="loader" />}
    {error
      ? (
        <div className="alert alert-danger">
          {error}
        </div>
      )
      : (
        <div className="dimmer-content">
          {children}
        </div>
      )}
  </div>
);

ContentDimmer.propTypes = {
  active: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ContentDimmer;
