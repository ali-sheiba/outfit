import React from 'react';
import PropTypes from 'prop-types';

const OutfitItems = ({ items }) => (
  <div className="row no-gutters bg-gray-dark-lightest justify-content-center">
    {items.map(i => (
      <div className="col-sm-4" key={`outfit-item-${i.id}`}>
        <img src={i.image_url} alt={i.name} />
      </div>
    ))}
  </div>
);

OutfitItems.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
};

export default OutfitItems;
