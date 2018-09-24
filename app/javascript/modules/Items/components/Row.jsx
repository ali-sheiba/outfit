import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  item, handleDelete, deletingId, colClass = 'col-md-4',
}) => (
  <div className={colClass}>
    <div className="card">

      <img className="card-img-top" src={item.image_url} alt={item.name} />
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="small m-0">
          <strong>Category: </strong>
          {item.category.name}
        </p>
        <p className="small m-0">
          <strong>Brand: </strong>
          {item.brand.name}
        </p>
        <p className="small m-0">
          <strong>Color: </strong>
          {item.color.name}
        </p>
        <p className="small m-0">
          <strong>Price: </strong>
          {item.price}
          {' '}
          AED
        </p>
        {handleDelete && (
        <div className="position-absolute card-delete-btn">
          {deletingId === item.id
            ? (<i className="fas fa-spinner fa-spin" />)
            : (
              <button
                type="button"
                title="Delete"
                className="btn btn-link text-danger btn-sm"
                onClick={() => handleDelete(item.id)}
              >
                <i className="far fa-trash-alt" />
              </button>
            )}
        </div>
        )}
      </div>
    </div>
  </div>
);

Row.propTypes = {
  item: PropTypes.shape(Object).isRequired,
  handleDelete: PropTypes.func,
  deletingId: PropTypes.number,
  colClass: PropTypes.string,
};

export default Row;
