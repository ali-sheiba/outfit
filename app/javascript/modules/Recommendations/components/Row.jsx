import React from 'react';
import PropTypes from 'prop-types';
import ItemRow from '../../Items/components/Row';

const Row = ({ outfit: { items, ...outfit } }) => (
  <div className="card">
    <div className="card-body">
      <div className="float-md-right text-right">
        <small className="d-block">
          {`Total Price: ${outfit.total_price} AED`}
        </small>
      </div>
      <h5 className="card-title">
        <strong>{outfit.name}</strong>
        {' by: '}
        <span className="text-muted">{outfit.user.name}</span>
      </h5>

      <div className="flex-nowrap flex-row row row-cards o-auto">
        {items.map(i => (
          <ItemRow
            key={`outfit-item-${i.id}`}
            item={i}
            colClass="col-md-3"
          />
        ))}
      </div>
      {/* <div className="mt-2">
        <pre>
          {`Likes: ${outfit.likes}\n`}
          {`Score: ${outfit.score}`}
        </pre>
      </div> */}
    </div>
  </div>
);

Row.propTypes = {
  outfit: PropTypes.shape(Object).isRequired,
};

export default Row;
