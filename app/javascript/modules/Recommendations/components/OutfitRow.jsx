import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ItemRow from 'modules/Items/components/Row';

const Row = ({ outfit: { items, ...outfit } }) => (
  <div className="card">
    <div className="card-body">
      <div className="float-md-right text-right">
        <div className="ml-auto text-muted">
          <small className="text-muted">{outfit.likes}</small>
          <i className={classNames('p-2', {
            'fas fa-heart text-danger': outfit.liked,
            'far fa-heart': !outfit.liked,
          })}
          />
        </div>
      </div>
      <h5 className="card-title">
        <strong>{outfit.name}</strong>
        {' by: '}
        <span className="text-muted">{outfit.user.name}</span>
      </h5>
      <small className="card-subtitle">
        {`Total Price: ${outfit.total_price} AED`}
      </small>

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
