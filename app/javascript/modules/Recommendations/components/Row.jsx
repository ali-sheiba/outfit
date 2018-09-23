import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ item }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card h-100">
      <div className="card-body">
        <h4 className="card-title">{item.name}</h4>
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

// <div className="d-flex flex-fill float-md-right justify-content-between text-right w-25">

const Row = ({ outfit }) => (
  <div className="card">
    <div className="card-body">
      <div className="float-md-right text-right">
        <small className="d-block">
          {`Total Price: ${outfit.total_price} AED`}
        </small>
        {/* <small className="d-block">
          {`Likes: ${outfit.likes}`}
        </small> */}
        {/* <small className="d-block">
          {`Score: ${outfit.score}`}
        </small> */}
      </div>
      <h5 className="card-title">
        <strong>{outfit.name}</strong>
        {' by: '}
        <span className="text-muted">{outfit.user.name}</span>
      </h5>

      <div className="flex-nowrap flex-row row row-cards o-auto">
        {outfit.items.map(i => <Item key={`outfit-item-${i.id}`} item={i} />)}
      </div>
    </div>
  </div>
);

Item.propTypes = {
  item: PropTypes.shape(Object).isRequired,
};

Row.propTypes = {
  outfit: PropTypes.shape(Object).isRequired,
};

export default Row;
