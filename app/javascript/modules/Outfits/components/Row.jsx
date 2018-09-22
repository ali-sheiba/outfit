import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ outfit, handleDelete }) => (
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{outfit.name}</h3>
        <div className="card-options">
          {/* <button type="button" className="btn btn-link text-lime btn-sm">
              <i className="fas fa-edit" />
            </button> */}
          <button type="button" className="btn btn-link text-danger btn-sm" onClick={() => handleDelete(outfit.id)}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
        xxx
      </div>
    </div>
  </div>
);

Row.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  outfit: PropTypes.shape(Object).isRequired,
};

export default Row;
