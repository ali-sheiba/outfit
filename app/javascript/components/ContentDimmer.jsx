/* eslint react/prop-types: 0 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ContentDimmer = ({ active = false, children }) => (
  <div className={classNames('dimmer', { active })}>
    {active && <div className="loader" />}
    <div className="dimmer-content">
      {children}
    </div>
  </div>
);

ContentDimmer.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default ContentDimmer;
