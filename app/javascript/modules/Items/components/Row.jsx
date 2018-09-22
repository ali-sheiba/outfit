import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ item, handleDelete, deletingId }) => (
  <div className="col-md-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{item.name}</h3>
        {handleDelete && (
        <div className="card-options">
          {/* <button type="button" className="btn btn-link text-lime btn-sm">
              <i className="fas fa-edit" />
            </button> */}
          {deletingId === item.id
            ? (<i className="fas fa-spinner fa-spin" />)
            : (
              <button type="button" className="btn btn-link text-danger btn-sm" onClick={() => handleDelete(item.id)}>
                <i className="fas fa-times" />
              </button>
            )}
        </div>
        )}
      </div>
      <div className="card-body">
        <p className="card-text m-0">
          <strong>Category: </strong>
          {item.category.name}
        </p>
        <p className="card-text m-0">
          <strong>Brand: </strong>
          {item.brand.name}
        </p>
        <p className="card-text m-0">
          <strong>Color: </strong>
          {item.color.name}
        </p>
        <p className="card-text m-0">
          <strong>Price: </strong>
          {item.price}
          {' '}
          AED
        </p>
      </div>
    </div>
  </div>
);

Row.propTypes = {
  item: PropTypes.shape(Object).isRequired,
  handleDelete: PropTypes.func,
  deletingId: PropTypes.number,
};

export default Row;
