import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Row = ({ outfit, handleDelete }) => (
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Link to={`/outfits/${outfit.id}`}>{outfit.name}</Link>
        </h3>
        <div className="card-options">
          <Link
            to={`/outfits/${outfit.id}/edit`}
            className="btn btn-link text-lime btn-sm"
          >
            <i className="fas fa-edit" />
          </Link>
          <button type="button" className="btn btn-link text-danger btn-sm" onClick={() => handleDelete(outfit.id)}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
        <ul className="pl-4">
          {outfit.items.map(i => (
            <li
              key={`outfit-${outfit.id}-item-${i.id}`}
            >
              {i.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer text-center">
        Outfit Cost :
        {' '}
        <strong>
          {outfit.total_price}
          {' '}
          AED
        </strong>
      </div>
    </div>
  </div>
);

Row.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  outfit: PropTypes.shape(Object).isRequired,
};

export default Row;
