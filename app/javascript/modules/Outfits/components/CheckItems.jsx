/* eslint react/prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CheckItems = ({ count, children }) => (
  count < 3
    ? (
      <div className="text-center text-muted">
        <p>You need to have at least 3 items to create an outfit</p>
        <Link to="/items/new" className="btn btn-success btn-sm mt-5">Add Items</Link>
      </div>
    )
    : children
);

CheckItems.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CheckItems;
