import React from 'react';
import PropTypes from 'prop-types';

const ItemDetails = ({ item }) => (
  <div className="card card-aside recommendations-h">
    <img src={item.image_url} alt={item.name} className="h-100" />
    <div className="card-body">
      <div className="pb-2">
        <strong>Brand: </strong>
        {item.brand.name}
      </div>
      <div className="pb-2">
        <strong>Category: </strong>
        {item.category.name}
      </div>
      <div className="pb-2">
        <strong>Color: </strong>
        {item.color.name}
      </div>
      <div>
        <strong>Price: </strong>
        {item.price}
        {' '}
        AED
      </div>
    </div>
  </div>
);


ItemDetails.propTypes = {
  item: PropTypes.shape(Object).isRequired,
};

export default ItemDetails;
