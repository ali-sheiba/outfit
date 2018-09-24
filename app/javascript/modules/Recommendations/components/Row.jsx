import React from 'react';
import PropTypes from 'prop-types';
import ItemRow from '../../Items/components/Row';

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
        {outfit.items.map(i => (
          <ItemRow
            key={`outfit-item-${i.id}`}
            item={i}
            colClass="col-md-3"
          />
        ))}
      </div>
    </div>
  </div>
);

Row.propTypes = {
  outfit: PropTypes.shape(Object).isRequired,
};

export default Row;
